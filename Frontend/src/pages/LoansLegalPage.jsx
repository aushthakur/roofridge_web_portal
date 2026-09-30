import React, { useState } from 'react';
import { ArrowRight, CheckCircle, Calculator, ShieldCheck, FileText, Award } from 'lucide-react';

const BANKS = [
  { name: 'SBI Home Loans', rate: '8.10%', tag: 'Lowest Rate', maxLoan: '₹ 10 Cr', processing: '0.35%', tenure: '30 Years', logo: '🏦', features: ['Pre-approved in 3 days', 'Zero prepayment penalty', 'Top-up loan available'] },
  { name: 'HDFC Bank', rate: '8.35%', tag: 'Most Popular', maxLoan: '₹ 15 Cr', processing: '0.50%', tenure: '30 Years', logo: '🏛️', features: ['Same-day sanction letter', 'Balance transfer facility', 'Online account management'] },
  { name: 'ICICI Bank', rate: '8.40%', tag: 'Fast Disbursal', maxLoan: '₹ 20 Cr', processing: '0.45%', tenure: '30 Years', logo: '🔵', features: ['72-hour disbursal', 'Step-up EMI option', 'Digital documentation'] },
  { name: 'Axis Bank', rate: '8.55%', tag: 'Flexible Tenure', maxLoan: '₹ 8 Cr', processing: '1.00%', tenure: '30 Years', logo: '🟣', features: ['Flexible EMI structure', 'Overdraft facility', 'Repo-rate linked'] },
];

const LEGAL_SERVICES = [
  { icon: FileText, title: '30-Year Title Search', price: '₹ 8,000', desc: 'Complete historical ownership chain verification from revenue records, mutation entries and encumbrance certificate for 30 years.', turnaround: '3 Working Days' },
  { icon: ShieldCheck, title: 'Sale Deed Drafting', price: '₹ 5,500', desc: 'Legally vetted sale deed prepared by empanelled advocates with RERA clause compliance and stamp duty calculation.', turnaround: '2 Working Days' },
  { icon: Award, title: 'RERA Project Compliance Audit', price: '₹ 12,000', desc: 'Full RERA registration audit of builder project including escrow account verification, commencement & occupancy certificates.', turnaround: '5 Working Days' },
  { icon: FileText, title: 'Encumbrance Certificate', price: '₹ 3,000', desc: 'Official EC from Sub-Registrar for the past 15 years — mandatory for home loan disbursement.', turnaround: '3 Working Days' },
  { icon: ShieldCheck, title: 'Property Tax & Mutation', price: '₹ 4,500', desc: 'Name mutation in municipal records post-purchase and property tax assessment revision in buyer\'s name.', turnaround: '7 Working Days' },
  { icon: FileText, title: 'NRI Power of Attorney', price: '₹ 9,000', desc: 'Notarised and apostilled PoA drafting for NRI property transactions with full legal representation.', turnaround: '4 Working Days' },
];

export default function LoansLegalPage({ onOpenAuth }) {
  const [loanAmt, setLoanAmt] = useState(7500000);
  const [rate, setRate] = useState(8.25);
  const [tenure, setTenure] = useState(20);

  const mr = rate / 12 / 100;
  const mn = tenure * 12;
  const emi = Math.round((loanAmt * mr * Math.pow(1 + mr, mn)) / (Math.pow(1 + mr, mn) - 1));
  const total = emi * mn;
  const interest = total - loanAmt;
  const amtPct = ((loanAmt - 1000000) / (50000000 - 1000000)) * 100;
  const ratePct = ((rate - 6) / (15 - 6)) * 100;
  const tenurePct = ((tenure - 1) / (30 - 1)) * 100;

  return (
    <div className="animate-fade" style={{ background: '#FFFFFF' }}>

      {/* ── HERO ── */}
      <div style={{ position: 'relative', background: '#0B192C', overflow: 'hidden', padding: '64px 0 52px' }}>
        <img src="https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1800&q=70" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.15 }} />
        <div className="rr-container" style={{ position: 'relative', zIndex: 2 }}>
          <p style={eyebrow}><span style={{ display: 'inline-block', width: '24px', height: '2px', background: 'rgba(255,255,255,0.3)' }} /> Pre-Approved Banking Partners · RERA Legal Desk</p>
          <h1 style={heroH1}>Home Loans, RERA Verification<br />&amp; Legal Documentation</h1>
          <p style={heroSub}>Compare instant pre-approved rates from SBI, HDFC & ICICI starting at 8.10%. Full legal title verification by empanelled advocates.</p>
          <div style={{ display: 'flex', gap: '24px', marginTop: '28px', flexWrap: 'wrap' }}>
            {['Pre-Approved in 3 Days', '100% Online Documentation', 'RERA Legal Audit', '30-Year Title Search'].map(t => (
              <div key={t} style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                <CheckCircle size={14} style={{ color: 'rgba(255,255,255,0.55)' }} />
                <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.65)', fontFamily: 'Manrope, sans-serif' }}>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── EMI CALCULATOR ── */}
      <section style={{ background: '#F8F7F4', borderBottom: '1px solid #E4E1DA', padding: '64px 0' }}>
        <div className="rr-container">
          <div style={{ marginBottom: '32px' }}>
            <p className="section-label">EMI Calculator</p>
            <h2 className="section-h2">Calculate Your Monthly EMI Instantly</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '2px', background: '#E4E1DA', border: '1px solid #E4E1DA', borderRadius: '2px', overflow: 'hidden' }}>

            {/* Loan Amount */}
            <div style={{ background: 'white', padding: '32px 28px' }}>
              <p style={fLabel}>Required Loan Amount</p>
              <p style={bigNum}>₹ {(loanAmt / 100000).toFixed(0)} <span style={unit}>Lakhs</span></p>
              <p style={{ fontSize: '0.7rem', color: '#9CA3AF', fontFamily: 'Manrope, sans-serif', marginBottom: '16px' }}>10L – 5 Cr range</p>
              <input type="range" min={1000000} max={50000000} step={500000} value={loanAmt} onChange={e => setLoanAmt(Number(e.target.value))}
                style={{ width: '100%', appearance: 'none', height: '3px', borderRadius: '2px', outline: 'none', cursor: 'pointer', background: `linear-gradient(to right, #0B192C ${amtPct}%, #DDD8D0 ${amtPct}%)` }} />
            </div>

            {/* Interest Rate */}
            <div style={{ background: 'white', padding: '32px 28px' }}>
              <p style={fLabel}>Interest Rate (per annum)</p>
              <p style={bigNum}>{rate.toFixed(2)} <span style={unit}>% p.a.</span></p>
              <p style={{ fontSize: '0.7rem', color: '#9CA3AF', fontFamily: 'Manrope, sans-serif', marginBottom: '16px' }}>6.00% – 15.00%</p>
              <input type="range" min={6} max={15} step={0.05} value={rate} onChange={e => setRate(Number(e.target.value))}
                style={{ width: '100%', appearance: 'none', height: '3px', borderRadius: '2px', outline: 'none', cursor: 'pointer', background: `linear-gradient(to right, #0B192C ${ratePct}%, #DDD8D0 ${ratePct}%)` }} />
            </div>

            {/* Tenure */}
            <div style={{ background: 'white', padding: '32px 28px' }}>
              <p style={fLabel}>Loan Tenure</p>
              <p style={bigNum}>{tenure} <span style={unit}>Years</span></p>
              <p style={{ fontSize: '0.7rem', color: '#9CA3AF', fontFamily: 'Manrope, sans-serif', marginBottom: '16px' }}>1 – 30 Years</p>
              <input type="range" min={1} max={30} step={1} value={tenure} onChange={e => setTenure(Number(e.target.value))}
                style={{ width: '100%', appearance: 'none', height: '3px', borderRadius: '2px', outline: 'none', cursor: 'pointer', background: `linear-gradient(to right, #0B192C ${tenurePct}%, #DDD8D0 ${tenurePct}%)` }} />
            </div>

            {/* Result */}
            <div style={{ background: '#0B192C', padding: '32px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <p style={{ fontSize: '0.62rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', fontFamily: 'Manrope, sans-serif', marginBottom: '14px' }}>Monthly EMI</p>
                <p style={{ fontSize: '2rem', fontWeight: 800, color: 'white', letterSpacing: '-0.04em', fontFamily: 'Manrope, sans-serif', lineHeight: 1, marginBottom: '20px' }}>
                  ₹ {emi.toLocaleString()}
                </p>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '14px' }}>
                  {[
                    { k: 'Total Payment', v: `₹ ${(total / 100000).toFixed(1)}L` },
                    { k: 'Principal', v: `₹ ${(loanAmt / 100000).toFixed(1)}L` },
                    { k: 'Total Interest', v: `₹ ${(interest / 100000).toFixed(1)}L` },
                  ].map(r => (
                    <div key={r.k} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.35)', fontFamily: 'Manrope, sans-serif' }}>{r.k}</span>
                      <span style={{ fontSize: '0.74rem', fontWeight: 600, color: 'rgba(255,255,255,0.65)', fontFamily: 'Manrope, sans-serif' }}>{r.v}</span>
                    </div>
                  ))}
                </div>
              </div>
              <button onClick={onOpenAuth}
                style={{ marginTop: '20px', width: '100%', background: 'white', color: '#0B192C', border: 'none', borderRadius: '2px', padding: '13px 16px', fontSize: '0.74rem', fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer', fontFamily: 'Manrope, sans-serif' }}>
                Apply for Pre-Approval <ArrowRight size={13} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── BANK COMPARISON ── */}
      <section className="rr-section">
        <div className="rr-container">
          <div className="section-header-row" style={{ marginBottom: '28px' }}>
            <div>
              <p className="section-label">Banking Partners</p>
              <h2 className="section-h2">Compare Pre-Approved Home Loan Rates</h2>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px', background: '#E4E1DA', border: '1px solid #E4E1DA', borderRadius: '2px', overflow: 'hidden' }}>
            {BANKS.map(b => (
              <div key={b.name} style={{ background: 'white', padding: '28px 24px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <span style={{ fontSize: '1.5rem' }}>{b.logo}</span>
                  <span style={{ background: '#F8F7F4', border: '1px solid #E4E1DA', fontSize: '0.62rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '3px 8px', borderRadius: '2px', color: '#0B192C', fontFamily: 'Manrope, sans-serif' }}>{b.tag}</span>
                </div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0B192C', marginBottom: '14px', fontFamily: 'Manrope, sans-serif' }}>{b.name}</h3>
                <div style={{ marginBottom: '16px' }}>
                  <p style={{ fontSize: '2rem', fontWeight: 800, color: '#0B192C', letterSpacing: '-0.04em', fontFamily: 'Manrope, sans-serif', lineHeight: 1 }}>{b.rate}</p>
                  <p style={{ fontSize: '0.72rem', color: '#9CA3AF', fontFamily: 'Manrope, sans-serif' }}>effective rate p.a.</p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid #F0EDE7' }}>
                  {[['Max Loan', b.maxLoan], ['Processing', b.processing], ['Tenure', b.tenure]].map(([k, v]) => (
                    <div key={k}>
                      <p style={{ fontSize: '0.62rem', color: '#9CA3AF', fontFamily: 'Manrope, sans-serif', marginBottom: '2px' }}>{k}</p>
                      <p style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0B192C', fontFamily: 'Manrope, sans-serif' }}>{v}</p>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '20px' }}>
                  {b.features.map(f => (
                    <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                      <CheckCircle size={12} style={{ color: '#0B192C', flexShrink: 0, marginTop: '2px' }} />
                      <span style={{ fontSize: '0.76rem', color: '#6B6B6B', fontFamily: 'Manrope, sans-serif' }}>{f}</span>
                    </div>
                  ))}
                </div>
                <button onClick={onOpenAuth} style={{ marginTop: 'auto', width: '100%', background: '#0B192C', color: 'white', border: 'none', borderRadius: '2px', padding: '11px', fontSize: '0.74rem', fontWeight: 800, cursor: 'pointer', fontFamily: 'Manrope, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                  Apply Now <ArrowRight size={13} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LEGAL SERVICES ── */}
      <section style={{ background: '#F8F7F4', borderTop: '1px solid #E4E1DA', padding: '72px 0' }}>
        <div className="rr-container">
          <div className="section-header-row" style={{ marginBottom: '28px' }}>
            <div>
              <p className="section-label">RERA Legal Desk</p>
              <h2 className="section-h2">Property Legal Services by Empanelled Advocates</h2>
              <p className="section-sub">Fixed-fee, transparent legal documentation with guaranteed turnaround times.</p>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: '#E4E1DA', border: '1px solid #E4E1DA', borderRadius: '2px', overflow: 'hidden' }}>
            {LEGAL_SERVICES.map(s => (
              <div key={s.title} style={{ background: 'white', padding: '28px 26px', cursor: 'pointer', transition: 'background 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.background = '#FAFAF8'}
                onMouseLeave={e => e.currentTarget.style.background = 'white'}>
                <s.icon size={20} style={{ color: '#0B192C', marginBottom: '14px' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0B192C', fontFamily: 'Manrope, sans-serif', lineHeight: 1.3, maxWidth: '200px' }}>{s.title}</h3>
                  <span style={{ fontSize: '1rem', fontWeight: 800, color: '#0B192C', fontFamily: 'Manrope, sans-serif', flexShrink: 0, marginLeft: '12px' }}>{s.price}</span>
                </div>
                <p style={{ fontSize: '0.8rem', color: '#6B6B6B', lineHeight: 1.65, fontFamily: 'Manrope, sans-serif', marginBottom: '14px' }}>{s.desc}</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.7rem', color: '#9CA3AF', fontFamily: 'Manrope, sans-serif' }}>Turnaround: {s.turnaround}</span>
                  <button onClick={onOpenAuth} style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.74rem', fontWeight: 700, color: '#0B192C', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Manrope, sans-serif', borderBottom: '1.5px solid #0B192C', paddingBottom: '1px' }}>
                    Order <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`input[type='range']::-webkit-slider-thumb { -webkit-appearance: none; width: 16px; height: 16px; border-radius: 50%; background: #0B192C; border: 2px solid white; box-shadow: 0 0 0 1.5px #0B192C; cursor: pointer; }`}</style>
    </div>
  );
}

const eyebrow = { fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', fontFamily: 'Manrope, sans-serif' };
const heroH1 = { fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', fontWeight: 800, color: 'white', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '14px', maxWidth: '700px' };
const heroSub = { fontSize: '0.95rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.65, maxWidth: '520px', fontFamily: 'Manrope, sans-serif' };
const fLabel = { fontSize: '0.62rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9CA3AF', fontFamily: 'Manrope, sans-serif', marginBottom: '10px' };
const bigNum = { fontSize: '2rem', fontWeight: 800, color: '#0B192C', letterSpacing: '-0.04em', fontFamily: 'Manrope, sans-serif', lineHeight: 1, marginBottom: '2px' };
const unit = { fontSize: '0.9rem', fontWeight: 500, color: '#9CA3AF' };
