import React from 'react';
import { CITIES } from '../data/mockData';
import { X, MapPin, Check, Sparkles } from 'lucide-react';

export default function CitySelectorModal({ selectedCity, onSelectCity, onClose }) {
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
          maxWidth: '480px',
          width: '100%',
          padding: '32px 32px 28px',
          borderRadius: '24px',
          background: '#FFFFFF',
          boxShadow: '0 25px 60px -15px rgba(11, 31, 68, 0.3)',
          border: '1px solid #E2E8F0',
          fontFamily: 'Inter, sans-serif',
          position: 'relative',
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: '#F1F5F9',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#64748B',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
          aria-label="Close modal"
        >
          <X size={16} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: '#EEF5FF',
            color: '#0866F5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
          }}>
            <MapPin size={20} color="#0866F5" />
          </div>
          <div>
            <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A', margin: 0, letterSpacing: '-0.02em' }}>
              Select Metro Region
            </h3>
          </div>
        </div>

        <p style={{ fontSize: '13px', color: '#64748B', marginBottom: '22px', lineHeight: 1.5 }}>
          Choose your city to browse physically verified properties, RERA civil contractors, modular designers & wholesale materials.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
          {CITIES.map((city) => {
            const isSelected = selectedCity?.id === city.id;
            return (
              <button 
                key={city.id}
                onClick={() => {
                  onSelectCity(city);
                  onClose();
                }}
                style={{
                  padding: '12px 14px',
                  borderRadius: '14px',
                  border: isSelected ? '1.5px solid #0866F5' : '1px solid #E2E8F0',
                  background: isSelected ? '#EEF5FF' : '#FFFFFF',
                  color: isSelected ? '#0866F5' : '#1E293B',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  textAlign: 'left',
                }}
                onMouseEnter={e => {
                  if (!isSelected) {
                    e.currentTarget.style.borderColor = '#0866F5';
                    e.currentTarget.style.background = '#F8FAFC';
                  }
                }}
                onMouseLeave={e => {
                  if (!isSelected) {
                    e.currentTarget.style.borderColor = '#E2E8F0';
                    e.currentTarget.style.background = '#FFFFFF';
                  }
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    fontSize: '11px',
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: isSelected ? '#0866F5' : '#F1F5F9',
                    color: isSelected ? '#FFFFFF' : '#475569',
                    letterSpacing: '0.04em',
                  }}>
                    {city.code}
                  </div>
                  <div>
                    <span style={{ fontSize: '13px', fontWeight: isSelected ? 800 : 600, display: 'block', color: isSelected ? '#0866F5' : '#0F172A' }}>
                      {city.name}
                    </span>
                    <span style={{ fontSize: '10px', color: '#94A3B8' }}>{city.region} Zone</span>
                  </div>
                </div>
                {isSelected && <Check size={16} color="#0866F5" strokeWidth={2.8} />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
