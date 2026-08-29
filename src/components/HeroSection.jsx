import React, { useState, useEffect, useCallback } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const MAIN_SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1800&q=85',
    eyebrow: 'Design & Build Excellence',
    title: 'Turnkey Modular Interiors\n& Smart Construction',
    desc: 'Build a home that feels designed around you. Get 3D VR walkthroughs, premium materials, 10-year warranty and professional installation.',
    cta: 'BOOK FREE 3D VR CONSULTATION',
    ctaPage: 'interiors',
  },
  {
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=85',
    eyebrow: 'RERA Verified Properties',
    title: 'Find Your Dream Home\nAcross 12 Indian Cities',
    desc: '50,000+ verified listings with 0% brokerage, 100-point physical verification and instant possession options.',
    cta: 'EXPLORE PROPERTIES',
    ctaPage: 'buy',
  },
  {
    image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1800&q=85',
    eyebrow: 'Factory Wholesale Materials',
    title: 'Build Smarter with\nDirect Factory Pricing',
    desc: 'UltraTech Cement, TATA Tiscon TMT Steel & Kajaria Tiles at direct factory rates with same-day site delivery.',
    cta: 'VIEW WHOLESALE PRICE INDEX',
    ctaPage: 'materials',
  },
];

const TOP_PANEL_SLIDES = [
  { image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80', label: 'Modular Interiors', title: '"Designed for\nthe way you live."', cta: 'Explore Collection', ctaPage: 'interiors' },
  { image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80', label: 'Luxury Wardrobes', title: '"Premium storage.\nPerfect finish."', cta: 'Explore Wardrobes', ctaPage: 'interiors' },
  { image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=80', label: 'Kitchen Design', title: '"Kitchens built\nfor real life."', cta: 'Book 3D Design', ctaPage: 'interiors' },
];

const BOTTOM_PANEL_SLIDES = [
  { image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80', label: 'Commercial Real Estate', title: '"Invest where\nbusiness grows."', cta: 'Explore Commercial', ctaPage: 'buy' },
  { image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=800&q=80', label: 'Turnkey Construction', title: '"Build it right.\nFirst time."', cta: 'Get Build Estimate', ctaPage: 'construction' },
  { image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80', label: 'Zero Brokerage Rentals', title: '"Your next home\nawaits."', cta: 'Browse Rentals', ctaPage: 'rent' },
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

function Dots({ count, current, onGo }) {
  return (
    <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
      {Array.from({ length: count }).map((_, i) => (
        <button key={i} onClick={e => { e.stopPropagation(); onGo(i); }}
          style={{ width: i === current ? '18px' : '5px', height: '5px', borderRadius: '3px', background: i === current ? 'white' : 'rgba(255,255,255,0.4)', border: 'none', cursor: 'pointer', padding: 0, transition: 'all 0.3s ease' }}
          aria-label={`Slide ${i + 1}`} />
      ))}
    </div>
  );
}

/* ── Mobile hero: full-width single panel carousel ─────────── */
function MobileHero({ onExploreCategory }) {
  const main = useCarousel(MAIN_SLIDES.length, 5000);
  const ms = MAIN_SLIDES[main.idx];

  return (
    <section style={{ width: '100%', height: '72vw', minHeight: '260px', maxHeight: '420px', position: 'relative', overflow: 'hidden' }}>
      {MAIN_SLIDES.map((s, i) => (
        <img key={i} src={s.image} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 35%', opacity: i === main.idx ? 1 : 0, transition: 'opacity 0.7s ease', zIndex: 1 }} />
      ))}
      <div style={{ position: 'absolute', inset: 0, zIndex: 2, background: 'linear-gradient(180deg, rgba(7,15,27,0.2) 0%, rgba(7,15,27,0.82) 100%)' }} />

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px 20px 28px', zIndex: 3, opacity: main.fading ? 0 : 1, transition: 'opacity 0.28s ease' }}>
        <p style={{ fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: '8px', fontFamily: 'Manrope, sans-serif' }}>
          {ms.eyebrow}
        </p>
        <h1 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(1.4rem, 6vw, 2rem)', fontWeight: 800, lineHeight: 1.15, color: 'white', letterSpacing: '-0.02em', marginBottom: '10px', whiteSpace: 'pre-line' }}>
          {ms.title}
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button onClick={() => onExploreCategory(ms.ctaPage)}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'white', color: '#0B192C', padding: '10px 18px', fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', borderRadius: '2px', cursor: 'pointer', border: 'none', fontFamily: 'Manrope, sans-serif', whiteSpace: 'nowrap' }}>
            Explore <ArrowRight size={12} />
          </button>
          <Dots count={MAIN_SLIDES.length} current={main.idx} onGo={main.goTo} />
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px', background: 'rgba(255,255,255,0.1)', zIndex: 4 }}>
        <div key={`mob-${main.idx}`} style={{ height: '100%', background: 'rgba(255,255,255,0.5)', animation: 'hero-progress 5s linear forwards' }} />
      </div>
    </section>
  );
}

/* ── Desktop hero: 7fr/3fr split with right stacked panels ─── */
function DesktopHero({ onExploreCategory }) {
  const main   = useCarousel(MAIN_SLIDES.length,         6000);
  const top    = useCarousel(TOP_PANEL_SLIDES.length,    5500);
  const bottom = useCarousel(BOTTOM_PANEL_SLIDES.length, 7000);

  const ms = MAIN_SLIDES[main.idx];
  const ts = TOP_PANEL_SLIDES[top.idx];
  const bs = BOTTOM_PANEL_SLIDES[bottom.idx];

  return (
    <section style={{ width: '100%', height: '600px', display: 'grid', gridTemplateColumns: '7fr 3fr' }}>

      {/* LEFT MAIN PANEL */}
      <div style={{ position: 'relative', overflow: 'hidden', height: '600px' }}>
        {MAIN_SLIDES.map((s, i) => (
          <img key={i} src={s.image} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 35%', opacity: i === main.idx ? 1 : 0, transform: i === main.idx ? 'scale(1.0)' : 'scale(1.05)', transition: 'opacity 0.7s ease, transform 8s ease-out', zIndex: 1 }} />
        ))}
        <div style={{ position: 'absolute', inset: 0, zIndex: 2, background: 'linear-gradient(120deg, rgba(7,15,27,0.78) 0%, rgba(7,15,27,0.3) 60%, rgba(7,15,27,0.05) 100%)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '48px 52px', zIndex: 3, opacity: main.fading ? 0 : 1, transform: main.fading ? 'translateY(8px)' : 'translateY(0)', transition: 'opacity 0.28s ease, transform 0.28s ease' }}>
          <p style={{ fontSize: '0.66rem', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px', fontFamily: 'Manrope, sans-serif' }}>
            <span style={{ display: 'inline-block', width: '24px', height: '2px', background: 'rgba(255,255,255,0.45)' }} />
            {ms.eyebrow}
          </p>
          <h1 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(2rem, 3.6vw, 3.2rem)', fontWeight: 800, lineHeight: 1.1, color: 'white', letterSpacing: '-0.03em', marginBottom: '16px', maxWidth: '560px', whiteSpace: 'pre-line' }}>
            {ms.title}
          </h1>
          <p style={{ fontSize: '0.94rem', color: 'rgba(255,255,255,0.85)', lineHeight: 1.65, marginBottom: '28px', maxWidth: '420px', fontFamily: 'Manrope, sans-serif' }}>
            {ms.desc}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <button onClick={() => onExploreCategory(ms.ctaPage)}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'white', color: '#0B192C', padding: '13px 26px', fontSize: '0.76rem', fontWeight: 800, letterSpacing: '0.07em', textTransform: 'uppercase', borderRadius: '2px', cursor: 'pointer', border: '2px solid white', fontFamily: 'Manrope, sans-serif', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'white'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.color = '#0B192C'; }}>
              {ms.cta} <ArrowRight size={14} />
            </button>
            <Dots count={MAIN_SLIDES.length} current={main.idx} onGo={main.goTo} />
          </div>
        </div>
        <button onClick={() => main.goTo(main.idx - 1)} style={arrowStyle('left')} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.22)'} onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'} aria-label="Previous"><ChevronLeft size={18} /></button>
        <button onClick={() => main.goTo(main.idx + 1)} style={arrowStyle('right')} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.22)'} onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'} aria-label="Next"><ChevronRight size={18} /></button>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px', background: 'rgba(255,255,255,0.08)', zIndex: 4 }}>
          <div key={`main-${main.idx}`} style={{ height: '100%', background: 'rgba(255,255,255,0.55)', animation: 'hero-progress 6s linear forwards' }} />
        </div>
      </div>

      {/* RIGHT STACKED PANELS */}
      <div style={{ display: 'flex', flexDirection: 'column', height: '600px', borderLeft: '3px solid white' }}>
        {/* TOP PANEL */}
        <div style={{ position: 'relative', overflow: 'hidden', flex: 1, cursor: 'pointer' }} onClick={() => onExploreCategory(ts.ctaPage)}>
          {TOP_PANEL_SLIDES.map((s, i) => (
            <img key={i} src={s.image} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: i === top.idx ? 1 : 0, transform: i === top.idx ? 'scale(1.0)' : 'scale(1.05)', transition: 'opacity 0.6s ease, transform 7s ease-out', zIndex: 1 }} />
          ))}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 25%, rgba(7,15,27,0.88) 100%)', zIndex: 2 }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '22px 26px', zIndex: 3, opacity: top.fading ? 0 : 1, transform: top.fading ? 'translateY(6px)' : 'translateY(0)', transition: 'opacity 0.28s ease, transform 0.28s ease' }}>
            <span style={{ fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)', display: 'block', marginBottom: '5px', fontFamily: 'Manrope, sans-serif' }}>{ts.label}</span>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'white', lineHeight: 1.25, marginBottom: '10px', whiteSpace: 'pre-line', fontFamily: 'Manrope, sans-serif' }}>{ts.title}</h3>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <button onClick={e => { e.stopPropagation(); onExploreCategory(ts.ctaPage); }} style={{ fontSize: '0.7rem', fontWeight: 700, color: 'rgba(255,255,255,0.8)', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', fontFamily: 'Manrope, sans-serif', padding: 0 }}>{ts.cta} <ArrowRight size={12} /></button>
              <Dots count={TOP_PANEL_SLIDES.length} current={top.idx} onGo={top.goTo} />
            </div>
          </div>
        </div>

        {/* BOTTOM PANEL */}
        <div style={{ position: 'relative', overflow: 'hidden', flex: 1, cursor: 'pointer', borderTop: '3px solid white' }} onClick={() => onExploreCategory(bs.ctaPage)}>
          {BOTTOM_PANEL_SLIDES.map((s, i) => (
            <img key={i} src={s.image} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: i === bottom.idx ? 1 : 0, transform: i === bottom.idx ? 'scale(1.0)' : 'scale(1.05)', transition: 'opacity 0.6s ease, transform 7s ease-out', zIndex: 1 }} />
          ))}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 25%, rgba(7,15,27,0.88) 100%)', zIndex: 2 }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '22px 26px', zIndex: 3, opacity: bottom.fading ? 0 : 1, transform: bottom.fading ? 'translateY(6px)' : 'translateY(0)', transition: 'opacity 0.28s ease, transform 0.28s ease' }}>
            <span style={{ fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)', display: 'block', marginBottom: '5px', fontFamily: 'Manrope, sans-serif' }}>{bs.label}</span>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'white', lineHeight: 1.25, marginBottom: '10px', whiteSpace: 'pre-line', fontFamily: 'Manrope, sans-serif' }}>{bs.title}</h3>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <button onClick={e => { e.stopPropagation(); onExploreCategory(bs.ctaPage); }} style={{ fontSize: '0.7rem', fontWeight: 700, color: 'rgba(255,255,255,0.8)', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', fontFamily: 'Manrope, sans-serif', padding: 0 }}>{bs.cta} <ArrowRight size={12} /></button>
              <Dots count={BOTTOM_PANEL_SLIDES.length} current={bottom.idx} onGo={bottom.goTo} />
            </div>
          </div>
        </div>
      </div>

      <style>{`@keyframes hero-progress { from { width: 0% } to { width: 100% } }`}</style>
    </section>
  );
}

export default function HeroSection({ onExploreCategory }) {
  const isMobile = useIsMobile();
  return isMobile
    ? <MobileHero onExploreCategory={onExploreCategory} />
    : <DesktopHero onExploreCategory={onExploreCategory} />;
}

function arrowStyle(side) {
  return { position: 'absolute', [side]: '16px', top: '50%', transform: 'translateY(-50%)', zIndex: 4, width: '36px', height: '36px', background: 'rgba(255,255,255,0.1)', border: '1.5px solid rgba(255,255,255,0.2)', borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', cursor: 'pointer', transition: 'background 0.2s', backdropFilter: 'blur(4px)' };
}
