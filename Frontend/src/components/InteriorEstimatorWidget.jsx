import React, { useState } from 'react';
import { ArrowRight, Sparkles, Calculator, ShieldCheck, Clock, Check, Eye, HelpCircle } from 'lucide-react';

const STYLES = [
  {
    id: 'scandi',
    name: 'Contemporary Scandinavian',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85',
    vibe: 'Warm oak textures, neutral off-whites & concealed lighting',
  },
  {
    id: 'luxury',
    name: 'Modern Luxury Penthouse',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
    vibe: 'Italian Statuario marble, bronze accents & fluted panels',
  },
  {
    id: 'minimal',
    name: 'Minimalist Japandi',
    image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=85',
    vibe: 'Clean geometric lines, cane inserts & serene natural lighting',
  },
];

const QUALITY = [
  { id: 'Essential', label: 'Standard', sub: 'Commercial Ply · Laminate', rate: 850 },
  { id: 'Premium', label: 'Premium', sub: 'IS:710 Marine Ply · Acrylic', rate: 1250 },
  { id: 'Luxury', label: 'Luxury', sub: 'Boiling Water Proof · PU Lacquer', rate: 1800 },
];

const SCOPES = [
  { id: 'Full Home', label: 'Entire Home (All Rooms)', multiplier: 1.0 },
  { id: 'Kitchen', label: 'Kitchen & Dining Area', multiplier: 0.35 },
  { id: 'Rooms', label: 'Living Room & Bedrooms', multiplier: 0.5 },
];

export default function InteriorEstimatorWidget({ onBookConsultation }) {
  const [activeStyle, setActiveStyle] = useState('scandi');
  const [area, setArea] = useState(1400);
  const [quality, setQuality] = useState('Premium');
  const [scope, setScope] = useState('Full Home');

  const currStyle = STYLES.find(s => s.id === activeStyle) || STYLES[0];
  const q = QUALITY.find(x => x.id === quality) || QUALITY[1];
  const s = SCOPES.find(x => x.id === scope) || SCOPES[0];
  const estimate = Math.round((area * q.rate * s.multiplier) / 10000) * 10000;
  const inLakhs = (estimate / 100000).toFixed(2);
  const emiApprox = Math.round((estimate * 0.0095)).toLocaleString();

  return (
    <section style={{
      padding: '84px 0',
      background: 'linear-gradient(180deg, #F8FAFD 0%, #EEF5FF 50%, #FFFFFF 100%)',
      position: 'relative',
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 28px' }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 48px auto' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            color: '#0866F5',
            fontSize: '0.76rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: '10px',
          }}>
            <Calculator size={15} /> INTERIOR COST INTELLIGENCE
          </div>
          <h2 style={{
            fontSize: 'clamp(1.9rem, 3vw, 2.5rem)',
            fontWeight: 800,
            color: '#0F172A',
            letterSpacing: '-0.025em',
            lineHeight: 1.2,
            margin: '0 0 12px 0',
          }}>
            Customize Your Modular Interior Budget
          </h2>
          <p style={{
            fontSize: '0.96rem',
            color: '#64748B',
            lineHeight: 1.6,
            margin: 0,
          }}>
            Real-time turnkey pricing for apartments and villas with 10-year warranty, 45-day handover & zero hidden charges.
          </p>
        </div>

        {/* Studio Showcase Card */}
        <div style={{
          background: '#FFFFFF',
          borderRadius: '24px',
          border: '1px solid #E5EBF4',
          boxShadow: '0 20px 48px rgba(11, 31, 68, 0.08)',
          overflow: 'hidden',
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
        }}>

          {/* Left Column: Visual Style Preview (7 cols) */}
          <div style={{
            gridColumn: 'span 7',
            padding: '36px',
            borderRight: '1px solid #F1F5F9',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            background: '#FFFFFF',
          }}>
            <div>
              {/* Style Switcher Bar */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '16px',
                flexWrap: 'wrap',
                gap: '12px',
              }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Design Aesthetics
                </span>

                <div style={{ display: 'flex', gap: '8px' }}>
                  {STYLES.map((st) => {
                    const isSelected = activeStyle === st.id;
                    return (
                      <button
                        key={st.id}
                        type="button"
                        onClick={() => setActiveStyle(st.id)}
                        style={{
                          padding: '6px 12px',
                          borderRadius: '20px',
                          background: isSelected ? '#0866F5' : '#F1F5F9',
                          color: isSelected ? '#FFFFFF' : '#475569',
                          border: 'none',
                          fontSize: '0.74rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        {st.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* High-res Image Preview */}
              <div style={{
                position: 'relative',
                height: '270px',
                borderRadius: '18px',
                overflow: 'hidden',
                marginBottom: '28px',
                boxShadow: '0 6px 20px rgba(0,0,0,0.08)',
              }}>
                <img
                  src={currStyle.image}
                  alt={currStyle.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(11,31,68,0.7) 0%, transparent 60%)',
                }} />

                {/* Hotspot Pills on Image */}
                <div style={{
                  position: 'absolute',
                  top: '16px',
                  left: '16px',
                  background: 'rgba(255, 255, 255, 0.92)',
                  backdropFilter: 'blur(6px)',
                  color: '#0F172A',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  padding: '4px 10px',
                  borderRadius: '20px',
                }}>
                  ✨ {currStyle.vibe}
                </div>

                <div style={{
                  position: 'absolute',
                  bottom: '14px',
                  left: '16px',
                  display: 'flex',
                  gap: '8px',
                }}>
                  <span style={{
                    background: 'rgba(11, 31, 68, 0.85)',
                    backdropFilter: 'blur(6px)',
                    color: '#FFFFFF',
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    padding: '4px 10px',
                    borderRadius: '12px',
                    border: '1px solid rgba(255,255,255,0.2)',
                  }}>
                    • Fluted Accent Paneling
                  </span>
                  <span style={{
                    background: 'rgba(11, 31, 68, 0.85)',
                    backdropFilter: 'blur(6px)',
                    color: '#FFFFFF',
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    padding: '4px 10px',
                    borderRadius: '12px',
                    border: '1px solid rgba(255,255,255,0.2)',
                  }}>
                    • German Soft-Close Hinges
                  </span>
                </div>
              </div>

              {/* 1. Area Slider */}
              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <label style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0F172A' }}>
                    Select Carpet Area
                  </label>
                  <span style={{
                    fontSize: '1.15rem',
                    fontWeight: 800,
                    color: '#0866F5',
                    background: '#EEF5FF',
                    padding: '3px 12px',
                    borderRadius: '10px',
                    letterSpacing: '-0.01em',
                  }}>
                    {area.toLocaleString()} sq.ft
                  </span>
                </div>

                <input
                  type="range"
                  min="500"
                  max="5000"
                  step="50"
                  value={area}
                  onChange={(e) => setArea(Number(e.target.value))}
                  style={{
                    width: '100%',
                    height: '8px',
                    accentColor: '#0866F5',
                    cursor: 'pointer',
                    borderRadius: '4px',
                  }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#94A3B8', marginTop: '6px' }}>
                  <span>500 sq.ft (1 BHK)</span>
                  <span>1,800 sq.ft (3 BHK Luxury)</span>
                  <span>5,000 sq.ft (Penthouse / Villa)</span>
                </div>
              </div>

              {/* 2. Quality Tiers */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: '#0F172A', marginBottom: '10px' }}>
                  Material Specification Tier
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                  {QUALITY.map((qItem) => {
                    const isSelected = quality === qItem.id;
                    return (
                      <button
                        key={qItem.id}
                        type="button"
                        onClick={() => setQuality(qItem.id)}
                        style={{
                          background: isSelected ? '#EEF5FF' : '#FAFAFA',
                          border: isSelected ? '2px solid #0866F5' : '1px solid #E5EBF4',
                          borderRadius: '14px',
                          padding: '12px 10px',
                          textAlign: 'left',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '0.86rem', fontWeight: 800, color: isSelected ? '#0866F5' : '#0F172A' }}>
                            {qItem.label}
                          </span>
                          {isSelected && <Check size={14} color="#0866F5" strokeWidth={3} />}
                        </div>
                        <div style={{ fontSize: '0.7rem', color: '#64748B', marginTop: '4px', lineHeight: 1.3 }}>
                          {qItem.sub}
                        </div>
                        <div style={{ fontSize: '0.76rem', fontWeight: 700, color: '#0F172A', marginTop: '6px' }}>
                          ₹ {qItem.rate}/sq.ft
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Room Scope */}
              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: '#0F172A', marginBottom: '10px' }}>
                  Project Scope
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                  {SCOPES.map((sItem) => {
                    const isSelected = scope === sItem.id;
                    return (
                      <button
                        key={sItem.id}
                        type="button"
                        onClick={() => setScope(sItem.id)}
                        style={{
                          background: isSelected ? '#0866F5' : '#F8FAFD',
                          color: isSelected ? '#FFFFFF' : '#475569',
                          border: isSelected ? '1px solid #0866F5' : '1px solid #E5EBF4',
                          borderRadius: '12px',
                          padding: '10px 8px',
                          textAlign: 'center',
                          cursor: 'pointer',
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          transition: 'all 0.15s ease',
                        }}
                      >
                        {sItem.label}
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Executive Quote Summary (5 cols) */}
          <div style={{
            gridColumn: 'span 5',
            background: 'linear-gradient(135deg, #0866F5 0%, #0645B8 60%, #04338A 100%)',
            color: '#FFFFFF',
            padding: '40px 36px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* Ambient Background Aura */}
            <div style={{
              position: 'absolute',
              top: '-80px',
              right: '-80px',
              width: '240px',
              height: '240px',
              borderRadius: '50%',
              background: 'rgba(8, 102, 245, 0.3)',
              filter: 'blur(60px)',
              pointerEvents: 'none',
            }} />

            <div style={{ position: 'relative', zIndex: 2 }}>
              
              {/* Badge */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(255, 255, 255, 0.12)',
                backdropFilter: 'blur(8px)',
                borderRadius: '20px',
                padding: '5px 12px',
                fontSize: '0.72rem',
                fontWeight: 700,
                color: '#60A5FA',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                marginBottom: '20px',
              }}>
                <Sparkles size={13} /> ESTIMATED TURNKEY BUDGET
              </div>

              {/* Bold Price */}
              <div style={{ marginBottom: '8px' }}>
                <span style={{ fontSize: 'clamp(2.4rem, 4vw, 3.1rem)', fontWeight: 800, letterSpacing: '-0.03em', color: '#FFFFFF', lineHeight: 1 }}>
                  ₹ {inLakhs} Lakh*
                </span>
              </div>
              <div style={{ fontSize: '0.82rem', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '24px' }}>
                Includes 18% GST, design architecture, material supply & installation.
              </div>

              {/* EMI Callout Box */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.16)',
                borderRadius: '14px',
                padding: '14px 18px',
                marginBottom: '28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
                <div>
                  <div style={{ fontSize: '0.72rem', color: '#93C5FD', textTransform: 'uppercase', fontWeight: 600 }}>
                    Zero-Cost EMI Plan
                  </div>
                  <div style={{ fontSize: '1rem', fontWeight: 800, color: '#FFFFFF' }}>
                    From ₹ {emiApprox} / month
                  </div>
                </div>
                <span style={{
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  color: '#34D399',
                  background: 'rgba(52, 211, 153, 0.15)',
                  padding: '3px 8px',
                  borderRadius: '10px',
                }}>
                  0% Interest
                </span>
              </div>

              {/* Budget Allocation Breakdown */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                marginBottom: '28px',
              }}>
                <div style={{ fontSize: '0.76rem', color: 'rgba(255,255,255,0.7)', fontWeight: 600, textTransform: 'uppercase' }}>
                  Budget Breakdown Allocation:
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.76rem', marginBottom: '4px' }}>
                    <span style={{ color: 'rgba(255,255,255,0.85)' }}>Marine Ply Modular Woodwork</span>
                    <span style={{ fontWeight: 700, color: '#FFFFFF' }}>65%</span>
                  </div>
                  <div style={{ height: '6px', background: 'rgba(255,255,255,0.15)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: '65%', height: '100%', background: '#0866F5', borderRadius: '3px' }} />
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.76rem', marginBottom: '4px' }}>
                    <span style={{ color: 'rgba(255,255,255,0.85)' }}>Concealed Lighting & False Ceiling</span>
                    <span style={{ fontWeight: 700, color: '#FFFFFF' }}>18%</span>
                  </div>
                  <div style={{ height: '6px', background: 'rgba(255,255,255,0.15)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: '18%', height: '100%', background: '#38BDF8', borderRadius: '3px' }} />
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.76rem', marginBottom: '4px' }}>
                    <span style={{ color: 'rgba(255,255,255,0.85)' }}>Wall Finishes, Hardware & Painting</span>
                    <span style={{ fontWeight: 700, color: '#FFFFFF' }}>17%</span>
                  </div>
                  <div style={{ height: '6px', background: 'rgba(255,255,255,0.15)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: '17%', height: '100%', background: '#818CF8', borderRadius: '3px' }} />
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom Consultation CTA */}
            <div style={{ position: 'relative', zIndex: 2 }}>
              <button
                type="button"
                onClick={() => onBookConsultation && onBookConsultation()}
                style={{
                  width: '100%',
                  padding: '16px 24px',
                  borderRadius: '14px',
                  background: 'linear-gradient(135deg, #0866F5 0%, #0052CC 100%)',
                  color: '#FFFFFF',
                  border: 'none',
                  fontSize: '0.94rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 8px 24px rgba(8, 102, 245, 0.4)',
                  transition: 'all 0.18s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 12px 30px rgba(8, 102, 245, 0.55)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(8, 102, 245, 0.4)';
                }}
              >
                Book Free 3D VR Blueprint & Visit <ArrowRight size={16} />
              </button>

              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '16px',
                marginTop: '14px',
                fontSize: '0.72rem',
                color: 'rgba(255, 255, 255, 0.65)',
              }}>
                <span>✓ 100% Free Consultation</span>
                <span>✓ Zero Commitment</span>
                <span>✓ 10-Yr Warranty</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
