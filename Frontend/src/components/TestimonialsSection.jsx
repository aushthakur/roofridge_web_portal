import React from 'react';
import { Star, ShieldCheck, Quote, CheckCircle2, Award, Heart, MapPin } from 'lucide-react';
import { useResponsive } from '../hooks/useResponsive';

const REVIEWS = [
  {
    id: 1,
    name: 'Ananya & Vikram Sharma',
    role: 'Homeowners · Thane West',
    deal: 'Purchased 3 BHK Lodha Amāra & Modular Interiors',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    headline: 'Handed over in exactly 42 days with zero surprise costs.',
    quote: 'RoofRidge made our entire home acquisition and interior fit-out completely seamless. The 3D VR design preview matched our actual finished apartment down to the millimeter. Saved us weeks of headache and over ₹ 4 Lakhs in interior agency fees.',
  },
  {
    id: 2,
    name: 'Rajesh K. Singhania',
    role: 'Managing Director · Apex Horizon Realty',
    deal: 'Pre-Leased Commercial Asset, BKC (₹ 12.5 Cr)',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    headline: 'Closed with an MNC tenant in 9 days with zero brokerage.',
    quote: 'We listed our high-floor corporate office in Bandra Kurla Complex on RoofRidge. Every lead was verified by their team with proof of funds. No endless broker phone spam, purely qualified institutional inquiries. Unmatched marketplace efficiency.',
  },
  {
    id: 3,
    name: 'Priya & Rohan Mehta',
    role: 'Villa Owners · Lonavala Hillside',
    deal: 'Turnkey Construction & Direct Materials Supply',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
    headline: 'Saved ₹ 3.2 Lakhs by purchasing wholesale TMT steel & cement direct.',
    quote: 'Buying TATA Tiscon steel and UltraTech cement straight through RoofRidge’s factory direct channel was a game changer for our villa build. Daily site deliveries with mill test certificates gave us complete peace of mind on structural quality.',
  },
];

export default function TestimonialsSection() {
  const { isMobile, isTablet } = useResponsive();

  return (
    <section style={{
      padding: isMobile ? '40px 0' : '72px 0',
      background: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFD 100%)',
      position: 'relative',
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: isMobile ? '0 16px' : '0 28px' }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: isMobile ? '0 auto 32px auto' : '0 auto 48px auto' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            color: '#0866F5',
            fontSize: '0.76rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: '10px',
          }}>
            <Award size={15} /> VERIFIED CLIENT TESTIMONIALS
          </div>
          <h2 style={{
            fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
            fontWeight: 800,
            color: '#0F172A',
            letterSpacing: '-0.025em',
            lineHeight: 1.2,
            margin: '0 0 12px 0',
          }}>
            Trusted by 250,000+ Homeowners &amp; Builders
          </h2>
          <p style={{
            fontSize: '0.96rem',
            color: '#64748B',
            lineHeight: 1.6,
            margin: '0 0 24px 0',
          }}>
            Real stories from families, investors and architects who found their properties and executed turnkey living spaces with RoofRidge.
          </p>

          {/* Social Proof Trust Badges Bar */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: isMobile ? '12px' : '24px',
            background: '#FFFFFF',
            border: '1px solid #E5EBF4',
            borderRadius: '30px',
            padding: isMobile ? '10px 16px' : '10px 24px',
            boxShadow: '0 4px 16px rgba(11, 31, 68, 0.04)',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ display: 'flex', gap: '2px' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill="#F59E0B" color="#F59E0B" />
                ))}
              </div>
              <span style={{ fontSize: '0.84rem', fontWeight: 800, color: '#0F172A' }}>4.9 / 5.0</span>
              <span style={{ fontSize: '0.74rem', color: '#64748B' }}>(18k+ reviews)</span>
            </div>

            <div style={{ width: '1px', height: '16px', background: '#E2E8F0', display: isMobile ? 'none' : 'block' }} />

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', fontWeight: 700, color: '#059669' }}>
              <ShieldCheck size={16} /> 100% RERA Verified Listings
            </div>

            <div style={{ width: '1px', height: '16px', background: '#E2E8F0', display: isMobile ? 'none' : 'block' }} />

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', fontWeight: 700, color: '#0866F5' }}>
              <CheckCircle2 size={16} /> Zero Brokerage Direct
            </div>
          </div>
        </div>

        {/* 3 Editorial Review Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile 
            ? '1fr' 
            : (isTablet ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))'),
          gap: isMobile ? '16px' : '28px',
        }}>
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              style={{
                background: '#FFFFFF',
                borderRadius: '24px',
                border: '1px solid #E5EBF4',
                padding: isMobile ? '24px 20px' : '36px 32px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 8px 24px rgba(11, 31, 68, 0.05)',
                transition: 'all 0.25s ease',
                position: 'relative',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 20px 44px rgba(11, 31, 68, 0.1)';
                e.currentTarget.style.borderColor = '#0866F5';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(11, 31, 68, 0.05)';
                e.currentTarget.style.borderColor = '#E5EBF4';
              }}
            >
              <div>
                {/* Top Row: Stars + Deal Badge */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '20px',
                  flexWrap: 'wrap',
                  gap: '10px',
                }}>
                  <div style={{ display: 'flex', gap: '3px' }}>
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="#F59E0B" color="#F59E0B" />
                    ))}
                  </div>

                  <span style={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    color: '#0866F5',
                    background: '#EEF5FF',
                    padding: '4px 10px',
                    borderRadius: '16px',
                  }}>
                    Verified Transaction
                  </span>
                </div>

                {/* Catchy Bold Headline */}
                <h4 style={{
                  fontSize: '1.08rem',
                  fontWeight: 800,
                  color: '#0F172A',
                  lineHeight: 1.35,
                  margin: '0 0 12px 0',
                }}>
                  "{rev.headline}"
                </h4>

                {/* Quote Text */}
                <p style={{
                  fontSize: '0.88rem',
                  color: '#475569',
                  lineHeight: 1.65,
                  margin: '0 0 24px 0',
                }}>
                  {rev.quote}
                </p>
              </div>

              {/* Author & Transaction Chip */}
              <div>
                <div style={{
                  background: '#F8FAFD',
                  borderRadius: '12px',
                  padding: '10px 14px',
                  fontSize: '0.74rem',
                  fontWeight: 600,
                  color: '#0F172A',
                  marginBottom: '18px',
                  border: '1px solid #EDF2F7',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}>
                  <MapPin size={13} color="#0866F5" style={{ flexShrink: 0 }} />
                  <span><span style={{ color: '#64748B' }}>Property Deal:</span> {rev.deal}</span>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  paddingTop: '16px',
                  borderTop: '1px solid #F1F5F9',
                }}>
                  <div style={{ position: 'relative' }}>
                    <img
                      src={rev.avatar}
                      alt={rev.name}
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: '2px solid #FFFFFF',
                        boxShadow: '0 2px 10px rgba(0,0,0,0.12)',
                      }}
                    />
                    <div style={{
                      position: 'absolute',
                      bottom: '-2px',
                      right: '-2px',
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      background: '#059669',
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '10px',
                      border: '2px solid #FFFFFF',
                    }}>
                      ✓
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: '0.96rem', fontWeight: 800, color: '#0F172A' }}>
                      {rev.name}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#64748B' }}>
                      {rev.role}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
