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
    <nav className="mobile-bottom-nav">
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
          >
            <div style={{ position: 'relative', display: 'inline-flex' }}>
              <Icon size={22} />
              {isMenu && totalBadge > 0 && (
                <span style={{ position: 'absolute', top: '-4px', right: '-6px', width: '14px', height: '14px', borderRadius: '50%', background: '#EF4444', color: 'white', fontSize: '0.55rem', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{totalBadge}</span>
              )}
            </div>
            <span>{label}</span>
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
        style={{ position: 'fixed', inset: 0, background: 'rgba(7,15,27,0.65)', zIndex: 900, backdropFilter: 'blur(4px)' }}
      />

      {/* Drawer panel */}
      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0,
        width: 'min(340px, 90vw)',
        background: '#0B192C',
        zIndex: 901,
        display: 'flex', flexDirection: 'column',
        overflowY: 'auto',
        animation: 'drawerSlideIn 0.28s cubic-bezier(0.16,1,0.3,1)',
      }}>

        {/* Drawer header */}
        <div style={{ padding: '20px 20px 16px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src="/RRlogo.png" alt="Roof Ridge" style={{ height: '28px', filter: 'brightness(0) invert(1)' }} />
          </div>
          <button onClick={onClose}
            style={{ width: '34px', height: '34px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.7)', cursor: 'pointer' }}>
            <X size={16} />
          </button>
        </div>

        {/* City + phone */}
        <div style={{ padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button onClick={() => { onOpenCity(); onClose(); }}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '2px', padding: '7px 12px', color: 'rgba(255,255,255,0.7)', fontSize: '0.78rem', fontFamily: 'Manrope, sans-serif', cursor: 'pointer' }}>
            <MapPin size={13} />
            <span style={{ fontWeight: 700, color: 'white' }}>{selectedCity?.name || 'Select City'}</span>
          </button>
          <a href="tel:18001239999"
            style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'rgba(255,255,255,0.55)', fontSize: '0.75rem', fontFamily: 'Manrope, sans-serif' }}>
            <Phone size={13} /> 1800-123-9999
          </a>
        </div>

        {/* Quick user actions */}
        <div style={{ padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', gap: '8px' }}>
          <button onClick={() => { onOpenAuth(); onClose(); }}
            style={{ flex: 1, padding: '10px', background: 'white', color: '#0B192C', border: 'none', borderRadius: '2px', fontSize: '0.78rem', fontWeight: 800, fontFamily: 'Manrope, sans-serif', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
            <User size={14} /> Sign In
          </button>
          <button onClick={() => { onOpenWishlist(); onClose(); }}
            style={{ position: 'relative', padding: '10px 16px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '2px', color: 'rgba(255,255,255,0.8)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
            <Heart size={16} />
            {wishlistCount > 0 && <span style={{ fontSize: '0.6rem', fontWeight: 800, background: '#EF4444', color: 'white', borderRadius: '50%', width: '14px', height: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{wishlistCount}</span>}
          </button>
          <button onClick={() => { onOpenPostProperty(); onClose(); }}
            style={{ flex: 1, padding: '10px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '2px', fontSize: '0.74rem', fontWeight: 700, color: 'rgba(255,255,255,0.8)', fontFamily: 'Manrope, sans-serif', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
            <PlusCircle size={14} /> Post Property
          </button>
        </div>

        {/* Menu sections */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '8px 0 20px' }}>
          {MENU_SECTIONS.map((section, si) => (
            <div key={si}>
              <p style={{ padding: '14px 20px 6px', fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', fontFamily: 'Manrope, sans-serif' }}>
                {section.heading}
              </p>
              {section.items.map(item => {
                const isActive = activePage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNav(item.id)}
                    style={{
                      width: '100%', padding: '12px 20px',
                      display: 'flex', alignItems: 'center', gap: '12px',
                      background: isActive ? 'rgba(255,255,255,0.08)' : 'transparent',
                      border: 'none',
                      borderLeft: isActive ? '2px solid white' : '2px solid transparent',
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                      textAlign: 'left',
                    }}
                    onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
                    onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
                  >
                    <div style={{ width: '34px', height: '34px', background: isActive ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: isActive ? 'white' : 'rgba(255,255,255,0.5)' }}>
                      <item.icon size={16} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: '0.86rem', fontWeight: isActive ? 700 : 500, color: isActive ? 'white' : 'rgba(255,255,255,0.75)', fontFamily: 'Manrope, sans-serif', lineHeight: 1.2 }}>{item.label}</p>
                      <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', fontFamily: 'Manrope, sans-serif', marginTop: '2px' }}>{item.sub}</p>
                    </div>
                    <ChevronRight size={14} style={{ color: 'rgba(255,255,255,0.2)', flexShrink: 0 }} />
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Footer links */}
        <div style={{ padding: '14px 20px', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          {['Privacy Policy', 'Terms of Use', 'Contact Us'].map(l => (
            <button key={l} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.3)', fontSize: '0.7rem', fontFamily: 'Manrope, sans-serif', cursor: 'pointer' }}>{l}</button>
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
