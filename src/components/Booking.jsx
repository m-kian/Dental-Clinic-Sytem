import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  ShieldCheck, 
  AlertCircle 
} from 'lucide-react';

export default function Booking({ onBookingComplete }) {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDentist, setSelectedDentist] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  
  const [patientData, setPatientData] = useState({
    fullName: '',
    email: '',
    phone: '',
    notes: '',
  });

  const services = [
    { id: 'checkup', name: 'Comprehensive Exam & Cleaning', duration: '45 min', price: '$80' },
    { id: 'whitening', name: 'Laser Teeth Whitening', duration: '60 min', price: '$220' },
    { id: 'filling', name: 'Composite Dental Filling', duration: '45 min', price: '$120' },
    { id: 'ortho', name: 'Orthodontic Consultation', duration: '30 min', price: '$50' },
    { id: 'rootcanal', name: 'Root Canal Therapy', duration: '90 min', price: '$450' },
  ];

  const dentists = [
    { id: 'dr-jenkins', name: 'Dr. Sarah Jenkins, DDM', specialty: 'Orthodontics & General' },
    { id: 'dr-ramirez', name: 'Dr. Marcus Ramirez, DDS', specialty: 'Cosmetic & Endodontics' },
    { id: 'any', name: 'Any Available Specialist', specialty: 'First available doctor' },
  ];

  const availableTimes = [
    '09:00 AM', '10:00 AM', '11:30 AM', '02:00 PM', '03:30 PM', '04:45 PM'
  ];

  const handleInputChange = (e) => {
    setPatientData({ ...patientData, [e.target.name]: e.target.value });
  };

  const handleCompleteBooking = (e) => {
    e.preventDefault();
    if (!patientData.fullName || !patientData.email || !patientData.phone) return;
    setStep(4); // Advance to Confirmation Screen
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      {/* Header & Step Indicator */}
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-extrabold text-slate-900">Book Your Dental Visit</h1>
        <p className="text-slate-600 text-sm">Select your treatment, pick a convenient time, and confirm your visit.</p>
        
        {/* Wizard Progress Bar */}
        <div className="flex items-center justify-center gap-2 pt-4 max-w-xs mx-auto">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-2 flex-1 rounded-full transition-all ${
                step >= s ? 'bg-sky-600' : 'bg-slate-200'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-lg p-6 sm:p-10">
        {/* STEP 1: Select Service & Dentist */}
        {step === 1 && (
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-sky-600" /> 1. Select a Treatment
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {services.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedService(item)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      selectedService?.id === item.id
                        ? 'border-sky-600 bg-sky-50/50 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-slate-900 text-sm">{item.name}</h3>
                      <span className="font-bold text-sky-600 text-xs">{item.price}</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {item.duration}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <User className="w-5 h-5 text-sky-600" /> 2. Choose Your Dentist
              </h2>
              <div className="grid sm:grid-cols-3 gap-3">
                {dentists.map((dentist) => (
                  <div
                    key={dentist.id}
                    onClick={() => setSelectedDentist(dentist)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all text-center space-y-1 ${
                      selectedDentist?.id === dentist.id
                        ? 'border-sky-600 bg-sky-50/50 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <p className="font-semibold text-slate-900 text-sm">{dentist.name}</p>
                    <p className="text-xs text-slate-500">{dentist.specialty}</p>
                  </div>
                ))}
              </div>
            </div>

            <button
              disabled={!selectedService || !selectedDentist}
              onClick={() => setStep(2)}
              className="w-full py-3.5 rounded-xl bg-sky-600 hover:bg-sky-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold transition-all flex items-center justify-center gap-2"
            >
              Continue to Date & Time <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* STEP 2: Pick Date & Time Slot */}
        {step === 2 && (
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-sky-600" /> Select Date & Time Slot
              </h2>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2">Preferred Date</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-800 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2">Available Slots</label>
                  <div className="grid grid-cols-2 gap-2">
                    {availableTimes.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all ${
                          selectedTime === time
                            ? 'bg-sky-600 text-white border-sky-600'
                            : 'border-slate-200 hover:border-slate-300 text-slate-700'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={() => setStep(1)}
                className="flex-1 py-3.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors flex items-center justify-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
              <button
                disabled={!selectedDate || !selectedTime}
                onClick={() => setStep(3)}
                className="flex-[2] py-3.5 rounded-xl bg-sky-600 hover:bg-sky-700 disabled:opacity-50 text-white font-semibold text-sm transition-colors flex items-center justify-center gap-1"
              >
                Enter Patient Information <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Patient Information Form */}
        {step === 3 && (
          <form onSubmit={handleCompleteBooking} className="space-y-6">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-sky-600" /> Patient Details
            </h2>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  required
                  placeholder="Jane Doe"
                  value={patientData.fullName}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="jane@example.com"
                  value={patientData.email}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">Mobile Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="(0917) 000-0000"
                  value={patientData.phone}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">Notes / Medical Conditions (Optional)</label>
                <textarea
                  name="notes"
                  rows="3"
                  placeholder="Any allergies, current tooth discomfort, or notes for the doctor..."
                  value={patientData.notes}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="flex-1 py-3.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-sm hover:bg-slate-50"
              >
                Back
              </button>
              <button
                type="submit"
                className="flex-[2] py-3.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-semibold text-sm shadow-md shadow-sky-600/20"
              >
                Confirm Appointment
              </button>
            </div>
          </form>
        )}

        {/* STEP 4: Success Screen */}
        {step === 4 && (
          <div className="text-center py-8 space-y-6">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-slate-900">Appointment Confirmed!</h2>
              <p className="text-slate-600 text-sm">We have sent a confirmation email to <span className="font-semibold text-slate-800">{patientData.email}</span>.</p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-left max-w-md mx-auto space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Patient:</span>
                <span className="font-semibold text-slate-800">{patientData.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Treatment:</span>
                <span className="font-semibold text-slate-800">{selectedService?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Doctor:</span>
                <span className="font-semibold text-slate-800">{selectedDentist?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Date & Time:</span>
                <span className="font-semibold text-sky-600">{selectedDate} at {selectedTime}</span>
              </div>
            </div>

            <button
              onClick={() => {
                setStep(1);
                setSelectedService(null);
                setSelectedDentist(null);
                setSelectedDate('');
                setSelectedTime('');
                setPatientData({ fullName: '', email: '', phone: '', notes: '' });
              }}
              className="px-6 py-3 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800"
            >
              Book Another Appointment
            </button>
          </div>
        )}
      </div>
    </div>
  );
}