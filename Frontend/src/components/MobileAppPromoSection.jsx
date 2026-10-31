import React from 'react';
import { Smartphone, CheckCircle2, Star, QrCode, Bell, MessageSquare, Camera, Search } from 'lucide-react';
import { useResponsive } from '../hooks/useResponsive';

export default function MobileAppPromoSection() {
  const { isMobile, isTablet } = useResponsive();
  const isStack = isMobile || isTablet;

  return (
    <section style={{
      padding: isMobile ? '40px 0' : '72px 0',
      background: 'linear-gradient(180deg, #F8FAFD 0%, #EEF5FF 50%, #E6F0FA 100%)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: isMobile ? '0 16px' : '0 28px' }}>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: isStack ? '1fr' : 'repeat(12, 1fr)',
          gap: isMobile ? '32px' : '48px',
          alignItems: 'center',
        }}>
          
          {/* Left Text & Interactive Features */}
          <div style={{ gridColumn: isStack ? 'auto' : 'span 7' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: '#FFFFFF',
              border: '1px solid #E5EBF4',
              borderRadius: '20px',
              padding: '6px 14px',
              fontSize: '0.76rem',
              fontWeight: 800,
              color: '#0866F5',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '16px',
              boxShadow: '0 2px 8px rgba(8, 102, 245, 0.08)',
            }}>
              <Smartphone size={14} /> ROOFRIDGE MOBILE APP
            </div>

            <h2 style={{
              fontSize: 'clamp(2.1rem, 3.4vw, 3rem)',
              fontWeight: 800,
              color: '#0F172A',
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
              margin: '0 0 16px 0',
            }}>
              Homes. Spaces. People.<br />Possibilities in Your Pocket.
            </h2>

            <p style={{
              fontSize: '1.02rem',
              color: '#64748B',
              lineHeight: 1.65,
              margin: '0 0 32px 0',
              maxWidth: '580px',
            }}>
              Search 50,000+ verified listings in Mumbai, schedule instant site visits, track home loan disbursals and monitor 3D interior progress with daily site photos.
            </p>

            {/* 3 Interactive Feature Highlights */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '14px',
              marginBottom: '36px',
            }}>
              <div style={{
                background: '#FFFFFF',
                borderRadius: '16px',
                padding: '14px 18px',
                border: '1px solid #E5EBF4',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                boxShadow: '0 4px 12px rgba(11, 31, 68, 0.03)',
              }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: '#EEF5FF',
                  color: '#0866F5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <Bell size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '0.84rem', fontWeight: 800, color: '#0F172A' }}>Price Drop Radar</div>
                  <div style={{ fontSize: '0.72rem', color: '#64748B' }}>Instant RERA drop alerts</div>
                </div>
              </div>

              <div style={{
                background: '#FFFFFF',
                borderRadius: '16px',
                padding: '14px 18px',
                border: '1px solid #E5EBF4',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                boxShadow: '0 4px 12px rgba(8, 102, 245, 0.04)',
              }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: '#ECFDF5',
                  color: '#059669',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <MessageSquare size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '0.84rem', fontWeight: 800, color: '#0F172A' }}>0% Brokerage Chat</div>
                  <div style={{ fontSize: '0.72rem', color: '#64748B' }}>Direct WhatsApp with owner</div>
                </div>
              </div>
            </div>

            {/* App Store / Google Play Buttons & QR Scan */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              flexWrap: 'wrap',
            }}>
              {/* Apple Store */}
              <a
                href="#download"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  background: '#0866F5',
                  color: '#FFFFFF',
                  padding: '12px 22px',
                  borderRadius: '14px',
                  textDecoration: 'none',
                  boxShadow: '0 8px 24px rgba(8, 102, 245, 0.28)',
                  transition: 'all 0.18s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.background = '#0653CA';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.background = '#0866F5';
                }}
              >
                <svg width="22" height="26" viewBox="0 0 170 170" fill="white">
                  <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.69-7.85-12-14.42-6-9.13-10.7-19.53-14.09-31.21-3.39-11.69-5.08-22.9-5.08-33.64 0-14.65 3.65-26.68 10.95-36.08 7.3-9.4 16.42-14.24 27.35-14.52 4.48 0 9.42 1.15 14.81 3.46 5.4 2.3 9.42 3.51 12.06 3.61 2.22 0 6.45-1.28 12.69-3.83 6.24-2.55 11.45-3.66 15.63-3.35 14.4.92 25.4 6.34 33.01 16.27-12.74 7.73-18.99 18.25-18.77 31.56.22 10.22 4.19 18.76 11.91 25.61 7.72 6.85 17.15 10.88 28.3 12.09-2.22 6.74-4.89 13.79-8.03 21.15zM119.22 33.56c0-7.39 2.67-14.29 8.01-20.7 5.34-6.42 11.89-10.49 19.64-12.22-.09 1.63-.14 3.09-.14 4.39 0 7.39-2.73 14.36-8.18 20.91-5.45 6.54-12.2 10.59-20.25 12.14.3-1.63.48-3.09.48-4.52h.44z"/>
                </svg>
                <div>
                  <div style={{ fontSize: '0.64rem', textTransform: 'uppercase', opacity: 0.8, letterSpacing: '0.04em' }}>Download on</div>
                  <div style={{ fontSize: '0.98rem', fontWeight: 800, lineHeight: 1.1 }}>App Store</div>
                </div>
              </a>

              {/* Google Play */}
              <a
                href="#download"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  background: '#0866F5',
                  color: '#FFFFFF',
                  padding: '12px 22px',
                  borderRadius: '14px',
                  textDecoration: 'none',
                  boxShadow: '0 8px 24px rgba(8, 102, 245, 0.28)',
                  transition: 'all 0.18s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.background = '#0653CA';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.background = '#0866F5';
                }}
              >
                <svg width="22" height="24" viewBox="0 0 512 512" fill="white">
                  <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-10.4 18-49.6-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/>
                </svg>
                <div>
                  <div style={{ fontSize: '0.64rem', textTransform: 'uppercase', opacity: 0.8, letterSpacing: '0.04em' }}>GET IT ON</div>
                  <div style={{ fontSize: '0.98rem', fontWeight: 800, lineHeight: 1.1 }}>Google Play</div>
                </div>
              </a>

              {/* Rating Card */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: '#FFFFFF',
                padding: '10px 16px',
                borderRadius: '14px',
                border: '1px solid #E5EBF4',
                boxShadow: '0 4px 12px rgba(11, 31, 68, 0.04)',
              }}>
                <Star size={18} fill="#F59E0B" color="#F59E0B" />
                <div>
                  <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0F172A' }}>4.8 ★ Rating</div>
                  <div style={{ fontSize: '0.7rem', color: '#64748B' }}>50,000+ Downloads</div>
                </div>
              </div>
            </div>

            {/* Handwritten Signature Tagline from Reference */}
            <div style={{
              marginTop: '32px',
              fontFamily: 'Caveat, cursive',
              fontSize: '1.85rem',
              color: '#0866F5',
              transform: 'rotate(-2deg)',
              display: 'inline-block',
            }}>
              Find Your Next Chapter ~
            </div>

          </div>

          {/* Right Phone Mockup Presentation */}
          <div style={{
            gridColumn: isStack ? 'auto' : 'span 5',
            display: 'flex',
            justifyContent: 'center',
            position: 'relative',
            marginTop: isStack ? '16px' : '0',
          }}>
            {/* Ambient Shadow Glow behind phone */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: isMobile ? '260px' : '320px',
              height: isMobile ? '440px' : '520px',
              borderRadius: '60px',
              background: 'rgba(8, 102, 245, 0.18)',
              filter: 'blur(50px)',
              zIndex: 0,
            }} />

            {/* Phone Outer Chassis */}
            <div style={{
              position: 'relative',
              zIndex: 2,
              width: isMobile ? '290px' : '310px',
              maxWidth: '100%',
              height: isMobile ? '550px' : '590px',
              background: '#0F172A',
              borderRadius: '48px',
              padding: '12px',
              boxShadow: '0 30px 70px rgba(8, 102, 245, 0.22), 0 0 0 2px #E2E8F0',
            }}>
              {/* Dynamic Island Speaker Notch */}
              <div style={{
                position: 'absolute',
                top: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '96px',
                height: '24px',
                background: '#000000',
                borderRadius: '16px',
                zIndex: 20,
              }} />

              {/* Screen Canvas */}
              <div style={{
                width: '100%',
                height: '100%',
                background: '#FFFFFF',
                borderRadius: '38px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
              }}>
                {/* Status Bar */}
                <div style={{
                  height: '36px',
                  padding: '10px 22px 0 22px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  color: '#0F172A',
                }}>
                  <span>9:41</span>
                  <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                    <div style={{ width: '14px', height: '9px', border: '1.5px solid #0F172A', borderRadius: '3px', position: 'relative' }}>
                      <div style={{ width: '8px', height: '5px', background: '#0F172A', margin: '1px' }} />
                    </div>
                  </div>
                </div>

                {/* Mini Header in Phone */}
                <div style={{
                  padding: '8px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottom: '1px solid #F1F5F9',
                }}>
                  <img src="/RRlogo_transparent.png" alt="" style={{ height: '22px' }} />
                  <div style={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    color: '#0866F5',
                    background: '#EEF5FF',
                    padding: '3px 8px',
                    borderRadius: '12px',
                  }}>
                    Mumbai ▾
                  </div>
                </div>

                {/* Search Bar in Phone */}
                <div style={{ padding: '10px 14px' }}>
                  <div style={{
                    background: '#F1F5F9',
                    borderRadius: '20px',
                    padding: '8px 12px',
                    fontSize: '0.72rem',
                    color: '#64748B',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}>
                    <Search size={12} color="#0866F5" />
                    <span>Search location, project, builder...</span>
                  </div>
                </div>

                {/* Hero Card inside Phone */}
                <div style={{ padding: '0 14px 10px 14px' }}>
                  <div style={{
                    background: 'linear-gradient(135deg, #EEF5FF 0%, #DCEBFE 100%)',
                    borderRadius: '16px',
                    padding: '14px',
                    position: 'relative',
                    overflow: 'hidden',
                  }}>
                    <div style={{ fontSize: '0.62rem', fontWeight: 800, color: '#0866F5', letterSpacing: '0.04em' }}>
                      MORE THAN SPACES
                    </div>
                    <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0F172A', lineHeight: 1.15, marginTop: '2px' }}>
                      A Brighter<br />Tomorrow
                    </div>
                    <div style={{
                      marginTop: '8px',
                      display: 'inline-block',
                      background: '#0866F5',
                      color: 'white',
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      padding: '4px 10px',
                      borderRadius: '12px',
                    }}>
                      Explore Projects →
                    </div>
                  </div>
                </div>

                {/* Recommended Listing Card */}
                <div style={{ padding: '0 14px', flex: 1 }}>
                  <div style={{
                    fontSize: '0.76rem',
                    fontWeight: 800,
                    color: '#0F172A',
                    marginBottom: '6px',
                  }}>
                    Recommended For You
                  </div>

                  <div style={{
                    border: '1px solid #E5EBF4',
                    borderRadius: '14px',
                    overflow: 'hidden',
                  }}>
                    <img
                      src="/images/prop_thane.jpg"
                      alt=""
                      style={{ width: '100%', height: '95px', objectFit: 'cover' }}
                    />
                    <div style={{ padding: '8px 10px' }}>
                      <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0F172A' }}>
                        ₹ 2.85 Cr
                      </div>
                      <div style={{ fontSize: '0.72rem', color: '#64748B' }}>
                        2 BHK · Lodha Upper Thane
                      </div>
                    </div>
                  </div>
                </div>

                {/* Phone Bottom Tab Bar */}
                <div style={{
                  height: '52px',
                  borderTop: '1px solid #E5EBF4',
                  display: 'flex',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  fontSize: '0.68rem',
                  color: '#64748B',
                  background: '#FFFFFF',
                }}>
                  <span style={{ color: '#0866F5', fontWeight: 800 }}>Home</span>
                  <span>Search</span>
                  <span>Shortlist</span>
                  <span>Profile</span>
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
