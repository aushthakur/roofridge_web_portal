import React, { useState } from 'react';
import { ArrowRight, CheckCircle, Calendar, Star, Clock, Award } from 'lucide-react';
import { useResponsive } from '../hooks/useResponsive';

const STYLES = [
  { id: 'scandi', name: 'Scandinavian Modern', tag: 'Most Popular', desc: 'Light oak woods, muted whites, clean lines & uncluttered airy vibes that make every room feel spacious and calm.', image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85', budget: '₹ 8.5 Lakhs', delivery: '40 days', includes: ['Full modular wardrobe set', 'L-Shape acrylic kitchen', 'False ceiling with LED coves', 'Bathroom vanity & accessories'] },
  { id: 'japandi', name: 'Japandi Zen Minimalist', tag: 'Editor\'s Pick', desc: 'Earthy bamboo tones, warm paper textures & serene Japanese balance — a retreat from the urban rush, inside your home.', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85', budget: '₹ 10.2 Lakhs', delivery: '42 days', includes: ['Tatami-inspired storage beds', 'Teak wood panel kitchen', 'Bamboo slat false ceiling', 'Earthy tile & stone accents'] },
  { id: 'italian', name: 'Italian Luxe Marble', tag: 'Premium', desc: 'Imported Statuario marble, brushed brass trim & back-lit onyx glass — the timeless language of luxury, reimagined for India.', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85', budget: '₹ 15.8 Lakhs', delivery: '45 days', includes: ['Italian Statuario marble flooring', 'Island kitchen with Quartz countertop', 'Brass-frame mirrors & fixtures', 'Custom PU lacquered wardrobes'] },
  { id: 'contemporary', name: 'Contemporary Chic', tag: 'New', desc: 'Bold geometry, pop of accent colors & smart space-saving furniture for the modern urban professional.', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1200&q=85', budget: '₹ 6.8 Lakhs', delivery: '38 days', includes: ['Modular sofa with storage', 'Gloss finish straight kitchen', 'Geometric ceiling pattern', 'Accent wall with texture paint'] },
];

const LAYOUTS = ['L-Shape', 'Island', 'Parallel', 'U-Shape'];
const FINISHES = ['Acrylic Gloss', 'PU Lacquer', 'Natural Veneer', 'Laminate'];
const KITCHEN_COSTS = { 'L-Shape': 280000, 'Island': 420000, 'Parallel': 340000, 'U-Shape': 360000 };

const PROCESS = [
  { step: '01', title: 'Book Free Consultation', desc: 'Our designer visits your home within 48 hours for precise measurements & style discussion.' },
  { step: '02', title: 'Receive 3D VR Design', desc: 'Get a photo-realistic 3D walkthrough of your designed space within 72 hours of consultation.' },
  { step: '03', title: 'Approve & Lock In', desc: 'Review itemized cost breakdown, approve design, and pay 25% booking amount to start production.' },
  { step: '04', title: 'Factory Production', desc: 'Your modular units are precision-manufactured in our ISO-certified factory over 30–35 days.' },
  { step: '05', title: 'Site Installation', desc: 'Our certified crew installs & finishes your home in 5–10 days with zero construction mess.' },
  { step: '06', title: 'Handover & Warranty', desc: 'You receive keys, an itemized warranty card & a dedicated relationship manager for 10 years.' },
];

export default function InteriorsPage({ onBookConsultation }) {
  const [selected, setSelected] = useState(STYLES[0]);
  const [layout, setLayout] = useState('L-Shape');
  const [finish, setFinish] = useState('Acrylic Gloss');
  const { isMobile } = useResponsive();

  const kitchenCost = KITCHEN_COSTS[layout] || 280000;

  return (
    <div className="animate-fade" style={{ background: '#FFFFFF' }}>

      {/* ── HERO ── */}
      <div style={{ position: 'relative', background: '#0B192C', overflow: 'hidden', padding: '64px 0 52px' }}>
        <img src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1800&q=70" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.2 }} />
        <div className="rr-container" style={{ position: 'relative', zIndex: 2 }}>
          <p style={eyebrow}>
            <span style={{ display: 'inline-block', width: '24px', height: '2px', background: 'rgba(255,255,255,0.3)' }} />
            Modular Interiors — 45-Day Delivery Guarantee
          </p>
          <h1 style={heroH1}>Turnkey Modular Interiors<br />& Kitchen Design</h1>
          <p style={heroSub}>3D VR walkthroughs, premium German-engineered cabinetry, 10-year flat warranty and guaranteed installation in 45 days.</p>
          <div style={{ display: 'flex', gap: '12px', marginTop: '28px', flexWrap: 'wrap' }}>
            <button onClick={() => onBookConsultation()} style={heroCTA}>BOOK FREE 3D CONSULTATION <ArrowRight size={15} /></button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
              {['10-Year Warranty', '3D VR Design', '45-Day Delivery'].map(t => (
                <div key={t} style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                  <CheckCircle size={14} style={{ color: 'rgba(255,255,255,0.55)' }} />
                  <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', fontFamily: 'Manrope, sans-serif' }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── STYLE SHOWCASE ── */}
      <section className="rr-section">
        <div className="rr-container">
          <div className="section-header-row">
            <div>
              <p className="section-label">Design Themes</p>
              <h2 className="section-h2">Explore Turnkey Interior Styles</h2>
              <p className="section-sub">Select a style to see 3D renders, materials included & detailed cost breakdown.</p>
            </div>
          </div>

          {/* Style tabs */}
          <div style={{ display: 'flex', gap: '4px', marginBottom: '24px', borderBottom: '1px solid #E4E1DA', paddingBottom: '0' }}>
            {STYLES.map(s => (
              <button key={s.id} onClick={() => setSelected(s)}
                style={{ padding: '11px 20px', border: 'none', borderBottom: selected.id === s.id ? '2px solid #0B192C' : '2px solid transparent', background: 'none', cursor: 'pointer', fontSize: '0.8rem', fontWeight: selected.id === s.id ? 700 : 400, color: selected.id === s.id ? '#0B192C' : '#6B6B6B', fontFamily: 'Manrope, sans-serif', transition: 'all 0.15s', marginBottom: '-1px' }}>
                {s.name}
              </button>
            ))}
          </div>

          {/* Selected style panel */}
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.4fr 1fr', gap: '1px', background: '#E4E1DA', border: '1px solid #E4E1DA', borderRadius: '2px', overflow: 'hidden' }}>
            <div style={{ position: 'relative', minHeight: '460px' }}>
              <img src={selected.image} alt={selected.name} style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} />
              <span style={{ position: 'absolute', top: '16px', left: '16px', background: '#0B192C', color: 'white', fontSize: '0.62rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '5px 10px', borderRadius: '2px', fontFamily: 'Manrope, sans-serif' }}>{selected.tag}</span>
            </div>
            <div style={{ background: 'white', padding: '48px 44px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <p style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9CA3AF', marginBottom: '10px', fontFamily: 'Manrope, sans-serif' }}>Selected Theme</p>
                <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0B192C', letterSpacing: '-0.02em', marginBottom: '14px', lineHeight: 1.15, fontFamily: 'Manrope, sans-serif' }}>{selected.name}</h3>
                <p style={{ fontSize: '0.88rem', color: '#6B6B6B', lineHeight: 1.7, marginBottom: '24px', fontFamily: 'Manrope, sans-serif' }}>{selected.desc}</p>

                <div style={{ background: '#F8F7F4', border: '1px solid #E4E1DA', borderRadius: '2px', padding: '20px 22px', marginBottom: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <div>
                      <p style={{ fontSize: '0.62rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9CA3AF', fontFamily: 'Manrope, sans-serif', marginBottom: '4px' }}>Avg. 3BHK Turnkey Cost</p>
                      <p style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0B192C', letterSpacing: '-0.03em', fontFamily: 'Manrope, sans-serif' }}>{selected.budget}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontSize: '0.62rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9CA3AF', fontFamily: 'Manrope, sans-serif', marginBottom: '4px' }}>Delivery</p>
                      <p style={{ fontSize: '1rem', fontWeight: 800, color: '#0B192C', fontFamily: 'Manrope, sans-serif', display: 'flex', alignItems: 'center', gap: '5px' }}><Clock size={14} />{selected.delivery}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <p style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9CA3AF', fontFamily: 'Manrope, sans-serif', marginBottom: '12px' }}>Included in Package</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {selected.includes.map(inc => (
                      <div key={inc} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                        <CheckCircle size={14} style={{ color: '#0B192C', flexShrink: 0, marginTop: '2px' }} />
                        <span style={{ fontSize: '0.82rem', color: '#444', fontFamily: 'Manrope, sans-serif' }}>{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <button onClick={() => onBookConsultation()} style={{ ...darkCTA, marginTop: '28px' }}>
                Get Customised 3D Quote <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── KITCHEN CONFIGURATOR ── */}
      <section style={{ background: '#0B192C', padding: '80px 0', position: 'relative', overflow: 'hidden' }}>
        <img src="https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1800&q=70" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.15 }} />
        <div className="rr-container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ marginBottom: '40px' }}>
            <p style={eyebrow}><span style={{ display: 'inline-block', width: '24px', height: '2px', background: 'rgba(255,255,255,0.3)' }} /> Interactive Configurator</p>
            <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)', fontWeight: 800, color: 'white', letterSpacing: '-0.03em', marginBottom: '8px' }}>
              Customise Your Modular Kitchen
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', fontFamily: 'Manrope, sans-serif' }}>Real-time price updates as you configure layout and finish.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr', gap: '2px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
            {/* Layout */}
            <div style={{ background: 'rgba(11,25,44,0.8)', padding: '32px', backdropFilter: 'blur(8px)' }}>
              <p style={{ fontSize: '0.62rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', fontFamily: 'Manrope, sans-serif', marginBottom: '16px' }}>1. Select Layout</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                {LAYOUTS.map(l => (
                  <button key={l} onClick={() => setLayout(l)}
                    style={{ padding: '12px 16px', border: layout === l ? '1.5px solid rgba(255,255,255,0.8)' : '1.5px solid rgba(255,255,255,0.12)', borderRadius: '2px', background: layout === l ? 'rgba(255,255,255,0.1)' : 'transparent', color: layout === l ? 'white' : 'rgba(255,255,255,0.5)', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'Manrope, sans-serif', textAlign: 'left', transition: 'all 0.15s' }}>
                    {l} Kitchen
                  </button>
                ))}
              </div>
            </div>

            {/* Finish */}
            <div style={{ background: 'rgba(11,25,44,0.8)', padding: '32px', backdropFilter: 'blur(8px)' }}>
              <p style={{ fontSize: '0.62rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', fontFamily: 'Manrope, sans-serif', marginBottom: '16px' }}>2. Select Finish</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                {FINISHES.map(f => (
                  <button key={f} onClick={() => setFinish(f)}
                    style={{ padding: '12px 16px', border: finish === f ? '1.5px solid rgba(255,255,255,0.8)' : '1.5px solid rgba(255,255,255,0.12)', borderRadius: '2px', background: finish === f ? 'rgba(255,255,255,0.1)' : 'transparent', color: finish === f ? 'white' : 'rgba(255,255,255,0.5)', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'Manrope, sans-serif', textAlign: 'left', transition: 'all 0.15s' }}>
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Result */}
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <p style={{ fontSize: '0.62rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', fontFamily: 'Manrope, sans-serif', marginBottom: '16px' }}>Estimated Cost</p>
                <p style={{ fontSize: '2.4rem', fontWeight: 800, color: 'white', letterSpacing: '-0.04em', fontFamily: 'Manrope, sans-serif', lineHeight: 1, marginBottom: '6px' }}>
                  ₹ {(kitchenCost / 100000).toFixed(2)} <span style={{ fontSize: '1rem', fontWeight: 500, opacity: 0.5 }}>Lakhs</span>
                </p>
                <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)', fontFamily: 'Manrope, sans-serif', marginBottom: '20px' }}>Incl. Hettich hardware, marine ply carcase & installation</p>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '16px' }}>
                  {[{ k: 'Layout', v: layout }, { k: 'Finish', v: finish }, { k: 'Warranty', v: '10 Years Flat' }].map(row => (
                    <div key={row.k} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.35)', fontFamily: 'Manrope, sans-serif' }}>{row.k}</span>
                      <span style={{ fontSize: '0.74rem', fontWeight: 600, color: 'rgba(255,255,255,0.65)', fontFamily: 'Manrope, sans-serif' }}>{row.v}</span>
                    </div>
                  ))}
                </div>
              </div>
              <button onClick={() => onBookConsultation()}
                style={{ marginTop: '20px', width: '100%', background: 'white', color: '#0B192C', border: 'none', borderRadius: '2px', padding: '13px 20px', fontSize: '0.76rem', fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer', fontFamily: 'Manrope, sans-serif' }}>
                Book Kitchen Site Survey <ArrowRight size={13} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESS STEPS ── */}
      <section className="rr-section" style={{ background: '#F8F7F4', borderTop: '1px solid #E4E1DA' }}>
        <div className="rr-container">
          <div style={{ marginBottom: '40px' }}>
            <p className="section-label">Our Process</p>
            <h2 className="section-h2">From Consultation to Handover in 45 Days</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '1px', background: '#E4E1DA', border: '1px solid #E4E1DA', borderRadius: '2px', overflow: 'hidden' }}>
            {PROCESS.map((p, i) => (
              <div key={i} style={{ background: 'white', padding: '32px 28px' }}>
                <p style={{ fontSize: '2rem', fontWeight: 800, color: '#E4E1DA', letterSpacing: '-0.04em', fontFamily: 'Manrope, sans-serif', marginBottom: '12px' }}>{p.step}</p>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0B192C', marginBottom: '10px', fontFamily: 'Manrope, sans-serif' }}>{p.title}</h3>
                <p style={{ fontSize: '0.82rem', color: '#6B6B6B', lineHeight: 1.65, fontFamily: 'Manrope, sans-serif' }}>{p.desc}</p>
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
const heroCTA = { display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'white', color: '#0B192C', padding: '14px 26px', fontSize: '0.78rem', fontWeight: 800, letterSpacing: '0.07em', textTransform: 'uppercase', borderRadius: '2px', cursor: 'pointer', border: '2px solid white', fontFamily: 'Manrope, sans-serif' };
const darkCTA = { width: '100%', background: '#0B192C', color: 'white', border: 'none', borderRadius: '2px', padding: '14px 20px', fontSize: '0.78rem', fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer', fontFamily: 'Manrope, sans-serif' };
