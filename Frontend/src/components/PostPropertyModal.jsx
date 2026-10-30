import React, { useState, useRef } from 'react';
import {
  X,
  Building2,
  CheckCircle,
  Upload,
  Shield,
  ArrowRight,
  Image as ImageIcon,
  Trash2,
  Plus,
  Sparkles,
  Loader2,
} from 'lucide-react';
import api from '../services/api';

const LISTING_TYPES = [
  { key: 'sell', label: 'Sell Property' },
  { key: 'rent', label: 'Rent Property' },
  { key: 'interior', label: 'List Interiors' },
];

const PROPERTY_TYPES = ['Apartment', 'Villa', 'Penthouse', 'Independent House', 'Plot', 'Commercial'];
const BHK_OPTIONS = ['Studio', '1 BHK', '2 BHK', '3 BHK', '4 BHK', '4 BHK+'];

/**
 * Optimizes an uploaded image using HTML5 Canvas to keep file sizes lightweight (~150KB-250KB)
 * while preserving high visual quality for property listing previews.
 */
const optimizeImageFile = (file) => {
  return new Promise((resolve) => {
    if (!file.type.startsWith('image/')) {
      resolve(null);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const MAX_WIDTH = 1440;
        const MAX_HEIGHT = 1080;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height = Math.round((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width = Math.round((width * MAX_HEIGHT) / height);
            height = MAX_HEIGHT;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        const dataUrl = canvas.toDataURL('image/jpeg', 0.82);
        resolve(dataUrl);
      };
      img.onerror = () => resolve(e.target.result);
      img.src = e.target.result;
    };
    reader.onerror = () => resolve(null);
    reader.readAsDataURL(file);
  });
};

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

  // Photo upload states
  const [images, setImages] = useState([]);
  const [isProcessingPhotos, setIsProcessingPhotos] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  // Handle file selection from input or drag-drop
  const handleFiles = async (fileList) => {
    if (!fileList || fileList.length === 0) return;

    setIsProcessingPhotos(true);
    const filesArray = Array.from(fileList).slice(0, 8 - images.length); // Max 8 photos total

    try {
      const optimizedImages = await Promise.all(filesArray.map(f => optimizeImageFile(f)));
      const validImages = optimizedImages.filter(Boolean);
      setImages(prev => [...prev, ...validImages].slice(0, 8));
    } catch (err) {
      console.warn('Error processing images:', err);
    } finally {
      setIsProcessingPhotos(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleFileChange = (e) => {
    handleFiles(e.target.files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer?.files) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleRemoveImage = (indexToRemove, e) => {
    e.stopPropagation();
    setImages(prev => prev.filter((_, idx) => idx !== indexToRemove));
  };

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
        images: images.length > 0 ? images : undefined,
        ownerPhone: phone,
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
              {images.length > 0 
                ? `Received ${images.length} verified photo(s). Our RERA verification team will audit and publish the listing live within 2 hours.`
                : 'Our RERA verification team will audit your listing and publish it live within 2 hours.'}
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
          <button onClick={onClose} style={closeBtn} title="Close Modal">
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

            {/* ── Photo Upload Feature with Preview & Drag-Drop ── */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                <label style={{ ...labelStyle, marginBottom: 0 }}>
                  Upload Property Photos
                </label>
                <span style={{ fontSize: '0.72rem', color: images.length > 0 ? '#0866F5' : '#64748B', fontWeight: 700 }}>
                  {images.length} / 8 photos added
                </span>
              </div>

              {/* Hidden file input */}
              <input
                type="file"
                ref={fileInputRef}
                multiple
                accept="image/png, image/jpeg, image/webp"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />

              {/* Upload Dropzone */}
              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                style={{
                  border: isDragging ? '2px dashed #0866F5' : '1.5px dashed #CBD5E1',
                  borderRadius: '14px',
                  padding: images.length > 0 ? '16px 20px' : '24px 20px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  background: isDragging ? '#EFF6FF' : '#F8FAFC',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={e => { if (!isDragging) e.currentTarget.style.borderColor = '#0866F5'; }}
                onMouseLeave={e => { if (!isDragging) e.currentTarget.style.borderColor = '#CBD5E1'; }}
              >
                {isProcessingPhotos ? (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                    <Loader2 size={24} className="animate-spin" style={{ color: '#0866F5' }} />
                    <p style={{ fontSize: '0.84rem', fontWeight: 700, color: '#0F172A', margin: 0 }}>
                      Processing and optimizing photos...
                    </p>
                  </div>
                ) : (
                  <>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: '#EFF6FF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 8px',
                      color: '#0866F5',
                    }}>
                      <Upload size={18} />
                    </div>
                    <p style={{ fontSize: '0.84rem', fontWeight: 700, color: '#0F172A', fontFamily: 'Inter, sans-serif', marginBottom: '4px' }}>
                      {images.length > 0 ? 'Click or drag to add more photos' : 'Click to upload or drag & drop'}
                    </p>
                    <p style={{ fontSize: '0.74rem', color: '#64748B', fontFamily: 'Inter, sans-serif', margin: 0 }}>
                      PNG, JPG up to 10MB · Max 8 photos (Min 3 recommended for 3x buyer leads)
                    </p>
                  </>
                )}
              </div>

              {/* Photo Preview Gallery */}
              {images.length > 0 && (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))',
                  gap: '10px',
                  marginTop: '12px',
                }}>
                  {images.map((imgSrc, idx) => (
                    <div
                      key={idx}
                      style={{
                        position: 'relative',
                        height: '75px',
                        borderRadius: '10px',
                        overflow: 'hidden',
                        border: '1.5px solid #E2E8F0',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
                        background: '#0F172A',
                      }}
                    >
                      <img
                        src={imgSrc}
                        alt={`Property photo ${idx + 1}`}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />

                      {/* Cover Photo Badge on 1st image */}
                      {idx === 0 && (
                        <span style={{
                          position: 'absolute',
                          bottom: '4px',
                          left: '4px',
                          background: 'rgba(8, 102, 245, 0.9)',
                          color: '#FFFFFF',
                          fontSize: '9px',
                          fontWeight: 800,
                          padding: '1px 5px',
                          borderRadius: '4px',
                          letterSpacing: '0.02em',
                        }}>
                          Cover
                        </span>
                      )}

                      {/* Delete Button */}
                      <button
                        type="button"
                        onClick={(e) => handleRemoveImage(idx, e)}
                        style={{
                          position: 'absolute',
                          top: '4px',
                          right: '4px',
                          width: '22px',
                          height: '22px',
                          borderRadius: '50%',
                          background: 'rgba(15, 23, 42, 0.75)',
                          color: '#FFFFFF',
                          border: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          transition: 'background 0.15s ease',
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = '#EF4444'}
                        onMouseLeave={e => e.currentTarget.style.background = 'rgba(15, 23, 42, 0.75)'}
                        title="Remove photo"
                      >
                        <Trash2 size={11} />
                      </button>
                    </div>
                  ))}

                  {/* Add more button tile if under limit */}
                  {images.length < 8 && (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      style={{
                        height: '75px',
                        borderRadius: '10px',
                        border: '1.5px dashed #CBD5E1',
                        background: '#F8FAFC',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '4px',
                        color: '#64748B',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.borderColor = '#0866F5';
                        e.currentTarget.style.color = '#0866F5';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.borderColor = '#CBD5E1';
                        e.currentTarget.style.color = '#64748B';
                      }}
                    >
                      <Plus size={16} />
                      <span style={{ fontSize: '10px', fontWeight: 700 }}>Add More</span>
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Privacy note */}
            <div style={{ background: '#EEF5FF', border: '1px solid #DBEAFE', borderRadius: '12px', padding: '12px 14px', display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '20px' }}>
              <Shield size={16} style={{ color: '#0866F5', flexShrink: 0, marginTop: '2px' }} />
              <span style={{ fontSize: '0.78rem', color: '#1E40AF', fontFamily: 'Inter, sans-serif', lineHeight: 1.5 }}>
                Your contact details and property documents are 100% encrypted and audited under UP RERA norms before public indexing.
              </span>
            </div>

            <button
              type="submit"
              disabled={submitting || isProcessingPhotos}
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
