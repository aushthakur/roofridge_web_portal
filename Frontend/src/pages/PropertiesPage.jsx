import React, { useState } from 'react';
import { PROPERTIES } from '../data/mockData';
import { Search, MapPin, Heart, Star, ArrowRight, SlidersHorizontal, Grid, List, ShieldCheck, CheckCircle, X } from 'lucide-react';
import { useResponsive } from '../hooks/useResponsive';

const FILTERS_BUY = ['All Types', 'Apartment', 'Villa', 'Penthouse', 'Plot'];
const FILTERS_RENT = ['All Types', 'Furnished', 'Semi Furnished', 'Bare Shell', 'PG'];
const BHK_OPTIONS = ['Any', '1 BHK', '2 BHK', '3 BHK', '4 BHK+'];

const TRUST = [
  { icon: ShieldCheck, label: '100-Point Physical Verification', sub: 'Every listing inspected by our team' },
  { icon: CheckCircle, label: '0% Brokerage Guarantee', sub: 'Direct owner connect — no middleman' },
  { icon: ShieldCheck, label: 'RERA Registered Listings', sub: 'Legal title audit on all properties' },
];

export default function PropertiesPage({ mode = 'buy', selectedCity, onSelectProperty, wishlist, onToggleWishlist }) {
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [bhk, setBhk] = useState('Any');
  const [maxBudget, setMaxBudget] = useState(500);
  const [query, setQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [reraOnly, setReraOnly] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const { isMobile } = useResponsive();

  const isRent = mode === 'rent';
  const filters = isRent ? FILTERS_RENT : FILTERS_BUY;

  const filtered = PROPERTIES.filter(item => {
    if (query && !item.title.toLowerCase().includes(query.toLowerCase()) && !item.location.toLowerCase().includes(query.toLowerCase())) return false;
    if (reraOnly && item.tagType !== 'rera') return false;
    return true;
  });

  const pageTitle = isRent
    ? `Rental Homes & Apartments — ${selectedCity?.name || 'India'}`
    : `Buy Premium Homes — ${selectedCity?.name || 'India'}`;

  const sliderPct = ((maxBudget - 50) / (1000 - 50)) * 100;

  return (
    <div className="animate-fade" style={{ background: '#FFFFFF', minHeight: '80vh' }}>

      {/* ── PAGE HERO BANNER ── */}
      <div style={{ position: 'relative', background: '#0B192C', overflow: 'hidden', padding: '64px 0 52px' }}>
        <img
          src={isRent
            ? 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1800&q=70'
            : 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1800&q=70'}
          alt=""
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.18 }}
        />
        <div className="rr-container" style={{ position: 'relative', zIndex: 2 }}>
          <p style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', fontFamily: 'Manrope, sans-serif' }}>
            <span style={{ display: 'inline-block', width: '24px', height: '2px', background: 'rgba(255,255,255,0.3)' }} />
            {isRent ? '0% Brokerage Verified Rentals' : 'RERA Verified Properties'}
          </p>
          <h1 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', fontWeight: 800, color: 'white', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '14px', maxWidth: '700px' }}>
            {pageTitle}
          </h1>
          <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.65, maxWidth: '520px', fontFamily: 'Manrope, sans-serif' }}>
            {filtered.length * 240}+ physically audited {isRent ? 'rental homes' : 'apartments, villas & penthouses'} with 0% brokerage and instant digital registration.
          </p>

          {/* Trust micro badges */}
          <div style={{ display: 'flex', gap: '24px', marginTop: '28px', flexWrap: 'wrap' }}>
            {TRUST.map((t, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <t.icon size={14} style={{ color: 'rgba(255,255,255,0.55)' }} />
                <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.65)', fontFamily: 'Manrope, sans-serif', fontWeight: 500 }}>{t.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CONTENT AREA ── */}
      <div className="rr-container" style={{ paddingTop: isMobile ? '24px' : '48px', paddingBottom: '80px' }}>

        {/* Mobile filter toggle */}
        {isMobile && (
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', alignItems: 'center' }}>
            <button onClick={() => setShowMobileFilters(true)}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#0B192C', color: 'white', border: 'none', borderRadius: '2px', padding: '10px 16px', fontSize: '0.78rem', fontWeight: 700, fontFamily: 'Manrope, sans-serif', cursor: 'pointer' }}>
              <SlidersHorizontal size={14} /> Filter Results
            </button>
            <span style={{ fontSize: '0.78rem', color: '#6B6B6B', fontFamily: 'Manrope, sans-serif' }}>{filtered.length} results</span>
          </div>
        )}

        {/* Mobile filter drawer */}
        {isMobile && showMobileFilters && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 800, background: 'rgba(0,0,0,0.5)' }} onClick={() => setShowMobileFilters(false)}>
            <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '85vw', maxWidth: '340px', background: 'white', overflowY: 'auto', padding: '20px' }} onClick={e => e.stopPropagation()}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <span style={{ fontWeight: 800, color: '#0B192C', fontFamily: 'Manrope, sans-serif' }}>Filter Results</span>
                <button onClick={() => setShowMobileFilters(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6B6B6B' }}><X size={18} /></button>
              </div>
              {/* filter content inserted below via sidebar */}
            </div>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '280px 1fr', gap: isMobile ? '16px' : '32px', alignItems: 'start' }}>

          {/* ── SIDEBAR (hidden on mobile) ── */}
          {!isMobile && <div style={{ position: 'sticky', top: '120px' }}>
            <div style={{ background: 'white', border: '1px solid #E4E1DA', borderRadius: '2px', overflow: 'hidden' }}>

              {/* Sidebar header */}
              <div style={{ padding: '18px 20px', borderBottom: '1px solid #E4E1DA', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <SlidersHorizontal size={15} color="#0B192C" />
                  <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#0B192C', fontFamily: 'Manrope, sans-serif' }}>Filter Results</span>
                </div>
                <button onClick={() => { setTypeFilter('All Types'); setBhk('Any'); setMaxBudget(500); setQuery(''); setReraOnly(false); }}
                  style={{ fontSize: '0.72rem', fontWeight: 700, color: '#0B192C', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Manrope, sans-serif', textDecoration: 'underline' }}>
                  Reset
                </button>
              </div>

              <div style={{ padding: '20px' }}>
                {/* Search */}
                <div style={{ marginBottom: '24px' }}>
                  <label style={filterLabel}>Locality / Landmark</label>
                  <div style={{ position: 'relative' }}>
                    <Search size={13} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
                    <input
                      type="text"
                      placeholder="Golf Course Rd, Whitefield…"
                      value={query}
                      onChange={e => setQuery(e.target.value)}
                      style={{ ...inputStyle, paddingLeft: '34px' }}
                    />
                  </div>
                </div>

                {/* Type */}
                <div style={{ marginBottom: '24px' }}>
                  <label style={filterLabel}>Property Type</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {filters.map(f => (
                      <button key={f} onClick={() => setTypeFilter(f)}
                        style={{
                          padding: '9px 12px', border: 'none', borderRadius: '2px', textAlign: 'left',
                          fontSize: '0.8rem', fontWeight: typeFilter === f ? 700 : 400, cursor: 'pointer',
                          background: typeFilter === f ? '#0B192C' : 'transparent',
                          color: typeFilter === f ? 'white' : '#444',
                          fontFamily: 'Manrope, sans-serif', transition: 'all 0.15s',
                        }}
                      >{f}</button>
                    ))}
                  </div>
                </div>

                {/* BHK */}
                <div style={{ marginBottom: '24px' }}>
                  <label style={filterLabel}>Bedrooms (BHK)</label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '5px' }}>
                    {BHK_OPTIONS.map(b => (
                      <button key={b} onClick={() => setBhk(b)}
                        style={{
                          padding: '8px 4px', borderRadius: '2px', fontSize: '0.72rem', fontWeight: 700, cursor: 'pointer',
                          border: bhk === b ? '1.5px solid #0B192C' : '1.5px solid #E4E1DA',
                          background: bhk === b ? '#0B192C' : 'white',
                          color: bhk === b ? 'white' : '#444',
                          fontFamily: 'Manrope, sans-serif', transition: 'all 0.15s',
                        }}>{b}</button>
                    ))}
                  </div>
                </div>

                {/* Budget Slider */}
                <div style={{ marginBottom: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <label style={filterLabel}>Max Budget</label>
                    <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#0B192C', fontFamily: 'Manrope, sans-serif' }}>₹ {(maxBudget / 100).toFixed(1)} Cr</span>
                  </div>
                  <input type="range" min={50} max={1000} step={50} value={maxBudget} onChange={e => setMaxBudget(Number(e.target.value))}
                    style={{ width: '100%', appearance: 'none', height: '3px', borderRadius: '2px', outline: 'none', cursor: 'pointer', background: `linear-gradient(to right, #0B192C ${sliderPct}%, #DDD8D0 ${sliderPct}%)` }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
                    <span style={{ fontSize: '0.65rem', color: '#9CA3AF', fontFamily: 'Manrope, sans-serif' }}>50L</span>
                    <span style={{ fontSize: '0.65rem', color: '#9CA3AF', fontFamily: 'Manrope, sans-serif' }}>10 Cr</span>
                  </div>
                </div>

                {/* RERA toggle */}
                <div style={{ borderTop: '1px solid #E4E1DA', paddingTop: '16px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                    <input type="checkbox" checked={reraOnly} onChange={e => setReraOnly(e.target.checked)}
                      style={{ width: '16px', height: '16px', accentColor: '#0B192C', cursor: 'pointer' }} />
                    <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#0B192C', fontFamily: 'Manrope, sans-serif' }}>RERA Verified Only</span>
                  </label>
                </div>
              </div>
            </div>
          </div>}

          {/* ── PROPERTY GRID ── */}
          <div>
            {/* Controls bar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', padding: '14px 18px', background: 'white', border: '1px solid #E4E1DA', borderRadius: '2px' }}>
              <p style={{ fontSize: '0.82rem', color: '#6B6B6B', fontFamily: 'Manrope, sans-serif' }}>
                Showing <strong style={{ color: '#0B192C' }}>{filtered.length * 60}+</strong> properties in {selectedCity?.name}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ display: 'flex', gap: '3px', background: '#F8F7F4', padding: '3px', borderRadius: '2px' }}>
                  {[{ v: 'grid', I: Grid }, { v: 'list', I: List }].map(({ v, I }) => (
                    <button key={v} onClick={() => setViewMode(v)}
                      style={{ padding: '6px 10px', border: 'none', borderRadius: '2px', cursor: 'pointer', background: viewMode === v ? '#0B192C' : 'transparent', color: viewMode === v ? 'white' : '#888', transition: 'all 0.15s' }}>
                      <I size={15} />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : (viewMode === 'grid' ? 'repeat(3, 1fr)' : '1fr'), gap: '1px', background: '#E4E1DA', border: '1px solid #E4E1DA', borderRadius: '2px', overflow: 'hidden' }}>
              {filtered.map(item => {
                const saved = wishlist?.includes(item.id);
                return (
                  <div key={item.id} style={{ background: 'white', display: 'flex', flexDirection: viewMode === 'list' ? 'row' : 'column', transition: 'background 0.15s', cursor: 'pointer' }}
                    onMouseEnter={e => e.currentTarget.style.background = '#FAFAF8'}
                    onMouseLeave={e => e.currentTarget.style.background = 'white'}>

                    <div style={{ position: 'relative', ...(viewMode === 'list' ? { width: '240px', flexShrink: 0, height: '180px' } : { aspectRatio: '4/3' }), overflow: 'hidden', background: '#F8F7F4' }}>
                      <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                        onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04)'; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }} />
                      <span style={{ position: 'absolute', top: '10px', left: '10px', background: '#0B192C', color: 'white', fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '4px 8px', borderRadius: '2px', fontFamily: 'Manrope, sans-serif' }}>{item.badge}</span>
                      <button onClick={e => { e.stopPropagation(); onToggleWishlist?.(item.id); }}
                        style={{ position: 'absolute', top: '10px', right: '10px', width: '30px', height: '30px', background: 'rgba(255,255,255,0.92)', border: '1px solid rgba(228,225,218,0.8)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: saved ? '#EF4444' : '#888' }}>
                        <Heart size={13} fill={saved ? '#EF4444' : 'none'} stroke={saved ? '#EF4444' : 'currentColor'} />
                      </button>
                    </div>

                    <div style={{ padding: '18px 18px 20px', flex: 1 }}>
                      <p style={{ fontSize: '0.72rem', color: '#9CA3AF', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '6px', fontFamily: 'Manrope, sans-serif' }}>
                        <MapPin size={11} />{item.location}
                      </p>
                      <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0B192C', lineHeight: 1.3, marginBottom: '8px', fontFamily: 'Manrope, sans-serif' }}>{item.title}</h3>
                      <p style={{ fontSize: '0.74rem', color: '#6B6B6B', marginBottom: '14px', paddingBottom: '12px', borderBottom: '1px solid #F0EDE7', fontFamily: 'Manrope, sans-serif' }}>{item.specs}</p>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div>
                          <p style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0B192C', letterSpacing: '-0.02em', fontFamily: 'Manrope, sans-serif', lineHeight: 1 }}>{item.price}</p>
                          {item.originalPrice && <p style={{ fontSize: '0.7rem', color: '#9CA3AF', textDecoration: 'line-through', fontFamily: 'Manrope, sans-serif' }}>{item.originalPrice}</p>}
                        </div>
                        <button onClick={() => onSelectProperty(item)}
                          style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.74rem', fontWeight: 700, color: '#0B192C', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Manrope, sans-serif', borderBottom: '1.5px solid #0B192C', paddingBottom: '1px' }}>
                          View Details <ArrowRight size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <style>{`
        input[type='range']::-webkit-slider-thumb { -webkit-appearance: none; width: 16px; height: 16px; border-radius: 50%; background: #0B192C; border: 2px solid white; box-shadow: 0 0 0 1.5px #0B192C; cursor: pointer; }
      `}</style>
    </div>
  );
}

const filterLabel = { fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6B6B6B', fontFamily: 'Manrope, sans-serif', display: 'block', marginBottom: '10px' };
const inputStyle = { width: '100%', height: '40px', padding: '0 12px', border: '1.5px solid #E4E1DA', borderRadius: '2px', fontSize: '0.82rem', color: '#2C2C2C', background: 'white', outline: 'none', fontFamily: 'Manrope, sans-serif', boxSizing: 'border-box' };
