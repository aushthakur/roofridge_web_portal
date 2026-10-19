import React from 'react';
import HeroSection from '../components/HeroSection';
import QuickFinderWidget from '../components/QuickFinderWidget';
import CategoryCarouselStrip from '../components/CategoryCarouselStrip';
import PropertyCardGrid from '../components/PropertyCardGrid';
import ValuePropsStrip from '../components/ValuePropsStrip';
import PopularLocalitiesSection from '../components/PopularLocalitiesSection';
import EcosystemServicesSection from '../components/EcosystemServicesSection';
import InteriorEstimatorWidget from '../components/InteriorEstimatorWidget';
import BuildingMaterialsGrid from '../components/BuildingMaterialsGrid';
import OwnerListingCtaBanner from '../components/OwnerListingCtaBanner';
import TestimonialsSection from '../components/TestimonialsSection';
import MobileAppPromoSection from '../components/MobileAppPromoSection';

export default function HomePage({
  selectedCity,
  onNavigate,
  onSelectCity,
  onSelectProperty,
  wishlist,
  onToggleWishlist,
  onAddToCart,
  onOpenPostProperty,
  onOpenAuth,
}) {
  return (
    <div style={{ background: '#FFFFFF', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>

      {/* ═══ 1. SCENIC HERO WITH LEFT HEADLINE & FLOATING SEARCH ═══════════════ */}
      <HeroSection
        onExploreCategory={onNavigate}
      >
        <QuickFinderWidget
          selectedCity={selectedCity}
          onCityChange={onSelectCity}
          onFilterSubmit={(f) => {
            const targetMode = f.tab === 'new_projects' ? 'projects' : (f.tab || 'buy');
            onNavigate(targetMode, f);
          }}
        />
      </HeroSection>

      {/* ═══ 2. HORIZONTAL ROW OF 8 CATEGORY CARDS ════════════════════════════ */}
      <CategoryCarouselStrip onExploreCategory={onNavigate} />

      {/* ═══ 3. FEATURED PROPERTIES IN MUMBAI (4-COLUMN GRID) ══════════════════ */}
      <PropertyCardGrid
        onSelectProperty={onSelectProperty}
        wishlist={wishlist}
        onToggleWishlist={onToggleWishlist}
        onSeeAll={() => onNavigate('buy')}
      />

      {/* ═══ 4. WHY CHOOSE ROOFRIDGE (5 BENEFITS + SLOGAN) ════════════════════ */}
      <ValuePropsStrip />

      {/* ═══ 5. PRIME MUMBAI LOCALITIES & MICRO-MARKETS ════════════════════════ */}
      <PopularLocalitiesSection onSelectLocality={onNavigate} />

      {/* ═══ 6. ALL-IN-ONE REAL ESTATE & LIVING ECOSYSTEM ═════════════════════ */}
      <EcosystemServicesSection onNavigate={onNavigate} />

      {/* ═══ 7. MODULAR INTERIOR COST ESTIMATOR WIDGET ════════════════════════ */}
      <InteriorEstimatorWidget onBookConsultation={onOpenPostProperty} />

      {/* ═══ 8. FACTORY-DIRECT WHOLESALE BUILDING MATERIALS ═══════════════════ */}
      <BuildingMaterialsGrid onAddToCart={onAddToCart} />

      {/* ═══ 9. ZERO BROKERAGE OWNER LISTING CTA BANNER ═══════════════════════ */}
      <OwnerListingCtaBanner
        onOpenPostProperty={onOpenPostProperty}
        onNavigate={onNavigate}
      />

      {/* ═══ 10. VERIFIED CUSTOMER TESTIMONIALS ═══════════════════════════════ */}
      <TestimonialsSection />

      {/* ═══ 11. ROOFRIDGE MOBILE APP PROMO STRIP ═════════════════════════════ */}
      <MobileAppPromoSection />

    </div>
  );
}
