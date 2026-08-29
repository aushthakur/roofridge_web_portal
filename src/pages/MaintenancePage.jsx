import React, { useState } from 'react';
import { AMC_PACKAGES } from '../data/mockData';
import { ArrowRight, CheckCircle, Clock, Phone, Zap, Shield, Wrench, Wind, Droplets, Bug, Sun } from 'lucide-react';

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

export default function MaintenancePage({ onOpenAuth }) {
  const [selectedPkg, setSelectedPkg] = useState(AMC_PACKAGES?.[0] || null);
  const [emergencyBooked, setEmergencyBooked] = useState(false);

  return (
    <div className="animate-fade" style={{ background: '#FFFFFF' }}>

      {/* ── HERO ── */}
      <div style={{ position: 'relative', background: '#0B192C', overflow: 'hidden', padding: '64px 0 52px' }}>
        <img src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1800&q=70" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.18 }} />
        <div className="rr-container" style={{ position: 'relative', zIndex: 2 }}>
          <p style={eyebrow}><span style={{ display: 'inline-block', width: '24px', height: '2px', background: 'rgba(255,255,255,0.3)' }} /> Home Care & Annual Maintenance Contracts</p>
          <h1 style={heroH1}>365-Day Home Protection<br />&amp; Emergency Care</h1>
          <p style={heroSub}>Quarterly inspections, emergency dispatch in 30 minutes, deep cleaning, pest control and annual maintenance contracts for worry-free living.</p>
          <div style={{ display: 'flex', gap: '24px', marginTop: '28px', flexWrap: 'wrap' }}>
            {['30-Minute Emergency Van', 'Annual AMC Plans', 'Herbal Pest Control', 'Solar Panel Servicing'].map(t => (
              <div key={t} style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                <CheckCircle size={14} style={{ color: 'rgba(255,255,255,0.55)' }} />
                <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.65)', fontFamily: 'Manrope, sans-serif' }}>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── EMERGENCY BAND ── */}
      <div style={{ background: '#0B192C', borderTop: '1px solid rgba(255,255,255,0.08)', padding: '28px 0' }}>
        <div className="rr-container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
              <div style={{ width: '48px', height: '48px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Clock size={22} style={{ color: 'white' }} />
              </div>
              <div>
                <p style={{ fontSize: '0.62rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', fontFamily: 'Manrope, sans-serif', marginBottom: '4px' }}>24/7 Emergency Rapid Response</p>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'white', fontFamily: 'Manrope, sans-serif', lineHeight: 1.2 }}>Pipe leak, electrical trip or lockout? Our van arrives in 30 minutes.</h3>
              </div>
            </div>
            {emergencyBooked ? (
              <div style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '2px', padding: '12px 20px', color: 'white', fontSize: '0.82rem', fontWeight: 600, fontFamily: 'Manrope, sans-serif', flexShrink: 0 }}>✓ Emergency team dispatched!</div>
            ) : (
              <button onClick={() => setEmergencyBooked(true)}
                style={{ background: 'white', color: '#0B192C', border: 'none', borderRadius: '2px', padding: '13px 24px', fontSize: '0.78rem', fontWeight: 800, letterSpacing: '0.05em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontFamily: 'Manrope, sans-serif', flexShrink: 0 }}>
                <Phone size={14} /> Dispatch Emergency Van
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── EMERGENCY SERVICE GRID ── */}
      <section className="rr-section">
        <div className="rr-container">
          <div style={{ marginBottom: '28px' }}>
            <p className="section-label">Emergency Services</p>
            <h2 className="section-h2">30-Minute Emergency Response</h2>
            <p className="section-sub">Our GPS-tracked emergency vans are stationed across the city — guaranteed 30-minute response for any home emergency.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px', background: '#E4E1DA', border: '1px solid #E4E1DA', borderRadius: '2px', overflow: 'hidden', marginBottom: '48px' }}>
            {EMERGENCY_SERVICES.map(s => (
              <div key={s.name} style={{ background: 'white', padding: '28px 24px', cursor: 'pointer', transition: 'background 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.background = '#FAFAF8'}
                onMouseLeave={e => e.currentTarget.style.background = 'white'}>
                <s.icon size={22} style={{ color: '#0B192C', marginBottom: '14px' }} />
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0B192C', fontFamily: 'Manrope, sans-serif' }}>{s.name}</h3>
                  <span style={{ background: '#F8F7F4', border: '1px solid #E4E1DA', fontSize: '0.62rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', padding: '3px 8px', borderRadius: '2px', color: '#0B192C', fontFamily: 'Manrope, sans-serif', flexShrink: 0 }}>{s.time}</span>
                </div>
                <p style={{ fontSize: '0.8rem', color: '#6B6B6B', lineHeight: 1.6, fontFamily: 'Manrope, sans-serif' }}>{s.desc}</p>
              </div>
            ))}
          </div>

          {/* AMC Packages */}
          <div style={{ marginBottom: '28px' }}>
            <p className="section-label">Annual Plans</p>
            <h2 className="section-h2">Annual Maintenance Contract Packages</h2>
            <p className="section-sub">Subscribe once and your home is covered — quarterly inspections, priority emergency dispatch and free service calls.</p>
          </div>

          {AMC_PACKAGES && AMC_PACKAGES.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(AMC_PACKAGES.length, 3)}, 1fr)`, gap: '1px', background: '#E4E1DA', border: '1px solid #E4E1DA', borderRadius: '2px', overflow: 'hidden' }}>
              {AMC_PACKAGES.map(pkg => (
                <div key={pkg.id}
                  onClick={() => setSelectedPkg(pkg)}
                  style={{ background: selectedPkg?.id === pkg.id ? '#0B192C' : 'white', padding: '32px 28px', cursor: 'pointer', transition: 'background 0.2s' }}>
                  {pkg.recommended && (
                    <span style={{ display: 'inline-block', background: selectedPkg?.id === pkg.id ? 'rgba(255,255,255,0.2)' : '#F8F7F4', border: '1px solid', borderColor: selectedPkg?.id === pkg.id ? 'rgba(255,255,255,0.3)' : '#E4E1DA', fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '3px 8px', borderRadius: '2px', color: selectedPkg?.id === pkg.id ? 'white' : '#0B192C', fontFamily: 'Manrope, sans-serif', marginBottom: '12px' }}>Most Popular</span>
                  )}
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: selectedPkg?.id === pkg.id ? 'white' : '#0B192C', fontFamily: 'Manrope, sans-serif', marginBottom: '8px' }}>{pkg.name}</h3>
                  <p style={{ fontSize: '2rem', fontWeight: 800, color: selectedPkg?.id === pkg.id ? 'white' : '#0B192C', letterSpacing: '-0.03em', fontFamily: 'Manrope, sans-serif', lineHeight: 1, marginBottom: '4px' }}>{pkg.price}</p>
                  <p style={{ fontSize: '0.72rem', color: selectedPkg?.id === pkg.id ? 'rgba(255,255,255,0.5)' : '#9CA3AF', fontFamily: 'Manrope, sans-serif', marginBottom: '20px' }}>{pkg.duration}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
                    {(pkg.features || []).map(f => (
                      <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                        <CheckCircle size={13} style={{ color: selectedPkg?.id === pkg.id ? 'rgba(255,255,255,0.6)' : '#0B192C', flexShrink: 0, marginTop: '2px' }} />
                        <span style={{ fontSize: '0.8rem', color: selectedPkg?.id === pkg.id ? 'rgba(255,255,255,0.75)' : '#6B6B6B', fontFamily: 'Manrope, sans-serif' }}>{f}</span>
                      </div>
                    ))}
                  </div>
                  <button onClick={e => { e.stopPropagation(); onOpenAuth(); }}
                    style={{ width: '100%', background: selectedPkg?.id === pkg.id ? 'white' : '#0B192C', color: selectedPkg?.id === pkg.id ? '#0B192C' : 'white', border: 'none', borderRadius: '2px', padding: '12px', fontSize: '0.76rem', fontWeight: 800, cursor: 'pointer', fontFamily: 'Manrope, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                    Subscribe to {pkg.name} <ArrowRight size={13} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            /* Fallback hardcoded plans if mockData empty */
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: '#E4E1DA', border: '1px solid #E4E1DA', borderRadius: '2px', overflow: 'hidden' }}>
              {[
                { name: 'Essential Protect', price: '₹ 5,999', sub: 'Per Year', features: ['2 Plumbing Inspections', '1 Electrical Audit', 'Priority Emergency Dispatch', 'Free Service Call (3/year)'] },
                { name: 'Villa Care', price: '₹ 11,999', sub: 'Per Year', recommended: true, features: ['4 Full Inspections', 'AC Servicing (2 units)', 'Deep Clean (1/year)', 'Pest Control (2/year)', 'Priority Emergency Dispatch', 'Free Service Calls (6/year)'] },
                { name: 'Commercial Building', price: '₹ 24,999', sub: 'Per Year', features: ['Monthly Inspections', 'Fire Safety Audit', 'Elevator Maintenance Liaison', 'Common Area Cleaning', '24/7 Dedicated Manager', 'Unlimited Emergency Calls'] },
              ].map(pkg => (
                <div key={pkg.name} style={{ background: 'white', padding: '32px 28px' }}>
                  {pkg.recommended && <span style={{ display: 'inline-block', background: '#0B192C', color: 'white', fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '3px 8px', borderRadius: '2px', fontFamily: 'Manrope, sans-serif', marginBottom: '12px' }}>Most Popular</span>}
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0B192C', fontFamily: 'Manrope, sans-serif', marginBottom: '8px' }}>{pkg.name}</h3>
                  <p style={{ fontSize: '2rem', fontWeight: 800, color: '#0B192C', letterSpacing: '-0.03em', fontFamily: 'Manrope, sans-serif', lineHeight: 1, marginBottom: '4px' }}>{pkg.price}</p>
                  <p style={{ fontSize: '0.72rem', color: '#9CA3AF', fontFamily: 'Manrope, sans-serif', marginBottom: '20px' }}>{pkg.sub}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
                    {pkg.features.map(f => (
                      <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                        <CheckCircle size={13} style={{ color: '#0B192C', flexShrink: 0, marginTop: '2px' }} />
                        <span style={{ fontSize: '0.8rem', color: '#6B6B6B', fontFamily: 'Manrope, sans-serif' }}>{f}</span>
                      </div>
                    ))}
                  </div>
                  <button onClick={onOpenAuth} style={{ width: '100%', background: '#0B192C', color: 'white', border: 'none', borderRadius: '2px', padding: '12px', fontSize: '0.76rem', fontWeight: 800, cursor: 'pointer', fontFamily: 'Manrope, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                    Subscribe Now <ArrowRight size={13} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── SCHEDULED SERVICES ── */}
      <section style={{ background: '#F8F7F4', borderTop: '1px solid #E4E1DA', padding: '72px 0' }}>
        <div className="rr-container">
          <div style={{ marginBottom: '28px' }}>
            <p className="section-label">On-Demand Services</p>
            <h2 className="section-h2">Book Individual Home Services</h2>
            <p className="section-sub">No subscription needed — book any service online and our certified crew arrives at your chosen time slot.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px', background: '#E4E1DA', border: '1px solid #E4E1DA', borderRadius: '2px', overflow: 'hidden' }}>
            {SCHEDULED_SERVICES.map(s => (
              <div key={s.name} style={{ background: 'white', padding: '28px 24px', display: 'flex', flexDirection: 'column', cursor: 'pointer', transition: 'background 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.background = '#FAFAF8'}
                onMouseLeave={e => e.currentTarget.style.background = 'white'}>
                <s.icon size={20} style={{ color: '#0B192C', marginBottom: '14px' }} />
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0B192C', fontFamily: 'Manrope, sans-serif', marginBottom: '4px' }}>{s.name}</h3>
                <p style={{ fontSize: '0.72rem', color: '#9CA3AF', fontFamily: 'Manrope, sans-serif', marginBottom: '14px' }}>{s.sub}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '7px', marginBottom: '20px', flex: 1 }}>
                  {s.features.map(f => (
                    <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '7px' }}>
                      <CheckCircle size={12} style={{ color: '#0B192C', flexShrink: 0, marginTop: '2px' }} />
                      <span style={{ fontSize: '0.76rem', color: '#6B6B6B', fontFamily: 'Manrope, sans-serif' }}>{f}</span>
                    </div>
                  ))}
                </div>
                <div style={{ borderTop: '1px solid #F0EDE7', paddingTop: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <p style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0B192C', fontFamily: 'Manrope, sans-serif' }}>{s.price}</p>
                  <button onClick={onOpenAuth} style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.74rem', fontWeight: 700, color: '#0B192C', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Manrope, sans-serif', borderBottom: '1.5px solid #0B192C', paddingBottom: '1px' }}>
                    Book Now <ArrowRight size={12} />
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

const eyebrow = { fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', fontFamily: 'Manrope, sans-serif' };
const heroH1 = { fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', fontWeight: 800, color: 'white', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '14px', maxWidth: '700px' };
const heroSub = { fontSize: '0.95rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.65, maxWidth: '520px', fontFamily: 'Manrope, sans-serif' };
