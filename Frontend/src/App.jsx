import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
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
import ServiceBookingModal from './components/ServiceBookingModal';
import MaterialCheckoutModal from './components/MaterialCheckoutModal';

import { CITIES, PROPERTIES } from './data/mockData';
import { MessageSquare } from 'lucide-react';

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedCity, setSelectedCity] = useState(CITIES.find(c => c.id === 'mumbai') || CITIES[1] || CITIES[0]); // Mumbai default
  
  // Compute activePage from current URL path
  const currentPathSegment = location.pathname.replace(/^\//, '').split('/')[0];
  const activePage = currentPathSegment ? currentPathSegment : 'home';

  const [hubTab, setHubTab] = useState('listings');
  
  // Modals & Drawers state
  const [showCityModal, setShowCityModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showPostPropertyModal, setShowPostPropertyModal] = useState(false);
  const [showWishlistDrawer, setShowWishlistDrawer] = useState(false);
  const [showHamburger, setShowHamburger] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [searchFilters, setSearchFilters] = useState(null);

  // Dynamic booking & checkout modals
  const [serviceBooking, setServiceBooking] = useState({
    isOpen: false,
    serviceCategory: 'interiors',
    serviceName: 'Turnkey Interior Consultation',
    estimatedAmount: 0,
  });
  const [materialCheckout, setMaterialCheckout] = useState({
    isOpen: false,
    items: [],
    totalAmount: 0,
  });

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

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('rr_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('rr_user');
    localStorage.removeItem('rr_token');
  };

  const handleNavigate = (pageKey, extra = null) => {
    if (typeof extra === 'string') {
      setHubTab(extra);
    } else if (extra && typeof extra === 'object') {
      setSearchFilters(extra);
    }

    const routeMap = {
      home: '/',
      buy: '/buy',
      rent: '/rent',
      properties: '/properties',
      projects: '/projects',
      plot: '/plot',
      commercial: '/commercial',
      luxury: '/luxury',
      pg: '/pg',
      interiors: '/interiors',
      construction: '/construction',
      materials: '/materials',
      professionals: '/professionals',
      services: '/services',
      maintenance: '/maintenance',
      loans: '/loans',
      legal: '/legal',
      advice: '/advice',
      'loans-legal': '/loans-legal',
      myhub: '/myhub',
      'my-hub': '/myhub',
      experience: '/experience',
      track: '/track',
      b2b: '/b2b',
    };

    const target = routeMap[pageKey] || `/${pageKey}`;
    navigate(target);
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

  const handleOpenServiceBooking = (category = 'interiors', name = 'Turnkey Interior Consultation', amount = 0) => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    setServiceBooking({
      isOpen: true,
      serviceCategory: category,
      serviceName: name,
      estimatedAmount: amount,
    });
  };

  const handleOpenMaterialCheckout = (customItems = null, customTotal = 0) => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    const orderItems = customItems && customItems.length > 0 ? customItems : cart;
    setMaterialCheckout({
      isOpen: true,
      items: orderItems,
      totalAmount: customTotal,
    });
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#1E293B] font-sans antialiased flex flex-col justify-between">
      <div>
        {/* Single Reference Header */}
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
          onNavigate={handleNavigate}
          activePage={activePage}
        />

        {/* Dynamic Page Router Content */}
        <main className="min-h-[60vh]">
          <Routes>
            <Route 
              path="/" 
              element={
                <HomePage 
                  selectedCity={selectedCity}
                  onNavigate={handleNavigate}
                  onSelectCity={(city) => setSelectedCity(city)}
                  onSelectProperty={(prop) => setSelectedProperty(prop)}
                  wishlist={wishlist}
                  onToggleWishlist={handleToggleWishlist}
                  onAddToCart={handleAddToCart}
                  onOpenAuth={() => setShowAuthModal(true)}
                  onOpenPostProperty={() => setShowPostPropertyModal(true)}
                />
              } 
            />

            {['buy', 'rent', 'properties', 'projects', 'plot', 'commercial', 'luxury', 'pg'].map(pMode => (
              <Route 
                key={pMode}
                path={`/${pMode}`} 
                element={
                  <PropertiesPage 
                    mode={pMode === 'properties' ? 'buy' : pMode}
                    selectedCity={selectedCity}
                    searchFilters={searchFilters}
                    onSelectProperty={(prop) => setSelectedProperty(prop)}
                    wishlist={wishlist}
                    onToggleWishlist={handleToggleWishlist}
                  />
                } 
              />
            ))}

            <Route 
              path="/interiors" 
              element={
                <InteriorsPage 
                  onBookConsultation={(styleName, budget) => {
                    const amount = typeof budget === 'string' 
                      ? (parseInt(budget.replace(/[^0-9]/g, '')) * (budget.includes('Lakh') ? 100000 : 1)) 
                      : (budget || 850000);
                    handleOpenServiceBooking('interiors', styleName || 'Full Home Turnkey Interior Design', amount);
                  }}
                />
              } 
            />

            <Route 
              path="/construction" 
              element={
                <ConstructionPage 
                  onOpenAuth={() => setShowAuthModal(true)}
                  onBookConstruction={(category, name, amount) => {
                    handleOpenServiceBooking('construction', name || 'Residential Turnkey Construction', amount || 2500000);
                  }}
                />
              } 
            />

            <Route 
              path="/materials" 
              element={
                <MaterialsPage 
                  onAddToCart={handleAddToCart}
                />
              } 
            />

            <Route 
              path="/professionals" 
              element={
                <ProfessionalsPage 
                  selectedCity={selectedCity}
                />
              } 
            />

            <Route 
              path="/services" 
              element={
                <HomeServicesPage 
                  selectedCity={selectedCity}
                  onOpenAuth={() => setShowAuthModal(true)}
                  onBookService={(cat, name, price) => {
                    const amount = typeof price === 'string' ? parseInt(price.replace(/[^0-9]/g, '')) || 3499 : (price || 3499);
                    handleOpenServiceBooking(cat || 'home_services', name, amount);
                  }}
                />
              } 
            />

            <Route 
              path="/maintenance" 
              element={
                <MaintenancePage 
                  onOpenAuth={() => setShowAuthModal(true)}
                  onBookMaintenance={(cat, name, price) => {
                    const amount = typeof price === 'string' ? parseInt(price.replace(/[^0-9]/g, '')) || 1499 : (price || 1499);
                    handleOpenServiceBooking(cat || 'maintenance', name, amount);
                  }}
                />
              } 
            />

            {['loans', 'legal', 'advice', 'loans-legal'].map(lMode => (
              <Route 
                key={lMode}
                path={`/${lMode}`} 
                element={
                  <LoansLegalPage 
                    mode={lMode === 'loans-legal' ? 'loans' : lMode}
                    onOpenAuth={() => setShowAuthModal(true)}
                  />
                } 
              />
            ))}

            <Route 
              path="/myhub" 
              element={
                <MyPropertyHubPage 
                  onOpenAuth={() => setShowAuthModal(true)}
                  onOpenPostProperty={() => setShowPostPropertyModal(true)}
                  onNavigate={handleNavigate}
                  initialTab={hubTab}
                />
              } 
            />

            <Route 
              path="/my-hub" 
              element={
                <MyPropertyHubPage 
                  onOpenAuth={() => setShowAuthModal(true)}
                  onOpenPostProperty={() => setShowPostPropertyModal(true)}
                  onNavigate={handleNavigate}
                  initialTab={hubTab}
                />
              } 
            />

            <Route 
              path="/experience" 
              element={
                <ExperienceHubsPage 
                  selectedCity={selectedCity}
                />
              } 
            />

            <Route 
              path="/track" 
              element={<TrackProjectPage />} 
            />

            <Route 
              path="/b2b" 
              element={
                <B2BPartnerPage 
                  onOpenAuth={() => setShowAuthModal(true)}
                />
              } 
            />

            {/* Catch-all fallback */}
            <Route 
              path="*" 
              element={
                <HomePage 
                  selectedCity={selectedCity}
                  onNavigate={handleNavigate}
                  onSelectCity={(city) => setSelectedCity(city)}
                  onSelectProperty={(prop) => setSelectedProperty(prop)}
                  wishlist={wishlist}
                  onToggleWishlist={handleToggleWishlist}
                  onAddToCart={handleAddToCart}
                  onOpenAuth={() => setShowAuthModal(true)}
                  onOpenPostProperty={() => setShowPostPropertyModal(true)}
                />
              } 
            />
          </Routes>
        </main>
      </div>

      {/* Main Global Footer */}
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
        user={user}
        onLogout={handleLogout}
      />

      {/* WhatsApp FAB — above bottom nav on mobile */}
      <div className="whatsapp-fab">
        <a 
          href="https://wa.me/919999999999?text=Hi%20Roof%20Ridge%20Team%2C%20I%20want%20to%20inquire%20about%20properties%2C%20construction%20and%20interior%20services." 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ width: '50px', height: '50px', background: 'linear-gradient(135deg, #0866F5 0%, #0645B8 100%)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 24px rgba(8, 102, 245, 0.35)', color: 'white', border: '1.5px solid rgba(255,255,255,0.4)' }}
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
          onProceedToCheckout={() => {
            setShowWishlistDrawer(false);
            handleOpenMaterialCheckout(cart);
          }}
        />
      )}

      {/* Service Appointment Booking Modal */}
      {serviceBooking.isOpen && (
        <ServiceBookingModal 
          isOpen={serviceBooking.isOpen}
          onClose={() => setServiceBooking(prev => ({ ...prev, isOpen: false }))}
          serviceCategory={serviceBooking.serviceCategory}
          serviceName={serviceBooking.serviceName}
          estimatedAmount={serviceBooking.estimatedAmount}
          user={user}
          onBookingSuccess={() => {
            // Refreshes hub data
          }}
          onNavigateToHub={() => {
            setServiceBooking(prev => ({ ...prev, isOpen: false }));
            handleNavigate('myhub', 'bookings');
          }}
        />
      )}

      {/* Wholesale Material Checkout Modal */}
      {materialCheckout.isOpen && (
        <MaterialCheckoutModal 
          isOpen={materialCheckout.isOpen}
          onClose={() => setMaterialCheckout(prev => ({ ...prev, isOpen: false }))}
          items={materialCheckout.items}
          totalAmount={materialCheckout.totalAmount}
          user={user}
          onOrderSuccess={() => {
            setCart([]);
          }}
          onNavigateToHub={() => {
            setMaterialCheckout(prev => ({ ...prev, isOpen: false }));
            handleNavigate('myhub', 'bookings');
          }}
        />
      )}
    </div>
  );
}
