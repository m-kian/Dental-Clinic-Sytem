import React, { useState } from 'react';
import { 
  Stethoscope, 
  Calendar, 
  UserCheck, 
  Clock, 
  PhoneCall, 
  Menu, 
  X 
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'dentists', label: 'Our Dentists' },
    { id: 'faq', label: 'FAQ' },
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
      {/* Top Notification / Info Bar */}
      <div className="bg-sky-900 text-slate-100 text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-sky-400" /> Mon - Sat: 8:00 AM - 6:00 PM
            </span>
            <span className="hidden md:inline text-sky-700">|</span>
            <span className="hidden md:flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5 text-sky-400" /> Emergency: (02) 8800-3456
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-emerald-300 font-medium">Accepting New Patients</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand Logo */}
          <div 
            className="flex items-center gap-2.5 cursor-pointer"
            onClick={() => handleNavClick('home')}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-sky-500/20">
              <Stethoscope className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-slate-900 via-sky-950 to-sky-700 bg-clip-text text-transparent">
                Miguel's Dental System
              </span>
              <span className="block text-[10px] font-semibold tracking-wider text-sky-600 uppercase -mt-1">
                Dental Clinic
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-sm font-medium transition-colors hover:text-sky-600 ${
                  activeTab === link.id ? 'text-sky-600 font-semibold' : 'text-slate-600'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => handleNavClick('admin')}
              className={`flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-lg border transition-all ${
                activeTab === 'admin'
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'border-slate-300 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" /> Staff Portal
            </button>
            
            <button
              onClick={() => handleNavClick('booking')}
              className="flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-700 text-white shadow-sm transition-all hover:shadow-sky-500/25"
            >
              <Calendar className="w-4 h-4" /> Book Appointment
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-6 space-y-3">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                  activeTab === link.id
                    ? 'bg-sky-50 text-sky-600 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-200 flex flex-col gap-2">
            <button
              onClick={() => handleNavClick('booking')}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-sky-600 text-white font-medium text-sm shadow-sm"
            >
              <Calendar className="w-4 h-4" /> Book Appointment
            </button>
            <button
              onClick={() => handleNavClick('admin')}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-slate-300 text-slate-700 font-medium text-sm"
            >
              <UserCheck className="w-4 h-4" /> Staff Portal Login
            </button>
          </div>
        </div>
      )}
    </header>
  );
}