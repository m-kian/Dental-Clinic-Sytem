import React, { useState } from 'react';
import { 
  Users, 
  Calendar, 
  DollarSign, 
  Search, 
  Clock, 
  FileText,
  LogOut
} from 'lucide-react';
import Odontogram from './Odontogram';

export default function AdminDashboard({ staffUser, onLogout }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('appointments');
  const [selectedPatientChart, setSelectedPatientChart] = useState(null);

  // Sample dental tooth state
  const [toothData, setToothData] = useState({
    3: 'cavity',
    14: 'filled',
    19: 'crown',
    30: 'rootcanal',
  });

  const appointments = [
    { id: 101, patient: 'Elena Rostova', service: 'Laser Teeth Whitening', date: '2026-11-12', time: '09:00 AM', status: 'Confirmed', doctor: 'Dr. Jenkins' },
    { id: 102, patient: 'Mark Anthony', service: 'Root Canal Therapy', date: '2026-11-12', time: '11:30 AM', status: 'Pending', doctor: 'Dr. Ramirez' },
    { id: 103, patient: 'Clarissa Santos', service: 'Orthodontic Checkup', date: '2026-11-12', time: '02:00 PM', status: 'Completed', doctor: 'Dr. Jenkins' },
    { id: 104, patient: 'Roberto Gomez', service: 'Cleaning & Examination', date: '2026-11-13', time: '10:00 AM', status: 'Confirmed', doctor: 'Dr. Ramirez' },
  ];

  const handleToothClick = (toothNum) => {
    const statuses = ['healthy', 'cavity', 'filled', 'crown', 'rootcanal', 'missing'];
    const current = toothData[toothNum] || 'healthy';
    const nextIdx = (statuses.indexOf(current) + 1) % statuses.length;
    setToothData({ ...toothData, [toothNum]: statuses[nextIdx] });
  };

  const filteredAppointments = appointments.filter((a) =>
    a.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.service.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header & Role Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-700 text-[10px] font-bold uppercase tracking-wider">
              Role: {staffUser?.role || 'Staff'}
            </span>
            <span className="text-xs text-slate-500">Logged in as {staffUser?.name || 'Authorized Staff'}</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Clinic Staff Portal</h1>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex gap-2">
            <button 
              onClick={() => setActiveTab('appointments')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'appointments' ? 'bg-sky-600 text-white' : 'bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              Appointments
            </button>
            <button 
              onClick={() => setActiveTab('odontogram')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'odontogram' ? 'bg-sky-600 text-white' : 'bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              Tooth Charting
            </button>
          </div>

          <button 
            onClick={onLogout}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" /> Sign Out
          </button>
        </div>
      </div>

      {/* Quick Metrics Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-sky-50 text-sky-600 rounded-xl"><Calendar className="w-6 h-6" /></div>
          <div>
            <p className="text-xs text-slate-500">Today's Visits</p>
            <p className="text-xl font-bold text-slate-900">14 Patients</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl"><Users className="w-6 h-6" /></div>
          <div>
            <p className="text-xs text-slate-500">Active Patients</p>
            <p className="text-xl font-bold text-slate-900">1,240</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl"><Clock className="w-6 h-6" /></div>
          <div>
            <p className="text-xs text-slate-500">Pending Requests</p>
            <p className="text-xl font-bold text-slate-900">3</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-xl"><DollarSign className="w-6 h-6" /></div>
          <div>
            <p className="text-xs text-slate-500">Daily Revenue</p>
            <p className="text-xl font-bold text-slate-900">$2,450</p>
          </div>
        </div>
      </div>

      {/* View Switcher */}
      {activeTab === 'appointments' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search patient name or procedure..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-500 uppercase font-semibold">
                <tr>
                  <th className="px-6 py-3.5">Patient</th>
                  <th className="px-6 py-3.5">Treatment</th>
                  <th className="px-6 py-3.5">Date & Time</th>
                  <th className="px-6 py-3.5">Practitioner</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredAppointments.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-900">{row.patient}</td>
                    <td className="px-6 py-4">{row.service}</td>
                    <td className="px-6 py-4 font-medium text-slate-600">{row.date} at {row.time}</td>
                    <td className="px-6 py-4">{row.doctor}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        row.status === 'Confirmed' ? 'bg-sky-100 text-sky-700' :
                        row.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => {
                          setSelectedPatientChart(row.patient);
                          setActiveTab('odontogram');
                        }}
                        className="text-sky-600 hover:text-sky-800 font-semibold inline-flex items-center gap-1 ml-auto"
                      >
                        <FileText className="w-3.5 h-3.5" /> Open Chart
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'odontogram' && (
        <div className="space-y-4">
          <div className="bg-sky-50 border border-sky-200 text-sky-900 p-4 rounded-2xl flex justify-between items-center text-xs">
            <span>Viewing Dental Record for: <strong>{selectedPatientChart || 'Elena Rostova'}</strong></span>
            <button 
              onClick={() => setSelectedPatientChart(null)}
              className="underline text-sky-700 hover:text-sky-950 font-semibold"
            >
              Select Different Patient
            </button>
          </div>
          <Odontogram toothData={toothData} onToothClick={handleToothClick} />
        </div>
      )}
    </div>
  );
}