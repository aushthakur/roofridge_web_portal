import React from 'react';
import { Bell, ShieldCheck, RefreshCw, UserCheck } from 'lucide-react';

export default function Header({ title, onRefresh, isRefreshing, adminUser }) {
  return (
    <header className="h-16 bg-white border-b border-slate-200/90 px-6 flex items-center justify-between sticky top-0 z-20 shadow-xs">
      <div className="flex flex-col justify-center">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-snug">
          {title}
        </h2>
        <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
          <span className="flex items-center gap-1.5 font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Engine Active :5000
          </span>
          <span className="text-slate-300">•</span>
          <span className="text-slate-400 font-medium">Production Ops Desk</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {onRefresh && (
          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50/80 hover:bg-slate-100 text-slate-700 text-xs font-semibold shadow-xs transition cursor-pointer disabled:opacity-50"
            title="Refresh Data & Metrics"
          >
            <RefreshCw size={13} className={isRefreshing ? 'animate-spin text-[#0866F5]' : 'text-slate-500'} />
            <span>Sync</span>
          </button>
        )}

        {/* Admin status pill */}
        <div className="flex items-center gap-2.5 pl-3 border-l border-slate-200">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#0866F5] to-blue-500 text-white flex items-center justify-center font-bold text-xs uppercase shadow-sm">
            {adminUser?.name ? adminUser.name.charAt(0) : 'A'}
          </div>
          <div className="text-left hidden sm:block">
            <p className="text-xs font-bold text-slate-900 leading-none">
              {adminUser?.name || 'Administrator'}
            </p>
            <p className="text-[10px] font-semibold text-[#0866F5] uppercase tracking-wider mt-0.5">
              {adminUser?.role || 'Super Admin'}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
