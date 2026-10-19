import React from 'react';
import {
  Home, Building2, Sofa, Hammer, Package, Users, Wrench, CreditCard,
  X, MapPin, Phone, Award, Smartphone, Briefcase, Eye, Navigation,
  Heart, ShoppingBag, User, PlusCircle, ArrowRight, ChevronRight
} from 'lucide-react';

/* ─── Bottom Nav items (5 max — thumb-reach zone) ─────────── */
const BOTTOM_NAV = [
  { id: 'home',        label: 'Home',      icon: Home },
  { id: 'buy',         label: 'Buy',       icon: Building2 },
  { id: 'interiors',   label: 'Interiors', icon: Sofa },
  { id: 'materials',   label: 'Materials', icon: Package },
  { id: '_menu',       label: 'More',      icon: Users },   // triggers hamburger
];

/* ─── Hamburger drawer — grouped sections ──────────────────── */
const MENU_SECTIONS = [
  {
    heading: 'Properties',
    items: [
      { id: 'buy',         label: 'Buy Property',        icon: Building2, sub: 'RERA verified listings' },
      { id: 'rent',        label: 'Rent & Manage',        icon: Home,      sub: '0% brokerage homes' },
      { id: 'luxury',      label: 'Luxury Collection',    icon: Award,     sub: 'Premium villas & penthouses' },
    ],
  },
  {
    heading: 'Build & Design',
    items: [
      { id: 'interiors',     label: 'Modular Interiors',    icon: Sofa,     sub: '45-day delivery, 10yr warranty' },
      { id: 'construction',  label: 'Turnkey Construction',  icon: Hammer,   sub: 'Verified civil contractors' },
      { id: 'materials',     label: 'Building Materials',    icon: Package,  sub: 'Factory-direct wholesale' },
    ],
  },
  {
    heading: 'Services',
    items: [
      { id: 'professionals', label: 'Skilled Workforce',  icon: Users,     sub: 'GPS-tracked mistri & labour' },
      { id: 'maintenance',   label: 'Home Care & AMC',    icon: Wrench,    sub: '30-min emergency response' },
      { id: 'loans',         label: 'Loans & Legal',      icon: CreditCard, sub: 'EMI calculator, RERA desk' },
    ],
  },
  {
    heading: 'Account & More',
    items: [
      { id: 'myhub',      label: 'My Property Hub',   icon: Briefcase, sub: 'Track your portfolio' },
      { id: 'experience', label: 'Experience Hubs',   icon: Eye,       sub: 'Visit showrooms & VR demos' },
      { id: 'track',      label: 'Track Project',     icon: Navigation, sub: 'Live CCTV milestone updates' },
      { id: 'b2b',        label: 'B2B Partner Portal',icon: Award,     sub: 'Builders, suppliers & agents' },
    ],
  },
];

/* ─── Mobile Bottom Navigation Bar ──────────────────────────── */
export function MobileBottomNav({ activePage, onNavigate, onOpenHamburger, wishlistCount, inquiryCount }) {
  return (
    <nav className="mobile-bottom-nav" style={{
      fontFamily: 'Inter, sans-serif',
      background: 'rgba(255, 255, 255, 0.96)',
      backdropFilter: 'blur(16px)',
      borderTop: '1px solid #E2E8F0',
      boxShadow: '0 -4px 20px rgba(11, 31, 68, 0.08)',
    }}>
      {BOTTOM_NAV.map(({ id, label, icon: Icon }) => {
        const isMenu = id === '_menu';
        const isActive = !isMenu && (activePage === id || (id === 'home' && activePage === 'home'));
        const totalBadge = wishlistCount + inquiryCount;

        return (
          <button
            key={id}
            onClick={() => isMenu ? onOpenHamburger() : onNavigate(id)}
            className={`mob-nav-item${isActive ? ' mob-nav-active' : ''}`}
            aria-label={label}
            style={{
              color: isActive ? '#0866F5' : '#64748B',
              transition: 'all 0.15s ease',
            }}
          >
            <div style={{ position: 'relative', display: 'inline-flex' }}>
              <Icon size={20} strokeWidth={isActive ? 2.5 : 2} color={isActive ? '#0866F5' : '#64748B'} />
              {isMenu && totalBadge > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-7px',
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  background: '#EF4444',
                  color: 'white',
                  fontSize: '0.6rem',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 6px rgba(239, 68, 68, 0.4)',
                }}>
                  {totalBadge}
                </span>
              )}
            </div>
            <span style={{
              fontSize: '11px',
              fontWeight: isActive ? 700 : 500,
              marginTop: '3px',
              letterSpacing: '-0.01em',
            }}>
              {label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}

/* ─── Hamburger Side Drawer ──────────────────────────────────── */
export function HamburgerDrawer({
  isOpen,
  onClose,
  onNavigate,
  activePage,
  selectedCity,
  onOpenCity,
  onOpenAuth,
  onOpenPostProperty,
  onOpenWishlist,
  wishlistCount,
  inquiryCount,
}) {
  if (!isOpen) return null;

  const handleNav = (id) => {
    onNavigate(id);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(7, 15, 27, 0.65)',
          zIndex: 900,
          backdropFilter: 'blur(6px)',
          animation: 'fadeIn 0.2s ease',
        }}
      />

      {/* Drawer panel */}
      <div style={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        width: 'min(360px, 92vw)',
        background: 'linear-gradient(180deg, #0866F5 0%, #0645B8 100%)',
        zIndex: 901,
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
        fontFamily: 'Inter, sans-serif',
        boxShadow: '-8px 0 32px rgba(8, 102, 245, 0.4)',
        animation: 'drawerSlideIn 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
      }}>

        {/* Drawer header */}
        <div style={{
          padding: '24px 22px 18px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src="/RRlogo_white.png" alt="Roof Ridge" style={{ height: '30px', objectFit: 'contain' }} />
          </div>
          <button
            onClick={onClose}
            style={{
              width: '36px',
              height: '36px',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'rgba(255, 255, 255, 0.8)',
              cursor: 'pointer',
              transition: 'background 0.15s ease',
            }}
            title="Close Menu"
          >
            <X size={18} />
          </button>
        </div>

        {/* City selector + concierge phone */}
        <div style={{
          padding: '14px 22px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(255, 255, 255, 0.03)',
        }}>
          <button
            onClick={() => { onOpenCity(); onClose(); }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '7px',
              background: 'rgba(8, 102, 245, 0.15)',
              border: '1px solid rgba(8, 102, 245, 0.3)',
              borderRadius: '20px',
              padding: '6px 14px',
              color: '#93C5FD',
              fontSize: '12px',
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            <MapPin size={13} color="#60A5FA" />
            <span style={{ fontWeight: 700, color: '#FFFFFF' }}>{selectedCity?.name || 'Select City'}</span>
          </button>

          <a
            href="tel:18001239999"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: 'rgba(255, 255, 255, 0.65)',
              fontSize: '12px',
              fontWeight: 600,
            }}
          >
            <Phone size={13} color="#94A3B8" /> 1800-123-9999
          </a>
        </div>

        {/* Quick user actions */}
        <div style={{
          padding: '16px 22px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          display: 'flex',
          gap: '10px',
        }}>
          <button
            onClick={() => { onOpenAuth(); onClose(); }}
            style={{
              flex: 1,
              padding: '11px',
              background: '#0866F5',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '12px',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              boxShadow: '0 4px 14px rgba(8, 102, 245, 0.3)',
            }}
          >
            <User size={14} /> Sign In
          </button>

          <button
            onClick={() => { onOpenWishlist(); onClose(); }}
            style={{
              position: 'relative',
              padding: '11px 16px',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.14)',
              borderRadius: '12px',
              color: 'rgba(255, 255, 255, 0.85)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
            }}
            title="Wishlist & Inquiries"
          >
            <Heart size={16} />
            {wishlistCount > 0 && (
              <span style={{
                fontSize: '10px',
                fontWeight: 800,
                background: '#EF4444',
                color: 'white',
                borderRadius: '50%',
                width: '16px',
                height: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {wishlistCount}
              </span>
            )}
          </button>

          <button
            onClick={() => { onOpenPostProperty(); onClose(); }}
            style={{
              flex: 1.2,
              padding: '11px',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '12px',
              fontSize: '12px',
              fontWeight: 700,
              color: '#FFFFFF',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
            }}
          >
            <PlusCircle size={14} color="#60A5FA" /> Post Property
          </button>
        </div>

        {/* Grouped Navigation Sections */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '10px 12px 24px' }}>
          {MENU_SECTIONS.map((section, si) => (
            <div key={si} style={{ marginBottom: '14px' }}>
              <p style={{
                padding: '10px 14px 6px',
                fontSize: '10.5px',
                fontWeight: 800,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'rgba(255, 255, 255, 0.35)',
              }}>
                {section.heading}
              </p>
              {section.items.map(item => {
                const isActive = activePage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNav(item.id)}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      background: isActive ? 'rgba(8, 102, 245, 0.18)' : 'transparent',
                      border: 'none',
                      borderRadius: '12px',
                      borderLeft: isActive ? '3px solid #0866F5' : '3px solid transparent',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      textAlign: 'left',
                      marginBottom: '2px',
                    }}
                    onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'; }}
                    onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
                  >
                    <div style={{
                      width: '34px',
                      height: '34px',
                      background: isActive ? '#0866F5' : 'rgba(255, 255, 255, 0.07)',
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      color: '#FFFFFF',
                    }}>
                      <item.icon size={16} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{
                        fontSize: '13px',
                        fontWeight: isActive ? 700 : 600,
                        color: isActive ? '#FFFFFF' : 'rgba(255, 255, 255, 0.85)',
                        lineHeight: 1.25,
                      }}>
                        {item.label}
                      </p>
                      <p style={{
                        fontSize: '11px',
                        color: 'rgba(255, 255, 255, 0.4)',
                        marginTop: '2px',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}>
                        {item.sub}
                      </p>
                    </div>
                    <ChevronRight size={14} style={{ color: isActive ? '#60A5FA' : 'rgba(255, 255, 255, 0.25)', flexShrink: 0 }} />
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Footer links */}
        <div style={{
          padding: '16px 22px',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          gap: '16px',
          flexWrap: 'wrap',
          background: 'rgba(255, 255, 255, 0.02)',
        }}>
          {['Privacy Policy', 'Terms of Use', 'Support Desk'].map(l => (
            <button
              key={l}
              type="button"
              style={{
                background: 'none',
                border: 'none',
                color: 'rgba(255, 255, 255, 0.45)',
                fontSize: '11px',
                cursor: 'pointer',
              }}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes drawerSlideIn {
          from { transform: translateX(100%); opacity: 0; }
          to   { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </>
  );
}
