import React from 'react';
import { Bell, ShieldCheck, RefreshCw, UserCheck } from 'lucide-react';

export default function Header({ title, onRefresh, isRefreshing, adminUser }) {
  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-20">
      <div>
        <h2 className="text-lg font-bold text-[#0F172A] tracking-tight font-sans">{title}</h2>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Engine Connected: Port 5000</span>
          <span>•</span>
          <span className="text-slate-400">Environment: Production Master</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {onRefresh && (
          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 text-xs font-semibold shadow-xs transition cursor-pointer disabled:opacity-50"
            title="Refresh Data"
          >
            <RefreshCw size={13} className={isRefreshing ? 'animate-spin text-[#0866F5]' : ''} />
            <span>Sync</span>
          </button>
        )}

        {/* Admin status pill */}
        <div className="flex items-center gap-2 pl-3 border-l border-slate-200">
          <div className="w-8 h-8 rounded-full bg-[#0866F5] text-white flex items-center justify-center font-bold text-xs uppercase shadow-xs">
            {adminUser?.name ? adminUser.name.charAt(0) : 'A'}
          </div>
          <div className="text-left hidden sm:block">
            <p className="text-xs font-bold text-[#0F172A] leading-none">
              {adminUser?.name || 'Administrator'}
            </p>
            <p className="text-[10px] font-semibold text-[#0866F5] uppercase tracking-wider">
              {adminUser?.role || 'Super Admin'}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
