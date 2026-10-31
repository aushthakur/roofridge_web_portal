import React from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles, Building2, Zap, Clock } from 'lucide-react';
import { useResponsive } from '../hooks/useResponsive';

export default function OwnerListingCtaBanner({ onOpenPostProperty, onNavigate }) {
  const { isMobile, isTablet } = useResponsive();
  const isStack = isMobile || isTablet;

  return (
    <section style={{
      padding: isMobile ? '36px 0 48px 0' : '48px 0 84px 0',
      background: '#FFFFFF',
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: isMobile ? '0 16px' : '0 28px' }}>
        
        {/* Curved Floating Card Container */}
        <div style={{
          background: 'linear-gradient(135deg, #0866F5 0%, #0645B8 60%, #04338A 100%)',
          borderRadius: isMobile ? '20px' : '28px',
          padding: isMobile ? '32px 20px' : '56px 48px',
          color: '#FFFFFF',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 24px 60px rgba(8, 102, 245, 0.28)',
        }}>

          {/* Ambient Lighting Orbs */}
          <div style={{
            position: 'absolute',
            top: '-120px',
            right: '-100px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'rgba(8, 102, 245, 0.35)',
            filter: 'blur(90px)',
            pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute',
            bottom: '-120px',
            left: '-100px',
            width: '350px',
            height: '350px',
            borderRadius: '50%',
            background: 'rgba(56, 189, 248, 0.15)',
            filter: 'blur(80px)',
            pointerEvents: 'none',
          }} />

          <div style={{
            position: 'relative',
            zIndex: 2,
            display: 'grid',
            gridTemplateColumns: isStack ? '1fr' : 'repeat(12, 1fr)',
            gap: isMobile ? '28px' : '40px',
            alignItems: 'center',
          }}>
            
            {/* Left Content */}
            <div style={{ gridColumn: isStack ? 'auto' : 'span 7' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(255, 255, 255, 0.12)',
                backdropFilter: 'blur(8px)',
                borderRadius: '20px',
                padding: '6px 14px',
                fontSize: '0.76rem',
                fontWeight: 800,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#93C5FD',
                marginBottom: '20px',
                border: '1px solid rgba(255, 255, 255, 0.16)',
              }}>
                <Sparkles size={14} color="#60A5FA" /> OWNER & LANDLORD CONCIERGE
              </div>

              <h2 style={{
                color: '#FFFFFF',
                fontSize: 'clamp(1.6rem, 3.4vw, 2.8rem)',
                fontWeight: 800,
                lineHeight: 1.18,
                letterSpacing: '-0.025em',
                margin: '0 0 16px 0',
              }}>
                Sell or Rent at 0% Brokerage.<br />Reach 2.5 Million Buyers.
              </h2>

              <p style={{
                fontSize: isMobile ? '0.9rem' : '1rem',
                color: 'rgba(255, 255, 255, 0.85)',
                lineHeight: 1.6,
                margin: '0 0 24px 0',
                maxWidth: '560px',
              }}>
                List your residential flat, independent villa, or commercial office floor. Receive instant verified buyer inquiries straight to your phone with zero middleman fees.
              </p>

              {/* Verified Value Checkmarks */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: isMobile ? '12px' : '20px',
                fontSize: isMobile ? '0.8rem' : '0.88rem',
                fontWeight: 600,
                color: 'rgba(255, 255, 255, 0.95)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={18} color="#60A5FA" /> 100% Free Listing
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={18} color="#60A5FA" /> Keep 100% of Your Deal
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={18} color="#60A5FA" /> WhatsApp Inquiries
                </div>
              </div>
            </div>

            {/* Right Actions & Glass Metric Chips */}
            <div style={{
              gridColumn: isStack ? 'auto' : 'span 5',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}>
              {/* Glass Stats Strip */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '12px',
              }}>
                <div style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.16)',
                  borderRadius: '16px',
                  padding: '16px 12px',
                  textAlign: 'center',
                }}>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#FFFFFF' }}>14 Days</div>
                  <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.7)', marginTop: '2px' }}>Avg. Closing Time</div>
                </div>

                <div style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.16)',
                  borderRadius: '16px',
                  padding: '16px 12px',
                  textAlign: 'center',
                }}>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#38BDF8' }}>0%</div>
                  <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.7)', marginTop: '2px' }}>Zero Brokerage</div>
                </div>

                <div style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.16)',
                  borderRadius: '16px',
                  padding: '16px 12px',
                  textAlign: 'center',
                }}>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#34D399' }}>₹ 1.8L</div>
                  <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.7)', marginTop: '2px' }}>Avg. Saved</div>
                </div>
              </div>

              {/* Action Buttons */}
              <button
                onClick={() => onOpenPostProperty && onOpenPostProperty()}
                style={{
                  width: '100%',
                  padding: '18px 28px',
                  borderRadius: '14px',
                  background: '#FFFFFF',
                  color: '#0866F5',
                  border: 'none',
                  fontSize: '1rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  boxShadow: '0 10px 28px rgba(0, 0, 0, 0.25)',
                  transition: 'all 0.18s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 16px 36px rgba(0, 0, 0, 0.35)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 28px rgba(0, 0, 0, 0.25)';
                }}
              >
                Post Your Property for Free <ArrowRight size={18} />
              </button>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 4px',
              }}>
                <span style={{ fontSize: '0.74rem', color: 'rgba(255,255,255,0.65)' }}>
                  ⚡ Free listing live in under 2 minutes
                </span>

                <button
                  onClick={() => onNavigate && onNavigate('b2b')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#93C5FD',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: 0,
                  }}
                >
                  Developer Desk <ArrowRight size={12} />
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
