import React, { useState, useEffect } from 'react';
import adminApi from '../services/api';
import {
  UserCheck,
  Check,
  X,
  FileText,
  Search,
  Building,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react';

export default function PartnersView() {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchPartners = async () => {
    try {
      setLoading(true);
      const res = await adminApi.get(`/admin/partners?status=${statusFilter}`);
      setPartners(res.data || []);
    } catch (err) {
      console.error('Failed to fetch partners:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPartners();
  }, [statusFilter]);

  const handleVerify = async (partnerId, action) => {
    try {
      setActionLoading(true);
      await adminApi.put(`/admin/partners/${partnerId}/verify`, {
        action,
        verificationNotes: action === 'verify' ? 'Verified by Admin' : 'Documents rejected',
      });
      fetchPartners();
      if (selectedPartner?._id === partnerId) setSelectedPartner(null);
    } catch (err) {
      alert('Verification action failed: ' + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const filteredPartners = partners.filter((p) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      p.businessName?.toLowerCase().includes(q) ||
      p.partnerType?.toLowerCase().includes(q) ||
      p.gstin?.toLowerCase().includes(q) ||
      p.reraNumber?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-5">
      {/* Filters */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {['all', 'pending', 'verified', 'rejected'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
                statusFilter === st
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="relative min-w-[240px]">
          <Search size={14} className="absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search business, GST, RERA..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg outline-none focus:border-emerald-500 transition"
          />
        </div>
      </div>

      {/* Partners Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase font-semibold text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">Business Name</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">RERA / GSTIN</th>
                <th className="px-4 py-3">Operating Cities</th>
                <th className="px-4 py-3">Representative</th>
                <th className="px-4 py-3">KYC Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {loading ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-slate-400">
                    Loading partner verification queue...
                  </td>
                </tr>
              ) : filteredPartners.length > 0 ? (
                filteredPartners.map((partner) => (
                  <tr key={partner._id} className="hover:bg-slate-50/80 transition">
                    <td className="px-4 py-3">
                      <div className="font-bold text-slate-900">{partner.businessName}</div>
                      <div className="text-[10px] text-slate-400">
                        {partner.experienceYears} yrs exp • {partner.projectsCompleted} projects
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="capitalize px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-800">
                        {partner.partnerType?.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-mono text-slate-600">
                      {partner.reraNumber || partner.gstin || 'Under review'}
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {partner.operatingCities?.join(', ') || 'Noida'}
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-semibold text-slate-800">{partner.user?.name}</div>
                      <div className="text-[10px] text-slate-400">{partner.user?.phone}</div>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          partner.verificationStatus === 'verified'
                            ? 'bg-emerald-100 text-emerald-700'
                            : partner.verificationStatus === 'pending'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-rose-100 text-rose-700'
                        }`}
                      >
                        {partner.verificationStatus}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {partner.verificationStatus !== 'verified' && (
                          <button
                            onClick={() => handleVerify(partner._id, 'verify')}
                            disabled={actionLoading}
                            className="p-1.5 rounded-md bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition cursor-pointer"
                            title="Verify Partner"
                          >
                            <Check size={14} />
                          </button>
                        )}
                        {partner.verificationStatus !== 'rejected' && (
                          <button
                            onClick={() => handleVerify(partner._id, 'reject')}
                            disabled={actionLoading}
                            className="p-1.5 rounded-md bg-rose-50 hover:bg-rose-100 text-rose-700 transition cursor-pointer"
                            title="Reject Documents"
                          >
                            <X size={14} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-slate-400">
                    No partner records found matching current filter.
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
