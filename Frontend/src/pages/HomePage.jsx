import React from 'react';
import HeroSection from '../components/HeroSection';
import CategoryCarouselStrip from '../components/CategoryCarouselStrip';
import ValuePropsStrip from '../components/ValuePropsStrip';
import QuickFinderWidget from '../components/QuickFinderWidget';
import PropertyCardGrid from '../components/PropertyCardGrid';
import BuildingMaterialsGrid from '../components/BuildingMaterialsGrid';
import InteriorEstimatorWidget from '../components/InteriorEstimatorWidget';
import PromoBanner from '../components/PromoBanner';
import { TESTIMONIALS } from '../data/mockData';
import { Star, ArrowRight, MapPin, ShieldCheck } from 'lucide-react';
import { useResponsive } from '../hooks/useResponsive';

/* ── CATEGORY MOSAIC DATA ────────────────────────────────── */
const MOSAIC = [
  {
    id: 'buy',
    label: 'Buy Property',
    title: 'Luxury Homes & Verified Investments',
    sub: '50,000+ RERA-registered listings across 12 Indian cities.',
    cta: 'Explore Properties',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    span: 'large',
  },
  {
    id: 'interiors',
    label: 'Modular Interiors',
    title: 'Modular Kitchens & Full Home Designs',
    cta: 'Book Free 3D Design',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'construction',
    label: 'Turnkey Construction',
    title: 'Turnkey House Builders',
    cta: 'Estimate Build Cost',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'rent',
    label: 'Rent Homes',
    title: 'Zero Brokerage Verified Rentals',
    cta: 'Browse Rentals',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'materials',
    label: 'Building Materials',
    title: 'Factory Wholesale — Cement, Steel & Tiles',
    cta: 'View Wholesale Index',
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80',
  },
];

export default function HomePage({
  selectedCity,
  onNavigate,
  onSelectProperty,
  wishlist,
  onToggleWishlist,
  onAddToCart,
  onOpenAuth,
  onOpenPostProperty,
}) {
  const { isMobile, isTablet } = useResponsive();

  return (
    <div style={{ background: '#FFFFFF' }}>

      {/* ═══ 1. CINEMATIC HERO & SEARCH ENGINE ═══════════════════════════════════════════ */}
      <HeroSection onExploreCategory={onNavigate}>
        <QuickFinderWidget
          selectedCity={selectedCity}
          onFilterSubmit={f => onNavigate(f.tab || 'buy')}
        />
      </HeroSection>

      {/* ═══ 2. CATEGORY HIGHLIGHTS (MOVED FROM OLD HERO) ═════════════════════════════ */}
      <CategoryCarouselStrip onExploreCategory={onNavigate} />

      {/* ═══ 3. MARKETPLACE TRUST STRIP ══════════════════════════════════ */}
      <ValuePropsStrip />

      {/* ═══ BANNER 1: INTERIORS PROMO ═══════════════════════════════════ */}
      <PromoBanner 
        titleTop="Style Your"
        titleHighlight="Dream Home"
        titleBottom="For Less"
        subtitle="Explore Premium Decor, Furnishings & More!"
        image="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85"
        onClick={() => onNavigate('interiors')}
        badgeText="Upto 20% Off"
        themeColor="#F3EFE9"
        textColor="#0B192C"
        highlightColor="#D63384"
      />

      {/* ═══ 4. EDITORIAL CATEGORY MOSAIC ════════════════════════════════ */}
      <section className="rr-section">
        <div className="rr-container">

          <div className="section-header-row">
            <div>
              <p className="section-label">Explore Roof Ridge</p>
              <h2 className="section-h2">Everything you need to build<br />your next address.</h2>
            </div>
          </div>

          {/* Row 1: Large (col-span-2) + Medium + Medium */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : (isTablet ? '1fr 1fr' : '1.5fr 1fr 1fr'),
            gridTemplateRows: isMobile || isTablet ? 'auto' : '340px 280px',
            gap: '12px',
          }}>
            {/* Large tile — spans 2 rows */}
            <div
              style={{
                gridRow: isMobile || isTablet ? 'auto' : '1 / 3',
                gridColumn: isTablet ? '1 / -1' : 'auto',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                borderRadius: '2px',
                minHeight: isMobile || isTablet ? '340px' : 'auto',
              }}
              onClick={() => onNavigate('buy')}
              className="cat-tile"
            >
              <img src={MOSAIC[0].image} alt={MOSAIC[0].title} className="cat-tile-img" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div className="cat-tile-overlay" />
              <div className="cat-tile-content">
                <span className="cat-tile-label">{MOSAIC[0].label}</span>
                <h3 className="cat-tile-title" style={{ fontSize: '1.7rem', marginBottom: '10px' }}>{MOSAIC[0].title}</h3>
                <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.8)', marginBottom: '16px', lineHeight: '1.6' }}>{MOSAIC[0].sub}</p>
                <button className="cat-tile-cta">{MOSAIC[0].cta} <ArrowRight size={14} /></button>
              </div>
            </div>

            {/* Top-right tile */}
            <div
              style={{ position: 'relative', overflow: 'hidden', cursor: 'pointer', borderRadius: '2px', minHeight: isMobile || isTablet ? '280px' : 'auto' }}
              onClick={() => onNavigate('interiors')}
              className="cat-tile"
            >
              <img src={MOSAIC[1].image} alt={MOSAIC[1].title} className="cat-tile-img" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div className="cat-tile-overlay" />
              <div className="cat-tile-content">
                <span className="cat-tile-label">{MOSAIC[1].label}</span>
                <h3 className="cat-tile-title">{MOSAIC[1].title}</h3>
                <button className="cat-tile-cta">{MOSAIC[1].cta} <ArrowRight size={13} /></button>
              </div>
            </div>

            {/* Top-right-2 tile */}
            <div
              style={{ position: 'relative', overflow: 'hidden', cursor: 'pointer', borderRadius: '2px', minHeight: isMobile || isTablet ? '280px' : 'auto' }}
              onClick={() => onNavigate('construction')}
              className="cat-tile"
            >
              <img src={MOSAIC[2].image} alt={MOSAIC[2].title} className="cat-tile-img" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div className="cat-tile-overlay" />
              <div className="cat-tile-content">
                <span className="cat-tile-label">{MOSAIC[2].label}</span>
                <h3 className="cat-tile-title">{MOSAIC[2].title}</h3>
                <button className="cat-tile-cta">{MOSAIC[2].cta} <ArrowRight size={13} /></button>
              </div>
            </div>

            {/* Bottom-right tile 1 */}
            <div
              style={{ position: 'relative', overflow: 'hidden', cursor: 'pointer', borderRadius: '2px', minHeight: isMobile || isTablet ? '280px' : 'auto' }}
              onClick={() => onNavigate('rent')}
              className="cat-tile"
            >
              <img src={MOSAIC[3].image} alt={MOSAIC[3].title} className="cat-tile-img" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div className="cat-tile-overlay" />
              <div className="cat-tile-content">
                <span className="cat-tile-label">{MOSAIC[3].label}</span>
                <h3 className="cat-tile-title">{MOSAIC[3].title}</h3>
                <button className="cat-tile-cta">{MOSAIC[3].cta} <ArrowRight size={13} /></button>
              </div>
            </div>

            {/* Bottom-right tile 2 */}
            <div
              style={{ position: 'relative', overflow: 'hidden', cursor: 'pointer', borderRadius: '2px', minHeight: isMobile || isTablet ? '280px' : 'auto' }}
              onClick={() => onNavigate('materials')}
              className="cat-tile"
            >
              <img src={MOSAIC[4].image} alt={MOSAIC[4].title} className="cat-tile-img" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div className="cat-tile-overlay" />
              <div className="cat-tile-content">
                <span className="cat-tile-label">{MOSAIC[4].label}</span>
                <h3 className="cat-tile-title">{MOSAIC[4].title}</h3>
                <button className="cat-tile-cta">{MOSAIC[4].cta} <ArrowRight size={13} /></button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══ BANNER 2: LUXURY PRE-LAUNCH PROMO ═══════════════════════════ */}
      <PromoBanner 
        titleTop="Sleep More."
        titleHighlight="Spend Less"
        titleBottom="Up to 40% Off"
        subtitle="On Bestselling Luxury Properties"
        image="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=85"
        onClick={() => onNavigate('buy')}
        badgeText="VIP Access"
        themeColor="#E9EDF0"
        textColor="#0B192C"
        highlightColor="#E05433"
      />

      {/* ═══ 5. FEATURED RESIDENCE — LUXURY MAGAZINE SPREAD ══════════════ */}
      <section className="rr-section" style={{ paddingTop: '0', paddingBottom: '72px' }}>
        <div className="rr-container">

          <div className="featured-spread" style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row' }}>
            {/* Left: Cinematic photo */}
            <div className="featured-spread-img" style={{ flex: isMobile ? 'none' : 1.2, height: isMobile ? '300px' : 'auto', position: 'relative', overflow: 'hidden' }}>
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85"
                alt="Featured Residence"
                style={{ width: '100%', height: '100%', objectFit: 'cover', position: isMobile ? 'absolute' : 'relative' }}
              />
            </div>

            {/* Right: Editorial content */}
            <div className="featured-spread-content" style={{ flex: 1, padding: isMobile ? '32px 20px' : '0', background: isMobile ? '#0B192C' : 'transparent', color: isMobile ? 'white' : 'inherit' }}>
              <p className="featured-eyebrow">Featured Residence</p>

              <h2 className="featured-title">
                "The Address<br />You've Been<br />Looking For."
              </h2>

              <p className="featured-desc">
                Premium 3 & 4 BHK residences with private sky terraces,
                Italian marble lobbies and panoramic city views.
                RERA Approved. Instant possession available.
              </p>

              <div className="featured-price">
                ₹ 4.85 Cr <span>onwards</span>
              </div>

              <p className="featured-location">
                <MapPin size={14} />
                Golf Course Road, Sector 54, Gurugram
              </p>

              <button className="featured-cta" onClick={() => onNavigate('buy')}>
                EXPLORE RESIDENCE <ArrowRight size={15} />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ═══ 6. PROPERTY LISTINGS GRID ═══════════════════════════════════ */}
      <div style={{ borderTop: '1px solid #E4E1DA' }}>
        <PropertyCardGrid
          onSelectProperty={onSelectProperty}
          wishlist={wishlist}
          onToggleWishlist={onToggleWishlist}
        />
      </div>

      {/* ═══ BANNER 3: CONSTRUCTION PROMO ════════════════════════════════ */}
      <PromoBanner 
        titleTop="Build With"
        titleHighlight="Confidence"
        titleBottom="Turnkey Solutions"
        subtitle="Guaranteed Timelines & Pricing!"
        image="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=85"
        onClick={() => onNavigate('construction')}
        badgeText="Zero Delays"
        themeColor="#F8F7F4"
        textColor="#0B192C"
        highlightColor="#C19B76"
      />

      {/* ═══ 7. BUILDING MATERIALS — B2B ═════════════════════════════════ */}
      <div style={{ borderTop: '1px solid #E4E1DA', background: '#F8F7F4' }}>
        <BuildingMaterialsGrid onAddToCart={onAddToCart} />
      </div>

      {/* ═══ BANNER 4: B2B MATERIALS PROMO ═══════════════════════════════ */}
      <PromoBanner 
        titleTop="Factory Direct"
        titleHighlight="Wholesale Rates"
        titleBottom="On Building Materials"
        subtitle="Get Custom Quotes In 2 Hours"
        image="https://images.unsplash.com/photo-1504307651254-35680f356f27?auto=format&fit=crop&w=1200&q=85"
        onClick={() => onNavigate('materials')}
        badgeText="B2B Only"
        themeColor="#EBEBEB"
        textColor="#0B192C"
        highlightColor="#2E8B57"
      />

      {/* ═══ 8. INTERIOR ESTIMATOR ════════════════════════════════════════ */}
      <div style={{ borderTop: '1px solid #E4E1DA' }}>
        <InteriorEstimatorWidget onBookConsultation={onOpenPostProperty} />
      </div>

      {/* ═══ 9. TESTIMONIALS ═════════════════════════════════════════════ */}
      <section className="rr-section" style={{ background: '#F8F7F4', borderTop: '1px solid #E4E1DA' }}>
        <div className="rr-container">

          <div className="section-header-row" style={{ marginBottom: '32px' }}>
            <div>
              <p className="section-label">Verified Reviews</p>
              <h2 className="section-h2">Trusted by 250,000+ homeowners</h2>
              <p className="section-sub">Real experiences from verified Roof Ridge customers across India.</p>
            </div>
          </div>

          <div className="testimonial-grid">
            {TESTIMONIALS.map(t => (
              <div key={t.id} className="testimonial-card">
                <div className="testimonial-stars">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={13} fill="#0B192C" color="#0B192C" />
                  ))}
                </div>
                <p className="testimonial-quote">"{t.quote}"</p>
                <div className="testimonial-author">
                  <img src={t.avatar} alt={t.name} />
                  <div>
                    <p className="testimonial-name">{t.name}</p>
                    <p className="testimonial-role">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ═══ 10. CTA BAND — POST PROPERTY ════════════════════════════════ */}
      <section style={{
        background: '#0B192C',
        padding: '72px 0',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div className="rr-container" style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'flex-start' : 'center',
          justifyContent: 'space-between',
          gap: '32px',
        }}>
          <div>
            <p style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ display: 'inline-block', width: '24px', height: '1.5px', background: 'rgba(255,255,255,0.4)' }} />
              For Property Owners & Developers
            </p>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 800, color: 'white', letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: '10px' }}>
              List your property.<br />Reach 25 lakh+ buyers.
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.7 }}>
              Post RERA-verified listings & get direct buyer inquiries — zero brokerage.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '12px', flexShrink: 0, width: isMobile ? '100%' : 'auto' }}>
            <button
              onClick={onOpenPostProperty}
              style={{
                background: 'white', color: '#0B192C',
                padding: '14px 28px', borderRadius: '2px',
                fontWeight: 800, fontSize: '0.82rem',
                letterSpacing: '0.05em', textTransform: 'uppercase',
                display: 'flex', alignItems: 'center', gap: '8px',
                justifyContent: 'center',
                cursor: 'pointer', border: 'none',
                width: isMobile ? '100%' : 'auto',
                transition: 'background 0.2s',
              }}
            >
              POST A PROPERTY <ArrowRight size={15} />
            </button>
            <button
              onClick={() => onNavigate('b2b')}
              style={{
                background: 'transparent', color: 'rgba(255,255,255,0.8)',
                padding: '14px 24px', borderRadius: '2px',
                fontWeight: 700, fontSize: '0.8rem',
                letterSpacing: '0.03em',
                display: 'flex', alignItems: 'center', gap: '8px',
                justifyContent: 'center',
                cursor: 'pointer', border: '1.5px solid rgba(255,255,255,0.25)',
                width: isMobile ? '100%' : 'auto',
                transition: 'all 0.2s',
              }}
            >
              B2B PARTNER PORTAL <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
