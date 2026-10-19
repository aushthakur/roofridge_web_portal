import React, { useState, useEffect } from 'react';
import adminApi from '../services/api';
import {
  Users2,
  Phone,
  Mail,
  Calendar,
  MessageSquare,
  Search,
  Filter,
  CheckCircle,
  Clock,
  Send,
  X,
} from 'lucide-react';

export default function LeadsView() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [activeLead, setActiveLead] = useState(null);
  const [leadActivities, setLeadActivities] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [submittingNote, setSubmittingNote] = useState(false);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const res = await adminApi.get(`/leads?status=${statusFilter}`);
      setLeads(res.data || []);
    } catch (err) {
      console.error('Failed to fetch leads:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [statusFilter]);

  const handleStatusChange = async (leadId, newStatus) => {
    try {
      await adminApi.put(`/leads/${leadId}/status`, {
        status: newStatus,
        comment: `Representative updated lead pipeline stage to ${newStatus}`,
      });
      fetchLeads();
      if (activeLead?._id === leadId) {
        setActiveLead((prev) => ({ ...prev, status: newStatus }));
        openLeadTimeline(leadId);
      }
    } catch (err) {
      alert('Status update failed: ' + err.message);
    }
  };

  const openLeadTimeline = async (leadId) => {
    try {
      const res = await adminApi.get(`/leads/${leadId}`);
      setActiveLead(res.data?.lead);
      setLeadActivities(res.data?.activities || []);
    } catch (err) {
      console.error('Error fetching lead timeline:', err);
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!newNote.trim() || !activeLead) return;

    try {
      setSubmittingNote(true);
      await adminApi.post(`/leads/${activeLead._id}/notes`, {
        comment: newNote,
        activityType: 'note_added',
      });
      setNewNote('');
      openLeadTimeline(activeLead._id);
    } catch (err) {
      alert('Failed to add note: ' + err.message);
    } finally {
      setSubmittingNote(false);
    }
  };

  const filteredLeads = leads.filter((l) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      l.fullName?.toLowerCase().includes(q) ||
      l.phone?.includes(q) ||
      l.leadNumber?.toLowerCase().includes(q) ||
      l.city?.toLowerCase().includes(q)
    );
  });

  const statuses = [
    'all',
    'new',
    'contacted',
    'site_visit_scheduled',
    'negotiation',
    'closed_won',
    'closed_lost',
  ];

  return (
    <div className="space-y-5">
      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {statuses.map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition whitespace-nowrap cursor-pointer ${
                statusFilter === st
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {st.replace(/_/g, ' ')}
            </button>
          ))}
        </div>

        <div className="relative min-w-[240px]">
          <Search size={14} className="absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search by customer, phone, lead #..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg outline-none focus:border-blue-500 transition"
          />
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase font-semibold text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">Lead #</th>
                <th className="px-4 py-3">Client</th>
                <th className="px-4 py-3">Source & Type</th>
                <th className="px-4 py-3">Property / Notes</th>
                <th className="px-4 py-3">Stage / Status</th>
                <th className="px-4 py-3">Priority</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {loading ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-slate-400">
                    Loading CRM leads...
                  </td>
                </tr>
              ) : filteredLeads.length > 0 ? (
                filteredLeads.map((lead) => (
                  <tr key={lead._id} className="hover:bg-slate-50/80 transition">
                    <td className="px-4 py-3 font-mono font-bold text-slate-900">
                      {lead.leadNumber}
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-bold text-slate-900">{lead.fullName}</div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-1.5 mt-0.5">
                        <Phone size={10} className="text-slate-400" />
                        <span className="font-mono">{lead.phone}</span>
                        <a
                          href={`tel:${lead.phone}`}
                          title="Call Client"
                          className="text-[#0866F5] hover:underline font-bold"
                        >
                          Call
                        </a>
                        <span className="text-slate-300">•</span>
                        <a
                          href={`https://wa.me/91${lead.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(lead.fullName)}%2C%20we%20received%20your%20VIP%20inquiry%20on%20Roof%20Ridge.`}
                          target="_blank"
                          rel="noreferrer"
                          title="WhatsApp Client"
                          className="text-emerald-600 hover:underline font-bold"
                        >
                          WA
                        </a>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="capitalize px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-700">
                        {lead.source?.replace(/_/g, ' ')}
                      </span>
                      <div className="text-[10px] text-slate-400 capitalize mt-0.5">
                        Interested in {lead.interestType}
                      </div>
                    </td>
                    <td className="px-4 py-3 max-w-sm text-slate-800">
                      <div className="font-semibold text-slate-900 truncate">
                        {lead.property?.title || 'Property VIP Site Visit'}
                      </div>
                      <div className="text-[11px] text-slate-500 truncate mt-0.5">
                        {lead.notes || 'Inquiry details recorded'}
                      </div>
                      {lead.status === 'site_visit_scheduled' && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200 mt-1">
                          <Calendar size={10} />
                          <span>
                            {lead.nextFollowUp
                              ? `Visit: ${new Date(lead.nextFollowUp).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}`
                              : 'Site Visit Requested'}
                          </span>
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={lead.status}
                        onChange={(e) => handleStatusChange(lead._id, e.target.value)}
                        className={`text-[10px] font-bold uppercase rounded-lg px-2 py-1 outline-none border border-slate-200 cursor-pointer ${
                          lead.status === 'new'
                            ? 'bg-blue-50 text-blue-700'
                            : lead.status === 'contacted'
                            ? 'bg-amber-50 text-amber-700'
                            : lead.status === 'site_visit_scheduled'
                            ? 'bg-purple-50 text-purple-700'
                            : lead.status === 'closed_won'
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="site_visit_scheduled">Site Visit Scheduled</option>
                        <option value="negotiation">Negotiation</option>
                        <option value="closed_won">Closed Won</option>
                        <option value="closed_lost">Closed Lost</option>
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-[10px] font-bold uppercase ${
                          lead.priority === 'urgent'
                            ? 'text-rose-600'
                            : lead.priority === 'high'
                            ? 'text-amber-600'
                            : 'text-slate-500'
                        }`}
                      >
                        {lead.priority}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => openLeadTimeline(lead._id)}
                        className="px-2.5 py-1 text-xs font-semibold bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition cursor-pointer"
                      >
                        Timeline
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-slate-400">
                    No leads found in this pipeline view.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CRM Timeline Drawer / Modal */}
      {activeLead && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto p-6 shadow-2xl space-y-4">
            <div className="flex items-start justify-between border-b border-slate-200 pb-3">
              <div>
                <span className="text-[10px] font-bold text-[#0866F5] uppercase tracking-wider">
                  Lead Dossier &amp; Follow-up CRM
                </span>
                <h3 className="text-base font-bold text-[#0B1F44]">
                  {activeLead.fullName} ({activeLead.leadNumber})
                </h3>
                <p className="text-xs text-slate-500 font-mono mt-0.5">
                  +91 {activeLead.phone} {activeLead.email ? `• ${activeLead.email}` : ''}
                </p>
              </div>
              <button
                onClick={() => setActiveLead(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Quick Contact & Property Info Banner */}
            <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-3.5 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-semibold">Inquired Property:</span>
                <strong className="text-[#0B1F44] text-right truncate max-w-[240px]">
                  {activeLead.property?.title || 'Luxury Coastal Plots'}
                </strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-semibold">City / Location:</span>
                <strong className="text-slate-800">{activeLead.city || 'Mumbai Outskirts'}</strong>
              </div>
              {activeLead.nextFollowUp && (
                <div className="flex items-center justify-between text-purple-700">
                  <span className="font-semibold flex items-center gap-1"><Calendar size={12} /> Scheduled Visit:</span>
                  <strong>{new Date(activeLead.nextFollowUp).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</strong>
                </div>
              )}
              {activeLead.notes && (
                <div className="pt-1.5 border-t border-blue-100/60 text-slate-600 text-[11px] leading-relaxed">
                  <strong>Notes:</strong> {activeLead.notes}
                </div>
              )}

              {/* Direct Actions */}
              <div className="flex gap-2 pt-2">
                <a
                  href={`tel:${activeLead.phone}`}
                  className="flex-1 py-1.5 bg-[#0866F5] hover:bg-[#0650C5] text-white text-xs font-bold rounded-lg text-center flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <Phone size={12} />
                  <span>Call +91 {activeLead.phone}</span>
                </a>
                <a
                  href={`https://wa.me/91${activeLead.phone?.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(activeLead.fullName)}%2C%20regarding%20your%20site%20visit%20request%20on%20Roof%20Ridge...`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg text-center flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <MessageSquare size={12} />
                  <span>WhatsApp Message</span>
                </a>
              </div>
            </div>

            {/* Stage Selector */}
            <div className="bg-slate-50 p-3 rounded-xl flex items-center justify-between border border-slate-200">
              <span className="text-xs font-bold text-slate-700">Pipeline Stage:</span>
              <select
                value={activeLead.status}
                onChange={(e) => handleStatusChange(activeLead._id, e.target.value)}
                className="text-xs font-bold uppercase rounded-lg px-2.5 py-1 border border-slate-300 bg-white"
              >
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="site_visit_scheduled">Site Visit</option>
                <option value="negotiation">Negotiation</option>
                <option value="closed_won">Closed Won</option>
                <option value="closed_lost">Closed Lost</option>
              </select>
            </div>

            {/* Activities Timeline */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Activity History
              </h4>
              <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                {leadActivities.length > 0 ? (
                  leadActivities.map((act) => (
                    <div
                      key={act._id}
                      className="p-2.5 rounded-lg border border-slate-100 bg-slate-50 text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between text-[10px] text-slate-400">
                        <span className="font-bold text-slate-600 uppercase">
                          {act.activityType?.replace(/_/g, ' ')}
                        </span>
                        <span>{new Date(act.createdAt).toLocaleString()}</span>
                      </div>
                      <p className="text-slate-700">{act.comment}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-400 italic">No notes recorded yet.</p>
                )}
              </div>
            </div>

            {/* Add Note Form */}
            <form onSubmit={handleAddNote} className="space-y-2 pt-2 border-t border-slate-200">
              <label className="text-xs font-bold text-slate-800">Add Follow-up Note:</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. Called client, scheduled site visit for Saturday 11am..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs border border-slate-200 rounded-lg outline-none focus:border-blue-500"
                />
                <button
                  type="submit"
                  disabled={submittingNote}
                  className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Send size={13} />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
