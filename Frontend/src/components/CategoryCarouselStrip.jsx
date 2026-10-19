import React from 'react';

const CATEGORIES = [
  {
    id: 'residential',
    title: 'Residential',
    sub: 'Apartments',
    image: '/images/cat_residential.jpg',
    page: 'buy',
  },
  {
    id: 'new_projects',
    title: 'New Projects',
    sub: 'Launches',
    image: '/images/cat_new_projects.jpg',
    page: 'buy',
  },
  {
    id: 'independent',
    title: 'Independent',
    sub: 'Houses',
    image: '/images/cat_independent.jpg',
    page: 'buy',
  },
  {
    id: 'plots',
    title: 'Plots & Land',
    sub: '',
    image: '/images/cat_plots.jpg',
    page: 'buy',
  },
  {
    id: 'commercial',
    title: 'Commercial',
    sub: 'Offices & Retail',
    image: '/images/cat_commercial.jpg',
    page: 'buy',
  },
  {
    id: 'pg',
    title: 'PG & Co-Living',
    sub: '',
    image: '/images/cat_pg.jpg',
    page: 'rent',
  },
  {
    id: 'loans',
    title: 'Home Loans',
    sub: 'Compare & Apply',
    image: '/images/cat_loans.jpg',
    page: 'loans',
  },
  {
    id: 'interiors',
    title: 'Interiors',
    sub: 'Design Your Space',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=400&q=80',
    page: 'interiors',
  },
];

export default function CategoryCarouselStrip({ onExploreCategory }) {
  return (
    <section style={{
      background: '#FFFFFF',
      paddingTop: '68px',
      paddingBottom: '36px',
    }}>
      <div className="rr-container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(118px, 1fr))',
          gap: '12px',
          alignItems: 'stretch',
        }}>
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onExploreCategory && onExploreCategory(cat.page)}
              style={{
                background: '#EEF4FB',
                borderRadius: '12px',
                padding: '8px 8px 12px',
                cursor: 'pointer',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                transition: 'all 0.2s ease',
                border: '1px solid rgba(231, 236, 243, 0.6)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 8px 18px rgba(11, 31, 68, 0.08)';
                e.currentTarget.style.background = '#E8F0FA';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.background = '#EEF4FB';
              }}
            >
              {/* Thumbnail image */}
              <div style={{
                width: '100%',
                height: '74px',
                borderRadius: '8px',
                overflow: 'hidden',
                background: '#E2E8F0',
                marginBottom: '8px',
              }}>
                <img
                  src={cat.image}
                  alt={cat.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                  loading="lazy"
                />
              </div>

              {/* Title & subtitle */}
              <h4 style={{
                fontSize: '12.5px',
                fontWeight: 700,
                color: '#0F172A',
                margin: '0 0 2px 0',
                lineHeight: 1.2,
                fontFamily: 'Inter, sans-serif',
                whiteSpace: 'nowrap',
              }}>
                {cat.title}
              </h4>
              <p style={{
                fontSize: '10.5px',
                color: '#64748B',
                margin: 0,
                lineHeight: 1.2,
                fontFamily: 'Inter, sans-serif',
                whiteSpace: 'nowrap',
              }}>
                {cat.sub}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
