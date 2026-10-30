import React, { useState, useEffect } from 'react';
import {
  ShieldCheck, FileText, Download, Upload, Bell, Calendar, Lock,
  CheckCircle2, Clock, AlertCircle, Building2, Package, PlusCircle,
  Trash2, ExternalLink, UserCheck, Phone, MapPin, Tag, Wrench, RefreshCw,
  ShoppingBag, Check, ChevronRight, Eye, Sparkles, Filter
} from 'lucide-react';
import api from '../services/api';

export default function MyPropertyHubPage({ onOpenPostProperty, onOpenAuth, onNavigate, initialTab = 'listings' }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [myListings, setMyListings] = useState([]);
  const [myBookings, setMyBookings] = useState([]);
  const [myOrders, setMyOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedBookingFilter, setSelectedBookingFilter] = useState('all');
  const [listingFilter, setListingFilter] = useState('all'); // 'all', 'approved', 'pending'

  const user = (() => {
    try {
      const saved = localStorage.getItem('rr_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  })();

  const loadUserData = async () => {
    setRefreshing(true);
    try {
      const [listingsRes, bookingsRes, ordersRes] = await Promise.allSettled([
        api.getMyProperties(),
        api.getMyBookings(),
        api.getMyOrders(),
      ]);

      if (listingsRes.status === 'fulfilled' && listingsRes.value?.data) {
        setMyListings(listingsRes.value.data);
      } else {
        // Fallback: check localStorage for optimistic listings
        const cached = localStorage.getItem('rr_user_listings');
        if (cached) {
          try { setMyListings(JSON.parse(cached)); } catch (e) {}
        }
      }

      if (bookingsRes.status === 'fulfilled' && bookingsRes.value?.data) {
        setMyBookings(bookingsRes.value.data);
      }

      if (ordersRes.status === 'fulfilled' && ordersRes.value?.data) {
        setMyOrders(ordersRes.value.data);
      }
    } catch (err) {
      console.warn('Could not refresh full hub data:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);

  const handleDeleteListing = async (propertyId, e) => {
    e.stopPropagation();
    if (!window.confirm('Are you sure you want to remove this property listing from Roof Ridge?')) {
      return;
    }

    try {
      await api.deleteProperty(propertyId);
      setMyListings(prev => prev.filter(p => p._id !== propertyId && p.id !== propertyId));
      // Also update localStorage cache if present
      try {
        const cached = localStorage.getItem('rr_user_listings');
        if (cached) {
          const list = JSON.parse(cached).filter(p => p._id !== propertyId && p.id !== propertyId);
          localStorage.setItem('rr_user_listings', JSON.stringify(list));
        }
      } catch (err) {}
      alert('Listing removed successfully.');
    } catch (err) {
      alert('Failed to remove property: ' + err.message);
    }
  };

  const documents = [
    { title: 'Registered Sale Deed (Original)', type: 'Legal Title', date: '14 Jan 2026', size: '4.2 MB', verified: true },
    { title: 'Encumbrance Certificate (EC)', type: 'RERA Compliance', date: '20 Feb 2026', size: '1.8 MB', verified: true },
    { title: 'Property Tax Payment Receipt 2026', type: 'Tax Record', date: '05 Mar 2026', size: '890 KB', verified: true },
    { title: 'SBI Home Loan Sanction Letter', type: 'Banking', date: '12 Apr 2026', size: '2.5 MB', verified: true }
  ];

  const reminders = [
    { title: 'Property Tax Installment Due', date: '15 Sep 2026', amount: '₹ 14,200', status: 'Pending' },
    { title: 'Quarterly AMC Plumbing Audit', date: '22 Sep 2026', amount: 'Included in AMC', status: 'Scheduled' },
    { title: 'Home Insurance Renewal Policy', date: '10 Nov 2026', amount: '₹ 6,850', status: 'Upcoming' }
  ];

  const pendingCount = myListings.filter(p => p.approvalStatus === 'pending' || !p.approvalStatus).length;
  const approvedCount = myListings.filter(p => p.approvalStatus === 'approved').length;

  const filteredListings = myListings.filter(p => {
    if (listingFilter === 'approved') return p.approvalStatus === 'approved';
    if (listingFilter === 'pending') return p.approvalStatus === 'pending' || !p.approvalStatus;
    return true;
  });

  return (
    <div className="w-full max-w-[1380px] mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 animate-fade font-sans">
      {/* ── Executive User Header Banner ── */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#0866F5] via-[#0645B8] to-[#05338E] text-white p-5 sm:p-7 lg:p-8 mb-5 sm:mb-7 shadow-xl shadow-blue-900/15 border border-white/15">
        {/* Subtle decorative circles */}
        <div className="absolute -top-12 -right-12 w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-white/5 pointer-events-none blur-2xl" />
        <div className="absolute -bottom-12 -left-12 w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-blue-400/10 pointer-events-none blur-2xl" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5 sm:gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10.5px] sm:text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-200 border border-amber-400/30">
                <Sparkles size={11} className="text-amber-300" />
                Verified Resident &amp; Owner Desk
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10.5px] sm:text-xs font-semibold bg-white/10 text-blue-100 border border-white/15">
                <ShieldCheck size={12} className="text-emerald-300" />
                KYC Active
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-white leading-tight">
              Welcome Back, {user?.name || 'Valued Member'}
            </h1>
            <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed max-w-xl">
              Central control desk for your property listings, active service appointments, materials deliveries, and 256-bit bank-grade digital document vault.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 shrink-0">
            <button
              onClick={loadUserData}
              disabled={refreshing}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-white/10 hover:bg-white/20 active:bg-white/25 text-white border border-white/20 transition-all duration-150 backdrop-blur-xs cursor-pointer shadow-xs"
            >
              <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} />
              <span>Sync Dashboard</span>
            </button>

            <button
              onClick={onOpenPostProperty}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-white text-[#0866F5] hover:bg-blue-50 active:bg-blue-100 transition-all duration-150 shadow-lg shadow-black/10 cursor-pointer"
            >
              <PlusCircle size={16} className="text-[#0866F5]" />
              <span>Post New Property</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Quick Metric KPI Cards (2x2 on mobile, 4-col on desktop) ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        {/* Metric 1 */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs hover:border-blue-400 hover:shadow-md transition-all duration-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500">
              My Listings
            </span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#0866F5] flex items-center justify-center">
              <Building2 size={16} />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-none">
            {myListings.length}
          </div>
          <div className="mt-2 text-[11px] sm:text-xs text-slate-500 flex items-center gap-1.5 flex-wrap">
            <span className="font-bold text-emerald-600">{approvedCount} Live</span>
            <span className="text-slate-300">•</span>
            <span className="font-bold text-amber-600">{pendingCount} Review</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs hover:border-blue-400 hover:shadow-md transition-all duration-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500">
              Booked Services
            </span>
            <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
              <Wrench size={16} />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-none">
            {myBookings.length}
          </div>
          <div className="mt-2 text-[11px] sm:text-xs text-slate-400 truncate">
            Interiors, AMC &amp; Care
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs hover:border-blue-400 hover:shadow-md transition-all duration-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500">
              Material Orders
            </span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Package size={16} />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-none">
            {myOrders.length}
          </div>
          <div className="mt-2 text-[11px] sm:text-xs text-slate-400 truncate">
            Wholesale Supplies
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs hover:border-blue-400 hover:shadow-md transition-all duration-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500">
              Vault Locker
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Lock size={16} />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-none">
            4
          </div>
          <div className="mt-2 text-[11px] sm:text-xs text-slate-400 truncate">
            256-bit Encrypted Titles
          </div>
        </div>
      </div>

      {/* ── Modern Navigation Tabs Bar (Scrollable on small mobile) ── */}
      <div className="overflow-x-auto pb-2 mb-6 sm:mb-8 -mx-3 px-3 sm:mx-0 sm:px-0">
        <div className="flex items-center gap-2 min-w-max border-b border-slate-200 pb-3">
          {[
            { key: 'listings', label: 'My Property Listings', icon: Building2, count: myListings.length },
            { key: 'bookings', label: 'My Bookings & Orders', icon: Package, count: myBookings.length + myOrders.length },
            { key: 'locker', label: 'Document Vault Locker', icon: Lock, count: 4 },
            { key: 'reminders', label: 'Tax & AMC Reminders', icon: Bell, count: 3 },
            { key: 'profile', label: 'Profile & KYC Details', icon: UserCheck },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 cursor-pointer ${
                  isActive
                    ? 'bg-[#0866F5] text-white shadow-md shadow-blue-500/25'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                <Icon size={15} className={isActive ? 'text-white' : 'text-slate-500'} />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span
                    className={`ml-0.5 px-2 py-0.5 rounded-full text-[11px] font-bold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════
          TAB 1: MY PROPERTY LISTINGS
          ═══════════════════════════════════════════════ */}
      {activeTab === 'listings' && (
        <div className="space-y-5 sm:space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100">
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
                Your Real Estate Listings
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Properties posted by you. Newly submitted listings undergo title deed and RERA verification by the admin desk before going live.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {/* Filter chips */}
              <div className="inline-flex rounded-lg bg-slate-100 p-0.5 border border-slate-200 text-xs font-semibold">
                <button
                  onClick={() => setListingFilter('all')}
                  className={`px-2.5 py-1 rounded-md transition-all ${listingFilter === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  All ({myListings.length})
                </button>
                <button
                  onClick={() => setListingFilter('approved')}
                  className={`px-2.5 py-1 rounded-md transition-all ${listingFilter === 'approved' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  Live ({approvedCount})
                </button>
                <button
                  onClick={() => setListingFilter('pending')}
                  className={`px-2.5 py-1 rounded-md transition-all ${listingFilter === 'pending' ? 'bg-white text-amber-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  Under Review ({pendingCount})
                </button>
              </div>

              <button
                onClick={onOpenPostProperty}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#0866F5] hover:bg-[#0653CA] text-white transition-all shadow-sm cursor-pointer"
              >
                <PlusCircle size={14} />
                <span className="hidden sm:inline">Post Another Property</span>
                <span className="sm:hidden">Post</span>
              </button>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 text-slate-500">
              <RefreshCw size={28} className="animate-spin mx-auto mb-3 text-[#0866F5]" />
              <p className="text-sm font-semibold">Loading your property portfolio...</p>
            </div>
          ) : filteredListings.length === 0 ? (
            /* Empty State */
            <div className="bg-white border-2 border-dashed border-slate-300 rounded-3xl p-8 sm:p-12 text-center max-w-xl mx-auto my-6 shadow-xs">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 text-[#0866F5] flex items-center justify-center mx-auto mb-4">
                <Building2 size={32} />
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 mb-2">
                {myListings.length === 0 ? 'No Properties Listed Under Your Account' : 'No Properties Found in Selected Filter'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-6 max-w-md mx-auto">
                {myListings.length === 0
                  ? 'Looking to sell or rent out your flat, villa, commercial office, or land? Post your listing for free on Roof Ridge and reach thousands of verified buyers with zero brokerage.'
                  : 'Try selecting a different filter above to view all submitted property listings.'}
              </p>
              <button
                onClick={onOpenPostProperty}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold bg-gradient-to-r from-[#0866F5] to-[#0653CA] hover:from-[#0653CA] hover:to-[#0543A8] text-white shadow-lg shadow-blue-500/25 transition-all cursor-pointer"
              >
                <PlusCircle size={16} />
                <span>Post Free Property Now</span>
              </button>
            </div>
          ) : (
            /* Property Cards Grid: 1 col on mobile, 2 col on tablet, 3 col on desktop */
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
              {filteredListings.map((prop) => {
                const status = prop.approvalStatus || 'pending';
                const isApproved = status === 'approved';
                const isRejected = status === 'rejected' || status === 'changes_requested';
                const isPending = status === 'pending';

                const displayImage = prop.images?.[0] || prop.image || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80';

                return (
                  <div
                    key={prop._id || prop.id}
                    className="group bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-lg hover:border-slate-300 transition-all duration-200 flex flex-col"
                  >
                    {/* Image & Moderation Badge Container */}
                    <div className="relative h-48 sm:h-52 w-full bg-slate-100 overflow-hidden">
                      <img
                        src={displayImage}
                        alt={prop.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />

                      {/* Status Tag */}
                      <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
                        {isApproved && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-extrabold bg-emerald-600 text-white shadow-md shadow-emerald-900/20 backdrop-blur-xs">
                            <CheckCircle2 size={13} />
                            Live on Marketplace
                          </span>
                        )}
                        {isPending && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-extrabold bg-amber-500 text-white shadow-md shadow-amber-900/20 backdrop-blur-xs">
                            <Clock size={13} />
                            Under Moderation Desk
                          </span>
                        )}
                        {isRejected && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-extrabold bg-rose-600 text-white shadow-md shadow-rose-900/20 backdrop-blur-xs">
                            <AlertCircle size={13} />
                            Modification Required
                          </span>
                        )}
                      </div>

                      {/* Property Type Badge */}
                      <div className="absolute top-3 right-3">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-[10.5px] font-bold uppercase tracking-wider bg-slate-900/80 text-white backdrop-blur-xs">
                          {prop.type === 'rent' ? 'For Rent' : 'For Sale'}
                        </span>
                      </div>

                      {/* Photo count indicator */}
                      {prop.images?.length > 1 && (
                        <div className="absolute bottom-3 right-3">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10.5px] font-bold bg-black/60 text-white backdrop-blur-xs">
                            📷 {prop.images.length} Photos
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Card Body */}
                    <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Price and BHK */}
                        <div className="flex items-baseline justify-between gap-2 mb-1.5">
                          <div className="text-lg sm:text-xl font-extrabold text-slate-900">
                            {prop.priceDisplay || (prop.price ? `₹ ${Number(prop.price).toLocaleString('en-IN')}` : 'Price on Call')}
                          </div>
                          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                            {prop.bhk ? `${prop.bhk} BHK ` : ''}{prop.propertyType || 'Residential'}
                          </div>
                        </div>

                        {/* Title */}
                        <h4 className="text-sm font-bold text-slate-800 line-clamp-1 mb-1.5 group-hover:text-[#0866F5] transition-colors">
                          {prop.title}
                        </h4>

                        {/* Location */}
                        <p className="text-xs text-slate-500 flex items-center gap-1 mb-3 truncate">
                          <MapPin size={13} className="text-slate-400 shrink-0" />
                          <span className="truncate">
                            {prop.location?.locality || prop.locality || 'Prime Locality'}, {prop.location?.city || prop.city || 'City'}
                          </span>
                        </p>

                        {/* Moderation Callout Box */}
                        {isPending && (
                          <div className="p-3 rounded-xl bg-amber-50/90 border border-amber-200 text-[11.5px] text-amber-900 leading-relaxed mb-3">
                            <strong className="font-bold block mb-0.5 flex items-center gap-1 text-amber-950">
                              <Clock size={12} className="text-amber-600" />
                              Review in Progress:
                            </strong>
                            Our admin verification desk is checking documents &amp; location details. Once approved, it will be published across search filters.
                          </div>
                        )}

                        {isApproved && (
                          <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center justify-between mb-3">
                            <span className="flex items-center gap-1.5 font-medium">
                              <Eye size={13} className="text-emerald-600" /> Public Views: <strong>{prop.viewsCount || 18}</strong>
                            </span>
                            <span className="font-semibold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-md">
                              Live &amp; Verified
                            </span>
                          </div>
                        )}

                        {isRejected && (
                          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-[11.5px] text-rose-900 leading-relaxed mb-3">
                            <strong className="font-bold block mb-0.5 text-rose-950">
                              Feedback from Moderator:
                            </strong>
                            {prop.rejectionReason || prop.moderationNotes || 'Please update accurate pricing and high-resolution photos.'}
                          </div>
                        )}
                      </div>

                      {/* Card Footer */}
                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
                        <span className="text-slate-400 text-[11px]">
                          {prop.createdAt
                            ? new Date(prop.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
                            : 'Submitted recently'}
                        </span>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => handleDeleteListing(prop._id || prop.id, e)}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-rose-600 hover:bg-rose-50 border border-rose-200/80 font-semibold text-xs transition-colors cursor-pointer"
                            title="Delete Listing"
                          >
                            <Trash2 size={13} />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ═══════════════════════════════════════════════
          TAB 2: MY BOOKINGS & ORDERS
          ═══════════════════════════════════════════════ */}
      {activeTab === 'bookings' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100">
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
                Service Appointments &amp; Material Orders
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Real-time tracking for Interior Consultations, Home Care Services, AMC Subscriptions and Wholesale Materials.
              </p>
            </div>

            {/* Filter buttons */}
            <div className="flex items-center gap-1.5 shrink-0 bg-slate-100 p-1 rounded-xl border border-slate-200">
              {['all', 'services', 'materials'].map(f => (
                <button
                  key={f}
                  onClick={() => setSelectedBookingFilter(f)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all cursor-pointer ${
                    selectedBookingFilter === f
                      ? 'bg-[#0866F5] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 text-slate-500">
              <RefreshCw size={28} className="animate-spin mx-auto mb-3 text-[#0866F5]" />
              <p className="text-sm font-semibold">Loading orders &amp; appointments...</p>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Service Appointments Section */}
              {(selectedBookingFilter === 'all' || selectedBookingFilter === 'services') && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#0866F5] flex items-center justify-center">
                        <Wrench size={15} />
                      </div>
                      <span>Service Bookings ({myBookings.length})</span>
                    </h3>
                  </div>

                  {myBookings.length === 0 ? (
                    <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center max-w-lg mx-auto">
                      <p className="text-xs sm:text-sm text-slate-500 mb-4">No service appointments scheduled yet.</p>
                      <button
                        onClick={() => onNavigate && onNavigate('interiors')}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-[#0866F5] hover:bg-[#0653CA] text-white transition-all cursor-pointer shadow-xs"
                      >
                        Explore Interior &amp; Maintenance Services
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
                      {myBookings.map((bkg) => (
                        <div
                          key={bkg._id || bkg.id}
                          className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <div>
                                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#0866F5]">
                                  {bkg.serviceCategory || 'Service'}
                                </span>
                                <h4 className="text-sm font-bold text-slate-900 mt-0.5">
                                  {bkg.serviceName}
                                </h4>
                              </div>

                              <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold capitalize bg-emerald-50 text-emerald-700 border border-emerald-200">
                                {bkg.status || 'Confirmed'}
                              </span>
                            </div>

                            <div className="bg-slate-50 rounded-xl p-3 text-xs text-slate-600 mb-4 space-y-1.5">
                              <div className="flex items-center gap-2">
                                <Calendar size={13} className="text-slate-400 shrink-0" />
                                <span className="truncate">
                                  {new Date(bkg.scheduledDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} • {bkg.timeSlot || 'Standard Slot'}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin size={13} className="text-slate-400 shrink-0" />
                                <span className="truncate">
                                  {bkg.address?.line1 ? `${bkg.address.line1}, ${bkg.address.city || ''}` : 'Customer Address on Record'}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                            <span className="text-slate-400">
                              ID: <strong className="text-slate-700">{bkg.bookingNumber || `RR-BKG-${(bkg._id || '').substring(0, 6)}`}</strong>
                            </span>
                            <span className="text-sm font-extrabold text-slate-900">
                              {bkg.totalAmount ? `₹ ${Number(bkg.totalAmount).toLocaleString('en-IN')}` : 'Consultation'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Wholesale Materials Orders Section */}
              {(selectedBookingFilter === 'all' || selectedBookingFilter === 'materials') && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                        <Package size={15} />
                      </div>
                      <span>Materials Store Orders ({myOrders.length})</span>
                    </h3>
                  </div>

                  {myOrders.length === 0 ? (
                    <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center max-w-lg mx-auto">
                      <p className="text-xs sm:text-sm text-slate-500 mb-4">No wholesale materials ordered yet.</p>
                      <button
                        onClick={() => onNavigate && onNavigate('materials')}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold bg-gradient-to-r from-[#0866F5] to-[#0653CA] text-white transition-all cursor-pointer shadow-md shadow-blue-500/20"
                      >
                        Browse Wholesale Cement, Steel &amp; Tiles
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
                      {myOrders.map((ord) => (
                        <div
                          key={ord._id || ord.id}
                          className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:border-purple-300 hover:shadow-md transition-all flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <div>
                                <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-600">
                                  Order {ord.orderNumber || `ORD-${(ord._id || '').substring(0, 6)}`}
                                </span>
                                <h4 className="text-sm font-bold text-slate-900 mt-0.5 line-clamp-1">
                                  {ord.items?.[0]?.name || 'Construction Materials'} {ord.items?.length > 1 ? `+ ${ord.items.length - 1} more` : ''}
                                </h4>
                              </div>

                              <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold capitalize bg-amber-50 text-amber-800 border border-amber-200">
                                {ord.status || 'Placed'}
                              </span>
                            </div>

                            <div className="bg-slate-50 rounded-xl p-3 text-xs text-slate-600 mb-4 space-y-1">
                              <div className="flex items-center justify-between">
                                <span className="text-slate-400">Payment:</span>
                                <strong className="text-slate-700 uppercase">{ord.paymentMethod || 'Online'}</strong>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-slate-400">Destination:</span>
                                <strong className="text-slate-700">{ord.shippingAddress?.city || 'Local Depot'}</strong>
                              </div>
                            </div>
                          </div>

                          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                            <span className="text-slate-400">
                              {new Date(ord.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </span>
                            <span className="text-sm font-extrabold text-slate-900">
                              ₹ {Number(ord.totalAmount || 0).toLocaleString('en-IN')}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ═══════════════════════════════════════════════
          TAB 3: DOCUMENT VAULT LOCKER
          ═══════════════════════════════════════════════ */}
      {activeTab === 'locker' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100">
              <div>
                <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                  Encrypted Property Title Documents
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Immutable cloud locker with multi-factor biometric authorization.
                </p>
              </div>
              <button 
                onClick={() => alert("Upload dialog initialized. Select PDF/Image from local device.")}
                className="inline-flex items-center justify-center gap-1.5 bg-[#0866F5] hover:bg-[#0653CA] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer shadow-xs shrink-0"
              >
                <Upload size={14} />
                <span>Upload New Document</span>
              </button>
            </div>

            <div className="space-y-3">
              {documents.map((doc, idx) => (
                <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center justify-between gap-3 shadow-xs hover:border-[#0866F5] transition-all">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0866F5] flex items-center justify-center shrink-0">
                      <FileText size={20} />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-bold text-slate-900 text-xs sm:text-sm truncate">{doc.title}</h4>
                        {doc.verified && (
                          <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-md inline-flex items-center gap-0.5">
                            <CheckCircle2 size={10} /> Verified
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-400 block mt-0.5 truncate">
                        {doc.type} • {doc.date} • {doc.size}
                      </span>
                    </div>
                  </div>

                  <button 
                    onClick={() => alert(`Downloading verified copy of ${doc.title}...`)}
                    className="p-2 text-slate-400 hover:text-[#0866F5] transition-colors cursor-pointer shrink-0"
                    title="Download Document"
                  >
                    <Download size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Security Badge Sidebar Card */}
          <div className="bg-gradient-to-br from-[#0866F5] to-[#0645B8] text-white p-6 rounded-3xl border border-blue-500 shadow-xl shadow-blue-900/15 h-fit space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center">
                <Lock size={18} className="text-white" />
              </div>
              <h4 className="font-extrabold text-white text-sm sm:text-base">
                256-Bit Bank-Grade Security
              </h4>
            </div>
            <p className="text-xs text-blue-100 leading-relaxed">
              Your property documents are stored in encrypted cloud vaults with biometric &amp; OTP authorization access only. Compliant with Indian IT Act 2000 &amp; RERA digital standards.
            </p>
            <div className="pt-2 border-t border-white/15 text-[11px] text-blue-200 flex items-center gap-2">
              <ShieldCheck size={14} className="text-emerald-300" />
              <span>Zero-knowledge client-side encryption</span>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════
          TAB 4: TAX & AMC REMINDERS
          ═══════════════════════════════════════════════ */}
      {activeTab === 'reminders' && (
        <div className="bg-white p-5 sm:p-7 rounded-3xl border border-slate-200 shadow-xs max-w-2xl">
          <h3 className="font-extrabold text-slate-900 text-base sm:text-lg mb-1">
            Upcoming Dues &amp; Maintenance Reminders
          </h3>
          <p className="text-xs text-slate-500 mb-6">
            Automated SMS and email notifications 7 days prior to expiry.
          </p>

          <div className="space-y-3">
            {reminders.map((rem, idx) => (
              <div key={idx} className="p-4 rounded-2xl border border-slate-200 flex items-center justify-between gap-3 hover:border-[#0866F5] transition-all">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0866F5] flex items-center justify-center shrink-0">
                    <Bell size={18} />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900 truncate">{rem.title}</h4>
                    <span className="text-[11px] text-slate-500 block mt-0.5 truncate">
                      Due: {rem.date} • <strong>{rem.amount}</strong>
                    </span>
                  </div>
                </div>

                <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full shrink-0 ${
                  rem.status === 'Pending' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {rem.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════
          TAB 5: PROFILE & KYC DETAILS
          ═══════════════════════════════════════════════ */}
      {activeTab === 'profile' && (
        <div className="max-w-2xl bg-white border border-slate-200 rounded-3xl p-5 sm:p-7 shadow-xs">
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-200">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0866F5] to-[#05338E] text-white flex items-center justify-center font-extrabold text-2xl shadow-md shadow-blue-500/20 shrink-0">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div className="min-w-0">
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900 truncate">
                {user?.name || 'Roof Ridge Member'}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {user?.phone ? `+91 ${user.phone}` : 'No phone attached'}
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-md inline-flex items-center gap-1">
                  <ShieldCheck size={11} /> Aadhaar e-KYC Verified
                </span>
                <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded-md capitalize">
                  {user?.role || 'User'}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-slate-400 block mb-1 text-[11px] uppercase tracking-wider font-bold">Account Role</span>
                <strong className="text-slate-800 text-sm capitalize">{user?.role || 'Property Owner / Buyer'}</strong>
              </div>
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-slate-400 block mb-1 text-[11px] uppercase tracking-wider font-bold">Preferred City</span>
                <strong className="text-slate-800 text-sm">Noida / NCR</strong>
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="text-slate-400 block mb-1 text-[11px] uppercase tracking-wider font-bold">Verification Status</span>
              <strong className="text-emerald-700 text-sm flex items-center gap-1.5">
                <CheckCircle2 size={15} /> 100% Complete — Authorized for direct listings &amp; bookings
              </strong>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
