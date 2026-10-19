import React, { useState } from 'react';
import { MapPin, Clock, CheckCircle2 } from 'lucide-react';

const HUBS = [
  {
    id: 'delhi-hub',
    city: 'Delhi NCR',
    name: 'Roof Ridge Flagship Experience Hub',
    address: 'DLF Cyber City, Sector 24, Gurgaon',
    timing: '10:00 AM - 8:30 PM (Open 7 Days)',
    phone: '+91 98111 22233',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'mumbai-hub',
    city: 'Mumbai',
    name: 'Roof Ridge Seaface Design Studio',
    address: 'Bandra-Kurla Complex (BKC), Mumbai',
    timing: '10:00 AM - 9:00 PM',
    phone: '+91 98222 33344',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'blore-hub',
    city: 'Bengaluru',
    name: 'Roof Ridge Tech Park Experience Lounge',
    address: 'Outer Ring Road, Marathahalli, Bengaluru',
    timing: '09:30 AM - 8:00 PM',
    phone: '+91 98333 44455',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80'
  }
];

export default function ExperienceHubsPage({ selectedCity }) {
  const [selectedHub, setSelectedHub] = useState(HUBS[0]);
  const [appointmentConfirmed, setAppointmentConfirmed] = useState(false);

  const handleBookVisit = (e) => {
    e.preventDefault();
    setAppointmentConfirmed(true);
  };

  return (
    <div className="max-w-[1380px] mx-auto px-4 sm:px-8 py-5 animate-fade font-sans">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0866F5] via-[#0756D0] to-[#0645B8] rounded-2xl p-5 sm:p-6 mb-5 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-2xl text-white">
          <span className="bg-white/20 text-white text-[11px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider border border-white/30 inline-block mb-2">
            Physical Showrooms &amp; VR Lounges
          </span>
          <h1 className="text-xl sm:text-2xl font-bold font-heading mb-1.5 text-white">
            Roof Ridge Experience Hubs
          </h1>
          <p className="text-xs text-white opacity-95 leading-relaxed">
            Touch and feel materials, preview 1:1 scale modular kitchen layouts &amp; experience 3D VR home walkthroughs with senior architects.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Hubs List */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="font-bold text-[#0F172A] text-lg font-heading">Experience Centers Near You</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {HUBS.map(hub => {
              const isSelected = selectedHub.id === hub.id;
              return (
                <div 
                  key={hub.id}
                  onClick={() => setSelectedHub(hub)}
                  className={`bg-white border rounded-2xl overflow-hidden shadow-xs cursor-pointer transition-all ${
                    isSelected ? 'border-[#0866F5] ring-2 ring-[#0866F5]/25 bg-[#F8FAFC]' : 'border-slate-200 hover:border-[#0866F5]'
                  }`}
                >
                  <div className="h-44 bg-slate-100 relative">
                    <img src={hub.image} alt={hub.name} className="w-full h-full object-cover" />
                    <span className="absolute top-3 left-3 bg-[#0866F5] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                      {hub.city}
                    </span>
                  </div>
                  <div className="p-5">
                    <h4 className="font-bold text-[#0F172A] text-sm font-heading mb-1">{hub.name}</h4>
                    <div className="text-xs text-slate-500 flex items-center gap-1.5 mb-2">
                      <MapPin size={13} className="text-[#0866F5] flex-shrink-0" />
                      <span className="truncate">{hub.address}</span>
                    </div>
                    <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                      <Clock size={12} className="text-[#0866F5]" /> {hub.timing}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Appointment Desk */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs h-fit">
          <h3 className="font-bold text-[#0F172A] text-base font-heading mb-1">Book Showroom VIP Visit</h3>
          <p className="text-xs text-slate-500 mb-4">Selected: <strong className="text-[#0866F5]">{selectedHub.name}</strong></p>

          {appointmentConfirmed ? (
            <div className="bg-gradient-to-br from-[#0866F5] to-[#0645B8] text-white border border-blue-500 rounded-2xl p-6 text-center animate-fade">
              <CheckCircle2 size={42} className="text-emerald-400 mx-auto mb-2" />
              <h4 className="font-bold text-white text-base font-heading">VIP Pass Generated!</h4>
              <p className="text-xs text-white opacity-90 mt-1">Free valet parking &amp; design consultation reserved.</p>
              <button
                type="button"
                onClick={() => setAppointmentConfirmed(false)}
                className="mt-4 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-full text-xs font-semibold"
              >
                Book Another Visit
              </button>
            </div>
          ) : (
            <form onSubmit={handleBookVisit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Your Name</label>
                <input type="text" required placeholder="Full Name" className="w-full text-xs p-3 border border-slate-300 rounded-xl outline-none focus:border-[#0866F5]" />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Phone Number</label>
                <input type="tel" required placeholder="10-digit mobile number" className="w-full text-xs p-3 border border-slate-300 rounded-xl outline-none focus:border-[#0866F5]" />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Preferred Date</label>
                <input type="date" required className="w-full text-xs p-3 border border-slate-300 rounded-xl outline-none focus:border-[#0866F5]" />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#0866F5] to-[#0653CA] hover:from-[#0653CA] hover:to-[#0542A5] text-white font-bold py-3.5 rounded-full text-xs transition-all shadow-[0_8px_24px_rgba(8,102,245,0.28)] font-heading cursor-pointer"
              >
                Confirm VIP Showroom Entry Pass
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
