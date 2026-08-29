import React, { useState } from 'react';
import { X, Building2, CheckCircle, Upload, Shield, ArrowRight } from 'lucide-react';

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(onClose, 3000);
  };

  if (submitted) {
    return (
      <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
        <div className="modal-card" style={{ maxWidth: '480px', padding: 0, overflow: 'hidden' }}>
          <div style={{ background: '#0B192C', padding: '48px 40px', textAlign: 'center' }}>
            <div style={{ width: '56px', height: '56px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <CheckCircle size={26} color="white" />
            </div>
            <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: '1.4rem', fontWeight: 800, color: 'white', letterSpacing: '-0.02em', marginBottom: '8px' }}>Listing Submitted!</h2>
            <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', fontFamily: 'Manrope, sans-serif', lineHeight: 1.6 }}>
              Our RERA verification team will audit your photos and publish the listing live within 2 hours.
            </p>
          </div>
          <div style={{ padding: '24px 40px', background: '#F8F7F4', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {['Listing verification — 2 hours', 'Go-live notification via SMS/WhatsApp', 'Buyer enquiries straight to your inbox'].map(t => (
              <div key={t} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle size={13} style={{ color: '#0B192C', flexShrink: 0 }} />
                <span style={{ fontSize: '0.8rem', color: '#444', fontFamily: 'Manrope, sans-serif' }}>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-card" style={{ maxWidth: '580px', padding: 0, overflow: 'hidden', maxHeight: '92vh' }}>

        {/* ── Dark header ── */}
        <div style={{ background: '#0B192C', padding: '32px 36px 26px', position: 'relative', flexShrink: 0 }}>
          <button onClick={onClose} style={closeBtn}>
            <X size={15} />
          </button>
          <p style={eyebrow}>
            <span style={{ display: 'inline-block', width: '18px', height: '1.5px', background: 'rgba(255,255,255,0.3)' }} />
            Post Free Property Listing
          </p>
          <h2 style={headerH2}>Reach 2.5M+ Buyers &amp; Tenants<br />in {selectedCity?.name || 'Your City'}</h2>
          <p style={headerSub}>0% brokerage, direct owner connect, RERA verification included.</p>

          {/* Listing type tabs */}
          <div style={{ display: 'flex', gap: '2px', marginTop: '20px' }}>
            {LISTING_TYPES.map(lt => (
              <button key={lt.key} type="button" onClick={() => setListingType(lt.key)} style={{
                flex: 1, padding: '9px 12px', border: 'none', cursor: 'pointer',
                background: listingType === lt.key ? 'white' : 'rgba(255,255,255,0.07)',
                color: listingType === lt.key ? '#0B192C' : 'rgba(255,255,255,0.5)',
                fontSize: '0.78rem', fontWeight: listingType === lt.key ? 700 : 400,
                fontFamily: 'Manrope, sans-serif',
                borderRadius: '2px 2px 0 0',
                transition: 'all 0.15s',
              }}>
                {lt.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Form ── */}
        <div style={{ padding: '28px 36px 32px', overflowY: 'auto', flex: 1 }}>
          <form onSubmit={handleSubmit}>

            {/* Property Title */}
            <div style={{ marginBottom: '18px' }}>
              <label style={labelStyle}>Property Title</label>
              <input
                type="text" required
                placeholder="e.g. 3BHK Sky Penthouse in DLF Phase 5"
                style={inputStyle}
              />
            </div>

            {/* Property Type */}
            <div style={{ marginBottom: '18px' }}>
              <label style={labelStyle}>Property Type</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                {PROPERTY_TYPES.map(t => (
                  <button key={t} type="button" onClick={() => setPropType(t)}
                    style={{ padding: '8px 14px', border: propType === t ? '1.5px solid #0B192C' : '1.5px solid #E4E1DA', borderRadius: '2px', background: propType === t ? '#0B192C' : 'white', color: propType === t ? 'white' : '#444', fontSize: '0.76rem', fontWeight: propType === t ? 700 : 400, cursor: 'pointer', fontFamily: 'Manrope, sans-serif', transition: 'all 0.15s' }}>
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* BHK */}
            {listingType !== 'interior' && (
              <div style={{ marginBottom: '18px' }}>
                <label style={labelStyle}>Bedrooms (BHK)</label>
                <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                  {BHK_OPTIONS.map(b => (
                    <button key={b} type="button" onClick={() => setBhk(b)}
                      style={{ padding: '8px 14px', border: bhk === b ? '1.5px solid #0B192C' : '1.5px solid #E4E1DA', borderRadius: '2px', background: bhk === b ? '#0B192C' : 'white', color: bhk === b ? 'white' : '#444', fontSize: '0.76rem', fontWeight: bhk === b ? 700 : 400, cursor: 'pointer', fontFamily: 'Manrope, sans-serif', transition: 'all 0.15s' }}>
                      {b}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Price + Area row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '18px' }}>
              <div>
                <label style={labelStyle}>{listingType === 'rent' ? 'Monthly Rent (₹)' : 'Expected Price (₹)'}</label>
                <input type="text" required placeholder={listingType === 'rent' ? 'e.g. 45,000 / month' : 'e.g. 1.25 Cr'} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Carpet Area (sq.ft)</label>
                <input type="number" required placeholder="e.g. 1850" style={inputStyle} />
              </div>
            </div>

            {/* Contact */}
            <div style={{ marginBottom: '18px' }}>
              <label style={labelStyle}>Your Mobile Number</label>
              <div style={{ display: 'flex', border: '1.5px solid #E4E1DA', borderRadius: '2px', overflow: 'hidden', background: 'white' }}>
                <span style={{ padding: '0 14px', display: 'flex', alignItems: 'center', background: '#F8F7F4', borderRight: '1.5px solid #E4E1DA', fontSize: '0.82rem', fontWeight: 700, color: '#0B192C', fontFamily: 'Manrope, sans-serif', flexShrink: 0 }}>+91</span>
                <input type="tel" required placeholder="10-digit mobile number" style={{ flex: 1, padding: '11px 14px', outline: 'none', border: 'none', fontSize: '0.88rem', fontFamily: 'Manrope, sans-serif', color: '#0B192C' }} />
              </div>
            </div>

            {/* Photo Upload */}
            <div style={{ marginBottom: '18px' }}>
              <label style={labelStyle}>Upload Property Photos</label>
              <div style={{
                border: '1.5px dashed #C8C2B8',
                borderRadius: '2px', padding: '24px', textAlign: 'center', cursor: 'pointer', background: '#F8F7F4',
                transition: 'border-color 0.15s',
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = '#0B192C'}
                onMouseLeave={e => e.currentTarget.style.borderColor = '#C8C2B8'}>
                <Upload size={22} style={{ color: '#9CA3AF', marginBottom: '8px' }} />
                <p style={{ fontSize: '0.82rem', fontWeight: 600, color: '#444', fontFamily: 'Manrope, sans-serif', marginBottom: '4px' }}>Click to upload or drag &amp; drop</p>
                <p style={{ fontSize: '0.72rem', color: '#9CA3AF', fontFamily: 'Manrope, sans-serif' }}>PNG, JPG up to 10MB each · Min 3 photos recommended</p>
              </div>
            </div>

            {/* Privacy note */}
            <div style={{ background: '#F8F7F4', border: '1px solid #E4E1DA', borderRadius: '2px', padding: '12px 14px', display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '20px' }}>
              <Shield size={15} style={{ color: '#0B192C', flexShrink: 0, marginTop: '1px' }} />
              <span style={{ fontSize: '0.76rem', color: '#6B6B6B', fontFamily: 'Manrope, sans-serif', lineHeight: 1.5 }}>
                Your contact details are 100% encrypted and never shared with third parties without consent.
              </span>
            </div>

            <button type="submit" style={primaryBtn}>
              Publish Free Listing <ArrowRight size={14} />
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
  background: 'rgba(255,255,255,0.1)',
  border: '1px solid rgba(255,255,255,0.15)',
  borderRadius: '2px',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  color: 'rgba(255,255,255,0.6)', cursor: 'pointer',
};
const eyebrow = {
  fontSize: '0.62rem', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.4)', fontFamily: 'Manrope, sans-serif', marginBottom: '10px',
  display: 'flex', alignItems: 'center', gap: '8px',
};
const headerH2 = {
  fontFamily: 'Manrope, sans-serif', fontSize: '1.45rem', fontWeight: 800,
  color: 'white', letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: '6px',
};
const headerSub = {
  fontSize: '0.8rem', color: 'rgba(255,255,255,0.55)', fontFamily: 'Manrope, sans-serif',
};
const labelStyle = {
  fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.1em',
  textTransform: 'uppercase', color: '#6B6B6B',
  fontFamily: 'Manrope, sans-serif', display: 'block', marginBottom: '8px',
};
const inputStyle = {
  width: '100%', height: '42px', padding: '0 14px',
  border: '1.5px solid #E4E1DA', borderRadius: '2px',
  fontSize: '0.88rem', color: '#2C2C2C', background: 'white',
  outline: 'none', fontFamily: 'Manrope, sans-serif', boxSizing: 'border-box',
};
const primaryBtn = {
  width: '100%', background: '#0B192C', color: 'white', border: 'none',
  borderRadius: '2px', padding: '14px', fontSize: '0.82rem', fontWeight: 800,
  letterSpacing: '0.05em', display: 'flex', alignItems: 'center',
  justifyContent: 'center', gap: '8px', cursor: 'pointer',
  fontFamily: 'Manrope, sans-serif',
};
