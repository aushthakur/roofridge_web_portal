import React, { useState } from 'react';
import { Search, Phone } from 'lucide-react';

export default function TrackProjectPage() {
  const [trackingId, setTrackingId] = useState('ORD-2026-88192');
  const [statusFound, setStatusFound] = useState(true);

  const steps = [
    { label: 'Booking & Order Confirmed', date: '26 Aug 2026, 10:30 AM', done: true },
    { label: 'Quality Verification & Dispatch Audit', date: '27 Aug 2026, 02:15 PM', done: true },
    { label: 'In Transit / Logistics Vehicle En-Route', date: '28 Aug 2026, 08:00 AM', done: true, current: true },
    { label: 'Site Delivery & Unloading', date: 'Expected 29 Aug 2026', done: false }
  ];

  return (
    <div className="max-w-[1380px] mx-auto px-8 py-8 animate-fade font-sans">
      {/* Search Header */}
      <div className="bg-gradient-to-r from-[#0B192C] via-[#162B48] to-[#0B192C] rounded-2xl p-8 mb-8 text-white shadow-xl">
        <h1 className="text-3xl font-bold font-heading mb-2 text-white">Track Project & Material Orders</h1>
        <p className="text-xs text-white opacity-95 mb-6">Enter your Roof Ridge Order ID (ORD-XXXX) or Project Reference Number to view live progress.</p>

        <form onSubmit={(e) => { e.preventDefault(); setStatusFound(true); }} className="flex gap-2 max-w-lg">
          <input 
            type="text" 
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
            placeholder="e.g. ORD-2026-88192" 
            className="flex-1 text-xs p-3.5 rounded-xl outline-none text-slate-900 font-bold bg-white"
          />
          <button type="submit" className="bg-[#0B192C] border border-white/40 hover:bg-[#162B48] text-white font-bold text-xs px-6 rounded-xl transition-all flex items-center gap-2">
            <Search size={16} />
            <span>Track Order</span>
          </button>
        </form>
      </div>

      {/* Progress Timeline */}
      {statusFound && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">Tracking Reference</span>
                <h3 className="text-lg font-bold text-[#0B192C] font-heading">{trackingId}</h3>
              </div>
              <span className="bg-[#0B192C] text-white text-xs font-bold px-3 py-1 rounded-full border border-[#0B192C]">
                ● In Transit to Site
              </span>
            </div>

            {/* Stepper */}
            <div className="space-y-6 relative pl-6 border-l-2 border-[#0B192C] ml-3">
              {steps.map((step, idx) => (
                <div key={idx} className="relative">
                  <div className={`absolute -left-[31px] top-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    step.done ? 'bg-[#0B192C] text-white' : 'bg-slate-200 text-slate-500'
                  }`}>
                    {step.done ? '✓' : idx + 1}
                  </div>
                  <div>
                    <h4 className={`text-sm font-bold font-heading ${step.current ? 'text-[#0B192C]' : 'text-slate-900'}`}>{step.label}</h4>
                    <span className="text-xs text-slate-400 font-medium block mt-0.5">{step.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Logistics Summary */}
          <div className="bg-[#0B192C] text-white p-6 rounded-2xl border border-[#0B192C] shadow-xs space-y-4 h-fit">
            <h4 className="font-bold text-white text-sm font-heading">Dispatched Order Summary</h4>
            <div className="p-3 bg-[#162B48] rounded-xl border border-white/20 text-xs text-white space-y-1">
              <span className="text-white opacity-90 block">Item: UltraTech Super Cement (200 Bags)</span>
              <span className="text-white opacity-90 block">Vendor: Roof Ridge Logistics Hub #4</span>
              <span className="text-white font-bold block mt-1">Vehicle: HR-26-CB-9912 (GPS Tracked)</span>
            </div>

            <a 
              href="tel:18001239999" 
              className="w-full bg-white hover:bg-slate-100 text-[#0B192C] font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-2 transition-all block text-center font-heading"
            >
              <Phone size={14} className="text-[#0B192C]" />
              <span>Contact Driver & Logistics Desk</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
