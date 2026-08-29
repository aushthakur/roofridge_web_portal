import React, { useState } from 'react';
import { BUILDING_MATERIALS } from '../data/mockData';
import { ArrowRight, Star, CheckCircle, Truck, Package, ShieldCheck, Zap } from 'lucide-react';
import { useResponsive } from '../hooks/useResponsive';

const CATEGORIES = ['All', 'Cement', 'TMT Steel', 'Tiles', 'Electricals', 'Plumbing'];
const DISCOUNT_TIERS = [
  { min: 50, max: 199, discount: 5, label: 'Standard' },
  { min: 200, max: 499, discount: 10, label: 'Bulk Saver' },
  { min: 500, max: 999, discount: 15, label: 'Site Pack' },
  { min: 1000, max: Infinity, discount: 20, label: 'Developer Rate' },
];

const FEATURED_BRANDS = [
  { name: 'UltraTech Cement', category: 'Cement', image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=600&q=80', price: '₹ 340 / bag', desc: "PPC & OPC 53 Grade, 50 kg bags. India's #1 cement brand. Direct from authorised distributor.", moq: 'Min 50 Bags' },
  { name: 'TATA Tiscon 500D TMT', category: 'TMT Steel', image: 'https://images.unsplash.com/photo-1590247813693-5541d1c609fd?auto=format&fit=crop&w=600&q=80', price: '₹ 58,500 / MT', desc: 'Superior earthquake-resistant TMT rebar in 8mm–32mm diameter. TATA quality guaranteed.', moq: 'Min 1 MT' },
  { name: 'Kajaria Vitero Tiles', category: 'Tiles', image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=600&q=80', price: '₹ 68 / sq.ft', desc: 'Double charged vitrified tiles in 600x600mm & 800x800mm. 5-year manufacturer warranty.', moq: 'Min 200 sq.ft' },
];

export default function MaterialsPage({ onAddToCart }) {
  const [category, setCategory] = useState('All');
  const [bags, setBags] = useState(200);
  const { isMobile, isTablet } = useResponsive();

  const tier = DISCOUNT_TIERS.find(t => bags >= t.min && bags <= t.max) || DISCOUNT_TIERS[0];
  const basePrice = 385;
  const discountedTotal = Math.round(bags * basePrice * (1 - tier.discount / 100));
  const sliderPct = ((bags - 50) / (2000 - 50)) * 100;

  const filtered = category === 'All' ? BUILDING_MATERIALS : BUILDING_MATERIALS.filter(m => m.category?.toLowerCase().includes(category.toLowerCase()));

  return (
    <div className="animate-fade" style={{ background: '#FFFFFF' }}>

      {/* ── HERO ── */}
      <div style={{ position: 'relative', background: '#0B192C', overflow: 'hidden', padding: '64px 0 52px' }}>
        <img src="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1800&q=70" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.18 }} />
        <div className="rr-container" style={{ position: 'relative', zIndex: 2 }}>
          <p style={eyebrow}><span style={{ display: 'inline-block', width: '24px', height: '2px', background: 'rgba(255,255,255,0.3)' }} /> B2B Wholesale Building Materials</p>
          <h1 style={heroH1}>Factory-Direct Building Materials<br />at Wholesale Prices</h1>
          <p style={heroSub}>UltraTech Cement, TATA Tiscon TMT Steel, Kajaria Tiles & Schneider Electricals at direct factory rates — GST invoice, same-day dispatch across 35+ cities.</p>
          <div style={{ display: 'flex', gap: '24px', marginTop: '28px', flexWrap: 'wrap' }}>
            {['Factory-Direct Pricing', 'GST Compliant Invoices', 'Site Delivery — 35 Cities', 'ISI/BIS Certified Stocks'].map(t => (
              <div key={t} style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                <CheckCircle size={14} style={{ color: 'rgba(255,255,255,0.55)' }} />
                <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.65)', fontFamily: 'Manrope, sans-serif' }}>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── BULK DISCOUNT CALCULATOR ── */}
      <section style={{ background: '#F8F7F4', borderBottom: '1px solid #E4E1DA', padding: '64px 0' }}>
        <div className="rr-container">
          <div style={{ marginBottom: '28px' }}>
            <p className="section-label">Bulk Discount Calculator</p>
            <h2 className="section-h2">Calculate Your Site Order Discount</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : (isTablet ? '1fr 1fr' : '1.5fr 1fr 1fr 1fr'), gap: '2px', background: '#E4E1DA', border: '1px solid #E4E1DA', borderRadius: '2px', overflow: 'hidden' }}>

            {/* Slider */}
            <div style={{ background: 'white', padding: '32px 28px' }}>
              <p style={fLabel}>Order Quantity (Cement Bags)</p>
              <p style={{ fontSize: '2rem', fontWeight: 800, color: '#0B192C', letterSpacing: '-0.04em', fontFamily: 'Manrope, sans-serif', lineHeight: 1, marginBottom: '2px' }}>{bags.toLocaleString()} <span style={{ fontSize: '0.9rem', fontWeight: 500, color: '#9CA3AF' }}>bags</span></p>
              <p style={{ fontSize: '0.72rem', color: '#9CA3AF', fontFamily: 'Manrope, sans-serif', marginBottom: '16px' }}>{(bags * 50).toLocaleString()} kg total weight</p>
              <input type="range" min={50} max={2000} step={50} value={bags} onChange={e => setBags(Number(e.target.value))}
                style={{ width: '100%', appearance: 'none', height: '3px', borderRadius: '2px', outline: 'none', cursor: 'pointer', background: `linear-gradient(to right, #0B192C ${sliderPct}%, #DDD8D0 ${sliderPct}%)` }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
                <span style={{ fontSize: '0.65rem', color: '#9CA3AF', fontFamily: 'Manrope, sans-serif' }}>50 bags</span>
                <span style={{ fontSize: '0.65rem', color: '#9CA3AF', fontFamily: 'Manrope, sans-serif' }}>2,000 bags</span>
              </div>
            </div>

            {/* Discount tiers */}
            {DISCOUNT_TIERS.map(t => (
              <div key={t.label} style={{ background: bags >= t.min && bags <= t.max ? '#0B192C' : 'white', padding: '28px 22px', transition: 'background 0.2s' }}>
                <p style={{ fontSize: '0.62rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: bags >= t.min && bags <= t.max ? 'rgba(255,255,255,0.45)' : '#9CA3AF', fontFamily: 'Manrope, sans-serif', marginBottom: '8px' }}>{t.label}</p>
                <p style={{ fontSize: '1.8rem', fontWeight: 800, color: bags >= t.min && bags <= t.max ? 'white' : '#0B192C', letterSpacing: '-0.04em', fontFamily: 'Manrope, sans-serif', lineHeight: 1, marginBottom: '4px' }}>{t.discount}% <span style={{ fontSize: '0.85rem', fontWeight: 500, opacity: 0.5 }}>off</span></p>
                <p style={{ fontSize: '0.75rem', color: bags >= t.min && bags <= t.max ? 'rgba(255,255,255,0.55)' : '#6B6B6B', fontFamily: 'Manrope, sans-serif' }}>{t.min}–{t.max === Infinity ? '2000+' : t.max} bags</p>
                {bags >= t.min && bags <= t.max && (
                  <div style={{ marginTop: '14px', paddingTop: '14px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                    <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', fontFamily: 'Manrope, sans-serif' }}>Your Total</p>
                    <p style={{ fontSize: '1.1rem', fontWeight: 800, color: 'white', fontFamily: 'Manrope, sans-serif' }}>₹ {discountedTotal.toLocaleString()}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED BRANDS ── */}
      <section className="rr-section">
        <div className="rr-container">
          <div className="section-header-row" style={{ marginBottom: '28px' }}>
            <div>
              <p className="section-label">Top Brand Partners</p>
              <h2 className="section-h2">Factory-Authorised Wholesale Brands</h2>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '1px', background: '#E4E1DA', border: '1px solid #E4E1DA', borderRadius: '2px', overflow: 'hidden', marginBottom: '48px' }}>
            {FEATURED_BRANDS.map(b => (
              <div key={b.name} style={{ background: 'white', display: 'flex', flexDirection: 'column', cursor: 'pointer', transition: 'background 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.background = '#FAFAF8'}
                onMouseLeave={e => e.currentTarget.style.background = 'white'}>
                <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden' }}>
                  <img src={b.image} alt={b.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'} />
                  <span style={{ position: 'absolute', top: '10px', left: '10px', background: '#0B192C', color: 'white', fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '4px 8px', borderRadius: '2px', fontFamily: 'Manrope, sans-serif' }}>Factory Direct</span>
                </div>
                <div style={{ padding: '24px 22px', flex: 1 }}>
                  <p style={{ fontSize: '0.62rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9CA3AF', fontFamily: 'Manrope, sans-serif', marginBottom: '6px' }}>{b.category}</p>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0B192C', fontFamily: 'Manrope, sans-serif', marginBottom: '8px' }}>{b.name}</h3>
                  <p style={{ fontSize: '0.8rem', color: '#6B6B6B', lineHeight: 1.6, fontFamily: 'Manrope, sans-serif', marginBottom: '14px' }}>{b.desc}</p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #F0EDE7', paddingTop: '14px' }}>
                    <div>
                      <p style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0B192C', letterSpacing: '-0.02em', fontFamily: 'Manrope, sans-serif' }}>{b.price}</p>
                      <p style={{ fontSize: '0.68rem', color: '#9CA3AF', fontFamily: 'Manrope, sans-serif' }}>{b.moq}</p>
                    </div>
                    <button style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.74rem', fontWeight: 700, color: '#0B192C', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Manrope, sans-serif', borderBottom: '1.5px solid #0B192C', paddingBottom: '1px' }}>
                      Request Quote <ArrowRight size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Category filter */}
          <div style={{ display: 'flex', gap: '4px', marginBottom: '20px', flexWrap: 'wrap' }}>
            {CATEGORIES.map(c => (
              <button key={c} onClick={() => setCategory(c)}
                style={{ padding: '8px 16px', border: category === c ? 'none' : '1.5px solid #E4E1DA', borderRadius: '2px', fontSize: '0.78rem', fontWeight: category === c ? 700 : 400, cursor: 'pointer', background: category === c ? '#0B192C' : 'white', color: category === c ? 'white' : '#6B6B6B', fontFamily: 'Manrope, sans-serif', transition: 'all 0.15s' }}>
                {c}
              </button>
            ))}
          </div>

          {/* Product grid */}
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : (isTablet ? 'repeat(3, 1fr)' : 'repeat(4, 1fr)'), gap: '1px', background: '#E4E1DA', border: '1px solid #E4E1DA', borderRadius: '2px', overflow: 'hidden' }}>
            {filtered.map(mat => (
              <div key={mat.id} style={{ background: 'white', display: 'flex', flexDirection: 'column', cursor: 'pointer', transition: 'background 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.background = '#FAFAF8'}
                onMouseLeave={e => e.currentTarget.style.background = 'white'}>
                <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden', background: '#F8F7F4' }}>
                  <img src={mat.image} alt={mat.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'} />
                  <span style={{ position: 'absolute', top: '10px', left: '10px', background: '#0B192C', color: 'white', fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '4px 8px', borderRadius: '2px', fontFamily: 'Manrope, sans-serif' }}>Wholesale</span>
                  <span style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(255,255,255,0.92)', fontSize: '0.7rem', fontWeight: 700, color: '#0B192C', padding: '3px 8px', borderRadius: '2px', fontFamily: 'Manrope, sans-serif', display: 'flex', alignItems: 'center', gap: '3px' }}>
                    <Star size={10} fill="#0B192C" color="#0B192C" />{mat.rating}
                  </span>
                </div>
                <div style={{ padding: '18px 18px 20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <p style={{ fontSize: '0.62rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9CA3AF', fontFamily: 'Manrope, sans-serif', marginBottom: '5px' }}>{mat.category}</p>
                  <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0B192C', fontFamily: 'Manrope, sans-serif', lineHeight: 1.3, marginBottom: '8px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{mat.name}</h3>
                  <span style={{ display: 'inline-block', fontSize: '0.68rem', fontWeight: 600, color: '#6B6B6B', background: '#F8F7F4', border: '1px solid #E4E1DA', padding: '3px 8px', borderRadius: '2px', fontFamily: 'Manrope, sans-serif', marginBottom: '14px', alignSelf: 'flex-start' }}>{mat.moq}</span>
                  <div style={{ borderTop: '1px solid #F0EDE7', paddingTop: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
                    <div>
                      <p style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0B192C', fontFamily: 'Manrope, sans-serif', lineHeight: 1 }}>{mat.price}</p>
                      <p style={{ fontSize: '0.7rem', color: '#9CA3AF', textDecoration: 'line-through', fontFamily: 'Manrope, sans-serif' }}>{mat.originalPrice}</p>
                    </div>
                    <button onClick={() => onAddToCart(mat)}
                      style={{ display: 'flex', alignItems: 'center', gap: '5px', background: '#0B192C', color: 'white', border: 'none', borderRadius: '2px', padding: '8px 12px', fontSize: '0.72rem', fontWeight: 700, cursor: 'pointer', fontFamily: 'Manrope, sans-serif', transition: 'background 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.background = '#162B48'}
                      onMouseLeave={e => e.currentTarget.style.background = '#0B192C'}>
                      Request Quote <ArrowRight size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`input[type='range']::-webkit-slider-thumb { -webkit-appearance: none; width: 16px; height: 16px; border-radius: 50%; background: #0B192C; border: 2px solid white; box-shadow: 0 0 0 1.5px #0B192C; cursor: pointer; }`}</style>
    </div>
  );
}

const eyebrow = { fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', fontFamily: 'Manrope, sans-serif' };
const heroH1 = { fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', fontWeight: 800, color: 'white', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '14px', maxWidth: '700px' };
const heroSub = { fontSize: '0.92rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.65, maxWidth: '520px', fontFamily: 'Manrope, sans-serif' };
const fLabel = { fontSize: '0.62rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9CA3AF', fontFamily: 'Manrope, sans-serif', marginBottom: '10px' };
