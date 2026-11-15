import { ArrowRight, Clock, Sparkles } from 'lucide-react';
import { services } from '../data/clinic';

export default function Services({ onBook }) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="max-w-2xl space-y-3">
        <p className="text-sm font-semibold text-sky-600">CARE FOR YOUR SMILE</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">Our dental services</h1>
        <p className="text-slate-600">Explore preventive, restorative, and cosmetic care. Select a treatment to start your appointment request.</p>
      </div>
      <p className="rounded-2xl bg-sky-50 border border-sky-100 p-4 text-sm text-sky-900">Sample catalog and dollar prices. Treatments, fees, currency, and durations need clinic confirmation before launch.</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map(service => (
          <article key={service.id} className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col gap-4 shadow-sm">
            <Sparkles className="w-8 h-8 text-sky-600" aria-hidden="true" />
            <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">{service.category}</p>
            <h2 className="text-xl font-bold text-slate-900">{service.name}</h2>
            <p className="text-sm text-slate-600 flex-1">{service.description}</p>
            <div className="flex justify-between items-center text-sm border-t border-slate-100 pt-4">
              <span className="flex items-center gap-2 text-slate-500"><Clock className="w-4 h-4" aria-hidden="true" />{service.duration}</span>
              <span className="font-bold text-sky-700">{service.price} <span className="font-normal text-xs">sample</span></span>
            </div>
            <button onClick={() => onBook({ serviceId: service.id })} className="rounded-xl bg-sky-600 hover:bg-sky-700 text-white py-3 px-4 text-sm font-semibold flex justify-center items-center gap-2" aria-label={`Book ${service.name}`}>Book this treatment <ArrowRight className="w-4 h-4" aria-hidden="true" /></button>
          </article>
        ))}
      </div>
    </section>
  );
}
