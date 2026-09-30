import React, { useState, useEffect, useCallback } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const MAIN_SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1800&q=85',
    eyebrow: 'Design & Build Excellence',
    title: 'Find Your Dream Home Today',
    desc: '50,000+ verified listings with 0% brokerage, 100-point physical verification.',
    cta: 'EXPLORE PROPERTIES',
    ctaPage: 'buy',
  },
  {
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=85',
    eyebrow: 'RERA Verified Properties',
    title: 'Turnkey Modular Interiors',
    desc: 'Build a home that feels designed around you with premium materials.',
    cta: 'BOOK CONSULTATION',
    ctaPage: 'interiors',
  },
  {
    image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1800&q=85',
    eyebrow: 'Factory Wholesale Materials',
    title: 'Direct Factory Pricing',
    desc: 'UltraTech Cement, TATA Tiscon TMT Steel & Kajaria Tiles at factory rates.',
    cta: 'VIEW WHOLESALE',
    ctaPage: 'materials',
  },
];

function useCarousel(length, intervalMs) {
  const [idx, setIdx] = useState(0);
  const [fading, setFading] = useState(false);
  const goTo = useCallback((next) => {
    setFading(true);
    setTimeout(() => { setIdx((next + length) % length); setFading(false); }, 280);
  }, [length]);
  useEffect(() => {
    const t = setInterval(() => goTo(idx + 1), intervalMs);
    return () => clearInterval(t);
  }, [idx, goTo, intervalMs]);
  return { idx, fading, goTo };
}

function useIsMobile() {
  const [mobile, setMobile] = useState(typeof window !== 'undefined' ? window.innerWidth <= 768 : false);
  useEffect(() => {
    const handler = () => setMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return mobile;
}

export default function HeroSection({ onExploreCategory, children }) {
  const isMobile = useIsMobile();
  const main = useCarousel(MAIN_SLIDES.length, 6000);
  const ms = MAIN_SLIDES[main.idx];

  return (
    <section style={{ width: '100%', height: isMobile ? '600px' : '680px', position: 'relative', overflow: 'hidden' }}>
      
      {/* Background Images */}
      {MAIN_SLIDES.map((s, i) => (
        <img key={i} src={s.image} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 35%', opacity: i === main.idx ? 1 : 0, transform: i === main.idx ? 'scale(1.0)' : 'scale(1.05)', transition: 'opacity 0.7s ease, transform 8s ease-out', zIndex: 1 }} />
      ))}
      
      {/* Cinematic Gradient Overlay */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 2, background: 'linear-gradient(180deg, rgba(7,15,27,0.3) 0%, rgba(7,15,27,0.75) 100%)' }} />

      {/* Centered Content */}
      <div style={{ position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 3, width: '100%', maxWidth: '1000px', padding: '0 20px', textAlign: 'center', opacity: main.fading ? 0 : 1, transition: 'opacity 0.28s ease' }}>
        
        <h1 style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(2.2rem, 4.5vw, 4rem)', fontWeight: 800, color: 'white', letterSpacing: '-0.02em', marginBottom: '16px', lineHeight: 1.15, textShadow: '0 4px 12px rgba(0,0,0,0.3)' }}>
          {ms.title}
        </h1>
        <p style={{ fontSize: 'clamp(0.95rem, 1.5vw, 1.15rem)', color: 'rgba(255,255,255,0.95)', marginBottom: '40px', fontFamily: 'var(--font-body)', maxWidth: '640px', margin: '0 auto 40px', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
          {ms.desc}
        </p>

        {/* Search Widget Slot */}
        <div style={{ textAlign: 'left' }}>
          {children}
        </div>

      </div>

      {/* Left/Right Controls */}
      {!isMobile && (
        <>
          <button onClick={() => main.goTo(main.idx - 1)} style={arrowStyle('left')} aria-label="Previous"><ChevronLeft size={22} /></button>
          <button onClick={() => main.goTo(main.idx + 1)} style={arrowStyle('right')} aria-label="Next"><ChevronRight size={22} /></button>
        </>
      )}

      {/* Bottom Progress Bar */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '4px', background: 'rgba(255,255,255,0.1)', zIndex: 4 }}>
        <div key={`main-${main.idx}`} style={{ height: '100%', background: 'var(--rr-primary)', animation: 'hero-progress 6s linear forwards', borderRadius: '0 4px 4px 0' }} />
      </div>

      <style>{`@keyframes hero-progress { from { width: 0% } to { width: 100% } }`}</style>
    </section>
  );
}

function arrowStyle(side) {
  return { position: 'absolute', [side]: '24px', top: '50%', transform: 'translateY(-50%)', zIndex: 4, width: '48px', height: '48px', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', cursor: 'pointer', transition: 'all 0.2s', backdropFilter: 'blur(8px)' };
}
