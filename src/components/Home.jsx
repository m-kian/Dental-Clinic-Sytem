import React from 'react';
import { 
  ShieldCheck, 
  Award, 
  Users, 
  Calendar, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Star,
  Activity,
  HeartHandshake
} from 'lucide-react';

export default function Home({ onBookNow, onExploreServices }) {
  const stats = [
    { label: 'Happy Smiles', value: '12,500+' },
    { label: 'Licensed Dentists', value: '8' },
    { label: 'Years Experience', value: '15+' },
    { label: 'Satisfaction Rate', value: '99.2%' },
  ];

  const highlights = [
    {
      title: 'General Dentistry',
      desc: 'Routine cleanings, fillings, checkups, and comprehensive oral health assessments.',
      icon: Activity,
    },
    {
      title: 'Cosmetics & Whitening',
      desc: 'Professional laser teeth whitening, porcelain veneers, and smile makeovers.',
      icon: Sparkles,
    },
    {
      title: 'Orthodontics & Braces',
      desc: 'Traditional ceramic braces and clear aligner consultations for perfect alignment.',
      icon: ShieldCheck,
    },
    {
      title: 'Pediatric Dental Care',
      desc: 'Gentle, specialized pediatric procedures tailored for children and teenagers.',
      icon: HeartHandshake,
    },
  ];

  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-sky-50 via-white to-slate-50 pt-16 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-100 text-sky-800 text-xs font-semibold">
                <Award className="w-4 h-4 text-sky-600" /> Voted Top Rated Clinic in 2026
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                Modern Dental Care for Your <span className="bg-gradient-to-r from-sky-600 to-cyan-500 bg-clip-text text-transparent">Entire Family</span>
              </h1>

              <p className="text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0">
                Experience gentle, pain-free dental treatments with state-of-the-art diagnostic technology and expert practitioners in a comfortable clinic environment.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={onBookNow}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-semibold text-base shadow-lg shadow-sky-600/25 transition-all hover:-translate-y-0.5"
                >
                  <Calendar className="w-5 h-5" /> Book an Appointment
                </button>
                <button
                  onClick={onExploreServices}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-semibold text-base transition-all"
                >
                  Explore Services <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Trust Badges */}
              <div className="pt-6 border-t border-slate-200/80 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-slate-500 text-xs font-medium">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Insurance Approved
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Digital Odontograms
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Same-Day Emergency
                </span>
              </div>
            </div>

            {/* Right Card / Visual Section */}
            <div className="relative">
              <div className="relative mx-auto max-w-md lg:max-w-none bg-white p-6 sm:p-8 rounded-3xl shadow-xl border border-slate-100 space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center font-bold text-lg">
                      DR
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">Dr. Sarah Jenkins, DDM</h3>
                      <p className="text-xs text-slate-500">Lead Orthodontist & Dental Surgeon</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-medium border border-emerald-200">
                    On Duty Today
                  </span>
                </div>

                <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-100 text-sm">
                  <div className="flex justify-between text-slate-600">
                    <span>Morning Appointments:</span>
                    <span className="font-semibold text-slate-800">2 Slots Open</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Afternoon Appointments:</span>
                    <span className="font-semibold text-slate-800">4 Slots Open</span>
                  </div>
                </div>

                <button
                  onClick={onBookNow}
                  className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm transition-colors flex items-center justify-center gap-2"
                >
                  Select Time & Reserve <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Stats Counter Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-sky-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map((stat, idx) => (
            <div key={idx} className="space-y-1">
              <p className="text-3xl sm:text-4xl font-extrabold text-sky-300">{stat.value}</p>
              <p className="text-xs sm:text-sm text-sky-100 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Core Services Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl font-bold text-slate-900">Comprehensive Dental Solutions</h2>
          <p className="text-slate-600 text-sm sm:text-base">
            From routine checkups to complete cosmetic smile reconstructions, our team utilizes modern equipment to deliver optimal patient comfort.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow space-y-4"
              >
                <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="bg-slate-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-slate-900">What Our Patients Say</h2>
            <div className="flex justify-center text-amber-400 gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400" />
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: 'Elena Rostova',
                role: 'Teeth Whitening Patient',
                comment: 'The booking process was so effortless and fast. Dr. Jenkins took the time to explain every detail during my whitening treatment.',
              },
              {
                name: 'Mark Anthony',
                role: 'Root Canal & Crown',
                comment: 'I usually get anxious visiting the dentist, but their painless setup and transparent treatment plan completely changed my mind.',
              },
              {
                name: 'Clarissa Santos',
                role: 'Orthodontic Patient',
                comment: 'The online portal lets me view my upcoming schedule and odontogram notes right from my smartphone.',
              },
            ].map((t, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
                <p className="text-slate-600 text-sm italic">"{t.comment}"</p>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{t.name}</h4>
                  <p className="text-xs text-sky-600">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}