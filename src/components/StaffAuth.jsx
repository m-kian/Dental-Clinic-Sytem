import { useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import { api } from '../api';

export default function StaffAuth({ onLoginSuccess }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  async function login(event) {
    event.preventDefault(); setBusy(true); setError('');
    try { onLoginSuccess(await api('/login', { method: 'POST', body: JSON.stringify({ password }) })); }
    catch (error) { setError(error.message); }
    finally { setBusy(false); }
  }
  return <section className="max-w-md mx-auto my-12 bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
    <ShieldCheck className="w-10 h-10 text-sky-600 mx-auto" aria-hidden="true" />
    <h1 className="text-2xl font-bold text-center">Staff Portal Login</h1>
    <p className="text-sm text-slate-500">Sign in using the staff password configured by your clinic administrator.</p>
    <form onSubmit={login} className="space-y-4">
      <label className="block text-sm font-semibold" htmlFor="staff-password">Staff password</label>
      <input id="staff-password" type="password" autoComplete="current-password" required value={password} onChange={e => setPassword(e.target.value)} className="w-full p-3 rounded-xl border border-slate-300" />
      {error && <p role="alert" className="text-sm text-rose-700">{error}</p>}
      <button disabled={busy} className="w-full rounded-xl bg-sky-600 hover:bg-sky-700 text-white p-3 font-semibold disabled:opacity-50">{busy ? 'Signing in…' : 'Sign in'}</button>
    </form>
  </section>;
}
