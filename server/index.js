import { createServer } from 'node:http';
import { DatabaseSync } from 'node:sqlite';
import { mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { randomBytes, timingSafeEqual } from 'node:crypto';
import { pathToFileURL } from 'node:url';
import { services, dentists } from '../src/data/clinic.js';

export const times = ['09:00 AM', '10:00 AM', '11:30 AM', '02:00 PM', '03:30 PM', '04:45 PM'];
const today = () => new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Manila', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
const minutes = time => { const [h, m, period] = time.match(/(\d+):(\d+) (AM|PM)/).slice(1); return (+h % 12 + (period === 'PM' ? 12 : 0)) * 60 + +m; };

export function createApi({ database = process.env.DATABASE_PATH || 'server/data/clinic.sqlite', password = process.env.STAFF_PASSWORD } = {}) {
  if (database !== ':memory:') mkdirSync(dirname(resolve(database)), { recursive: true });
  const db = new DatabaseSync(database);
  db.exec(`PRAGMA journal_mode=WAL; CREATE TABLE IF NOT EXISTS appointments (
    id INTEGER PRIMARY KEY, patient TEXT NOT NULL, email TEXT NOT NULL, phone TEXT NOT NULL, notes TEXT NOT NULL,
    service_id TEXT NOT NULL, dentist_id TEXT NOT NULL, date TEXT NOT NULL, time TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'Pending', created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  ); CREATE INDEX IF NOT EXISTS appointment_schedule ON appointments(date, dentist_id);`);
  const sessions = new Map();
  const decorate = row => ({ ...row, service: services.find(s => s.id === row.service_id)?.name, doctor: dentists.find(d => d.id === row.dentist_id)?.name });
  const freeDentist = (date, time, serviceId, dentistId) => {
    const start = minutes(time), duration = parseInt(services.find(s => s.id === serviceId).duration);
    if (start + duration > 18 * 60 || new Date(`${date}T${String(Math.floor(start / 60)).padStart(2, '0')}:${String(start % 60).padStart(2, '0')}:00+08:00`) <= new Date()) return null;
    const existing = db.prepare("SELECT * FROM appointments WHERE date = ? AND status IN ('Pending', 'Confirmed')").all(date);
    return dentists.find(d => (dentistId === 'any' || d.id === dentistId) && !existing.some(a => a.dentist_id === d.id && start < minutes(a.time) + parseInt(services.find(s => s.id === a.service_id).duration) && start + duration > minutes(a.time)));
  };
  const server = createServer(async (req, res) => {
    const reply = (code, data) => { res.writeHead(code, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }); res.end(JSON.stringify(data)); };
    try {
      const url = new URL(req.url, 'http://localhost');
      if (['POST', 'PATCH'].includes(req.method) && req.headers.origin && req.headers.origin !== `http://${req.headers.host}` && req.headers.origin !== `https://${req.headers.host}`) return reply(403, { error: 'Origin not allowed.' });
      const body = async () => { let raw = ''; for await (const chunk of req) { raw += chunk; if (raw.length > 16000) throw new Error('Request too large.'); } return JSON.parse(raw || '{}'); };
      const token = req.headers.cookie?.match(/(?:^|;\s*)clinic_session=([a-f0-9]+)/)?.[1];
      const authenticated = token && sessions.get(token) > Date.now();
      if (req.method === 'POST' && url.pathname === '/api/login') {
        const data = await body();
        if (!password) return reply(503, { error: 'Set STAFF_PASSWORD on the server to enable staff login.' });
        const supplied = Buffer.from(String(data.password || '')), expected = Buffer.from(password);
        if (supplied.length !== expected.length || !timingSafeEqual(supplied, expected)) return reply(401, { error: 'Invalid staff password.' });
        const key = randomBytes(32).toString('hex'); sessions.set(key, Date.now() + 8 * 3600000);
        res.setHeader('Set-Cookie', `clinic_session=${key}; HttpOnly; SameSite=Strict; Path=/api; Max-Age=28800${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`);
        return reply(200, { name: 'Clinic Staff', role: 'Clinic Admin' });
      }
      if (req.method === 'POST' && url.pathname === '/api/logout') { sessions.delete(token); res.setHeader('Set-Cookie', 'clinic_session=; HttpOnly; SameSite=Strict; Path=/api; Max-Age=0'); return reply(200, { ok: true }); }
      if (req.method === 'GET' && url.pathname === '/api/availability') {
        const { date, serviceId, dentistId } = Object.fromEntries(url.searchParams);
        if (!/^\d{4}-\d{2}-\d{2}$/.test(date || '') || !services.some(s => s.id === serviceId) || !['any', ...dentists.map(d => d.id)].includes(dentistId)) return reply(400, { error: 'Choose a valid date, treatment, and dentist.' });
        return reply(200, { times: times.filter(time => freeDentist(date, time, serviceId, dentistId)) });
      }
      if (req.method === 'POST' && url.pathname === '/api/appointments') {
        const data = await body();
        const { serviceId, dentistId, date, time } = data;
        if (!services.some(s => s.id === serviceId) || !['any', ...dentists.map(d => d.id)].includes(dentistId) || !times.includes(time) || !/^\d{4}-\d{2}-\d{2}$/.test(date || '') || !Number.isFinite(Date.parse(date)) || new Date(date).toISOString().slice(0, 10) !== date || date < today()) return reply(400, { error: 'Choose a valid future appointment.' });
        for (const [field, max] of [['fullName', 150], ['email', 254], ['phone', 40]]) if (typeof data[field] !== 'string' || !data[field].trim() || data[field].length > max) return reply(400, { error: `Invalid ${field}.` });
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) || (data.notes && (typeof data.notes !== 'string' || data.notes.length > 3000))) return reply(400, { error: 'Check your email and notes (maximum 3,000 characters).' });
        db.exec('BEGIN IMMEDIATE');
        try {
          const dentist = freeDentist(date, time, serviceId, dentistId);
          if (!dentist) { db.exec('ROLLBACK'); return reply(409, { error: 'This time is no longer available. Please choose another time.' }); }
          const result = db.prepare('INSERT INTO appointments(patient,email,phone,notes,service_id,dentist_id,date,time) VALUES (?,?,?,?,?,?,?,?)').run(data.fullName.trim(), data.email.trim(), data.phone.trim(), data.notes || '', serviceId, dentist.id, date, time);
          db.exec('COMMIT'); return reply(201, { id: Number(result.lastInsertRowid), doctor: dentist.name, status: 'Pending' });
        } catch (error) { db.exec('ROLLBACK'); throw error; }
      }
      if (url.pathname.startsWith('/api/appointments')) {
        if (!authenticated) return reply(401, { error: 'Please sign in to view appointments.' });
        if (req.method === 'GET' && url.pathname === '/api/appointments') return reply(200, db.prepare('SELECT * FROM appointments ORDER BY date, id').all().map(decorate));
        const match = url.pathname.match(/^\/api\/appointments\/(\d+)$/);
        if (match && req.method === 'PATCH') {
          const { status } = await body();
          if (!['Confirmed', 'Completed', 'Cancelled'].includes(status)) return reply(400, { error: 'Invalid status.' });
          const row = db.prepare('SELECT * FROM appointments WHERE id = ?').get(match[1]);
          if (!row) return reply(404, { error: 'Appointment not found.' });
          if (!['Pending', 'Confirmed'].includes(row.status)) return reply(409, { error: 'Completed or cancelled appointments cannot be changed.' });
          db.prepare('UPDATE appointments SET status = ? WHERE id = ?').run(status, row.id);
          return reply(200, { ...decorate(row), status });
        }
      }
      reply(404, { error: 'Not found.' });
    } catch (error) { if (error instanceof SyntaxError || error.message === 'Request too large.') reply(400, { error: 'Invalid request body.' }); else { console.error(error); reply(500, { error: 'Unable to process request.' }); } }
  });
  server.on('close', () => db.close());
  return server;
}
if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) createApi().listen(3001, '127.0.0.1', () => console.log('Clinic API: http://127.0.0.1:3001'));
