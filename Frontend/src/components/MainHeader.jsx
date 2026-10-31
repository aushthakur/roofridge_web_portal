import React, { useState } from 'react';
import {
  Heart,
  User,
  ChevronDown,
  Menu,
  Building2,
  Package,
  LogOut,
  PlusCircle,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Buy', key: 'buy' },
  { label: 'Rent', key: 'rent' },
  { label: 'New Projects', key: 'projects' },
  { label: 'Plot', key: 'plot' },
  { label: 'Commercial', key: 'commercial' },
  { label: 'Home Loans', key: 'loans' },
  { label: 'Interior', key: 'interiors' },
  { label: 'Advice', key: 'advice' },
];

export default function MainHeader({
  selectedCity,
  onOpenCity,
  onOpenAuth,
  wishlistCount = 0,
  onOpenWishlist,
  onNavigateHome,
  onOpenHamburger,
  user,
  onLogout,
  onNavigate,
  onOpenPostProperty,
  activePage = 'home',
}) {
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header
      style={{
        width: '100%',
        height: '72px',
        background: '#FFFFFF',
        borderBottom: '1px solid rgba(231, 236, 243, 0.7)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div
        className="rr-container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        {/* Left: RoofRidge Brand Logo */}
        <button
          onClick={onNavigateHome}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
          }}
          aria-label="RoofRidge Home"
        >
          <img
            src="/RRlogo_transparent.png"
            alt="RoofRidge"
            style={{ height: '34px', width: 'auto', display: 'block' }}
          />
        </button>

        {/* Center: Clean Minimal Navigation Links (Desktop) */}
        <nav
          className="desktop-header-nav"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '28px',
          }}
        >
          {NAV_ITEMS.map((item) => {
            const isActive =
              activePage === item.key || (item.key === 'advice' && activePage === 'legal');
            return (
              <button
                key={item.label}
                onClick={() => (onNavigate ? onNavigate(item.key) : onNavigateHome())}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '14px',
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? '#0866F5' : '#1E293B',
                  cursor: 'pointer',
                  padding: '6px 0',
                  position: 'relative',
                  transition: 'color 0.15s ease',
                  fontFamily: 'Inter, sans-serif',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#0866F5';
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.color = '#1E293B';
                }}
              >
                {item.label}
                {isActive && (
                  <span
                    style={{
                      position: 'absolute',
                      bottom: '-20px',
                      left: 0,
                      right: 0,
                      height: '2.5px',
                      background: '#0866F5',
                      borderRadius: '2px 2px 0 0',
                    }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Actions: Location Selector | Wishlist | Profile Menu */}
        <div
          className="header-right-actions"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          {/* Location Selector */}
          <button
            onClick={onOpenCity}
            style={{
              background: 'none',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '13px',
              fontWeight: 500,
              color: '#1E293B',
              cursor: 'pointer',
              fontFamily: 'Inter, sans-serif',
              padding: '6px 4px',
              maxWidth: '120px',
            }}
            title="Select Location"
          >
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {selectedCity?.name || 'Mumbai'}
            </span>
            <ChevronDown size={14} color="#1E293B" strokeWidth={2} style={{ flexShrink: 0 }} />
          </button>

          {/* Wishlist Heart Icon */}
          <button
            onClick={onOpenWishlist}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              padding: '6px',
              color: '#1E293B',
            }}
            title="Wishlist"
            aria-label="Wishlist"
          >
            <Heart size={20} color="#1E293B" strokeWidth={1.8} />
            {wishlistCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '2px',
                  right: '2px',
                  background: '#0866F5',
                  color: '#FFFFFF',
                  fontSize: '9px',
                  fontWeight: 700,
                  width: '14px',
                  height: '14px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Post Property Quick Action (Compact on mobile) */}
          <button
            onClick={onOpenPostProperty}
            className="hidden sm:flex"
            style={{
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '8px',
              background: '#EEF5FF',
              color: '#0866F5',
              border: '1px solid #D0E1FD',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
              fontFamily: 'Inter, sans-serif',
              transition: 'all 0.15s ease',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#0866F5';
              e.currentTarget.style.color = '#FFFFFF';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#EEF5FF';
              e.currentTarget.style.color = '#0866F5';
            }}
            title="Post Free Property Listing"
          >
            <PlusCircle size={14} />
            <span>Post Property</span>
            <span
              style={{
                fontSize: '9px',
                fontWeight: 800,
                padding: '1px 5px',
                borderRadius: '4px',
                background: '#059669',
                color: '#FFFFFF',
                letterSpacing: '0.04em',
              }}
            >
              FREE
            </span>
          </button>
            >
              FREE
            </span>
          </button>

          {/* Profile / Industry-Standard User Menu */}
          {user ? (
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 14px',
                  borderRadius: '24px',
                  background: '#F0F5FF',
                  border: '1.5px solid #D0E1FD',
                  cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif',
                }}
                aria-label="User Account Menu"
              >
                <div
                  style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '50%',
                    background: '#0866F5',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    fontWeight: 700,
                  }}
                >
                  {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#1E293B' }}>
                  {user.name ? user.name.split(' ')[0] : 'Account'}
                </span>
                <ChevronDown
                  size={14}
                  color="#0866F5"
                  style={{
                    transform: showUserMenu ? 'rotate(180deg)' : 'none',
                    transition: '0.2s',
                  }}
                />
              </button>

              {showUserMenu && (
                <>
                  <div
                    style={{ position: 'fixed', inset: 0, zIndex: 90 }}
                    onClick={() => setShowUserMenu(false)}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      right: 0,
                      top: 'calc(100% + 8px)',
                      width: '250px',
                      background: '#FFFFFF',
                      borderRadius: '16px',
                      boxShadow: '0 12px 36px rgba(11, 31, 68, 0.16)',
                      border: '1px solid #E2E8F0',
                      padding: '8px',
                      zIndex: 100,
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    {/* User Profile summary */}
                    <div
                      style={{
                        padding: '12px',
                        borderBottom: '1px solid #F1F5F9',
                        marginBottom: '6px',
                      }}
                    >
                      <p
                        style={{
                          fontSize: '14px',
                          fontWeight: 700,
                          color: '#1E293B',
                          margin: 0,
                        }}
                      >
                        {user.name || 'Member'}
                      </p>
                      <p style={{ fontSize: '11px', color: '#64748B', margin: '2px 0 6px 0' }}>
                        {user.phone ? `+91 ${user.phone}` : user.email || 'Verified Account'}
                      </p>
                      <span
                        style={{
                          display: 'inline-block',
                          padding: '2px 8px',
                          borderRadius: '12px',
                          background: '#EEF2FF',
                          color: '#4F46E5',
                          fontSize: '10px',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                        }}
                      >
                        {user.role || 'Verified Member'}
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        onNavigate && onNavigate('myhub', 'listings');
                        setShowUserMenu(false);
                      }}
                      style={dropdownItemStyle}
                    >
                      <Building2 size={15} color="#0866F5" />
                      <span>My Property Hub</span>
                    </button>

                    <button
                      onClick={() => {
                        onNavigate && onNavigate('myhub', 'bookings');
                        setShowUserMenu(false);
                      }}
                      style={dropdownItemStyle}
                    >
                      <Package size={15} color="#059669" />
                      <span>My Bookings &amp; Orders</span>
                    </button>

                    <button
                      onClick={() => {
                        onOpenPostProperty && onOpenPostProperty();
                        setShowUserMenu(false);
                      }}
                      style={dropdownItemStyle}
                    >
                      <PlusCircle size={15} color="#0866F5" />
                      <span>Post Free Property</span>
                    </button>

                    <a
                      href="http://localhost:5174"
                      target="_blank"
                      rel="noreferrer"
                      style={{ ...dropdownItemStyle, textDecoration: 'none' }}
                    >
                      <ShieldCheck size={15} color="#4F46E5" />
                      <span>Admin Control Room</span>
                      <ExternalLink size={11} color="#94A3B8" style={{ marginLeft: 'auto' }} />
                    </a>

                    <div style={{ height: '1px', background: '#F1F5F9', margin: '6px 0' }} />

                    <button
                      onClick={() => {
                        onLogout();
                        setShowUserMenu(false);
                      }}
                      style={{ ...dropdownItemStyle, color: '#DC2626' }}
                    >
                      <LogOut size={15} color="#DC2626" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                borderRadius: '8px',
                background: '#0866F5',
                color: '#FFFFFF',
                border: 'none',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
                boxShadow: '0 2px 8px rgba(8, 102, 245, 0.25)',
              }}
            >
              <User size={15} strokeWidth={2.2} />
              <span>Sign In</span>
            </button>
          )}

          {/* Mobile Hamburger Drawer Trigger */}
          <button
            className="mobile-menu-trigger"
            onClick={onOpenHamburger}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '6px',
              color: '#1E293B',
            }}
            aria-label="Open Navigation Menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </div>
    </header>
  );
}

const dropdownItemStyle = {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  padding: '9px 12px',
  borderRadius: '8px',
  border: 'none',
  background: 'none',
  fontSize: '13px',
  fontWeight: 500,
  color: '#1E293B',
  cursor: 'pointer',
  textAlign: 'left',
  transition: 'background 0.15s ease',
};
