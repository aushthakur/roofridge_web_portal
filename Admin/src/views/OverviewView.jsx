import React from 'react';
import {
  Building2,
  Users2,
  CalendarCheck,
  Package,
  TrendingUp,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
} from 'lucide-react';

export default function OverviewView({ data, setActiveTab, onRefresh }) {
  const metrics = data?.metrics || {
    totalProperties: 0,
    pendingProperties: 0,
    totalLeads: 0,
    totalBookings: 0,
    totalOrders: 0,
    totalUsers: 0,
    platformGMV: 0,
  };

  const statCards = [
    {
      title: 'Active Property Listings',
      value: metrics.totalProperties,
      sub: `${metrics.pendingProperties} pending moderation`,
      icon: Building2,
      color: 'from-blue-600 to-indigo-700',
      tab: 'properties',
    },
    {
      title: 'CRM Leads Captured',
      value: metrics.totalLeads,
      sub: 'Real-time pipeline active',
      icon: Users2,
      color: 'from-[#0866F5] to-amber-600',
      tab: 'leads',
    },
    {
      title: 'Service Bookings',
      value: metrics.totalBookings,
      sub: 'Interiors & Maintenance',
      icon: CalendarCheck,
      color: 'from-emerald-600 to-teal-700',
      tab: 'bookings',
    },
    {
      title: 'Materials Orders',
      value: metrics.totalOrders,
      sub: `Gross Volume: ₹${Number(metrics.platformGMV || 0).toLocaleString('en-IN')}`,
      icon: Package,
      color: 'from-purple-600 to-violet-700',
      tab: 'orders',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Pending Moderation Alert Banner */}
      {metrics.pendingProperties > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500 text-white flex items-center justify-center shrink-0">
              <AlertCircle size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-amber-900">
                {metrics.pendingProperties} Property Listings Awaiting Moderation
              </h4>
              <p className="text-xs text-amber-700">
                New owner/broker submissions require verification before appearing on the public marketplace.
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('properties')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-lg shadow-xs transition cursor-pointer"
          >
            Review Queue <ArrowRight size={13} />
          </button>
        </div>
      )}

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              onClick={() => setActiveTab(card.tab)}
              className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-500">{card.title}</span>
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-tr ${card.color} text-white flex items-center justify-center shadow-xs`}>
                  <Icon size={16} />
                </div>
              </div>
              <div className="text-2xl font-black text-slate-900 tracking-tight">
                {card.value}
              </div>
              <div className="mt-2 text-xs font-medium text-slate-500 flex items-center justify-between">
                <span>{card.sub}</span>
                <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 text-[#0866F5] transition-opacity" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent CRM Leads Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Recent Customer Inquiries & Leads</h3>
            <p className="text-xs text-slate-500">Live feed from Property Inquiries, Quick Finder, and Home Services</p>
          </div>
          <button
            onClick={() => setActiveTab('leads')}
            className="text-xs font-bold text-[#0866F5] hover:underline flex items-center gap-1 cursor-pointer"
          >
            View All Leads <ArrowRight size={13} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase font-semibold text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">Lead #</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Source & Interest</th>
                <th className="px-4 py-3">Property / Service</th>
                <th className="px-4 py-3">City</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Received At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {data?.recentLeads && data.recentLeads.length > 0 ? (
                data.recentLeads.map((lead) => (
                  <tr key={lead._id} className="hover:bg-slate-50/80 transition">
                    <td className="px-4 py-3 font-mono font-bold text-slate-900">
                      {lead.leadNumber}
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-bold text-slate-900">{lead.fullName}</div>
                      <div className="text-[11px] text-slate-500">{lead.phone}</div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="capitalize px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-700">
                        {lead.source?.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="px-4 py-3 max-w-xs truncate text-slate-800">
                      {lead.property?.title || lead.notes || 'General Inquiry'}
                    </td>
                    <td className="px-4 py-3 text-slate-600">{lead.city || 'Noida'}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          lead.status === 'new'
                            ? 'bg-blue-100 text-blue-700'
                            : lead.status === 'contacted'
                            ? 'bg-amber-100 text-amber-700'
                            : lead.status === 'closed_won'
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {lead.status?.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-400">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-slate-400">
                    No leads recorded yet. Try submitting an inquiry on the public portal!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
