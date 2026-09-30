import React, { useState } from 'react';
import { PROPERTIES } from '../data/mockData';
import { X, Trash2, ArrowRight, Heart, ShoppingBag, MapPin } from 'lucide-react';

export default function WishlistDrawer({ wishlist, cart, onClose, onRemoveWishlist, onRemoveCart }) {
  const [tab, setTab] = useState('saved');
  const savedProperties = PROPERTIES.filter(p => wishlist.includes(p.id));
  const totalItems = savedProperties.length + cart.length;

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-card" style={{ maxWidth: '520px', padding: 0, overflow: 'hidden' }}>

        {/* ── Dark header band ── */}
        <div style={{ background: '#0B192C', padding: '32px 36px 0', position: 'relative' }}>
          <button onClick={onClose} style={{
            position: 'absolute', top: '16px', right: '16px',
            width: '32px', height: '32px',
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '2px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'rgba(255,255,255,0.6)', cursor: 'pointer',
          }}>
            <X size={15} />
          </button>

          <p style={{ fontSize: '0.62rem', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', fontFamily: 'Manrope, sans-serif', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ display: 'inline-block', width: '18px', height: '1.5px', background: 'rgba(255,255,255,0.3)' }} />
            My Roof Ridge
          </p>
          <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: '1.5rem', fontWeight: 800, color: 'white', letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: '20px' }}>
            Saved Properties &amp; Inquiries
          </h2>

          {/* Tabs inside header */}
          <div style={{ display: 'flex', gap: '2px' }}>
            {[
              { key: 'saved', label: 'Saved Homes', count: savedProperties.length, icon: Heart },
              { key: 'quotes', label: 'Material Quotes', count: cart.length, icon: ShoppingBag },
            ].map(({ key, label, count, icon: Icon }) => (
              <button key={key} onClick={() => setTab(key)} style={{
                flex: 1, padding: '11px 16px', border: 'none', cursor: 'pointer',
                background: tab === key ? 'white' : 'rgba(255,255,255,0.06)',
                color: tab === key ? '#0B192C' : 'rgba(255,255,255,0.55)',
                fontSize: '0.78rem', fontWeight: tab === key ? 700 : 400,
                fontFamily: 'Manrope, sans-serif',
                borderRadius: '2px 2px 0 0',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7px',
                transition: 'all 0.15s',
              }}>
                <Icon size={14} />
                {label}
                <span style={{
                  padding: '1px 6px', borderRadius: '2px', fontSize: '0.65rem', fontWeight: 800,
                  background: tab === key ? '#0B192C' : 'rgba(255,255,255,0.15)',
                  color: 'white',
                }}>{count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ── Content ── */}
        <div style={{ padding: '0', background: '#F8F7F4', maxHeight: '55vh', overflowY: 'auto' }}>

          {tab === 'saved' && (
            <>
              {savedProperties.length === 0 ? (
                <div style={{ padding: '48px 36px', textAlign: 'center' }}>
                  <Heart size={36} style={{ color: '#D8D3CB', marginBottom: '12px' }} />
                  <p style={{ fontSize: '0.88rem', fontWeight: 600, color: '#9CA3AF', fontFamily: 'Manrope, sans-serif' }}>No saved properties yet</p>
                  <p style={{ fontSize: '0.78rem', color: '#9CA3AF', fontFamily: 'Manrope, sans-serif', marginTop: '4px' }}>Tap the heart icon on any listing to save it here.</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: '#E4E1DA' }}>
                  {savedProperties.map(item => (
                    <div key={item.id} style={{ background: 'white', display: 'flex', gap: '0', alignItems: 'stretch' }}>
                      <div style={{ width: '100px', flexShrink: 0, overflow: 'hidden' }}>
                        <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <div style={{ flex: 1, padding: '14px 16px', minWidth: 0 }}>
                        <span style={{ fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#0B192C', background: '#F8F7F4', border: '1px solid #E4E1DA', padding: '2px 7px', borderRadius: '2px', fontFamily: 'Manrope, sans-serif', display: 'inline-block', marginBottom: '6px' }}>RERA Verified</span>
                        <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0B192C', fontFamily: 'Manrope, sans-serif', lineHeight: 1.25, marginBottom: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.title}</h4>
                        <p style={{ fontSize: '0.72rem', color: '#9CA3AF', fontFamily: 'Manrope, sans-serif', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '6px' }}>
                          <MapPin size={10} />{item.location}
                        </p>
                        <p style={{ fontSize: '1rem', fontWeight: 800, color: '#0B192C', letterSpacing: '-0.02em', fontFamily: 'Manrope, sans-serif' }}>{item.price}</p>
                      </div>
                      <button onClick={() => onRemoveWishlist(item.id)}
                        style={{ padding: '0 16px', background: 'none', border: 'none', borderLeft: '1px solid #F0EDE7', color: '#C0B8AD', cursor: 'pointer', transition: 'color 0.15s', flexShrink: 0 }}
                        onMouseEnter={e => e.currentTarget.style.color = '#EF4444'}
                        onMouseLeave={e => e.currentTarget.style.color = '#C0B8AD'}>
                        <Trash2 size={15} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {tab === 'quotes' && (
            <>
              {cart.length === 0 ? (
                <div style={{ padding: '48px 36px', textAlign: 'center' }}>
                  <ShoppingBag size={36} style={{ color: '#D8D3CB', marginBottom: '12px' }} />
                  <p style={{ fontSize: '0.88rem', fontWeight: 600, color: '#9CA3AF', fontFamily: 'Manrope, sans-serif' }}>No material quotes yet</p>
                  <p style={{ fontSize: '0.78rem', color: '#9CA3AF', fontFamily: 'Manrope, sans-serif', marginTop: '4px' }}>Click "Request Quote" on any building material to add it here.</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: '#E4E1DA' }}>
                  {cart.map((item, idx) => (
                    <div key={idx} style={{ background: 'white', display: 'flex', gap: '0', alignItems: 'stretch' }}>
                      <div style={{ width: '100px', flexShrink: 0, overflow: 'hidden' }}>
                        <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <div style={{ flex: 1, padding: '14px 16px', minWidth: 0 }}>
                        <span style={{ fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#0B192C', background: '#F8F7F4', border: '1px solid #E4E1DA', padding: '2px 7px', borderRadius: '2px', fontFamily: 'Manrope, sans-serif', display: 'inline-block', marginBottom: '6px' }}>Wholesale Quote</span>
                        <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0B192C', fontFamily: 'Manrope, sans-serif', lineHeight: 1.25, marginBottom: '6px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</h4>
                        <p style={{ fontSize: '1rem', fontWeight: 800, color: '#0B192C', letterSpacing: '-0.02em', fontFamily: 'Manrope, sans-serif' }}>{item.price}</p>
                      </div>
                      <button onClick={() => onRemoveCart(idx)}
                        style={{ padding: '0 16px', background: 'none', border: 'none', borderLeft: '1px solid #F0EDE7', color: '#C0B8AD', cursor: 'pointer', transition: 'color 0.15s', flexShrink: 0 }}
                        onMouseEnter={e => e.currentTarget.style.color = '#EF4444'}
                        onMouseLeave={e => e.currentTarget.style.color = '#C0B8AD'}>
                        <Trash2 size={15} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* ── Footer CTA ── */}
        {totalItems > 0 && (
          <div style={{ padding: '20px 36px', borderTop: '1px solid #E4E1DA', background: 'white', display: 'flex', gap: '10px', alignItems: 'center' }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: '0.78rem', fontWeight: 700, color: '#0B192C', fontFamily: 'Manrope, sans-serif' }}>{totalItems} item{totalItems !== 1 ? 's' : ''} selected</p>
              <p style={{ fontSize: '0.7rem', color: '#9CA3AF', fontFamily: 'Manrope, sans-serif' }}>Our concierge will respond within 2 hours</p>
            </div>
            <button
              onClick={() => { alert('Your batch inquiry has been dispatched to Roof Ridge Concierge!'); onClose(); }}
              style={{ flexShrink: 0, background: '#0B192C', color: 'white', border: 'none', borderRadius: '2px', padding: '12px 20px', fontSize: '0.78rem', fontWeight: 800, letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '7px', cursor: 'pointer', fontFamily: 'Manrope, sans-serif' }}>
              Submit Batch Inquiry <ArrowRight size={13} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
