import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, Heart, Mail } from 'lucide-react';

export default function Footer({ onNavigate }) {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  const submit = e => {
    e.preventDefault();
    if (email) setDone(true);
  };

  return (
    <footer className="main-footer">

      {/* Newsletter */}
      <div className="footer-newsletter">
        <div className="rr-container">
          <div className="footer-newsletter-inner">
            <div>
              <p style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: '8px' }}>
                Roof Ridge Privilege Club
              </p>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'white', letterSpacing: '-0.02em', marginBottom: '4px' }}>
                Subscribe & Get ₹ 10,000 Voucher on First Booking
              </h3>
              <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.55)' }}>
                Weekly RERA price drops, luxury launch alerts & interior trend books.
              </p>
            </div>

            {done ? (
              <div style={{
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '2px',
                padding: '12px 24px',
                color: 'white',
                fontSize: '0.82rem',
                fontWeight: 600,
                flexShrink: 0,
              }}>
                ✓ Voucher dispatched to your inbox!
              </div>
            ) : (
              <form onSubmit={submit} className="newsletter-form" style={{ flexShrink: 0 }}>
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="newsletter-input"
                />
                <button type="submit" className="newsletter-btn">
                  Subscribe <ArrowRight size={14} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main links */}
      <div className="footer-main">
        <div className="rr-container">
          <div className="footer-grid">

            {/* Brand */}
            <div className="footer-brand-col">
              <img src="/RRlogo.png" alt="Roof Ridge" style={{ filter: 'brightness(0) invert(1)', height: '36px', objectFit: 'contain' }} />
              <p className="footer-brand-desc">
                India's premier integrated real estate, modular interiors, building materials, and home loan ecosystem built for homeowners, contractors and builders.
              </p>
              <div className="footer-cert">
                <ShieldCheck size={15} style={{ color: 'rgba(255,255,255,0.4)' }} />
                <span>RERA Registered Portal · ISO 9001:2026</span>
              </div>
            </div>

            <div>
              <p className="footer-col-title">Properties</p>
              <ul className="footer-links">
                {['Buy Luxury Apartments', 'Independent Villas', 'Sky Penthouses', 'Rental Homes', 'Commercial Assets'].map(l => (
                  <li key={l}><button onClick={() => onNavigate('buy')}>{l}</button></li>
                ))}
              </ul>
            </div>

            <div>
              <p className="footer-col-title">Modular Interiors</p>
              <ul className="footer-links">
                {['Modular Kitchen Solutions', 'Luxe Wardrobes', 'Living Room Designs', '3D VR Consultation', 'False Ceiling & Lighting'].map(l => (
                  <li key={l}><button onClick={() => onNavigate('interiors')}>{l}</button></li>
                ))}
              </ul>
            </div>

            <div>
              <p className="footer-col-title">Build & Materials</p>
              <ul className="footer-links">
                {['Turnkey Construction', 'UltraTech & ACC Cement', 'TATA Tiscon TMT Rebars', 'Kajaria Vitrified Tiles', 'Contractor Bulk Pricing'].map(l => (
                  <li key={l}><button onClick={() => onNavigate('materials')}>{l}</button></li>
                ))}
              </ul>
            </div>

            <div>
              <p className="footer-col-title">Support & Legal</p>
              <ul className="footer-links">
                {['RERA Verification Desk', 'Home Loan Calculator', 'Track Project Status', 'B2B Partner Portal', 'Download Mobile App'].map(l => (
                  <li key={l}><button onClick={() => onNavigate('loans')}>{l}</button></li>
                ))}
              </ul>
            </div>

          </div>

          <div className="footer-bottom">
            <p>© 2026 Roof Ridge Ecosystem Pvt Ltd. All rights reserved.</p>
            <p style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              Crafted with <Heart size={12} fill="rgba(255,255,255,0.35)" stroke="none" /> for modern Indian homeowners
            </p>
          </div>
        </div>
      </div>

    </footer>
  );
}
