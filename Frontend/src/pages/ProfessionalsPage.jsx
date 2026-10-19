import React, { useState } from 'react';
import { SKILLED_PROFESSIONALS } from '../data/mockData';
import { Search, Star, MapPin, CheckCircle, Phone, ArrowRight, Clock, Shield } from 'lucide-react';
import { useResponsive, useCols } from '../hooks/useResponsive';

const CATEGORIES = ['All', 'Construction & Civil Work', 'Home Maintenance', 'Home Finishing'];

const HOW_IT_WORKS = [
  { step: '01', title: 'Search & Filter', desc: 'Browse verified professionals by trade, city and availability. See live ratings, daily rates and background check status.' },
  { step: '02', title: 'Book Instantly', desc: 'Pick a date & time slot. The professional is confirmed within 30 minutes with a booking reference number.' },
  { step: '03', title: 'Track & Manage', desc: 'Get live GPS tracking, photo updates from site, and a digital job card with daily progress reports.' },
  { step: '04', title: 'Pay & Rate', desc: 'Pay via UPI or invoice after work completion. Rate the professional — your review is published to the platform.' },
];

export default function ProfessionalsPage({ selectedCity }) {
  const [category, setCategory] = useState('All');
  const [query, setQuery] = useState('');
  const [booked, setBooked] = useState(null);

  const { isMobile } = useResponsive();
  const proCols = useCols({ desktop: 'repeat(4, 1fr)', tablet: 'repeat(2, 1fr)', mobile: '1fr' });
  const stepCols = useCols({ desktop: 'repeat(4, 1fr)', tablet: 'repeat(2, 1fr)', mobile: '1fr' });

  const filtered = SKILLED_PROFESSIONALS.filter(p => {
    if (category !== 'All' && !p.category?.toLowerCase().includes(category.toLowerCase())) return false;
    if (query && !p.name?.toLowerCase().includes(query.toLowerCase()) && !p.skills?.some(s => s.toLowerCase().includes(query.toLowerCase()))) return false;
    return true;
  });

  return (
    <div className="animate-fade" style={{ background: '#FFFFFF', fontFamily: 'var(--font-body)' }}>

      {/* ── HERO ── */}
      <div style={{ position: 'relative', background: 'linear-gradient(135deg, #0866F5 0%, #0645B8 100%)', overflow: 'hidden', padding: isMobile ? '18px 0 16px' : '24px 0 20px' }}>
        <img
          src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1800&q=70"
          alt="Mistri Workforce"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.16 }}
        />
        <div className="rr-container" style={{ position: 'relative', zIndex: 2, padding: isMobile ? '0 16px' : undefined }}>
          <p style={eyebrow}>
            <span style={{ display: 'inline-block', width: '16px', height: '2px', background: '#38BDF8' }} />
            GPS On-Demand Skilled Workforce
          </p>
          <h1 style={heroH1}>
            Hire Verified Mistri, Labour &amp; Trade Professionals in {selectedCity?.name || 'Your City'}
          </h1>
          <p style={heroSub}>
            Instant booking for civil mistris, shuttering workers, senior plumbers, electricians &amp; tile finishers — background-verified, GPS-tracked, transparent daily rates.
          </p>
          <div style={{ display: 'flex', gap: isMobile ? '10px' : '18px', marginTop: '12px', flexWrap: 'wrap' }}>
            {['Background Verified', 'GPS-Tracked Workers', 'Transparent Daily Rates', 'Digital Job Cards'].map(t => (
              <div key={t} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle size={13} style={{ color: '#38BDF8' }} />
                <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.85)' }}>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FILTER BAR ── */}
      <div style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', padding: '16px 0' }}>
        <div className="rr-container" style={{ padding: isMobile ? '0 16px' : undefined }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', maxWidth: '100%', paddingBottom: '4px' }}>
              {CATEGORIES.map(cat => {
                const isActive = category === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    style={{
                      padding: '8px 18px',
                      borderRadius: '30px',
                      fontSize: '0.82rem',
                      fontWeight: isActive ? 700 : 500,
                      cursor: 'pointer',
                      background: isActive ? '#0866F5' : '#FFFFFF',
                      color: isActive ? '#FFFFFF' : '#475569',
                      border: isActive ? '1.5px solid #0866F5' : '1.5px solid #E2E8F0',
                      transition: 'all 0.15s',
                      whiteSpace: 'nowrap',
                      boxShadow: isActive ? '0 4px 12px rgba(8, 102, 245, 0.25)' : 'none',
                    }}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
            <div style={{ position: 'relative', width: isMobile ? '100%' : '300px' }}>
              <Search size={15} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
              <input
                type="text"
                placeholder="Search plumber, electrician, mistri…"
                value={query}
                onChange={e => setQuery(e.target.value)}
                style={{
                  width: '100%',
                  height: '42px',
                  paddingLeft: '38px',
                  paddingRight: '14px',
                  border: '1.5px solid #E2E8F0',
                  borderRadius: '30px',
                  fontSize: '0.85rem',
                  color: '#0F172A',
                  background: '#FFFFFF',
                  outline: 'none',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.15s',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── PROFESSIONALS GRID ── */}
      <section className="rr-section" style={{ padding: isMobile ? '36px 0' : '56px 0' }}>
        <div className="rr-container" style={{ padding: isMobile ? '0 16px' : undefined }}>
          <p style={{ fontSize: '0.88rem', color: '#64748B', marginBottom: '24px' }}>
            Showing <strong style={{ color: '#0F172A' }}>{filtered.length}</strong> verified professionals in {selectedCity?.name || 'your city'}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: proCols, gap: '20px' }}>
            {filtered.map(pro => (
              <div
                key={pro.id}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '18px',
                  border: '1.5px solid #E2E8F0',
                  boxShadow: '0 4px 20px rgba(11, 31, 68, 0.05)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 12px 28px rgba(11, 31, 68, 0.1)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(11, 31, 68, 0.05)';
                }}
              >
                {/* Top: photo + rating */}
                <div style={{ position: 'relative', aspectRatio: '16/10', overflow: 'hidden', background: '#F1F5F9' }}>
                  <img
                    src={pro.image}
                    alt={pro.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <span
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      background: 'rgba(11, 31, 68, 0.88)',
                      backdropFilter: 'blur(4px)',
                      color: 'white',
                      fontSize: '0.65rem',
                      fontWeight: 800,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      padding: '4px 10px',
                      borderRadius: '20px',
                    }}
                  >
                    {pro.category || 'Professional'}
                  </span>
                  {pro.available && (
                    <span
                      style={{
                        position: 'absolute',
                        bottom: '12px',
                        right: '12px',
                        background: 'rgba(255, 255, 255, 0.95)',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        color: '#16A34A',
                        padding: '4px 10px',
                        borderRadius: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
                      }}
                    >
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#16A34A', display: 'inline-block' }} />
                      Available Today
                    </span>
                  )}
                </div>

                {/* Body */}
                <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0F172A', lineHeight: 1.3 }}>{pro.name}</h3>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '0.82rem', fontWeight: 800, color: '#0F172A', flexShrink: 0, marginLeft: '8px' }}>
                      <Star size={13} fill="#EAB308" color="#EAB308" /> {pro.rating}
                    </span>
                  </div>

                  <p style={{ fontSize: '0.78rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '12px' }}>
                    <MapPin size={12} color="#0866F5" /> {pro.city || selectedCity?.name} · {pro.experience}
                  </p>

                  {/* Skills */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                    {(pro.skills || []).slice(0, 3).map(s => (
                      <span
                        key={s}
                        style={{
                          fontSize: '0.7rem',
                          fontWeight: 600,
                          color: '#0866F5',
                          background: '#EEF5FF',
                          padding: '3px 10px',
                          borderRadius: '12px',
                        }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
                    <div>
                      <p style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A', lineHeight: 1 }}>{pro.dailyRate || '₹ 850 / day'}</p>
                      <p style={{ fontSize: '0.72rem', color: '#94A3B8', marginTop: '3px' }}>{pro.jobsDone || '45'}+ jobs done</p>
                    </div>
                    {booked === pro.id ? (
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#16A34A', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <CheckCircle size={14} /> Confirmed!
                      </span>
                    ) : (
                      <button
                        onClick={() => setBooked(pro.id)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          color: '#FFFFFF',
                          background: 'linear-gradient(135deg, #0866F5 0%, #0653CA 100%)',
                          border: 'none',
                          borderRadius: '20px',
                          padding: '8px 16px',
                          cursor: 'pointer',
                          boxShadow: '0 4px 12px rgba(8, 102, 245, 0.2)',
                          transition: 'transform 0.15s, box-shadow 0.15s',
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.transform = 'scale(1.03)';
                          e.currentTarget.style.boxShadow = '0 6px 16px rgba(8, 102, 245, 0.3)';
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.transform = 'scale(1)';
                          e.currentTarget.style.boxShadow = '0 4px 12px rgba(8, 102, 245, 0.2)';
                        }}
                      >
                        <Phone size={13} /> Book Now
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ background: '#F8FAFC', borderTop: '1px solid #E2E8F0', padding: isMobile ? '48px 0' : '72px 0' }}>
        <div className="rr-container" style={{ padding: isMobile ? '0 16px' : undefined }}>
          <div style={{ marginBottom: '36px', textAlign: isMobile ? 'left' : 'center' }}>
            <p style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#0866F5', marginBottom: '8px' }}>
              HOW IT WORKS
            </p>
            <h2 style={{ fontSize: isMobile ? '1.5rem' : '2rem', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em' }}>
              Book a Professional in 3 Minutes
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: stepCols, gap: '20px' }}>
            {HOW_IT_WORKS.map((h, i) => (
              <div
                key={i}
                style={{
                  background: '#FFFFFF',
                  padding: '30px 24px',
                  borderRadius: '18px',
                  border: '1.5px solid #E2E8F0',
                  boxShadow: '0 4px 16px rgba(11, 31, 68, 0.04)',
                }}
              >
                <p style={{ fontSize: '2rem', fontWeight: 800, color: '#3B82F6', opacity: 0.35, letterSpacing: '-0.04em', marginBottom: '12px', lineHeight: 1 }}>{h.step}</p>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0F172A', marginBottom: '8px' }}>{h.title}</h3>
                <p style={{ fontSize: '0.84rem', color: '#64748B', lineHeight: 1.65 }}>{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

const eyebrow = {
  fontSize: '0.68rem',
  fontWeight: 800,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: '#38BDF8',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  marginBottom: '6px',
};
const heroH1 = {
  fontSize: 'clamp(1.35rem, 2.2vw, 1.75rem)',
  fontWeight: 800,
  color: '#FFFFFF',
  letterSpacing: '-0.02em',
  lineHeight: 1.2,
  marginBottom: '6px',
  maxWidth: '740px',
};
const heroSub = {
  fontSize: '0.84rem',
  color: 'rgba(255,255,255,0.85)',
  lineHeight: 1.5,
  maxWidth: '620px',
};
