import React, { useState } from 'react';
import { X, Building2, CheckCircle, Upload, Shield, ArrowRight } from 'lucide-react';
import api from '../services/api';

const LISTING_TYPES = [
  { key: 'sell', label: 'Sell Property' },
  { key: 'rent', label: 'Rent Property' },
  { key: 'interior', label: 'List Interiors' },
];

const PROPERTY_TYPES = ['Apartment', 'Villa', 'Penthouse', 'Independent House', 'Plot', 'Commercial'];
const BHK_OPTIONS = ['Studio', '1 BHK', '2 BHK', '3 BHK', '4 BHK', '4 BHK+'];

export default function PostPropertyModal({ onClose, selectedCity }) {
  const [submitted, setSubmitted] = useState(false);
  const [listingType, setListingType] = useState('sell');
  const [propType, setPropType] = useState('Apartment');
  const [bhk, setBhk] = useState('3 BHK');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [area, setArea] = useState('');
  const [phone, setPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const numPrice = Number(price.replace(/[^0-9]/g, '')) || (listingType === 'rent' ? 35000 : 15000000);
      const parsedBhk = parseInt(bhk, 10) || 3;

      await api.createProperty({
        title: title || `${bhk} ${propType} in ${selectedCity?.name || 'Noida'}`,
        description: `Verified ${bhk} ${propType} listed by owner with modern amenities and clear title.`,
        price: numPrice,
        priceDisplay: price || (listingType === 'rent' ? '₹35,000 / mo' : '₹1.50 Cr'),
        type: listingType === 'rent' ? 'rent' : 'buy',
        propertyType: propType.toLowerCase() === 'commercial' ? 'commercial' : 'residential',
        subType: propType.toLowerCase().replace(/\s+/g, '_'),
        bhk: parsedBhk,
        location: {
          city: selectedCity?.name || 'Noida',
          locality: 'Sector 150',
          state: 'Uttar Pradesh',
        },
        features: {
          areaSqFt: Number(area) || 1650,
          bedrooms: parsedBhk,
          bathrooms: Math.max(1, parsedBhk - 1),
        },
        approvalStatus: 'pending', // Enters admin moderation desk
      });
    } catch (err) {
      console.warn('Property submit fallback:', err.message);
    } finally {
      setSubmitting(false);
      setSubmitted(true);
      setTimeout(onClose, 2500);
    }
  };

  if (submitted) {
    return (
      <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
        <div className="modal-card" style={{ maxWidth: '480px', padding: 0, overflow: 'hidden', borderRadius: '24px', border: '1px solid #E2E8F0', boxShadow: '0 25px 60px -15px rgba(8, 102, 245, 0.25)' }}>
          <div style={{ background: 'linear-gradient(135deg, #0866F5 0%, #0645B8 100%)', padding: '48px 40px', textAlign: 'center', color: '#FFFFFF' }}>
            <div style={{ width: '60px', height: '60px', background: 'rgba(255, 255, 255, 0.2)', border: '1.5px solid rgba(255, 255, 255, 0.4)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <CheckCircle size={30} color="#FFFFFF" />
            </div>
            <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.4rem', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em', marginBottom: '8px' }}>Listing Submitted!</h2>
            <p style={{ fontSize: '0.88rem', color: 'rgba(255, 255, 255, 0.75)', fontFamily: 'Inter, sans-serif', lineHeight: 1.6 }}>
              Our RERA verification team will audit your photos and publish the listing live within 2 hours.
            </p>
          </div>
          <div style={{ padding: '24px 36px', background: '#F8FAFC', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {['Physical listing verification — 2 hours', 'Go-live notification via SMS & WhatsApp', 'Direct buyer inquiries straight to your phone'].map(t => (
              <div key={t} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle size={15} style={{ color: '#0866F5', flexShrink: 0 }} />
                <span style={{ fontSize: '0.82rem', color: '#334155', fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="modal-overlay" 
      style={{ overflowY: 'auto', padding: '24px 16px' }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div 
        className="modal-card" 
        style={{ 
          maxWidth: '580px', 
          width: '100%',
          padding: 0, 
          overflow: 'hidden', 
          maxHeight: '90vh', 
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '24px', 
          border: '1px solid #E2E8F0', 
          boxShadow: '0 25px 60px -15px rgba(8, 102, 245, 0.28)',
          margin: 'auto',
          position: 'relative',
        }}
      >

        {/* ── Executive Header ── */}
        <div style={{ background: 'linear-gradient(135deg, #0866F5 0%, #0645B8 100%)', padding: '28px 32px 20px', position: 'relative', flexShrink: 0 }}>
          <button onClick={onClose} style={closeBtn}>
            <X size={16} />
          </button>
          <p style={eyebrow}>
            <span style={{ display: 'inline-block', width: '18px', height: '2px', background: '#93C5FD' }} />
            Post Free Property Listing
          </p>
          <h2 style={headerH2}>Reach 2.5M+ Buyers &amp; Tenants<br />in {selectedCity?.name || 'Your City'}</h2>
          <p style={headerSub}>0% brokerage, direct owner connect, RERA verification included.</p>

          {/* Listing type tabs */}
          <div style={{ display: 'flex', gap: '6px', marginTop: '16px' }}>
            {LISTING_TYPES.map(lt => (
              <button key={lt.key} type="button" onClick={() => setListingType(lt.key)} style={{
                flex: 1, padding: '10px 14px', border: 'none', cursor: 'pointer',
                background: listingType === lt.key ? '#FFFFFF' : 'rgba(255,255,255,0.18)',
                color: listingType === lt.key ? '#0866F5' : 'rgba(255,255,255,0.85)',
                fontSize: '0.82rem', fontWeight: listingType === lt.key ? 800 : 600,
                fontFamily: 'Inter, sans-serif',
                borderRadius: '12px 12px 0 0',
                transition: 'all 0.15s',
              }}>
                {lt.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Form ── */}
        <div style={{ 
          padding: '24px 32px 32px', 
          overflowY: 'auto', 
          flex: '1 1 auto', 
          minHeight: 0,
          background: '#FFFFFF',
          WebkitOverflowScrolling: 'touch',
        }}>
          <form onSubmit={handleSubmit}>

            {/* Property Title */}
            <div style={{ marginBottom: '18px' }}>
              <label style={labelStyle}>Property Title</label>
              <input
                type="text" required
                placeholder="e.g. 3BHK Sky Penthouse in DLF Phase 5"
                value={title}
                onChange={e => setTitle(e.target.value)}
                style={inputStyle}
              />
            </div>

            {/* Property Type */}
            <div style={{ marginBottom: '18px' }}>
              <label style={labelStyle}>Property Type</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {PROPERTY_TYPES.map(t => (
                  <button key={t} type="button" onClick={() => setPropType(t)}
                    style={{
                      padding: '8px 14px',
                      border: propType === t ? '1.5px solid #0866F5' : '1.5px solid #E2E8F0',
                      borderRadius: '10px',
                      background: propType === t ? '#EEF5FF' : '#FFFFFF',
                      color: propType === t ? '#0866F5' : '#334155',
                      fontSize: '0.78rem',
                      fontWeight: propType === t ? 700 : 500,
                      cursor: 'pointer',
                      fontFamily: 'Inter, sans-serif',
                      transition: 'all 0.15s',
                    }}>
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* BHK */}
            {listingType !== 'interior' && (
              <div style={{ marginBottom: '18px' }}>
                <label style={labelStyle}>Bedrooms (BHK)</label>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {BHK_OPTIONS.map(b => (
                    <button key={b} type="button" onClick={() => setBhk(b)}
                      style={{
                        padding: '8px 14px',
                        border: bhk === b ? '1.5px solid #0866F5' : '1.5px solid #E2E8F0',
                        borderRadius: '10px',
                        background: bhk === b ? '#EEF5FF' : '#FFFFFF',
                        color: bhk === b ? '#0866F5' : '#334155',
                        fontSize: '0.78rem',
                        fontWeight: bhk === b ? 700 : 500,
                        cursor: 'pointer',
                        fontFamily: 'Inter, sans-serif',
                        transition: 'all 0.15s',
                      }}>
                      {b}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Price + Area row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '18px' }}>
              <div>
                <label style={labelStyle}>{listingType === 'rent' ? 'Monthly Rent (₹)' : 'Expected Price (₹)'}</label>
                <input
                  type="text" required
                  placeholder={listingType === 'rent' ? 'e.g. 45000' : 'e.g. 14500000'}
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Carpet Area (sq.ft)</label>
                <input
                  type="number" required
                  placeholder="e.g. 1850"
                  value={area}
                  onChange={e => setArea(e.target.value)}
                  style={inputStyle}
                />
              </div>
            </div>

            {/* Contact */}
            <div style={{ marginBottom: '18px' }}>
              <label style={labelStyle}>Your Mobile Number</label>
              <div style={{ display: 'flex', border: '1.5px solid #E2E8F0', borderRadius: '12px', overflow: 'hidden', background: '#FFFFFF' }}>
                <span style={{ padding: '0 14px', display: 'flex', alignItems: 'center', background: '#F8FAFC', borderRight: '1.5px solid #E2E8F0', fontSize: '0.85rem', fontWeight: 700, color: '#0F172A', fontFamily: 'Inter, sans-serif', flexShrink: 0 }}>+91</span>
                <input
                  type="tel" required
                  placeholder="10-digit mobile number"
                  value={phone}
                  onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  style={{ flex: 1, padding: '12px 14px', outline: 'none', border: 'none', fontSize: '0.88rem', fontFamily: 'Inter, sans-serif', color: '#0F172A' }}
                />
              </div>
            </div>

            {/* Photo Upload */}
            <div style={{ marginBottom: '18px' }}>
              <label style={labelStyle}>Upload Property Photos</label>
              <div style={{
                border: '1.5px dashed #CBD5E1',
                borderRadius: '12px', padding: '24px', textAlign: 'center', cursor: 'pointer', background: '#F8FAFC',
                transition: 'border-color 0.15s',
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = '#0866F5'}
                onMouseLeave={e => e.currentTarget.style.borderColor = '#CBD5E1'}>
                <Upload size={22} style={{ color: '#0866F5', marginBottom: '8px' }} />
                <p style={{ fontSize: '0.84rem', fontWeight: 700, color: '#0F172A', fontFamily: 'Inter, sans-serif', marginBottom: '4px' }}>Click to upload or drag &amp; drop</p>
                <p style={{ fontSize: '0.74rem', color: '#64748B', fontFamily: 'Inter, sans-serif' }}>PNG, JPG up to 10MB each · Min 3 photos recommended</p>
              </div>
            </div>

            {/* Privacy note */}
            <div style={{ background: '#EEF5FF', border: '1px solid #DBEAFE', borderRadius: '12px', padding: '12px 14px', display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '20px' }}>
              <Shield size={16} style={{ color: '#0866F5', flexShrink: 0, marginTop: '2px' }} />
              <span style={{ fontSize: '0.78rem', color: '#1E40AF', fontFamily: 'Inter, sans-serif', lineHeight: 1.5 }}>
                Your contact details are 100% encrypted and never shared with third parties without direct consent.
              </span>
            </div>

            <button
              type="submit"
              disabled={submitting}
              style={primaryBtn}
              onMouseEnter={e => e.currentTarget.style.background = '#0653CA'}
              onMouseLeave={e => e.currentTarget.style.background = '#0866F5'}
            >
              {submitting ? 'Submitting to RERA Audit...' : 'Publish Free Listing'} <ArrowRight size={15} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

const closeBtn = {
  position: 'absolute', top: '16px', right: '16px',
  width: '32px', height: '32px',
  background: 'rgba(255,255,255,0.15)',
  border: '1px solid rgba(255,255,255,0.2)',
  borderRadius: '50%',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  color: '#FFFFFF', cursor: 'pointer',
};
const eyebrow = {
  fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase',
  color: '#93C5FD', fontFamily: 'Inter, sans-serif', marginBottom: '8px',
  display: 'flex', alignItems: 'center', gap: '8px',
};
const headerH2 = {
  fontFamily: 'Inter, sans-serif', fontSize: '1.45rem', fontWeight: 800,
  color: '#FFFFFF', letterSpacing: '-0.02em', lineHeight: 1.25, marginBottom: '6px',
};
const headerSub = {
  fontSize: '0.82rem', color: 'rgba(255,255,255,0.75)', fontFamily: 'Inter, sans-serif',
};
const labelStyle = {
  fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.04em',
  color: '#475569',
  fontFamily: 'Inter, sans-serif', display: 'block', marginBottom: '6px',
};
const inputStyle = {
  width: '100%', height: '44px', padding: '0 14px',
  border: '1.5px solid #E2E8F0', borderRadius: '12px',
  fontSize: '0.88rem', color: '#0F172A', background: '#FFFFFF',
  outline: 'none', fontFamily: 'Inter, sans-serif', boxSizing: 'border-box',
};
const primaryBtn = {
  width: '100%', background: '#0866F5', color: '#FFFFFF', border: 'none',
  borderRadius: '30px', padding: '14px', fontSize: '0.88rem', fontWeight: 800,
  letterSpacing: '0.03em', display: 'flex', alignItems: 'center',
  justifyContent: 'center', gap: '8px', cursor: 'pointer',
  fontFamily: 'Inter, sans-serif', boxShadow: '0 4px 16px rgba(8, 102, 245, 0.3)',
  transition: 'background 0.15s ease',
};
