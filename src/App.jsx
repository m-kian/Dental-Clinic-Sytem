import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Booking from './components/Booking';
import AdminDashboard from './components/AdminDashboard';
import StaffAuth from './components/StaffAuth'; // <-- Import Auth component

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [staffUser, setStaffUser] = useState(null); // Tracks logged-in staff session

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 antialiased flex flex-col justify-between">
      <div>
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <main>
          {activeTab === 'home' && (
            <Home 
              onBookNow={() => setActiveTab('booking')}
              onExploreServices={() => setActiveTab('home')}
            />
          )}

          {activeTab === 'booking' && (
            <Booking onBookingComplete={() => setActiveTab('home')} />
          )}

          {activeTab === 'admin' && (
            staffUser ? (
              <AdminDashboard staffUser={staffUser} onLogout={() => setStaffUser(null)} />
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