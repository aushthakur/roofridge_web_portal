import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useResponsive } from '../hooks/useResponsive';

const CATEGORY_PANELS = [
  { image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80', label: 'Modular Interiors', title: 'Designed for the way you live.', cta: 'Explore Collection', ctaPage: 'interiors' },
  { image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80', label: 'Commercial Real Estate', title: 'Invest where business grows.', cta: 'Explore Commercial', ctaPage: 'buy' },
  { image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=800&q=80', label: 'Turnkey Construction', title: 'Build it right. First time.', cta: 'Get Build Estimate', ctaPage: 'construction' },
  { image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80', label: 'Zero Brokerage Rentals', title: 'Your next home awaits.', cta: 'Browse Rentals', ctaPage: 'rent' },
];

export default function CategoryCarouselStrip({ onExploreCategory }) {
  const { isMobile } = useResponsive();

  return (
    <div style={{ background: '#F8FAFC', padding: isMobile ? '24px 20px' : '32px 40px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fit, minmax(${isMobile ? '280px' : '260px'}, 1fr))`, gap: '16px' }}>
        {CATEGORY_PANELS.map((panel, idx) => (
          <div key={idx} onClick={() => onExploreCategory(panel.ctaPage)}
            style={{ position: 'relative', overflow: 'hidden', height: '220px', borderRadius: '16px', cursor: 'pointer', boxShadow: '0 8px 24px rgba(0,0,0,0.06)' }}>
            <img src={panel.image} alt={panel.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1.0)'} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 30%, rgba(7,15,27,0.85) 100%)', zIndex: 1, pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px', zIndex: 2 }}>
              <span style={{ fontSize: '0.62rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', display: 'block', marginBottom: '4px', fontFamily: 'var(--font-body)' }}>{panel.label}</span>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'white', lineHeight: 1.25, marginBottom: '8px', fontFamily: 'var(--font-body)' }}>{panel.title}</h3>
              <button style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--rr-sky)', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', fontFamily: 'var(--font-body)', padding: 0 }}>
                {panel.cta} <ArrowRight size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
