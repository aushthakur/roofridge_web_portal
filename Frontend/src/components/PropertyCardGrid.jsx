import React from 'react';
import { Heart, ArrowRight, Bed, Bath, Car, Maximize2 } from 'lucide-react';
import { useResponsive } from '../hooks/useResponsive';

const FEATURED_PROPERTIES = [
  {
    id: 'prop-mumbai-1',
    image: '/images/prop_thane.jpg',
    badge: 'Featured',
    badgeColor: '#0866F5',
    price: '₹ 2.85 Cr',
    type: '2 BHK Apartment',
    location: 'Thane (W), Mumbai',
    area: '1200 sq.ft',
    beds: 2,
    baths: 2,
  },
  {
    id: 'prop-mumbai-2',
    image: '/images/prop_kandivali.jpg',
    badge: 'New Launch',
    badgeColor: '#0866F5',
    price: '₹ 1.48 Cr',
    type: '3 BHK Apartment',
    location: 'Kandivali (E), Mumbai',
    area: '980 sq.ft',
    beds: 3,
    baths: 2,
  },
  {
    id: 'prop-mumbai-3',
    image: '/images/prop_lonavala.jpg',
    price: '₹ 5.20 Cr',
    type: '4 BHK Villa',
    location: 'Lonavala, Mumbai',
    area: '3500 sq.ft',
    beds: 4,
    baths: 4,
  },
  {
    id: 'prop-mumbai-4',
    image: '/images/prop_bkc.jpg',
    price: '₹ 3.10 Cr',
    type: 'Office Space',
    location: 'BKC, Mumbai',
    area: '1500 sq.ft',
    parking: 1,
  },
];

export default function PropertyCardGrid({ onSelectProperty, wishlist = [], onToggleWishlist, onSeeAll }) {
  const { isMobile, isTablet } = useResponsive();

  return (
    <section style={{
      background: '#FFFFFF',
      paddingTop: isMobile ? '16px' : '20px',
      paddingBottom: isMobile ? '36px' : '54px',
    }}>
      <div className="rr-container">
        {/* Section Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '20px',
        }}>
          <h2 style={{
            fontSize: isMobile ? '18px' : '22px',
            fontWeight: 700,
            color: '#0F172A',
            margin: 0,
            fontFamily: 'Inter, sans-serif',
            letterSpacing: '-0.02em',
          }}>
            Featured Properties in Mumbai
          </h2>

          <button
            onClick={onSeeAll}
            style={{
              background: 'none',
              border: 'none',
              color: '#0866F5',
              fontSize: '13.5px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontFamily: 'Inter, sans-serif',
              padding: 0,
            }}
          >
            <span>View All</span>
            <ArrowRight size={14} color="#0866F5" />
          </button>
        </div>

        {/* 4-Column Property Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile 
            ? '1fr' 
            : (isTablet ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(260px, 1fr))'),
          gap: isMobile ? '16px' : '20px',
        }}>
          {FEATURED_PROPERTIES.map((prop) => {
            const isSaved = wishlist.includes(prop.id);
            return (
              <div
                key={prop.id}
                onClick={() => onSelectProperty && onSelectProperty(prop)}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  border: '1px solid #EAEFF5',
                  boxShadow: '0 4px 16px rgba(11, 31, 68, 0.04)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  flexDirection: 'column',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 12px 24px rgba(11, 31, 68, 0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(11, 31, 68, 0.04)';
                }}
              >
                {/* Property Photo + Badge + Heart */}
                <div style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '16/10',
                  overflow: 'hidden',
                  background: '#F1F5F9',
                }}>
                  <img
                    src={prop.image}
                    alt={prop.type}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      transition: 'transform 0.4s ease',
                    }}
                    loading="lazy"
                  />

                  {/* Optional Badge */}
                  {prop.badge && (
                    <span style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      background: prop.badgeColor || '#0866F5',
                      color: '#FFFFFF',
                      fontSize: '10.5px',
                      fontWeight: 600,
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontFamily: 'Inter, sans-serif',
                      letterSpacing: '0.02em',
                    }}>
                      {prop.badge}
                    </span>
                  )}

                  {/* Wishlist Heart Icon */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist && onToggleWishlist(prop.id);
                    }}
                    style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: '#FFFFFF',
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                    }}
                    title="Save to wishlist"
                  >
                    <Heart
                      size={15}
                      fill={isSaved ? '#EF4444' : 'none'}
                      color={isSaved ? '#EF4444' : '#475569'}
                      strokeWidth={2}
                    />
                  </button>
                </div>

                {/* Property Card Body */}
                <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  {/* Price */}
                  <div style={{
                    fontSize: '18px',
                    fontWeight: 700,
                    color: '#0F172A',
                    fontFamily: 'Inter, sans-serif',
                    marginBottom: '4px',
                  }}>
                    {prop.price}
                  </div>

                  {/* Type / Configuration */}
                  <div style={{
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#334155',
                    fontFamily: 'Inter, sans-serif',
                    marginBottom: '4px',
                  }}>
                    {prop.type}
                  </div>

                  {/* Location */}
                  <div style={{
                    fontSize: '12px',
                    color: '#94A3B8',
                    fontFamily: 'Inter, sans-serif',
                    marginBottom: '16px',
                  }}>
                    {prop.location}
                  </div>

                  {/* Divider line */}
                  <div style={{
                    borderTop: '1px solid #F1F5F9',
                    paddingTop: '12px',
                    marginTop: 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    fontSize: '11.5px',
                    color: '#64748B',
                    fontFamily: 'Inter, sans-serif',
                  }}>
                    {/* Area */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/></svg>
                      <span>{prop.area}</span>
                    </div>

                    {/* Bedrooms */}
                    {prop.beds && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Bed size={14} color="#94A3B8" />
                        <span>{prop.beds}</span>
                      </div>
                    )}

                    {/* Bathrooms */}
                    {prop.baths && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Bath size={13} color="#94A3B8" />
                        <span>{prop.baths}</span>
                      </div>
                    )}

                    {/* Parking */}
                    {prop.parking && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Car size={14} color="#94A3B8" />
                        <span>{prop.parking}</span>
                      </div>
                    )}
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
