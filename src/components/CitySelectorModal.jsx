import React from 'react';
import { CITIES } from '../data/mockData';
import { X, MapPin, Check, Compass } from 'lucide-react';

export default function CitySelectorModal({ selectedCity, onSelectCity, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-card max-w-md font-sans">
        <button onClick={onClose} className="modal-close-btn" aria-label="Close modal">
          <X size={18} />
        </button>

        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 rounded-lg bg-[#0B192C] text-white flex items-center justify-center font-bold">
            <MapPin size={18} />
          </div>
          <h3 className="text-xl font-bold text-[#0B192C] font-heading">Select Your Location</h3>
        </div>
        <p className="text-xs text-slate-500 mb-6 leading-relaxed">
          Choose your city to browse verified properties, civil contractors, interior designers & material suppliers near you.
        </p>

        <div className="grid grid-cols-2 gap-3">
          {CITIES.map((city) => {
            const isSelected = selectedCity.id === city.id;
            return (
              <button 
                key={city.id}
                onClick={() => {
                  onSelectCity(city);
                  onClose();
                }}
                className={`p-3.5 rounded-xl border flex items-center justify-between transition-all text-xs font-semibold ${
                  isSelected 
                    ? 'border-[#0B192C] bg-[#0B192C] text-white shadow-sm font-bold' 
                    : 'border-slate-200 hover:border-[#0B192C] hover:bg-slate-50 text-slate-800'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className={`w-7 h-7 rounded-md text-[10px] font-bold font-mono flex items-center justify-center border ${
                    isSelected ? 'bg-white text-[#0B192C] border-white' : 'bg-slate-100 text-[#0B192C] border-slate-200'
                  }`}>
                    {city.code}
                  </div>
                  <span className="font-heading">{city.name}</span>
                </div>
                {isSelected && <Check size={16} className="text-white font-bold" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
