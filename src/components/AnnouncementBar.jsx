import React from 'react';
import { ChevronRight, Sparkles } from 'lucide-react';

export default function AnnouncementBar({ onOpenDeal }) {
  return (
    <div className="announcement-bar font-sans">
      <div className="rr-container flex items-center justify-between w-full gap-2">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-left flex-1">
          <span className="bg-white/20 text-white text-[10px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider whitespace-nowrap">
            FESTIVE EXPO
          </span>
          <span className="text-white text-[10px] sm:text-xs font-medium leading-tight">
            Flat ₹50K Cashback + Free Design Blueprint
          </span>
          <span className="announcement-code text-[10px] sm:text-xs font-bold text-[#FFD700] bg-white/10 px-1.5 py-0.5 rounded whitespace-nowrap">
            USE CODE: RIDGE2026
          </span>
        </div>

        <button 
          onClick={onOpenDeal}
          className="flex items-center gap-0.5 text-[10px] sm:text-xs font-bold text-white hover:underline cursor-pointer transition-all shrink-0 whitespace-nowrap"
        >
          <span>CLAIM OFFER</span>
          <ChevronRight size={12} />
        </button>
      </div>
    </div>
  );
}
