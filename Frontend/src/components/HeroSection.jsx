import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useResponsive } from '../hooks/useResponsive';

export default function HeroSection({ children, onExploreCategory }) {
  const { isMobile, isTablet } = useResponsive();
  const isSmall = isMobile || isTablet;

  return (
    <section style={{
      width: '100%',
      position: 'relative',
      backgroundImage: 'url(/images/hero/scenic_hero.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: isMobile ? 'center center' : 'center right',
      backgroundRepeat: 'no-repeat',
      minHeight: isMobile ? 'auto' : (isSmall ? 'auto' : '520px'),
      paddingTop: isMobile ? '12px' : '0',
      paddingBottom: isMobile ? '16px' : (isSmall ? '36px' : '86px'),
      overflow: 'visible',
    }}>
      {/* Container for Hero Content */}
      <div className="rr-container" style={{
        position: 'relative',
        paddingTop: isMobile ? '0' : '44px',
        height: '100%',
        minHeight: isMobile ? 'auto' : (isSmall ? 'auto' : '440px'),
      }}>
        {/* Upper Hero Row: Left Content + Floating Project Card on Right (Hidden on mobile) */}
        {!isMobile && (
          <div style={{
            display: 'flex',
            flexDirection: isSmall ? 'column' : 'row',
            justifyContent: 'space-between',
            alignItems: isSmall ? 'stretch' : 'flex-start',
            position: 'relative',
            gap: '24px',
          }}>
            {/* ── Left Content: Eyebrow + Headline + Description ── */}
            <div style={{ maxWidth: isSmall ? '100%' : '500px', zIndex: 10 }}>
              {/* Small uppercase eyebrow */}
              <p style={{
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#475569',
                marginBottom: '12px',
                fontFamily: 'Inter, sans-serif',
              }}>
                MORE THAN SPACES
              </p>

              {/* Main Headline */}
              <h1 style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 'clamp(2.1rem, 4.4vw, 3.4rem)',
                fontWeight: 700,
                color: '#0F172A',
                lineHeight: 1.08,
                letterSpacing: '-0.03em',
                marginBottom: '16px',
              }}>
                A Brighter<br />Tomorrow
              </h1>

              {/* Description */}
              <p style={{
                fontSize: '15px',
                color: '#334155',
                lineHeight: 1.5,
                maxWidth: '430px',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400,
              }}>
                Find your perfect home, investment or commercial space with RoofRidge.
              </p>
            </div>

            {/* ── Handwritten Decorative Text Element in Open Sky/Valley (Desktop only) ── */}
            {!isSmall && (
              <div style={{
                position: 'absolute',
                top: '40px',
                left: '49%',
                zIndex: 8,
                pointerEvents: 'none',
              }}>
                <div style={{
                  fontFamily: "'Caveat', cursive",
                  fontSize: '28px',
                  lineHeight: '1.08',
                  color: '#243348',
                  fontWeight: 600,
                  letterSpacing: '0.02em',
                }}>
                  Spaces<br />
                  People<br />
                  Possibilities
                </div>
                <div style={{
                  width: '32px',
                  height: '2.5px',
                  background: '#0866F5',
                  marginTop: '6px',
                  borderRadius: '2px',
                }} />
              </div>
            )}

            {/* ── Floating "Explore New Projects" Card on Right ── */}
            <div
              onClick={() => onExploreCategory && onExploreCategory('buy')}
              style={{
                background: '#FFFFFF',
                borderRadius: '18px',
                padding: '14px 16px',
                boxShadow: '0 12px 30px rgba(11, 31, 68, 0.12)',
                border: '1px solid rgba(255, 255, 255, 0.9)',
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                width: isSmall ? '100%' : '255px',
                boxSizing: 'border-box',
                cursor: 'pointer',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                zIndex: 10,
                marginTop: isSmall ? '12px' : '0',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 16px 36px rgba(11, 31, 68, 0.16)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(11, 31, 68, 0.12)';
              }}
            >
              {/* Card Text Content */}
              <div style={{ flex: 1 }}>
                <span style={{
                  fontSize: '8.5px',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: '#94A3B8',
                  display: 'block',
                  marginBottom: '6px',
                  fontFamily: 'Inter, sans-serif',
                }}>
                  TURN PLANS INTO ADDRESSES
                </span>
                <h3 style={{
                  fontSize: '14px',
                  fontWeight: 700,
                  color: '#0F172A',
                  lineHeight: 1.25,
                  margin: '0 0 14px 0',
                  fontFamily: 'Inter, sans-serif',
                }}>
                  Explore<br />New Projects<br />in Mumbai
                </h3>
                {/* Circular Royal Blue Button */}
                <div style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  background: '#0866F5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                }}>
                  <ArrowRight size={14} color="#FFFFFF" strokeWidth={2.2} />
                </div>
              </div>

              {/* Card Skyscraper Photo */}
              <div style={{
                width: '80px',
                height: '110px',
                borderRadius: '10px',
                overflow: 'hidden',
                flexShrink: 0,
              }}>
                <img
                  src="/images/new_projects_card.jpg"
                  alt="New Projects in Mumbai"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* ── Search Panel (Responsive: in-flow on mobile/tablet, floating absolute on desktop) ── */}
        <div style={{
          position: isSmall ? 'relative' : 'absolute',
          bottom: isSmall ? 'auto' : '-44px',
          left: isSmall ? '0' : '40px',
          right: isSmall ? '0' : 'auto',
          marginTop: isMobile ? '0' : (isSmall ? '24px' : '0'),
          width: isSmall ? '100%' : 'auto',
          zIndex: 20,
        }}>
          {children}
        </div>
      </div>
    </section>
  );
}
