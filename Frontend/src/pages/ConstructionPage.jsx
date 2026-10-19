import React, { useState } from 'react';
import {
  ArrowRight, CheckCircle, HardHat, Compass, MapPin, Shield,
  Zap, Star, Check, Sparkles, Building2, Eye, Video
} from 'lucide-react';
import { useResponsive } from '../hooks/useResponsive';

const CONTRACTORS = [
  {
    id: 'c1',
    name: 'Apex Structural Civil Engineering & Builders',
    type: 'Turnkey Civil Construction',
    projects: '45+ Luxury Homes',
    rating: 4.95,
    rate: '₹ 1,650 / sq.ft',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=800&q=80',
    speciality: 'Earthquake-resistant framing, lenter shuttering, slab casting',
    cities: 'Delhi NCR · Gurugram · Faridabad',
    warranty: '5-Year Civil Warranty'
  },
  {
    id: 'c2',
    name: 'Studio ArchForm Architects & Structural Designers',
    type: 'Architectural Maps & Sanctions',
    projects: '120+ Sanctioned Maps',
    rating: 4.88,
    rate: '₹ 35 / sq.ft',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    speciality: '3D elevation renders, municipal sanction, vastu compliance',
    cities: 'Mumbai · Pune · Bengaluru',
    warranty: 'Structural Certification'
  },
  {
    id: 'c3',
    name: 'GreenBuild Eco Construction Group',
    type: 'Eco & Sustainable Construction',
    projects: '28+ Green Homes',
    rating: 4.91,
    rate: '₹ 1,850 / sq.ft',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80',
    speciality: 'IGBC Green certification, rainwater harvesting, solar integration',
    cities: 'Bengaluru · Hyderabad · Chennai',
    warranty: 'IGBC Green Certification'
  },
];

const MILESTONES = [
  { phase: 'Phase 1', name: 'Foundation & Plinth', duration: '3–4 weeks', items: ['Soil testing & boring report', 'PCC & RCC foundation layout', 'Anti-termite treatment', 'Plinth beam & flooring fill'] },
  { phase: 'Phase 2', name: 'Structural Framework', duration: '5–7 weeks', items: ['Columns & slab shuttering', 'Lenter concrete pouring', 'TMT rebar steel binding', 'Brick wall construction'] },
  { phase: 'Phase 3', name: 'Plastering & MEP', duration: '3–4 weeks', items: ['Internal & external plaster', 'Electrical conduit & wiring', 'Plumbing & drainage', 'CCTV milestone photos'] },
  { phase: 'Phase 4', name: 'Finishing & Handover', duration: '3–5 weeks', items: ['Flooring & tile work', 'Painting & wood polish', 'Door & window frames', 'Final inspection & handover'] },
];

const QUALITY_OPTIONS = ['Standard', 'Premium', 'Luxury'];
const RATES = { Standard: 1350, Premium: 1650, Luxury: 2200 };

export default function ConstructionPage({ onOpenAuth, onBookConstruction }) {
  const [plotArea, setPlotArea] = useState(1800);
  const [floors, setFloors] = useState(2);
  const [quality, setQuality] = useState('Premium');
  const { isMobile, isTablet } = useResponsive();

  const rate = RATES[quality];
  const builtUp = plotArea * floors;
  const estimate = builtUp * rate;

  return (
    <div style={{ background: '#FFFFFF', minHeight: '90vh', fontFamily: 'Inter, sans-serif' }}>

      {/* ── 1. COMPACT EXECUTIVE HERO BANNER ── */}
      <section style={{
        background: 'linear-gradient(180deg, #EEF5FF 0%, #FFFFFF 100%)',
        borderBottom: '1px solid #E5EBF4',
        padding: isMobile ? '16px 0 14px' : '20px 0 16px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div className="rr-container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '11px',
              fontWeight: 800,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: '#0866F5',
            }}>
              <HardHat size={13} color="#0866F5" />
              TURNKEY CIVIL CONSTRUCTION & ARCHITECTURE
            </span>
          </div>

          <h1 style={{
            fontSize: isMobile ? '20px' : '24px',
            fontWeight: 800,
            color: '#0F172A',
            lineHeight: 1.25,
            letterSpacing: '-0.02em',
            margin: '0 0 4px 0',
            maxWidth: '820px',
          }}>
            Build Your Dream Home With <span style={{ color: '#0866F5' }}>Verified Civil Partners</span>
          </h1>

          <p style={{
            fontSize: '12.5px',
            color: '#64748B',
            lineHeight: 1.5,
            maxWidth: '750px',
            margin: '0 0 12px 0',
          }}>
            From municipal sanction maps & soil testing to lenter shuttering, brickwork & luxury finishing with live milestone tracking.
          </p>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: isMobile ? '12px' : '24px',
            paddingTop: '10px',
            borderTop: '1px solid rgba(226, 232, 240, 0.8)',
            fontSize: '11.5px',
            flexWrap: 'wrap',
          }}>
            {[
              { label: 'RERA-Approved Partners', desc: 'Pre-vetted' },
              { label: 'Live CCTV Site Access', desc: 'Daily updates' },
              { label: '5-Year Civil Warranty', desc: 'Protected' },
              { label: 'Fixed-Price Contract', desc: 'Zero escalation' },
            ].map((t, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Check size={13} strokeWidth={2.8} style={{ color: '#0866F5', flexShrink: 0 }} />
                <span style={{ fontWeight: 700, color: '#1E293B' }}>{t.label}</span>
                <span style={{ color: '#94A3B8', fontSize: '11px' }}>({t.desc})</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. CIVIL COST ESTIMATOR ── */}
      <section style={{ padding: '64px 0', background: '#FFFFFF' }}>
        <div className="rr-container">
          <div style={{ marginBottom: '32px' }}>
            <span style={{
              fontSize: '12px',
              fontWeight: 700,
              color: '#0866F5',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '8px',
            }}>
              Cost Calculator
            </span>
            <h2 style={{
              fontSize: isMobile ? '24px' : '34px',
              fontWeight: 800,
              color: '#0F172A',
              letterSpacing: '-0.02em',
            }}>
              Estimate Your Total Construction Cost
            </h2>
          </div>

          <div style={{
            background: '#FFFFFF',
            border: '1px solid #E5EBF4',
            borderRadius: '20px',
            padding: isMobile ? '24px' : '36px',
            boxShadow: '0 8px 30px rgba(11, 31, 68, 0.05)',
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1.3fr 1fr',
            gap: '32px',
            alignItems: 'center',
          }}>
            <div>
              {/* Plot area */}
              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <label style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A' }}>Plot Area</label>
                  <span style={{ fontSize: '20px', fontWeight: 800, color: '#0866F5' }}>
                    {plotArea.toLocaleString()} sq.ft
                  </span>
                </div>
                <input
                  type="range"
                  min={500}
                  max={5000}
                  step={50}
                  value={plotArea}
                  onChange={e => setPlotArea(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#0866F5', height: '6px', cursor: 'pointer' }}
                />
              </div>

              {/* Floors */}
              <div style={{ marginBottom: '24px' }}>
                <label style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', display: 'block', marginBottom: '8px' }}>
                  Number of Floors (G + {floors - 1})
                </label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {[1, 2, 3, 4].map(f => (
                    <button
                      key={f}
                      onClick={() => setFloors(f)}
                      style={{
                        flex: 1,
                        padding: '10px',
                        borderRadius: '10px',
                        border: floors === f ? '1.5px solid #0866F5' : '1px solid #E5EBF4',
                        background: floors === f ? '#EEF5FF' : '#F8FAFD',
                        color: floors === f ? '#0866F5' : '#0F172A',
                        fontSize: '13px',
                        fontWeight: 700,
                        cursor: 'pointer',
                      }}
                    >
                      {f} Floor{f > 1 ? 's' : ''}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quality package */}
              <div>
                <label style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', display: 'block', marginBottom: '8px' }}>
                  Specification Level
                </label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {QUALITY_OPTIONS.map(q => (
                    <button
                      key={q}
                      onClick={() => setQuality(q)}
                      style={{
                        flex: 1,
                        padding: '10px',
                        borderRadius: '10px',
                        border: quality === q ? '1.5px solid #0866F5' : '1px solid #E5EBF4',
                        background: quality === q ? '#EEF5FF' : '#F8FAFD',
                        color: quality === q ? '#0866F5' : '#0F172A',
                        fontSize: '13px',
                        fontWeight: 700,
                        cursor: 'pointer',
                      }}
                    >
                      {q} (₹{RATES[q]}/sqft)
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Total Summary */}
            <div style={{
              background: 'linear-gradient(135deg, #0866F5 0%, #0645B8 100%)',
              borderRadius: '16px',
              padding: '32px',
              color: '#FFFFFF',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 8px 24px rgba(8, 102, 245, 0.25)',
              justifyContent: 'space-between',
            }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', display: 'block', marginBottom: '8px' }}>
                  Estimated Turnkey Construction
                </span>
                <div style={{ fontSize: '34px', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '6px' }}>
                  ₹ {(estimate / 100000).toFixed(2)}{' '}
                  <span style={{ fontSize: '18px', fontWeight: 500, color: 'rgba(255,255,255,0.7)' }}>Lakhs</span>
                </div>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', marginBottom: '18px' }}>
                  Total Built-up Area: {builtUp.toLocaleString()} sq.ft across {floors} floors.
                </p>

                <div style={{
                  borderTop: '1px solid rgba(255,255,255,0.12)',
                  paddingTop: '14px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  marginBottom: '24px',
                  fontSize: '12px',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'rgba(255,255,255,0.6)' }}>Base Civil Rate:</span>
                    <span style={{ fontWeight: 600 }}>₹ {rate} / sq.ft</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'rgba(255,255,255,0.6)' }}>CCTV Milestone App:</span>
                    <span style={{ fontWeight: 600, color: '#38BDF8' }}>Included (Free)</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'rgba(255,255,255,0.6)' }}>Structural Warranty:</span>
                    <span style={{ fontWeight: 600 }}>5 Years Flat</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  if (onBookConstruction) {
                    onBookConstruction('construction', `Residential Turnkey Construction (${builtUp} sq.ft, ${quality} Package)`, estimate);
                  } else {
                    onOpenAuth();
                  }
                }}
                style={{
                  width: '100%',
                  background: '#0866F5',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '14px',
                  fontSize: '14px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 16px rgba(8, 102, 245, 0.4)',
                }}
              >
                <span>Request Detailed Site Blueprint</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. TOP CONTRACTORS & MILESTONES ── */}
      <section style={{
        background: '#F8FAFD',
        borderTop: '1px solid #E5EBF4',
        padding: '64px 0 80px',
      }}>
        <div className="rr-container">
          <div style={{ marginBottom: '32px' }}>
            <span style={{
              fontSize: '12px',
              fontWeight: 700,
              color: '#0866F5',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '8px',
            }}>
              Pre-Vetted Civil Teams
            </span>
            <h2 style={{
              fontSize: isMobile ? '24px' : '32px',
              fontWeight: 800,
              color: '#0F172A',
              letterSpacing: '-0.02em',
            }}>
              Verified Civil Construction Partners
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: '24px',
          }}>
            {CONTRACTORS.map(c => (
              <div
                key={c.id}
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #E5EBF4',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 4px 16px rgba(11, 31, 68, 0.03)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 28px rgba(11, 31, 68, 0.06)';
                  e.currentTarget.style.borderColor = '#C7D9F5';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(11, 31, 68, 0.03)';
                  e.currentTarget.style.borderColor = '#E5EBF4';
                }}
              >
                <div>
                  <div style={{ height: '180px', overflow: 'hidden' }}>
                    <img src={c.image} alt={c.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: '20px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 600, color: '#0866F5', display: 'block', marginBottom: '4px' }}>
                      {c.type}
                    </span>
                    <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0F172A', marginBottom: '8px' }}>
                      {c.name}
                    </h3>
                    <p style={{ fontSize: '13px', color: '#64748B', lineHeight: 1.5, marginBottom: '14px' }}>
                      {c.speciality}
                    </p>
                    <div style={{ display: 'flex', gap: '8px', fontSize: '12px', color: '#0F172A', fontWeight: 600 }}>
                      <span style={{ background: '#F8FAFD', border: '1px solid #E5EBF4', padding: '3px 8px', borderRadius: '6px' }}>{c.projects}</span>
                      <span style={{ background: '#EEF5FF', color: '#0866F5', padding: '3px 8px', borderRadius: '6px' }}>{c.rate}</span>
                    </div>
                  </div>
                </div>

                <div style={{
                  padding: '16px 20px',
                  borderTop: '1px solid #F1F5F9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: '#0F172A' }}>
                    {c.warranty}
                  </span>
                  <button
                    onClick={() => {
                      if (onBookConstruction) {
                        onBookConstruction('construction', `Contractor Liaison: ${c.name}`, 1500000);
                      } else {
                        onOpenAuth();
                      }
                    }}
                    style={{
                      background: '#0866F5',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '8px 14px',
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    Contact Team
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
