import React, { useState } from 'react';
import { X, MapPin, Star, ShieldCheck, Download, Calendar, Phone, Send, CheckCircle2, Sparkles, Building2 } from 'lucide-react';

export default function PropertyDetailModal({ property, onClose }) {
  const [chatMessages, setChatMessages] = useState([
    { sender: 'bot', text: `Hello! I am RidgeBot AI. Ask me anything about ${property.title} (e.g., bank loan eligibility, RERA status, price negotiation).` }
  ]);
  const [userQuery, setUserQuery] = useState('');
  const [visitSubmitted, setVisitSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', date: '' });

  if (!property) return null;

  const handleSendChat = (e) => {
    e.preventDefault();
    if (!userQuery.trim()) return;

    const newMsgs = [...chatMessages, { sender: 'user', text: userQuery }];
    setChatMessages(newMsgs);
    const currentQ = userQuery.toLowerCase();
    setUserQuery('');

    setTimeout(() => {
      let botResp = "This property is 100% RERA verified with clear legal titles and immediate registration.";
      if (currentQ.includes('loan') || currentQ.includes('bank') || currentQ.includes('rate')) {
        botResp = "Approved by SBI, HDFC, ICICI, and Axis Bank with pre-approved 8.1% interest rates!";
      } else if (currentQ.includes('price') || currentQ.includes('discount') || currentQ.includes('negotiable')) {
        botResp = "Festive rebate of up to ₹ 3,50,000 applies if booked within this week directly on Roof Ridge.";
      } else if (currentQ.includes('possession') || currentQ.includes('ready')) {
        botResp = "Ready to move in! Keys handed over within 48 hours of payment completion.";
      }
      setChatMessages(prev => [...prev, { sender: 'bot', text: botResp }]);
    }, 500);
  };

  const handleVisitSubmit = (e) => {
    e.preventDefault();
    setVisitSubmitted(true);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card max-w-4xl font-sans">
        {/* Close Button */}
        <button onClick={onClose} className="modal-close-btn" aria-label="Close modal">
          <X size={18} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Info (Left 2 columns) */}
          <div className="md:col-span-2 space-y-4">
            {/* Main Image Banner */}
            <div className="relative rounded-2xl overflow-hidden h-72 bg-slate-100 shadow-md">
              <img src={property.image} alt={property.title} className="w-full h-full object-cover" />
              <div className="absolute top-3 left-3 bg-[#0B192C] text-white text-xs font-semibold px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg border border-white/20">
                <ShieldCheck size={15} /> RERA Approved ID: PRM/KA/RERA/1251
              </div>
              <div className="absolute bottom-3 right-3 bg-[#0B192C]/90 text-white text-[11px] font-medium px-3 py-1 rounded-full flex items-center gap-1 border border-white/20">
                <Sparkles size={12} className="text-white" /> Virtual 3D VR Tour Available
              </div>
            </div>

            {/* Location & Title */}
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#0B192C] uppercase tracking-wider mb-1">
                <MapPin size={14} />
                <span>{property.location}</span>
              </div>
              <h2 className="text-2xl font-bold text-[#0B192C] font-heading leading-tight">{property.title}</h2>
            </div>

            {/* Price & Discount */}
            <div className="flex items-baseline gap-3 p-3.5 bg-[#0B192C] text-white border border-[#0B192C] rounded-xl">
              <span className="text-2xl font-extrabold text-white font-heading">{property.price}</span>
              {property.originalPrice && (
                <span className="text-sm text-white opacity-80 line-through font-medium">{property.originalPrice}</span>
              )}
              <span className="ml-auto bg-white text-[#0B192C] text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wide">
                {property.discount}
              </span>
            </div>

            {/* Specs Summary Grid */}
            <div className="grid grid-cols-3 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-center text-xs">
              <div className="p-2 border-r border-slate-200">
                <span className="text-slate-400 block text-[11px] font-medium uppercase mb-0.5">Configuration</span>
                <strong className="text-slate-900 font-bold">{property.specs.split('•')[0] || '3 BHK'}</strong>
              </div>
              <div className="p-2 border-r border-slate-200">
                <span className="text-slate-400 block text-[11px] font-medium uppercase mb-0.5">Carpet Area</span>
                <strong className="text-slate-900 font-bold">{property.specs.split('•')[1] || '2,400 sq.ft'}</strong>
              </div>
              <div className="p-2">
                <span className="text-slate-400 block text-[11px] font-medium uppercase mb-0.5">Possession</span>
                <strong className="text-slate-900 font-bold">Immediate</strong>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs text-slate-600 leading-relaxed">
              Featuring double-height ceiling windows, imported Italian marble flooring, zero-edge landscape balcony views, and Schneider smart home automation. Fully compliant with modern structural and fire safety standards.
            </p>

            {/* RidgeBot Assistant Widget */}
            <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50 shadow-xs">
              <div className="flex items-center justify-between text-xs font-bold text-[#0B192C] mb-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#0B192C] text-white flex items-center justify-center font-bold text-[10px]">RB</div>
                  <span>RidgeBot AI Property Assistant</span>
                </div>
                <span className="text-[10px] text-[#0B192C] font-semibold bg-white px-2 py-0.5 rounded-full border border-slate-200">● Live AI Response</span>
              </div>

              <div className="h-32 overflow-y-auto space-y-2 mb-3 p-3 bg-white rounded-xl border border-slate-200 text-xs shadow-inner">
                {chatMessages.map((msg, idx) => (
                  <div 
                    key={idx} 
                    className={`p-2.5 rounded-xl max-w-[88%] leading-relaxed ${
                      msg.sender === 'user' 
                        ? 'bg-[#0B192C] text-white ml-auto font-medium shadow-xs' 
                        : 'bg-slate-100 text-slate-800 font-normal border border-slate-200'
                    }`}
                  >
                    {msg.text}
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendChat} className="flex gap-2">
                <input 
                  type="text"
                  placeholder="Ask about bank loan rates, floor plans, RERA registry..."
                  value={userQuery}
                  onChange={(e) => setUserQuery(e.target.value)}
                  className="flex-1 text-xs border border-slate-300 rounded-xl px-3.5 py-2 outline-none focus:border-[#0B192C] bg-white transition-all"
                />
                <button 
                  type="submit" 
                  className="bg-[#0B192C] hover:bg-[#162B48] text-white px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1 shadow-sm"
                >
                  <Send size={13} />
                  <span>Ask</span>
                </button>
              </form>
            </div>
          </div>

          {/* Action Sidebar (Right Column) */}
          <div className="bg-[#0B192C] text-white border border-[#0B192C] rounded-2xl p-5 flex flex-col justify-between shadow-xs">
            <div>
              <div className="text-center pb-4 border-b border-white/20 mb-4">
                <div className="w-10 h-10 rounded-full bg-white text-[#0B192C] flex items-center justify-center mx-auto mb-2 font-bold shadow-md">
                  <Building2 size={20} />
                </div>
                <span className="text-[11px] text-white opacity-80 uppercase font-semibold tracking-wider">Verified Listing Partner</span>
                <h4 className="font-bold text-white text-base font-heading mt-0.5">Roof Ridge Select Realty</h4>
                <div className="flex items-center justify-center gap-1 text-white text-xs font-bold mt-1">
                  <Star size={14} fill="white" /> 4.9 Super Partner (140+ Deals)
                </div>
              </div>

              {visitSubmitted ? (
                <div className="bg-white text-[#0B192C] rounded-xl p-5 text-center animate-fade">
                  <CheckCircle2 size={36} className="text-[#0B192C] mx-auto mb-2" />
                  <h4 className="font-bold text-[#0B192C] text-sm font-heading">VIP Site Visit Scheduled!</h4>
                  <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                    Our relationship manager will contact you at <strong>{formData.phone || 'your number'}</strong> to confirm cab pick-up details.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleVisitSubmit} className="space-y-3">
                  <h4 className="font-bold text-white text-xs font-heading uppercase tracking-wider">Schedule Free VIP Site Visit</h4>
                  <div>
                    <input 
                      type="text" 
                      required 
                      placeholder="Your Full Name" 
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full text-xs p-3 border border-slate-300 rounded-xl outline-none text-slate-900 bg-white" 
                    />
                  </div>
                  <div>
                    <input 
                      type="tel" 
                      required 
                      placeholder="Mobile Phone Number" 
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full text-xs p-3 border border-slate-300 rounded-xl outline-none text-slate-900 bg-white" 
                    />
                  </div>
                  <div>
                    <input 
                      type="date" 
                      required 
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full text-xs p-3 border border-slate-300 rounded-xl outline-none text-slate-900 bg-white" 
                    />
                  </div>
                  
                  <button 
                    type="submit" 
                    className="w-full bg-white hover:bg-slate-100 text-[#0B192C] font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-md font-heading"
                  >
                    <Calendar size={15} />
                    <span>Confirm Free Site Visit</span>
                  </button>
                </form>
              )}
            </div>

            <div className="pt-4 border-t border-white/20 mt-6 space-y-2">
              <a 
                href="tel:18001239999" 
                className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition-all border border-white/30"
              >
                <Phone size={14} className="text-white" />
                <span>Call Concierge Desk</span>
              </a>

              <button 
                onClick={() => alert("Downloading official RERA compliance report and floor plan PDF...")} 
                className="w-full text-[11px] text-white opacity-90 hover:opacity-100 font-medium flex items-center justify-center gap-1.5 py-1 transition-colors"
              >
                <Download size={13} />
                <span>Download Verified Floor Plan PDF</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
