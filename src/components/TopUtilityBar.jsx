import React from 'react';
import { Phone, MapPin, Award, Smartphone } from 'lucide-react';

export default function TopUtilityBar({ onOpenCity, selectedCity, onNavigate }) {
  return (
    <div className="top-utility-bar font-sans">
      <div className="master-container flex items-center justify-between">
        <ul className="top-utility-links">
          <li>
            <button onClick={() => onNavigate('b2b')} className="hover:text-[#0B192C]">
              ROOF RIDGE FOR BUSINESS
            </button>
          </li>
          <li>
            <button onClick={() => onNavigate('b2b')} className="hover:text-[#0B192C]">
              BECOME A VERIFIED PARTNER
            </button>
          </li>
          <li>
            <button onClick={() => onNavigate('experience')} className="hover:text-[#0B192C]">
              EXPERIENCE HUBS
            </button>
          </li>
          <li>
            <button onClick={() => onNavigate('track')} className="hover:text-[#0B192C]">
              TRACK YOUR PROJECT
            </button>
          </li>
          <li>
            <button onClick={() => onNavigate('loans')} className="highlight-link flex items-center gap-1">
              <Award size={13} className="text-[#0B192C]" /> RERA COMPLIANCE HUB
            </button>
          </li>
          <li className="hidden lg:inline-block">
            <button onClick={() => alert("Roof Ridge Mobile App download link dispatched!")} className="hover:text-[#0B192C] flex items-center gap-1">
              <Smartphone size={12} /> DOWNLOAD APP
            </button>
          </li>
        </ul>
        
        <div className="flex items-center gap-4 text-[11px]">
          <button 
            onClick={onOpenCity} 
            className="flex items-center gap-1 hover:text-[#0B192C] font-semibold transition-colors cursor-pointer"
          >
            <MapPin size={13} className="text-[#0B192C]" />
            <span>Location: <strong className="text-[#0B192C] font-bold">{selectedCity.name}</strong></span>
          </button>
          <div className="h-3 w-px bg-slate-300"></div>
          <a href="tel:18001239999" className="flex items-center gap-1 hover:text-[#0B192C] font-semibold">
            <Phone size={12} /> 1800-123-9999 (Toll Free)
          </a>
        </div>
      </div>
    </div>
  );
}
