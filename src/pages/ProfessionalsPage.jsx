import React, { useState } from 'react';
import { SKILLED_PROFESSIONALS } from '../data/mockData';
import { Search, Star, MapPin, CheckCircle, Phone, ArrowRight, Clock, Shield } from 'lucide-react';

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

  const filtered = SKILLED_PROFESSIONALS.filter(p => {
    if (category !== 'All' && !p.category?.toLowerCase().includes(category.toLowerCase())) return false;
    if (query && !p.name?.toLowerCase().includes(query.toLowerCase()) && !p.skills?.some(s => s.toLowerCase().includes(query.toLowerCase()))) return false;
    return true;
  });

  return (
    <div className="animate-fade" style={{ background: '#FFFFFF' }}>

      {/* ── HERO ── */}
      <div style={{ position: 'relative', background: '#0B192C', overflow: 'hidden', padding: '64px 0 52px' }}>
        <img src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1800&q=70" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.2 }} />
        <div className="rr-container" style={{ position: 'relative', zIndex: 2 }}>
          <p style={eyebrow}><span style={{ display: 'inline-block', width: '24px', height: '2px', background: 'rgba(255,255,255,0.3)' }} /> GPS On-Demand Skilled Workforce</p>
          <h1 style={heroH1}>Hire Verified Mistri, Labour<br />&amp; Trade Professionals in {selectedCity?.name || 'Your City'}</h1>
          <p style={heroSub}>Instant booking for civil mistris, shuttering workers, senior plumbers, electricians & tile finishers — background-verified, GPS-tracked, transparent daily rates.</p>
          <div style={{ display: 'flex', gap: '24px', marginTop: '28px', flexWrap: 'wrap' }}>
            {['Background Verified', 'GPS-Tracked Workers', 'Transparent Daily Rates', 'Digital Job Cards'].map(t => (
              <div key={t} style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                <CheckCircle size={14} style={{ color: 'rgba(255,255,255,0.55)' }} />
                <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.65)', fontFamily: 'Manrope, sans-serif' }}>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FILTER BAR ── */}
      <div style={{ background: '#F8F7F4', borderBottom: '1px solid #E4E1DA', padding: '16px 0' }}>
        <div className="rr-container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', gap: '4px' }}>
              {CATEGORIES.map(cat => (
                <button key={cat} onClick={() => setCategory(cat)}
                  style={{ padding: '8px 16px', border: 'none', borderRadius: '2px', fontSize: '0.78rem', fontWeight: category === cat ? 700 : 400, cursor: 'pointer', background: category === cat ? '#0B192C' : 'white', color: category === cat ? 'white' : '#6B6B6B', border: category === cat ? 'none' : '1.5px solid #E4E1DA', fontFamily: 'Manrope, sans-serif', transition: 'all 0.15s', whiteSpace: 'nowrap' }}>
                  {cat}
                </button>
              ))}
            </div>
            <div style={{ position: 'relative', minWidth: '280px' }}>
              <Search size={13} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
              <input type="text" placeholder="Search plumber, electrician, carpenter…" value={query} onChange={e => setQuery(e.target.value)}
                style={{ width: '100%', height: '40px', paddingLeft: '34px', paddingRight: '12px', border: '1.5px solid #E4E1DA', borderRadius: '2px', fontSize: '0.82rem', color: '#2C2C2C', background: 'white', outline: 'none', fontFamily: 'Manrope, sans-serif', boxSizing: 'border-box' }} />
            </div>
          </div>
        </div>
      </div>

      {/* ── PROFESSIONALS GRID ── */}
      <section className="rr-section">
        <div className="rr-container">
          <p style={{ fontSize: '0.82rem', color: '#6B6B6B', fontFamily: 'Manrope, sans-serif', marginBottom: '20px' }}>
            Showing <strong style={{ color: '#0B192C' }}>{filtered.length}</strong> verified professionals in {selectedCity?.name || 'your city'}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px', background: '#E4E1DA', border: '1px solid #E4E1DA', borderRadius: '2px', overflow: 'hidden' }}>
            {filtered.map(pro => (
              <div key={pro.id} style={{ background: 'white', display: 'flex', flexDirection: 'column', transition: 'background 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.background = '#FAFAF8'}
                onMouseLeave={e => e.currentTarget.style.background = 'white'}>

                {/* Top: photo + rating */}
                <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden', background: '#F8F7F4' }}>
                  <img src={pro.image} alt={pro.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'} />
                  <span style={{ position: 'absolute', top: '10px', left: '10px', background: '#0B192C', color: 'white', fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '4px 8px', borderRadius: '2px', fontFamily: 'Manrope, sans-serif' }}>{pro.category || 'Professional'}</span>
                  {pro.available && <span style={{ position: 'absolute', bottom: '10px', right: '10px', background: 'rgba(255,255,255,0.92)', fontSize: '0.68rem', fontWeight: 700, color: '#16A34A', padding: '3px 8px', borderRadius: '2px', fontFamily: 'Manrope, sans-serif', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#16A34A', display: 'inline-block' }} /> Available Today
                  </span>}
                </div>

                {/* Body */}
                <div style={{ padding: '18px 18px 20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <h3 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#0B192C', fontFamily: 'Manrope, sans-serif', lineHeight: 1.3 }}>{pro.name}</h3>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '0.78rem', fontWeight: 700, color: '#0B192C', fontFamily: 'Manrope, sans-serif', flexShrink: 0, marginLeft: '8px' }}>
                      <Star size={11} fill="#0B192C" color="#0B192C" />{pro.rating}
                    </span>
                  </div>

                  <p style={{ fontSize: '0.72rem', color: '#9CA3AF', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '10px', fontFamily: 'Manrope, sans-serif' }}>
                    <MapPin size={11} />{pro.city || selectedCity?.name} · {pro.experience}
                  </p>

                  {/* Skills */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '14px' }}>
                    {(pro.skills || []).slice(0, 3).map(s => (
                      <span key={s} style={{ fontSize: '0.68rem', fontWeight: 600, color: '#6B6B6B', background: '#F8F7F4', border: '1px solid #E4E1DA', padding: '3px 8px', borderRadius: '2px', fontFamily: 'Manrope, sans-serif' }}>{s}</span>
                    ))}
                  </div>

                  <div style={{ borderTop: '1px solid #F0EDE7', paddingTop: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
                    <div>
                      <p style={{ fontSize: '1rem', fontWeight: 800, color: '#0B192C', fontFamily: 'Manrope, sans-serif', lineHeight: 1 }}>{pro.dailyRate || '₹ 850 / day'}</p>
                      <p style={{ fontSize: '0.68rem', color: '#9CA3AF', fontFamily: 'Manrope, sans-serif' }}>{pro.jobsDone || '45'}+ jobs done</p>
                    </div>
                    {booked === pro.id ? (
                      <span style={{ fontSize: '0.74rem', fontWeight: 700, color: '#16A34A', fontFamily: 'Manrope, sans-serif' }}>✓ Booking Sent!</span>
                    ) : (
                      <button onClick={() => setBooked(pro.id)}
                        style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.74rem', fontWeight: 700, color: 'white', background: '#0B192C', border: 'none', borderRadius: '2px', padding: '8px 14px', cursor: 'pointer', fontFamily: 'Manrope, sans-serif', transition: 'background 0.2s' }}
                        onMouseEnter={e => e.currentTarget.style.background = '#162B48'}
                        onMouseLeave={e => e.currentTarget.style.background = '#0B192C'}>
                        <Phone size={12} /> Book Now
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
      <section style={{ background: '#F8F7F4', borderTop: '1px solid #E4E1DA', padding: '72px 0' }}>
        <div className="rr-container">
          <div style={{ marginBottom: '32px' }}>
            <p className="section-label">How It Works</p>
            <h2 className="section-h2">Book a Professional in 3 Minutes</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px', background: '#E4E1DA', border: '1px solid #E4E1DA', borderRadius: '2px', overflow: 'hidden' }}>
            {HOW_IT_WORKS.map((h, i) => (
              <div key={i} style={{ background: 'white', padding: '28px 24px' }}>
                <p style={{ fontSize: '2rem', fontWeight: 800, color: '#E4E1DA', letterSpacing: '-0.04em', fontFamily: 'Manrope, sans-serif', marginBottom: '12px' }}>{h.step}</p>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0B192C', marginBottom: '8px', fontFamily: 'Manrope, sans-serif' }}>{h.title}</h3>
                <p style={{ fontSize: '0.8rem', color: '#6B6B6B', lineHeight: 1.65, fontFamily: 'Manrope, sans-serif' }}>{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

const eyebrow = { fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', fontFamily: 'Manrope, sans-serif' };
const heroH1 = { fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 800, color: 'white', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '14px', maxWidth: '700px' };
const heroSub = { fontSize: '0.92rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.65, maxWidth: '520px', fontFamily: 'Manrope, sans-serif' };
