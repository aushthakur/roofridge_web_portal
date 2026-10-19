import React, { useState, useEffect } from 'react';
import { PROPERTIES } from '../data/mockData';
import api from '../services/api';
import {
  Search, MapPin, Heart, Star, ArrowRight, SlidersHorizontal,
  Grid, List, ShieldCheck, CheckCircle, X, Sparkles, Building2,
  Home, Landmark, Key, Filter, ChevronRight, Phone, Check, RefreshCw
} from 'lucide-react';
import { useResponsive } from '../hooks/useResponsive';

const MODE_CONFIG = {
  buy: {
    key: 'buy',
    tabLabel: 'Buy',
    eyebrow: '100% RERA VERIFIED HOMES · 0% BROKERAGE',
    title: 'Buy Verified Luxury Homes & Apartments',
    subtitle: 'Physically audited apartments, gated villas & sky penthouses with clean titles and instant registration.',
    types: ['All Types', 'Apartment', 'Villa', 'Penthouse', 'Duplex'],
    budgetMin: 50,
    budgetMax: 1000,
    budgetUnit: 'Cr',
    heroBg: 'linear-gradient(180deg, #EEF5FF 0%, #FFFFFF 100%)',
    badge: 'RERA Verified'
  },
  rent: {
    key: 'rent',
    tabLabel: 'Rent',
    eyebrow: '0% BROKERAGE VERIFIED RENTALS',
    title: 'Rental Homes & Furnished Apartments',
    subtitle: 'Fully furnished & semi-furnished residences with direct owner connect, zero brokerage, and online lease deeds.',
    types: ['All Types', 'Furnished', 'Semi Furnished', 'Bare Shell', 'Studio'],
    budgetMin: 20,
    budgetMax: 300,
    budgetUnit: 'k/mo',
    heroBg: 'linear-gradient(180deg, #F0F7FF 0%, #FFFFFF 100%)',
    badge: 'Zero Brokerage'
  },
  projects: {
    key: 'projects',
    tabLabel: 'New Projects',
    eyebrow: 'PREMIER BUILDER TOWNSHIPS & LAUNCHES',
    title: 'Newly Launched Projects & Highrise Towers',
    subtitle: 'Under-construction & new launch townships from Tier-1 developers (Godrej, Lodha, Prestige) with pre-launch pricing.',
    types: ['All Projects', 'Township', 'Luxury Highrise', 'Waterfront Tower'],
    budgetMin: 100,
    budgetMax: 1500,
    budgetUnit: 'Cr',
    heroBg: 'linear-gradient(180deg, #EEF5FF 0%, #FFFFFF 100%)',
    badge: 'New Launch'
  },
  plot: {
    key: 'plot',
    tabLabel: 'Plots & Land',
    eyebrow: 'FREEHOLD RESIDENTIAL & ESTATE PLOTS',
    title: 'Residential Plots & Development Land',
    subtitle: 'Clear NA title plots, gated community villa lands, and scenic country estates with government demarcation approval.',
    types: ['All Land', 'Residential Plot', 'Estate Plot', 'Farmhouse Land'],
    budgetMin: 50,
    budgetMax: 800,
    budgetUnit: 'Cr',
    heroBg: 'linear-gradient(180deg, #F4F9FF 0%, #FFFFFF 100%)',
    badge: 'Clear NA Title'
  },
  commercial: {
    key: 'commercial',
    tabLabel: 'Commercial',
    eyebrow: 'GRADE-A CORPORATE OFFICES & RETAIL',
    title: 'Commercial Offices & High-Street Retail',
    subtitle: 'Prime corporate suites, IT park towers, and high-footfall retail with pre-leased tenant income & 8.5%+ net yields.',
    types: ['All Commercial', 'Office Space', 'Retail Showroom'],
    budgetMin: 200,
    budgetMax: 2500,
    budgetUnit: 'Cr',
    heroBg: 'linear-gradient(180deg, #EEF5FF 0%, #FFFFFF 100%)',
    badge: 'Pre-Leased ROI'
  },
  pg: {
    key: 'pg',
    tabLabel: 'PG / Co-Living',
    eyebrow: 'VERIFIED HOSTELS & CO-LIVING SPACES · 0% BROKERAGE',
    title: 'Paying Guest (PG) & Designer Co-Living',
    subtitle: 'Fully furnished AC rooms, 3 hygienic home meals, high-speed WiFi & zero security lock-in for students & working professionals.',
    types: ['All Rooms', 'Single Room', 'Double Sharing', 'Triple Sharing', 'Co-Living Studio'],
    budgetMin: 5,
    budgetMax: 35,
    budgetUnit: 'k/mo',
    heroBg: 'linear-gradient(180deg, #F0FDF4 0%, #FFFFFF 100%)',
    badge: 'Meals & WiFi Included'
  },
  luxury: {
    key: 'luxury',
    tabLabel: 'Luxury',
    eyebrow: 'ROOFRIDGE ULTRA-LUXURY COLLECTION',
    title: 'Ultra-Luxury Penthouses & Signature Mansions',
    subtitle: 'Handpicked oceanfront estates and sky villas curated for ultra-high-net-worth connoisseurs.',
    types: ['All Types', 'Penthouse', 'Villa', 'Duplex'],
    budgetMin: 500,
    budgetMax: 3000,
    budgetUnit: 'Cr',
    heroBg: 'linear-gradient(180deg, #F0F6FF 0%, #FFFFFF 100%)',
    badge: 'Exclusive'
  }
};

const BHK_OPTIONS = ['Any', '1 BHK', '2 BHK', '3 BHK', '4 BHK+'];

const TRUST_BADGES = [
  { icon: ShieldCheck, title: '100-Point Physical Verification', desc: 'Every home inspected by our ground engineers' },
  { icon: CheckCircle, title: '0% Brokerage Guarantee', desc: 'Direct owner & builder connect' },
  { icon: Sparkles, title: 'Clear RERA Title Audit', desc: '30-year ownership history verified' },
];

export default function PropertiesPage({
  mode = 'buy',
  selectedCity,
  searchFilters = null,
  onSelectProperty,
  wishlist = [],
  onToggleWishlist
}) {
  const [currentMode, setCurrentMode] = useState(mode || 'buy');
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [bhk, setBhk] = useState('Any');
  const [query, setQuery] = useState(searchFilters?.locality || searchFilters?.query || '');
  const [viewMode, setViewMode] = useState('grid');
  const [reraOnly, setReraOnly] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const { isMobile, isTablet } = useResponsive();

  useEffect(() => {
    if (mode && MODE_CONFIG[mode]) {
      setCurrentMode(mode);

      const rawType = searchFilters?.type || 
                      searchFilters?.propertyType || 
                      searchFilters?.rentalType || 
                      searchFilters?.sharingType || 
                      searchFilters?.plotType || 
                      searchFilters?.commercialType || 
                      searchFilters?.projectType;

      const allowedTypes = MODE_CONFIG[mode]?.types || ['All Types'];
      let matchedType = allowedTypes[0];

      if (rawType && !rawType.startsWith('All') && !rawType.startsWith('Any') && rawType !== 'Property Type') {
        if (allowedTypes.includes(rawType)) {
          matchedType = rawType;
        } else if (rawType.includes('Single')) {
          matchedType = allowedTypes.find(t => t.includes('Single')) || allowedTypes[0];
        } else if (rawType.includes('Double')) {
          matchedType = allowedTypes.find(t => t.includes('Double')) || allowedTypes[0];
        } else if (rawType.includes('Triple')) {
          matchedType = allowedTypes.find(t => t.includes('Triple')) || allowedTypes[0];
        } else if (rawType.includes('Furnished') && !rawType.includes('Semi')) {
          matchedType = allowedTypes.find(t => t === 'Furnished') || allowedTypes[0];
        } else if (rawType.includes('Semi')) {
          matchedType = allowedTypes.find(t => t.includes('Semi')) || allowedTypes[0];
        } else if (rawType.includes('High-Rise') || rawType.includes('Highrise')) {
          matchedType = allowedTypes.find(t => t.includes('Highrise')) || allowedTypes[0];
        } else if (rawType.includes('Township')) {
          matchedType = allowedTypes.find(t => t.includes('Township')) || allowedTypes[0];
        } else if (rawType.includes('Waterfront')) {
          matchedType = allowedTypes.find(t => t.includes('Waterfront')) || allowedTypes[0];
        } else if (rawType.includes('Office')) {
          matchedType = allowedTypes.find(t => t.includes('Office')) || allowedTypes[0];
        } else if (rawType.includes('Retail') || rawType.includes('Showroom')) {
          matchedType = allowedTypes.find(t => t.includes('Retail')) || allowedTypes[0];
        } else if (rawType.includes('Apartment')) {
          matchedType = allowedTypes.find(t => t.includes('Apartment')) || allowedTypes[0];
        } else if (rawType.includes('Villa')) {
          matchedType = allowedTypes.find(t => t.includes('Villa')) || allowedTypes[0];
        } else if (rawType.includes('Penthouse')) {
          matchedType = allowedTypes.find(t => t.includes('Penthouse')) || allowedTypes[0];
        } else if (rawType.includes('Duplex')) {
          matchedType = allowedTypes.find(t => t.includes('Duplex')) || allowedTypes[0];
        }
      }
      setTypeFilter(matchedType);

      if (searchFilters?.bhk && searchFilters.bhk !== 'Any BHK' && searchFilters.bhk !== 'Any') {
        setBhk(searchFilters.bhk);
      } else if (searchFilters?.rentalType) {
        if (searchFilters.rentalType.includes('1 BHK')) setBhk('1 BHK');
        else if (searchFilters.rentalType.includes('2 BHK')) setBhk('2 BHK');
        else if (searchFilters.rentalType.includes('3 BHK')) setBhk('3 BHK');
        else setBhk('Any');
      } else {
        setBhk('Any');
      }

      if (searchFilters?.locality) {
        setQuery(searchFilters.locality);
      } else if (searchFilters?.query && searchFilters.query !== searchFilters?.city) {
        setQuery(searchFilters.query);
      }
    }
  }, [mode, searchFilters]);

  const [liveProperties, setLiveProperties] = useState([]);

  useEffect(() => {
    let active = true;
    const queryType = currentMode === 'luxury' || currentMode === 'projects' ? 'buy' : currentMode;
    api.getProperties({ type: queryType })
      .then((res) => {
        if (active && res.data && res.data.length > 0) {
          const mapped = res.data.map(p => ({
            id: p._id,
            _id: p._id,
            title: p.title,
            price: p.priceDisplay || `₹${p.price}`,
            priceNum: p.price,
            location: p.location?.locality ? `${p.location.locality}, ${p.location.city}` : p.location?.city || 'Noida',
            specs: `${p.bhk || 3} BHK • ${p.features?.areaSqFt || 1650} sq.ft • Immediate`,
            bhk: p.bhk ? `${p.bhk} BHK` : '3 BHK',
            area: p.features?.areaSqFt ? `${p.features.areaSqFt} sq.ft` : '1,650 sq.ft',
            image: p.images?.[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
            images: p.images || [],
            tag: p.isFeatured ? 'Featured' : p.isVerified ? 'Verified' : '',
            tagType: p.isReraVerified ? 'rera' : 'badge',
            rating: 4.9,
            reviewsCount: 18,
            type: p.type || 'buy',
            propertyType: p.subType ? p.subType.charAt(0).toUpperCase() + p.subType.slice(1).replace(/_/g, ' ') : 'Apartment',
            amenities: p.amenities || [],
            description: p.description,
          }));
          setLiveProperties(mapped);
        }
      })
      .catch((err) => {
        console.warn('Live properties API notice:', err.message);
      });

    return () => { active = false; };
  }, [currentMode]);

  const cfg = MODE_CONFIG[currentMode] || MODE_CONFIG.buy;
  const types = cfg.types || ['All Types'];

  const combinedProperties = liveProperties.length > 0
    ? [...liveProperties, ...PROPERTIES.filter(p => !liveProperties.some(lp => lp.title === p.title))]
    : PROPERTIES;

  const filtered = combinedProperties.filter(item => {
    // Mode match
    if (currentMode === 'buy' && item.type !== 'buy') return false;
    if (currentMode === 'rent' && item.type !== 'rent') return false;
    if (currentMode === 'projects' && item.type !== 'projects') return false;
    if (currentMode === 'plot' && item.type !== 'plot') return false;
    if (currentMode === 'commercial' && item.type !== 'commercial') return false;
    if (currentMode === 'luxury' && item.type !== 'buy' && item.type !== 'projects') return false;
    if (currentMode === 'pg' && item.type !== 'pg') return false;

    // Search query match
    if (query) {
      const q = query.toLowerCase();
      const matchTitle = item.title?.toLowerCase().includes(q);
      const matchLoc = item.location?.toLowerCase().includes(q);
      const matchType = item.propertyType?.toLowerCase().includes(q);
      if (!matchTitle && !matchLoc && !matchType) return false;
    }

    // Property Type filter
    if (typeFilter !== 'All Types' && typeFilter !== 'All Projects' && typeFilter !== 'All Land' && typeFilter !== 'All Commercial') {
      if (item.propertyType !== typeFilter) return false;
    }

    // BHK filter
    if (bhk !== 'Any') {
      if (item.bhk && item.bhk !== bhk) return false;
    }

    // RERA filter
    if (reraOnly && item.tagType !== 'rera') return false;

    return true;
  });

  // Sort filtered listings
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
    return 0; // default featured
  });

  const cityName = selectedCity?.name || 'Mumbai';

  const resetFilters = () => {
    setTypeFilter(types[0]);
    setBhk('Any');
    setQuery('');
    setReraOnly(false);
    setSortBy('featured');
  };

  return (
    <div style={{ background: '#F8FAFD', minHeight: '90vh', fontFamily: 'Inter, sans-serif' }}>

      {/* ── 1. COMPACT EXECUTIVE HEADER (SLEEK & SPACE-EFFICIENT) ── */}
      <div style={{
        background: cfg.heroBg,
        borderBottom: '1px solid #E5EBF4',
        padding: isMobile ? '16px 0 14px' : '20px 0 16px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div className="rr-container" style={{ position: 'relative', zIndex: 2 }}>
          {/* Main Flex Row: Title + Category Pills */}
          <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: isMobile ? 'flex-start' : 'center',
            justifyContent: 'space-between',
            gap: isMobile ? '12px' : '20px',
          }}>
            {/* Left: Eyebrow + Crisp Heading + Short Subtitle */}
            <div style={{ maxWidth: isMobile ? '100%' : '650px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '11px',
                  fontWeight: 800,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: '#0866F5',
                }}>
                  <Sparkles size={12} color="#0866F5" />
                  {cfg.eyebrow}
                </span>
                <span style={{ color: '#CBD5E1' }}>•</span>
                <span style={{ fontSize: '11.5px', fontWeight: 600, color: '#64748B' }}>
                  {cityName}
                </span>
              </div>

              <h1 style={{
                fontSize: isMobile ? '20px' : '24px',
                fontWeight: 800,
                color: '#0F172A',
                lineHeight: 1.25,
                letterSpacing: '-0.02em',
                margin: '0 0 4px 0',
              }}>
                {cfg.title} in <span style={{ color: '#0866F5' }}>{cityName}</span>
              </h1>

              <p style={{
                fontSize: '12.5px',
                color: '#64748B',
                lineHeight: 1.5,
                margin: 0,
              }}>
                {cfg.subtitle}
              </p>
            </div>

            {/* Right: Category Tabs Pill Switcher */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '30px',
              padding: '3px',
              boxShadow: '0 2px 8px rgba(8, 102, 245, 0.05)',
              overflowX: 'auto',
              maxWidth: '100%',
              flexShrink: 0,
            }}>
              {Object.keys(MODE_CONFIG).filter(k => k !== 'luxury').map((k) => {
                const item = MODE_CONFIG[k];
                const isSelected = currentMode === k;
                return (
                  <button
                    key={k}
                    onClick={() => {
                      setCurrentMode(k);
                      setTypeFilter(MODE_CONFIG[k].types[0]);
                      setBhk('Any');
                    }}
                    style={{
                      background: isSelected ? '#0866F5' : 'transparent',
                      color: isSelected ? '#FFFFFF' : '#475569',
                      border: 'none',
                      borderRadius: '20px',
                      padding: '6px 14px',
                      fontSize: '12px',
                      fontWeight: isSelected ? 700 : 500,
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      transition: 'all 0.15s ease',
                      boxShadow: isSelected ? '0 2px 8px rgba(8, 102, 245, 0.25)' : 'none',
                    }}
                  >
                    {item.tabLabel}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Compact Trust Highlights Inline Strip */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: isMobile ? '12px' : '24px',
            marginTop: '12px',
            paddingTop: '10px',
            borderTop: '1px solid rgba(226, 232, 240, 0.8)',
            fontSize: '11.5px',
            flexWrap: 'wrap',
          }}>
            {TRUST_BADGES.map((t, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <t.icon size={13} style={{ color: '#0866F5', flexShrink: 0 }} />
                <span style={{ fontWeight: 700, color: '#1E293B' }}>{t.title}</span>
                <span style={{ color: '#94A3B8', fontSize: '11px' }}>({t.desc})</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 2. QUICK SEARCH & HORIZONTAL FILTER BAR ── */}
      <div style={{
        background: '#FFFFFF',
        borderBottom: '1px solid #E5EBF4',
        position: 'sticky',
        top: '72px',
        zIndex: 40,
        boxShadow: '0 2px 12px rgba(11, 31, 68, 0.03)',
      }}>
        <div className="rr-container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          padding: '14px 0',
          flexWrap: 'wrap',
        }}>
          {/* Search Box */}
          <div style={{
            position: 'relative',
            flex: isMobile ? '1 1 100%' : '1 1 320px',
            maxWidth: isMobile ? '100%' : '420px',
          }}>
            <Search size={16} style={{
              position: 'absolute',
              left: '14px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#0866F5',
            }} />
            <input
              type="text"
              placeholder={`Search in ${cityName} (e.g. Worli, Bandra, Powai...)`}
              value={query}
              onChange={e => setQuery(e.target.value)}
              style={{
                width: '100%',
                height: '42px',
                borderRadius: '10px',
                border: '1px solid #E5EBF4',
                background: '#F8FAFD',
                padding: '0 14px 0 40px',
                fontSize: '13px',
                color: '#0F172A',
                outline: 'none',
                fontFamily: 'Inter, sans-serif',
                transition: 'border-color 0.15s ease',
              }}
              onFocus={e => e.currentTarget.style.borderColor = '#0866F5'}
              onBlur={e => e.currentTarget.style.borderColor = '#E5EBF4'}
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#94A3B8',
                  padding: 0,
                }}
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Quick Type Pills (Desktop) */}
          {!isMobile && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              {types.map((t) => {
                const isActive = typeFilter === t;
                return (
                  <button
                    key={t}
                    onClick={() => setTypeFilter(t)}
                    style={{
                      padding: '7px 14px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: isActive ? 600 : 500,
                      background: isActive ? '#0866F5' : '#F8FAFD',
                      color: isActive ? '#FFFFFF' : '#475569',
                      border: isActive ? '1px solid #0866F5' : '1px solid #E5EBF4',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          )}

          {/* Right Actions: RERA toggle + Sort + View */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* RERA Toggle */}
            <button
              onClick={() => setReraOnly(!reraOnly)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '7px 12px',
                borderRadius: '8px',
                background: reraOnly ? '#EEF5FF' : '#FFFFFF',
                border: reraOnly ? '1.5px solid #0866F5' : '1px solid #E5EBF4',
                color: reraOnly ? '#0866F5' : '#475569',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              <ShieldCheck size={14} color={reraOnly ? '#0866F5' : '#64748B'} />
              <span>RERA Only</span>
            </button>

            {/* View Mode Toggle */}
            <div style={{
              display: 'flex',
              background: '#F1F5F9',
              borderRadius: '8px',
              padding: '3px',
              gap: '2px',
            }}>
              <button
                onClick={() => setViewMode('grid')}
                style={{
                  padding: '6px 10px',
                  borderRadius: '6px',
                  border: 'none',
                  background: viewMode === 'grid' ? '#FFFFFF' : 'transparent',
                  color: viewMode === 'grid' ? '#0866F5' : '#64748B',
                  boxShadow: viewMode === 'grid' ? '0 1px 4px rgba(0,0,0,0.06)' : 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                }}
                title="Grid View"
              >
                <Grid size={15} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                style={{
                  padding: '6px 10px',
                  borderRadius: '6px',
                  border: 'none',
                  background: viewMode === 'list' ? '#FFFFFF' : 'transparent',
                  color: viewMode === 'list' ? '#0866F5' : '#64748B',
                  boxShadow: viewMode === 'list' ? '0 1px 4px rgba(0,0,0,0.06)' : 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                }}
                title="List View"
              >
                <List size={15} />
              </button>
            </div>

            {/* Mobile Filter Trigger */}
            {isMobile && (
              <button
                onClick={() => setShowMobileFilters(true)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 14px',
                  background: '#0F172A',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                <SlidersHorizontal size={14} />
                <span>Filters</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── 3. MAIN CONTENT: SIDEBAR + PROPERTY GRID ── */}
      <div className="rr-container" style={{ padding: '36px 0 80px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '260px 1fr',
          gap: '28px',
          alignItems: 'start',
        }}>

          {/* ── DESKTOP FILTER SIDEBAR ── */}
          {!isMobile && (
            <div style={{
              position: 'sticky',
              top: '144px',
              background: '#FFFFFF',
              border: '1px solid #E5EBF4',
              borderRadius: '16px',
              padding: '22px',
              boxShadow: '0 4px 20px rgba(11, 31, 68, 0.03)',
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: '16px',
                borderBottom: '1px solid #F1F5F9',
                marginBottom: '18px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <SlidersHorizontal size={16} color="#0866F5" />
                  <span style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A' }}>Filters</span>
                </div>
                <button
                  onClick={resetFilters}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '12px',
                    fontWeight: 600,
                    color: '#0866F5',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <RefreshCw size={12} /> Reset
                </button>
              </div>

              {/* Bedrooms (BHK) filter */}
              <div style={{ marginBottom: '22px' }}>
                <label style={sidebarLabel}>Bedrooms (BHK)</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
                  {BHK_OPTIONS.map((b) => {
                    const isSelected = bhk === b;
                    return (
                      <button
                        key={b}
                        onClick={() => setBhk(b)}
                        style={{
                          padding: '7px 4px',
                          borderRadius: '8px',
                          fontSize: '12px',
                          fontWeight: isSelected ? 600 : 500,
                          cursor: 'pointer',
                          border: isSelected ? '1.5px solid #0866F5' : '1px solid #E5EBF4',
                          background: isSelected ? '#EEF5FF' : '#FFFFFF',
                          color: isSelected ? '#0866F5' : '#475569',
                          transition: 'all 0.15s ease',
                          textAlign: 'center',
                        }}
                      >
                        {b}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Property Type Category filter */}
              <div style={{ marginBottom: '22px' }}>
                <label style={sidebarLabel}>Property Type</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {types.map((t) => {
                    const isSelected = typeFilter === t;
                    return (
                      <button
                        key={t}
                        onClick={() => setTypeFilter(t)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '8px 12px',
                          borderRadius: '8px',
                          border: 'none',
                          background: isSelected ? '#F0F6FF' : 'transparent',
                          color: isSelected ? '#0866F5' : '#475569',
                          fontSize: '13px',
                          fontWeight: isSelected ? 600 : 400,
                          cursor: 'pointer',
                          textAlign: 'left',
                          transition: 'background 0.15s ease',
                        }}
                      >
                        <span>{t}</span>
                        {isSelected && <Check size={14} color="#0866F5" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Possession Status */}
              <div style={{ marginBottom: '22px' }}>
                <label style={sidebarLabel}>Possession Timeline</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {['Ready to Move', 'Under Construction', 'Pre-Launch'].map((pos) => (
                    <label key={pos} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', color: '#475569' }}>
                      <input type="checkbox" style={{ accentColor: '#0866F5', cursor: 'pointer' }} />
                      <span>{pos}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Verified Only */}
              <div style={{
                paddingTop: '16px',
                borderTop: '1px solid #F1F5F9',
              }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={reraOnly}
                    onChange={e => setReraOnly(e.target.checked)}
                    style={{ width: '16px', height: '16px', accentColor: '#0866F5', cursor: 'pointer' }}
                  />
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#0F172A' }}>RERA Verified Only</span>
                </label>
              </div>

              {/* Need Help Concierge Card */}
              <div style={{
                marginTop: '24px',
                padding: '16px',
                background: '#EEF5FF',
                borderRadius: '12px',
                border: '1px solid rgba(8, 102, 245, 0.15)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <Phone size={14} color="#0866F5" />
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#0F172A' }}>Dedicated Concierge</span>
                </div>
                <p style={{ fontSize: '11px', color: '#64748B', lineHeight: 1.5, marginBottom: '10px' }}>
                  Get assistance with physical site tours, paperwork & bank sanction.
                </p>
                <a
                  href="tel:18002008888"
                  style={{
                    display: 'block',
                    textAlign: 'center',
                    background: '#0866F5',
                    color: '#FFFFFF',
                    padding: '7px 10px',
                    borderRadius: '8px',
                    fontSize: '11px',
                    fontWeight: 600,
                    textDecoration: 'none',
                  }}
                >
                  Call Free: 1800-200-8888
                </a>
              </div>
            </div>
          )}

          {/* ── PROPERTY RESULTS CONTAINER ── */}
          <div>
            {/* Results Counter & Sort Bar */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '20px',
              padding: '12px 18px',
              background: '#FFFFFF',
              border: '1px solid #E5EBF4',
              borderRadius: '12px',
            }}>
              <div>
                <span style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A' }}>
                  {sorted.length} Properties
                </span>
                <span style={{ fontSize: '13px', color: '#64748B', marginLeft: '6px' }}>
                  found in {cityName}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '12px', color: '#64748B' }}>Sort:</span>
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    color: '#0F172A',
                    background: '#F8FAFD',
                    border: '1px solid #E5EBF4',
                    borderRadius: '8px',
                    padding: '6px 10px',
                    cursor: 'pointer',
                    outline: 'none',
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  <option value="featured">Recommended</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>
            </div>

            {/* Empty State */}
            {sorted.length === 0 && (
              <div style={{
                background: '#FFFFFF',
                border: '1px solid #E5EBF4',
                borderRadius: '16px',
                padding: '60px 24px',
                textAlign: 'center',
              }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: '#EEF5FF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#0866F5',
                  margin: '0 auto 16px',
                }}>
                  <Search size={24} />
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0F172A', marginBottom: '8px' }}>
                  No matching properties found
                </h3>
                <p style={{ fontSize: '13px', color: '#64748B', maxWidth: '400px', margin: '0 auto 20px' }}>
                  Try relaxing your search terms or resetting filters to view all available listings in {cityName}.
                </p>
                <button
                  onClick={resetFilters}
                  style={{
                    background: '#0866F5',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '10px 20px',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Reset All Filters
                </button>
              </div>
            )}

            {/* Property Cards Grid */}
            {sorted.length > 0 && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : (viewMode === 'grid' ? (isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)') : '1fr'),
                gap: '20px',
              }}>
                {sorted.map((item) => {
                  const isSaved = wishlist.includes(item.id);
                  return (
                    <div
                      key={item.id}
                      onClick={() => onSelectProperty && onSelectProperty(item)}
                      style={{
                        background: '#FFFFFF',
                        border: '1px solid #E5EBF4',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: viewMode === 'list' && !isMobile ? 'row' : 'column',
                        cursor: 'pointer',
                        transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
                        boxShadow: '0 2px 8px rgba(11, 31, 68, 0.04)',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.transform = 'translateY(-4px)';
                        e.currentTarget.style.boxShadow = '0 12px 28px rgba(11, 31, 68, 0.08)';
                        e.currentTarget.style.borderColor = '#C7D9F5';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 2px 8px rgba(11, 31, 68, 0.04)';
                        e.currentTarget.style.borderColor = '#E5EBF4';
                      }}
                    >
                      {/* Property Image Container */}
                      <div style={{
                        position: 'relative',
                        width: viewMode === 'list' && !isMobile ? '280px' : '100%',
                        height: viewMode === 'list' && !isMobile ? 'auto' : '210px',
                        overflow: 'hidden',
                        background: '#EEF5FF',
                        flexShrink: 0,
                      }}>
                        <img
                          src={item.image}
                          alt={item.title}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            display: 'block',
                            transition: 'transform 0.4s ease',
                          }}
                          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1.0)'}
                        />

                        {/* Top Left Badge */}
                        <div style={{
                          position: 'absolute',
                          top: '12px',
                          left: '12px',
                          background: item.badge?.includes('RERA') ? '#0866F5' : '#0F172A',
                          color: '#FFFFFF',
                          fontSize: '11px',
                          fontWeight: 700,
                          letterSpacing: '0.04em',
                          padding: '4px 9px',
                          borderRadius: '6px',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
                        }}>
                          {item.badge || 'Verified'}
                        </div>

                        {/* Top Right Wishlist Button */}
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            onToggleWishlist && onToggleWishlist(item.id);
                          }}
                          style={{
                            position: 'absolute',
                            top: '12px',
                            right: '12px',
                            width: '34px',
                            height: '34px',
                            borderRadius: '50%',
                            background: 'rgba(255, 255, 255, 0.92)',
                            backdropFilter: 'blur(4px)',
                            border: '1px solid rgba(229, 235, 244, 0.8)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            color: isSaved ? '#EF4444' : '#64748B',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                            transition: 'transform 0.15s ease',
                          }}
                          title={isSaved ? 'Remove from Wishlist' : 'Save to Wishlist'}
                          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1.0)'}
                        >
                          <Heart size={16} fill={isSaved ? '#EF4444' : 'none'} stroke={isSaved ? '#EF4444' : 'currentColor'} strokeWidth={2} />
                        </button>
                      </div>

                      {/* Property Details Body */}
                      <div style={{
                        padding: '18px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        flex: 1,
                      }}>
                        <div>
                          {/* Price */}
                          <div style={{
                            display: 'flex',
                            alignItems: 'baseline',
                            justifyContent: 'space-between',
                            marginBottom: '6px',
                          }}>
                            <span style={{
                              fontSize: '20px',
                              fontWeight: 800,
                              color: '#0F172A',
                              letterSpacing: '-0.02em',
                            }}>
                              {item.price}
                            </span>
                            {item.originalPrice && (
                              <span style={{
                                fontSize: '12px',
                                color: '#94A3B8',
                                textDecoration: 'line-through',
                              }}>
                                {item.originalPrice}
                              </span>
                            )}
                          </div>

                          {/* Title */}
                          <h3 style={{
                            fontSize: '15px',
                            fontWeight: 700,
                            color: '#0F172A',
                            lineHeight: 1.35,
                            marginBottom: '6px',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                          }}>
                            {item.title}
                          </h3>

                          {/* Location */}
                          <p style={{
                            fontSize: '12px',
                            color: '#64748B',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            marginBottom: '14px',
                          }}>
                            <MapPin size={13} color="#0866F5" style={{ flexShrink: 0 }} />
                            <span style={{
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}>
                              {item.location}
                            </span>
                          </p>

                          {/* Specs Chip */}
                          <div style={{
                            background: '#F8FAFD',
                            border: '1px solid #E5EBF4',
                            borderRadius: '8px',
                            padding: '7px 10px',
                            fontSize: '12px',
                            color: '#475569',
                            fontWeight: 500,
                            marginBottom: '16px',
                          }}>
                            {item.specs}
                          </div>
                        </div>

                        {/* Card Bottom: View Details CTA */}
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          paddingTop: '12px',
                          borderTop: '1px solid #F1F5F9',
                        }}>
                          <span style={{
                            fontSize: '12px',
                            fontWeight: 600,
                            color: '#0866F5',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                          }}>
                            View Details <ArrowRight size={13} />
                          </span>

                          <button
                            onClick={e => {
                              e.stopPropagation();
                              onSelectProperty && onSelectProperty(item);
                            }}
                            style={{
                              background: '#EEF5FF',
                              color: '#0866F5',
                              border: 'none',
                              borderRadius: '8px',
                              padding: '6px 12px',
                              fontSize: '12px',
                              fontWeight: 600,
                              cursor: 'pointer',
                              transition: 'background 0.15s ease',
                            }}
                            onMouseEnter={e => {
                              e.currentTarget.style.background = '#0866F5';
                              e.currentTarget.style.color = '#FFFFFF';
                            }}
                            onMouseLeave={e => {
                              e.currentTarget.style.background = '#EEF5FF';
                              e.currentTarget.style.color = '#0866F5';
                            }}
                          >
                            Inquire Now
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── MOBILE FILTER DRAWER ── */}
      {isMobile && showMobileFilters && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999,
            background: 'rgba(11, 31, 68, 0.5)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
          onClick={() => setShowMobileFilters(false)}
        >
          <div
            style={{
              width: '85%',
              maxWidth: '340px',
              height: '100%',
              background: '#FFFFFF',
              padding: '24px',
              overflowY: 'auto',
              boxShadow: '-4px 0 24px rgba(0,0,0,0.15)',
            }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '20px',
              paddingBottom: '14px',
              borderBottom: '1px solid #E5EBF4',
            }}>
              <span style={{ fontSize: '16px', fontWeight: 700, color: '#0F172A' }}>Filter Properties</span>
              <button
                onClick={() => setShowMobileFilters(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Bedroom Filter */}
            <div style={{ marginBottom: '20px' }}>
              <label style={sidebarLabel}>Bedrooms (BHK)</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
                {BHK_OPTIONS.map((b) => (
                  <button
                    key={b}
                    onClick={() => setBhk(b)}
                    style={{
                      padding: '8px 4px',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: bhk === b ? 600 : 500,
                      border: bhk === b ? '1.5px solid #0866F5' : '1px solid #E5EBF4',
                      background: bhk === b ? '#EEF5FF' : '#FFFFFF',
                      color: bhk === b ? '#0866F5' : '#475569',
                    }}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            {/* Property Types */}
            <div style={{ marginBottom: '20px' }}>
              <label style={sidebarLabel}>Property Type</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {types.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTypeFilter(t)}
                    style={{
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: 'none',
                      background: typeFilter === t ? '#EEF5FF' : '#F8FAFD',
                      color: typeFilter === t ? '#0866F5' : '#475569',
                      fontSize: '13px',
                      fontWeight: typeFilter === t ? 600 : 400,
                      textAlign: 'left',
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Apply & Reset Buttons */}
            <div style={{ display: 'flex', gap: '10px', marginTop: '30px' }}>
              <button
                onClick={resetFilters}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '10px',
                  border: '1px solid #E5EBF4',
                  background: '#FFFFFF',
                  color: '#0F172A',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Reset
              </button>
              <button
                onClick={() => setShowMobileFilters(false)}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '10px',
                  border: 'none',
                  background: '#0866F5',
                  color: '#FFFFFF',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Apply ({sorted.length})
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

const sidebarLabel = {
  fontSize: '12px',
  fontWeight: 700,
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
  color: '#0F172A',
  display: 'block',
  marginBottom: '10px',
  fontFamily: 'Inter, sans-serif',
};
