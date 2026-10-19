import React, { useState } from 'react';
import { BUILDING_MATERIALS } from '../data/mockData';
import {
  ArrowRight, Star, CheckCircle, Truck, Package, ShieldCheck,
  Zap, Layers, Sparkles, Check, ChevronRight, Phone
} from 'lucide-react';
import { useResponsive } from '../hooks/useResponsive';

const CATEGORIES = ['All', 'Cement', 'TMT Steel', 'Tiles', 'Electricals', 'Plumbing'];

const DISCOUNT_TIERS = [
  { min: 50, max: 199, discount: 5, label: 'Standard Wholesale' },
  { min: 200, max: 499, discount: 10, label: 'Bulk Builder Saver' },
  { min: 500, max: 999, discount: 15, label: 'Site Mega Pack' },
  { min: 1000, max: Infinity, discount: 20, label: 'Developer Factory Rate' },
];

const FEATURED_BRANDS = [
  {
    name: 'UltraTech Cement (50kg)',
    category: 'Cement & Concrete',
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=600&q=80',
    price: '₹ 385 / bag',
    desc: 'PPC & OPC 53 Grade, 50 kg bags. India\'s #1 cement brand direct from manufacturer dispatch depots.',
    moq: 'Min 50 Bags'
  },
  {
    name: 'TATA Tiscon 500D TMT Rebars',
    category: 'Structural Steel',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80',
    price: '₹ 64,500 / ton',
    desc: 'Superior earthquake-resistant TMT rebar in 8mm–32mm diameter. Guaranteed weight calibration & test certificate.',
    moq: 'Min 2 Tons'
  },
  {
    name: 'Kajaria Vitrified Tiles (800x1600mm)',
    category: 'Tiles & Flooring',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80',
    price: '₹ 85 / sq.ft',
    desc: 'Double charged vitrified slab tiles with anti-stain nano coating. 10-year manufacturer replacement guarantee.',
    moq: 'Min 500 sq.ft'
  },
];

export default function MaterialsPage({ onAddToCart }) {
  const [category, setCategory] = useState('All');
  const [bags, setBags] = useState(250);
  const { isMobile, isTablet } = useResponsive();

  const tier = DISCOUNT_TIERS.find(t => bags >= t.min && bags <= t.max) || DISCOUNT_TIERS[0];
  const basePrice = 385;
  const discountedTotal = Math.round(bags * basePrice * (1 - tier.discount / 100));

  const filtered = category === 'All'
    ? BUILDING_MATERIALS
    : BUILDING_MATERIALS.filter(m => m.category?.toLowerCase().includes(category.toLowerCase()));

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
              <Package size={13} color="#0866F5" />
              B2B WHOLESALE BUILDING MATERIALS · DIRECT FACTORY RATES
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
            Factory-Direct Building Materials at <span style={{ color: '#0866F5' }}>Wholesale Prices</span>
          </h1>

          <p style={{
            fontSize: '12.5px',
            color: '#64748B',
            lineHeight: 1.5,
            maxWidth: '750px',
            margin: '0 0 12px 0',
          }}>
            UltraTech Cement, TATA Tiscon TMT Steel, Kajaria Tiles & Schneider Electricals at direct distributor rates with GST invoice and same-day dispatch.
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
              { label: 'Factory-Direct Pricing', desc: 'Zero markup' },
              { label: 'GST Compliant Invoices', desc: '100% ITC' },
              { label: 'Direct Site Delivery', desc: 'Crane unloading' },
              { label: 'ISI / BIS Certified', desc: 'Test reports' },
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

      {/* ── 2. BULK SAVINGS CALCULATOR ── */}
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
              Volume Pricing Tiers
            </span>
            <h2 style={{
              fontSize: isMobile ? '24px' : '34px',
              fontWeight: 800,
              color: '#0F172A',
              letterSpacing: '-0.02em',
            }}>
              Calculate Your Site Bulk Discount
            </h2>
          </div>

          <div style={{
            background: '#FFFFFF',
            border: '1px solid #E5EBF4',
            borderRadius: '20px',
            padding: isMobile ? '24px' : '36px',
            boxShadow: '0 8px 30px rgba(11, 31, 68, 0.05)',
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1.2fr 1fr',
            gap: '32px',
            alignItems: 'center',
          }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                <label style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A' }}>Order Quantity (Cement Bags)</label>
                <span style={{ fontSize: '24px', fontWeight: 800, color: '#0866F5' }}>
                  {bags.toLocaleString()} <span style={{ fontSize: '14px', color: '#64748B', fontWeight: 500 }}>bags</span>
                </span>
              </div>
              <p style={{ fontSize: '12px', color: '#64748B', marginBottom: '16px' }}>
                {(bags * 50).toLocaleString()} kg total material weight
              </p>
              <input
                type="range"
                min={50}
                max={2000}
                step={25}
                value={bags}
                onChange={e => setBags(Number(e.target.value))}
                style={{
                  width: '100%',
                  accentColor: '#0866F5',
                  height: '6px',
                  cursor: 'pointer',
                  marginBottom: '24px',
                }}
              />

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '8px',
              }}>
                {DISCOUNT_TIERS.map(t => {
                  const isActive = bags >= t.min && bags <= t.max;
                  return (
                    <div
                      key={t.label}
                      style={{
                        padding: '12px 10px',
                        borderRadius: '10px',
                        border: isActive ? '1.5px solid #0866F5' : '1px solid #E5EBF4',
                        background: isActive ? '#EEF5FF' : '#F8FAFD',
                        textAlign: 'center',
                      }}
                    >
                      <div style={{ fontSize: '18px', fontWeight: 800, color: isActive ? '#0866F5' : '#0F172A' }}>
                        {t.discount}%
                      </div>
                      <div style={{ fontSize: '10px', color: '#64748B' }}>
                        {t.label}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

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
                  Estimated Order Total (Incl. GST)
                </span>
                <div style={{ fontSize: '34px', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '6px' }}>
                  ₹ {discountedTotal.toLocaleString()}
                </div>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', marginBottom: '18px' }}>
                  You save ₹ {((bags * basePrice) - discountedTotal).toLocaleString()} with {tier.discount}% volume tier discount.
                </p>
              </div>

              <button
                onClick={() => onAddToCart && onAddToCart({ name: `UltraTech Cement (${bags} Bags)`, price: `₹ ${discountedTotal.toLocaleString()}` })}
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
                <span>Request Dispatch Quote</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. FEATURED BRANDS & CATALOG ── */}
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
              Verified Manufacturers
            </span>
            <h2 style={{
              fontSize: isMobile ? '24px' : '32px',
              fontWeight: 800,
              color: '#0F172A',
              letterSpacing: '-0.02em',
              marginBottom: '20px',
            }}>
              Wholesale Material Catalog
            </h2>

            {/* Category Filter Pills */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {CATEGORIES.map(c => {
                const isSelected = category === c;
                return (
                  <button
                    key={c}
                    onClick={() => setCategory(c)}
                    style={{
                      padding: '8px 18px',
                      borderRadius: '20px',
                      fontSize: '13px',
                      fontWeight: isSelected ? 600 : 500,
                      background: isSelected ? '#0866F5' : '#FFFFFF',
                      color: isSelected ? '#FFFFFF' : '#0F172A',
                      border: isSelected ? '1px solid #0866F5' : '1px solid #E5EBF4',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Product Cards Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : (isTablet ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)'),
            gap: '20px',
          }}>
            {filtered.map(mat => (
              <div
                key={mat.id}
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #E5EBF4',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 2px 10px rgba(11, 31, 68, 0.03)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 24px rgba(11, 31, 68, 0.06)';
                  e.currentTarget.style.borderColor = '#C7D9F5';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 10px rgba(11, 31, 68, 0.03)';
                  e.currentTarget.style.borderColor = '#E5EBF4';
                }}
              >
                <div>
                  <div style={{ position: 'relative', height: '170px', overflow: 'hidden', background: '#EEF5FF' }}>
                    <img
                      src={mat.image}
                      alt={mat.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{
                      position: 'absolute',
                      top: '10px',
                      left: '10px',
                      background: 'linear-gradient(135deg, #0866F5 0%, #0645B8 100%)',
                      color: '#FFFFFF',
                      fontSize: '11px',
                      fontWeight: 700,
                      padding: '4px 8px',
                      borderRadius: '6px',
                    }}>
                      Wholesale
                    </div>
                  </div>

                  <div style={{ padding: '18px 18px 12px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 600, color: '#64748B', display: 'block', marginBottom: '4px' }}>
                      {mat.category}
                    </span>
                    <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A', lineHeight: 1.35, marginBottom: '8px' }}>
                      {mat.name}
                    </h3>
                    <div style={{
                      display: 'inline-block',
                      background: '#F8FAFD',
                      border: '1px solid #E5EBF4',
                      padding: '3px 8px',
                      borderRadius: '6px',
                      fontSize: '11px',
                      color: '#475569',
                      fontWeight: 600,
                    }}>
                      {mat.moq}
                    </div>
                  </div>
                </div>

                <div style={{
                  padding: '12px 18px 18px',
                  borderTop: '1px solid #F1F5F9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                  <div>
                    <div style={{ fontSize: '17px', fontWeight: 800, color: '#0F172A' }}>
                      {mat.price}
                    </div>
                    {mat.originalPrice && (
                      <div style={{ fontSize: '11px', color: '#94A3B8', textDecoration: 'line-through' }}>
                        {mat.originalPrice}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => onAddToCart && onAddToCart(mat)}
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
                    Add to Cart
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
