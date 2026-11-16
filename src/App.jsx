import { api } from './api';
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Booking from './components/Booking';
import AdminDashboard from './components/AdminDashboard';
import StaffAuth from './components/StaffAuth';
import Services from './components/Services';
import Dentists from './components/Dentists';
import FAQ from './components/FAQ';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [staffUser, setStaffUser] = useState(null); // Tracks logged-in staff session

  const [bookingSelection, setBookingSelection] = useState({});

  const openBooking = (selection = {}) => {
    setBookingSelection(selection);
    setActiveTab('booking');
  };

  const navigate = (tab) => {
    if (tab === 'booking') openBooking();
    else setActiveTab(tab);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 antialiased flex flex-col justify-between">
      <div>
        <Navbar activeTab={activeTab} setActiveTab={navigate} />
        
        <main>
          {activeTab === 'home' && (
            <Home 
              onBookNow={() => openBooking()}
              onExploreServices={() => setActiveTab('services')}
            />
          )}

          {activeTab === 'services' && <Services onBook={openBooking} />}
          {activeTab === 'dentists' && <Dentists onBook={openBooking} />}
          {activeTab === 'faq' && <FAQ onBook={openBooking} />}

          {activeTab === 'booking' && (
            <Booking initialServiceId={bookingSelection.serviceId} initialDentistId={bookingSelection.dentistId} />
          )}

          {activeTab === 'admin' && (
            staffUser ? (
              <AdminDashboard staffUser={staffUser} onLogout={async () => { await api('/logout', { method: 'POST' }); setStaffUser(null); }} />
            ) : (
              <StaffAuth onLoginSuccess={(user) => setStaffUser(user)} />
            )
          )}
        </main>
      </div>

      <footer className="bg-slate-900 text-slate-400 text-xs py-6 border-t border-slate-800 text-center">
        <p>© 2026 Miguel's Dental System. All Rights Reserved.</p>
      </footer>
    </div>
  );
}