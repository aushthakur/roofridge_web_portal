import React from 'react';
import {
  LayoutDashboard,
  Building2,
  Users2,
  UserCheck,
  CalendarCheck,
  Package,
  Landmark,
  ShieldAlert,
  Sliders,
  ExternalLink,
  LogOut,
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, counts = {}, onLogout }) {
  const menuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    {
      id: 'properties',
      label: 'Listing Moderation',
      icon: Building2,
      badge: counts.pendingProperties,
      badgeColor: 'bg-amber-500 text-white',
    },
    {
      id: 'leads',
      label: 'CRM Leads',
      icon: Users2,
      badge: counts.totalLeads,
      badgeColor: 'bg-blue-600 text-white',
    },
    {
      id: 'partners',
      label: 'Partner KYC & Onboarding',
      icon: UserCheck,
      badge: counts.pendingPartners,
      badgeColor: 'bg-emerald-600 text-white',
    },
    {
      id: 'bookings',
      label: 'Service Bookings',
      icon: CalendarCheck,
      badge: counts.totalBookings,
    },
    {
      id: 'orders',
      label: 'Materials Store Orders',
      icon: Package,
      badge: counts.totalOrders,
    },
    {
      id: 'finance',
      label: 'Loans & Legal Desk',
      icon: Landmark,
    },
    {
      id: 'cms',
      label: 'Banners & CMS',
      icon: Sliders,
    },
    {
      id: 'audit-logs',
      label: 'Audit & Compliance Logs',
      icon: ShieldAlert,
    },
  ];

  return (
    <aside className="w-64 bg-[#0A1224] text-white flex flex-col shrink-0 min-h-screen border-r border-slate-800/80 select-none font-sans shadow-xl">
      {/* Brand Header */}
      <div className="px-5 py-4 border-b border-slate-800/80 bg-slate-900/40">
        <div className="flex items-center justify-between gap-2">
          <img
            src="/RRlogo_white.png"
            alt="RoofRidge"
            className="h-7 w-auto object-contain max-w-[145px]"
          />
          <span className="shrink-0 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-500/15 text-blue-400 border border-blue-500/30">
            Admin
          </span>
        </div>
        <div className="mt-2.5 flex items-center gap-2 text-[11px] font-medium text-slate-400">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="tracking-wide text-slate-300 font-medium">Ops Control Center</span>
        </div>
      </div>

      {/* Nav Menu */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        <p className="px-3 pt-2 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Platform Operations
        </p>

        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer ${
                isActive
                  ? 'bg-[#0866F5] text-white shadow-md shadow-blue-600/30 font-bold'
                  : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon size={16} className={isActive ? 'text-white' : 'text-slate-400'} />
                <span>{item.label}</span>
              </div>
              {item.badge !== undefined && item.badge > 0 && (
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-bold ml-auto ${
                    isActive ? 'bg-white/20 text-white' : item.badgeColor || 'bg-slate-800 text-slate-300'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer controls */}
      <div className="p-3 border-t border-slate-800/80 space-y-1.5 bg-slate-900/40">
        <a
          href="http://localhost:5173"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between w-full px-3 py-2 rounded-lg bg-slate-800/60 hover:bg-slate-800 text-slate-200 text-xs font-medium transition cursor-pointer border border-slate-700/50"
        >
          <span className="flex items-center gap-2">
            <ExternalLink size={13} className="text-blue-400" />
            Public Web Portal
          </span>
          <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            Live
          </span>
        </a>

        <button
          onClick={onLogout}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-rose-300 hover:bg-rose-500/15 text-xs font-semibold transition cursor-pointer"
        >
          <LogOut size={14} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
