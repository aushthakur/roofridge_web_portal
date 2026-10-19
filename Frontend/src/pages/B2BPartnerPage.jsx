import React, { useState } from 'react';
import { ArrowRight, CheckCircle, Building2, Users, DollarSign, TrendingUp, Package, Briefcase, BarChart3, Award } from 'lucide-react';
import { useResponsive, useCols } from '../hooks/useResponsive';

const STATS = [
  { value: '45,800+', label: 'Active Buyer Enquiries', sub: '↑ 24% month-on-month' },
  { value: '1,420+', label: 'Verified Developer Partners', sub: 'Across 35 cities' },
  { value: '₹ 2,400 Cr+', label: 'Project RFPs Processed', sub: 'In FY 2025–26' },
  { value: '8.5%', label: 'Average Rental ROI', sub: 'For pre-leased commercial' },
];

const PARTNER_TYPES = [
  { icon: Building2, title: 'Real Estate Developers', desc: 'List RERA-approved projects, get direct buyer leads and manage inquiry pipelines from your partner dashboard.', benefits: ['Verified RERA listing badge', 'CRM lead management', 'Digital brochure distribution', '25 lakh+ active buyer reach'] },
  { icon: Package, title: 'Building Material Suppliers', desc: 'List your products on the B2B wholesale marketplace, get bulk order RFQs and manage logistics from one dashboard.', benefits: ['B2B catalogue listing', 'Bulk RFQ management', 'Factory-to-site logistics', 'GST-compliant invoicing'] },
  { icon: Users, title: 'Interior Designers & Architects', desc: 'Receive turnkey interior project referrals from verified homeowners and manage client projects digitally.', benefits: ['Project referral pipeline', 'Digital portfolio showcase', 'Client payment management', 'Design consultation bookings'] },
  { icon: Briefcase, title: 'Civil Contractors', desc: 'Get verified construction project RFPs from homeowners and builders, bid digitally and manage site milestones.', benefits: ['Verified project RFPs', 'Digital bid submission', 'CCTV site milestone tracker', 'GST billing & TDS filing'] },
];

const PROCESS = [
  { step: '01', title: 'Submit Application', desc: 'Fill in your business details, GST number, RERA/trade licence and a portfolio of past projects.' },
  { step: '02', title: 'Background Verification', desc: 'Our partner team conducts a 72-hour background check — legal, financial and professional credentials.' },
  { step: '03', title: 'Dashboard Onboarding', desc: 'You receive a dedicated B2B Partner Dashboard with CRM, lead management and analytics.' },
  { step: '04', title: 'Go Live & Grow', desc: 'Your profile goes live to our 25L+ active buyers and you start receiving verified leads immediately.' },
];

const PRICING = [
  { tier: 'Verified Partner', price: 'Free', sub: 'Forever free listing', features: ['Basic profile listing', 'Up to 5 project listings', 'Enquiry inbox (manual)', 'Roof Ridge verified badge'] },
  { tier: 'Growth Partner', price: '₹ 4,999', sub: 'Per month + GST', recommended: true, features: ['Unlimited project listings', 'Priority lead placement', 'CRM dashboard access', 'Analytics & reporting', 'WhatsApp auto-alerts', 'Dedicated Account Manager'] },
  { tier: 'Enterprise Alliance', price: 'Custom', sub: 'Annual contract', features: ['White-label integration', 'API access for ERP sync', 'Co-branded marketing', 'Dedicated sales pod', 'Priority emergency support', 'Custom SLA agreement'] },
];

export default function B2BPartnerPage({ onOpenAuth }) {
  const [activeType, setActiveType] = useState(0);

  const { isMobile } = useResponsive();
  const heroCols = useCols({ desktop: '1.2fr 1fr', tablet: '1fr', mobile: '1fr' });
  const statsCols = useCols({ desktop: '1fr 1fr', tablet: '1fr 1fr', mobile: '1fr' });
  const activePanelCols = useCols({ desktop: '1fr 1fr', tablet: '1fr', mobile: '1fr' });
  const processCols = useCols({ desktop: 'repeat(4, 1fr)', tablet: 'repeat(2, 1fr)', mobile: '1fr' });
  const pricingCols = useCols({ desktop: 'repeat(3, 1fr)', tablet: 'repeat(2, 1fr)', mobile: '1fr' });

  return (
    <div className="animate-fade" style={{ background: '#FFFFFF', fontFamily: 'var(--font-body)' }}>

      {/* ── HERO ── */}
      <div style={{ position: 'relative', background: 'linear-gradient(135deg, #0866F5 0%, #0645B8 100%)', overflow: 'hidden', padding: isMobile ? '20px 0 16px' : '28px 0 24px' }}>
        <img
          src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1800&q=70"
          alt="B2B Office"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.14 }}
        />
        <div className="rr-container" style={{ position: 'relative', zIndex: 2, padding: isMobile ? '0 16px' : undefined }}>
          <div style={{ display: 'grid', gridTemplateColumns: heroCols, gap: isMobile ? '20px' : '36px', alignItems: 'center' }}>
            <div>
              <p style={eyebrow}>
                <span style={{ display: 'inline-block', width: '16px', height: '2px', background: '#38BDF8' }} />
                Roof Ridge Business Alliance
              </p>
              <h1 style={heroH1}>
                Partner Portal for Builders, Contractors &amp; Suppliers
              </h1>
              <p style={heroSub}>
                Access 25 lakh+ verified buyer leads, stream material procurement at factory prices and manage project RFPs — all from one professional dashboard.
              </p>
              <div style={{ display: 'flex', gap: '10px', marginTop: '16px', flexWrap: 'wrap' }}>
                <button
                  onClick={onOpenAuth}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: 'linear-gradient(135deg, #0866F5 0%, #0653CA 100%)',
                    color: '#FFFFFF',
                    padding: '10px 20px',
                    fontSize: '0.8rem',
                    fontWeight: 800,
                    borderRadius: '24px',
                    cursor: 'pointer',
                    border: 'none',
                    boxShadow: '0 4px 14px rgba(8, 102, 245, 0.35)',
                    transition: 'transform 0.15s, box-shadow 0.15s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 18px rgba(8, 102, 245, 0.45)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 14px rgba(8, 102, 245, 0.35)';
                  }}
                >
                  Register as Partner <ArrowRight size={14} />
                </button>
                <button
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: 'rgba(255,255,255,0.08)',
                    color: '#FFFFFF',
                    padding: '10px 18px',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    borderRadius: '24px',
                    cursor: 'pointer',
                    border: '1.5px solid rgba(255,255,255,0.2)',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
                >
                  Download Partner Kit
                </button>
              </div>
            </div>

            {/* Stats panel */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: statsCols,
                gap: '10px',
                background: 'rgba(255,255,255,0.04)',
                border: '1.5px solid rgba(255,255,255,0.1)',
                borderRadius: '16px',
                padding: '12px',
                backdropFilter: 'blur(12px)',
              }}
            >
              {STATS.map((s, i) => (
                <div
                  key={i}
                  style={{
                    background: 'rgba(11, 31, 68, 0.65)',
                    padding: '14px 14px',
                    borderRadius: '10px',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <p style={{ fontSize: '1.4rem', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em', lineHeight: 1, marginBottom: '4px' }}>{s.value}</p>
                  <p style={{ fontSize: '0.78rem', fontWeight: 600, color: 'rgba(255,255,255,0.85)', marginBottom: '2px' }}>{s.label}</p>
                  <p style={{ fontSize: '0.68rem', color: '#38BDF8' }}>{s.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── PARTNER TYPE TABS ── */}
      <section className="rr-section" style={{ padding: isMobile ? '36px 0' : '56px 0' }}>
        <div className="rr-container" style={{ padding: isMobile ? '0 16px' : undefined }}>
          <div style={{ marginBottom: '32px' }}>
            <p className="section-label">Partner Categories</p>
            <h2 className="section-h2">Who Can Partner with Roof Ridge?</h2>
          </div>

          {/* Tab nav */}
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', marginBottom: '16px', paddingBottom: '4px' }}>
            {PARTNER_TYPES.map((pt, i) => {
              const isActive = activeType === i;
              return (
                <button
                  key={i}
                  onClick={() => setActiveType(i)}
                  style={{
                    padding: '12px 20px',
                    borderRadius: '30px',
                    border: isActive ? '1.5px solid #0866F5' : '1.5px solid #E2E8F0',
                    cursor: 'pointer',
                    fontSize: '0.84rem',
                    fontWeight: isActive ? 700 : 500,
                    background: isActive ? '#0866F5' : '#FFFFFF',
                    color: isActive ? '#FFFFFF' : '#475569',
                    transition: 'all 0.15s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    whiteSpace: 'nowrap',
                    boxShadow: isActive ? '0 4px 12px rgba(8, 102, 245, 0.25)' : 'none',
                  }}
                >
                  <pt.icon size={16} /> {pt.title}
                </button>
              );
            })}
          </div>

          {/* Active partner panel */}
          <div
            style={{
              background: 'linear-gradient(135deg, #0866F5 0%, #0645B8 100%)',
              borderRadius: '24px',
              padding: isMobile ? '28px 20px' : '44px 48px',
              display: 'grid',
              gridTemplateColumns: activePanelCols,
              gap: isMobile ? '32px' : '48px',
              border: '1.5px solid rgba(255,255,255,0.2)',
              boxShadow: '0 12px 36px rgba(8, 102, 245, 0.25)',
            }}
          >
            <div>
              <h3 style={{ fontSize: isMobile ? '1.3rem' : '1.6rem', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em', marginBottom: '14px' }}>
                {PARTNER_TYPES[activeType].title}
              </h3>
              <p style={{ fontSize: '0.94rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, marginBottom: '28px' }}>
                {PARTNER_TYPES[activeType].desc}
              </p>
              <button
                onClick={onOpenAuth}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'linear-gradient(135deg, #0866F5 0%, #0653CA 100%)',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '30px',
                  padding: '14px 26px',
                  fontSize: '0.84rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  boxShadow: '0 6px 20px rgba(8, 102, 245, 0.4)',
                }}
              >
                Apply as {PARTNER_TYPES[activeType].title.split(' ')[0]} Partner <ArrowRight size={14} />
              </button>
            </div>
            <div>
              <p style={{ fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#38BDF8', marginBottom: '18px' }}>
                What You Get
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {PARTNER_TYPES[activeType].benefits.map(b => (
                  <div key={b} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(56, 189, 248, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <CheckCircle size={15} style={{ color: '#38BDF8' }} />
                    </div>
                    <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.88)' }}>{b}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ONBOARDING PROCESS ── */}
      <section style={{ background: '#F8FAFC', borderTop: '1px solid #E2E8F0', padding: isMobile ? '48px 0' : '72px 0' }}>
        <div className="rr-container" style={{ padding: isMobile ? '0 16px' : undefined }}>
          <div style={{ marginBottom: '36px', textAlign: isMobile ? 'left' : 'center' }}>
            <p style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#0866F5', marginBottom: '8px' }}>
              ONBOARDING PROCESS
            </p>
            <h2 style={{ fontSize: isMobile ? '1.5rem' : '2rem', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em' }}>
              Go Live in 72 Hours
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: processCols, gap: '20px' }}>
            {PROCESS.map((p, i) => (
              <div
                key={i}
                style={{
                  background: '#FFFFFF',
                  padding: '30px 24px',
                  borderRadius: '18px',
                  border: '1.5px solid #E2E8F0',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
                }}
              >
                <p style={{ fontSize: '2rem', fontWeight: 800, color: '#0866F5', opacity: 0.35, letterSpacing: '-0.04em', marginBottom: '12px', lineHeight: 1 }}>{p.step}</p>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0F172A', marginBottom: '8px' }}>{p.title}</h3>
                <p style={{ fontSize: '0.84rem', color: '#64748B', lineHeight: 1.65 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING TIERS ── */}
      <section className="rr-section" style={{ padding: isMobile ? '36px 0' : '64px 0' }}>
        <div className="rr-container" style={{ padding: isMobile ? '0 16px' : undefined }}>
          <div style={{ marginBottom: '36px', textAlign: isMobile ? 'left' : 'center' }}>
            <p style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#0866F5', marginBottom: '8px' }}>
              PARTNER PRICING
            </p>
            <h2 style={{ fontSize: isMobile ? '1.5rem' : '2rem', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em' }}>
              Simple, Transparent Partner Plans
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: pricingCols, gap: '24px' }}>
            {PRICING.map(p => (
              <div
                key={p.tier}
                style={{
                  background: p.recommended ? 'linear-gradient(135deg, #0866F5 0%, #0645B8 100%)' : '#FFFFFF',
                  borderRadius: '20px',
                  border: p.recommended ? '2px solid #0866F5' : '1.5px solid #E2E8F0',
                  boxShadow: p.recommended ? '0 12px 32px rgba(8, 102, 245, 0.25)' : '0 4px 16px rgba(0, 0, 0, 0.05)',
                  padding: '36px 30px',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.2s',
                }}
              >
                {p.recommended && (
                  <span
                    style={{
                      alignSelf: 'flex-start',
                      background: 'rgba(255,255,255,0.2)',
                      color: '#FFFFFF',
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      marginBottom: '16px',
                    }}
                  >
                    Recommended
                  </span>
                )}
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: p.recommended ? '#FFFFFF' : '#0F172A', marginBottom: '8px' }}>{p.tier}</h3>
                <p style={{ fontSize: '2.2rem', fontWeight: 800, color: p.recommended ? '#FFFFFF' : '#0F172A', letterSpacing: '-0.03em', lineHeight: 1, marginBottom: '4px' }}>{p.price}</p>
                <p style={{ fontSize: '0.78rem', color: p.recommended ? 'rgba(255,255,255,0.7)' : '#94A3B8', marginBottom: '24px' }}>{p.sub}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1, marginBottom: '28px' }}>
                  {p.features.map(f => (
                    <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <CheckCircle size={15} style={{ color: p.recommended ? '#93C5FD' : '#0866F5', flexShrink: 0, marginTop: '2px' }} />
                      <span style={{ fontSize: '0.84rem', color: p.recommended ? 'rgba(255,255,255,0.9)' : '#475569' }}>{f}</span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={onOpenAuth}
                  style={{
                    width: '100%',
                    background: p.recommended ? '#FFFFFF' : 'linear-gradient(135deg, #0866F5 0%, #0645B8 100%)',
                    color: p.recommended ? '#0866F5' : '#FFFFFF',
                    border: 'none',
                    borderRadius: '30px',
                    padding: '14px',
                    fontSize: '0.84rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: p.recommended ? '0 6px 20px rgba(8, 102, 245, 0.4)' : 'none',
                    transition: 'all 0.2s',
                  }}
                >
                  Get Started <ArrowRight size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

const eyebrow = {
  fontSize: '0.68rem',
  fontWeight: 800,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: '#38BDF8',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  marginBottom: '6px',
};
const heroH1 = {
  fontSize: 'clamp(1.35rem, 2.2vw, 1.75rem)',
  fontWeight: 800,
  color: '#FFFFFF',
  letterSpacing: '-0.02em',
  lineHeight: 1.2,
  marginBottom: '6px',
  maxWidth: '680px',
};
const heroSub = {
  fontSize: '0.84rem',
  color: 'rgba(255,255,255,0.85)',
  lineHeight: 1.5,
  maxWidth: '560px',
};
