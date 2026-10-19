import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, Heart, Mail, Phone, MapPin, CheckCircle2 } from 'lucide-react';

export default function Footer({ onNavigate }) {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (email) setDone(true);
  };

  return (
    <footer style={{ background: 'linear-gradient(135deg, #0866F5 0%, #0645B8 100%)', color: '#FFFFFF', fontFamily: 'Inter, sans-serif' }}>

      {/* ── Newsletter Strip ── */}
      <div style={{
        background: 'rgba(0, 0, 0, 0.14)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
        padding: '44px 0',
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 28px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '24px',
          }}>
            <div>
              <span style={{
                fontSize: '0.72rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#60A5FA',
                display: 'block',
                marginBottom: '6px',
              }}>
                RoofRidge Privilege Club
              </span>
              <h3 style={{
                fontSize: '1.45rem',
                fontWeight: 700,
                color: '#FFFFFF',
                letterSpacing: '-0.02em',
                margin: '0 0 6px 0',
              }}>
                Get Early Access to RERA Price Drops & Luxury Launches
              </h3>
              <p style={{
                fontSize: '0.86rem',
                color: 'rgba(255, 255, 255, 0.7)',
                margin: 0,
              }}>
                Weekly property insights, prime locality yield reports & interior blueprint trends.
              </p>
            </div>

            {done ? (
              <div style={{
                background: 'rgba(5, 150, 105, 0.2)',
                border: '1px solid rgba(5, 150, 105, 0.4)',
                borderRadius: '12px',
                padding: '12px 24px',
                color: '#6EE7B7',
                fontSize: '0.88rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}>
                <CheckCircle2 size={18} /> Thank you! You’re subscribed to RoofRidge Privilege Club.
              </div>
            ) : (
              <form
                onSubmit={submit}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  maxWidth: '440px',
                  width: '100%',
                }}
              >
                <div style={{ position: 'relative', flex: 1 }}>
                  <Mail
                    size={18}
                    style={{
                      position: 'absolute',
                      left: '14px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: 'rgba(255, 255, 255, 0.4)',
                    }}
                  />
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '13px 14px 13px 42px',
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(255, 255, 255, 0.16)',
                      borderRadius: '10px',
                      color: '#FFFFFF',
                      fontSize: '0.88rem',
                      outline: 'none',
                    }}
                  />
                </div>
                <button
                  type="submit"
                  style={{
                    padding: '13px 22px',
                    borderRadius: '10px',
                    background: '#0866F5',
                    color: '#FFFFFF',
                    border: 'none',
                    fontSize: '0.88rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    flexShrink: 0,
                    transition: 'background 0.15s ease',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#0654CC'}
                  onMouseLeave={(e) => e.currentTarget.style.background = '#0866F5'}
                >
                  Subscribe <ArrowRight size={14} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* ── Main Footer Columns ── */}
      <div style={{ padding: '64px 0 40px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 28px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '40px',
            marginBottom: '48px',
          }}>
            
            {/* Brand Column */}
            <div style={{ gridColumn: 'span 1' }}>
              <img
                src="/RRlogo_white.png"
                alt="RoofRidge"
                style={{ height: '36px', objectFit: 'contain', marginBottom: '16px' }}
                onError={(e) => {
                  e.currentTarget.src = '/RRlogo_transparent.png';
                  e.currentTarget.style.filter = 'brightness(0) invert(1)';
                }}
              />
              <p style={{
                fontSize: '0.84rem',
                color: 'rgba(255, 255, 255, 0.65)',
                lineHeight: 1.6,
                margin: '0 0 20px 0',
              }}>
                India’s premier integrated real estate, modular interiors, building materials and home loan ecosystem. Spaces for people, possibilities for tomorrow.
              </p>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '8px',
                padding: '6px 12px',
                fontSize: '0.74rem',
                color: 'rgba(255, 255, 255, 0.8)',
              }}>
                <ShieldCheck size={14} color="#60A5FA" /> RERA Registered · ISO 9001:2026
              </div>
            </div>

            {/* Properties */}
            <div>
              <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '18px', letterSpacing: '0.02em' }}>
                Properties
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  { label: 'Buy Apartments in Mumbai', route: 'buy' },
                  { label: 'New Project Launches', route: 'buy' },
                  { label: 'Independent Luxury Villas', route: 'buy' },
                  { label: 'Rental Homes & Co-living', route: 'rent' },
                  { label: 'Commercial Offices & Retail', route: 'buy' },
                  { label: 'Plots & Land Parcels', route: 'buy' },
                ].map((item, idx) => (
                  <li key={idx}>
                    <button
                      onClick={() => onNavigate && onNavigate(item.route)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'rgba(255, 255, 255, 0.65)',
                        fontSize: '0.82rem',
                        cursor: 'pointer',
                        padding: 0,
                        textAlign: 'left',
                        transition: 'color 0.15s ease',
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#FFFFFF'}
                      onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.65)'}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Modular Interiors */}
            <div>
              <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '18px', letterSpacing: '0.02em' }}>
                Modular Interiors
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  { label: 'Modular Kitchens', route: 'interiors' },
                  { label: 'Custom Wardrobes', route: 'interiors' },
                  { label: 'Living Room Design', route: 'interiors' },
                  { label: 'Free 3D VR Blueprint', route: 'interiors' },
                  { label: '10-Year Warranty Care', route: 'interiors' },
                  { label: 'Interior Cost Calculator', route: 'interiors' },
                ].map((item, idx) => (
                  <li key={idx}>
                    <button
                      onClick={() => onNavigate && onNavigate(item.route)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'rgba(255, 255, 255, 0.65)',
                        fontSize: '0.82rem',
                        cursor: 'pointer',
                        padding: 0,
                        textAlign: 'left',
                        transition: 'color 0.15s ease',
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#FFFFFF'}
                      onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.65)'}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Build & Materials */}
            <div>
              <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '18px', letterSpacing: '0.02em' }}>
                Build & Materials
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  { label: 'Turnkey Construction Contracts', route: 'construction' },
                  { label: 'UltraTech & ACC Cement', route: 'materials' },
                  { label: 'TATA Tiscon TMT Rebars', route: 'materials' },
                  { label: 'Kajaria Vitrified Tiles', route: 'materials' },
                  { label: 'Smart Home Automation', route: 'materials' },
                  { label: 'B2B Contractor Pricing', route: 'materials' },
                ].map((item, idx) => (
                  <li key={idx}>
                    <button
                      onClick={() => onNavigate && onNavigate(item.route)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'rgba(255, 255, 255, 0.65)',
                        fontSize: '0.82rem',
                        cursor: 'pointer',
                        padding: 0,
                        textAlign: 'left',
                        transition: 'color 0.15s ease',
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#FFFFFF'}
                      onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.65)'}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Finance & Support */}
            <div>
              <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '18px', letterSpacing: '0.02em' }}>
                Finance & Legal
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  { label: 'Home Loans (8.40% p.a.)', route: 'loans' },
                  { label: 'EMI Calculator', route: 'loans' },
                  { label: 'RERA Title Verification', route: 'legal' },
                  { label: 'Sale Deed e-Drafting', route: 'legal' },
                  { label: 'Post Property for Free', route: 'b2b' },
                  { label: 'Customer Help Desk 24/7', route: 'services' },
                ].map((item, idx) => (
                  <li key={idx}>
                    <button
                      onClick={() => onNavigate && onNavigate(item.route)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'rgba(255, 255, 255, 0.65)',
                        fontSize: '0.82rem',
                        cursor: 'pointer',
                        padding: 0,
                        textAlign: 'left',
                        transition: 'color 0.15s ease',
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#FFFFFF'}
                      onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.65)'}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Bottom Bar */}
          <div style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            paddingTop: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            fontSize: '0.78rem',
            color: 'rgba(255, 255, 255, 0.5)',
          }}>
            <p style={{ margin: 0 }}>
              © 2026 RoofRidge Ecosystem Pvt. Ltd. All rights reserved. RERA No: PRM/KA/RERA/1251/310/PR/26022026.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              Crafted with <Heart size={13} fill="#EF4444" color="#EF4444" /> for modern homeowners & investors across India
            </div>
          </div>

        </div>
      </div>

    </footer>
  );
}
