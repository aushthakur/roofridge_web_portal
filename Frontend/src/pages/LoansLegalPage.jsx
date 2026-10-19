import React, { useState, useEffect } from 'react';
import {
  ArrowRight, CheckCircle, Calculator, ShieldCheck, FileText,
  Award, Landmark, Phone, Check, ChevronDown, ChevronUp,
  HelpCircle, Clock, Percent, DollarSign, Sparkles
} from 'lucide-react';
import { useResponsive } from '../hooks/useResponsive';

const BANKS = [
  {
    id: 'sbi',
    name: 'State Bank of India',
    scheme: 'SBI Regular Home Loan',
    rate: '8.10%',
    tag: 'Lowest Rate in Market',
    maxLoan: '₹ 10 Cr',
    processing: '0.35%',
    tenure: '30 Years',
    image: 'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?auto=format&fit=crop&w=600&q=80',
    logoBadge: 'SBI',
    badgeBg: '#0054A6',
    features: ['Pre-approved in 3 days', 'Zero prepayment penalty', 'Top-up loan facility up to 25L']
  },
  {
    id: 'hdfc',
    name: 'HDFC Bank',
    scheme: 'HDFC Reach Home Loan',
    rate: '8.35%',
    tag: 'Most Popular Choice',
    maxLoan: '₹ 15 Cr',
    processing: '0.50%',
    tenure: '30 Years',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80',
    logoBadge: 'HDFC',
    badgeBg: '#004C8F',
    features: ['Same-day digital sanction letter', 'Balance transfer interest reduction', 'Online doorstep documentation']
  },
  {
    id: 'icici',
    name: 'ICICI Bank',
    scheme: 'ICICI Instant Home Loan',
    rate: '8.40%',
    tag: 'Fast 72h Disbursal',
    maxLoan: '₹ 20 Cr',
    processing: '0.45%',
    tenure: '30 Years',
    image: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&w=600&q=80',
    logoBadge: 'ICICI',
    badgeBg: '#C0392B',
    features: ['72-hour loan disbursal', 'Step-up EMI for young buyers', '100% paperless digital verification']
  },
  {
    id: 'axis',
    name: 'Axis Bank',
    scheme: 'Axis Shubh Aarambh Loan',
    rate: '8.55%',
    tag: 'Flexible Balloon Repayment',
    maxLoan: '₹ 8 Cr',
    processing: '1.00%',
    tenure: '30 Years',
    image: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=600&q=80',
    logoBadge: 'AXIS',
    badgeBg: '#97144D',
    features: ['Flexible balloon repayment options', 'Home loan overdraft account', 'Repo-rate linked transparent pricing']
  },
];

const LEGAL_SERVICES = [
  {
    icon: FileText,
    title: '30-Year Title Search Report',
    price: '₹ 8,000',
    turnaround: '3 Working Days',
    image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80',
    tag: 'Resale Verification',
    desc: 'Complete historical ownership chain audit from revenue department, mutation registers, and sub-registrar encumbrance check.'
  },
  {
    icon: ShieldCheck,
    title: 'Sale Deed Drafting & Vetting',
    price: '₹ 5,500',
    turnaround: '2 Working Days',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80',
    tag: 'High Court Vetted',
    desc: 'Legally binding sale deed vetted by High Court advocates with mandatory RERA clause protection and stamp duty calculation.'
  },
  {
    icon: Award,
    title: 'RERA Project Compliance Audit',
    price: '₹ 12,000',
    turnaround: '5 Working Days',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80',
    tag: 'Builder Audit',
    desc: 'In-depth audit of developer RERA registration, commencement certificate, escrow account status, and sanctioned layout plan.'
  },
  {
    icon: FileText,
    title: 'Encumbrance Certificate (EC)',
    price: '₹ 3,000',
    turnaround: '3 Working Days',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80',
    tag: 'Sub-Registrar Record',
    desc: 'Procurement of official nil-encumbrance certificate from Sub-Registrar records — essential for bank loan sanction.'
  },
  {
    icon: ShieldCheck,
    title: 'Property Tax & Name Mutation',
    price: '₹ 4,500',
    turnaround: '7 Working Days',
    image: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=600&q=80',
    tag: 'Municipal Record',
    desc: 'Official name mutation in municipal records post-purchase, ensuring municipal tax bills reflect the new owner name.'
  },
  {
    icon: FileText,
    title: 'NRI Power of Attorney (PoA)',
    price: '₹ 9,000',
    turnaround: '4 Working Days',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=600&q=80',
    tag: 'Global Legal Service',
    desc: 'Notarised and apostilled PoA drafting for NRI property buyers/sellers with full legal verification and registration.'
  },
];

const FAQS = [
  {
    q: 'Why is a 30-Year Title Search mandatory before buying a resale property?',
    a: 'A 30-year title search verifies that the seller has clear, marketable ownership without undisclosed family disputes, court litigations, mortgage liens, or unpaid municipal debts.'
  },
  {
    q: 'How does RoofRidge help me get pre-approved home loan rates?',
    a: 'We have direct API integrations and empanelled desks with SBI, HDFC, and ICICI. Our loan officers process your digital KYC to deliver competitive interest rates with zero processing markup.'
  },
  {
    q: 'What is RERA Escrow account verification?',
    a: 'Under RERA Section 4(2)(l)(D), builders must deposit 70% of buyer funds into a dedicated escrow account used exclusively for construction. Our audit verifies that funds are not being diverted.'
  },
  {
    q: 'Can NRIs buy properties in India without physical travel?',
    a: 'Yes. Through a registered Power of Attorney (PoA) drafted by our legal team, you can authorise a trusted representative to execute registration while you sign digitally from abroad.'
  },
];

export default function LoansLegalPage({ mode = 'loans', onOpenAuth }) {
  const [activeTab, setActiveTab] = useState(mode === 'legal' || mode === 'advice' ? 'legal' : 'loans');
  const [loanAmt, setLoanAmt] = useState(7500000);
  const [rate, setRate] = useState(8.25);
  const [tenure, setTenure] = useState(20);
  const [openFaq, setOpenFaq] = useState(0);
  const { isMobile, isTablet } = useResponsive();

  useEffect(() => {
    if (mode === 'legal' || mode === 'advice') {
      setActiveTab('legal');
    } else if (mode === 'loans') {
      setActiveTab('loans');
    }
  }, [mode]);

  // EMI Math Calculation
  const monthlyRate = rate / 12 / 100;
  const totalMonths = tenure * 12;
  const emi = Math.round(
    (loanAmt * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
    (Math.pow(1 + monthlyRate, totalMonths) - 1)
  );
  const totalRepayment = emi * totalMonths;
  const totalInterest = totalRepayment - loanAmt;
  const principalPct = Math.round((loanAmt / totalRepayment) * 100);
  const interestPct = 100 - principalPct;

  return (
    <div style={{ background: '#FFFFFF', minHeight: '90vh', fontFamily: 'Inter, sans-serif' }}>

      {/* ── 1. COMPACT EXECUTIVE HERO BANNER ── */}
      <section style={{
        background: 'linear-gradient(180deg, #EEF5FF 0%, #FFFFFF 100%)',
        borderBottom: '1px solid #E5EBF4',
        padding: isMobile ? '16px 0 14px' : '20px 0 16px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div className="rr-container" style={{ position: 'relative', zIndex: 2 }}>
          {/* Main Flex Row: Title + Tab Switcher */}
          <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: isMobile ? 'flex-start' : 'center',
            justifyContent: 'space-between',
            gap: isMobile ? '12px' : '20px',
          }}>
            {/* Left: Eyebrow + Crisp Heading */}
            <div style={{ maxWidth: isMobile ? '100%' : '680px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '11px',
                  fontWeight: 800,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: '#0866F5',
                }}>
                  <Landmark size={13} color="#0866F5" />
                  PRE-APPROVED BANKING PARTNERS · RERA LEGAL & TITLE DESK
                </span>
              </div>

              <h1 style={{
                fontSize: isMobile ? '20px' : '24px',
                fontWeight: 800,
                color: '#0F172A',
                lineHeight: 1.25,
                letterSpacing: '-0.02em',
                margin: '0 0 4px 0',
              }}>
                {activeTab === 'loans'
                  ? 'Low-Interest Home Loans & Real-Time EMI Calculator'
                  : 'Empanelled RERA Legal Advisory & 30-Year Title Search'}
              </h1>

              <p style={{
                fontSize: '12.5px',
                color: '#64748B',
                lineHeight: 1.5,
                margin: 0,
              }}>
                {activeTab === 'loans'
                  ? 'Compare pre-approved loan sanctions from SBI, HDFC & ICICI starting at 8.10% p.a. with zero prepayment penalties.'
                  : 'Fixed-fee legal title verification, agreement drafting, and municipal mutation transfer by empanelled High Court advocates.'}
              </p>
            </div>

            {/* Right: Primary Tab Switcher */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '30px',
              padding: '3px',
              boxShadow: '0 2px 8px rgba(8, 102, 245, 0.05)',
              flexShrink: 0,
            }}>
              <button
                onClick={() => setActiveTab('loans')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: activeTab === 'loans' ? '#0866F5' : 'transparent',
                  color: activeTab === 'loans' ? '#FFFFFF' : '#475569',
                  border: 'none',
                  borderRadius: '20px',
                  padding: '7px 16px',
                  fontSize: '12.5px',
                  fontWeight: activeTab === 'loans' ? 700 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  boxShadow: activeTab === 'loans' ? '0 2px 8px rgba(8, 102, 245, 0.25)' : 'none',
                }}
              >
                <Calculator size={14} />
                <span>Home Loans & EMI</span>
              </button>

              <button
                onClick={() => setActiveTab('legal')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: activeTab === 'legal' ? '#0866F5' : 'transparent',
                  color: activeTab === 'legal' ? '#FFFFFF' : '#475569',
                  border: 'none',
                  borderRadius: '20px',
                  padding: '7px 16px',
                  fontSize: '12.5px',
                  fontWeight: activeTab === 'legal' ? 700 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  boxShadow: activeTab === 'legal' ? '0 2px 8px rgba(8, 102, 245, 0.25)' : 'none',
                }}
              >
                <ShieldCheck size={14} />
                <span>RERA Legal Desk</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. TAB 1: HOME LOANS & EMI CALCULATOR ── */}
      {activeTab === 'loans' && (
        <>
          {/* Interactive EMI Calculator Section */}
          <section style={{ padding: '64px 0', background: '#FFFFFF' }}>
            <div className="rr-container">
              <div style={{ marginBottom: '32px' }}>
                <span style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  color: '#0866F5',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: '8px',
                }}>
                  Financial Planner
                </span>
                <h2 style={{
                  fontSize: isMobile ? '24px' : '34px',
                  fontWeight: 800,
                  color: '#0F172A',
                  letterSpacing: '-0.02em',
                }}>
                  Calculate Your Monthly EMI Instantly
                </h2>
              </div>

              {/* Dual-Panel Calculator Card */}
              <div style={{
                background: '#FFFFFF',
                border: '1px solid #E5EBF4',
                borderRadius: '20px',
                overflow: 'hidden',
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : '1.3fr 1fr',
                boxShadow: '0 8px 30px rgba(11, 31, 68, 0.05)',
              }}>
                {/* Left: Input Sliders */}
                <div style={{ padding: isMobile ? '24px' : '40px' }}>
                  {/* Slider 1: Loan Amount */}
                  <div style={{ marginBottom: '32px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                      <label style={sliderLabel}>Required Loan Amount</label>
                      <span style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A' }}>
                        ₹ {(loanAmt / 100000).toFixed(0)} <span style={{ fontSize: '14px', fontWeight: 500, color: '#64748B' }}>Lakhs</span>
                      </span>
                    </div>
                    <input
                      type="range"
                      min={1000000}
                      max={50000000}
                      step={500000}
                      value={loanAmt}
                      onChange={e => setLoanAmt(Number(e.target.value))}
                      style={{
                        width: '100%',
                        accentColor: '#0866F5',
                        height: '6px',
                        cursor: 'pointer',
                      }}
                    />
                    <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                      {[2500000, 5000000, 7500000, 15000000].map(val => (
                        <button
                          key={val}
                          onClick={() => setLoanAmt(val)}
                          style={{
                            padding: '4px 10px',
                            borderRadius: '6px',
                            border: loanAmt === val ? '1.5px solid #0866F5' : '1px solid #E5EBF4',
                            background: loanAmt === val ? '#EEF5FF' : '#F8FAFD',
                            color: loanAmt === val ? '#0866F5' : '#64748B',
                            fontSize: '11px',
                            fontWeight: 600,
                            cursor: 'pointer',
                          }}
                        >
                          ₹ {val >= 10000000 ? `${(val/10000000).toFixed(1)} Cr` : `${val/100000} L`}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Slider 2: Interest Rate */}
                  <div style={{ marginBottom: '32px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                      <label style={sliderLabel}>Interest Rate (p.a.)</label>
                      <span style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A' }}>
                        {rate.toFixed(2)} <span style={{ fontSize: '14px', fontWeight: 500, color: '#64748B' }}>%</span>
                      </span>
                    </div>
                    <input
                      type="range"
                      min={6.5}
                      max={14.0}
                      step={0.05}
                      value={rate}
                      onChange={e => setRate(Number(e.target.value))}
                      style={{
                        width: '100%',
                        accentColor: '#0866F5',
                        height: '6px',
                        cursor: 'pointer',
                      }}
                    />
                    <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                      {[8.10, 8.35, 8.40, 8.55].map(r => (
                        <button
                          key={r}
                          onClick={() => setRate(r)}
                          style={{
                            padding: '4px 10px',
                            borderRadius: '6px',
                            border: rate === r ? '1.5px solid #0866F5' : '1px solid #E5EBF4',
                            background: rate === r ? '#EEF5FF' : '#F8FAFD',
                            color: rate === r ? '#0866F5' : '#64748B',
                            fontSize: '11px',
                            fontWeight: 600,
                            cursor: 'pointer',
                          }}
                        >
                          {r}% {r === 8.10 ? '(SBI)' : r === 8.35 ? '(HDFC)' : '(ICICI)'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Slider 3: Loan Tenure */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                      <label style={sliderLabel}>Loan Tenure</label>
                      <span style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A' }}>
                        {tenure} <span style={{ fontSize: '14px', fontWeight: 500, color: '#64748B' }}>Years</span>
                      </span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={30}
                      step={1}
                      value={tenure}
                      onChange={e => setTenure(Number(e.target.value))}
                      style={{
                        width: '100%',
                        accentColor: '#0866F5',
                        height: '6px',
                        cursor: 'pointer',
                      }}
                    />
                    <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                      {[10, 15, 20, 25, 30].map(yr => (
                        <button
                          key={yr}
                          onClick={() => setTenure(yr)}
                          style={{
                            padding: '4px 10px',
                            borderRadius: '6px',
                            border: tenure === yr ? '1.5px solid #0866F5' : '1px solid #E5EBF4',
                            background: tenure === yr ? '#EEF5FF' : '#F8FAFD',
                            color: tenure === yr ? '#0866F5' : '#64748B',
                            fontSize: '11px',
                            fontWeight: 600,
                            cursor: 'pointer',
                          }}
                        >
                          {yr} Yrs
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: Output Summary Panel */}
                <div style={{
                  background: 'linear-gradient(135deg, #0866F5 0%, #0645B8 100%)',
                  padding: isMobile ? '28px' : '40px',
                  color: '#FFFFFF',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}>
                  <div>
                    <span style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: 'rgba(255, 255, 255, 0.6)',
                      display: 'block',
                      marginBottom: '8px',
                    }}>
                      Monthly EMI Payable
                    </span>
                    <div style={{
                      fontSize: isMobile ? '32px' : '40px',
                      fontWeight: 800,
                      letterSpacing: '-0.03em',
                      marginBottom: '6px',
                    }}>
                      ₹ {emi.toLocaleString()}
                    </div>
                    <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', marginBottom: '28px' }}>
                      Calculated for {tenure} years at {rate}% p.a.
                    </p>

                    {/* Progress Bar Breakdown */}
                    <div style={{ marginBottom: '24px' }}>
                      <div style={{
                        height: '10px',
                        borderRadius: '6px',
                        background: 'rgba(255, 255, 255, 0.15)',
                        overflow: 'hidden',
                        display: 'flex',
                        marginBottom: '10px',
                      }}>
                        <div style={{ width: `${principalPct}%`, background: '#0866F5' }} />
                        <div style={{ width: `${interestPct}%`, background: '#38BDF8' }} />
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'rgba(255,255,255,0.8)' }}>
                          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#0866F5' }} />
                          Principal ({principalPct}%)
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'rgba(255,255,255,0.8)' }}>
                          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#38BDF8' }} />
                          Interest ({interestPct}%)
                        </span>
                      </div>
                    </div>

                    {/* Itemized Table */}
                    <div style={{
                      borderTop: '1px solid rgba(255,255,255,0.12)',
                      paddingTop: '16px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px',
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                        <span style={{ color: 'rgba(255,255,255,0.6)' }}>Principal Amount:</span>
                        <span style={{ fontWeight: 600 }}>₹ {(loanAmt / 100000).toFixed(1)} Lakhs</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                        <span style={{ color: 'rgba(255,255,255,0.6)' }}>Total Interest Payable:</span>
                        <span style={{ fontWeight: 600 }}>₹ {(totalInterest / 100000).toFixed(1)} Lakhs</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                        <span style={{ color: 'rgba(255,255,255,0.6)' }}>Total Amount Payable:</span>
                        <span style={{ fontWeight: 700, color: '#38BDF8' }}>₹ {(totalRepayment / 100000).toFixed(1)} Lakhs</span>
                      </div>
                    </div>
                  </div>

                  {/* Apply CTA */}
                  <button
                    onClick={onOpenAuth}
                    style={{
                      marginTop: '32px',
                      width: '100%',
                      background: '#0866F5',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '12px',
                      padding: '14px',
                      fontSize: '14px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      boxShadow: '0 4px 16px rgba(8, 102, 245, 0.4)',
                    }}
                  >
                    <span>Check Pre-Approved Eligibility</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Bank Comparison Matrix */}
          <section style={{
            background: '#F8FAFD',
            borderTop: '1px solid #E5EBF4',
            padding: '64px 0',
          }}>
            <div className="rr-container">
              <div style={{ marginBottom: '36px' }}>
                <span style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  color: '#0866F5',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: '8px',
                }}>
                  Empanelled Lenders
                </span>
                <h2 style={{
                  fontSize: isMobile ? '24px' : '32px',
                  fontWeight: 800,
                  color: '#0F172A',
                  letterSpacing: '-0.02em',
                }}>
                  Compare Pre-Approved Home Loan Rates
                </h2>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : (isTablet ? '1fr 1fr' : 'repeat(4, 1fr)'),
                gap: '20px',
              }}>
                {BANKS.map((b) => (
                  <div
                    key={b.name}
                    style={{
                      background: '#FFFFFF',
                      border: '1px solid #E2E8F0',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      boxShadow: '0 4px 16px rgba(8, 102, 245, 0.05)',
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.boxShadow = '0 12px 28px rgba(8, 102, 245, 0.12)';
                      e.currentTarget.style.borderColor = '#0866F5';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 16px rgba(8, 102, 245, 0.05)';
                      e.currentTarget.style.borderColor = '#E2E8F0';
                    }}
                  >
                    <div>
                      {/* Top Image Banner */}
                      <div style={{ position: 'relative', width: '100%', height: '140px', overflow: 'hidden' }}>
                        <img
                          src={b.image}
                          alt={b.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        <div style={{
                          position: 'absolute',
                          inset: 0,
                          background: 'linear-gradient(to top, rgba(15, 23, 42, 0.75) 0%, rgba(15, 23, 42, 0.1) 60%)',
                        }} />
                        {/* Brand Badge */}
                        <div style={{
                          position: 'absolute',
                          top: '12px',
                          left: '12px',
                          background: b.badgeBg,
                          color: '#FFFFFF',
                          fontSize: '11px',
                          fontWeight: 800,
                          letterSpacing: '0.05em',
                          padding: '4px 10px',
                          borderRadius: '6px',
                          boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                        }}>
                          {b.logoBadge}
                        </div>
                        {/* Tag */}
                        <div style={{
                          position: 'absolute',
                          bottom: '10px',
                          left: '12px',
                          background: 'rgba(255, 255, 255, 0.95)',
                          color: '#0866F5',
                          fontSize: '11px',
                          fontWeight: 700,
                          padding: '3px 8px',
                          borderRadius: '6px',
                        }}>
                          {b.tag}
                        </div>
                      </div>

                      <div style={{ padding: '20px' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', marginBottom: '2px' }}>
                          {b.name}
                        </h3>
                        <p style={{ fontSize: '12px', color: '#64748B', marginBottom: '14px' }}>
                          {b.scheme}
                        </p>

                        {/* Rate */}
                        <div style={{ marginBottom: '16px', padding: '10px 14px', background: '#F8FAFC', borderRadius: '10px', border: '1px solid #F1F5F9' }}>
                          <div style={{ fontSize: '24px', fontWeight: 800, color: '#0866F5', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                            {b.rate}
                          </div>
                          <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>Annual Interest Rate (Repo-Linked)</div>
                        </div>

                        {/* Specs */}
                        <div style={{
                          background: '#F8FAFC',
                          borderRadius: '10px',
                          padding: '12px',
                          marginBottom: '16px',
                          display: 'grid',
                          gridTemplateColumns: '1fr 1fr',
                          gap: '8px',
                          fontSize: '12px',
                          border: '1px solid #F1F5F9',
                        }}>
                          <div>
                            <div style={{ color: '#64748B', fontSize: '10px', textTransform: 'uppercase', fontWeight: 600 }}>Max Sanction</div>
                            <div style={{ fontWeight: 800, color: '#0F172A' }}>{b.maxLoan}</div>
                          </div>
                          <div>
                            <div style={{ color: '#64748B', fontSize: '10px', textTransform: 'uppercase', fontWeight: 600 }}>Max Tenure</div>
                            <div style={{ fontWeight: 800, color: '#0F172A' }}>{b.tenure}</div>
                          </div>
                        </div>

                        {/* Features */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
                          {b.features.map((f, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', fontSize: '12px' }}>
                              <Check size={14} color="#0866F5" style={{ flexShrink: 0, marginTop: '2px' }} />
                              <span style={{ color: '#475569', lineHeight: 1.4 }}>{f}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div style={{ padding: '0 20px 20px' }}>
                      <button
                        onClick={onOpenAuth}
                        style={{
                          width: '100%',
                          background: '#0866F5',
                          color: '#FFFFFF',
                          border: 'none',
                          borderRadius: '10px',
                          padding: '12px',
                          fontSize: '13px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                          boxShadow: '0 2px 8px rgba(8, 102, 245, 0.25)',
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.background = '#0653CA';
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.background = '#0866F5';
                        }}
                      >
                        Apply for Sanction
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* ── 3. TAB 2: RERA LEGAL DESK & SERVICES ── */}
      {activeTab === 'legal' && (
        <section style={{ padding: '64px 0', background: '#FFFFFF' }}>
          <div className="rr-container">
            <div style={{ marginBottom: '36px' }}>
              <span style={{
                fontSize: '12px',
                fontWeight: 700,
                color: '#0866F5',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '8px',
              }}>
                Fixed-Fee Legal Protection
              </span>
              <h2 style={{
                fontSize: isMobile ? '24px' : '34px',
                fontWeight: 800,
                color: '#0F172A',
                letterSpacing: '-0.02em',
                marginBottom: '8px',
              }}>
                Property Legal Services by Empanelled Advocates
              </h2>
              <p style={{ fontSize: '15px', color: '#64748B', maxWidth: '640px' }}>
                Every service backed by High Court legal title opinions, written guarantees, and transparent fixed fees.
              </p>
            </div>

            {/* 6 Legal Services Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : (isTablet ? '1fr 1fr' : 'repeat(3, 1fr)'),
              gap: '20px',
              marginBottom: '48px',
            }}>
              {LEGAL_SERVICES.map((s, idx) => (
                <div
                  key={idx}
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 4px 16px rgba(8, 102, 245, 0.05)',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 12px 28px rgba(8, 102, 245, 0.12)';
                    e.currentTarget.style.borderColor = '#0866F5';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(8, 102, 245, 0.05)';
                    e.currentTarget.style.borderColor = '#E2E8F0';
                  }}
                >
                  <div>
                    {/* Visual Image Header */}
                    <div style={{ position: 'relative', width: '100%', height: '150px', overflow: 'hidden' }}>
                      <img
                        src={s.image}
                        alt={s.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(15, 23, 42, 0.75) 0%, rgba(15, 23, 42, 0.1) 60%)',
                      }} />
                      <div style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        background: '#0866F5',
                        color: '#FFFFFF',
                        fontSize: '10px',
                        fontWeight: 700,
                        padding: '3px 8px',
                        borderRadius: '4px',
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase',
                      }}>
                        {s.tag}
                      </div>
                      <div style={{
                        position: 'absolute',
                        bottom: '10px',
                        right: '12px',
                        background: '#FFFFFF',
                        color: '#0866F5',
                        fontSize: '15px',
                        fontWeight: 800,
                        padding: '4px 10px',
                        borderRadius: '6px',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                      }}>
                        {s.price}
                      </div>
                    </div>

                    <div style={{ padding: '20px' }}>
                      <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', marginBottom: '8px', lineHeight: 1.3 }}>
                        {s.title}
                      </h3>
                      <p style={{ fontSize: '13px', color: '#64748B', lineHeight: 1.55, marginBottom: '16px' }}>
                        {s.desc}
                      </p>
                    </div>
                  </div>

                  <div style={{
                    padding: '16px 20px',
                    borderTop: '1px solid #F1F5F9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: '#FAFAFA',
                  }}>
                    <span style={{
                      fontSize: '12px',
                      color: '#64748B',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      fontWeight: 500,
                    }}>
                      <Clock size={13} color="#0866F5" /> {s.turnaround}
                    </span>

                    <button
                      onClick={onOpenAuth}
                      style={{
                        background: '#0866F5',
                        color: '#FFFFFF',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '8px 16px',
                        fontSize: '12px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        boxShadow: '0 2px 6px rgba(8, 102, 245, 0.25)',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = '#0653CA';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = '#0866F5';
                      }}
                    >
                      <span>Order Audit</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Direct Lawyer Call Banner */}
            <div style={{
              background: '#EEF5FF',
              border: '1px solid rgba(8, 102, 245, 0.2)',
              borderRadius: '20px',
              padding: isMobile ? '28px 20px' : '36px 44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '24px',
              flexWrap: 'wrap',
            }}>
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A', marginBottom: '6px' }}>
                  Need immediate legal advice on a property contract?
                </h3>
                <p style={{ fontSize: '14px', color: '#475569' }}>
                  Speak directly with an empanelled real estate lawyer for a 30-minute confidential consultation.
                </p>
              </div>
              <button
                onClick={onOpenAuth}
                style={{
                  background: '#0866F5',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '13px 26px',
                  fontSize: '14px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 14px rgba(8, 102, 245, 0.3)',
                }}
              >
                <Phone size={15} />
                <span>Book 30-Min Lawyer Call</span>
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ── 4. RERA & LEGAL ADVISORY FAQS ── */}
      <section style={{
        background: '#F8FAFD',
        borderTop: '1px solid #E5EBF4',
        padding: '64px 0 80px',
      }}>
        <div className="rr-container" style={{ maxWidth: '840px' }}>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <span style={{
              fontSize: '12px',
              fontWeight: 700,
              color: '#0866F5',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '8px',
            }}>
              Got Questions?
            </span>
            <h2 style={{
              fontSize: isMobile ? '24px' : '32px',
              fontWeight: 800,
              color: '#0F172A',
              letterSpacing: '-0.02em',
            }}>
              Frequently Asked Legal & Loan Queries
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid #E5EBF4',
                    borderRadius: '14px',
                    overflow: 'hidden',
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    style={{
                      width: '100%',
                      padding: '18px 22px',
                      background: 'none',
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      textAlign: 'left',
                      cursor: 'pointer',
                      fontSize: '15px',
                      fontWeight: 700,
                      color: isOpen ? '#0866F5' : '#0F172A',
                    }}
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp size={18} color="#0866F5" /> : <ChevronDown size={18} color="#64748B" />}
                  </button>

                  {isOpen && (
                    <div style={{
                      padding: '0 22px 20px',
                      fontSize: '14px',
                      color: '#475569',
                      lineHeight: 1.65,
                    }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
}

const sliderLabel = {
  fontSize: '13px',
  fontWeight: 700,
  color: '#0F172A',
  fontFamily: 'Inter, sans-serif',
};
