import React, { useState } from 'react';
import { ArrowRight, CheckCircle, Building2, Users, DollarSign, TrendingUp, Package, Briefcase, BarChart3, Award } from 'lucide-react';

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

  return (
    <div className="animate-fade" style={{ background: '#FFFFFF' }}>

      {/* ── HERO ── */}
      <div style={{ position: 'relative', background: '#0B192C', overflow: 'hidden', padding: '80px 0 64px' }}>
        <img src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1800&q=70" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.15 }} />
        <div className="rr-container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '64px', alignItems: 'center' }}>
            <div>
              <p style={eyebrow}><span style={{ display: 'inline-block', width: '24px', height: '2px', background: 'rgba(255,255,255,0.3)' }} /> Roof Ridge Business Alliance</p>
              <h1 style={heroH1}>Partner Portal for Builders,<br />Contractors &amp; Suppliers</h1>
              <p style={heroSub}>Access 25 lakh+ verified buyer leads, stream material procurement at factory prices and manage project RFPs — all from one professional dashboard.</p>
              <div style={{ display: 'flex', gap: '12px', marginTop: '32px' }}>
                <button onClick={onOpenAuth} style={heroCTA}>REGISTER AS PARTNER <ArrowRight size={14} /></button>
                <button style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'transparent', color: 'rgba(255,255,255,0.8)', padding: '13px 22px', fontSize: '0.78rem', fontWeight: 700, borderRadius: '2px', cursor: 'pointer', border: '1.5px solid rgba(255,255,255,0.25)', fontFamily: 'Manrope, sans-serif' }}>
                  Download Partner Kit
                </button>
              </div>
            </div>

            {/* Stats panel */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
              {STATS.map((s, i) => (
                <div key={i} style={{ background: 'rgba(11,25,44,0.7)', padding: '24px 22px', backdropFilter: 'blur(8px)' }}>
                  <p style={{ fontSize: '1.8rem', fontWeight: 800, color: 'white', letterSpacing: '-0.04em', fontFamily: 'Manrope, sans-serif', lineHeight: 1, marginBottom: '6px' }}>{s.value}</p>
                  <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'rgba(255,255,255,0.7)', fontFamily: 'Manrope, sans-serif', marginBottom: '2px' }}>{s.label}</p>
                  <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.35)', fontFamily: 'Manrope, sans-serif' }}>{s.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── PARTNER TYPE TABS ── */}
      <section className="rr-section">
        <div className="rr-container">
          <div style={{ marginBottom: '32px' }}>
            <p className="section-label">Partner Categories</p>
            <h2 className="section-h2">Who Can Partner with Roof Ridge?</h2>
          </div>

          {/* Tab nav */}
          <div style={{ display: 'flex', gap: '2px', marginBottom: '2px', background: '#E4E1DA', borderRadius: '2px 2px 0 0', overflow: 'hidden', border: '1px solid #E4E1DA', borderBottom: 'none' }}>
            {PARTNER_TYPES.map((pt, i) => (
              <button key={i} onClick={() => setActiveType(i)}
                style={{ flex: 1, padding: '14px 16px', border: 'none', cursor: 'pointer', fontSize: '0.82rem', fontWeight: activeType === i ? 700 : 400, fontFamily: 'Manrope, sans-serif', background: activeType === i ? '#0B192C' : 'white', color: activeType === i ? 'white' : '#6B6B6B', transition: 'all 0.15s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <pt.icon size={15} />{pt.title}
              </button>
            ))}
          </div>

          {/* Active partner panel */}
          <div style={{ background: '#0B192C', padding: '40px 44px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', border: '1px solid #E4E1DA', borderTop: 'none' }}>
            <div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'white', letterSpacing: '-0.02em', marginBottom: '14px', fontFamily: 'Manrope, sans-serif' }}>{PARTNER_TYPES[activeType].title}</h3>
              <p style={{ fontSize: '0.92rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, fontFamily: 'Manrope, sans-serif', marginBottom: '28px' }}>{PARTNER_TYPES[activeType].desc}</p>
              <button onClick={onOpenAuth} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'white', color: '#0B192C', border: 'none', borderRadius: '2px', padding: '13px 24px', fontSize: '0.78rem', fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'Manrope, sans-serif' }}>
                Apply as {PARTNER_TYPES[activeType].title.split(' ')[0]} Partner <ArrowRight size={13} />
              </button>
            </div>
            <div>
              <p style={{ fontSize: '0.62rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', fontFamily: 'Manrope, sans-serif', marginBottom: '16px' }}>What You Get</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {PARTNER_TYPES[activeType].benefits.map(b => (
                  <div key={b} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <CheckCircle size={15} style={{ color: 'rgba(255,255,255,0.5)', flexShrink: 0 }} />
                    <span style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.8)', fontFamily: 'Manrope, sans-serif' }}>{b}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ONBOARDING PROCESS ── */}
      <section style={{ background: '#F8F7F4', borderTop: '1px solid #E4E1DA', padding: '72px 0' }}>
        <div className="rr-container">
          <div style={{ marginBottom: '32px' }}>
            <p className="section-label">Onboarding Process</p>
            <h2 className="section-h2">Go Live in 72 Hours</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px', background: '#E4E1DA', border: '1px solid #E4E1DA', borderRadius: '2px', overflow: 'hidden' }}>
            {PROCESS.map((p, i) => (
              <div key={i} style={{ background: 'white', padding: '28px 24px' }}>
                <p style={{ fontSize: '2rem', fontWeight: 800, color: '#E4E1DA', letterSpacing: '-0.04em', fontFamily: 'Manrope, sans-serif', marginBottom: '12px' }}>{p.step}</p>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0B192C', marginBottom: '8px', fontFamily: 'Manrope, sans-serif' }}>{p.title}</h3>
                <p style={{ fontSize: '0.8rem', color: '#6B6B6B', lineHeight: 1.65, fontFamily: 'Manrope, sans-serif' }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING TIERS ── */}
      <section className="rr-section">
        <div className="rr-container">
          <div style={{ marginBottom: '32px' }}>
            <p className="section-label">Partner Pricing</p>
            <h2 className="section-h2">Simple, Transparent Partner Plans</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: '#E4E1DA', border: '1px solid #E4E1DA', borderRadius: '2px', overflow: 'hidden' }}>
            {PRICING.map(p => (
              <div key={p.tier} style={{ background: p.recommended ? '#0B192C' : 'white', padding: '36px 30px', display: 'flex', flexDirection: 'column' }}>
                {p.recommended && <span style={{ display: 'inline-block', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)', color: 'white', fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '3px 8px', borderRadius: '2px', fontFamily: 'Manrope, sans-serif', marginBottom: '16px', alignSelf: 'flex-start' }}>Recommended</span>}
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: p.recommended ? 'white' : '#0B192C', fontFamily: 'Manrope, sans-serif', marginBottom: '8px' }}>{p.tier}</h3>
                <p style={{ fontSize: '2rem', fontWeight: 800, color: p.recommended ? 'white' : '#0B192C', letterSpacing: '-0.03em', fontFamily: 'Manrope, sans-serif', lineHeight: 1, marginBottom: '4px' }}>{p.price}</p>
                <p style={{ fontSize: '0.72rem', color: p.recommended ? 'rgba(255,255,255,0.5)' : '#9CA3AF', fontFamily: 'Manrope, sans-serif', marginBottom: '24px' }}>{p.sub}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '9px', flex: 1, marginBottom: '24px' }}>
                  {p.features.map(f => (
                    <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <CheckCircle size={13} style={{ color: p.recommended ? 'rgba(255,255,255,0.6)' : '#0B192C', flexShrink: 0, marginTop: '2px' }} />
                      <span style={{ fontSize: '0.8rem', color: p.recommended ? 'rgba(255,255,255,0.75)' : '#6B6B6B', fontFamily: 'Manrope, sans-serif' }}>{f}</span>
                    </div>
                  ))}
                </div>
                <button onClick={onOpenAuth}
                  style={{ width: '100%', background: p.recommended ? 'white' : '#0B192C', color: p.recommended ? '#0B192C' : 'white', border: 'none', borderRadius: '2px', padding: '13px', fontSize: '0.78rem', fontWeight: 800, cursor: 'pointer', fontFamily: 'Manrope, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                  Get Started <ArrowRight size={13} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

const eyebrow = { fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', fontFamily: 'Manrope, sans-serif' };
const heroH1 = { fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', fontWeight: 800, color: 'white', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '14px', maxWidth: '640px' };
const heroSub = { fontSize: '0.95rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.65, maxWidth: '480px', fontFamily: 'Manrope, sans-serif' };
const heroCTA = { display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'white', color: '#0B192C', padding: '14px 26px', fontSize: '0.78rem', fontWeight: 800, letterSpacing: '0.07em', textTransform: 'uppercase', borderRadius: '2px', cursor: 'pointer', border: '2px solid white', fontFamily: 'Manrope, sans-serif' };
