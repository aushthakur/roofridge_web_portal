import React from 'react';
import { Palette, Landmark, HardHat, PackageCheck, ArrowRight, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

const SERVICES = [
  {
    id: 'interiors',
    title: 'Modular Interiors & 3D Living',
    tag: '45-Day Handover',
    stat: '12,400+ Homes Completed',
    desc: 'German-engineered modular kitchens, custom walk-in wardrobes & living room architectural woodwork with 10-year warranty.',
    bullets: ['10-Year Flat Replacement Warranty', 'Free 3D VR Blueprint & Site Measurement', 'Strict 45-Day Move-In Guarantee'],
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
    icon: Palette,
    accent: '#0866F5',
    actionText: 'Explore Interiors',
    route: 'interiors',
  },
  {
    id: 'loans',
    title: 'Home Loans & Instant Pre-Approval',
    tag: 'From 8.40% p.a.',
    stat: '₹ 1,800+ Cr Disbursed',
    desc: 'Compare pre-negotiated home loan rates across 15+ premier banks (SBI, HDFC, ICICI). 100% digital paperwork with zero processing fees.',
    bullets: ['Instant Digital Pre-Approval in 10 Min', 'Zero Hidden Fees & Zero Brokerage', 'Doorstep Document Verification'],
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
    icon: Landmark,
    accent: '#059669',
    actionText: 'Check Loan Rates',
    route: 'loans',
  },
  {
    id: 'construction',
    title: 'Turnkey Construction & Civil Works',
    tag: 'Escrow Protected',
    stat: 'Zero Handover Delays',
    desc: 'Build your custom villa or independent floor with RERA-certified structural engineers, master mistris & milestone escrow payouts.',
    bullets: ['Milestone-Linked Escrow Protection', 'Daily 4K CCTV Site Streaming Feeds', 'Comprehensive 50-Year Structural Audit'],
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    icon: HardHat,
    accent: '#D97706',
    actionText: 'Plan Your Build',
    route: 'construction',
  },
  {
    id: 'materials',
    title: 'B2B Wholesale Building Materials',
    tag: 'Factory Direct',
    stat: 'Save Up to 22% Direct',
    desc: 'Procure UltraTech Cement, TATA Tiscon TMT Steel, and Kajaria Vitrified Tiles directly from manufacturers at wholesale contractor pricing.',
    bullets: ['Direct Same-Day Site Dispatch', 'Certified Mill Test Quality Certificates', 'GST Verified Institutional Billing'],
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
    icon: PackageCheck,
    accent: '#7C3AED',
    actionText: 'Wholesale Materials',
    route: 'materials',
  },
];

export default function EcosystemServicesSection({ onNavigate }) {
  return (
    <section style={{
      padding: '84px 0',
      background: '#FFFFFF',
      borderTop: '1px solid #F1F5F9',
      borderBottom: '1px solid #F1F5F9',
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 28px' }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 48px auto' }}>
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
            <Sparkles size={15} /> ALL-IN-ONE LIVING ECOSYSTEM
          </div>
          <h2 style={{
            fontSize: 'clamp(1.9rem, 3vw, 2.5rem)',
            fontWeight: 800,
            color: '#0F172A',
            letterSpacing: '-0.025em',
            lineHeight: 1.2,
            margin: '0 0 12px 0',
          }}>
            Everything for Your Property & Living Spaces
          </h2>
          <p style={{
            fontSize: '0.96rem',
            color: '#64748B',
            lineHeight: 1.6,
            margin: 0,
          }}>
            From verified home acquisition and low-interest bank financing to modular interiors and factory-direct construction materials.
          </p>
        </div>

        {/* 4 Cards with Imagery & Depth */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
        }}>
          {SERVICES.map((s) => {
            const IconComponent = s.icon;
            return (
              <div
                key={s.id}
                onClick={() => onNavigate && onNavigate(s.route)}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '20px',
                  border: '1px solid #E5EBF4',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 8px 24px rgba(11, 31, 68, 0.05)',
                  transition: 'all 0.25s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 18px 36px rgba(11, 31, 68, 0.12)';
                  e.currentTarget.style.borderColor = s.accent;
                  const img = e.currentTarget.querySelector('img');
                  if (img) img.style.transform = 'scale(1.06)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(11, 31, 68, 0.05)';
                  e.currentTarget.style.borderColor = '#E5EBF4';
                  const img = e.currentTarget.querySelector('img');
                  if (img) img.style.transform = 'scale(1)';
                }}
              >
                <div>
                  {/* Visual Header with Overlay & Icon */}
                  <div style={{ position: 'relative', height: '170px', overflow: 'hidden' }}>
                    <img
                      src={s.image}
                      alt={s.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.4s ease',
                      }}
                    />
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(11, 31, 68, 0.8) 0%, rgba(11, 31, 68, 0.2) 60%, transparent 100%)',
                    }} />

                    {/* Top Tag */}
                    <div style={{
                      position: 'absolute',
                      top: '14px',
                      left: '14px',
                      background: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(6px)',
                      color: '#0F172A',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      padding: '4px 10px',
                      borderRadius: '20px',
                    }}>
                      {s.tag}
                    </div>

                    {/* Stat Badge */}
                    <div style={{
                      position: 'absolute',
                      bottom: '12px',
                      left: '14px',
                      color: '#FFFFFF',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      textShadow: '0 1px 3px rgba(0,0,0,0.5)',
                    }}>
                      <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22C55E' }} />
                      {s.stat}
                    </div>

                    {/* Circular Icon in corner */}
                    <div style={{
                      position: 'absolute',
                      bottom: '12px',
                      right: '14px',
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: '#FFFFFF',
                      color: s.accent,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    }}>
                      <IconComponent size={20} />
                    </div>
                  </div>

                  {/* Body Content */}
                  <div style={{ padding: '22px 20px 0 20px' }}>
                    <h3 style={{
                      fontSize: '1.18rem',
                      fontWeight: 800,
                      color: '#0F172A',
                      margin: '0 0 8px 0',
                      letterSpacing: '-0.015em',
                      lineHeight: 1.25,
                    }}>
                      {s.title}
                    </h3>

                    <p style={{
                      fontSize: '0.84rem',
                      color: '#64748B',
                      lineHeight: 1.55,
                      margin: '0 0 16px 0',
                    }}>
                      {s.desc}
                    </p>

                    {/* Bullets */}
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                      paddingTop: '14px',
                      borderTop: '1px solid #F1F5F9',
                      marginBottom: '20px',
                    }}>
                      {s.bullets.map((b, i) => (
                        <div
                          key={i}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            fontSize: '0.78rem',
                            color: '#334155',
                            fontWeight: 500,
                          }}
                        >
                          <CheckCircle2 size={14} color={s.accent} />
                          {b}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom CTA Button */}
                <div style={{ padding: '0 20px 20px 20px' }}>
                  <button
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      background: '#F8FAFD',
                      color: '#0866F5',
                      border: '1px solid #E5EBF4',
                      fontSize: '0.86rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      transition: 'all 0.18s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = s.accent;
                      e.currentTarget.style.color = '#FFFFFF';
                      e.currentTarget.style.borderColor = s.accent;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#F8FAFD';
                      e.currentTarget.style.color = '#0866F5';
                      e.currentTarget.style.borderColor = '#E5EBF4';
                    }}
                  >
                    {s.actionText} <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
