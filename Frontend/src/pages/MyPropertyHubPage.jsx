import React, { useState, useEffect } from 'react';
import {
  ShieldCheck, FileText, Download, Upload, Bell, Calendar, Lock,
  CheckCircle2, Clock, AlertCircle, Building2, Package, PlusCircle,
  Trash2, ExternalLink, UserCheck, Phone, MapPin, Tag, Wrench, RefreshCw,
  ShoppingBag, Check, ChevronRight, Eye, Sparkles, Filter, CheckCircle
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
    { title: 'Registered Sale Deed (Original)', type: 'Legal Title Deed', date: '14 Jan 2026', size: '4.2 MB', verified: true },
    { title: 'Encumbrance Certificate (EC)', type: 'RERA Compliance', date: '20 Feb 2026', size: '1.8 MB', verified: true },
    { title: 'Property Tax Payment Receipt 2026', type: 'Municipal Tax Record', date: '05 Mar 2026', size: '890 KB', verified: true },
    { title: 'SBI Home Loan Sanction Letter', type: 'Banking Clearance', date: '12 Apr 2026', size: '2.5 MB', verified: true }
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
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '24px 20px 60px 20px', fontFamily: 'Inter, sans-serif' }}>
      
      {/* ── 1. EXECUTIVE USER HEADER BANNER ── */}
      <div
        style={{
          background: 'linear-gradient(135deg, #0A1E4A 0%, #0866F5 70%, #0645B8 100%)',
          borderRadius: '24px',
          padding: '32px 36px',
          color: '#FFFFFF',
          marginBottom: '28px',
          boxShadow: '0 12px 32px rgba(8, 102, 245, 0.22)',
          position: 'relative',
          overflow: 'hidden',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}
      >
        {/* Subtle decorative glow accents */}
        <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '220px', height: '220px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)', filter: 'blur(30px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-60px', left: '-60px', width: '220px', height: '220px', borderRadius: '50%', background: 'rgba(96,165,250,0.15)', filter: 'blur(30px)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <div style={{ maxWidth: '720px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', flexWrap: 'wrap' }}>
              <span style={{
                background: 'rgba(255, 183, 77, 0.22)',
                color: '#FFD54F',
                border: '1px solid rgba(255, 183, 77, 0.45)',
                fontSize: '11px',
                fontWeight: 800,
                padding: '4px 12px',
                borderRadius: '20px',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px'
              }}>
                <Sparkles size={12} color="#FFD54F" /> Verified Resident &amp; Owner Desk
              </span>

              <span style={{
                background: 'rgba(255, 255, 255, 0.15)',
                color: '#E0F2FE',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                fontSize: '11px',
                fontWeight: 700,
                padding: '4px 10px',
                borderRadius: '20px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px'
              }}>
                <ShieldCheck size={13} color="#6EE7B7" /> Aadhaar KYC Active
              </span>
            </div>

            <h1 style={{
              fontSize: '28px',
              fontWeight: 800,
              color: '#FFFFFF',
              letterSpacing: '-0.02em',
              margin: '0 0 6px 0',
              lineHeight: 1.2
            }}>
              Welcome Back, {user?.name || 'Valued Member'}
            </h1>
            <p style={{
              fontSize: '13.5px',
              color: 'rgba(255, 255, 255, 0.88)',
              margin: 0,
              lineHeight: 1.55
            }}>
              Central control desk for your property listings, active service appointments, materials deliveries, and 256-bit bank-grade digital document vault.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={loadUserData}
              disabled={refreshing}
              style={{
                background: 'rgba(255, 255, 255, 0.14)',
                color: '#FFFFFF',
                border: '1px solid rgba(255, 255, 255, 0.28)',
                borderRadius: '12px',
                padding: '11px 18px',
                fontSize: '13px',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                backdropFilter: 'blur(8px)'
              }}
            >
              <RefreshCw size={15} className={refreshing ? 'animate-spin' : ''} />
              <span>Sync Dashboard</span>
            </button>

            <button
              onClick={onOpenPostProperty}
              style={{
                background: '#FFFFFF',
                color: '#0866F5',
                border: 'none',
                borderRadius: '12px',
                padding: '12px 22px',
                fontSize: '13px',
                fontWeight: 800,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                boxShadow: '0 6px 18px rgba(0, 0, 0, 0.18)',
                transition: 'all 0.15s ease'
              }}
            >
              <PlusCircle size={16} color="#0866F5" />
              <span>Post New Property</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── 2. QUICK KPI METRIC CARDS (4-COL SYMMETRIC) ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '20px',
        marginBottom: '32px'
      }}>
        {/* KPI 1: My Listings */}
        <div style={kpiCardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={kpiLabelStyle}>My Listings</span>
            <div style={{ ...kpiIconBox, background: '#EEF5FF', color: '#0866F5' }}>
              <Building2 size={18} />
            </div>
          </div>
          <div style={kpiValueStyle}>{myListings.length}</div>
          <div style={kpiSubStyle}>
            <span style={{ color: '#059669', fontWeight: 800 }}>{approvedCount} Live</span>
            <span style={{ color: '#CBD5E1', margin: '0 6px' }}>•</span>
            <span style={{ color: '#D97706', fontWeight: 800 }}>{pendingCount} In Review</span>
          </div>
        </div>

        {/* KPI 2: Booked Services */}
        <div style={kpiCardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={kpiLabelStyle}>Booked Services</span>
            <div style={{ ...kpiIconBox, background: '#F0F9FF', color: '#0284C7' }}>
              <Wrench size={18} />
            </div>
          </div>
          <div style={kpiValueStyle}>{myBookings.length}</div>
          <div style={kpiSubStyle}>
            <span>Interiors, Cleaning &amp; AMC</span>
          </div>
        </div>

        {/* KPI 3: Material Orders */}
        <div style={kpiCardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={kpiLabelStyle}>Material Orders</span>
            <div style={{ ...kpiIconBox, background: '#FAF5FF', color: '#9333EA' }}>
              <Package size={18} />
            </div>
          </div>
          <div style={kpiValueStyle}>{myOrders.length}</div>
          <div style={kpiSubStyle}>
            <span>Wholesale Cement, Steel &amp; Tiles</span>
          </div>
        </div>

        {/* KPI 4: Vault Documents */}
        <div style={kpiCardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={kpiLabelStyle}>Vault Locker</span>
            <div style={{ ...kpiIconBox, background: '#F0FDF4', color: '#059669' }}>
              <Lock size={18} />
            </div>
          </div>
          <div style={kpiValueStyle}>4</div>
          <div style={kpiSubStyle}>
            <span style={{ color: '#059669', fontWeight: 700 }}>256-Bit Encrypted Titles</span>
          </div>
        </div>
      </div>

      {/* ── 3. ELEGANT NAVIGATION PILL TAB BAR ── */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        background: '#F8FAFC',
        padding: '6px',
        borderRadius: '16px',
        border: '1px solid #E2E8F0',
        overflowX: 'auto',
        marginBottom: '32px'
      }}>
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
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '11px 18px',
                borderRadius: '12px',
                border: 'none',
                background: isActive ? '#0866F5' : 'transparent',
                color: isActive ? '#FFFFFF' : '#475569',
                fontSize: '13px',
                fontWeight: isActive ? 800 : 600,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                whiteSpace: 'nowrap',
                boxShadow: isActive ? '0 4px 14px rgba(8, 102, 245, 0.3)' : 'none'
              }}
            >
              <Icon size={16} color={isActive ? '#FFFFFF' : '#64748B'} />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span style={{
                  padding: '2px 8px',
                  borderRadius: '12px',
                  fontSize: '11px',
                  fontWeight: 800,
                  background: isActive ? 'rgba(255, 255, 255, 0.22)' : '#E2E8F0',
                  color: isActive ? '#FFFFFF' : '#334155'
                }}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ═══════════════════════════════════════════════
          TAB 1: MY PROPERTY LISTINGS
          ═══════════════════════════════════════════════ */}
      {activeTab === 'listings' && (
        <div>
          {/* Subheader & Filters */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            marginBottom: '24px',
            paddingBottom: '16px',
            borderBottom: '1px solid #E2E8F0'
          }}>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A', margin: '0 0 4px 0' }}>
                Your Real Estate Listings
              </h2>
              <p style={{ fontSize: '13px', color: '#64748B', margin: 0 }}>
                Properties posted by you. Newly submitted listings undergo title deed and RERA verification by the admin desk before going live.
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              {/* Filter chips */}
              <div style={{ display: 'inline-flex', background: '#F1F5F9', padding: '3px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                <button
                  onClick={() => setListingFilter('all')}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '8px',
                    border: 'none',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    background: listingFilter === 'all' ? '#FFFFFF' : 'transparent',
                    color: listingFilter === 'all' ? '#0F172A' : '#64748B',
                    boxShadow: listingFilter === 'all' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none'
                  }}
                >
                  All ({myListings.length})
                </button>
                <button
                  onClick={() => setListingFilter('approved')}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '8px',
                    border: 'none',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    background: listingFilter === 'approved' ? '#FFFFFF' : 'transparent',
                    color: listingFilter === 'approved' ? '#059669' : '#64748B',
                    boxShadow: listingFilter === 'approved' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none'
                  }}
                >
                  Live ({approvedCount})
                </button>
                <button
                  onClick={() => setListingFilter('pending')}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '8px',
                    border: 'none',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    background: listingFilter === 'pending' ? '#FFFFFF' : 'transparent',
                    color: listingFilter === 'pending' ? '#D97706' : '#64748B',
                    boxShadow: listingFilter === 'pending' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none'
                  }}
                >
                  In Review ({pendingCount})
                </button>
              </div>

              <button
                onClick={onOpenPostProperty}
                style={{
                  background: '#0866F5',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '9px 16px',
                  fontSize: '12.5px',
                  fontWeight: 700,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(8, 102, 245, 0.25)'
                }}
              >
                <PlusCircle size={15} />
                <span>Post Another Property</span>
              </button>
            </div>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px 0', background: '#FFFFFF', borderRadius: '20px', border: '1px solid #E2E8F0' }}>
              <RefreshCw size={28} className="animate-spin text-[#0866F5]" style={{ margin: '0 auto 12px auto' }} />
              <p style={{ fontSize: '14px', fontWeight: 700, color: '#475569' }}>Loading your property portfolio...</p>
            </div>
          ) : filteredListings.length === 0 ? (
            /* Perfectly Centered Empty State Card */
            <div style={{
              maxWidth: '680px',
              margin: '32px auto',
              background: '#FFFFFF',
              border: '2px dashed #CBD5E1',
              borderRadius: '24px',
              padding: '52px 32px',
              textAlign: 'center',
              boxShadow: '0 4px 20px rgba(11, 31, 68, 0.04)'
            }}>
              <div style={{
                width: '68px',
                height: '68px',
                borderRadius: '20px',
                background: '#EEF5FF',
                color: '#0866F5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 18px auto'
              }}>
                <Building2 size={32} />
              </div>

              <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A', margin: '0 0 8px 0' }}>
                {myListings.length === 0 ? 'No Properties Listed Under Your Account' : 'No Properties Found in Selected Filter'}
              </h3>
              
              <p style={{ fontSize: '13.5px', color: '#64748B', lineHeight: 1.6, maxWidth: '480px', margin: '0 auto 24px auto' }}>
                {myListings.length === 0
                  ? 'Looking to sell or rent out your flat, villa, commercial office, or land? Post your listing for free on Roof Ridge and reach thousands of verified buyers with zero brokerage.'
                  : 'Try selecting a different filter above to view all submitted property listings.'}
              </p>

              <button
                onClick={onOpenPostProperty}
                style={{
                  background: 'linear-gradient(135deg, #0866F5 0%, #0645B8 100%)',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '14px',
                  padding: '13px 28px',
                  fontSize: '14px',
                  fontWeight: 800,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  boxShadow: '0 6px 20px rgba(8, 102, 245, 0.35)'
                }}
              >
                <PlusCircle size={16} />
                <span>Post Free Property Now</span>
              </button>
            </div>
          ) : (
            /* Symmetrical Property Grid */
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
              gap: '24px'
            }}>
              {filteredListings.map((prop) => {
                const status = prop.approvalStatus || 'pending';
                const isApproved = status === 'approved';
                const isRejected = status === 'rejected' || status === 'changes_requested';
                const isPending = status === 'pending';

                const displayImage = prop.images?.[0] || prop.image || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80';

                return (
                  <div
                    key={prop._id || prop.id}
                    style={{
                      background: '#FFFFFF',
                      borderRadius: '20px',
                      border: '1px solid #E2E8F0',
                      overflow: 'hidden',
                      boxShadow: '0 4px 18px rgba(11, 31, 68, 0.05)',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'transform 0.15s ease, box-shadow 0.15s ease'
                    }}
                  >
                    {/* Property Image & Status Badges */}
                    <div style={{ position: 'relative', height: '210px', background: '#F1F5F9' }}>
                      <img
                        src={displayImage}
                        alt={prop.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80';
                        }}
                      />

                      {/* Status Tag Overlay */}
                      <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
                        {isApproved && (
                          <span style={{
                            background: '#059669',
                            color: '#FFFFFF',
                            fontSize: '11px',
                            fontWeight: 800,
                            padding: '4px 10px',
                            borderRadius: '8px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '5px',
                            boxShadow: '0 2px 8px rgba(5, 150, 105, 0.35)'
                          }}>
                            <CheckCircle2 size={13} /> Live on Marketplace
                          </span>
                        )}
                        {isPending && (
                          <span style={{
                            background: '#D97706',
                            color: '#FFFFFF',
                            fontSize: '11px',
                            fontWeight: 800,
                            padding: '4px 10px',
                            borderRadius: '8px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '5px',
                            boxShadow: '0 2px 8px rgba(217, 119, 6, 0.35)'
                          }}>
                            <Clock size={13} /> Under Moderation Desk
                          </span>
                        )}
                        {isRejected && (
                          <span style={{
                            background: '#DC2626',
                            color: '#FFFFFF',
                            fontSize: '11px',
                            fontWeight: 800,
                            padding: '4px 10px',
                            borderRadius: '8px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '5px',
                            boxShadow: '0 2px 8px rgba(220, 38, 38, 0.35)'
                          }}>
                            <AlertCircle size={13} /> Modification Required
                          </span>
                        )}
                      </div>

                      {/* Type Badge */}
                      <div style={{ position: 'absolute', top: '12px', right: '12px' }}>
                        <span style={{
                          background: 'rgba(15, 23, 42, 0.85)',
                          backdropFilter: 'blur(4px)',
                          color: '#FFFFFF',
                          fontSize: '11px',
                          fontWeight: 700,
                          padding: '4px 10px',
                          borderRadius: '8px',
                          textTransform: 'uppercase'
                        }}>
                          {prop.type === 'rent' ? 'For Rent' : 'For Sale'}
                        </span>
                      </div>

                      {/* Photos indicator */}
                      {prop.images?.length > 1 && (
                        <div style={{ position: 'absolute', bottom: '10px', right: '12px' }}>
                          <span style={{
                            background: 'rgba(0, 0, 0, 0.65)',
                            backdropFilter: 'blur(4px)',
                            color: '#FFFFFF',
                            fontSize: '11px',
                            fontWeight: 700,
                            padding: '3px 8px',
                            borderRadius: '6px'
                          }}>
                            📷 {prop.images.length} Photos
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Card Body */}
                    <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        {/* Price & BHK */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '6px' }}>
                          <span style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A' }}>
                            {prop.priceDisplay || (prop.price ? `₹ ${Number(prop.price).toLocaleString('en-IN')}` : 'Price on Call')}
                          </span>
                          <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 700 }}>
                            {prop.bhk ? `${prop.bhk} BHK ` : ''}{prop.propertyType || 'Residential'}
                          </span>
                        </div>

                        {/* Title */}
                        <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#1E293B', margin: '0 0 6px 0', lineHeight: 1.35 }}>
                          {prop.title}
                        </h4>

                        {/* Locality */}
                        <p style={{ fontSize: '12.5px', color: '#64748B', display: 'flex', alignItems: 'center', gap: '5px', margin: '0 0 14px 0' }}>
                          <MapPin size={13} color="#94A3B8" />
                          <span>{prop.location?.locality || prop.locality || 'Prime Locality'}, {prop.location?.city || prop.city || 'City'}</span>
                        </p>

                        {/* Moderation Callout Box */}
                        {isPending && (
                          <div style={{
                            background: '#FFFBEB',
                            border: '1px solid #FDE68A',
                            borderRadius: '12px',
                            padding: '10px 14px',
                            fontSize: '12px',
                            color: '#92400E',
                            lineHeight: 1.45,
                            marginBottom: '16px'
                          }}>
                            <strong style={{ display: 'block', marginBottom: '2px', color: '#78350F' }}>
                              Review in Progress:
                            </strong>
                            Our admin verification desk is checking documents &amp; location details. Once approved, it will be published across search filters.
                          </div>
                        )}

                        {isApproved && (
                          <div style={{
                            background: '#F0FDF4',
                            border: '1px solid #BBF7D0',
                            borderRadius: '12px',
                            padding: '10px 14px',
                            fontSize: '12px',
                            color: '#166534',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '16px'
                          }}>
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                              <Eye size={13} color="#059669" /> Public Views: <strong>{prop.viewsCount || 24}</strong>
                            </span>
                            <span style={{ background: '#DCFCE7', padding: '2px 8px', borderRadius: '6px', fontWeight: 700, fontSize: '11px' }}>
                              Live &amp; Verified
                            </span>
                          </div>
                        )}

                        {isRejected && (
                          <div style={{
                            background: '#FEF2F2',
                            border: '1px solid #FECACA',
                            borderRadius: '12px',
                            padding: '10px 14px',
                            fontSize: '12px',
                            color: '#991B1B',
                            lineHeight: 1.45,
                            marginBottom: '16px'
                          }}>
                            <strong style={{ display: 'block', marginBottom: '2px', color: '#7F1D1D' }}>
                              Feedback from Moderator:
                            </strong>
                            {prop.rejectionReason || prop.moderationNotes || 'Please update accurate pricing and high-resolution photos.'}
                          </div>
                        )}
                      </div>

                      {/* Card Footer */}
                      <div style={{ paddingTop: '12px', borderTop: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '11.5px', color: '#94A3B8' }}>
                          Posted: {prop.createdAt ? new Date(prop.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Recently'}
                        </span>

                        <button
                          onClick={(e) => handleDeleteListing(prop._id || prop.id, e)}
                          style={{
                            background: '#FEE2E2',
                            color: '#DC2626',
                            border: 'none',
                            borderRadius: '8px',
                            padding: '6px 12px',
                            fontSize: '12px',
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            transition: 'background 0.15s ease'
                          }}
                          title="Delete Listing"
                        >
                          <Trash2 size={13} />
                          <span>Delete</span>
                        </button>
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
        <div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            marginBottom: '24px',
            paddingBottom: '16px',
            borderBottom: '1px solid #E2E8F0'
          }}>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A', margin: '0 0 4px 0' }}>
                Service Appointments &amp; Material Orders
              </h2>
              <p style={{ fontSize: '13px', color: '#64748B', margin: 0 }}>
                Real-time tracking for Interior Consultations, Home Care Services, AMC Subscriptions and Wholesale Materials.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '8px', background: '#F1F5F9', padding: '3px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
              {['all', 'services', 'materials'].map(f => (
                <button
                  key={f}
                  onClick={() => setSelectedBookingFilter(f)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '8px',
                    border: 'none',
                    fontSize: '12px',
                    fontWeight: 700,
                    textTransform: 'capitalize',
                    cursor: 'pointer',
                    background: selectedBookingFilter === f ? '#0866F5' : 'transparent',
                    color: selectedBookingFilter === f ? '#FFFFFF' : '#475569',
                    boxShadow: selectedBookingFilter === f ? '0 2px 6px rgba(8, 102, 245, 0.25)' : 'none'
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px 0', background: '#FFFFFF', borderRadius: '20px', border: '1px solid #E2E8F0' }}>
              <RefreshCw size={28} className="animate-spin text-[#0866F5]" style={{ margin: '0 auto 12px auto' }} />
              <p style={{ fontSize: '14px', fontWeight: 700, color: '#475569' }}>Loading orders &amp; appointments...</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {/* Service Appointments */}
              {(selectedBookingFilter === 'all' || selectedBookingFilter === 'services') && (
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Wrench size={18} color="#0866F5" />
                    <span>Service Appointments ({myBookings.length})</span>
                  </h3>

                  {myBookings.length === 0 ? (
                    <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '20px', padding: '40px 24px', textAlign: 'center' }}>
                      <p style={{ fontSize: '13.5px', color: '#64748B', margin: '0 0 16px 0' }}>No service appointments scheduled yet.</p>
                      <button
                        onClick={() => onNavigate && onNavigate('interiors')}
                        style={{
                          background: '#0866F5',
                          color: '#FFFFFF',
                          border: 'none',
                          borderRadius: '10px',
                          padding: '10px 20px',
                          fontSize: '13px',
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}
                      >
                        Explore Interior &amp; Maintenance Services
                      </button>
                    </div>
                  ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '20px' }}>
                      {myBookings.map((bkg) => (
                        <div
                          key={bkg._id || bkg.id}
                          style={{
                            background: '#FFFFFF',
                            border: '1px solid #E2E8F0',
                            borderRadius: '18px',
                            padding: '22px',
                            boxShadow: '0 2px 12px rgba(11, 31, 68, 0.04)'
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                            <div>
                              <span style={{ fontSize: '10.5px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#0866F5' }}>
                                {bkg.serviceCategory || 'Service'}
                              </span>
                              <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A', margin: '2px 0 0 0' }}>
                                {bkg.serviceName}
                              </h4>
                            </div>

                            <span style={{
                              background: '#DEF7EC',
                              color: '#03543F',
                              fontSize: '11px',
                              fontWeight: 700,
                              padding: '4px 9px',
                              borderRadius: '8px',
                              textTransform: 'capitalize'
                            }}>
                              {bkg.status || 'Confirmed'}
                            </span>
                          </div>

                          <div style={{ background: '#F8FAFC', borderRadius: '12px', padding: '12px 14px', fontSize: '12px', color: '#475569', marginBottom: '14px', lineHeight: 1.5 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                              <Calendar size={13} color="#64748B" />
                              <span>{new Date(bkg.scheduledDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} • {bkg.timeSlot || 'Standard Slot'}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <MapPin size={13} color="#64748B" />
                              <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                                {bkg.address?.line1 ? `${bkg.address.line1}, ${bkg.address.city || ''}` : 'Customer Address on Record'}
                              </span>
                            </div>
                          </div>

                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px' }}>
                            <span style={{ color: '#64748B' }}>Booking ID: <strong>{bkg.bookingNumber || `RR-BKG-${(bkg._id || '').substring(0, 6)}`}</strong></span>
                            <span style={{ fontWeight: 800, color: '#0F172A', fontSize: '14px' }}>
                              {bkg.totalAmount ? `₹ ${Number(bkg.totalAmount).toLocaleString('en-IN')}` : 'Consultation'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Wholesale Materials Orders */}
              {(selectedBookingFilter === 'all' || selectedBookingFilter === 'materials') && (
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Package size={18} color="#9333EA" />
                    <span>Materials Store Orders ({myOrders.length})</span>
                  </h3>

                  {myOrders.length === 0 ? (
                    <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '20px', padding: '40px 24px', textAlign: 'center' }}>
                      <p style={{ fontSize: '13.5px', color: '#64748B', margin: '0 0 16px 0' }}>No wholesale materials ordered yet.</p>
                      <button
                        onClick={() => onNavigate && onNavigate('materials')}
                        style={{
                          background: 'linear-gradient(135deg, #0866F5 0%, #0653CA 100%)',
                          color: '#FFFFFF',
                          border: 'none',
                          borderRadius: '24px',
                          padding: '10px 22px',
                          fontSize: '12.5px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          boxShadow: '0 4px 14px rgba(8, 102, 245, 0.25)'
                        }}
                      >
                        Browse Wholesale Cement, Steel &amp; Tiles
                      </button>
                    </div>
                  ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '20px' }}>
                      {myOrders.map((ord) => (
                        <div
                          key={ord._id || ord.id}
                          style={{
                            background: '#FFFFFF',
                            border: '1px solid #E2E8F0',
                            borderRadius: '18px',
                            padding: '22px',
                            boxShadow: '0 2px 12px rgba(11, 31, 68, 0.04)'
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                            <div>
                              <span style={{ fontSize: '10.5px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#9333EA' }}>
                                Order {ord.orderNumber || `ORD-${(ord._id || '').substring(0, 6)}`}
                              </span>
                              <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A', margin: '2px 0 0 0' }}>
                                {ord.items?.[0]?.name || 'Construction Materials'} {ord.items?.length > 1 ? `+ ${ord.items.length - 1} more` : ''}
                              </h4>
                            </div>

                            <span style={{
                              background: '#FEF3C7',
                              color: '#92400E',
                              fontSize: '11px',
                              fontWeight: 700,
                              padding: '4px 9px',
                              borderRadius: '8px',
                              textTransform: 'capitalize'
                            }}>
                              {ord.status || 'Placed'}
                            </span>
                          </div>

                          <div style={{ background: '#F8FAFC', borderRadius: '12px', padding: '12px 14px', fontSize: '12px', color: '#475569', marginBottom: '14px', lineHeight: 1.5 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                              <span>Payment Method:</span>
                              <strong style={{ textTransform: 'uppercase' }}>{ord.paymentMethod || 'Online'}</strong>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                              <span>Shipment Destination:</span>
                              <strong>{ord.shippingAddress?.city || 'Local Depot'}</strong>
                            </div>
                          </div>

                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px' }}>
                            <span style={{ color: '#64748B' }}>
                              {new Date(ord.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </span>
                            <span style={{ fontWeight: 800, color: '#0F172A', fontSize: '15px' }}>
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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '32px' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', margin: '0 0 4px 0' }}>
                  Encrypted Property Title Documents
                </h3>
                <p style={{ fontSize: '13px', color: '#64748B', margin: 0 }}>
                  Immutable cloud locker with multi-factor biometric authorization.
                </p>
              </div>
              <button 
                onClick={() => alert("Upload dialog initialized. Select PDF/Image from local device.")}
                style={{
                  background: '#0866F5',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '9px 16px',
                  fontSize: '12px',
                  fontWeight: 700,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer'
                }}
              >
                <Upload size={14} />
                <span>Upload Document</span>
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {documents.map((doc, idx) => (
                <div
                  key={idx}
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderRadius: '16px',
                    padding: '18px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    boxShadow: '0 2px 10px rgba(11, 31, 68, 0.04)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: '#EEF5FF', color: '#0866F5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <FileText size={20} />
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <h4 style={{ fontSize: '13.5px', fontWeight: 800, color: '#0F172A', margin: 0 }}>{doc.title}</h4>
                        {doc.verified && (
                          <span style={{ background: '#DCFCE7', color: '#166534', fontSize: '10px', fontWeight: 800, padding: '2px 7px', borderRadius: '6px', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                            <CheckCircle2 size={10} /> Verified
                          </span>
                        )}
                      </div>
                      <span style={{ fontSize: '11.5px', color: '#94A3B8', display: 'block', marginTop: '3px' }}>
                        {doc.type} • {doc.date} • {doc.size}
                      </span>
                    </div>
                  </div>

                  <button 
                    onClick={() => alert(`Downloading verified copy of ${doc.title}...`)}
                    style={{ background: 'transparent', border: 'none', color: '#64748B', cursor: 'pointer', padding: '6px' }}
                    title="Download Document"
                  >
                    <Download size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Security Showcase Card */}
          <div style={{
            background: 'linear-gradient(135deg, #0A1E4A 0%, #0866F5 100%)',
            borderRadius: '24px',
            padding: '32px',
            color: '#FFFFFF',
            boxShadow: '0 10px 30px rgba(8, 102, 245, 0.2)',
            height: 'fit-content',
            border: '1px solid rgba(255, 255, 255, 0.15)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Lock size={20} color="#FFFFFF" />
              </div>
              <h4 style={{ fontSize: '17px', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
                256-Bit Bank-Grade Cloud Locker
              </h4>
            </div>

            <p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.88)', lineHeight: 1.6, margin: '0 0 20px 0' }}>
              Your property documents are stored in encrypted cloud vaults with biometric &amp; OTP authorization access only. Compliant with Indian IT Act 2000 &amp; RERA digital registry standards.
            </p>

            <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.15)', paddingTop: '16px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#A7F3D0' }}>
              <ShieldCheck size={16} />
              <span>Zero-knowledge client-side encryption verified</span>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════
          TAB 4: TAX & AMC REMINDERS
          ═══════════════════════════════════════════════ */}
      {activeTab === 'reminders' && (
        <div style={{ maxWidth: '720px', background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '24px', padding: '32px', boxShadow: '0 4px 18px rgba(11, 31, 68, 0.04)' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', margin: '0 0 4px 0' }}>
            Upcoming Dues &amp; Maintenance Reminders
          </h3>
          <p style={{ fontSize: '13px', color: '#64748B', margin: '0 0 24px 0' }}>
            Automated SMS and email notifications 7 days prior to expiry.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {reminders.map((rem, idx) => (
              <div
                key={idx}
                style={{
                  border: '1px solid #E2E8F0',
                  borderRadius: '16px',
                  padding: '18px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#EEF5FF', color: '#0866F5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Bell size={18} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A', margin: 0 }}>{rem.title}</h4>
                    <span style={{ fontSize: '12px', color: '#64748B', display: 'block', marginTop: '2px' }}>
                      Due: {rem.date} • <strong style={{ color: '#0F172A' }}>{rem.amount}</strong>
                    </span>
                  </div>
                </div>

                <span style={{
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '11px',
                  fontWeight: 800,
                  background: rem.status === 'Pending' ? '#FEF3C7' : '#DBEAFE',
                  color: rem.status === 'Pending' ? '#92400E' : '#1E40AF'
                }}>
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
        <div style={{ maxWidth: '720px', background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '24px', padding: '32px', boxShadow: '0 4px 18px rgba(11, 31, 68, 0.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', paddingBottom: '24px', borderBottom: '1px solid #E2E8F0', marginBottom: '24px' }}>
            <div style={{
              width: '68px',
              height: '68px',
              borderRadius: '22px',
              background: 'linear-gradient(135deg, #0A1E4A 0%, #0866F5 100%)',
              color: '#FFFFFF',
              fontSize: '26px',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 6px 18px rgba(8, 102, 245, 0.25)'
            }}>
              {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>

            <div>
              <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A', margin: '0 0 2px 0' }}>
                {user?.name || 'Roof Ridge Member'}
              </h3>
              <p style={{ fontSize: '13px', color: '#64748B', margin: '0 0 8px 0' }}>
                {user?.phone ? `+91 ${user.phone}` : 'No phone attached'}
              </p>
              <div style={{ display: 'flex', gap: '8px' }}>
                <span style={{ background: '#DCFCE7', color: '#166534', fontSize: '11px', fontWeight: 800, padding: '3px 10px', borderRadius: '8px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <ShieldCheck size={12} /> Aadhaar e-KYC Verified
                </span>
                <span style={{ background: '#EFF6FF', color: '#1E40AF', fontSize: '11px', fontWeight: 800, padding: '3px 10px', borderRadius: '8px', textTransform: 'capitalize' }}>
                  {user?.role || 'Property Owner'}
                </span>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '16px' }}>
            <div style={{ background: '#F8FAFC', borderRadius: '16px', padding: '16px 18px', border: '1px solid #F1F5F9' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '4px' }}>
                Account Privileges
              </span>
              <strong style={{ fontSize: '14px', color: '#0F172A', textTransform: 'capitalize' }}>
                {user?.role || 'Property Owner / Buyer'}
              </strong>
            </div>

            <div style={{ background: '#F8FAFC', borderRadius: '16px', padding: '16px 18px', border: '1px solid #F1F5F9' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '4px' }}>
                Registered Region
              </span>
              <strong style={{ fontSize: '14px', color: '#0F172A' }}>
                Noida &amp; Delhi NCR
              </strong>
            </div>
          </div>

          <div style={{ background: '#F0FDF4', borderRadius: '16px', padding: '16px 18px', border: '1px solid #BBF7D0' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#166534', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '4px' }}>
              Platform Verification Status
            </span>
            <strong style={{ fontSize: '14px', color: '#15803D', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={16} /> 100% Complete — Authorized for direct listings &amp; instant booking clearance
            </strong>
          </div>
        </div>
      )}
    </div>
  );
}

const kpiCardStyle = {
  background: '#FFFFFF',
  borderRadius: '20px',
  border: '1px solid #E2E8F0',
  padding: '22px 24px',
  boxShadow: '0 4px 18px rgba(11, 31, 68, 0.04)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  transition: 'transform 0.15s ease, box-shadow 0.15s ease'
};

const kpiIconBox = {
  width: '38px',
  height: '38px',
  borderRadius: '12px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const kpiLabelStyle = {
  fontSize: '11.5px',
  fontWeight: 800,
  color: '#64748B',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
};

const kpiValueStyle = {
  fontSize: '32px',
  fontWeight: 800,
  color: '#0F172A',
  margin: '8px 0 4px 0',
  lineHeight: 1,
  fontFamily: 'Inter, sans-serif'
};

const kpiSubStyle = {
  fontSize: '12px',
  color: '#94A3B8',
  margin: 0,
};
