import React from 'react';
import { BUILDING_MATERIALS } from '../data/mockData';
import { ArrowRight, Star, Package, Truck, ShieldCheck, Zap } from 'lucide-react';
import { useResponsive } from '../hooks/useResponsive';

const STATS = [
  { icon: Truck,       value: '35+',      label: 'Cities with Direct Site Delivery' },
  { icon: Package,     value: '1,200+',   label: 'Verified B2B Wholesale SKUs' },
  { icon: ShieldCheck, value: '100%',     label: 'ISI / BIS Certified Materials' },
  { icon: Zap,         value: '24-Hour',  label: 'Same-Day Order Confirmation' },
];

export default function BuildingMaterialsGrid({ onAddToCart }) {
  const { isMobile, isTablet } = useResponsive();

  return (
    <section className="rr-section" style={{ padding: '80px 0' }}>
      <div className="rr-container">

        {/* ── Section header ── */}
        <div className="section-header-row" style={{ marginBottom: '40px' }}>
          <div>
            <p className="section-label">B2B Wholesale Marketplace</p>
            <h2 className="section-h2">Factory-Direct Building Materials</h2>
            <p className="section-sub">
              Direct manufacturer pricing for Cement, TMT Steel, Tiles &amp; Smart Automation.
            </p>
          </div>
          <button className="section-see-all">
            View Full Catalogue <ArrowRight size={14} />
          </button>
        </div>

        {/* ── Stats strip ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)',
          gap: 0,
          border: '1px solid #E4E1DA',
          borderRadius: '2px',
          overflow: 'hidden',
          marginBottom: '32px',
        }}>
          {STATS.map((s, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                padding: '20px 24px',
                borderRight: i < STATS.length - 1 ? '1px solid #E4E1DA' : 'none',
                background: 'white',
              }}
            >
              <div style={{
                width: '40px', height: '40px',
                background: '#F8F7F4',
                borderRadius: '2px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
                color: '#0B192C',
              }}>
                <s.icon size={18} />
              </div>
              <div>
                <p style={{
                  fontSize: '1.1rem', fontWeight: 800, color: '#0B192C',
                  letterSpacing: '-0.02em', lineHeight: 1,
                  fontFamily: 'Manrope, sans-serif', marginBottom: '2px',
                }}>{s.value}</p>
                <p style={{
                  fontSize: '0.72rem', color: '#6B6B6B',
                  fontFamily: 'Manrope, sans-serif', lineHeight: 1.3,
                }}>{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Material Cards ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : (isTablet ? 'repeat(3, 1fr)' : 'repeat(4, 1fr)'),
          gap: '1px',
          background: '#E4E1DA',
          border: '1px solid #E4E1DA',
          borderRadius: '2px',
          overflow: 'hidden',
        }}>
          {BUILDING_MATERIALS.map((mat) => (
            <div
              key={mat.id}
              style={{
                background: 'white',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.25s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#FAFAF8'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'white'; }}
            >
              {/* Image */}
              <div style={{
                position: 'relative',
                aspectRatio: '16/9',
                overflow: 'hidden',
                background: '#F8F7F4',
              }}>
                <img
                  src={mat.image}
                  alt={mat.name}
                  style={{
                    width: '100%', height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
                />
                {/* Wholesale badge */}
                <span style={{
                  position: 'absolute', top: '10px', left: '10px',
                  background: '#0B192C', color: 'white',
                  fontSize: '0.6rem', fontWeight: 800,
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                  padding: '4px 8px', borderRadius: '2px',
                  fontFamily: 'Manrope, sans-serif',
                }}>
                  Wholesale Rate
                </span>

                {/* Rating */}
                <span style={{
                  position: 'absolute', top: '10px', right: '10px',
                  background: 'rgba(255,255,255,0.92)',
                  border: '1px solid rgba(226,225,218,0.8)',
                  fontSize: '0.7rem', fontWeight: 700,
                  color: '#0B192C', padding: '3px 8px', borderRadius: '2px',
                  display: 'flex', alignItems: 'center', gap: '3px',
                  fontFamily: 'Manrope, sans-serif',
                }}>
                  <Star size={10} fill="#0B192C" color="#0B192C" />
                  {mat.rating}
                </span>
              </div>

              {/* Body */}
              <div style={{ padding: '20px 20px 22px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                {/* Category */}
                <p style={{
                  fontSize: '0.62rem', fontWeight: 800,
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  color: '#9CA3AF', marginBottom: '6px',
                  fontFamily: 'Manrope, sans-serif',
                }}>
                  {mat.category}
                </p>

                {/* Name */}
                <h3 style={{
                  fontSize: '0.92rem', fontWeight: 700, color: '#0B192C',
                  lineHeight: 1.35, marginBottom: '10px',
                  fontFamily: 'Manrope, sans-serif',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}>
                  {mat.name}
                </h3>

                {/* MOQ tag */}
                <span style={{
                  display: 'inline-block',
                  fontSize: '0.68rem', fontWeight: 600,
                  color: '#6B6B6B',
                  background: '#F8F7F4',
                  border: '1px solid #E4E1DA',
                  padding: '3px 10px', borderRadius: '2px',
                  marginBottom: '14px', alignSelf: 'flex-start',
                  fontFamily: 'Manrope, sans-serif',
                }}>
                  {mat.moq}
                </span>

                {/* Divider */}
                <div style={{ borderTop: '1px solid #F0EDE7', marginBottom: '14px' }} />

                {/* Price row */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
                  <div>
                    <p style={{
                      fontSize: '1.15rem', fontWeight: 800, color: '#0B192C',
                      letterSpacing: '-0.02em', lineHeight: 1,
                      fontFamily: 'Manrope, sans-serif', marginBottom: '2px',
                    }}>
                      {mat.price}
                    </p>
                    <p style={{
                      fontSize: '0.7rem', color: '#9CA3AF',
                      textDecoration: 'line-through',
                      fontFamily: 'Manrope, sans-serif',
                    }}>
                      {mat.originalPrice}
                    </p>
                  </div>

                  <button
                    onClick={() => onAddToCart(mat)}
                    style={{
                      background: '#0B192C',
                      color: 'white',
                      border: 'none',
                      borderRadius: '2px',
                      padding: '10px 16px',
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      letterSpacing: '0.04em',
                      cursor: 'pointer',
                      display: 'flex', alignItems: 'center', gap: '6px',
                      fontFamily: 'Manrope, sans-serif',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#162B48'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = '#0B192C'; e.currentTarget.style.transform = 'translateY(0)'; }}
                  >
                    Request Quote
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Bottom CTA band ── */}
        <div style={{
          marginTop: '20px',
          background: '#F8F7F4',
          border: '1px solid #E4E1DA',
          borderRadius: '2px',
          padding: '24px 32px',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'flex-start' : 'center',
          justifyContent: 'space-between',
          gap: '24px',
        }}>
          <div>
            <p style={{
              fontSize: '0.88rem', fontWeight: 700, color: '#0B192C',
              fontFamily: 'Manrope, sans-serif', marginBottom: '4px',
            }}>
              Need a bulk order or site-delivery estimate?
            </p>
            <p style={{
              fontSize: '0.78rem', color: '#6B6B6B', fontFamily: 'Manrope, sans-serif',
            }}>
              Our B2B team will respond within 2 hours with a customised rate card.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '10px', flexShrink: 0, width: isMobile ? '100%' : 'auto' }}>
            <button
              style={{
                background: '#0B192C', color: 'white',
                padding: '11px 22px', borderRadius: '2px',
                fontSize: '0.78rem', fontWeight: 700,
                letterSpacing: '0.04em',
                display: 'flex', alignItems: 'center', gap: '7px',
                cursor: 'pointer', border: 'none',
                fontFamily: 'Manrope, sans-serif',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#162B48'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#0B192C'; }}
            >
              Get B2B Rate Card <ArrowRight size={13} />
            </button>
            <button
              style={{
                background: 'transparent', color: '#0B192C',
                padding: '11px 18px', borderRadius: '2px',
                fontSize: '0.78rem', fontWeight: 600,
                border: '1.5px solid #E4E1DA',
                cursor: 'pointer',
                fontFamily: 'Manrope, sans-serif',
                transition: 'border-color 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#0B192C'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#E4E1DA'; }}
            >
              View Full Catalogue
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
