import React from 'react';
import { Heart, MapPin, Star, ArrowRight } from 'lucide-react';
import { PROPERTIES } from '../data/mockData';

export default function PropertyCardGrid({ properties = PROPERTIES, onSelectProperty, wishlist = [], onToggleWishlist }) {
  return (
    <section className="rr-section" style={{ paddingTop: '64px', paddingBottom: '64px' }}>
      <div className="rr-container">

        <div className="section-header-row" style={{ marginBottom: '28px' }}>
          <div>
            <p className="section-label">Find Your Next Address</p>
            <h2 className="section-h2">Curated homes. Verified listings.</h2>
            <p className="section-sub">Every property is RERA-registered, physically inspected & brokerage-free.</p>
          </div>
          <button className="section-see-all">
            View All Listings <ArrowRight size={14} />
          </button>
        </div>

        <div className="property-grid">
          {properties.map(item => {
            const saved = wishlist.includes(item.id);
            return (
              <div key={item.id} className="property-card">

                <div className="card-image-wrap">
                  <img src={item.image} alt={item.title} className="card-img" />
                  <span className="card-badge">{item.badge}</span>
                  <button
                    className={`card-save-btn${saved ? ' saved' : ''}`}
                    onClick={e => { e.stopPropagation(); onToggleWishlist(item.id); }}
                    title={saved ? 'Saved' : 'Save'}
                  >
                    <Heart size={14} fill={saved ? '#EF4444' : 'none'} stroke={saved ? '#EF4444' : 'currentColor'} />
                  </button>
                </div>

                <div className="card-body">
                  <p className="card-location">
                    <MapPin size={11} />
                    {item.location}
                  </p>
                  <h3 className="card-title">{item.title}</h3>
                  <div className="card-specs">
                    <span>{item.specs}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '3px', fontWeight: 600, color: '#0B192C' }}>
                      <Star size={11} fill="#0B192C" />
                      {item.rating}
                    </span>
                  </div>
                  <div className="card-bottom">
                    <span className="card-price">{item.price}</span>
                    <button className="card-cta" onClick={() => onSelectProperty(item)}>
                      View Property <ArrowRight size={12} />
                    </button>
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
