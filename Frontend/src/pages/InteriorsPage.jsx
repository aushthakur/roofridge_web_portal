import React, { useState } from 'react';
import {
  ArrowRight, CheckCircle, Calendar, Star, Clock, Award,
  Sparkles, Check, ChevronRight, Phone, ShieldCheck, Layers,
  Compass, Eye, Play
} from 'lucide-react';
import { useResponsive } from '../hooks/useResponsive';

const STYLES = [
  {
    id: 'scandi',
    name: 'Scandinavian Modern',
    tag: 'Most Popular',
    desc: 'Light oak woods, muted whites, clean lines & uncluttered airy vibes that make every room feel spacious and calm.',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85',
    budget: '₹ 8.5 Lakhs',
    delivery: '40 days',
    includes: [
      'Full modular wardrobe set with soft-close Blum hinges',
      'L-Shape acrylic modular kitchen with quartz countertop',
      'False ceiling with concealed warm LED ambient coves',
      'Custom TV entertainment wall unit & floating consoles',
      'Bathroom vanity, mirrors & branded brass accessories'
    ]
  },
  {
    id: 'japandi',
    name: 'Japandi Zen Minimalist',
    tag: 'Editor\'s Pick',
    desc: 'Earthy bamboo tones, warm paper textures & serene Japanese balance — a peaceful sanctuary inside your urban home.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
    budget: '₹ 10.2 Lakhs',
    delivery: '42 days',
    includes: [
      'Tatami-inspired hydraulic platform storage beds',
      'Teak wood fluted panel kitchen with matte finish',
      'Bamboo acoustic slat ceiling with dimmable fixtures',
      'Earthy stone accent walls & minimalist shoe cabinets',
      'Hidden wire management & flush concealed doors'
    ]
  },
  {
    id: 'italian',
    name: 'Italian Luxe Marble',
    tag: 'Ultra Luxury',
    desc: 'Imported Statuario marble textures, brushed gold brass trims & back-lit fluted glass — timeless elegance.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85',
    budget: '₹ 15.8 Lakhs',
    delivery: '45 days',
    includes: [
      'Italian Statuario marble flooring & book-matched slabs',
      'Island modular kitchen with waterfall composite counter',
      'Brushed brass frame profile glass wardrobes with lights',
      'PU lacquered bar unit & custom dining paneling',
      'Smart home automated mood lighting integration'
    ]
  },
  {
    id: 'contemporary',
    name: 'Contemporary Urban Chic',
    tag: 'Trending',
    desc: 'Bold geometry, subtle pop of jewel tones & smart modular furniture crafted for modern city living.',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1200&q=85',
    budget: '₹ 6.8 Lakhs',
    delivery: '38 days',
    includes: [
      'Multi-functional sectional sofa with hidden storage',
      'High-gloss straight modular kitchen with chimney',
      'Geometric false ceiling with magnetic track lights',
      'Textured accent focal walls & fluted console tables',
      'Compact study desk & ergonomic floating bookshelf'
    ]
  },
];

const LAYOUTS = [
  { id: 'L-Shape', label: 'L-Shape Kitchen', desc: 'Ideal for corner spaces & apartments' },
  { id: 'Island', label: 'Island Kitchen', desc: 'Luxury open layout with center breakfast counter' },
  { id: 'Parallel', label: 'Parallel Gallery', desc: 'Maximum counter space & ergonomic efficiency' },
  { id: 'U-Shape', label: 'U-Shape Kitchen', desc: 'Wrap-around layout with generous storage' },
];

const FINISHES = [
  { id: 'Acrylic Gloss', label: 'Acrylic High Gloss', priceMod: 1.0 },
  { id: 'PU Lacquer', label: 'Premium PU Matte Lacquer', priceMod: 1.15 },
  { id: 'Natural Veneer', label: 'Natural Teak Wood Veneer', priceMod: 1.25 },
  { id: 'Laminate', label: 'Anti-Scratch Matte Laminate', priceMod: 0.85 },
];

const BASE_KITCHEN_COSTS = {
  'L-Shape': 280000,
  'Island': 420000,
  'Parallel': 340000,
  'U-Shape': 360000,
};

const PROCESS = [
  { step: '01', title: 'Free 3D Consultation', desc: 'Our senior architect visits your site within 48 hours for laser measurements & design brief.' },
  { step: '02', title: 'Photorealistic VR Walkthrough', desc: 'Receive interactive 3D floorplans and VR headset walkthrough of your space in 72 hours.' },
  { step: '03', title: 'Itemized Lock-In', desc: 'Review transparent line-item budget, select materials, and lock in guaranteed delivery date.' },
  { step: '04', title: 'ISO Factory Production', desc: 'Precision CNC German machine manufacturing with boiling-water-proof (BWP) ply over 30 days.' },
  { step: '05', title: '5-Day Clean Installation', desc: 'Pre-assembled modular modules fitted by factory technicians with zero on-site sawdust mess.' },
  { step: '06', title: 'Handover & 10-Yr Warranty', desc: 'Final deep cleaning, 140-point quality audit, handover of keys & digital 10-year warranty card.' },
];

const REVIEWS = [
  {
    name: 'Pooja & Rohan Malhotra',
    location: 'Worli, Mumbai',
    type: '3 BHK Scandinavian Modern',
    quote: 'The 3D VR blueprint showed us exactly how our home would look before spending a rupee. Delivered on the 39th day with flawless finish!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'Siddharth & Meera Varma',
    location: 'Indiranagar, Bengaluru',
    type: '4 BHK Japandi Minimalist',
    quote: 'RoofRidge saved us 4 months of carpenter headaches. German soft-close cabinets, beautiful fluted paneling and zero site dust.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
  },
];

export default function InteriorsPage({ onBookConsultation }) {
  const [selectedStyle, setSelectedStyle] = useState(STYLES[0]);
  const [selectedLayout, setSelectedLayout] = useState('L-Shape');
  const [selectedFinish, setSelectedFinish] = useState('Acrylic Gloss');
  const { isMobile, isTablet } = useResponsive();

  const baseCost = BASE_KITCHEN_COSTS[selectedLayout] || 280000;
  const finishMultiplier = FINISHES.find(f => f.id === selectedFinish)?.priceMod || 1.0;
  const estimatedCost = Math.round(baseCost * finishMultiplier);

  return (
    <div style={{ background: '#FFFFFF', minHeight: '90vh', fontFamily: 'Inter, sans-serif' }}>

      {/* ── 1. COMPACT EXECUTIVE HERO BANNER ── */}
      <section style={{
        background: 'linear-gradient(180deg, #EEF5FF 0%, #FFFFFF 100%)',
        borderBottom: '1px solid #E5EBF4',
        padding: isMobile ? '16px 0 14px' : '22px 0 18px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div className="rr-container" style={{ position: 'relative', zIndex: 2 }}>
          {/* Eyebrow badge */}
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
              <Sparkles size={13} color="#0866F5" />
              TURNKEY MODULAR INTERIORS & ARCHITECTURE
            </span>
          </div>

          {/* Headline */}
          <h1 style={{
            fontSize: isMobile ? '20px' : '26px',
            fontWeight: 800,
            color: '#0F172A',
            lineHeight: 1.25,
            letterSpacing: '-0.02em',
            margin: '0 0 4px 0',
            maxWidth: '840px',
          }}>
            Crafting Luxury Homes With <span style={{ color: '#0866F5' }}>45-Day Handover Guarantee</span>
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: '12.5px',
            color: '#64748B',
            lineHeight: 1.5,
            maxWidth: '750px',
            margin: '0 0 14px 0',
          }}>
            Photorealistic 3D VR walkthroughs, German-engineered soft-close cabinetry, 10-year flat warranty, and guaranteed installation with zero on-site sawdust mess.
          </p>

          {/* Compact Action + Trust Strip Row */}
          <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: isMobile ? 'flex-start' : 'center',
            justifyContent: 'space-between',
            gap: '14px',
            paddingTop: '12px',
            borderTop: '1px solid rgba(226, 232, 240, 0.8)',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: isMobile ? '12px' : '20px',
              fontSize: '11.5px',
              flexWrap: 'wrap',
            }}>
              {[
                { label: '10-Year Flat Warranty' },
                { label: 'Guaranteed 45-Day Handover' },
                { label: '3D Photorealistic VR Tour' },
                { label: 'Zero Hidden Costs' },
              ].map((t, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <CheckCircle size={13} style={{ color: '#0866F5', flexShrink: 0 }} />
                  <span style={{ fontWeight: 700, color: '#1E293B' }}>{t.label}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => onBookConsultation && onBookConsultation('Full Home Turnkey Interior Consultation', 850000)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: '#0866F5',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '8px',
                padding: '8px 18px',
                fontSize: '12.5px',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(8, 102, 245, 0.22)',
                transition: 'all 0.15s ease',
                flexShrink: 0,
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#0653CA'}
              onMouseLeave={e => e.currentTarget.style.background = '#0866F5'}
            >
              <span>Book Free 3D Consultation</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* ── 2. DESIGN THEMES SHOWCASE ── */}
      <section id="styles-section" style={{ padding: '72px 0', background: '#FFFFFF' }}>
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
              Curated Living Styles
            </span>
            <h2 style={{
              fontSize: isMobile ? '26px' : '36px',
              fontWeight: 800,
              color: '#0F172A',
              letterSpacing: '-0.02em',
              marginBottom: '10px',
            }}>
              Explore Turnkey Interior Design Themes
            </h2>
            <p style={{ fontSize: '15px', color: '#64748B', maxWidth: '640px' }}>
              Select a design theme below to inspect high-resolution 3D renders, package inclusions, and transparent pricing.
            </p>
          </div>

          {/* Style Selector Tabs */}
          <div style={{
            display: 'flex',
            gap: '8px',
            marginBottom: '28px',
            overflowX: 'auto',
            paddingBottom: '4px',
          }}>
            {STYLES.map((s) => {
              const isSelected = selectedStyle.id === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => setSelectedStyle(s)}
                  style={{
                    padding: '11px 22px',
                    borderRadius: '12px',
                    border: isSelected ? '1.5px solid #0866F5' : '1px solid #E5EBF4',
                    background: isSelected ? '#EEF5FF' : '#FFFFFF',
                    color: isSelected ? '#0866F5' : '#0F172A',
                    fontSize: '14px',
                    fontWeight: isSelected ? 700 : 500,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {s.name}
                </button>
              );
            })}
          </div>

          {/* Selected Style Detail Card */}
          <div style={{
            background: '#FFFFFF',
            border: '1px solid #E5EBF4',
            borderRadius: '20px',
            overflow: 'hidden',
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1.3fr 1fr',
            boxShadow: '0 8px 30px rgba(11, 31, 68, 0.06)',
          }}>
            {/* Left: Render Image with Tag */}
            <div style={{
              position: 'relative',
              minHeight: isMobile ? '300px' : '520px',
              background: '#EEF5FF',
            }}>
              <img
                src={selectedStyle.image}
                alt={selectedStyle.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
              <div style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                background: 'linear-gradient(135deg, #0866F5 0%, #0645B8 100%)',
                color: '#FFFFFF',
                padding: '6px 14px',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.04em',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
              }}>
                {selectedStyle.tag}
              </div>
            </div>

            {/* Right: Package Info & Inclusions */}
            <div style={{
              padding: isMobile ? '24px' : '44px 38px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              background: '#FFFFFF',
            }}>
              <div>
                <span style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: '#0866F5',
                  display: 'block',
                  marginBottom: '8px',
                }}>
                  Selected Package
                </span>
                <h3 style={{
                  fontSize: '26px',
                  fontWeight: 800,
                  color: '#0F172A',
                  letterSpacing: '-0.02em',
                  marginBottom: '10px',
                }}>
                  {selectedStyle.name}
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: '#64748B',
                  lineHeight: 1.6,
                  marginBottom: '24px',
                }}>
                  {selectedStyle.desc}
                </p>

                {/* Price & Delivery Highlights Card */}
                <div style={{
                  background: '#F8FAFD',
                  border: '1px solid #E5EBF4',
                  borderRadius: '14px',
                  padding: '18px 20px',
                  marginBottom: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                  <div>
                    <span style={{ fontSize: '11px', fontWeight: 600, color: '#64748B', display: 'block', marginBottom: '2px' }}>
                      Avg. 3BHK Turnkey Cost
                    </span>
                    <span style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em' }}>
                      {selectedStyle.budget}
                    </span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '11px', fontWeight: 600, color: '#64748B', display: 'block', marginBottom: '2px' }}>
                      Guaranteed Delivery
                    </span>
                    <span style={{
                      fontSize: '15px',
                      fontWeight: 700,
                      color: '#0866F5',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}>
                      <Clock size={16} /> {selectedStyle.delivery}
                    </span>
                  </div>
                </div>

                {/* Included In Package */}
                <div style={{ marginBottom: '28px' }}>
                  <span style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    color: '#0F172A',
                    display: 'block',
                    marginBottom: '12px',
                    letterSpacing: '0.04em',
                  }}>
                    What's Included in This Package:
                  </span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {selectedStyle.includes.map((inc, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                        <div style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          background: '#EEF5FF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#0866F5',
                          flexShrink: 0,
                          marginTop: '2px',
                        }}>
                          <Check size={12} strokeWidth={2.5} />
                        </div>
                        <span style={{ fontSize: '13px', color: '#475569', lineHeight: 1.5 }}>
                          {inc}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onBookConsultation && onBookConsultation(selectedStyle.name, selectedStyle.budget)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  width: '100%',
                  background: '#0866F5',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '14px',
                  fontSize: '14px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 6px 18px rgba(8, 102, 245, 0.25)',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <span>Get Customized 3D Quote for {selectedStyle.name}</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. INTERACTIVE MODULAR KITCHEN CONFIGURATOR ── */}
      <section style={{
        background: '#F8FAFD',
        borderTop: '1px solid #E5EBF4',
        borderBottom: '1px solid #E5EBF4',
        padding: '72px 0',
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
              Instant Cost Estimator
            </span>
            <h2 style={{
              fontSize: isMobile ? '26px' : '36px',
              fontWeight: 800,
              color: '#0F172A',
              letterSpacing: '-0.02em',
              marginBottom: '10px',
            }}>
              Configure Your Modular Kitchen in Seconds
            </h2>
            <p style={{ fontSize: '15px', color: '#64748B', maxWidth: '640px' }}>
              Select your kitchen layout and cabinet surface finish for an instant, transparent price calculation.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : (isTablet ? '1fr 1fr' : '1fr 1fr 1.2fr'),
            gap: '24px',
          }}>
            {/* Step 1: Layout */}
            <div style={{
              background: '#FFFFFF',
              border: '1px solid #E5EBF4',
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 4px 16px rgba(11, 31, 68, 0.03)',
            }}>
              <span style={{
                fontSize: '11px',
                fontWeight: 700,
                color: '#0866F5',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '14px',
              }}>
                1. Select Kitchen Layout
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {LAYOUTS.map((l) => {
                  const isSelected = selectedLayout === l.id;
                  return (
                    <button
                      key={l.id}
                      onClick={() => setSelectedLayout(l.id)}
                      style={{
                        padding: '14px 16px',
                        borderRadius: '12px',
                        border: isSelected ? '1.5px solid #0866F5' : '1px solid #E5EBF4',
                        background: isSelected ? '#EEF5FF' : '#FFFFFF',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <div style={{
                        fontSize: '14px',
                        fontWeight: 700,
                        color: isSelected ? '#0866F5' : '#0F172A',
                        marginBottom: '2px',
                      }}>
                        {l.label}
                      </div>
                      <div style={{ fontSize: '12px', color: '#64748B' }}>
                        {l.desc}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Finish */}
            <div style={{
              background: '#FFFFFF',
              border: '1px solid #E5EBF4',
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 4px 16px rgba(11, 31, 68, 0.03)',
            }}>
              <span style={{
                fontSize: '11px',
                fontWeight: 700,
                color: '#0866F5',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '14px',
              }}>
                2. Select Cabinet Finish
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {FINISHES.map((f) => {
                  const isSelected = selectedFinish === f.id;
                  return (
                    <button
                      key={f.id}
                      onClick={() => setSelectedFinish(f.id)}
                      style={{
                        padding: '14px 16px',
                        borderRadius: '12px',
                        border: isSelected ? '1.5px solid #0866F5' : '1px solid #E5EBF4',
                        background: isSelected ? '#EEF5FF' : '#FFFFFF',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <div style={{
                        fontSize: '14px',
                        fontWeight: 700,
                        color: isSelected ? '#0866F5' : '#0F172A',
                        marginBottom: '2px',
                      }}>
                        {f.label}
                      </div>
                      <div style={{ fontSize: '12px', color: '#64748B' }}>
                        {f.id === 'Acrylic Gloss' ? 'Anti-yellowing, mirror gloss reflection' :
                         f.id === 'PU Lacquer' ? 'Seamless Italian matte spray coat' :
                         f.id === 'Natural Veneer' ? 'Handcrafted rich woodgrain feel' :
                         'Scratch & heat resistant daily workhorse'}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Estimated Cost Summary Card */}
            <div style={{
              background: 'linear-gradient(135deg, #0866F5 0%, #0645B8 100%)',
              borderRadius: '16px',
              padding: '28px',
              color: '#FFFFFF',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 12px 32px rgba(8, 102, 245, 0.25)',
            }}>
              <div>
                <span style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'rgba(255, 255, 255, 0.6)',
                  display: 'block',
                  marginBottom: '12px',
                }}>
                  Instant Cost Calculation
                </span>
                <div style={{
                  fontSize: '34px',
                  fontWeight: 800,
                  letterSpacing: '-0.03em',
                  marginBottom: '4px',
                }}>
                  ₹ {(estimatedCost / 100000).toFixed(2)}{' '}
                  <span style={{ fontSize: '18px', fontWeight: 500, color: 'rgba(255,255,255,0.7)' }}>
                    Lakhs
                  </span>
                </div>
                <p style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '22px' }}>
                  Includes 100% Boiling Water Proof (BWP) ply, German soft-close hinges, quartz countertop & installation.
                </p>

                {/* Breakdown List */}
                <div style={{
                  borderTop: '1px solid rgba(255, 255, 255, 0.12)',
                  paddingTop: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  marginBottom: '24px',
                }}>
                  {[
                    { label: 'Layout Config', value: selectedLayout },
                    { label: 'Surface Finish', value: selectedFinish },
                    { label: 'Hardware Brand', value: 'Blum / Hettich Soft-Close' },
                    { label: 'Warranty', value: '10-Year Flat Replacement' },
                  ].map((row, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                      <span style={{ color: 'rgba(255,255,255,0.6)' }}>{row.label}</span>
                      <span style={{ fontWeight: 600, color: '#FFFFFF' }}>{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => onBookConsultation && onBookConsultation(`Modular Kitchen (${selectedLayout}, ${selectedFinish})`, estimatedCost)}
                style={{
                  width: '100%',
                  background: '#0866F5',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '14px',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 14px rgba(8, 102, 245, 0.4)',
                  transition: 'transform 0.15s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <span>Book Free Kitchen Site Survey</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. 45-DAY HANDOVER PROCESS ROADMAP ── */}
      <section style={{ padding: '72px 0', background: '#FFFFFF' }}>
        <div className="rr-container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span style={{
              fontSize: '12px',
              fontWeight: 700,
              color: '#0866F5',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '8px',
            }}>
              Zero-Hassle Workflow
            </span>
            <h2 style={{
              fontSize: isMobile ? '26px' : '36px',
              fontWeight: 800,
              color: '#0F172A',
              letterSpacing: '-0.02em',
              marginBottom: '10px',
            }}>
              From VR Blueprint to Handover in 45 Days
            </h2>
            <p style={{ fontSize: '15px', color: '#64748B', maxWidth: '580px', margin: '0 auto' }}>
              Our standardized 6-step project delivery ensures your home is completed on time with zero budget escalations.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: '20px',
          }}>
            {PROCESS.map((p, i) => (
              <div
                key={i}
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #E5EBF4',
                  borderRadius: '16px',
                  padding: '28px',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  boxShadow: '0 2px 10px rgba(11, 31, 68, 0.03)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 24px rgba(11, 31, 68, 0.06)';
                  e.currentTarget.style.borderColor = '#C7D9F5';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 10px rgba(11, 31, 68, 0.03)';
                  e.currentTarget.style.borderColor = '#E5EBF4';
                }}
              >
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: '#EEF5FF',
                  color: '#0866F5',
                  fontSize: '14px',
                  fontWeight: 800,
                  marginBottom: '16px',
                }}>
                  {p.step}
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0F172A', marginBottom: '8px' }}>
                  {p.title}
                </h3>
                <p style={{ fontSize: '13px', color: '#64748B', lineHeight: 1.6 }}>
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. CLIENT REVIEWS & VERIFIED TRANSFORMATIONS ── */}
      <section style={{
        background: '#F8FAFD',
        borderTop: '1px solid #E5EBF4',
        padding: '64px 0 80px',
      }}>
        <div className="rr-container">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span style={{
              fontSize: '12px',
              fontWeight: 700,
              color: '#0866F5',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '8px',
            }}>
              Real Homeowners
            </span>
            <h2 style={{
              fontSize: isMobile ? '24px' : '32px',
              fontWeight: 800,
              color: '#0F172A',
              letterSpacing: '-0.02em',
            }}>
              What Our Clients Say About Handover Quality
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: '24px',
            maxWidth: '900px',
            margin: '0 auto',
          }}>
            {REVIEWS.map((r, i) => (
              <div
                key={i}
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #E5EBF4',
                  borderRadius: '16px',
                  padding: '28px',
                  boxShadow: '0 4px 16px rgba(11, 31, 68, 0.04)',
                }}
              >
                <div style={{ display: 'flex', gap: '3px', marginBottom: '14px' }}>
                  {[...Array(r.rating)].map((_, s) => (
                    <Star key={s} size={15} fill="#F59E0B" color="#F59E0B" />
                  ))}
                </div>
                <p style={{
                  fontSize: '14px',
                  color: '#475569',
                  lineHeight: 1.65,
                  fontStyle: 'italic',
                  marginBottom: '20px',
                }}>
                  "{r.quote}"
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img
                    src={r.avatar}
                    alt={r.name}
                    style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A' }}>{r.name}</div>
                    <div style={{ fontSize: '12px', color: '#64748B' }}>{r.location} · {r.type}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Consultation CTA Banner */}
          <div style={{
            background: '#FFFFFF',
            border: '1px solid #E5EBF4',
            borderRadius: '20px',
            padding: isMobile ? '28px 20px' : '36px 44px',
            marginTop: '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '24px',
            flexWrap: 'wrap',
            boxShadow: '0 8px 24px rgba(11, 31, 68, 0.04)',
          }}>
            <div>
              <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A', marginBottom: '6px' }}>
                Ready to transform your home with precision design?
              </h3>
              <p style={{ fontSize: '14px', color: '#64748B' }}>
                Get free 3D blueprints and an exact material bill of quantities (BOQ) with zero commitment.
              </p>
            </div>
            <button
              onClick={() => onBookConsultation && onBookConsultation('Executive 3D Interior Blueprint Consultation', 950000)}
              style={{
                background: '#0866F5',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '12px',
                padding: '14px 28px',
                fontSize: '14px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 14px rgba(8, 102, 245, 0.25)',
              }}
            >
              <span>Schedule Free Site Visit</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
