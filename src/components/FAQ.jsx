import { ArrowRight } from 'lucide-react';
import { faqs } from '../data/clinic';

export default function FAQ({ onBook }) {
  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      <div className="space-y-3 text-center">
        <p className="text-sm font-semibold text-sky-600">PLAN YOUR VISIT</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">Frequently asked questions</h1>
        <p className="text-slate-600">Helpful details about booking and what to expect from this clinic website prototype.</p>
      </div>
      <div className="space-y-3">
        {faqs.map(item => (
          <details key={item.question} className="group rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">
            <summary className="cursor-pointer font-semibold text-slate-900 rounded-lg focus-visible:outline-sky-600">{item.question}</summary>
            <p className="text-sm leading-relaxed text-slate-600 mt-4">{item.answer}</p>
          </details>
        ))}
      </div>
      <div className="text-center rounded-3xl bg-sky-50 border border-sky-100 p-8 space-y-4">
        <h2 className="text-xl font-bold text-slate-900">Explore the booking process</h2>
        <p className="text-sm text-slate-600">Try choosing your treatment, practitioner, and preferred time.</p>
        <button onClick={() => onBook()} className="inline-flex items-center gap-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white px-5 py-3 text-sm font-semibold">Book an appointment <ArrowRight className="w-4 h-4" aria-hidden="true" /></button>
      </div>
    </section>
  );
}
