import React, { useState } from 'react';
import { Search, Heart, ShoppingBag, User, PlusCircle, Menu, X, MapPin, Phone, Bell } from 'lucide-react';

export default function MainHeader({
  selectedCity,
  onOpenCity,
  onOpenAuth,
  onOpenPostProperty,
  wishlistCount,
  inquiryCount,
  onSearch,
  onOpenWishlist,
  onNavigateHome,
  onOpenHamburger,
  user,
  onLogout
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchCat, setSearchCat] = useState('All');

  return (
    <header className="main-header">
      <div className="rr-container header-container">

        {/* Logo */}
        <button className="header-logo" onClick={onNavigateHome} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
          <img src="/RRlogo.png" alt="Roof Ridge" />
        </button>

        {/* Marketplace Search — hidden on mobile */}
        <div className="header-search-container">
          <div className="header-search-box">
            <select value={searchCat} onChange={e => setSearchCat(e.target.value)} style={{ minWidth: 0 }}>
              <option value="All">All</option>
              <option value="Buy">Buy Homes</option>
              <option value="Rent">Rentals</option>
              <option value="Interiors">Interiors</option>
              <option value="Materials">Materials</option>
            </select>
            <input
              type="text"
              className="header-search-input"
              placeholder="Search homes, interiors, materials & services…"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && onSearch?.(searchTerm, searchCat)}
            />
            <button className="header-search-btn" onClick={() => onSearch?.(searchTerm, searchCat)}>
              <Search size={15} />
              Search
            </button>
          </div>
        </div>

        {/* Right Actions — desktop */}
        <div className="header-actions header-actions-desktop">
          {user ? (
            <div className="action-icon-btn" style={{ position: 'relative' }} onClick={onLogout}>
              <User size={20} style={{ color: '#1d72b8' }} />
              <span style={{ color: '#1d72b8' }}>Logout</span>
            </div>
          ) : (
            <button className="action-icon-btn" onClick={onOpenAuth}>
              <User size={20} />
              <span>Sign In</span>
            </button>
          )}

          <button className="action-icon-btn" onClick={onOpenWishlist} style={{ position: 'relative' }}>
            <Heart size={20} />
            <span>Saved</span>
            {wishlistCount > 0 && <span className="badge-count">{wishlistCount}</span>}
          </button>

          <button className="action-icon-btn" onClick={onOpenWishlist} style={{ position: 'relative' }}>
            <ShoppingBag size={20} />
            <span>Inquiries</span>
            {inquiryCount > 0 && <span className="badge-count">{inquiryCount}</span>}
          </button>

          <button className="post-property-btn" onClick={onOpenPostProperty}>
            <PlusCircle size={15} />
            Post Property
          </button>
        </div>

        {/* Mobile right controls */}
        <div className="header-actions-mobile">
          <button className="mob-icon-btn" onClick={onOpenWishlist} style={{ position: 'relative' }}>
            <Heart size={22} />
            {wishlistCount > 0 && <span className="badge-count">{wishlistCount}</span>}
          </button>
          <button className="mob-icon-btn" onClick={onOpenPostProperty}>
            <PlusCircle size={22} />
          </button>
          <button className="mob-icon-btn mob-hamburger" onClick={onOpenHamburger} aria-label="Open menu">
            <Menu size={22} />
          </button>
        </div>

      </div>

      {/* Mobile search bar — shown below header on small screens */}
      <div className="mobile-search-bar">
        <div style={{ position: 'relative', flex: 1 }}>
          <Search size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
          <input
            type="text"
            placeholder="Search homes, materials, services…"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && onSearch?.(searchTerm, searchCat)}
            style={{ width: '100%', height: '40px', paddingLeft: '34px', paddingRight: '12px', border: '1.5px solid #E4E1DA', borderRadius: '2px', fontSize: '0.84rem', fontFamily: 'Manrope, sans-serif', outline: 'none', color: '#2C2C2C', background: 'white', boxSizing: 'border-box' }}
          />
        </div>
        <button onClick={() => onOpenCity()}
          style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '0 12px', height: '40px', border: '1.5px solid #E4E1DA', borderRadius: '2px', background: 'white', fontSize: '0.78rem', fontWeight: 700, color: '#0B192C', fontFamily: 'Manrope, sans-serif', flexShrink: 0, whiteSpace: 'nowrap' }}>
          <MapPin size={13} />{selectedCity?.name || 'City'}
        </button>
      </div>
    </header>
  );
}
