import React, { useState, useEffect } from 'react';
import adminApi from '../services/api';
import {
  Building2,
  Check,
  X,
  AlertTriangle,
  Eye,
  Filter,
  CheckCircle,
  ExternalLink,
  Search,
  Star,
  Trash2,
  Clock,
  ShieldCheck,
  RefreshCw,
  Sparkles,
  User,
  MapPin,
  Tag,
  ArrowRight,
  CheckSquare,
  Square,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  Flame,
  Layers,
} from 'lucide-react';

export default function PropertiesView({ onPropertyModerated }) {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'pending', 'approved', 'request_changes', 'rejected', 'featured'
  const [cityFilter, setCityFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [selectedProp, setSelectedProp] = useState(null);
  const [previewImageIdx, setPreviewImageIdx] = useState(0);
  const [rejectionModal, setRejectionModal] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [rejectionPreset, setRejectionPreset] = useState('misleading_price');
  const [actionLoading, setActionLoading] = useState(false);
  const [moderationNotes, setModerationNotes] = useState('');
  
  // Checklist states for active review panel
  const [checklist, setChecklist] = useState({
    photosClear: true,
    priceRealistic: true,
    descriptionAccurate: true,
    noPhoneWatermark: true,
    reraVerified: true,
    noSpamLinks: true,
  });

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const queryStatus = statusFilter === 'featured' ? 'all' : statusFilter;
      const res = await adminApi.get(`/admin/properties?status=${queryStatus}`);
      let list = res.data || [];
      if (statusFilter === 'featured') {
        list = list.filter(p => p.isFeatured);
      }
      setProperties(list);
    } catch (err) {
      console.error('Failed to fetch properties:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [statusFilter]);

  const handleModerate = async (id, action, options = {}) => {
    try {
      setActionLoading(true);
      await adminApi.put(`/admin/properties/${id}/moderate`, {
        action,
        rejectionReason: options.rejectionReason || '',
        moderationNotes: options.moderationNotes || moderationNotes || `Moderated: ${action}`,
        isFeatured: options.isFeatured,
        isVerified: options.isVerified,
      });

      // Refresh list
      await fetchProperties();
      if (onPropertyModerated) {
        onPropertyModerated();
      }

      setRejectionModal(null);
      setRejectionReason('');
      if (selectedProp?._id === id) {
        if (action === 'delete') {
          setSelectedProp(null);
        } else {
          // Update selectedProp locally
          setSelectedProp(prev => {
            if (!prev) return null;
            if (action === 'approve') return { ...prev, approvalStatus: 'approved', isVerified: true };
            if (action === 'reject') return { ...prev, approvalStatus: 'rejected' };
            if (action === 'request_changes') return { ...prev, approvalStatus: 'request_changes' };
            if (action === 'toggle_featured') return { ...prev, isFeatured: !prev.isFeatured };
            if (action === 'toggle_verified') return { ...prev, isVerified: !prev.isVerified };
            return prev;
          });
        }
      }
    } catch (err) {
      alert('Moderation action failed: ' + (err.response?.data?.message || err.message));
    } finally {
      setActionLoading(false);
    }
  };

  const handleBulkApprovePending = async () => {
    const pendingProps = filteredProperties.filter(p => p.approvalStatus === 'pending');
    if (pendingProps.length === 0) {
      alert('No pending properties in current view to approve.');
      return;
    }
    const confirm = window.confirm(`Are you sure you want to approve all ${pendingProps.length} pending listing(s)?`);
    if (!confirm) return;

    setActionLoading(true);
    try {
      for (const p of pendingProps) {
        await adminApi.put(`/admin/properties/${p._id}/moderate`, {
          action: 'approve',
          moderationNotes: 'Bulk approved by Admin',
        });
      }
      await fetchProperties();
      if (onPropertyModerated) onPropertyModerated();
      alert(`Successfully approved ${pendingProps.length} property listings!`);
    } catch (err) {
      alert('Bulk approval error: ' + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  // Metrics KPI calculations
  const totalCount = properties.length;
  const pendingCount = properties.filter(p => p.approvalStatus === 'pending').length;
  const approvedCount = properties.filter(p => p.approvalStatus === 'approved').length;
  const rejectedCount = properties.filter(p => p.approvalStatus === 'rejected').length;
  const changesCount = properties.filter(p => p.approvalStatus === 'request_changes').length;
  const featuredCount = properties.filter(p => p.isFeatured).length;

  // Cities extracted
  const availableCities = Array.from(new Set(properties.map(p => p.location?.city).filter(Boolean)));

  const filteredProperties = properties.filter((p) => {
    if (cityFilter !== 'all' && p.location?.city?.toLowerCase() !== cityFilter.toLowerCase()) {
      return false;
    }
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      p.title?.toLowerCase().includes(q) ||
      p.location?.city?.toLowerCase().includes(q) ||
      p.location?.locality?.toLowerCase().includes(q) ||
      p.owner?.name?.toLowerCase().includes(q) ||
      p.owner?.phone?.includes(q) ||
      p._id?.toLowerCase().includes(q)
    );
  });

  const REJECTION_PRESETS = [
    { id: 'misleading_price', label: 'Unrealistic / Misleading Pricing outlier', text: 'The listed price deviates substantially from prevailing circle rates and verified registry values for this locality. Please provide realistic pricing.' },
    { id: 'watermark_photos', label: 'Photos contain phone numbers or watermarks', text: 'Photographs contain watermark phone numbers or dealer contact info. Please upload clean architectural photographs without overlays.' },
    { id: 'missing_rera', label: 'Missing or Invalid RERA Certificate', text: 'The project/property RERA registration number could not be validated against the state RERA registry database.' },
    { id: 'vague_description', label: 'Incomplete or Vague Description', text: 'Property specifications lack critical parameters (super built-up vs carpet area, floor number, furnishing status, clear possession date).' },
    { id: 'duplicate_listing', label: 'Duplicate Listing Detected', text: 'An identical property listing has already been approved and active under another unit ID.' },
  ];

  return (
    <div className="space-y-6">
      {/* ── KPI METRICS SUMMARY BAR (Blueprint VOL-11 Section 11.6.1) ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Listings</div>
          <div className="text-2xl font-black text-slate-900 mt-1">{totalCount}</div>
          <div className="text-[10px] text-slate-500 mt-0.5">In database</div>
        </div>

        <div className={`p-4 rounded-xl border shadow-xs transition ${pendingCount > 0 ? 'bg-amber-50/70 border-amber-300 ring-2 ring-amber-400/30' : 'bg-white border-slate-200'}`}>
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700">Pending Review</span>
            {pendingCount > 0 && (
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
              </span>
            )}
          </div>
          <div className="text-2xl font-black text-amber-900 mt-1">{pendingCount}</div>
          <div className="text-[10px] font-semibold text-amber-700 mt-0.5">Action required</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-600">Approved & Live</div>
          <div className="text-2xl font-black text-slate-900 mt-1">{approvedCount}</div>
          <div className="text-[10px] text-emerald-600 mt-0.5">Public on portal</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="text-[11px] font-bold uppercase tracking-wider text-blue-600">Changes Requested</div>
          <div className="text-2xl font-black text-slate-900 mt-1">{changesCount}</div>
          <div className="text-[10px] text-slate-500 mt-0.5">Awaiting user edits</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="text-[11px] font-bold uppercase tracking-wider text-rose-600">Rejected</div>
          <div className="text-2xl font-black text-slate-900 mt-1">{rejectedCount}</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Archived / Denied</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="text-[11px] font-bold uppercase tracking-wider text-indigo-600">Featured Homes</div>
          <div className="text-2xl font-black text-indigo-900 mt-1">{featuredCount}</div>
          <div className="text-[10px] text-indigo-600 mt-0.5">Homepage spotlight</div>
        </div>
      </div>

      {/* ── FILTER & ACTION CONTROLS BAR ── */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {[
            { id: 'all', label: 'All Listings', count: totalCount },
            { id: 'pending', label: 'Pending Review', count: pendingCount, highlight: true },
            { id: 'approved', label: 'Approved', count: approvedCount },
            { id: 'request_changes', label: 'Changes Req.', count: changesCount },
            { id: 'rejected', label: 'Rejected', count: rejectedCount },
            { id: 'featured', label: 'Featured ★', count: featuredCount },
          ].map((tab) => {
            const isActive = statusFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'bg-[#0866F5] text-white shadow-xs'
                    : tab.highlight && tab.count > 0
                    ? 'bg-amber-100 text-amber-900 hover:bg-amber-200'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-extrabold ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : tab.highlight && tab.count > 0
                      ? 'bg-amber-500 text-white'
                      : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search, City & Action Shortcuts */}
        <div className="flex items-center gap-2 flex-wrap">
          {availableCities.length > 0 && (
            <select
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              className="px-3 py-2 text-xs border border-slate-200 rounded-lg outline-none focus:border-[#0866F5] font-semibold text-slate-700 bg-white"
            >
              <option value="all">All Cities</option>
              {availableCities.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          )}

          <div className="relative min-w-[220px]">
            <Search size={14} className="absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search title, locality, phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg outline-none focus:border-[#0866F5] transition"
            />
          </div>

          {pendingCount > 0 && (
            <button
              onClick={handleBulkApprovePending}
              disabled={actionLoading}
              className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-xs transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              title="Bulk approve all pending listings in current view"
            >
              <CheckCircle size={14} />
              <span>Approve All Pending ({pendingCount})</span>
            </button>
          )}

          <a
            href="http://localhost:5173/properties"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition flex items-center gap-1.5"
            title="Open Public User Website (Vite: 5173)"
          >
            <span>Public Site</span>
            <ExternalLink size={12} />
          </a>
        </div>
      </div>

      {/* ── PROPERTIES MODERATION TABLE ── */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase font-semibold text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">Property Unit</th>
                <th className="px-4 py-3">Type & BHK</th>
                <th className="px-4 py-3">Locality & City</th>
                <th className="px-4 py-3">Pricing Details</th>
                <th className="px-4 py-3">Owner / Lister</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3 text-center">Flags</th>
                <th className="px-4 py-3 text-right">Moderation Controls</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {loading ? (
                <tr>
                  <td colSpan={8} className="text-center py-12 text-slate-400">
                    <RefreshCw className="animate-spin inline-block mr-2" size={16} />
                    Loading property moderation queue...
                  </td>
                </tr>
              ) : filteredProperties.length > 0 ? (
                filteredProperties.map((prop) => {
                  const isPending = prop.approvalStatus === 'pending';
                  const isApproved = prop.approvalStatus === 'approved';
                  const isRejected = prop.approvalStatus === 'rejected';
                  const isReqChanges = prop.approvalStatus === 'request_changes';

                  return (
                    <tr
                      key={prop._id}
                      className={`hover:bg-slate-50/90 transition ${isPending ? 'bg-amber-50/20' : ''}`}
                    >
                      {/* Property Thumbnail & Info */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={
                              prop.images?.[0] ||
                              'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=200&q=80'
                            }
                            alt=""
                            className="w-13 h-10 object-cover rounded-md border border-slate-200 shrink-0"
                          />
                          <div>
                            <div className="font-bold text-slate-900 line-clamp-1 max-w-[210px] hover:text-[#0866F5] cursor-pointer" onClick={() => { setSelectedProp(prop); setPreviewImageIdx(0); }}>
                              {prop.title}
                            </div>
                            <div className="text-[10px] text-slate-400 flex items-center gap-2 mt-0.5">
                              <span>ID: {prop._id.slice(-6)}</span>
                              <span>•</span>
                              <span>{prop.features?.areaSqFt ? `${prop.features.areaSqFt} sq ft` : 'Area TBD'}</span>
                              <span>•</span>
                              <span>{new Date(prop.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Type & BHK */}
                      <td className="px-4 py-3">
                        <span className="capitalize font-semibold text-slate-900">
                          {prop.bhk ? `${prop.bhk} BHK` : ''} {prop.subType || prop.propertyType}
                        </span>
                        <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                          For {prop.type}
                        </div>
                      </td>

                      {/* Locality & City */}
                      <td className="px-4 py-3 text-slate-700">
                        <div className="font-semibold text-slate-900">{prop.location?.locality || 'Locality Not Specified'}</div>
                        <div className="text-[10px] text-slate-400 flex items-center gap-1">
                          <MapPin size={10} className="text-[#0866F5]" />
                          <span>{prop.location?.city || 'India'}</span>
                        </div>
                      </td>

                      {/* Price & Per SqFt */}
                      <td className="px-4 py-3">
                        <div className="font-black text-slate-900">
                          {prop.priceDisplay || `₹${Number(prop.price).toLocaleString('en-IN')}`}
                        </div>
                        {prop.features?.areaSqFt && prop.price && (
                          <div className="text-[10px] text-slate-400">
                            ₹{Math.round(Number(prop.price) / Number(prop.features.areaSqFt)).toLocaleString('en-IN')}/sqft
                          </div>
                        )}
                      </td>

                      {/* Owner Info */}
                      <td className="px-4 py-3">
                        <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                          <User size={11} className="text-slate-400" />
                          <span>{prop.owner?.name || 'Public Lister'}</span>
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          {prop.owner?.phone ? `+91 ${prop.owner.phone}` : 'No phone verified'}
                        </div>
                      </td>

                      {/* Status Badge */}
                      <td className="px-4 py-3 text-center">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider inline-flex items-center gap-1 ${
                            isApproved
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : isPending
                              ? 'bg-amber-100 text-amber-900 border border-amber-300 animate-pulse'
                              : isReqChanges
                              ? 'bg-blue-100 text-blue-800 border border-blue-300'
                              : isRejected
                              ? 'bg-rose-100 text-rose-800 border border-rose-300'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {isPending && <Clock size={10} />}
                          {isApproved && <CheckCircle size={10} />}
                          {isRejected && <X size={10} />}
                          {prop.approvalStatus || 'approved'}
                        </span>
                      </td>

                      {/* Flags (Featured / Verified) */}
                      <td className="px-4 py-3 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          {prop.isFeatured && (
                            <span className="p-1 rounded bg-amber-100 text-amber-700" title="Featured Spotlight">
                              <Star size={12} fill="#D97706" />
                            </span>
                          )}
                          {prop.isVerified && (
                            <span className="p-1 rounded bg-sky-100 text-sky-700" title="Physical 100-Point Inspected">
                              <ShieldCheck size={12} />
                            </span>
                          )}
                          {!prop.isFeatured && !prop.isVerified && (
                            <span className="text-[10px] text-slate-300">—</span>
                          )}
                        </div>
                      </td>

                      {/* Action Controls */}
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Quick Review */}
                          <button
                            onClick={() => { setSelectedProp(prop); setPreviewImageIdx(0); }}
                            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 transition cursor-pointer"
                            title="Open Full Review Panel"
                          >
                            <Eye size={15} />
                          </button>

                          {/* Quick Approve */}
                          {!isApproved && (
                            <button
                              onClick={() => handleModerate(prop._id, 'approve')}
                              disabled={actionLoading}
                              className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition cursor-pointer border border-emerald-200"
                              title="Approve & Publish to Website"
                            >
                              <Check size={15} />
                            </button>
                          )}

                          {/* Reject Modal */}
                          {!isRejected && (
                            <button
                              onClick={() => {
                                setRejectionModal(prop);
                                setRejectionReason(REJECTION_PRESETS[0].text);
                              }}
                              disabled={actionLoading}
                              className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 transition cursor-pointer border border-rose-200"
                              title="Reject Listing with Reason"
                            >
                              <X size={15} />
                            </button>
                          )}

                          {/* Toggle Featured */}
                          <button
                            onClick={() => handleModerate(prop._id, 'toggle_featured')}
                            disabled={actionLoading}
                            className={`p-1.5 rounded-lg transition cursor-pointer border ${
                              prop.isFeatured
                                ? 'bg-amber-100 text-amber-800 border-amber-300'
                                : 'hover:bg-slate-100 text-slate-400 border-transparent'
                            }`}
                            title={prop.isFeatured ? 'Remove Featured Status' : 'Mark as Featured Property'}
                          >
                            <Star size={14} fill={prop.isFeatured ? '#D97706' : 'none'} />
                          </button>

                          {/* Delete */}
                          <button
                            onClick={() => {
                              if (window.confirm(`Permanently delete "${prop.title}"? This action is logged.`)) {
                                handleModerate(prop._id, 'delete');
                              }
                            }}
                            disabled={actionLoading}
                            className="p-1.5 rounded-lg hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition cursor-pointer"
                            title="Delete Listing Permanently"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={8} className="text-center py-12 text-slate-400">
                    No property listings found matching the selected filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── BLUEPRINT VOL-11 QUICK REVIEW PANEL (MODAL / DRAWER) ── */}
      {selectedProp && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 space-y-5">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-100 flex items-start justify-between bg-slate-50/50 rounded-t-2xl">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-black text-[#0866F5] uppercase tracking-wider bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                    Moderation Desk (VOL-11)
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                      selectedProp.approvalStatus === 'approved'
                        ? 'bg-emerald-100 text-emerald-800'
                        : selectedProp.approvalStatus === 'pending'
                        ? 'bg-amber-100 text-amber-900'
                        : selectedProp.approvalStatus === 'request_changes'
                        ? 'bg-blue-100 text-blue-900'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    Status: {selectedProp.approvalStatus || 'pending'}
                  </span>
                </div>
                <h3 className="text-lg font-black text-slate-900">{selectedProp.title}</h3>
                <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1.5">
                  <MapPin size={12} className="text-[#0866F5]" />
                  <span>{selectedProp.location?.address || selectedProp.location?.locality}, {selectedProp.location?.city}</span>
                  <span className="text-slate-300">•</span>
                  <span>Unit ID: {selectedProp._id}</span>
                </p>
              </div>

              <button
                onClick={() => setSelectedProp(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <div className="px-6 space-y-5">
              {/* Photo Showcase Carousel */}
              {selectedProp.images && selectedProp.images.length > 0 && (
                <div className="space-y-2">
                  <div className="relative h-64 w-full rounded-xl overflow-hidden bg-slate-900 border border-slate-200">
                    <img
                      src={selectedProp.images[previewImageIdx] || selectedProp.images[0]}
                      alt="Property Preview"
                      className="w-full h-full object-contain"
                    />
                    {selectedProp.images.length > 1 && (
                      <div className="absolute inset-0 flex items-center justify-between px-3 pointer-events-none">
                        <button
                          onClick={() => setPreviewImageIdx(prev => (prev === 0 ? selectedProp.images.length - 1 : prev - 1))}
                          className="pointer-events-auto p-2 rounded-full bg-slate-900/70 text-white hover:bg-slate-900 transition cursor-pointer"
                        >
                          <ChevronLeft size={16} />
                        </button>
                        <button
                          onClick={() => setPreviewImageIdx(prev => (prev === selectedProp.images.length - 1 ? 0 : prev + 1))}
                          className="pointer-events-auto p-2 rounded-full bg-slate-900/70 text-white hover:bg-slate-900 transition cursor-pointer"
                        >
                          <ChevronRight size={16} />
                        </button>
                      </div>
                    )}
                    <span className="absolute bottom-3 right-3 bg-slate-900/80 text-white text-[10px] font-bold px-2 py-1 rounded">
                      Photo {previewImageIdx + 1} of {selectedProp.images.length}
                    </span>
                  </div>

                  {/* Thumbnail Row */}
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {selectedProp.images.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt=""
                        onClick={() => setPreviewImageIdx(idx)}
                        className={`w-16 h-12 object-cover rounded-lg border-2 cursor-pointer transition ${
                          previewImageIdx === idx ? 'border-[#0866F5] scale-105' : 'border-slate-200 opacity-70 hover:opacity-100'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Price, Specs & AI Market Analysis */}
              <div className="grid grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl text-center text-xs border border-slate-200">
                <div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Listing Price</div>
                  <div className="text-base font-black text-slate-900 mt-0.5">
                    {selectedProp.priceDisplay || `₹${Number(selectedProp.price).toLocaleString('en-IN')}`}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Carpet / Super Area</div>
                  <div className="text-base font-black text-slate-900 mt-0.5">
                    {selectedProp.features?.areaSqFt || '1,250'} sq ft
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Rate per Sq.Ft</div>
                  <div className="text-base font-black text-slate-900 mt-0.5">
                    {selectedProp.features?.areaSqFt && selectedProp.price
                      ? `₹${Math.round(Number(selectedProp.price) / Number(selectedProp.features.areaSqFt)).toLocaleString('en-IN')}`
                      : '₹ 6,800/sqft'}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase">RERA Title Status</div>
                  <div className="text-xs font-black text-emerald-700 mt-1 flex items-center justify-center gap-1">
                    <ShieldCheck size={13} />
                    <span>{selectedProp.isVerified ? 'Verified Title' : 'Pending Audit'}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
                  Property Description
                </h4>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-700 leading-relaxed max-h-32 overflow-y-auto">
                  {selectedProp.description || 'No additional narrative description provided.'}
                </div>
              </div>

              {/* Lister Credentials */}
              <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-slate-900 flex items-center gap-2">
                    <span>Lister: {selectedProp.owner?.name || 'Public Member'}</span>
                    <span className="text-[10px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-semibold">
                      Role: {selectedProp.owner?.role || 'owner'}
                    </span>
                  </div>
                  <div className="text-slate-500 mt-0.5 font-mono text-[11px]">
                    Phone: {selectedProp.owner?.phone ? `+91 ${selectedProp.owner.phone}` : 'Unattached'}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1 justify-end">
                    <CheckCircle size={12} /> KYC Aadhaar Verified
                  </span>
                  <div className="text-[10px] text-slate-400">Previous approved listings: 2</div>
                </div>
              </div>

              {/* Blueprint VOL-11 Section 11.6 Moderation Checklist */}
              <div className="border border-slate-200 rounded-xl p-4 space-y-3 bg-slate-50/30">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <CheckSquare size={14} className="text-[#0866F5]" />
                    <span>Blueprint Moderation Checklist (VOL-11)</span>
                  </h4>
                  <span className="text-[10px] text-slate-400 font-semibold">Verify all 6 parameters</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {[
                    { key: 'photosClear', label: 'Photos are authentic, high-res & clear' },
                    { key: 'priceRealistic', label: 'Price is realistic with circle rates' },
                    { key: 'descriptionAccurate', label: 'Description is accurate & non-misleading' },
                    { key: 'noPhoneWatermark', label: 'No phone numbers watermarked on photos' },
                    { key: 'reraVerified', label: 'Clear RERA & title ownership verification' },
                    { key: 'noSpamLinks', label: 'No competitor links or spam text' },
                  ].map(chk => (
                    <label key={chk.key} className="flex items-center gap-2 cursor-pointer p-1.5 rounded hover:bg-slate-100/60">
                      <input
                        type="checkbox"
                        checked={checklist[chk.key]}
                        onChange={e => setChecklist(prev => ({ ...prev, [chk.key]: e.target.checked }))}
                        className="w-4 h-4 rounded text-[#0866F5] accent-[#0866F5] cursor-pointer"
                      />
                      <span className="text-slate-700 text-[11px] font-medium">{chk.label}</span>
                    </label>
                  ))}
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Moderation Internal Notes (for Audit Trail):
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Verified on MahaRERA portal. Photos clear and approved."
                    value={moderationNotes}
                    onChange={e => setModerationNotes(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg outline-none focus:border-[#0866F5] bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Modal Actions Footer */}
            <div className="p-5 border-t border-slate-200 bg-slate-50/60 rounded-b-2xl flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleModerate(selectedProp._id, 'toggle_featured')}
                  disabled={actionLoading}
                  className={`px-3 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                    selectedProp.isFeatured
                      ? 'bg-amber-100 text-amber-900 border border-amber-300'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Star size={13} fill={selectedProp.isFeatured ? '#D97706' : 'none'} />
                  <span>{selectedProp.isFeatured ? 'Featured on Home' : 'Feature on Home'}</span>
                </button>

                <button
                  onClick={() => handleModerate(selectedProp._id, 'toggle_verified')}
                  disabled={actionLoading}
                  className={`px-3 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                    selectedProp.isVerified
                      ? 'bg-sky-100 text-sky-900 border border-sky-300'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <ShieldCheck size={13} />
                  <span>{selectedProp.isVerified ? '100-Pt Verified' : 'Mark 100-Pt Verified'}</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setRejectionModal(selectedProp);
                    setRejectionReason(REJECTION_PRESETS[0].text);
                  }}
                  disabled={actionLoading}
                  className="px-4 py-2 border border-rose-300 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold rounded-lg cursor-pointer transition flex items-center gap-1.5"
                >
                  <X size={14} />
                  <span>Reject Listing</span>
                </button>

                <button
                  onClick={() => handleModerate(selectedProp._id, 'request_changes', { moderationNotes: moderationNotes || 'Please update pricing and upload higher-resolution floor plan' })}
                  disabled={actionLoading}
                  className="px-4 py-2 border border-blue-300 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold rounded-lg cursor-pointer transition"
                >
                  Request Changes
                </button>

                <button
                  onClick={() => handleModerate(selectedProp._id, 'approve', { moderationNotes: moderationNotes || 'Approved by Executive Moderator' })}
                  disabled={actionLoading}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold rounded-lg shadow-sm transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Check size={14} />
                  <span>Approve &amp; Publish</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── REJECTION SPECIFICATION MODAL (VOL-11) ── */}
      {rejectionModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 border border-slate-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center">
                  <AlertTriangle size={18} />
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  Reject Property Listing
                </h3>
              </div>
              <button
                onClick={() => setRejectionModal(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X size={18} />
              </button>
            </div>

            <p className="text-xs text-slate-500">
              Listing: <strong className="text-slate-900">{rejectionModal.title}</strong>
            </p>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Preset Reason (Dropdown):
              </label>
              <select
                value={rejectionPreset}
                onChange={(e) => {
                  setRejectionPreset(e.target.value);
                  const found = REJECTION_PRESETS.find(p => p.id === e.target.value);
                  if (found) setRejectionReason(found.text);
                }}
                className="w-full p-2.5 text-xs border border-slate-200 rounded-lg outline-none focus:border-rose-500 bg-white"
              >
                {REJECTION_PRESETS.map(p => (
                  <option key={p.id} value={p.id}>{p.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Detailed Rejection Note sent to User:
              </label>
              <textarea
                rows={4}
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Specify exact modifications required..."
                className="w-full p-3 text-xs border border-slate-200 rounded-lg outline-none focus:border-rose-500 transition"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setRejectionModal(null)}
                className="px-4 py-2 border border-slate-200 text-slate-600 text-xs font-bold rounded-lg hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleModerate(rejectionModal._id, 'reject', { rejectionReason })}
                disabled={actionLoading || !rejectionReason.trim()}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg cursor-pointer transition disabled:opacity-50"
              >
                {actionLoading ? 'Rejecting...' : 'Confirm Rejection'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
