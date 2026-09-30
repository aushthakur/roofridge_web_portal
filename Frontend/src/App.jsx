import React, { useState, useEffect } from 'react';
import AnnouncementBar from './components/AnnouncementBar';
import TopUtilityBar from './components/TopUtilityBar';
import MainHeader from './components/MainHeader';
import CategoryNavbar from './components/CategoryNavbar';
import Footer from './components/Footer';
import { MobileBottomNav, HamburgerDrawer } from './components/MobileNav';

// Pages
import HomePage from './pages/HomePage';
import PropertiesPage from './pages/PropertiesPage';
import InteriorsPage from './pages/InteriorsPage';
import MaterialsPage from './pages/MaterialsPage';
import ConstructionPage from './pages/ConstructionPage';
import ProfessionalsPage from './pages/ProfessionalsPage';
import HomeServicesPage from './pages/HomeServicesPage';
import MaintenancePage from './pages/MaintenancePage';
import LoansLegalPage from './pages/LoansLegalPage';
import MyPropertyHubPage from './pages/MyPropertyHubPage';
import ExperienceHubsPage from './pages/ExperienceHubsPage';
import TrackProjectPage from './pages/TrackProjectPage';
import B2BPartnerPage from './pages/B2BPartnerPage';

// Modals
import PropertyDetailModal from './components/PropertyDetailModal';
import PostPropertyModal from './components/PostPropertyModal';
import CitySelectorModal from './components/CitySelectorModal';
import AuthModal from './components/AuthModal';
import WishlistDrawer from './components/WishlistDrawer';

import { CITIES, PROPERTIES } from './data/mockData';
import { MessageSquare } from 'lucide-react';

export default function App() {
  const [selectedCity, setSelectedCity] = useState(CITIES[0]); // Delhi NCR
  const [activePage, setActivePage] = useState('home'); // 'home', 'buy', 'rent', 'interiors', 'construction', 'materials', 'professionals', 'maintenance', 'legal', 'myhub', 'experience', 'track', 'b2b'
  
  // Modals & Drawers state
  const [showCityModal, setShowCityModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showPostPropertyModal, setShowPostPropertyModal] = useState(false);
  const [showWishlistDrawer, setShowWishlistDrawer] = useState(false);
  const [showHamburger, setShowHamburger] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);

  // Collections state
  const [wishlist, setWishlist] = useState(['prop-101']);
  const [cart, setCart] = useState([]);

  // User State
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('rr_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [hasSeenInitialAuth, setHasSeenInitialAuth] = useState(false);

  useEffect(() => {
    if (!user && !hasSeenInitialAuth) {
      setShowAuthModal(true);
      setHasSeenInitialAuth(true);
    }
  }, [user, hasSeenInitialAuth]);

  useEffect(() => {
    if (user) {
      const handlePopState = (e) => {
        const confirmLeave = window.confirm("You are currently logged in. Are you sure you want to go back and leave the platform?");
        if (!confirmLeave) {
          window.history.pushState(null, '', window.location.pathname);
        }
      };
      window.history.pushState(null, '', window.location.pathname);
      window.addEventListener('popstate', handlePopState);
      return () => window.removeEventListener('popstate', handlePopState);
    }
  }, [user]);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('rr_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('rr_user');
  };

  const handleNavigate = (pageKey) => {
    setActivePage(pageKey);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleWishlist = (id) => {
    setWishlist(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleAddToCart = (materialItem) => {
    setCart(prev => [...prev, materialItem]);
    setShowWishlistDrawer(true);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#1E293B] font-sans antialiased flex flex-col justify-between">
      <div>
        {/* Top Announcement Bar */}
        <AnnouncementBar onOpenDeal={() => setShowPostPropertyModal(true)} />

        {/* Utility Bar */}
        <TopUtilityBar 
          selectedCity={selectedCity} 
          onOpenCity={() => setShowCityModal(true)}
          onNavigate={handleNavigate}
        />

        {/* Main Header */}
        <MainHeader 
          selectedCity={selectedCity}
          onOpenCity={() => setShowCityModal(true)}
          onOpenAuth={() => setShowAuthModal(true)}
          onOpenPostProperty={() => setShowPostPropertyModal(true)}
          wishlistCount={wishlist.length}
          inquiryCount={cart.length}
          onSearch={(term) => {
            handleNavigate('buy');
          }}
          onOpenWishlist={() => setShowWishlistDrawer(true)}
          onNavigateHome={() => handleNavigate('home')}
          onOpenHamburger={() => setShowHamburger(true)}
          user={user}
          onLogout={handleLogout}
        />

        {/* Category Mega Navbar — desktop only */}
        <CategoryNavbar 
          activeCategory={activePage}
          onSelectCategory={handleNavigate}
        />

        {/* Dynamic Page Router Content */}
        <main className="min-h-[60vh]">
          {activePage === 'home' && (
            <HomePage 
              selectedCity={selectedCity}
              onNavigate={handleNavigate}
              onSelectProperty={(prop) => setSelectedProperty(prop)}
              wishlist={wishlist}
              onToggleWishlist={handleToggleWishlist}
              onAddToCart={handleAddToCart}
              onOpenAuth={() => setShowAuthModal(true)}
              onOpenPostProperty={() => setShowPostPropertyModal(true)}
            />
          )}

          {(activePage === 'buy' || activePage === 'rent' || activePage === 'luxury') && (
            <PropertiesPage 
              mode={activePage}
              selectedCity={selectedCity}
              onSelectProperty={(prop) => setSelectedProperty(prop)}
              wishlist={wishlist}
              onToggleWishlist={handleToggleWishlist}
            />
          )}

          {activePage === 'interiors' && (
            <InteriorsPage 
              onBookConsultation={() => setShowPostPropertyModal(true)}
            />
          )}

          {activePage === 'construction' && (
            <ConstructionPage 
              onOpenAuth={() => setShowAuthModal(true)}
            />
          )}

          {activePage === 'materials' && (
            <MaterialsPage 
              onAddToCart={handleAddToCart}
            />
          )}

          {activePage === 'professionals' && (
            <ProfessionalsPage 
              selectedCity={selectedCity}
            />
          )}

          {activePage === 'services' && (
            <HomeServicesPage 
              selectedCity={selectedCity}
            />
          )}

          {activePage === 'maintenance' && (
            <MaintenancePage 
              onOpenAuth={() => setShowAuthModal(true)}
            />
          )}

          {(activePage === 'loans' || activePage === 'legal') && (
            <LoansLegalPage 
              onOpenAuth={() => setShowAuthModal(true)}
            />
          )}

          {activePage === 'myhub' && (
            <MyPropertyHubPage 
              onOpenAuth={() => setShowAuthModal(true)}
            />
          )}

          {activePage === 'experience' && (
            <ExperienceHubsPage 
              selectedCity={selectedCity}
            />
          )}

          {activePage === 'track' && (
            <TrackProjectPage />
          )}

          {activePage === 'b2b' && (
            <B2BPartnerPage 
              onOpenAuth={() => setShowAuthModal(true)}
            />
          )}
        </main>
      </div>

      {/* Footer — hidden on mobile (replaced by bottom nav) */}
      <div className="desktop-footer">
        <Footer onNavigate={handleNavigate} />
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav
        activePage={activePage}
        onNavigate={handleNavigate}
        onOpenHamburger={() => setShowHamburger(true)}
        wishlistCount={wishlist.length}
        inquiryCount={cart.length}
      />

      {/* Hamburger Side Drawer */}
      <HamburgerDrawer
        isOpen={showHamburger}
        onClose={() => setShowHamburger(false)}
        onNavigate={handleNavigate}
        activePage={activePage}
        selectedCity={selectedCity}
        onOpenCity={() => setShowCityModal(true)}
        onOpenAuth={() => setShowAuthModal(true)}
        onOpenPostProperty={() => setShowPostPropertyModal(true)}
        onOpenWishlist={() => setShowWishlistDrawer(true)}
        wishlistCount={wishlist.length}
        inquiryCount={cart.length}
      />

      {/* WhatsApp FAB — above bottom nav on mobile */}
      <div className="whatsapp-fab">
        <a 
          href="https://wa.me/919999999999?text=Hi%20Roof%20Ridge%20Team%2C%20I%20want%20to%20inquire%20about%20properties%2C%20construction%20and%20interior%20services." 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ width: '48px', height: '48px', background: '#0B192C', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 24px rgba(0,0,0,0.25)', color: 'white', border: '1.5px solid rgba(255,255,255,0.3)' }}
          title="WhatsApp Concierge"
        >
          <MessageSquare size={22} color="white" />
        </a>
      </div>

      {/* Modals & Drawers */}
      {selectedProperty && (
        <PropertyDetailModal 
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
        />
      )}

      {showPostPropertyModal && (
        <PostPropertyModal 
          selectedCity={selectedCity}
          onClose={() => setShowPostPropertyModal(false)}
        />
      )}

      {showCityModal && (
        <CitySelectorModal 
          selectedCity={selectedCity}
          onSelectCity={(city) => setSelectedCity(city)}
          onClose={() => setShowCityModal(false)}
        />
      )}

      {showAuthModal && (
        <AuthModal 
          onClose={() => setShowAuthModal(false)}
          onLogin={handleLogin}
        />
      )}

      {showWishlistDrawer && (
        <WishlistDrawer 
          wishlist={wishlist}
          cart={cart}
          onClose={() => setShowWishlistDrawer(false)}
          onRemoveWishlist={handleToggleWishlist}
          onRemoveCart={(idx) => setCart(cart.filter((_, i) => i !== idx))}
        />
      )}
    </div>
  );
}
