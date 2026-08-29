import React, { useState } from 'react';
import { X, ArrowRight, CheckCircle, Smartphone } from 'lucide-react';

export default function AuthModal({ onClose }) {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    if (phone.length >= 10) setStep(2);
  };

  const handleOtpChange = (val, idx) => {
    const next = [...otp];
    next[idx] = val;
    setOtp(next);
    if (val && idx < 3) {
      document.getElementById(`otp-${idx + 1}`)?.focus();
    }
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    setStep(3);
    setTimeout(onClose, 2200);
  };

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-card" style={{ maxWidth: '440px', padding: 0, overflow: 'hidden' }}>

        {/* ── Dark header band ── */}
        <div style={{
          background: '#0B192C',
          padding: '36px 40px 28px',
          position: 'relative',
        }}>
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

          <p style={{ fontSize: '0.62rem', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', fontFamily: 'Manrope, sans-serif', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ display: 'inline-block', width: '18px', height: '1.5px', background: 'rgba(255,255,255,0.3)' }} />
            Roof Ridge — Member Portal
          </p>
          <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: '1.5rem', fontWeight: 800, color: 'white', letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: '6px' }}>
            {step === 1 && 'Sign In or Create Account'}
            {step === 2 && 'Verify Your Mobile'}
            {step === 3 && 'Welcome to Roof Ridge!'}
          </h2>
          <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.55)', fontFamily: 'Manrope, sans-serif' }}>
            {step === 1 && 'Enter your mobile number to continue — no password needed.'}
            {step === 2 && `OTP sent to +91 ${phone}. Check your messages.`}
            {step === 3 && 'Your account is ready. Redirecting you now…'}
          </p>
        </div>

        {/* ── Form body ── */}
        <div style={{ padding: '32px 40px 36px' }}>

          {step === 1 && (
            <form onSubmit={handlePhoneSubmit}>
              <label style={labelStyle}>Mobile Number</label>
              <div style={{ display: 'flex', border: '1.5px solid #E4E1DA', borderRadius: '2px', overflow: 'hidden', marginBottom: '16px', background: 'white' }}>
                <span style={{ padding: '0 14px', display: 'flex', alignItems: 'center', background: '#F8F7F4', borderRight: '1.5px solid #E4E1DA', fontSize: '0.82rem', fontWeight: 700, color: '#0B192C', fontFamily: 'Manrope, sans-serif', flexShrink: 0 }}>+91</span>
                <input
                  type="tel"
                  required
                  placeholder="Enter 10-digit mobile number"
                  value={phone}
                  onChange={e => setPhone(e.target.value.replace(/\D/, '').slice(0, 10))}
                  style={{ flex: 1, padding: '13px 14px', outline: 'none', border: 'none', fontSize: '0.9rem', fontFamily: 'Manrope, sans-serif', color: '#0B192C', background: 'white' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
                {['0% brokerage — verified owner listings', 'Instant property alerts for your budget', 'Track loan application & legal docs'].map(t => (
                  <div key={t} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle size={13} style={{ color: '#0B192C', flexShrink: 0 }} />
                    <span style={{ fontSize: '0.78rem', color: '#6B6B6B', fontFamily: 'Manrope, sans-serif' }}>{t}</span>
                  </div>
                ))}
              </div>

              <button type="submit" style={primaryBtn}>
                Send OTP <ArrowRight size={14} />
              </button>
              <p style={{ fontSize: '0.7rem', color: '#9CA3AF', textAlign: 'center', marginTop: '12px', fontFamily: 'Manrope, sans-serif' }}>
                By continuing you agree to our Terms of Service & Privacy Policy
              </p>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleOtpSubmit}>
              <label style={labelStyle}>Enter 4-Digit OTP</label>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', justifyContent: 'center' }}>
                {[0, 1, 2, 3].map(idx => (
                  <input
                    key={idx}
                    id={`otp-${idx}`}
                    type="text"
                    maxLength={1}
                    value={otp[idx]}
                    onChange={e => handleOtpChange(e.target.value, idx)}
                    style={{
                      width: '60px', height: '60px',
                      textAlign: 'center',
                      fontSize: '1.4rem', fontWeight: 800,
                      border: otp[idx] ? '2px solid #0B192C' : '1.5px solid #E4E1DA',
                      borderRadius: '2px',
                      outline: 'none',
                      color: '#0B192C',
                      fontFamily: 'Manrope, sans-serif',
                      background: otp[idx] ? '#F8F7F4' : 'white',
                      transition: 'all 0.15s',
                    }}
                  />
                ))}
              </div>

              <button type="submit" style={primaryBtn}>
                Verify &amp; Sign In <ArrowRight size={14} />
              </button>
              <button type="button" onClick={() => setStep(1)}
                style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.78rem', color: '#9CA3AF', fontFamily: 'Manrope, sans-serif', marginTop: '10px', textDecoration: 'underline' }}>
                Change mobile number
              </button>
            </form>
          )}

          {step === 3 && (
            <div style={{ textAlign: 'center', padding: '12px 0' }}>
              <div style={{ width: '56px', height: '56px', background: '#0B192C', borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <CheckCircle size={26} color="white" />
              </div>
              <h3 style={{ fontFamily: 'Manrope, sans-serif', fontSize: '1.1rem', fontWeight: 800, color: '#0B192C', marginBottom: '6px' }}>Signed In Successfully</h3>
              <p style={{ fontSize: '0.82rem', color: '#6B6B6B', fontFamily: 'Manrope, sans-serif' }}>Welcome to your Roof Ridge portal. Closing…</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

const labelStyle = {
  fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.1em',
  textTransform: 'uppercase', color: '#6B6B6B',
  fontFamily: 'Manrope, sans-serif', display: 'block', marginBottom: '8px',
};
const primaryBtn = {
  width: '100%', background: '#0B192C', color: 'white', border: 'none',
  borderRadius: '2px', padding: '14px', fontSize: '0.82rem', fontWeight: 800,
  letterSpacing: '0.05em', display: 'flex', alignItems: 'center',
  justifyContent: 'center', gap: '8px', cursor: 'pointer',
  fontFamily: 'Manrope, sans-serif', transition: 'background 0.2s',
};
