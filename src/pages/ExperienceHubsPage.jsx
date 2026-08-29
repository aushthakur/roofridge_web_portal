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
    <div className="max-w-[1380px] mx-auto px-8 py-8 animate-fade font-sans">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0B192C] via-[#162B48] to-[#0B192C] rounded-2xl p-8 mb-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl text-white">
          <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-white/40 inline-block mb-3">
            Physical Showrooms & VR Lounges
          </span>
          <h1 className="text-3xl font-bold font-heading mb-2 text-white">
            Roof Ridge Experience Hubs
          </h1>
          <p className="text-xs text-white opacity-95 leading-relaxed">
            Touch and feel materials, preview 1:1 scale modular kitchen layouts & experience 3D VR home walkthroughs with senior architects.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Hubs List */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="font-bold text-[#0B192C] text-lg font-heading">Experience Centers Near You</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {HUBS.map(hub => (
              <div 
                key={hub.id}
                onClick={() => setSelectedHub(hub)}
                className={`bg-white border rounded-2xl overflow-hidden shadow-xs cursor-pointer transition-all ${
                  selectedHub.id === hub.id ? 'border-[#0B192C] ring-2 ring-[#0B192C]/20' : 'border-slate-200 hover:border-[#0B192C]'
                }`}
              >
                <div className="h-40 bg-slate-100 relative">
                  <img src={hub.image} alt={hub.name} className="w-full h-full object-cover" />
                  <span className="absolute top-3 left-3 bg-[#0B192C] text-white text-[10px] font-bold px-2.5 py-1 rounded-md">
                    {hub.city}
                  </span>
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-[#0B192C] text-sm font-heading mb-1">{hub.name}</h4>
                  <div className="text-xs text-slate-500 flex items-center gap-1 mb-2">
                    <MapPin size={12} className="text-[#0B192C] flex-shrink-0" />
                    <span className="truncate">{hub.address}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Clock size={11} /> {hub.timing}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Appointment Desk */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs h-fit">
          <h3 className="font-bold text-[#0B192C] text-base font-heading mb-1">Book Showroom VIP Visit</h3>
          <p className="text-xs text-slate-500 mb-4">Selected: <strong className="text-[#0B192C]">{selectedHub.name}</strong></p>

          {appointmentConfirmed ? (
            <div className="bg-[#0B192C] text-white border border-[#0B192C] rounded-xl p-5 text-center animate-fade">
              <CheckCircle2 size={40} className="text-white mx-auto mb-2" />
              <h4 className="font-bold text-white text-sm font-heading">VIP Pass Generated!</h4>
              <p className="text-xs text-white opacity-90 mt-1">Free valet parking & design consultation reserved.</p>
            </div>
          ) : (
            <form onSubmit={handleBookVisit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Your Name</label>
                <input type="text" required placeholder="Full Name" className="w-full text-xs p-3 border border-slate-300 rounded-xl outline-none focus:border-[#0B192C]" />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Phone Number</label>
                <input type="tel" required placeholder="10-digit mobile number" className="w-full text-xs p-3 border border-slate-300 rounded-xl outline-none focus:border-[#0B192C]" />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Preferred Date</label>
                <input type="date" required className="w-full text-xs p-3 border border-slate-300 rounded-xl outline-none focus:border-[#0B192C]" />
              </div>

              <button type="submit" className="w-full bg-[#0B192C] hover:bg-[#162B48] text-white font-bold py-3.5 rounded-xl text-xs transition-all shadow-md font-heading">
                Confirm VIP Showroom Entry Pass
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
