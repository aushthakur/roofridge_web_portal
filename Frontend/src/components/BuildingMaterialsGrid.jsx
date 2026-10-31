import React, { useState } from 'react';
import { Truck, Plus, Minus, Check, Building, FileCheck, ShieldCheck } from 'lucide-react';
import { useResponsive } from '../hooks/useResponsive';

const PRODUCTS = [
  {
    id: 'mat-1',
    brand: 'UltraTech',
    name: 'Super Premium Composite Cement',
    grade: 'PPC 53 Grade · Anti-Crack Formula',
    unit: 'bag (50kg)',
    price: 385,
    mrp: 430,
    minQty: 50,
    step: 25,
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=700&q=80',
    cert: 'IS 269:2015 Compliant',
    tag: 'Factory Direct',
  },
  {
    id: 'mat-2',
    brand: 'TATA Tiscon',
    name: 'Super Ductile 500D TMT Steel Rebars',
    grade: '12mm Diameter · Earthquake Resistant',
    unit: 'ton',
    price: 64500,
    mrp: 68000,
    minQty: 2,
    step: 1,
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=700&q=80',
    cert: 'IS 1786 Fe-500D',
    tag: 'Mill Direct',
  },
  {
    id: 'mat-3',
    brand: 'Kajaria Eternity',
    name: 'Glazed Vitrified Statuario Marble Tiles',
    grade: '800 x 1600 mm · High Gloss Finish',
    unit: 'sq.ft',
    price: 85,
    mrp: 110,
    minQty: 500,
    step: 100,
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=700&q=80',
    cert: 'Zero Water Absorption',
    tag: 'First Quality',
  },
  {
    id: 'mat-4',
    brand: 'Schneider Electric',
    name: 'Wiser Smart Home Automation Kit',
    grade: 'IoT Touch Switches & Alexa Hub',
    unit: 'complete kit',
    price: 45000,
    mrp: 58000,
    minQty: 1,
    step: 1,
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=700&q=80',
    cert: 'CE & RoHS Certified',
    tag: 'Plug & Play',
  },
];

export default function BuildingMaterialsGrid({ onAddToCart }) {
  const { isMobile, isTablet } = useResponsive();
  const [quantities, setQuantities] = useState({
    'mat-1': 50,
    'mat-2': 2,
    'mat-3': 500,
    'mat-4': 1,
  });
  const [addedMap, setAddedMap] = useState({});

  const updateQty = (id, delta, min, step) => {
    setQuantities(prev => {
      const current = prev[id] || min;
      const next = Math.max(min, current + (delta * step));
      return { ...prev, [id]: next };
    });
  };

  const handleAdd = (item) => {
    const qty = quantities[item.id] || item.minQty;
    if (onAddToCart) onAddToCart({ ...item, qty });
    setAddedMap(prev => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedMap(prev => ({ ...prev, [item.id]: false }));
    }, 2000);
  };

  return (
    <section style={{
      padding: isMobile ? '40px 0' : '72px 0',
      background: '#FFFFFF',
      position: 'relative',
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: isMobile ? '0 16px' : '0 28px' }}>
        
        {/* Section Header */}
        <div style={{
          display: 'flex',
          alignItems: isMobile ? 'flex-start' : 'flex-end',
          justifyContent: 'space-between',
          marginBottom: isMobile ? '24px' : '36px',
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? '16px' : '24px',
        }}>
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: '#0866F5',
              fontSize: '0.76rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '8px',
            }}>
              <Building size={15} /> B2B WHOLESALE PROCUREMENT
            </div>
            <h2 style={{
              fontSize: 'clamp(1.5rem, 2.8vw, 2.4rem)',
              fontWeight: 800,
              color: '#0F172A',
              letterSpacing: '-0.025em',
              lineHeight: 1.18,
              margin: '0 0 8px 0',
            }}>
              Factory-Direct Building Materials
            </h2>
            <p style={{
              fontSize: '0.94rem',
              color: '#64748B',
              margin: 0,
              maxWidth: '640px',
              lineHeight: 1.55,
            }}>
              Eliminate distributor markups. Source cement, structural TMT steel, porcelain tiles & smart automation directly with 24-hr site dispatch.
            </p>
          </div>

          {/* Trust Guarantees */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            background: '#F8FAFD',
            border: '1px solid #E5EBF4',
            borderRadius: '16px',
            padding: '10px 18px',
            width: isMobile ? '100%' : 'auto',
            justifyContent: isMobile ? 'space-around' : 'flex-start',
            boxSizing: 'border-box',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', fontWeight: 700, color: '#0F172A' }}>
              <Truck size={15} color="#0866F5" /> 35+ Cities 24h Delivery
            </div>
            <div style={{ width: '1px', height: '16px', background: '#E2E8F0' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', fontWeight: 700, color: '#0F172A' }}>
              <FileCheck size={15} color="#059669" /> GST Verified Invoicing
            </div>
          </div>
        </div>

        {/* 4 Product Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile 
            ? '1fr' 
            : (isTablet ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(280px, 1fr))'),
          gap: isMobile ? '16px' : '24px',
        }}>
          {PRODUCTS.map((item) => {
            const qty = quantities[item.id] || item.minQty;
            const lineTotal = (qty * item.price).toLocaleString();
            const isAdded = addedMap[item.id];

            return (
              <div
                key={item.id}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '20px',
                  border: '1px solid #E5EBF4',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 6px 20px rgba(11, 31, 68, 0.05)',
                  transition: 'all 0.22s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 16px 36px rgba(11, 31, 68, 0.1)';
                  e.currentTarget.style.borderColor = '#0866F5';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(11, 31, 68, 0.05)';
                  e.currentTarget.style.borderColor = '#E5EBF4';
                }}
              >
                <div>
                  {/* Photo Header */}
                  <div style={{ position: 'relative', height: '190px', overflow: 'hidden' }}>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(11, 31, 68, 0.6) 0%, transparent 60%)',
                    }} />

                    {/* Brand Pill */}
                    <div style={{
                      position: 'absolute',
                      top: '14px',
                      left: '14px',
                      background: '#FFFFFF',
                      color: '#0F172A',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      padding: '4px 10px',
                      borderRadius: '16px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                    }}>
                      {item.brand}
                    </div>

                    {/* Tag */}
                    <div style={{
                      position: 'absolute',
                      top: '14px',
                      right: '14px',
                      background: 'rgba(8, 102, 245, 0.9)',
                      backdropFilter: 'blur(4px)',
                      color: '#FFFFFF',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      padding: '3px 8px',
                      borderRadius: '12px',
                    }}>
                      {item.tag}
                    </div>

                    {/* Cert Badge */}
                    <div style={{
                      position: 'absolute',
                      bottom: '10px',
                      left: '14px',
                      color: '#FFFFFF',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}>
                      <ShieldCheck size={13} color="#60A5FA" /> {item.cert}
                    </div>
                  </div>

                  {/* Body Info */}
                  <div style={{ padding: '20px 20px 0 20px' }}>
                    <h3 style={{
                      fontSize: '1.05rem',
                      fontWeight: 800,
                      color: '#0F172A',
                      lineHeight: 1.3,
                      margin: '0 0 4px 0',
                    }}>
                      {item.name}
                    </h3>

                    <p style={{
                      fontSize: '0.78rem',
                      color: '#64748B',
                      margin: '0 0 14px 0',
                    }}>
                      {item.grade}
                    </p>

                    {/* Price Block */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: '8px',
                      marginBottom: '16px',
                    }}>
                      <span style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0F172A' }}>
                        ₹ {item.price.toLocaleString()}
                      </span>
                      <span style={{ fontSize: '0.78rem', color: '#64748B' }}>
                        / {item.unit}
                      </span>
                      <span style={{ fontSize: '0.78rem', color: '#94A3B8', textDecoration: 'line-through', marginLeft: '4px' }}>
                        ₹ {item.mrp.toLocaleString()}
                      </span>
                    </div>

                    {/* Quantity Stepper */}
                    <div style={{
                      background: '#F8FAFD',
                      borderRadius: '12px',
                      padding: '10px 14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '16px',
                      border: '1px solid #E5EBF4',
                    }}>
                      <div style={{ fontSize: '0.74rem', color: '#64748B', fontWeight: 600 }}>
                        Order Quantity:
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <button
                          type="button"
                          onClick={() => updateQty(item.id, -1, item.minQty, item.step)}
                          style={{
                            width: '26px',
                            height: '26px',
                            borderRadius: '6px',
                            border: '1px solid #CBD5E1',
                            background: '#FFFFFF',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            color: '#0F172A',
                          }}
                        >
                          <Minus size={12} />
                        </button>

                        <span style={{ fontSize: '0.86rem', fontWeight: 800, color: '#0F172A', minWidth: '40px', textAlign: 'center' }}>
                          {qty.toLocaleString()}
                        </span>

                        <button
                          type="button"
                          onClick={() => updateQty(item.id, 1, item.minQty, item.step)}
                          style={{
                            width: '26px',
                            height: '26px',
                            borderRadius: '6px',
                            border: '1px solid #CBD5E1',
                            background: '#FFFFFF',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            color: '#0F172A',
                          }}
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>

                    {/* Line Total */}
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: '0.78rem',
                      marginBottom: '18px',
                      padding: '0 2px',
                    }}>
                      <span style={{ color: '#64748B' }}>Estimated Subtotal:</span>
                      <span style={{ fontWeight: 800, color: '#0866F5', fontSize: '0.92rem' }}>
                        ₹ {lineTotal}
                      </span>
                    </div>

                  </div>
                </div>

                {/* Add to Quote Button */}
                <div style={{ padding: '0 20px 20px 20px' }}>
                  <button
                    onClick={() => handleAdd(item)}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      background: isAdded ? '#059669' : '#0866F5',
                      color: '#FFFFFF',
                      border: 'none',
                      fontSize: '0.86rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      boxShadow: isAdded ? 'none' : '0 4px 14px rgba(8, 102, 245, 0.25)',
                      transition: 'all 0.18s ease',
                    }}
                  >
                    {isAdded ? (
                      <>
                        <Check size={16} strokeWidth={3} /> Added to Project Quote
                      </>
                    ) : (
                      <>
                        <Plus size={16} /> Add to Wholesale Quote
                      </>
                    )}
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
