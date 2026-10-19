import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useResponsive } from '../hooks/useResponsive';

export default function PromoBanner({ 
  titleTop, 
  titleHighlight, 
  titleBottom, 
  subtitle, 
  image, 
  onClick, 
  badgeText,
  themeColor = '#EEF5FF', // Base color for the gradient fade
  textColor = '#0F172A',
  highlightColor = '#E74C3C' // e.g. pink, red, or brand color
}) {
  const { isMobile } = useResponsive();
  
  return (
    <section style={{ padding: isMobile ? '16px 0' : '32px 0', background: '#FFFFFF' }}>
      <div className="rr-container">
        <div style={{
          position: 'relative',
          width: '100%',
          minHeight: isMobile ? '240px' : '280px',
          borderRadius: '20px',
          overflow: 'hidden',
          cursor: 'pointer',
          backgroundImage: `
            linear-gradient(to right, ${themeColor} 0%, ${themeColor} ${isMobile ? '60%' : '40%'}, transparent 100%),
            url(${image})
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center right',
          border: '1.5px solid #E2E8F0',
          boxShadow: '0 8px 30px rgba(11, 31, 68, 0.06)',
          display: 'flex',
          alignItems: 'center',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        }}
        onClick={onClick}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.06)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
        >
          {/* Floating Badge (like the "Fast Delivery" or "Upto 85% off" in reference) */}
          {badgeText && (
            <div style={{
              position: 'absolute',
              top: isMobile ? '16px' : '24px',
              right: isMobile ? '16px' : '48px',
              width: isMobile ? '70px' : '100px',
              height: isMobile ? '70px' : '100px',
              background: 'white',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              color: highlightColor,
              fontWeight: 800,
              fontSize: isMobile ? '0.65rem' : '0.85rem',
              lineHeight: 1.2,
              fontFamily: 'Inter, sans-serif',
              padding: '10px'
            }}>
              {badgeText}
            </div>
          )}

          {/* Content */}
          <div style={{
            position: 'relative',
            zIndex: 2,
            padding: isMobile ? '24px 20px' : '40px 64px',
            maxWidth: isMobile ? '75%' : '55%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
            <h3 style={{
              fontSize: 'clamp(1.6rem, 3vw, 2.6rem)',
              fontWeight: 500,
              color: textColor,
              lineHeight: 1.1,
              marginBottom: '16px',
              fontFamily: 'Inter, sans-serif'
            }}>
              {titleTop} <br/>
              <span style={{ 
                color: highlightColor, 
                fontWeight: 800, 
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                fontStyle: 'italic',
                display: 'inline-block',
                margin: '4px 0'
              }}>
                {titleHighlight}
              </span> <br/>
              <span style={{ fontWeight: 800 }}>{titleBottom}</span>
            </h3>
            
            <p style={{
              fontSize: isMobile ? '0.75rem' : '0.95rem',
              fontWeight: 600,
              color: textColor,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: 'Inter, sans-serif'
            }}>
              {subtitle} <ArrowRight size={14} color={highlightColor} />
            </p>
          </div>

          {/* T&C Apply corner text */}
          <div style={{
            position: 'absolute',
            bottom: '12px',
            right: '16px',
            fontSize: '0.55rem',
            color: 'rgba(0,0,0,0.5)',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600
          }}>
            *T&C Apply
          </div>

        </div>
      </div>
    </section>
  );
}
