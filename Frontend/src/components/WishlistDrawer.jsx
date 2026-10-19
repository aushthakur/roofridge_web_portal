import React, { useState } from 'react';
import { PROPERTIES } from '../data/mockData';
import { X, Trash2, ArrowRight, Heart, ShoppingBag, MapPin, Sparkles } from 'lucide-react';

export default function WishlistDrawer({ wishlist, cart, onClose, onRemoveWishlist, onRemoveCart, onProceedToCheckout }) {
  const [tab, setTab] = useState(cart.length > 0 ? 'quotes' : 'saved');
  const savedProperties = PROPERTIES.filter(p => wishlist.includes(p.id));
  const totalItems = savedProperties.length + cart.length;

  return (
    <div
      className="modal-overlay"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(11, 31, 68, 0.65)',
        backdropFilter: 'blur(6px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        animation: 'fadeIn 0.2s ease',
      }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div
        className="modal-card"
        style={{
          maxWidth: '540px',
          width: '100%',
          padding: 0,
          overflow: 'hidden',
          borderRadius: '24px',
          background: '#FFFFFF',
          boxShadow: '0 25px 60px -15px rgba(11, 31, 68, 0.3)',
          border: '1px solid #E2E8F0',
          fontFamily: 'Inter, sans-serif',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '90vh',
        }}
      >
        {/* ── Executive Header Band ── */}
        <div style={{
          background: 'linear-gradient(135deg, #0866F5 0%, #0645B8 100%)',
          padding: '28px 32px 0',
          position: 'relative',
          color: '#FFFFFF',
        }}>
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '18px',
              right: '18px',
              width: '34px',
              height: '34px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              cursor: 'pointer',
              transition: 'background 0.15s ease',
            }}
            title="Close Drawer"
          >
            <X size={16} />
          </button>

          <p style={{
            fontSize: '11px',
            fontWeight: 800,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#93C5FD',
            marginBottom: '6px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}>
            <Sparkles size={13} color="#60A5FA" />
            My Roof Ridge Portfolio
          </p>
          <h2 style={{
            fontSize: '22px',
            fontWeight: 800,
            color: '#FFFFFF',
            letterSpacing: '-0.02em',
            lineHeight: 1.25,
            marginBottom: '20px',
          }}>
            Saved Properties &amp; Inquiries
          </h2>

          {/* Pill Tabs inside Header */}
          <div style={{ display: 'flex', gap: '8px' }}>
            {[
              { key: 'saved', label: 'Saved Homes', count: savedProperties.length, icon: Heart },
              { key: 'quotes', label: 'Material Quotes', count: cart.length, icon: ShoppingBag },
            ].map(({ key, label, count, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  border: 'none',
                  cursor: 'pointer',
                  background: tab === key ? '#FFFFFF' : 'rgba(255, 255, 255, 0.08)',
                  color: tab === key ? '#0866F5' : 'rgba(255, 255, 255, 0.7)',
                  fontSize: '13px',
                  fontWeight: tab === key ? 800 : 600,
                  borderRadius: '12px 12px 0 0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  transition: 'all 0.15s ease',
                }}
              >
                <Icon size={15} color={tab === key ? '#0866F5' : 'rgba(255, 255, 255, 0.7)'} />
                <span>{label}</span>
                <span style={{
                  padding: '2px 8px',
                  borderRadius: '12px',
                  fontSize: '11px',
                  fontWeight: 800,
                  background: tab === key ? '#EEF5FF' : 'rgba(255, 255, 255, 0.15)',
                  color: tab === key ? '#0866F5' : '#FFFFFF',
                }}>
                  {count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ── Content Body ── */}
        <div style={{ padding: '20px', background: '#F8FAFC', maxHeight: '55vh', overflowY: 'auto', flex: 1 }}>

          {tab === 'saved' && (
            <>
              {savedProperties.length === 0 ? (
                <div style={{ padding: '54px 32px', textAlign: 'center' }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: '#EEF5FF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 14px',
                    color: '#0866F5',
                  }}>
                    <Heart size={28} />
                  </div>
                  <p style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A' }}>No saved properties yet</p>
                  <p style={{ fontSize: '13px', color: '#64748B', marginTop: '4px' }}>
                    Tap the heart icon on any verified property listing to save it here for instant site visits.
                  </p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {savedProperties.map(item => (
                    <div
                      key={item.id}
                      style={{
                        background: '#FFFFFF',
                        borderRadius: '16px',
                        border: '1px solid #E2E8F0',
                        boxShadow: '0 2px 8px rgba(11, 31, 68, 0.04)',
                        display: 'flex',
                        overflow: 'hidden',
                        alignItems: 'stretch',
                      }}
                    >
                      <div style={{ width: '110px', flexShrink: 0, overflow: 'hidden' }}>
                        <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <div style={{ flex: 1, padding: '14px 16px', minWidth: 0 }}>
                        <span style={{
                          fontSize: '10px',
                          fontWeight: 800,
                          letterSpacing: '0.06em',
                          textTransform: 'uppercase',
                          color: '#0866F5',
                          background: '#EEF5FF',
                          border: '1px solid rgba(8, 102, 245, 0.2)',
                          padding: '2px 8px',
                          borderRadius: '12px',
                          display: 'inline-block',
                          marginBottom: '6px',
                        }}>
                          RERA Verified
                        </span>
                        <h4 style={{
                          fontSize: '14px',
                          fontWeight: 700,
                          color: '#0F172A',
                          lineHeight: 1.3,
                          marginBottom: '4px',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}>
                          {item.title}
                        </h4>
                        <p style={{
                          fontSize: '12px',
                          color: '#64748B',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          marginBottom: '6px',
                        }}>
                          <MapPin size={11} color="#0866F5" /> {item.location}
                        </p>
                        <p style={{
                          fontSize: '16px',
                          fontWeight: 800,
                          color: '#0866F5',
                          letterSpacing: '-0.02em',
                        }}>
                          {item.price}
                        </p>
                      </div>
                      <button
                        onClick={() => onRemoveWishlist(item.id)}
                        style={{
                          padding: '0 18px',
                          background: 'none',
                          border: 'none',
                          borderLeft: '1px solid #F1F5F9',
                          color: '#94A3B8',
                          cursor: 'pointer',
                          transition: 'color 0.15s ease',
                          flexShrink: 0,
                        }}
                        onMouseEnter={e => e.currentTarget.style.color = '#EF4444'}
                        onMouseLeave={e => e.currentTarget.style.color = '#94A3B8'}
                        title="Remove from saved"
                      >
                        <Trash2 size={16} />
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
                <div style={{ padding: '54px 32px', textAlign: 'center' }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: '#EEF5FF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 14px',
                    color: '#0866F5',
                  }}>
                    <ShoppingBag size={28} />
                  </div>
                  <p style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A' }}>No material quotes yet</p>
                  <p style={{ fontSize: '13px', color: '#64748B', marginTop: '4px' }}>
                    Click "Request Quote" or "Add to Cart" on any building material to lock in factory-direct wholesale pricing.
                  </p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {cart.map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        background: '#FFFFFF',
                        borderRadius: '16px',
                        border: '1px solid #E2E8F0',
                        boxShadow: '0 2px 8px rgba(11, 31, 68, 0.04)',
                        display: 'flex',
                        overflow: 'hidden',
                        alignItems: 'stretch',
                      }}
                    >
                      <div style={{ width: '110px', flexShrink: 0, overflow: 'hidden' }}>
                        <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <div style={{ flex: 1, padding: '14px 16px', minWidth: 0 }}>
                        <span style={{
                          fontSize: '10px',
                          fontWeight: 800,
                          letterSpacing: '0.06em',
                          textTransform: 'uppercase',
                          color: '#0866F5',
                          background: '#EEF5FF',
                          border: '1px solid rgba(8, 102, 245, 0.2)',
                          padding: '2px 8px',
                          borderRadius: '12px',
                          display: 'inline-block',
                          marginBottom: '6px',
                        }}>
                          Wholesale Quote
                        </span>
                        <h4 style={{
                          fontSize: '14px',
                          fontWeight: 700,
                          color: '#0F172A',
                          lineHeight: 1.3,
                          marginBottom: '4px',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}>
                          {item.name}
                        </h4>
                        <p style={{
                          fontSize: '16px',
                          fontWeight: 800,
                          color: '#0866F5',
                          letterSpacing: '-0.02em',
                        }}>
                          {item.price}
                        </p>
                      </div>
                      <button
                        onClick={() => onRemoveCart(idx)}
                        style={{
                          padding: '0 18px',
                          background: 'none',
                          border: 'none',
                          borderLeft: '1px solid #F1F5F9',
                          color: '#94A3B8',
                          cursor: 'pointer',
                          transition: 'color 0.15s ease',
                          flexShrink: 0,
                        }}
                        onMouseEnter={e => e.currentTarget.style.color = '#EF4444'}
                        onMouseLeave={e => e.currentTarget.style.color = '#94A3B8'}
                        title="Remove quote"
                      >
                        <Trash2 size={16} />
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
          <div style={{
            padding: '20px 28px',
            borderTop: '1px solid #E2E8F0',
            background: '#FFFFFF',
            display: 'flex',
            gap: '14px',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A' }}>
                {totalItems} item{totalItems !== 1 ? 's' : ''} in shortlist
              </p>
              <p style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>
                {tab === 'quotes' ? 'Instant GST Wholesale Checkout' : 'Dedicated VIP Relationship Manager will coordinate'}
              </p>
            </div>
            {tab === 'quotes' && onProceedToCheckout ? (
              <button
                onClick={onProceedToCheckout}
                style={{
                  flexShrink: 0,
                  background: '#0866F5',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '30px',
                  padding: '12px 24px',
                  fontSize: '13px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(8, 102, 245, 0.3)',
                  transition: 'background 0.15s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#0653CA'}
                onMouseLeave={e => e.currentTarget.style.background = '#0866F5'}
              >
                Proceed to Checkout <ArrowRight size={14} />
              </button>
            ) : (
              <button
                onClick={() => {
                  alert('Your saved items and inquiries have been dispatched to Roof Ridge Concierge!');
                  onClose();
                }}
                style={{
                  flexShrink: 0,
                  background: '#0866F5',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '30px',
                  padding: '12px 24px',
                  fontSize: '13px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(8, 102, 245, 0.3)',
                  transition: 'background 0.15s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#0653CA'}
                onMouseLeave={e => e.currentTarget.style.background = '#0866F5'}
              >
                Submit Inquiry <ArrowRight size={14} />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
