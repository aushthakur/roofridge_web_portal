import React, { useState } from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { useResponsive } from '../hooks/useResponsive';

const QUALITY = [
  { id: 'Essential', label: 'Essential',  sub: 'Standard Laminate',          rate: 850  },
  { id: 'Premium',   label: 'Premium',    sub: 'Acrylic & Veneer',            rate: 1250 },
  { id: 'Luxury',    label: 'Luxury',     sub: 'PU Finish & Italian Marble',  rate: 1800 },
];

const SCOPES = [
  { id: 'Full Home', label: 'Full Home Interior',       multiplier: 1.0  },
  { id: 'Kitchen',   label: 'Modular Kitchen & Dining', multiplier: 0.35 },
  { id: 'Rooms',     label: 'Living Room & Bedrooms',   multiplier: 0.5  },
];

const BADGES = [
  '10-Year Flat Warranty',
  'Free 3D VR Consultation',
  'Zero Hidden Charges',
];

export default function InteriorEstimatorWidget({ onBookConsultation }) {
  const [area, setArea]       = useState(1400);
  const [quality, setQuality] = useState('Premium');
  const [scope, setScope]     = useState('Full Home');
  const { isMobile } = useResponsive();

  const q        = QUALITY.find(x => x.id === quality);
  const s        = SCOPES.find(x => x.id === scope);
  const estimate = Math.round((area * q.rate * s.multiplier) / 10000) * 10000;
  const inLakhs  = (estimate / 100000).toFixed(2);
  const sliderPct = ((area - 500) / (5000 - 500)) * 100;

  return (
    <section style={{
      position: 'relative',
      overflow: 'hidden',
      background: '#0B192C',
      padding: '0',
    }}>
      {/* Background photo with strong dark overlay */}
      <img
        src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1800&q=80"
        alt=""
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'center',
          opacity: 0.18,
        }}
      />

      {/* Content layer */}
      <div style={{ position: 'relative', zIndex: 2, padding: '80px 0' }}>
        <div className="rr-container">

          {/* ── TOP: Heading row ── */}
          <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: isMobile ? 'flex-start' : 'flex-end',
            justifyContent: 'space-between',
            marginBottom: '52px',
            gap: '32px',
          }}>
            <div style={{ maxWidth: '560px' }}>
              <p style={{
                fontSize: '0.65rem', fontWeight: 800,
                letterSpacing: '0.14em', textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.45)',
                display: 'flex', alignItems: 'center', gap: '10px',
                marginBottom: '16px', fontFamily: 'Manrope, sans-serif',
              }}>
                <span style={{ display: 'inline-block', width: '24px', height: '2px', background: 'rgba(255,255,255,0.3)' }} />
                Interior Cost Estimator
              </p>
              <h2 style={{
                fontFamily: 'Manrope, sans-serif',
                fontSize: 'clamp(1.8rem, 3vw, 2.6rem)',
                fontWeight: 800, color: 'white',
                letterSpacing: '-0.03em', lineHeight: 1.1,
                marginBottom: '16px',
              }}>
                Calculate Your Home Interior<br />Cost in Seconds
              </h2>
              <p style={{
                fontSize: '0.92rem', color: 'rgba(255,255,255,0.6)',
                lineHeight: 1.7, fontFamily: 'Manrope, sans-serif',
                maxWidth: '440px',
              }}>
                Accurate budget estimates for modular kitchens, wardrobes &amp; full turnkey interiors with guaranteed 45-day delivery.
              </p>
            </div>

            {/* Guarantee badges */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flexShrink: 0 }}>
              {BADGES.map(b => (
                <div key={b} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CheckCircle size={15} style={{ color: 'rgba(255,255,255,0.5)', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.7)', fontFamily: 'Manrope, sans-serif' }}>{b}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── BOTTOM: Three-column calculator + result ── */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1.2fr 1.2fr 1.2fr 1fr',
            gap: '2px',
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '3px',
            overflow: 'hidden',
          }}>

            {/* Col 1 — Area Slider */}
            <div style={{ background: 'rgba(11,25,44,0.85)', padding: '32px 32px 36px', backdropFilter: 'blur(8px)' }}>
              <p style={labelStyle}>Home Carpet Area</p>
              <p style={{
                fontSize: '2.2rem', fontWeight: 800, color: 'white',
                letterSpacing: '-0.04em', fontFamily: 'Manrope, sans-serif',
                marginBottom: '4px', lineHeight: 1,
              }}>
                {area.toLocaleString()}
                <span style={{ fontSize: '0.9rem', fontWeight: 500, opacity: 0.5, marginLeft: '6px' }}>sq.ft</span>
              </p>
              <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)', fontFamily: 'Manrope, sans-serif', marginBottom: '20px' }}>
                500 – 5,000 sq.ft range
              </p>

              <input
                type="range"
                min={500} max={5000} step={50}
                value={area}
                onChange={e => setArea(Number(e.target.value))}
                style={{
                  width: '100%', appearance: 'none', height: '3px',
                  borderRadius: '2px', outline: 'none', cursor: 'pointer',
                  background: `linear-gradient(to right, rgba(255,255,255,0.85) ${sliderPct}%, rgba(255,255,255,0.15) ${sliderPct}%)`,
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
                <span style={{ fontSize: '0.66rem', color: 'rgba(255,255,255,0.3)', fontFamily: 'Manrope, sans-serif' }}>500</span>
                <span style={{ fontSize: '0.66rem', color: 'rgba(255,255,255,0.3)', fontFamily: 'Manrope, sans-serif' }}>5,000</span>
              </div>
            </div>

            {/* Col 2 — Quality */}
            <div style={{ background: 'rgba(11,25,44,0.85)', padding: '32px 32px 36px', backdropFilter: 'blur(8px)' }}>
              <p style={labelStyle}>Quality Grade</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '16px' }}>
                {QUALITY.map(qt => (
                  <button
                    key={qt.id}
                    onClick={() => setQuality(qt.id)}
                    style={{
                      padding: '14px 16px',
                      border: quality === qt.id
                        ? '1.5px solid rgba(255,255,255,0.8)'
                        : '1.5px solid rgba(255,255,255,0.12)',
                      borderRadius: '2px',
                      background: quality === qt.id ? 'rgba(255,255,255,0.1)' : 'transparent',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.2s',
                    }}
                  >
                    <p style={{
                      fontSize: '0.82rem', fontWeight: 700,
                      color: quality === qt.id ? 'white' : 'rgba(255,255,255,0.55)',
                      fontFamily: 'Manrope, sans-serif', marginBottom: '1px',
                    }}>{qt.label}</p>
                    <p style={{
                      fontSize: '0.68rem',
                      color: quality === qt.id ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.28)',
                      fontFamily: 'Manrope, sans-serif',
                    }}>{qt.sub}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Col 3 — Scope */}
            <div style={{ background: 'rgba(11,25,44,0.85)', padding: '32px 32px 36px', backdropFilter: 'blur(8px)' }}>
              <p style={labelStyle}>Scope of Work</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '16px' }}>
                {SCOPES.map(sc => (
                  <button
                    key={sc.id}
                    onClick={() => setScope(sc.id)}
                    style={{
                      padding: '18px 16px',
                      border: scope === sc.id
                        ? '1.5px solid rgba(255,255,255,0.8)'
                        : '1.5px solid rgba(255,255,255,0.12)',
                      borderRadius: '2px',
                      background: scope === sc.id ? 'rgba(255,255,255,0.1)' : 'transparent',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.2s',
                    }}
                  >
                    <p style={{
                      fontSize: '0.82rem', fontWeight: 600,
                      color: scope === sc.id ? 'white' : 'rgba(255,255,255,0.5)',
                      fontFamily: 'Manrope, sans-serif',
                    }}>{sc.label}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Col 4 — Result + CTA */}
            <div style={{
              background: 'rgba(255,255,255,0.05)',
              padding: '32px 32px 36px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              borderLeft: '1px solid rgba(255,255,255,0.08)',
            }}>
              <div>
                <p style={labelStyle}>Estimated Cost</p>
                <p style={{
                  fontSize: 'clamp(1.8rem, 2.5vw, 2.6rem)',
                  fontWeight: 800, color: 'white',
                  letterSpacing: '-0.04em',
                  fontFamily: 'Manrope, sans-serif',
                  lineHeight: 1, marginTop: '16px', marginBottom: '6px',
                }}>
                  ₹ {inLakhs}
                  <span style={{ fontSize: '1rem', fontWeight: 500, opacity: 0.5, marginLeft: '6px' }}>Lakhs</span>
                </p>
                <p style={{
                  fontSize: '0.7rem', color: 'rgba(255,255,255,0.35)',
                  fontFamily: 'Manrope, sans-serif', lineHeight: 1.5, marginBottom: '24px',
                }}>
                  Incl. GST, Transport<br />&amp; Installation
                </p>

                {/* Mini breakdown */}
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '7px' }}>
                  {[
                    { k: 'Area', v: `${area.toLocaleString()} sq.ft` },
                    { k: 'Grade', v: quality },
                    { k: 'Scope', v: scope === 'Full Home' ? 'Full Home' : scope === 'Kitchen' ? 'Kitchen' : 'Rooms' },
                    { k: 'Rate', v: `₹ ${q.rate}/sq.ft` },
                  ].map(row => (
                    <div key={row.k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      <span style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.3)', fontFamily: 'Manrope, sans-serif' }}>{row.k}</span>
                      <span style={{ fontSize: '0.74rem', fontWeight: 600, color: 'rgba(255,255,255,0.65)', fontFamily: 'Manrope, sans-serif' }}>{row.v}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => onBookConsultation(estimate)}
                style={{
                  marginTop: '24px',
                  width: '100%',
                  background: 'white',
                  color: '#0B192C',
                  border: 'none',
                  borderRadius: '2px',
                  padding: '14px 20px',
                  fontSize: '0.76rem',
                  fontWeight: 800,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  fontFamily: 'Manrope, sans-serif',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#F0EDE7'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'white'; }}
              >
                Book Free 3D Consultation
                <ArrowRight size={14} />
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Slider thumb style */}
      <style>{`
        input[type='range']::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 20px; height: 20px;
          border-radius: 50%;
          background: white;
          border: 3px solid rgba(255,255,255,0.3);
          box-shadow: 0 2px 8px rgba(0,0,0,0.4);
          cursor: pointer;
        }
        input[type='range']::-moz-range-thumb {
          width: 20px; height: 20px;
          border-radius: 50%;
          background: white;
          border: 3px solid rgba(255,255,255,0.3);
          cursor: pointer;
        }
      `}</style>
    </section>
  );
}

const labelStyle = {
  fontSize: '0.62rem',
  fontWeight: 800,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.4)',
  fontFamily: 'Manrope, sans-serif',
};
