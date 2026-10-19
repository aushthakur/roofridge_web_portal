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
    <aside className="w-64 bg-gradient-to-b from-[#0866F5] via-[#0645B8] to-[#04338A] text-white flex flex-col shrink-0 min-h-screen border-r border-blue-400/20 select-none font-sans shadow-xl">
      {/* Brand Header */}
      <div className="p-5 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/RRlogo_white.png" alt="Roof Ridge" className="h-8 w-auto object-contain" />
          <div>
            <h1 className="font-extrabold text-white text-base leading-tight tracking-wide">
              ROOF RIDGE
            </h1>
            <p className="text-[10px] font-bold tracking-widest text-sky-200 uppercase">
              Executive Ops Center
            </p>
          </div>
        </div>
      </div>

      {/* Nav Menu */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        <p className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-white/60">
          Platform Operations
        </p>

        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer ${
                isActive
                  ? 'bg-white text-[#0866F5] shadow-md shadow-black/10 font-bold'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon size={16} className={isActive ? 'text-[#0866F5]' : 'text-white/70'} />
                <span>{item.label}</span>
              </div>
              {item.badge !== undefined && item.badge > 0 && (
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                    isActive ? 'bg-[#0866F5] text-white' : item.badgeColor || 'bg-white/20 text-white'
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
      <div className="p-4 border-t border-white/10 space-y-2">
        <a
          href="http://localhost:5173"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between w-full px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition cursor-pointer"
        >
          <span className="flex items-center gap-2">
            <ExternalLink size={13} className="text-sky-200" />
            Public Web Portal
          </span>
          <span className="text-[10px] text-emerald-300 font-bold">Online</span>
        </a>

        <button
          onClick={onLogout}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-rose-200 hover:bg-rose-500/20 text-xs font-semibold transition cursor-pointer"
        >
          <LogOut size={14} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
