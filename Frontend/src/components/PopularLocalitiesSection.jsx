import React, { useState } from 'react';
import { ArrowRight, TrendingUp, MapPin, Building2, Compass, ShieldCheck, Sparkles } from 'lucide-react';

const TABS = [
  { id: 'all', label: 'All Localities' },
  { id: 'coastal', label: 'Coastal Luxury' },
  { id: 'business', label: 'Business Hubs' },
  { id: 'townships', label: 'Townships & Suburbs' },
];

const LOCALITIES = [
  {
    id: 'bandra',
    category: 'coastal',
    name: 'Bandra West',
    tag: 'Seaside Luxury & Penthouses',
    badge: 'Most Searched',
    avgPrice: '₹ 48,500',
    unit: 'sq.ft',
    growth: '+11.4%',
    count: '340+ Verified Listings',
    yield: '3.8% Rental Yield',
    transit: 'Bandstand · Linking Rd · 12 min to BKC',
    image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=1200&q=85',
    featured: true,
  },
  {
    id: 'worli',
    category: 'coastal',
    name: 'Worli & Lower Parel',
    tag: 'Sky Mansions & Sea Link Vistas',
    badge: 'High Appreciation',
    avgPrice: '₹ 52,000',
    unit: 'sq.ft',
    growth: '+9.8%',
    count: '280+ Properties',
    yield: '4.1% Rental Yield',
    transit: 'Sea Link Promenade · High Street Phoenix',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    featured: false,
  },
  {
    id: 'bkc',
    category: 'business',
    name: 'BKC Financial Center',
    tag: 'India’s Premier Corporate & Luxury Hub',
    badge: 'Institutional Grade',
    avgPrice: '₹ 65,000',
    unit: 'sq.ft',
    growth: '+14.2%',
    count: '190+ Premium Assets',
    yield: '7.8% Commercial ROI',
    transit: 'Bullet Train Hub · Metro 3 Junction',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    featured: false,
  },
  {
    id: 'powai',
    category: 'townships',
    name: 'Powai & Hiranandani',
    tag: 'Neoclassical Townships & Lakefront',
    badge: 'Family Preferred',
    avgPrice: '₹ 28,200',
    unit: 'sq.ft',
    growth: '+8.2%',
    count: '410+ Properties',
    yield: '4.4% Rental Yield',
    transit: 'Powai Lakefront · IIT Tech Corridor',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    featured: false,
  },
  {
    id: 'thane',
    category: 'townships',
    name: 'Thane West',
    tag: 'Gated Townships & Hill Vistas',
    badge: 'Rapid Growth',
    avgPrice: '₹ 14,800',
    unit: 'sq.ft',
    growth: '+12.6%',
    count: '650+ Properties',
    yield: '4.6% Rental Yield',
    transit: 'Yeoor Hills · Metro 4 & 5 Corridors',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    featured: false,
  },
  {
    id: 'andheri',
    category: 'business',
    name: 'Andheri West & Lokhandwala',
    tag: 'Entertainment, Cafes & Metro Junction',
    badge: 'High Demand',
    avgPrice: '₹ 26,400',
    unit: 'sq.ft',
    growth: '+7.5%',
    count: '520+ Properties',
    yield: '4.5% Rental Yield',
    transit: 'Metro Lines 1, 2A & 7 · Airport 15m',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
    featured: false,
  },
];

export default function PopularLocalitiesSection({ onSelectLocality }) {
  const [activeTab, setActiveTab] = useState('all');

  const filtered = activeTab === 'all' 
    ? LOCALITIES 
    : LOCALITIES.filter(l => l.category === activeTab);

  return (
    <section style={{
      padding: '84px 0 72px 0',
      background: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFD 50%, #FFFFFF 100%)',
      position: 'relative',
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 28px' }}>
        
        {/* Section Header */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          marginBottom: '36px',
          flexWrap: 'wrap',
          gap: '24px',
        }}>
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: '#0866F5',
              fontSize: '0.76rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '8px',
            }}>
              <Compass size={15} /> PRIME MUMBAI MICRO-MARKETS
            </div>
            <h2 style={{
              fontSize: 'clamp(1.8rem, 2.8vw, 2.4rem)',
              fontWeight: 800,
              color: '#0F172A',
              letterSpacing: '-0.025em',
              lineHeight: 1.18,
              margin: '0 0 8px 0',
            }}>
              Explore High-Appreciation Localities
            </h2>
            <p style={{
              fontSize: '0.94rem',
              color: '#64748B',
              margin: 0,
              maxWidth: '620px',
              lineHeight: 1.55,
            }}>
              Verified real estate micro-markets with superior transit connectivity, social infrastructure & steady capital appreciation.
            </p>
          </div>

          {/* Locality Category Filter Tabs */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: '#EEF5FF',
            padding: '4px',
            borderRadius: '30px',
            flexWrap: 'wrap',
          }}>
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '24px',
                    background: isActive ? '#0866F5' : 'transparent',
                    color: isActive ? '#FFFFFF' : '#0866F5',
                    border: 'none',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.18s ease',
                    boxShadow: isActive ? '0 2px 8px rgba(8, 102, 245, 0.28)' : 'none',
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bento / Showcase Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gap: '24px',
        }}>
          {filtered.map((loc, idx) => {
            // First item gets 8 cols in 'all' view for dramatic Bento effect
            const isWide = activeTab === 'all' && idx === 0;
            const colSpan = isWide ? 8 : (activeTab === 'all' && idx === 1 ? 4 : 4);

            return (
              <div
                key={loc.id}
                onClick={() => onSelectLocality && onSelectLocality('buy')}
                style={{
                  gridColumn: `span ${colSpan}`,
                  position: 'relative',
                  height: isWide ? '420px' : '380px',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  boxShadow: '0 8px 24px rgba(11, 31, 68, 0.06)',
                  border: '1px solid rgba(229, 235, 244, 0.8)',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(11, 31, 68, 0.14)';
                  e.currentTarget.style.borderColor = '#0866F5';
                  const img = e.currentTarget.querySelector('img');
                  if (img) img.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(11, 31, 68, 0.06)';
                  e.currentTarget.style.borderColor = 'rgba(229, 235, 244, 0.8)';
                  const img = e.currentTarget.querySelector('img');
                  if (img) img.style.transform = 'scale(1)';
                }}
              >
                {/* Background Photography with Zoom */}
                <img
                  src={loc.image}
                  alt={loc.name}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.4s ease',
                  }}
                />

                {/* Refined Gradient Mask */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(11, 31, 68, 0.94) 0%, rgba(11, 31, 68, 0.5) 45%, rgba(11, 31, 68, 0.15) 80%, transparent 100%)',
                }} />

                {/* Top Badges */}
                <div style={{
                  position: 'absolute',
                  top: '16px',
                  left: '16px',
                  right: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  zIndex: 2,
                }}>
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.92)',
                    backdropFilter: 'blur(8px)',
                    color: '#0F172A',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    padding: '5px 12px',
                    borderRadius: '20px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  }}>
                    {loc.badge}
                  </div>

                  <div style={{
                    background: 'rgba(8, 102, 245, 0.94)',
                    backdropFilter: 'blur(8px)',
                    color: '#FFFFFF',
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    padding: '5px 12px',
                    borderRadius: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    boxShadow: '0 2px 8px rgba(8, 102, 245, 0.3)',
                  }}>
                    <TrendingUp size={13} /> {loc.growth} YoY
                  </div>
                </div>

                {/* Bottom Content Card */}
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '24px 22px',
                  zIndex: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}>
                  <div style={{
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    color: '#93C5FD',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                  }}>
                    {loc.tag}
                  </div>

                  <h3 style={{
                    fontSize: isWide ? '1.75rem' : '1.35rem',
                    fontWeight: 800,
                    color: '#FFFFFF',
                    margin: 0,
                    letterSpacing: '-0.02em',
                    lineHeight: 1.15,
                  }}>
                    {loc.name}
                  </h3>

                  <p style={{
                    fontSize: '0.8rem',
                    color: 'rgba(255, 255, 255, 0.78)',
                    margin: '0 0 6px 0',
                    lineHeight: 1.4,
                  }}>
                    {loc.transit}
                  </p>

                  {/* Pricing & Metric Chips */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '12px',
                    borderTop: '1px solid rgba(255, 255, 255, 0.16)',
                    flexWrap: 'wrap',
                    gap: '8px',
                  }}>
                    <div>
                      <div style={{ fontSize: '0.68rem', color: 'rgba(255, 255, 255, 0.6)', textTransform: 'uppercase', fontWeight: 600 }}>
                        Avg. Benchmark
                      </div>
                      <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#FFFFFF', display: 'flex', alignItems: 'baseline', gap: '3px' }}>
                        {loc.avgPrice} <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>/{loc.unit}</span>
                      </div>
                    </div>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}>
                      <span style={{
                        fontSize: '0.74rem',
                        fontWeight: 600,
                        color: '#60A5FA',
                        background: 'rgba(8, 102, 245, 0.22)',
                        padding: '4px 10px',
                        borderRadius: '12px',
                      }}>
                        {loc.yield}
                      </span>

                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: 'rgba(255, 255, 255, 0.18)',
                        backdropFilter: 'blur(6px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#FFFFFF',
                      }}>
                        <ArrowRight size={15} />
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
