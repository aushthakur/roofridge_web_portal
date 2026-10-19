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
    <div className="max-w-[1380px] mx-auto px-4 sm:px-8 py-5 animate-fade font-sans">
      {/* Search Header */}
      <div className="bg-gradient-to-r from-[#0866F5] via-[#0052CC] to-[#0866F5] rounded-2xl p-5 sm:p-6 mb-5 text-white shadow-lg shadow-blue-500/15">
        <h1 className="text-xl sm:text-2xl font-bold font-heading mb-1 text-white">Track Project &amp; Material Orders</h1>
        <p className="text-xs text-white opacity-95 mb-4">Enter your Roof Ridge Order ID (ORD-XXXX) or Project Reference Number to view live progress.</p>

        <form onSubmit={(e) => { e.preventDefault(); setStatusFound(true); }} className="flex flex-col sm:flex-row gap-2 max-w-lg">
          <input 
            type="text" 
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
            placeholder="e.g. ORD-2026-88192" 
            className="flex-1 text-xs p-3 rounded-full outline-none text-slate-900 font-bold bg-white border border-slate-200"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-[#0866F5] to-[#0653CA] hover:from-[#0653CA] hover:to-[#0542A5] text-white font-bold text-xs px-5 py-3 rounded-full transition-all flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(8,102,245,0.3)] cursor-pointer"
          >
            <Search size={15} />
            <span>Track Order</span>
          </button>
        </form>
      </div>

      {/* Progress Timeline */}
      {statusFound && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 gap-3">
              <div>
                <span className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">Tracking Reference</span>
                <h3 className="text-lg font-bold text-[#0F172A] font-heading">{trackingId}</h3>
              </div>
              <span className="bg-[#EEF5FF] text-[#0866F5] text-xs font-bold px-3.5 py-1.5 rounded-full border border-[#0866F5]/30 self-start sm:self-auto flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#0866F5] animate-pulse"></span>
                In Transit to Site
              </span>
            </div>

            {/* Stepper */}
            <div className="space-y-7 relative pl-6 border-l-2 border-[#0866F5]/30 ml-3">
              {steps.map((step, idx) => (
                <div key={idx} className="relative">
                  <div className={`absolute -left-[31px] top-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    step.done ? 'bg-[#0866F5] text-white shadow-md' : 'bg-slate-200 text-slate-500'
                  }`}>
                    {step.done ? '✓' : idx + 1}
                  </div>
                  <div>
                    <h4 className={`text-sm font-bold font-heading ${step.current ? 'text-[#0866F5]' : 'text-[#0F172A]'}`}>{step.label}</h4>
                    <span className="text-xs text-slate-400 font-medium block mt-0.5">{step.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Logistics Summary */}
          <div className="bg-gradient-to-br from-[#0866F5] to-[#0645B8] text-white p-6 sm:p-8 rounded-2xl border border-blue-400/30 shadow-xl space-y-5 h-fit">
            <h4 className="font-bold text-white text-base font-heading">Dispatched Order Summary</h4>
            <div className="p-4 bg-white/10 rounded-xl border border-white/15 text-xs text-white space-y-1.5">
              <span className="text-white/90 block">Item: UltraTech Super Cement (200 Bags)</span>
              <span className="text-white/90 block">Vendor: Roof Ridge Logistics Hub #4</span>
              <span className="text-[#38BDF8] font-bold block mt-1">Vehicle: HR-26-CB-9912 (GPS Tracked)</span>
            </div>

            <a 
              href="tel:18001239999" 
              className="w-full bg-gradient-to-r from-[#0866F5] to-[#0653CA] hover:from-[#0653CA] hover:to-[#0542A5] text-white font-bold py-3.5 rounded-full text-xs flex items-center justify-center gap-2 transition-all block text-center font-heading shadow-[0_8px_20px_rgba(8,102,245,0.35)]"
            >
              <Phone size={14} className="text-white" />
              <span>Contact Driver &amp; Logistics Desk</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
