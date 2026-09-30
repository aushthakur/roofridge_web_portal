import React, { useState } from 'react';
import { CheckCircle2, Star, ArrowRight } from 'lucide-react';

const SERVICES = [
  {
    id: 'clean',
    title: 'Full Home Deep Sanitization & Cleaning',
    desc: 'Mechanized floor scrubbing, window degreasing & sofa shampooing.',
    price: '₹ 3,499',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'paint',
    title: 'Asian Paints Waterproofing & Exterior Painting',
    desc: 'Laser wall moisture measurement, dust-free sanding & 5-year warranty.',
    price: '₹ 14 / sq.ft',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'solar',
    title: 'Rooftop Solar Panel Grid Setup (3KW - 10KW)',
    desc: '80% electricity bill reduction, net metering setup & government subsidy.',
    price: '₹ 1.45 Lakhs',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=600&q=80'
  }
];

export default function HomeServicesPage({ selectedCity }) {
  const [selectedService, setSelectedService] = useState(SERVICES[0]);
  const [selectedSlot, setSelectedSlot] = useState('Morning');
  const [booked, setBooked] = useState(false);

  const handleBookService = (e) => {
    e.preventDefault();
    setBooked(true);
  };

  return (
    <div className="max-w-[1380px] mx-auto px-8 py-8 animate-fade font-sans">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0B192C] via-[#162B48] to-[#0B192C] rounded-2xl p-8 mb-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl text-white">
          <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-white/40 inline-block mb-3">
            Background Verified Professionals
          </span>
          <h1 className="text-3xl font-bold font-heading mb-2 text-white">
            On-Demand Home Services in {selectedCity.name}
          </h1>
          <p className="text-xs text-white opacity-95 leading-relaxed">
            Book verified technicians for Deep Cleaning, Waterproofing, Rooftop Solar Installation & Smart Electrical Repair with 100% Damage Protection Guarantee.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Services Catalog */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="font-bold text-[#0B192C] text-lg font-heading">Select Service Package</h3>

          {SERVICES.map((srv) => (
            <div 
              key={srv.id}
              onClick={() => setSelectedService(srv)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer flex gap-4 bg-white shadow-xs ${
                selectedService.id === srv.id ? 'border-[#0B192C] ring-2 ring-[#0B192C]/20' : 'border-slate-200 hover:border-[#0B192C]'
              }`}
            >
              <img src={srv.image} alt={srv.title} className="w-24 h-24 rounded-xl object-cover" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-[#0B192C] text-sm font-heading">{srv.title}</h4>
                  <div className="flex items-center gap-1 text-[#0B192C] font-bold text-xs">
                    <Star size={12} fill="#0B192C" />
                    <span>{srv.rating}</span>
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{srv.desc}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-base font-bold text-[#0B192C] font-heading">{srv.price}</span>
                  <span className="text-[11px] font-semibold text-[#0B192C] bg-slate-100 px-2 py-0.5 rounded">Verified Crew</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Booking Slot Panel */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs h-fit">
          <h3 className="font-bold text-[#0B192C] text-base font-heading mb-1">Book Technician Visit</h3>
          <p className="text-xs text-slate-500 mb-4">Selected: <strong className="text-[#0B192C]">{selectedService.title}</strong></p>

          {booked ? (
            <div className="bg-[#0B192C] text-white border border-[#0B192C] rounded-xl p-5 text-center animate-fade">
              <CheckCircle2 size={40} className="text-white mx-auto mb-2" />
              <h4 className="font-bold text-white text-sm font-heading">Service Booking Confirmed!</h4>
              <p className="text-xs text-white opacity-90 mt-1">Technician assigned. Tracking SMS sent to your mobile.</p>
            </div>
          ) : (
            <form onSubmit={handleBookService} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Select Time Slot</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Morning', 'Afternoon', 'Evening'].map(slot => (
                    <button 
                      key={slot}
                      type="button"
                      onClick={() => setSelectedSlot(slot)}
                      className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                        selectedSlot === slot ? 'bg-[#0B192C] text-white border-[#0B192C] shadow-xs' : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Service Address</label>
                <input 
                  type="text" 
                  required 
                  placeholder="Enter house no, street, locality" 
                  className="w-full text-xs p-3 border border-slate-300 rounded-xl outline-none focus:border-[#0B192C]" 
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Mobile Number</label>
                <input 
                  type="tel" 
                  required 
                  placeholder="10-digit phone number" 
                  className="w-full text-xs p-3 border border-slate-300 rounded-xl outline-none focus:border-[#0B192C]" 
                />
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-600">Total Standard Price</span>
                <span className="text-[#0B192C] text-sm font-bold font-heading">{selectedService.price}</span>
              </div>

              <button 
                type="submit" 
                className="w-full bg-[#0B192C] hover:bg-[#162B48] text-white font-bold py-3.5 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-md font-heading"
              >
                <span>Confirm Service Booking</span>
                <ArrowRight size={14} />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
