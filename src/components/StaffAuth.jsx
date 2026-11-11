import React, { useState } from 'react';
import { ShieldCheck, UserCheck, Lock, Mail, User, Stethoscope, ArrowRight } from 'lucide-react';

export default function StaffAuth({ onLoginSuccess }) {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Help Desk', // Default role
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) return;

    // Pass the authenticated user data back up to App.jsx
    onLoginSuccess({
      name: isSignup ? formData.name : (formData.email.includes('dentist') ? 'Dr. Sarah Jenkins' : 'Staff Member'),
      role: formData.role,
      email: formData.email,
    });
  };

  return (
    <div className="max-w-md mx-auto my-12 bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 bg-sky-100 text-sky-600 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">
          {isSignup ? 'Staff Registration' : 'Staff Portal Login'}
        </h2>
        <p className="text-xs text-slate-500">
          Authorized personnel only. Please sign in with your credentials.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {isSignup && (
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              <input
                type="text"
                required
                placeholder="Dr. John Doe / Jane Smith"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full pl-9 pr-4 py-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>
        )}

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Work Email</label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
            <input
              type="email"
              required
              placeholder="staff@miguelsdentalsystem.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full pl-9 pr-4 py-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
            <input
              type="password"
              required
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full pl-9 pr-4 py-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Select Role / Department</label>
          <select
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="w-full px-3 py-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white"
          >
            <option value="Help Desk">Help Desk / Receptionist</option>
            <option value="Dentist">Dentist / Practitioner</option>
            <option value="Clinic Admin">Clinic Administrator</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-3.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-semibold text-xs shadow-md shadow-sky-600/20 transition-all flex items-center justify-center gap-2"
        >
          {isSignup ? 'Register Account' : 'Sign In to Dashboard'} <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      <div className="text-center pt-2 border-t border-slate-100">
        <button
          type="button"
          onClick={() => setIsSignup(!isSignup)}
          className="text-xs text-sky-600 hover:text-sky-800 font-medium"
        >
          {isSignup ? 'Already have an account? Sign In' : "Don't have a staff account? Register"}
        </button>
      </div>
    </div>
  );
}