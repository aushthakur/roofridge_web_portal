import React, { useState } from 'react';
import { AMC_PACKAGES } from '../data/mockData';
import { ArrowRight, CheckCircle, Clock, Phone, Zap, Shield, Wrench, Wind, Droplets, Bug, Sun } from 'lucide-react';
import { useResponsive, useCols } from '../hooks/useResponsive';

const EMERGENCY_SERVICES = [
  { icon: Droplets, name: 'Emergency Plumbing', time: '30 min', desc: 'Pipe burst, tap leakage, drain blockage, WC overflow — any plumbing emergency.' },
  { icon: Zap, name: 'Electrical Emergency', time: '30 min', desc: 'Main switch tripping, short circuits, power outage, MCB failures.' },
  { icon: Shield, name: 'Emergency Lockout', time: '30 min', desc: 'Locked out of your home or office — certified locksmiths dispatched immediately.' },
  { icon: Wind, name: 'AC Breakdown', time: '45 min', desc: 'AC not cooling, gas leakage or compressor failure — same-day emergency repair.' },
];

const SCHEDULED_SERVICES = [
  { icon: Droplets, name: 'Deep Home Cleaning', price: '₹ 2,499', sub: '3 BHK (up to 1500 sq.ft)', features: ['Kitchen degreasing', 'Bathroom sanitization', 'Balcony & window cleaning', 'Sofa & carpet shampooing'] },
  { icon: Bug, name: 'Herbal Pest Control', price: '₹ 1,899', sub: 'Full Home Treatment', features: ['Cockroach & ant gel treatment', 'Rodent baiting stations', 'Mosquito larvicide spray', 'Bed bug treatment'] },
  { icon: Sun, name: 'Solar Panel Cleaning', price: '₹ 999', sub: 'Per Panel (min 4 panels)', features: ['Deionised water cleaning', 'Efficiency report post-clean', 'Panel health check', 'Warranty-safe process'] },
  { icon: Droplets, name: 'Water Tank Sanitization', price: '₹ 1,499', sub: 'Up to 5,000 litres', features: ['Drain & manual scrubbing', 'Chlorine disinfection', 'Water quality test', 'Bio-enzyme treatment'] },
];

export default function MaintenancePage({ onOpenAuth, onBookMaintenance }) {
  const [selectedPkg, setSelectedPkg] = useState(AMC_PACKAGES?.[0] || null);
  const [emergencyBooked, setEmergencyBooked] = useState(false);

  const { isMobile } = useResponsive();
  const emergencyCols = useCols({ desktop: 'repeat(4, 1fr)', tablet: 'repeat(2, 1fr)', mobile: '1fr' });
  const amcCols = useCols({ desktop: 'repeat(3, 1fr)', tablet: 'repeat(2, 1fr)', mobile: '1fr' });
  const scheduledCols = useCols({ desktop: 'repeat(4, 1fr)', tablet: 'repeat(2, 1fr)', mobile: '1fr' });

  return (
    <div className="animate-fade" style={{ background: '#FFFFFF', fontFamily: 'var(--font-body)' }}>

      {/* ── HERO ── */}
      <div style={{ position: 'relative', background: 'linear-gradient(135deg, #0866F5 0%, #0645B8 100%)', overflow: 'hidden', padding: isMobile ? '18px 0 16px' : '24px 0 20px' }}>
        <img
          src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1800&q=70"
          alt="Home Maintenance"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.16 }}
        />
        <div className="rr-container" style={{ position: 'relative', zIndex: 2, padding: isMobile ? '0 16px' : undefined }}>
          <p style={eyebrow}>
            <span style={{ display: 'inline-block', width: '16px', height: '2px', background: '#38BDF8' }} />
            Home Care &amp; Annual Maintenance Contracts
          </p>
          <h1 style={heroH1}>
            365-Day Home Protection &amp; Emergency Care
          </h1>
          <p style={heroSub}>
            Quarterly inspections, emergency dispatch in 30 minutes, deep cleaning, pest control and annual maintenance contracts for worry-free living.
          </p>
          <div style={{ display: 'flex', gap: isMobile ? '10px' : '18px', marginTop: '12px', flexWrap: 'wrap' }}>
            {['30-Minute Emergency Van', 'Annual AMC Plans', 'Herbal Pest Control', 'Solar Panel Servicing'].map(t => (
              <div key={t} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle size={13} style={{ color: '#38BDF8' }} />
                <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.85)' }}>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── EMERGENCY BAND ── */}
      <div style={{ background: '#081735', borderTop: '1px solid rgba(255,255,255,0.08)', padding: isMobile ? '24px 0' : '32px 0' }}>
        <div className="rr-container" style={{ padding: isMobile ? '0 16px' : undefined }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  background: 'rgba(8, 102, 245, 0.2)',
                  border: '1.5px solid rgba(8, 102, 245, 0.4)',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Clock size={24} style={{ color: '#38BDF8' }} />
              </div>
              <div>
                <p style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#38BDF8', marginBottom: '4px' }}>
                  24/7 Emergency Rapid Response
                </p>
                <h3 style={{ fontSize: isMobile ? '1.05rem' : '1.25rem', fontWeight: 800, color: 'white', lineHeight: 1.25 }}>
                  Pipe leak, electrical trip or lockout? Our van arrives in 30 minutes.
                </h3>
              </div>
            </div>
            {emergencyBooked ? (
              <div
                style={{
                  background: 'rgba(22, 163, 74, 0.15)',
                  border: '1.5px solid #16A34A',
                  borderRadius: '30px',
                  padding: '12px 24px',
                  color: '#4ADE80',
                  fontSize: '0.84rem',
                  fontWeight: 700,
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <CheckCircle size={16} /> Emergency team dispatched!
              </div>
            ) : (
              <button 
                onClick={() => {
                  if (onBookMaintenance) {
                    onBookMaintenance('emergency_repairs', 'Emergency Rapid Van Dispatch (Plumbing/Electrical/Lockout)', 499);
                  } else {
                    setEmergencyBooked(true);
                  }
                }}
                style={{
                  background: 'linear-gradient(135deg, #0866F5 0%, #0653CA 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '30px',
                  padding: '14px 28px',
                  fontSize: '0.84rem',
                  fontWeight: 800,
                  letterSpacing: '0.04em',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  flexShrink: 0,
                  boxShadow: '0 8px 24px rgba(8, 102, 245, 0.35)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 10px 28px rgba(8, 102, 245, 0.45)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(8, 102, 245, 0.35)';
                }}
              >
                <Phone size={15} /> Dispatch Emergency Van
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── EMERGENCY SERVICE GRID ── */}
      <section className="rr-section" style={{ padding: isMobile ? '36px 0' : '56px 0' }}>
        <div className="rr-container" style={{ padding: isMobile ? '0 16px' : undefined }}>
          <div style={{ marginBottom: '32px' }}>
            <p className="section-label">Emergency Services</p>
            <h2 className="section-h2">30-Minute Emergency Response</h2>
            <p className="section-sub">Our GPS-tracked emergency vans are stationed across the city — guaranteed 30-minute response for any home emergency.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: emergencyCols, gap: '20px', marginBottom: '48px' }}>
            {EMERGENCY_SERVICES.map(s => (
              <div
                key={s.name}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '18px',
                  border: '1.5px solid #E2E8F0',
                  boxShadow: '0 4px 16px rgba(11, 31, 68, 0.05)',
                  padding: '28px 24px',
                  cursor: 'pointer',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 12px 24px rgba(11, 31, 68, 0.1)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(11, 31, 68, 0.05)';
                }}
              >
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: '#EEF5FF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '16px',
                  }}
                >
                  <s.icon size={22} style={{ color: '#0866F5' }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0F172A' }}>{s.name}</h3>
                  <span
                    style={{
                      background: '#EEF5FF',
                      color: '#0866F5',
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      letterSpacing: '0.04em',
                      padding: '4px 10px',
                      borderRadius: '20px',
                      flexShrink: 0,
                    }}
                  >
                    {s.time}
                  </span>
                </div>
                <p style={{ fontSize: '0.84rem', color: '#64748B', lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>

          {/* AMC Packages */}
          <div style={{ marginBottom: '32px' }}>
            <p className="section-label">Annual Plans</p>
            <h2 className="section-h2">Annual Maintenance Contract Packages</h2>
            <p className="section-sub">Subscribe once and your home is covered — quarterly inspections, priority emergency dispatch and free service calls.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: amcCols, gap: '20px' }}>
            {(AMC_PACKAGES && AMC_PACKAGES.length > 0 ? AMC_PACKAGES : [
              { id: 'p1', name: 'Essential Protect', price: '₹ 5,999', duration: 'Per Year', features: ['2 Plumbing Inspections', '1 Electrical Audit', 'Priority Emergency Dispatch', 'Free Service Call (3/year)'] },
              { id: 'p2', name: 'Villa Care', price: '₹ 11,999', duration: 'Per Year', recommended: true, features: ['4 Full Inspections', 'AC Servicing (2 units)', 'Deep Clean (1/year)', 'Pest Control (2/year)', 'Priority Emergency Dispatch', 'Free Service Calls (6/year)'] },
              { id: 'p3', name: 'Commercial Building', price: '₹ 24,999', duration: 'Per Year', features: ['Monthly Inspections', 'Fire Safety Audit', 'Elevator Maintenance Liaison', 'Common Area Cleaning', '24/7 Dedicated Manager', 'Unlimited Emergency Calls'] },
            ]).map(pkg => {
              const isSelected = selectedPkg?.id === pkg.id;
              return (
                <div
                  key={pkg.id || pkg.name}
                  onClick={() => setSelectedPkg(pkg)}
                  style={{
                    background: isSelected ? 'linear-gradient(135deg, #0866F5 0%, #0645B8 100%)' : '#FFFFFF',
                    borderRadius: '20px',
                    border: isSelected ? '2px solid #0866F5' : '1.5px solid #E2E8F0',
                    boxShadow: isSelected ? '0 12px 32px rgba(8, 102, 245, 0.2)' : '0 4px 16px rgba(0, 0, 0, 0.05)',
                    padding: '36px 30px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  {pkg.recommended && (
                    <span
                      style={{
                        alignSelf: 'flex-start',
                        background: isSelected ? 'rgba(255,255,255,0.2)' : '#EEF5FF',
                        color: isSelected ? '#FFFFFF' : '#0866F5',
                        fontSize: '0.68rem',
                        fontWeight: 800,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        marginBottom: '14px',
                      }}
                    >
                      Most Popular
                    </span>
                  )}
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: isSelected ? '#FFFFFF' : '#0F172A', marginBottom: '8px' }}>
                    {pkg.name}
                  </h3>
                  <p style={{ fontSize: '2.2rem', fontWeight: 800, color: isSelected ? '#FFFFFF' : '#0F172A', letterSpacing: '-0.03em', lineHeight: 1, marginBottom: '4px' }}>
                    {pkg.price}
                  </p>
                  <p style={{ fontSize: '0.78rem', color: isSelected ? 'rgba(255,255,255,0.6)' : '#94A3B8', marginBottom: '24px' }}>
                    {pkg.duration || pkg.sub || 'Per Year'}
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px', flex: 1 }}>
                    {(pkg.features || []).map(f => (
                      <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                        <CheckCircle size={15} style={{ color: isSelected ? '#38BDF8' : '#0866F5', flexShrink: 0, marginTop: '2px' }} />
                        <span style={{ fontSize: '0.84rem', color: isSelected ? 'rgba(255,255,255,0.85)' : '#475569' }}>
                          {f}
                        </span>
                      </div>
                    ))}
                  </div>
                  <button 
                    onClick={e => { 
                      e.stopPropagation(); 
                      if (onBookMaintenance) {
                        const priceNum = parseInt((pkg.price || '').replace(/[^0-9]/g, '')) || 5999;
                        onBookMaintenance('maintenance', `AMC Plan: ${pkg.name}`, priceNum);
                      } else {
                        onOpenAuth(); 
                      }
                    }}
                    style={{
                      width: '100%',
                      background: isSelected ? '#FFFFFF' : 'linear-gradient(135deg, #0866F5 0%, #0645B8 100%)',
                      color: isSelected ? '#0866F5' : '#FFFFFF',
                      border: 'none',
                      borderRadius: '30px',
                      padding: '13px',
                      fontSize: '0.82rem',
                      fontWeight: 800,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      boxShadow: isSelected ? '0 6px 20px rgba(8, 102, 245, 0.4)' : 'none',
                      transition: 'all 0.2s',
                    }}
                  >
                    Subscribe to {pkg.name} <ArrowRight size={14} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SCHEDULED SERVICES ── */}
      <section style={{ background: '#F8FAFC', borderTop: '1px solid #E2E8F0', padding: isMobile ? '48px 0' : '72px 0' }}>
        <div className="rr-container" style={{ padding: isMobile ? '0 16px' : undefined }}>
          <div style={{ marginBottom: '32px' }}>
            <p className="section-label">On-Demand Services</p>
            <h2 className="section-h2">Book Individual Home Services</h2>
            <p className="section-sub">No subscription needed — book any service online and our certified crew arrives at your chosen time slot.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: scheduledCols, gap: '20px' }}>
            {SCHEDULED_SERVICES.map(s => (
              <div
                key={s.name}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '18px',
                  border: '1.5px solid #E2E8F0',
                  boxShadow: '0 4px 16px rgba(11, 31, 68, 0.04)',
                  padding: '28px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 12px 24px rgba(11, 31, 68, 0.08)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(11, 31, 68, 0.04)';
                }}
              >
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    background: '#EEF5FF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '16px',
                  }}
                >
                  <s.icon size={22} style={{ color: '#0866F5' }} />
                </div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0F172A', marginBottom: '4px' }}>{s.name}</h3>
                <p style={{ fontSize: '0.78rem', color: '#64748B', marginBottom: '16px' }}>{s.sub}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '22px', flex: 1 }}>
                  {s.features.map(f => (
                    <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '7px' }}>
                      <CheckCircle size={13} style={{ color: '#0866F5', flexShrink: 0, marginTop: '2px' }} />
                      <span style={{ fontSize: '0.8rem', color: '#475569' }}>{f}</span>
                    </div>
                  ))}
                </div>
                <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <p style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A', lineHeight: 1 }}>{s.price}</p>
                  <button 
                    onClick={() => {
                      if (onBookMaintenance) {
                        const priceNum = parseInt((s.price || '').replace(/[^0-9]/g, '')) || 1499;
                        onBookMaintenance('maintenance', s.name, priceNum);
                      } else {
                        onOpenAuth();
                      }
                    }} 
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      color: '#FFFFFF',
                      background: 'linear-gradient(135deg, #0866F5 0%, #0653CA 100%)',
                      border: 'none',
                      borderRadius: '20px',
                      padding: '8px 18px',
                      cursor: 'pointer',
                      boxShadow: '0 4px 12px rgba(8, 102, 245, 0.2)',
                    }}
                  >
                    Book Now <ArrowRight size={13} />
                  </button>
                </div>
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
  maxWidth: '740px',
};
const heroSub = {
  fontSize: '0.84rem',
  color: 'rgba(255,255,255,0.85)',
  lineHeight: 1.5,
  maxWidth: '620px',
};
