import React from 'react';
import { ShieldCheck, LayoutGrid, Compass, Landmark, Award } from 'lucide-react';
import { useResponsive } from '../hooks/useResponsive';

const BENEFITS = [
  {
    icon: ShieldCheck,
    title: 'Verified Listings & Builders',
  },
  {
    icon: LayoutGrid,
    title: 'Wide Property Choices',
  },
  {
    icon: Compass,
    title: 'Expert Guidance & Insights',
  },
  {
    icon: Landmark,
    title: 'Home Loan Assistance',
  },
  {
    icon: Award,
    title: 'Trusted by Thousands',
  },
];

export default function ValuePropsStrip() {
  const { isMobile } = useResponsive();

  return (
    <section style={{
      background: '#FFFFFF',
      borderTop: '1px solid #EEF2F6',
      paddingTop: '36px',
      paddingBottom: '54px',
    }}>
      <div className="rr-container">
        {/* Section Heading */}
        <h2 style={{
          fontSize: '22px',
          fontWeight: 700,
          color: '#0F172A',
          fontFamily: 'Inter, sans-serif',
          marginBottom: '28px',
          letterSpacing: '-0.02em',
        }}>
          Why Choose RoofRidge?
        </h2>

        {/* Benefits Row + Divider + Right Slogan */}
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'flex-start' : 'center',
          justifyContent: 'space-between',
          gap: isMobile ? '32px' : '40px',
        }}>
          {/* ── 5 Horizontal Benefits ── */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(5, 1fr)',
            gap: isMobile ? '20px' : '24px',
            flex: 1,
            alignItems: 'flex-start',
          }}>
            {BENEFITS.map((item, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  gap: '10px',
                }}
              >
                {/* Blue Minimal Outline Icon */}
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  background: '#EEF5FF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#0866F5',
                }}>
                  <item.icon size={22} color="#0866F5" strokeWidth={1.8} />
                </div>

                {/* Title */}
                <p style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#0F172A',
                  lineHeight: 1.3,
                  margin: 0,
                  fontFamily: 'Inter, sans-serif',
                  maxWidth: '120px',
                }}>
                  {item.title}
                </p>
              </div>
            ))}
          </div>

          {/* ── Vertical Divider ── */}
          {!isMobile && (
            <div style={{
              width: '1px',
              height: '64px',
              background: '#E2E8F0',
              flexShrink: 0,
            }} />
          )}

          {/* ── Right-Side Text & Blue Underline ── */}
          <div style={{
            flexShrink: 0,
            minWidth: isMobile ? 'auto' : '230px',
          }}>
            <p style={{
              fontSize: '16.5px',
              fontWeight: 600,
              color: '#334155',
              lineHeight: 1.35,
              margin: 0,
              fontFamily: 'Inter, sans-serif',
            }}>
              Spaces for People.<br />
              Possibilities for Tomorrow.
            </p>
            <div style={{
              width: '36px',
              height: '2px',
              background: '#0866F5',
              marginTop: '10px',
              borderRadius: '2px',
            }} />
          </div>
        </div>
      </div>
    </section>
  );
}
