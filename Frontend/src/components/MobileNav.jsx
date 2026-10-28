import React from 'react';
import {
  Home,
  Building2,
  Sofa,
  Hammer,
  Package,
  Users,
  Wrench,
  CreditCard,
  X,
  MapPin,
  Phone,
  Award,
  Briefcase,
  Eye,
  Navigation,
  Heart,
  ShoppingBag,
  User,
  PlusCircle,
  ChevronRight,
  ShieldCheck,
  LogOut,
  ChevronDown,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

/* ─── Bottom Nav items (5 max — thumb-reach zone) ─────────── */
const BOTTOM_NAV = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'buy', label: 'Buy', icon: Building2 },
  { id: 'interiors', label: 'Interiors', icon: Sofa },
  { id: 'materials', label: 'Materials', icon: Package },
  { id: '_menu', label: 'More', icon: Users }, // triggers hamburger
];

/* ─── Hamburger drawer — categorized luxury menu ─────────── */
const MENU_SECTIONS = [
  {
    heading: 'Properties & Rentals',
    items: [
      {
        id: 'buy',
        label: 'Buy Property',
        icon: Building2,
        sub: 'RERA verified villas & flats',
        iconBg: '#EFF6FF',
        iconColor: '#0866F5',
      },
      {
        id: 'rent',
        label: 'Rent & Manage',
        icon: Home,
        sub: '0% brokerage verified homes',
        iconBg: '#F0F9FF',
        iconColor: '#0284C7',
      },
      {
        id: 'luxury',
        label: 'Luxury Collection',
        icon: Award,
        sub: 'Curated penthouses & estates',
        iconBg: '#FFFBEB',
        iconColor: '#D97706',
        badge: 'VIP',
      },
    ],
  },
  {
    heading: 'Build, Design & Materials',
    items: [
      {
        id: 'interiors',
        label: 'Modular Interiors',
        icon: Sofa,
        sub: '45-day handover, 10yr warranty',
        iconBg: '#EEF2FF',
        iconColor: '#6366F1',
      },
      {
        id: 'construction',
        label: 'Turnkey Construction',
        icon: Hammer,
        sub: 'Verified civil contractors & architects',
        iconBg: '#FFF7ED',
        iconColor: '#EA580C',
      },
      {
        id: 'materials',
        label: 'Building Materials Store',
        icon: Package,
        sub: 'Cement, steel & tiles at wholesale rate',
        iconBg: '#ECFDF5',
        iconColor: '#059669',
      },
    ],
  },
  {
    heading: 'Services & Advisory',
    items: [
      {
        id: 'professionals',
        label: 'Skilled Workforce',
        icon: Users,
        sub: 'GPS on-demand mistri & labour',
        iconBg: '#F0FDFA',
        iconColor: '#0D9488',
      },
      {
        id: 'maintenance',
        label: 'Home Care & AMC',
        icon: Wrench,
        sub: '30-min emergency repair response',
        iconBg: '#EFF6FF',
        iconColor: '#2563EB',
      },
      {
        id: 'loans',
        label: 'Home Loans & Legal Desk',
        icon: CreditCard,
        sub: 'Instant approval, UP RERA verify',
        iconBg: '#F5F3FF',
        iconColor: '#7C3AED',
      },
    ],
  },
  {
    heading: 'Account & Operations',
    items: [
      {
        id: 'myhub',
        label: 'My Property Hub',
        icon: Briefcase,
        sub: 'Manage portfolio, leads & docs',
        iconBg: '#F1F5F9',
        iconColor: '#334155',
      },
      {
        id: 'experience',
        label: 'Experience Hubs & VR',
        icon: Eye,
        sub: 'Walkthrough physical showrooms',
        iconBg: '#EEF2FF',
        iconColor: '#4F46E5',
      },
      {
        id: 'track',
        label: 'Track Project Progress',
        icon: Navigation,
        sub: 'Live CCTV & milestone updates',
        iconBg: '#F0FDF4',
        iconColor: '#16A34A',
      },
      {
        id: 'b2b',
        label: 'B2B Partner Portal',
        icon: ShieldCheck,
        sub: 'For builders, dealers & contractors',
        iconBg: '#FEF3C7',
        iconColor: '#B45309',
        badge: 'Partner',
      },
    ],
  },
];

/* ─── Mobile Bottom Navigation Bar ──────────────────────────── */
export function MobileBottomNav({
  activePage,
  onNavigate,
  onOpenHamburger,
  wishlistCount = 0,
  inquiryCount = 0,
}) {
  return (
    <nav
      className="mobile-bottom-nav"
      style={{
        fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
        background: 'rgba(255, 255, 255, 0.98)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid #E2E8F0',
        boxShadow: '0 -4px 24px rgba(15, 23, 42, 0.08)',
      }}
    >
      {BOTTOM_NAV.map(({ id, label, icon: Icon }) => {
        const isMenu = id === '_menu';
        const isActive =
          !isMenu && (activePage === id || (id === 'home' && activePage === 'home'));
        const totalBadge = wishlistCount + inquiryCount;

        return (
          <button
            key={id}
            onClick={() => (isMenu ? onOpenHamburger() : onNavigate(id))}
            className={`mob-nav-item${isActive ? ' mob-nav-active' : ''}`}
            aria-label={label}
            style={{
              color: isActive ? '#0866F5' : '#64748B',
              transition: 'all 0.15s ease',
            }}
          >
            <div style={{ position: 'relative', display: 'inline-flex' }}>
              <Icon
                size={21}
                strokeWidth={isActive ? 2.5 : 1.9}
                color={isActive ? '#0866F5' : '#64748B'}
              />
              {isMenu && totalBadge > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-4px',
                    right: '-8px',
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    background: '#EF4444',
                    color: 'white',
                    fontSize: '10px',
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 6px rgba(239, 68, 68, 0.4)',
                  }}
                >
                  {totalBadge}
                </span>
              )}
            </div>
            <span
              style={{
                fontSize: '11px',
                fontWeight: isActive ? 700 : 600,
                marginTop: '3px',
                letterSpacing: '-0.01em',
              }}
            >
              {label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}

/* ─── Premium Redesigned Hamburger Side Drawer ─────────────────── */
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
  wishlistCount = 0,
  inquiryCount = 0,
  user = null,
  onLogout = null,
}) {
  if (!isOpen) return null;

  const handleNav = (id) => {
    onNavigate(id);
    onClose();
  };

  return (
    <>
      {/* Soft Blurred Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(15, 23, 42, 0.55)',
          zIndex: 900,
          backdropFilter: 'blur(8px)',
          animation: 'rrFadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />

      {/* Modern White Architecture Drawer Container */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: 'min(380px, 92vw)',
          background: '#FFFFFF',
          zIndex: 901,
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
          fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
          boxShadow: '-12px 0 48px rgba(15, 23, 42, 0.16)',
          animation: 'rrDrawerSlideIn 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* ── Top Header: Crisp Logo, RERA Verified Pill & Circular Close ── */}
        <div
          style={{
            padding: '18px 20px',
            borderBottom: '1px solid #F1F5F9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0,
            background: '#FFFFFF',
            position: 'sticky',
            top: 0,
            zIndex: 10,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img
              src="/RRlogo_transparent.png"
              alt="Roof Ridge"
              style={{ height: '34px', width: 'auto', objectFit: 'contain', display: 'block' }}
            />
            <span
              style={{
                fontSize: '10px',
                fontWeight: 700,
                color: '#059669',
                background: '#ECFDF5',
                border: '1px solid #A7F3D0',
                borderRadius: '20px',
                padding: '2px 8px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '3px',
              }}
            >
              <CheckCircle2 size={11} color="#059669" /> RERA Verified
            </span>
          </div>

          <button
            onClick={onClose}
            style={{
              width: '36px',
              height: '36px',
              background: '#F8FAFC',
              border: '1px solid #E2E8F0',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#475569',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#F1F5F9';
              e.currentTarget.style.color = '#0F172A';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#F8FAFC';
              e.currentTarget.style.color = '#475569';
            }}
            title="Close Menu"
          >
            <X size={18} strokeWidth={2.2} />
          </button>
        </div>

        {/* ── User Status & Action Card ── */}
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #F1F5F9' }}>
          {user ? (
            /* Logged in state */
            <div
              style={{
                background: 'linear-gradient(135deg, #F8FAFC 0%, #EFF6FF 100%)',
                border: '1px solid #DBEAFE',
                borderRadius: '16px',
                padding: '14px 16px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '10px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #0866F5 0%, #0645B8 100%)',
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '16px',
                      boxShadow: '0 4px 12px rgba(8, 102, 245, 0.25)',
                    }}
                  >
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div>
                    <h4
                      style={{
                        margin: 0,
                        fontSize: '14px',
                        fontWeight: 800,
                        color: '#0F172A',
                        lineHeight: 1.2,
                      }}
                    >
                      {user.name || 'Member'}
                    </h4>
                    <p
                      style={{
                        margin: '2px 0 0',
                        fontSize: '11px',
                        fontWeight: 500,
                        color: '#64748B',
                      }}
                    >
                      {user.phone ? `+91 ${user.phone}` : user.email || 'Registered User'}
                    </p>
                  </div>
                </div>

                <span
                  style={{
                    fontSize: '10px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    background: '#DBEAFE',
                    color: '#1D4ED8',
                    padding: '3px 8px',
                    borderRadius: '8px',
                  }}
                >
                  {user.role || 'Member'}
                </span>
              </div>

              <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                <button
                  onClick={() => handleNav('myhub')}
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    background: '#0866F5',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '10px',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                  }}
                >
                  <Briefcase size={13} /> My Property Hub
                </button>
                {onLogout && (
                  <button
                    onClick={() => {
                      onLogout();
                      onClose();
                    }}
                    style={{
                      padding: '8px 12px',
                      background: '#FFFFFF',
                      color: '#EF4444',
                      border: '1px solid #FCA5A5',
                      borderRadius: '10px',
                      fontSize: '12px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                    }}
                  >
                    <LogOut size={13} /> Logout
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Guest / Unauthenticated State */
            <div
              style={{
                background: 'linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%)',
                border: '1px solid #E2E8F0',
                borderRadius: '16px',
                padding: '16px',
              }}
            >
              <div style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Sparkles size={14} color="#0866F5" />
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 800,
                      color: '#0866F5',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                    }}
                  >
                    Roof Ridge Access
                  </span>
                </div>
                <h4
                  style={{
                    margin: '3px 0 0',
                    fontSize: '15px',
                    fontWeight: 800,
                    color: '#0F172A',
                    lineHeight: 1.25,
                  }}
                >
                  Sign in for VIP Services
                </h4>
                <p style={{ margin: '3px 0 0', fontSize: '11px', color: '#64748B' }}>
                  Saved homes, direct broker chats &amp; real-time milestone tracking
                </p>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => {
                    onOpenAuth();
                    onClose();
                  }}
                  style={{
                    flex: 1.2,
                    padding: '10px 14px',
                    background: 'linear-gradient(135deg, #0866F5 0%, #0645B8 100%)',
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
                    boxShadow: '0 4px 14px rgba(8, 102, 245, 0.28)',
                  }}
                >
                  <User size={14} /> Sign In / Register
                </button>

                <button
                  onClick={() => {
                    onOpenPostProperty();
                    onClose();
                  }}
                  style={{
                    flex: 1,
                    padding: '10px 12px',
                    background: '#FFFFFF',
                    border: '1.5px solid #059669',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#059669',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '5px',
                  }}
                >
                  <PlusCircle size={14} /> Post Property
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ── City Selector & 24/7 Helpline Strip ── */}
        <div
          style={{
            padding: '12px 20px',
            borderBottom: '1px solid #F1F5F9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: '#FAFAFA',
          }}
        >
          {/* City selector */}
          <button
            onClick={() => {
              onOpenCity();
              onClose();
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '20px',
              padding: '6px 12px',
              color: '#334155',
              fontSize: '12px',
              cursor: 'pointer',
              fontWeight: 700,
              boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
            }}
          >
            <MapPin size={13} color="#0866F5" />
            <span style={{ color: '#0F172A' }}>{selectedCity?.name || 'Select City'}</span>
            <ChevronDown size={12} color="#94A3B8" />
          </button>

          {/* 24x7 Helpline */}
          <a
            href="tel:18001239999"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: '#475569',
              fontSize: '12px',
              fontWeight: 700,
              textDecoration: 'none',
            }}
          >
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                background: '#10B981',
                display: 'inline-block',
                boxShadow: '0 0 0 2px rgba(16, 185, 129, 0.2)',
              }}
            />
            <Phone size={13} color="#0866F5" />
            <span>1800-123-9999</span>
          </a>
        </div>

        {/* ── Quick Stats Bar (Wishlist & Cart) ── */}
        <div
          style={{
            padding: '10px 20px',
            borderBottom: '1px solid #F1F5F9',
            display: 'flex',
            gap: '10px',
          }}
        >
          <button
            onClick={() => {
              onOpenWishlist();
              onClose();
            }}
            style={{
              flex: 1,
              padding: '9px 12px',
              background: '#FFF1F2',
              border: '1px solid #FFE4E6',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Heart size={15} color="#E11D48" fill="#FFE4E6" />
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#9F1239' }}>
                Saved Homes
              </span>
            </div>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 800,
                color: '#E11D48',
                background: '#FFFFFF',
                borderRadius: '12px',
                padding: '1px 7px',
                border: '1px solid #FECDD3',
              }}
            >
              {wishlistCount}
            </span>
          </button>

          <button
            onClick={() => handleNav('materials')}
            style={{
              flex: 1,
              padding: '9px 12px',
              background: '#F0FDF4',
              border: '1px solid #DCFCE7',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShoppingBag size={15} color="#059669" />
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#166534' }}>Orders</span>
            </div>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 800,
                color: '#059669',
                background: '#FFFFFF',
                borderRadius: '12px',
                padding: '1px 7px',
                border: '1px solid #BBF7D0',
              }}
            >
              {inquiryCount}
            </span>
          </button>
        </div>

        {/* ── Categorized Menu Items ── */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '12px 14px 28px' }}>
          {MENU_SECTIONS.map((section, si) => (
            <div key={si} style={{ marginBottom: '18px' }}>
              <p
                style={{
                  padding: '6px 10px',
                  margin: 0,
                  fontSize: '10px',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: '#94A3B8',
                }}
              >
                {section.heading}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginTop: '4px' }}>
                {section.items.map((item) => {
                  const isActive = activePage === item.id;
                  const Icon = item.icon;

                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNav(item.id)}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        background: isActive ? '#EFF6FF' : 'transparent',
                        border: 'none',
                        borderRadius: '14px',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        textAlign: 'left',
                        position: 'relative',
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) e.currentTarget.style.background = '#F8FAFC';
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) e.currentTarget.style.background = 'transparent';
                      }}
                    >
                      {/* Curated Pastel Icon Box */}
                      <div
                        style={{
                          width: '38px',
                          height: '38px',
                          borderRadius: '11px',
                          background: item.iconBg,
                          color: item.iconColor,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          transition: 'transform 0.15s ease',
                        }}
                      >
                        <Icon size={18} strokeWidth={2.2} />
                      </div>

                      {/* Text details */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <p
                            style={{
                              margin: 0,
                              fontSize: '13.5px',
                              fontWeight: isActive ? 800 : 700,
                              color: isActive ? '#0866F5' : '#0F172A',
                              lineHeight: 1.25,
                            }}
                          >
                            {item.label}
                          </p>
                          {item.badge && (
                            <span
                              style={{
                                fontSize: '9px',
                                fontWeight: 800,
                                textTransform: 'uppercase',
                                background: '#FEF3C7',
                                color: '#92400E',
                                padding: '1px 6px',
                                borderRadius: '6px',
                                letterSpacing: '0.03em',
                              }}
                            >
                              {item.badge}
                            </span>
                          )}
                        </div>

                        <p
                          style={{
                            margin: '3px 0 0',
                            fontSize: '11px',
                            fontWeight: 500,
                            color: '#64748B',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {item.sub}
                        </p>
                      </div>

                      <ChevronRight
                        size={15}
                        style={{
                          color: isActive ? '#0866F5' : '#CBD5E1',
                          flexShrink: 0,
                          transition: 'transform 0.15s ease',
                        }}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* ── Drawer Footer with Trust Guarantee & Legal ── */}
        <div
          style={{
            padding: '16px 20px',
            borderTop: '1px solid #F1F5F9',
            background: '#F8FAFC',
            flexShrink: 0,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '10px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShieldCheck size={14} color="#059669" />
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#334155' }}>
                100% Escrow Protected
              </span>
            </div>
            <span style={{ fontSize: '10px', color: '#94A3B8', fontWeight: 600 }}>
              UP RERA Verified
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '11px',
              color: '#64748B',
            }}
          >
            <div style={{ display: 'flex', gap: '12px' }}>
              <span style={{ cursor: 'pointer' }} onClick={() => handleNav('legal')}>
                Privacy
              </span>
              <span>•</span>
              <span style={{ cursor: 'pointer' }} onClick={() => handleNav('legal')}>
                Terms
              </span>
              <span>•</span>
              <span style={{ cursor: 'pointer' }} onClick={() => handleNav('advice')}>
                Help Desk
              </span>
            </div>
            <span style={{ fontSize: '10px', color: '#94A3B8' }}>© 2026 Roof Ridge</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes rrFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes rrDrawerSlideIn {
          from { transform: translateX(100%); }
          to   { transform: translateX(0); }
        }
      `}</style>
    </>
  );
}
