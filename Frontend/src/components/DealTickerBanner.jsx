import React, { useState, useEffect } from 'react';
import { Flame, Clock, ChevronRight } from 'lucide-react';

export default function DealTickerBanner({ onClaimDeal }) {
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 32, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="section-container">
      <div className="banner-strip-deal">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white text-[#0B192C] flex items-center justify-center shadow-lg">
            <Flame size={26} className="animate-pulse" />
          </div>
          <div className="deal-info text-white">
            <h3 className="text-white font-bold text-xl">Festive Realty & Interior Expo 2026</h3>
            <p className="text-white opacity-95 text-xs">Get extra 10% instant rebate + free legal title report on all verified listings.</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="deal-countdown hidden lg:flex">
            <div className="flex items-center gap-1.5 text-xs text-white font-semibold mr-2">
              <Clock size={16} className="text-white" /> Deals Expire In:
            </div>
            <div className="timer-box">
              <div className="timer-num">{String(timeLeft.hours).padStart(2, '0')}</div>
              <div className="timer-unit">HRS</div>
            </div>
            <span className="text-white font-bold">:</span>
            <div className="timer-box">
              <div className="timer-num">{String(timeLeft.minutes).padStart(2, '0')}</div>
              <div className="timer-unit">MIN</div>
            </div>
            <span className="text-white font-bold">:</span>
            <div className="timer-box">
              <div className="timer-num">{String(timeLeft.seconds).padStart(2, '0')}</div>
              <div className="timer-unit">SEC</div>
            </div>
          </div>

          <button 
            onClick={onClaimDeal}
            className="bg-white hover:bg-slate-100 text-[#0B192C] font-bold text-sm px-5 py-3 rounded-xl flex items-center gap-2 transition-all shadow-md font-heading"
          >
            <span>Claim Discount Voucher</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
