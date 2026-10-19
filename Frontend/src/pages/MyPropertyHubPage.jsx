import React, { useState, useEffect } from 'react';
import {
  ShieldCheck, FileText, Download, Upload, Bell, Calendar, Lock,
  CheckCircle2, Clock, AlertCircle, Building2, Package, PlusCircle,
  Trash2, ExternalLink, UserCheck, Phone, MapPin, Tag, Wrench, RefreshCw,
  ShoppingBag, Check, ChevronRight
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

  return (
    <div className="max-w-[1380px] mx-auto px-4 sm:px-8 py-5 animate-fade font-sans">
      {/* ── Executive User Header Banner ── */}
      <div 
        style={{
          background: 'linear-gradient(135deg, #0866F5 0%, #0645B8 50%, #05338E 100%)',
          borderRadius: '20px',
          padding: '20px 24px',
          color: '#FFFFFF',
          marginBottom: '20px',
          boxShadow: '0 10px 28px rgba(8, 102, 245, 0.2)',
          position: 'relative',
          overflow: 'hidden',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}
      >
        <div style={{ position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{
                background: 'rgba(255, 87, 34, 0.2)',
                color: '#FF8A65',
                border: '1px solid rgba(255, 87, 34, 0.4)',
                fontSize: '10.5px',
                fontWeight: 800,
                padding: '3px 10px',
                borderRadius: '16px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                Verified Resident &amp; Owner Desk
              </span>
              <span style={{
                background: 'rgba(8, 102, 245, 0.2)',
                color: '#60A5FA',
                border: '1px solid rgba(8, 102, 245, 0.3)',
                fontSize: '10.5px',
                fontWeight: 700,
                padding: '3px 8px',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <ShieldCheck size={12} /> KYC Active
              </span>
            </div>
            
            <h1 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em', margin: '0 0 4px 0', fontFamily: 'Inter, sans-serif' }}>
              Welcome Back, {user?.name || 'Valued Member'}
            </h1>
            <p style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.82)', margin: 0, maxWidth: '650px', lineHeight: 1.45 }}>
              Central control center for your property listings, active service appointments, materials deliveries, and 256-bit bank-grade digital document vault.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <button
              onClick={loadUserData}
              disabled={refreshing}
              style={{
                background: 'rgba(255, 255, 255, 0.12)',
                color: '#FFFFFF',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '12px',
                padding: '10px 16px',
                fontSize: '13px',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} />
              <span>Sync Dashboard</span>
            </button>

            <button
              onClick={onOpenPostProperty}
              style={{
                background: 'linear-gradient(135deg, #0866F5 0%, #0653CA 100%)',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '30px',
                padding: '11px 22px',
                fontSize: '13px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                boxShadow: '0 6px 20px rgba(8, 102, 245, 0.35)',
                transition: 'all 0.15s ease'
              }}
            >
              <PlusCircle size={16} />
              <span>Post New Property</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── KPI Quick Metric Cards ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '28px' }}>
        <div style={metricCardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={metricLabelStyle}>My Listings</span>
            <Building2 size={18} color="#0866F5" />
          </div>
          <p style={metricValueStyle}>{myListings.length}</p>
          <p style={metricSubStyle}>
            <span style={{ color: '#059669', fontWeight: 700 }}>{approvedCount} Live</span> • <span style={{ color: '#D97706', fontWeight: 700 }}>{pendingCount} Moderation</span>
          </p>
        </div>

        <div style={metricCardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={metricLabelStyle}>Booked Services</span>
            <Wrench size={18} color="#0866F5" />
          </div>
          <p style={metricValueStyle}>{myBookings.length}</p>
          <p style={metricSubStyle}>Interiors, Cleaning &amp; AMC</p>
        </div>

        <div style={metricCardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={metricLabelStyle}>Material Orders</span>
            <Package size={18} color="#7C3AED" />
          </div>
          <p style={metricValueStyle}>{myOrders.length}</p>
          <p style={metricSubStyle}>Wholesale Supplies &amp; Deliveries</p>
        </div>

        <div style={metricCardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={metricLabelStyle}>Vault Documents</span>
            <Lock size={18} color="#059669" />
          </div>
          <p style={metricValueStyle}>4</p>
          <p style={metricSubStyle}>256-bit Encrypted Titles</p>
        </div>
      </div>

      {/* ── Navigation Tabs ── */}
      <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid #E2E8F0', paddingBottom: '12px', marginBottom: '28px', overflowX: 'auto' }}>
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
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                borderRadius: '12px',
                border: 'none',
                background: isActive ? '#0866F5' : '#F1F5F9',
                color: isActive ? '#FFFFFF' : '#475569',
                fontSize: '13px',
                fontWeight: isActive ? 700 : 600,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                whiteSpace: 'nowrap',
                fontFamily: 'Inter, sans-serif'
              }}
            >
              <Icon size={15} color={isActive ? '#FFFFFF' : '#64748B'} />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span style={{
                  padding: '2px 7px',
                  borderRadius: '10px',
                  fontSize: '11px',
                  fontWeight: 700,
                  background: isActive ? 'rgba(255, 255, 255, 0.2)' : '#CBD5E1',
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
        <div className="space-y-6">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', margin: '0 0 4px 0' }}>
                Your Real Estate Listings
              </h2>
              <p style={{ fontSize: '13px', color: '#64748B', margin: 0 }}>
                Properties posted by you. Newly submitted listings undergo title deed and RERA verification by the admin desk before going live.
              </p>
            </div>

            <button
              onClick={onOpenPostProperty}
              style={{
                background: '#0866F5',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '10px',
                padding: '10px 18px',
                fontSize: '13px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer'
              }}
            >
              <PlusCircle size={15} />
              <span>Post Another Property</span>
            </button>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#64748B' }}>
              <RefreshCw size={28} className="animate-spin mx-auto mb-3 text-[#0866F5]" />
              <p style={{ fontSize: '14px', fontWeight: 600 }}>Loading your listings...</p>
            </div>
          ) : myListings.length === 0 ? (
            /* Empty State */
            <div 
              style={{
                background: '#FFFFFF',
                border: '2px dashed #CBD5E1',
                borderRadius: '20px',
                padding: '60px 24px',
                textAlign: 'center',
                maxWidth: '650px',
                margin: '20px auto'
              }}
            >
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
                <Building2 size={32} color="#0866F5" />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A', marginBottom: '8px' }}>
                No Properties Listed Under Your Account
              </h3>
              <p style={{ fontSize: '13px', color: '#64748B', lineHeight: 1.6, marginBottom: '24px' }}>
                Looking to sell or rent out your flat, villa, commercial office, or land? Post your listing for free on Roof Ridge and reach thousands of verified buyers with zero brokerage.
              </p>
              <button
                onClick={onOpenPostProperty}
                style={{
                  background: 'linear-gradient(135deg, #0866F5 0%, #0653CA 100%)',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '30px',
                  padding: '12px 28px',
                  fontSize: '14px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 6px 20px rgba(8, 102, 245, 0.3)'
                }}
              >
                Post Free Property Now
              </button>
            </div>
          ) : (
            /* Property Cards Grid */
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '20px' }}>
              {myListings.map((prop) => {
                const status = prop.approvalStatus || 'pending';
                const isApproved = status === 'approved';
                const isRejected = status === 'rejected';
                const isPending = status === 'pending';

                return (
                  <div
                    key={prop._id || prop.id}
                    style={{
                      background: '#FFFFFF',
                      borderRadius: '18px',
                      border: '1px solid #E2E8F0',
                      overflow: 'hidden',
                      boxShadow: '0 4px 16px rgba(11, 31, 68, 0.05)',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'transform 0.15s ease, box-shadow 0.15s ease'
                    }}
                  >
                    {/* Image & Moderation Badge */}
                    <div style={{ position: 'relative', height: '190px', background: '#F1F5F9' }}>
                      <img
                        src={prop.image || prop.images?.[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'}
                        alt={prop.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />

                      {/* Status Tag */}
                      <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
                        {isApproved && (
                          <span style={{
                            background: '#059669',
                            color: '#FFFFFF',
                            fontSize: '11px',
                            fontWeight: 800,
                            padding: '4px 10px',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px',
                            boxShadow: '0 4px 12px rgba(5, 150, 105, 0.35)'
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
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px',
                            boxShadow: '0 4px 12px rgba(217, 119, 6, 0.35)'
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
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px',
                            boxShadow: '0 4px 12px rgba(220, 38, 38, 0.35)'
                          }}>
                            <AlertCircle size={13} /> Modification Required
                          </span>
                        )}
                      </div>

                      <div style={{ position: 'absolute', top: '12px', right: '12px' }}>
                        <span style={{
                          background: 'rgba(11, 31, 68, 0.85)',
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
                    </div>

                    {/* Card Content */}
                    <div style={{ padding: '18px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '6px' }}>
                        <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A' }}>
                          {prop.priceDisplay || (prop.price ? `₹ ${Number(prop.price).toLocaleString('en-IN')}` : 'Price on Call')}
                        </span>
                        <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>
                          {prop.bhk ? `${prop.bhk} BHK` : ''} {prop.propertyType || 'Residential'}
                        </span>
                      </div>

                      <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#1E293B', margin: '0 0 6px 0', lineHeight: 1.3 }}>
                        {prop.title}
                      </h4>

                      <p style={{ fontSize: '12px', color: '#64748B', display: 'flex', alignItems: 'center', gap: '4px', margin: '0 0 12px 0' }}>
                        <MapPin size={13} color="#94A3B8" />
                        <span>{prop.location?.locality || 'Prime Locality'}, {prop.location?.city || 'City'}</span>
                      </p>

                      {/* Moderation Explanation Note */}
                      {isPending && (
                        <div style={{
                          background: '#FFFBEB',
                          border: '1px solid #FDE68A',
                          borderRadius: '10px',
                          padding: '8px 12px',
                          fontSize: '11px',
                          color: '#92400E',
                          lineHeight: 1.4,
                          marginBottom: '14px'
                        }}>
                          <strong>Moderation in Progress:</strong> Our verification desk is reviewing your property documents &amp; location details. Once approved, it will be published across search filters.
                        </div>
                      )}

                      {isApproved && (
                        <div style={{
                          background: '#F0FDF4',
                          border: '1px solid #BBF7D0',
                          borderRadius: '10px',
                          padding: '8px 12px',
                          fontSize: '11px',
                          color: '#166534',
                          lineHeight: 1.4,
                          marginBottom: '14px',
                          display: 'flex',
                          justifyContent: 'space-between'
                        }}>
                          <span>Public Views: <strong>{prop.viewsCount || 14}</strong></span>
                          <span>Inquiries: <strong>{prop.inquiriesCount || 2}</strong></span>
                        </div>
                      )}

                      <div style={{ marginTop: 'auto', paddingTop: '12px', borderTop: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '11px', color: '#94A3B8' }}>
                          Posted: {prop.createdAt ? new Date(prop.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Recently'}
                        </span>

                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button
                            onClick={(e) => handleDeleteListing(prop._id || prop.id, e)}
                            style={{
                              background: '#FEE2E2',
                              color: '#DC2626',
                              border: 'none',
                              borderRadius: '8px',
                              padding: '6px 10px',
                              fontSize: '12px',
                              fontWeight: 600,
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}
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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', margin: '0 0 4px 0' }}>
                Service Appointments &amp; Material Orders
              </h2>
              <p style={{ fontSize: '13px', color: '#64748B', margin: 0 }}>
                Real-time tracking for Interior Consultations, Home Care Services, AMC Subscriptions and Wholesale Materials.
              </p>
            </div>

            {/* Filter buttons */}
            <div style={{ display: 'flex', gap: '6px' }}>
              {['all', 'services', 'materials'].map(f => (
                <button
                  key={f}
                  onClick={() => setSelectedBookingFilter(f)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '8px',
                    border: '1px solid #E2E8F0',
                    background: selectedBookingFilter === f ? '#0866F5' : '#FFFFFF',
                    color: selectedBookingFilter === f ? '#FFFFFF' : '#475569',
                    fontSize: '12px',
                    fontWeight: 700,
                    textTransform: 'capitalize',
                    cursor: 'pointer'
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#64748B' }}>
              <RefreshCw size={28} className="animate-spin mx-auto mb-3 text-[#0866F5]" />
              <p style={{ fontSize: '14px', fontWeight: 600 }}>Loading orders &amp; appointments...</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Service Appointments Section */}
              {(selectedBookingFilter === 'all' || selectedBookingFilter === 'services') && (
                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0F172A', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Wrench size={16} color="#0866F5" />
                    <span>Service Bookings ({myBookings.length})</span>
                  </h3>

                  {myBookings.length === 0 ? (
                    <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '36px', textAlign: 'center' }}>
                      <p style={{ fontSize: '13px', color: '#64748B', margin: '0 0 12px 0' }}>No service appointments scheduled yet.</p>
                      <button
                        onClick={() => onNavigate && onNavigate('interiors')}
                        style={{ background: '#0866F5', color: '#FFFFFF', border: 'none', borderRadius: '8px', padding: '8px 16px', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}
                      >
                        Explore Interior &amp; Maintenance Services
                      </button>
                    </div>
                  ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '16px' }}>
                      {myBookings.map((bkg) => (
                        <div
                          key={bkg._id || bkg.id}
                          style={{
                            background: '#FFFFFF',
                            border: '1px solid #E2E8F0',
                            borderRadius: '16px',
                            padding: '20px',
                            boxShadow: '0 2px 10px rgba(11, 31, 68, 0.04)'
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                            <div>
                              <span style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#0866F5' }}>
                                {bkg.serviceCategory || 'Service'}
                              </span>
                              <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A', margin: '2px 0 0 0' }}>
                                {bkg.serviceName}
                              </h4>
                            </div>

                            <span style={{
                              background: '#DEF7EC',
                              color: '#03543F',
                              fontSize: '11px',
                              fontWeight: 700,
                              padding: '3px 8px',
                              borderRadius: '6px',
                              textTransform: 'capitalize'
                            }}>
                              {bkg.status || 'Confirmed'}
                            </span>
                          </div>

                          <div style={{ background: '#F8FAFC', borderRadius: '10px', padding: '10px 12px', fontSize: '12px', color: '#475569', marginBottom: '12px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
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
                            <span style={{ fontWeight: 800, color: '#0F172A', fontSize: '13px' }}>
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
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0F172A', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Package size={16} color="#0866F5" />
                    <span>Materials Store Orders ({myOrders.length})</span>
                  </h3>

                  {myOrders.length === 0 ? (
                    <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '36px', textAlign: 'center' }}>
                      <p style={{ fontSize: '13px', color: '#64748B', margin: '0 0 12px 0' }}>No wholesale materials ordered yet.</p>
                      <button
                        onClick={() => onNavigate && onNavigate('materials')}
                        style={{ background: 'linear-gradient(135deg, #0866F5 0%, #0653CA 100%)', color: '#FFFFFF', border: 'none', borderRadius: '20px', padding: '9px 20px', fontSize: '12px', fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 12px rgba(8, 102, 245, 0.25)' }}
                      >
                        Browse Wholesale Cement, Steel &amp; Tiles
                      </button>
                    </div>
                  ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '16px' }}>
                      {myOrders.map((ord) => (
                        <div
                          key={ord._id || ord.id}
                          style={{
                            background: '#FFFFFF',
                            border: '1px solid #E2E8F0',
                            borderRadius: '16px',
                            padding: '20px',
                            boxShadow: '0 2px 10px rgba(11, 31, 68, 0.04)'
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                            <div>
                              <span style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#0866F5' }}>
                                Order {ord.orderNumber || `ORD-${(ord._id || '').substring(0, 6)}`}
                              </span>
                              <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A', margin: '2px 0 0 0' }}>
                                {ord.items?.[0]?.name || 'Construction Materials'} {ord.items?.length > 1 ? `+ ${ord.items.length - 1} more` : ''}
                              </h4>
                            </div>

                            <span style={{
                              background: '#FEF3C7',
                              color: '#92400E',
                              fontSize: '11px',
                              fontWeight: 700,
                              padding: '3px 8px',
                              borderRadius: '6px',
                              textTransform: 'capitalize'
                            }}>
                              {ord.status || 'Placed'}
                            </span>
                          </div>

                          <div style={{ background: '#F8FAFC', borderRadius: '10px', padding: '10px 12px', fontSize: '12px', color: '#475569', marginBottom: '12px' }}>
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
                            <span style={{ fontWeight: 800, color: '#0F172A', fontSize: '14px' }}>
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-[#0F172A] text-base font-heading">Encrypted Property Title Documents</h3>
                <p className="text-xs text-slate-500">Immutable cloud locker with multi-factor biometric authorization.</p>
              </div>
              <button 
                onClick={() => alert("Upload dialog initialized. Select PDF/Image from local device.")}
                className="bg-[#0866F5] hover:bg-[#0653CA] text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Upload size={14} />
                <span>Upload New Document</span>
              </button>
            </div>

            <div className="space-y-3">
              {documents.map((doc, idx) => (
                <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center justify-between shadow-xs hover:border-[#0866F5] transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 text-[#0866F5] flex items-center justify-center font-bold">
                      <FileText size={20} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-[#0F172A] text-xs font-heading">{doc.title}</h4>
                        {doc.verified && (
                          <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-0.5">
                            <CheckCircle2 size={10} /> Verified
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-400 block mt-0.5">{doc.type} • {doc.date} • {doc.size}</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => alert(`Downloading verified copy of ${doc.title}...`)}
                    className="p-2 text-slate-500 hover:text-[#0866F5] transition-colors cursor-pointer"
                    title="Download Document"
                  >
                    <Download size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#0866F5] to-[#0645B8] text-white p-6 rounded-2xl border border-blue-500 shadow-xs h-fit space-y-4">
            <div className="flex items-center gap-2">
              <Lock size={20} className="text-white" />
              <h4 className="font-bold text-white text-sm font-heading">256-Bit Bank-Grade Security</h4>
            </div>
            <p className="text-xs text-white opacity-95 leading-relaxed">
              Your property documents are stored in encrypted cloud vaults with biometric &amp; OTP authorization access only. Compliant with Indian IT Act 2000 &amp; RERA digital standards.
            </p>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════
          TAB 4: TAX & AMC REMINDERS
          ═══════════════════════════════════════════════ */}
      {activeTab === 'reminders' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs max-w-2xl">
          <h3 className="font-bold text-[#0F172A] text-base font-heading mb-1">Upcoming Dues &amp; Maintenance Reminders</h3>
          <p className="text-xs text-slate-500 mb-6">Automated SMS and email notifications 7 days prior to expiry.</p>

          <div className="space-y-3">
            {reminders.map((rem, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-slate-200 flex items-center justify-between hover:border-[#0866F5] transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#0866F5] flex items-center justify-center">
                    <Bell size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-[#0F172A]">{rem.title}</h4>
                    <span className="text-[11px] text-slate-500">Due: {rem.date} • {rem.amount}</span>
                  </div>
                </div>

                <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
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
        <div className="max-w-2xl bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-200">
            <div className="w-16 h-16 rounded-full bg-[#0866F5] text-white flex items-center justify-center font-extrabold text-2xl">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#0F172A]">{user?.name || 'Roof Ridge Member'}</h3>
              <p className="text-xs text-slate-500">{user?.phone ? `+91 ${user.phone}` : 'No phone attached'}</p>
              <div className="flex gap-2 mt-2">
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                  Aadhaar e-KYC Verified
                </span>
                <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded">
                  {user?.role || 'User'}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-slate-500 block mb-1">Account Role</span>
                <strong className="text-slate-800 text-sm capitalize">{user?.role || 'Property Owner / Buyer'}</strong>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-slate-500 block mb-1">Preferred City</span>
                <strong className="text-slate-800 text-sm">Mumbai</strong>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl">
              <span className="text-slate-500 block mb-1">Verification Status</span>
              <strong className="text-emerald-700 text-sm">100% Complete — Authorized for direct listings &amp; bookings</strong>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const metricCardStyle = {
  background: '#FFFFFF',
  borderRadius: '16px',
  border: '1px solid #E2E8F0',
  padding: '18px 20px',
  boxShadow: '0 2px 10px rgba(11, 31, 68, 0.04)',
};

const metricLabelStyle = {
  fontSize: '12px',
  fontWeight: 700,
  color: '#64748B',
  textTransform: 'uppercase',
  letterSpacing: '0.04em',
};

const metricValueStyle = {
  fontSize: '1.8rem',
  fontWeight: 800,
  color: '#0F172A',
  margin: '8px 0 2px 0',
  lineHeight: 1,
  fontFamily: 'Inter, sans-serif'
};

const metricSubStyle = {
  fontSize: '11px',
  color: '#94A3B8',
  margin: 0,
};
