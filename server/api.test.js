import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createApi } from './index.js';

test('appointments persist, reject overlaps, and require staff authentication', async () => {
  const dir = mkdtempSync(join(tmpdir(), 'clinic-test-'));
  const database = join(dir, 'test.sqlite');
  let server;
  const start = async () => { server = createApi({ database, password: 'test-secret' }); await new Promise(resolve => server.listen(0, '127.0.0.1', resolve)); return `http://127.0.0.1:${server.address().port}/api`; };
  const stop = () => new Promise(resolve => server.close(resolve));
  try {
    let base = await start();
    const request = (path, data, cookie, method = 'POST') => fetch(base + path, { method, headers: { 'Content-Type': 'application/json', ...(cookie ? { Cookie: cookie } : {}) }, body: JSON.stringify(data) });
    const booking = { fullName: 'Test Patient', email: 'patient@example.com', phone: '09171234567', notes: '', serviceId: 'rootcanal', dentistId: 'dr-jenkins', date: '2099-12-01', time: '09:00 AM' };
    assert.equal((await fetch(base + '/appointments')).status, 401);
    assert.equal((await request('/login', { password: 'wrong' })).status, 401);
    const login = await request('/login', { password: 'test-secret' });
    assert.equal(login.status, 200);
    const cookie = login.headers.get('set-cookie').split(';')[0];
    const first = await request('/appointments', booking); assert.equal(first.status, 201);
    const saved = await first.json();
    assert.equal((await request('/appointments', { ...booking, time: '10:00 AM' })).status, 409);
    assert.equal((await request('/appointments', { ...booking, date: '2099-02-30' })).status, 400);
    const availability = await (await fetch(base + '/availability?' + new URLSearchParams({ date: booking.date, serviceId: booking.serviceId, dentistId: booking.dentistId }))).json();
    assert.equal(availability.times.includes('10:00 AM'), false);
    const any = await request('/appointments', { ...booking, dentistId: 'any' }); assert.equal(any.status, 201);
    assert.match((await any.json()).doctor, /Ramirez/);
    assert.equal((await request('/appointments', { ...booking, dentistId: 'any' })).status, 409);
    assert.equal((await request(`/appointments/${saved.id}`, { status: 'Cancelled' }, cookie, 'PATCH')).status, 200);
    assert.equal((await request('/appointments', booking)).status, 201);
    const rows = await (await fetch(base + '/appointments', { headers: { Cookie: cookie } })).json(); assert.equal(rows.length, 3);
    await request('/logout', {}, cookie);
    assert.equal((await fetch(base + '/appointments', { headers: { Cookie: cookie } })).status, 401);
    await stop(); base = await start();
    const relogin = await request('/login', { password: 'test-secret' });
    const persisted = await (await fetch(base + '/appointments', { headers: { Cookie: relogin.headers.get('set-cookie').split(';')[0] } })).json();
    assert.equal(persisted.length, 3);
  } finally { if (server?.listening) await stop(); rmSync(dir, { recursive: true, force: true }); }
});


test('Vite proxy preserves browser origin for staff login and rejects foreign origins', async () => {
  const { createServer } = await import('vite');
  const { default: config } = await import('../vite.config.js');
  const api = createApi({ database: ':memory:', password: 'test-secret' });
  let vite;
  try {
    await new Promise(resolve => api.listen(0, '127.0.0.1', resolve));
    vite = await createServer({
      ...config,
      configFile: false,
      server: {
        host: '127.0.0.1', port: 0,
        proxy: { '/api': { ...config.server.proxy['/api'], target: `http://127.0.0.1:${api.address().port}` } },
      },
    });
    await vite.listen();
    const origin = `http://127.0.0.1:${vite.httpServer.address().port}`;
    const login = originHeader => fetch(`${origin}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Origin: originHeader },
      body: JSON.stringify({ password: 'test-secret' }),
    });
    const response = await login(origin);
    assert.equal(response.status, 200);
    assert.match(response.headers.get('set-cookie'), /HttpOnly/);
    assert.equal((await login('https://foreign.example')).status, 403);
  } finally {
    if (vite) await vite.close();
    if (api.listening) await new Promise(resolve => api.close(resolve));
  }
});
