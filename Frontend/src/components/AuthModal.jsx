import React, { useState } from 'react';
import { X, ArrowRight, CheckCircle, Smartphone } from 'lucide-react';
import { useGoogleLogin } from '@react-oauth/google';
import api from '../services/api';

export default function AuthModal({ onClose, onLogin }) {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isGoogleAuth, setIsGoogleAuth] = useState(false);
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [personalization, setPersonalization] = useState({
    name: '',
    lookingFor: 'Buy',
  });

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setLoading(true);
        const res = await api.googleSignIn(tokenResponse.access_token);
        if (res.data?.token) {
          localStorage.setItem('rr_token', res.data.token);
          localStorage.setItem('rr_user', JSON.stringify(res.data.user));
          onLogin(res.data.user);
          setStep(4);
          setTimeout(onClose, 1800);
        } else {
          setUserData({ googleToken: tokenResponse.access_token });
          setIsGoogleAuth(true);
          setStep(1.5);
        }
      } catch (err) {
        setUserData({ googleToken: tokenResponse.access_token });
        setIsGoogleAuth(true);
        setStep(1.5);
      } finally {
        setLoading(false);
      }
    },
    onError: () => {
      setErrorMsg('Google login was interrupted or failed.');
    },
  });

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    if (phone.length >= 10) {
      setLoading(true);
      setErrorMsg('');
      try {
        const res = await api.sendOtp(phone);
        // Pre-fill dev OTP if returned or default 1234
        const devCode = res.data?.devOtp || '1234';
        setOtp(devCode.slice(0, 4).split(''));
        setStep(2);
      } catch (err) {
        // Fallback to local dev code
        setOtp(['1', '2', '3', '4']);
        setStep(2);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleOtpChange = (val, idx) => {
    const next = [...otp];
    next[idx] = val;
    setOtp(next);
    if (val && idx < 3) {
      document.getElementById(`otp-${idx + 1}`)?.focus();
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    const fullOtp = otp.join('');

    try {
      const res = await api.verifyOtp(phone, fullOtp);
      const user = res.data?.user || { phone, name: 'User' };
      const token = res.data?.token;

      if (token) {
        localStorage.setItem('rr_token', token);
        localStorage.setItem('rr_user', JSON.stringify(user));
      }

      setUserData(user);
      setStep(3);
    } catch (err) {
      setErrorMsg(err.message || 'Invalid verification code. Use 1234.');
    } finally {
      setLoading(false);
    }
  };

  const handleFinish = async (skipped = false) => {
    setLoading(true);
    const finalName = skipped ? userData.name || 'User' : personalization.name || userData.name || 'User';

    try {
      if (!skipped && personalization.name) {
        await api.updateProfile({ name: finalName });
      }
    } catch (e) {
      // Continue even if profile update warning
    }

    const finalUser = {
      ...userData,
      phone: isGoogleAuth ? userData.phone || phone : phone,
      name: finalName,
      lookingFor: skipped ? 'Not specified' : personalization.lookingFor,
    };

    localStorage.setItem('rr_user', JSON.stringify(finalUser));
    onLogin(finalUser);
    setStep(4);
    setTimeout(onClose, 1800);
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-card" style={{ maxWidth: '440px', padding: 0, overflow: 'hidden', borderRadius: '24px' }}>
        {/* Dark header band */}
        <div
          style={{
            background: 'var(--rr-navy)',
            padding: '36px 40px 28px',
            position: 'relative',
          }}
        >
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              width: '32px',
              height: '32px',
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'rgba(255,255,255,0.8)',
              cursor: 'pointer',
            }}
          >
            <X size={15} />
          </button>

          <p
            style={{
              fontSize: '0.62rem',
              fontWeight: 800,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.4)',
              fontFamily: 'var(--font-body)',
              marginBottom: '10px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span
              style={{
                display: 'inline-block',
                width: '18px',
                height: '1.5px',
                background: 'rgba(255,255,255,0.3)',
              }}
            />
            Roof Ridge — Member Portal
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.5rem',
              fontWeight: 800,
              color: 'white',
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
              marginBottom: '6px',
            }}
          >
            {step === 1 && 'Sign In or Create Account'}
            {step === 1.5 && 'Link Mobile Number'}
            {step === 2 && 'Verify Your Mobile'}
            {step === 3 && 'Personalize Experience'}
            {step === 4 && 'Welcome to Roof Ridge!'}
          </h2>
          <p
            style={{
              fontSize: '0.82rem',
              color: 'rgba(255,255,255,0.55)',
              fontFamily: 'var(--font-body)',
            }}
          >
            {step === 1 && 'Personalize your experience, login now.'}
            {step === 1.5 && 'Mobile number is mandatory to continue.'}
            {step === 2 && `OTP sent to +91 ${phone}. Use master OTP (1234).`}
            {step === 3 && 'Help us understand what you are looking for.'}
            {step === 4 && 'Your account is ready. Redirecting you now…'}
          </p>
        </div>

        {/* Form body */}
        <div style={{ padding: '32px 40px 36px' }}>
          {errorMsg && (
            <div
              style={{
                padding: '10px 14px',
                borderRadius: '4px',
                background: '#FEF2F2',
                border: '1px solid #FECACA',
                color: '#B91C1C',
                fontSize: '0.78rem',
                marginBottom: '16px',
              }}
            >
              {errorMsg}
            </div>
          )}

          {(step === 1 || step === 1.5) && (
            <form onSubmit={handlePhoneSubmit}>
              <label style={labelStyle}>Mobile Number</label>
              <div
                style={{
                  display: 'flex',
                  border: '1.5px solid #E2E8F0',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  marginBottom: '16px',
                  background: 'white',
                }}
              >
                <span
                  style={{
                    padding: '0 14px',
                    display: 'flex',
                    alignItems: 'center',
                    background: '#F8FAFC',
                    borderRight: '1.5px solid #E2E8F0',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    color: 'var(--rr-navy)',
                    fontFamily: 'var(--font-body)',
                    flexShrink: 0,
                  }}
                >
                  +91
                </span>
                <input
                  type="tel"
                  required
                  placeholder="Enter 10-digit mobile number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  style={{
                    flex: 1,
                    padding: '13px 14px',
                    outline: 'none',
                    border: 'none',
                    fontSize: '0.9rem',
                    fontFamily: 'var(--font-body)',
                    color: 'var(--rr-charcoal)',
                    background: 'white',
                  }}
                />
              </div>

              {step === 1 && (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    marginBottom: '20px',
                  }}
                >
                  {[
                    '0% brokerage — verified owner listings',
                    'Instant property alerts for your budget',
                    'Track loan application & legal docs',
                  ].map((t) => (
                    <div key={t} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <CheckCircle
                        size={13}
                        style={{ color: 'var(--rr-primary)', flexShrink: 0 }}
                      />
                      <span
                        style={{
                          fontSize: '0.78rem',
                          color: 'var(--rr-text-muted)',
                          fontFamily: 'var(--font-body)',
                        }}
                      >
                        {t}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <button type="submit" disabled={loading} style={primaryBtn}>
                {loading
                  ? 'Connecting...'
                  : step === 1.5
                  ? 'Verify Number'
                  : 'Send OTP'}{' '}
                <ArrowRight size={14} />
              </button>

              {step === 1 && (
                <>
                  <p
                    style={{
                      fontSize: '0.7rem',
                      color: 'var(--rr-text-faint)',
                      textAlign: 'center',
                      marginTop: '12px',
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    By continuing you agree to our Terms of Service & Privacy Policy
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', margin: '24px 0 16px' }}>
                    <div style={{ flex: 1, height: '1px', background: 'var(--rr-border)' }}></div>
                    <span
                      style={{
                        padding: '0 12px',
                        fontSize: '0.75rem',
                        color: 'var(--rr-text-muted)',
                        fontFamily: 'var(--font-body)',
                        fontWeight: 600,
                      }}
                    >
                      OR
                    </span>
                    <div style={{ flex: 1, height: '1px', background: 'var(--rr-border)' }}></div>
                  </div>

                  <button
                    type="button"
                    onClick={() => googleLogin()}
                    style={{
                      width: '100%',
                      background: 'white',
                      color: 'var(--rr-navy)',
                      border: '1.5px solid #E2E8F0',
                      borderRadius: '30px',
                      padding: '12px',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px',
                      cursor: 'pointer',
                      fontFamily: 'var(--font-body)',
                      transition: 'all 0.2s',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                    }}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M22.56 12.25C22.56 11.47 22.49 10.72 22.37 10H12V14.26H17.92C17.66 15.63 16.88 16.8 15.71 17.58V20.34H19.27C21.36 18.42 22.56 15.6 22.56 12.25Z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23C14.97 23 17.46 22.02 19.27 20.34L15.71 17.58C14.73 18.24 13.48 18.64 12 18.64C9.13 18.64 6.7 16.7 5.84 14.09H2.17V16.94C3.98 20.53 7.7 23 12 23Z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09C5.62 13.43 5.5 12.73 5.5 12C5.5 11.27 5.62 10.57 5.84 9.91V7.06H2.17C1.43 8.55 1 10.22 1 12C1 13.78 1.43 15.45 2.17 16.94L5.84 14.09Z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.36C13.62 5.36 15.07 5.92 16.21 7.01L19.34 3.88C17.46 2.13 14.97 1 12 1C7.7 1 3.98 3.47 2.17 7.06L5.84 9.91C6.7 7.3 9.13 5.36 12 5.36Z"
                        fill="#EA4335"
                      />
                    </svg>
                    Continue with Google
                  </button>
                </>
              )}
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleOtpSubmit}>
              <label style={labelStyle}>Enter 4-Digit OTP</label>
              <div
                style={{
                  display: 'flex',
                  gap: '10px',
                  marginBottom: '20px',
                  justifyContent: 'center',
                }}
              >
                {[0, 1, 2, 3].map((idx) => (
                  <input
                    key={idx}
                    id={`otp-${idx}`}
                    type="text"
                    maxLength={1}
                    value={otp[idx]}
                    onChange={(e) => handleOtpChange(e.target.value, idx)}
                    style={{
                      width: '60px',
                      height: '60px',
                      textAlign: 'center',
                      fontSize: '1.4rem',
                      fontWeight: 800,
                      border: otp[idx]
                        ? '2px solid var(--rr-primary)'
                        : '1.5px solid #E2E8F0',
                      borderRadius: '12px',
                      outline: 'none',
                      color: 'var(--rr-navy)',
                      fontFamily: 'var(--font-body)',
                      background: otp[idx] ? 'var(--rr-light-blue)' : 'white',
                      transition: 'all 0.15s',
                    }}
                  />
                ))}
              </div>

              <button type="submit" disabled={loading} style={primaryBtn}>
                {loading ? 'Verifying...' : 'Verify OTP'} <ArrowRight size={14} />
              </button>
              <button
                type="button"
                onClick={() => setStep(1)}
                style={{
                  width: '100%',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '0.78rem',
                  color: 'var(--rr-text-faint)',
                  fontFamily: 'var(--font-body)',
                  marginTop: '10px',
                  textDecoration: 'underline',
                }}
              >
                Change mobile number
              </button>
            </form>
          )}

          {step === 3 && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleFinish(false);
              }}
            >
              <label style={labelStyle}>What should we call you?</label>
              <input
                type="text"
                required
                placeholder="Your Full Name"
                value={personalization.name}
                onChange={(e) =>
                  setPersonalization({ ...personalization, name: e.target.value })
                }
                style={{
                  width: '100%',
                  padding: '13px 14px',
                  outline: 'none',
                  border: '1.5px solid #E2E8F0',
                  borderRadius: '12px',
                  fontSize: '0.9rem',
                  fontFamily: 'var(--font-body)',
                  color: 'var(--rr-charcoal)',
                  marginBottom: '16px',
                }}
              />

              <label style={labelStyle}>What are you looking for?</label>
              <select
                value={personalization.lookingFor}
                onChange={(e) =>
                  setPersonalization({ ...personalization, lookingFor: e.target.value })
                }
                style={{
                  width: '100%',
                  padding: '13px 14px',
                  outline: 'none',
                  border: '1.5px solid #E2E8F0',
                  borderRadius: '12px',
                  fontSize: '0.9rem',
                  fontFamily: 'var(--font-body)',
                  color: 'var(--rr-charcoal)',
                  marginBottom: '24px',
                }}
              >
                <option value="Buy">Buy a Property</option>
                <option value="Rent">Rent a Property</option>
                <option value="Interiors">Home Interiors</option>
                <option value="Construction">Construction Services</option>
              </select>

              <button type="submit" disabled={loading} style={primaryBtn}>
                {loading ? 'Saving...' : 'Finish Setup'} <ArrowRight size={14} />
              </button>
              <button
                type="button"
                onClick={() => handleFinish(true)}
                style={{
                  width: '100%',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '0.78rem',
                  color: 'var(--rr-text-muted)',
                  fontFamily: 'var(--font-body)',
                  marginTop: '14px',
                }}
              >
                Skip Personalization
              </button>
            </form>
          )}

          {step === 4 && (
            <div style={{ textAlign: 'center', padding: '12px 0' }}>
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  background: 'var(--rr-primary)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                  boxShadow: '0 8px 24px rgba(8, 102, 245, 0.3)',
                }}
              >
                <CheckCircle size={26} color="white" />
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1.1rem',
                  fontWeight: 800,
                  color: 'var(--rr-navy)',
                  marginBottom: '6px',
                }}
              >
                Signed In Successfully
              </h3>
              <p
                style={{
                  fontSize: '0.82rem',
                  color: 'var(--rr-text-muted)',
                  fontFamily: 'var(--font-body)',
                }}
              >
                Welcome to your Roof Ridge portal. Closing…
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const labelStyle = {
  fontSize: '0.65rem',
  fontWeight: 800,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: 'var(--rr-text-muted)',
  fontFamily: 'var(--font-body)',
  display: 'block',
  marginBottom: '8px',
};
const primaryBtn = {
  width: '100%',
  background: 'linear-gradient(135deg, #0866F5 0%, #0653CA 100%)',
  color: 'white',
  border: 'none',
  borderRadius: '30px',
  padding: '14px',
  fontSize: '0.85rem',
  fontWeight: 800,
  letterSpacing: '0.05em',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  cursor: 'pointer',
  fontFamily: 'var(--font-body)',
  boxShadow: '0 8px 24px rgba(8, 102, 245, 0.28)',
  transition: 'transform 0.2s, box-shadow 0.2s',
};
