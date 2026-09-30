import React, { useState } from 'react';
import { ArrowRight, CheckCircle, HardHat, Compass, MapPin, Shield, Zap } from 'lucide-react';

const CONTRACTORS = [
  { id: 'c1', name: 'Apex Structural Civil Engineering & Builders', type: 'Turnkey Civil Construction', projects: '45+ Luxury Homes', rating: 4.95, rate: '₹ 1,650 / sq.ft', image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=800&q=80', speciality: 'Earthquake-resistant framing, lenter shuttering, slab casting', cities: 'Delhi NCR · Gurugram · Faridabad', warranty: '5-Year Civil Warranty' },
  { id: 'c2', name: 'Studio ArchForm Architects & Structural Designers', type: 'Architectural Maps & Sanctions', projects: '120+ Sanctioned Maps', rating: 4.88, rate: '₹ 35 / sq.ft', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80', speciality: '3D elevation renders, municipal sanction, vastu compliance', cities: 'Mumbai · Pune · Bengaluru', warranty: 'Structural Certification' },
  { id: 'c3', name: 'GreenBuild Eco Construction Group', type: 'Eco & Sustainable Construction', projects: '28+ Green Homes', rating: 4.91, rate: '₹ 1,850 / sq.ft', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80', speciality: 'IGBC Green certification, rainwater harvesting, solar integration', cities: 'Bengaluru · Hyderabad · Chennai', warranty: 'IGBC Green Certification' },
];

const MILESTONES = [
  { phase: 'Phase 1', name: 'Foundation & Plinth', duration: '3–4 weeks', items: ['Soil testing & boring report', 'PCC & RCC foundation layout', 'Anti-termite treatment', 'Plinth beam & flooring fill'] },
  { phase: 'Phase 2', name: 'Structural Framework', duration: '5–7 weeks', items: ['Columns & slab shuttering', 'Lenter concrete pouring', 'TMT rebar steel binding', 'Brick wall construction'] },
  { phase: 'Phase 3', name: 'Plastering & MEP', duration: '3–4 weeks', items: ['Internal & external plaster', 'Electrical conduit & wiring', 'Plumbing & drainage', 'CCTV milestone photos'] },
  { phase: 'Phase 4', name: 'Finishing & Handover', duration: '3–5 weeks', items: ['Flooring & tile work', 'Painting & wood polish', 'Door & window frames', 'Final inspection & handover'] },
];

const QUALITY_OPTIONS = ['Standard', 'Premium', 'Luxury'];
const RATES = { Standard: 1350, Premium: 1650, Luxury: 2200 };

export default function ConstructionPage({ onOpenAuth }) {
  const [plotArea, setPlotArea] = useState(1800);
  const [floors, setFloors] = useState(2);
  const [quality, setQuality] = useState('Premium');
  const [activeContractor, setActiveContractor] = useState(null);

  const rate = RATES[quality];
  const builtUp = plotArea * floors;
  const estimate = builtUp * rate;
  const sliderPct = ((plotArea - 500) / (5000 - 500)) * 100;

  return (
    <div className="animate-fade" style={{ background: '#FFFFFF' }}>

      {/* ── HERO ── */}
      <div style={{ position: 'relative', background: '#0B192C', overflow: 'hidden', padding: '64px 0 52px' }}>
        <img src="https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1800&q=70" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.2 }} />
        <div className="rr-container" style={{ position: 'relative', zIndex: 2 }}>
          <p style={eyebrow}><span style={{ display: 'inline-block', width: '24px', height: '2px', background: 'rgba(255,255,255,0.3)' }} /> Turnkey Construction & Civil Engineering</p>
          <h1 style={heroH1}>Build Your Dream Home<br />with Verified Civil Partners</h1>
          <p style={heroSub}>From municipal sanction maps & soil testing to lenter shuttering, brickwork & finishing — with live CCTV milestone tracking at every phase.</p>
          <div style={{ display: 'flex', gap: '24px', marginTop: '28px', flexWrap: 'wrap' }}>
            {['RERA-Approved Partners', 'Live Site CCTV Tracking', '5-Year Civil Warranty', 'Fixed-Price Contracts'].map(t => (
              <div key={t} style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                <CheckCircle size={14} style={{ color: 'rgba(255,255,255,0.55)' }} />
                <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.65)', fontFamily: 'Manrope, sans-serif' }}>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── COST ESTIMATOR ── */}
      <section style={{ background: '#F8F7F4', borderBottom: '1px solid #E4E1DA', padding: '64px 0' }}>
        <div className="rr-container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '2px', background: '#E4E1DA', border: '1px solid #E4E1DA', borderRadius: '2px', overflow: 'hidden' }}>

            {/* Plot Area */}
            <div style={{ background: 'white', padding: '32px 28px' }}>
              <p style={fLabel}>Plot Area</p>
              <p style={bigNum}>{plotArea.toLocaleString()} <span style={unit}>sq.ft</span></p>
              <p style={{ fontSize: '0.7rem', color: '#9CA3AF', fontFamily: 'Manrope, sans-serif', marginBottom: '16px' }}>500 – 5,000 sq.ft</p>
              <input type="range" min={500} max={5000} step={50} value={plotArea} onChange={e => setPlotArea(Number(e.target.value))}
                style={{ width: '100%', appearance: 'none', height: '3px', borderRadius: '2px', outline: 'none', cursor: 'pointer', background: `linear-gradient(to right, #0B192C ${sliderPct}%, #DDD8D0 ${sliderPct}%)` }} />
            </div>

            {/* Floors */}
            <div style={{ background: 'white', padding: '32px 28px' }}>
              <p style={fLabel}>Number of Floors</p>
              <p style={bigNum}>{floors} <span style={unit}>floor{floors > 1 ? 's' : ''}</span></p>
              <div style={{ display: 'flex', gap: '6px', marginTop: '16px' }}>
                {[1, 2, 3, 4].map(f => (
                  <button key={f} onClick={() => setFloors(f)}
                    style={{ flex: 1, padding: '10px', border: floors === f ? '1.5px solid #0B192C' : '1.5px solid #E4E1DA', borderRadius: '2px', background: floors === f ? '#0B192C' : 'white', color: floors === f ? 'white' : '#444', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer', fontFamily: 'Manrope, sans-serif', transition: 'all 0.15s' }}>G+{f - 1}</button>
                ))}
              </div>
              <p style={{ fontSize: '0.72rem', color: '#9CA3AF', marginTop: '10px', fontFamily: 'Manrope, sans-serif' }}>Built-up: {builtUp.toLocaleString()} sq.ft</p>
            </div>

            {/* Quality */}
            <div style={{ background: 'white', padding: '32px 28px' }}>
              <p style={fLabel}>Construction Quality</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
                {QUALITY_OPTIONS.map(q => (
                  <button key={q} onClick={() => setQuality(q)}
                    style={{ padding: '12px 14px', border: quality === q ? '1.5px solid #0B192C' : '1.5px solid #E4E1DA', borderRadius: '2px', background: quality === q ? '#0B192C' : 'white', color: quality === q ? 'white' : '#444', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'Manrope, sans-serif', textAlign: 'left', transition: 'all 0.15s' }}>
                    {q} <span style={{ fontSize: '0.7rem', opacity: 0.6 }}>— ₹ {RATES[q].toLocaleString()}/sqft</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Result */}
            <div style={{ background: '#0B192C', padding: '32px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <p style={{ fontSize: '0.62rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', fontFamily: 'Manrope, sans-serif', marginBottom: '14px' }}>Estimated Build Cost</p>
                <p style={{ fontSize: '2rem', fontWeight: 800, color: 'white', letterSpacing: '-0.04em', fontFamily: 'Manrope, sans-serif', lineHeight: 1, marginBottom: '6px' }}>
                  ₹ {(estimate / 100000).toFixed(2)} <span style={{ fontSize: '0.95rem', fontWeight: 500, opacity: 0.5 }}>L</span>
                </p>
                <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.35)', fontFamily: 'Manrope, sans-serif', marginBottom: '20px' }}>Incl. materials, labour & finishing</p>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '14px' }}>
                  {[{ k: 'Plot', v: `${plotArea.toLocaleString()} sqft` }, { k: 'Floors', v: `G+${floors - 1}` }, { k: 'Rate', v: `₹ ${rate.toLocaleString()}/sqft` }].map(r => (
                    <div key={r.k} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.35)', fontFamily: 'Manrope, sans-serif' }}>{r.k}</span>
                      <span style={{ fontSize: '0.74rem', fontWeight: 600, color: 'rgba(255,255,255,0.65)', fontFamily: 'Manrope, sans-serif' }}>{r.v}</span>
                    </div>
                  ))}
                </div>
              </div>
              <button onClick={onOpenAuth}
                style={{ marginTop: '20px', width: '100%', background: 'white', color: '#0B192C', border: 'none', borderRadius: '2px', padding: '13px 16px', fontSize: '0.74rem', fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer', fontFamily: 'Manrope, sans-serif' }}>
                Get Detailed Quote <ArrowRight size={13} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── VERIFIED CONTRACTORS ── */}
      <section className="rr-section">
        <div className="rr-container">
          <div className="section-header-row" style={{ marginBottom: '28px' }}>
            <div>
              <p className="section-label">Verified Partners</p>
              <h2 className="section-h2">Handpicked Construction Contractors</h2>
              <p className="section-sub">Every contractor is background-verified, GST-registered & holds civil engineering certification.</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: '#E4E1DA', border: '1px solid #E4E1DA', borderRadius: '2px', overflow: 'hidden' }}>
            {CONTRACTORS.map(c => (
              <div key={c.id} style={{ background: 'white', display: 'flex', flexDirection: 'column', cursor: 'pointer', transition: 'background 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.background = '#FAFAF8'}
                onMouseLeave={e => e.currentTarget.style.background = 'white'}>
                <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden' }}>
                  <img src={c.image} alt={c.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'} />
                  <span style={{ position: 'absolute', top: '10px', left: '10px', background: '#0B192C', color: 'white', fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '4px 8px', borderRadius: '2px', fontFamily: 'Manrope, sans-serif' }}>{c.type}</span>
                  <span style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(255,255,255,0.92)', fontSize: '0.72rem', fontWeight: 700, color: '#0B192C', padding: '3px 8px', borderRadius: '2px', fontFamily: 'Manrope, sans-serif' }}>★ {c.rating}</span>
                </div>
                <div style={{ padding: '22px 22px 24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0B192C', lineHeight: 1.3, marginBottom: '8px', fontFamily: 'Manrope, sans-serif' }}>{c.name}</h3>
                  <p style={{ fontSize: '0.78rem', color: '#6B6B6B', marginBottom: '10px', lineHeight: 1.5, fontFamily: 'Manrope, sans-serif' }}>{c.speciality}</p>
                  <p style={{ fontSize: '0.72rem', color: '#9CA3AF', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '14px', fontFamily: 'Manrope, sans-serif' }}>
                    <MapPin size={11} />{c.cities}
                  </p>
                  <div style={{ borderTop: '1px solid #F0EDE7', paddingTop: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
                    <div>
                      <p style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0B192C', letterSpacing: '-0.02em', fontFamily: 'Manrope, sans-serif' }}>{c.rate}</p>
                      <p style={{ fontSize: '0.68rem', color: '#9CA3AF', fontFamily: 'Manrope, sans-serif' }}>{c.projects}</p>
                    </div>
                    <button onClick={onOpenAuth}
                      style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.74rem', fontWeight: 700, color: '#0B192C', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Manrope, sans-serif', borderBottom: '1.5px solid #0B192C', paddingBottom: '1px' }}>
                      Request Quote <ArrowRight size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BUILD PHASES ── */}
      <section style={{ background: '#F8F7F4', borderTop: '1px solid #E4E1DA', padding: '72px 0' }}>
        <div className="rr-container">
          <div style={{ marginBottom: '36px' }}>
            <p className="section-label">Construction Phases</p>
            <h2 className="section-h2">How Your Home Gets Built</h2>
            <p className="section-sub">Every project is tracked with live CCTV photos uploaded to your Roof Ridge dashboard at each milestone.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px', background: '#E4E1DA', border: '1px solid #E4E1DA', borderRadius: '2px', overflow: 'hidden' }}>
            {MILESTONES.map((m, i) => (
              <div key={i} style={{ background: 'white', padding: '28px 24px' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <p style={{ fontSize: '0.62rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9CA3AF', fontFamily: 'Manrope, sans-serif' }}>{m.phase}</p>
                  <span style={{ fontSize: '0.68rem', color: '#0B192C', fontWeight: 600, fontFamily: 'Manrope, sans-serif' }}>{m.duration}</span>
                </div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0B192C', marginBottom: '14px', fontFamily: 'Manrope, sans-serif' }}>{m.name}</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                  {m.items.map(item => (
                    <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '7px' }}>
                      <CheckCircle size={12} style={{ color: '#0B192C', flexShrink: 0, marginTop: '2px' }} />
                      <span style={{ fontSize: '0.78rem', color: '#6B6B6B', fontFamily: 'Manrope, sans-serif', lineHeight: 1.4 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`input[type='range']::-webkit-slider-thumb { -webkit-appearance: none; width: 16px; height: 16px; border-radius: 50%; background: #0B192C; border: 2px solid white; box-shadow: 0 0 0 1.5px #0B192C; cursor: pointer; }`}</style>
    </div>
  );
}

const eyebrow = { fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', fontFamily: 'Manrope, sans-serif' };
const heroH1 = { fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', fontWeight: 800, color: 'white', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '14px', maxWidth: '700px' };
const heroSub = { fontSize: '0.95rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.65, maxWidth: '520px', fontFamily: 'Manrope, sans-serif' };
const fLabel = { fontSize: '0.62rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9CA3AF', fontFamily: 'Manrope, sans-serif', marginBottom: '10px' };
const bigNum = { fontSize: '2rem', fontWeight: 800, color: '#0B192C', letterSpacing: '-0.04em', fontFamily: 'Manrope, sans-serif', lineHeight: 1, marginBottom: '2px' };
const unit = { fontSize: '0.9rem', fontWeight: 500, color: '#9CA3AF' };
