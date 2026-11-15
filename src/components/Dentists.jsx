import { Calendar, UserRound } from 'lucide-react';
import { dentists } from '../data/clinic';

export default function Dentists({ onBook }) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="max-w-2xl space-y-3">
        <p className="text-sm font-semibold text-sky-600">MEET THE TEAM</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">Our dentists</h1>
        <p className="text-slate-600">Choose a practitioner for your appointment, or let us help you find an available dentist.</p>
      </div>
      <p className="rounded-2xl bg-sky-50 border border-sky-100 p-4 text-sm text-sky-900">These are sample profiles from the booking demo. Names, credentials, specialties, and working schedules require clinic confirmation.</p>
      <div className="grid md:grid-cols-2 gap-6">
        {dentists.map(dentist => (
          <article key={dentist.id} className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-5 shadow-sm">
            <div className="w-20 h-20 rounded-2xl bg-sky-100 text-sky-700 text-2xl font-bold flex items-center justify-center" aria-hidden="true">{dentist.initials}</div>
            <div><h2 className="text-xl font-bold text-slate-900">{dentist.name}</h2><p className="text-sm text-sky-700 mt-1">{dentist.specialty}</p></div>
            <p className="text-sm text-slate-600">{dentist.description}</p>
            <p className="text-sm text-slate-500 border-t border-slate-100 pt-4">Schedule: to be confirmed by the clinic.</p>
            <button onClick={() => onBook({ dentistId: dentist.id })} className="flex items-center justify-center gap-2 w-full rounded-xl bg-sky-600 hover:bg-sky-700 text-white py-3 text-sm font-semibold"><Calendar className="w-4 h-4" aria-hidden="true" />Book with {dentist.name.split(',')[0]}</button>
          </article>
        ))}
      </div>
      <div className="rounded-2xl bg-slate-900 p-6 sm:p-8 text-white flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between">
        <div><h2 className="text-xl font-bold">No dentist preference?</h2><p className="text-sm text-slate-300 mt-2">Choose any available specialist when requesting your visit.</p></div>
        <button onClick={() => onBook({ dentistId: 'any' })} className="flex items-center gap-2 rounded-xl bg-white text-slate-900 px-5 py-3 text-sm font-semibold"><UserRound className="w-4 h-4" aria-hidden="true" />Find a dentist</button>
      </div>
    </section>
  );
}
