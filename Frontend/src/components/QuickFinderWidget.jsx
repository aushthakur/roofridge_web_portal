import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, ChevronDown, X, Check, Compass, SlidersHorizontal, Sparkles } from 'lucide-react';
import { CITIES, CITY_LOCALITIES } from '../data/mockData';
import { useResponsive } from '../hooks/useResponsive';

const TABS = [
  { id: 'buy',          label: 'Buy',          sub: 'Verified Homes' },
  { id: 'rent',         label: 'Rent',         sub: '0% Brokerage' },
  { id: 'new_projects', label: 'New Projects', sub: 'Top Builders' },
  { id: 'pg',           label: 'PG',           sub: 'Co-Living & Hostels' },
  { id: 'plot',         label: 'Plot',         sub: 'Freehold Land' },
  { id: 'commercial',   label: 'Commercial',   sub: 'Offices & Retail' },
];

const TAB_SCHEMAS = {
  buy: {
    fields: [
      {
        id: 'type',
        label: 'Property Type',
        defaultValue: 'All Residential Types',
        options: [
          'All Residential Types',
          'Apartments / Flats',
          'Independent Houses / Villas',
          'Sky Penthouses',
          'Garden Duplex',
          'Builder Floors',
        ],
      },
      {
        id: 'bhk',
        label: 'BHK',
        defaultValue: 'Any BHK',
        options: ['Any BHK', '1 BHK', '2 BHK', '3 BHK', '4 BHK+'],
      },
      {
        id: 'budget',
        label: 'Budget',
        defaultValue: 'Any Budget',
        options: [
          'Any Budget',
          'Under ₹ 50 Lakhs',
          '₹ 50L – ₹ 1.5 Cr',
          '₹ 1.5 – ₹ 3.5 Cr',
          '₹ 3.5 – ₹ 6.0 Cr',
          'Above ₹ 6.0 Cr',
        ],
      },
    ],
  },
  rent: {
    fields: [
      {
        id: 'rentalType',
        label: 'Rental Type',
        defaultValue: 'All Rental Types',
        options: [
          'All Rental Types',
          '1 BHK Apartment',
          '2 BHK Apartment',
          '3 BHK Apartment',
          'Studio Flat / 1 RK',
          'Independent House / Villa',
          'Gated Community Flat',
        ],
      },
      {
        id: 'rentBudget',
        label: 'Monthly Rent',
        defaultValue: 'Any Rent',
        options: [
          'Any Rent',
          'Under ₹ 15,000 / mo',
          '₹ 15,000 – ₹ 30,000 / mo',
          '₹ 30,000 – ₹ 60,000 / mo',
          '₹ 60,000 – ₹ 1.2 Lakh / mo',
          'Above ₹ 1.2 Lakh / mo',
        ],
      },
      {
        id: 'furnishing',
        label: 'Furnishing & Tenant',
        defaultValue: 'Any Furnishing',
        options: [
          'Any Furnishing',
          'Fully Furnished',
          'Semi-Furnished',
          'Unfurnished',
          'Bachelors Allowed',
          'Family Preferred',
        ],
      },
    ],
  },
  new_projects: {
    fields: [
      {
        id: 'projectType',
        label: 'Project Type',
        defaultValue: 'All New Projects',
        options: [
          'All New Projects',
          'Luxury High-Rise Towers',
          'Integrated Mega Townships',
          'Gated Villa Enclaves',
          'Boutique Residences',
        ],
      },
      {
        id: 'possession',
        label: 'Possession Stage',
        defaultValue: 'Any Timeline',
        options: [
          'Any Timeline',
          'New Launch (Pre-booking)',
          'Under Construction (1-2 Yrs)',
          'Ready to Move In',
        ],
      },
      {
        id: 'budget',
        label: 'Budget',
        defaultValue: 'Any Budget',
        options: [
          'Any Budget',
          '₹ 45L – ₹ 1 Cr',
          '₹ 1 Cr – ₹ 2.5 Cr',
          '₹ 2.5 Cr – ₹ 5 Cr',
          'Above ₹ 5 Cr',
        ],
      },
    ],
  },
  pg: {
    fields: [
      {
        id: 'sharingType',
        label: 'Room Sharing',
        defaultValue: 'All Room Types',
        options: [
          'All Room Types',
          'Single Private Room',
          'Double Sharing (2 Beds)',
          'Triple Sharing (3 Beds)',
          '4+ Sharing (Hostel)',
        ],
      },
      {
        id: 'pgFor',
        label: 'PG For (Gender)',
        defaultValue: 'Anyone (Male/Female)',
        options: [
          'Anyone (Male/Female)',
          'Boys / Male PG',
          'Girls / Female PG',
          'Co-Living (Mixed)',
        ],
      },
      {
        id: 'pgBudget',
        label: 'Monthly Rent',
        defaultValue: 'Any Budget',
        options: [
          'Any Budget',
          'Under ₹ 8,000 / mo',
          '₹ 8,000 – ₹ 15,000 / mo',
          '₹ 15,000 – ₹ 25,000 / mo',
          'Above ₹ 25,000 / mo',
        ],
      },
      {
        id: 'foodOption',
        label: 'Food Included?',
        defaultValue: 'Food: Any',
        options: [
          'Food: Any',
          'With 3-Time Meals (Mess)',
          'Breakfast & Dinner Included',
          'Without Food (Self Cook)',
        ],
      },
    ],
  },
  plot: {
    fields: [
      {
        id: 'plotType',
        label: 'Plot Type',
        defaultValue: 'All Land Types',
        options: [
          'All Land Types',
          'Residential Plot',
          'Gated Community Villa Plot',
          'Agricultural Land / Farmhouse',
          'Commercial Plot',
          'Industrial Land',
        ],
      },
      {
        id: 'plotArea',
        label: 'Plot Size',
        defaultValue: 'Any Size',
        options: [
          'Any Size',
          'Under 1,200 sq.ft',
          '1,200 – 2,400 sq.ft',
          '2,400 – 5,000 sq.ft',
          '5,000+ sq.ft / 1+ Acre',
        ],
      },
      {
        id: 'budget',
        label: 'Budget',
        defaultValue: 'Any Budget',
        options: [
          'Any Budget',
          'Under ₹ 25 Lakhs',
          '₹ 25L – ₹ 60L',
          '₹ 60L – ₹ 1.5 Cr',
          '₹ 1.5 – ₹ 3.5 Cr',
          'Above ₹ 3.5 Cr',
        ],
      },
    ],
  },
  commercial: {
    fields: [
      {
        id: 'commercialType',
        label: 'Commercial Type',
        defaultValue: 'All Commercial Types',
        options: [
          'All Commercial Types',
          'Ready Office Space',
          'Bare Shell Office',
          'Retail Shop / Showroom',
          'Commercial Building',
          'Warehouse / Godown',
        ],
      },
      {
        id: 'dealType',
        label: 'Transaction',
        defaultValue: 'Buy or Lease',
        options: [
          'Buy or Lease',
          'Buy / Outright Purchase',
          'Lease / Rent',
        ],
      },
      {
        id: 'budget',
        label: 'Budget',
        defaultValue: 'Any Budget',
        options: [
          'Any Budget',
          'Rent: ₹ 30k – ₹ 1.5L / mo',
          'Rent: ₹ 1.5L – ₹ 5L / mo',
          'Buy: ₹ 50L – ₹ 2 Cr',
          'Buy: ₹ 2 Cr – ₹ 10 Cr+',
        ],
      },
    ],
  },
};

export default function QuickFinderWidget({ onFilterSubmit, selectedCity, onCityChange }) {
  const { isMobile, isTablet } = useResponsive();
  const [activeTab, setActiveTab] = useState('buy');
  const [locality, setLocality] = useState('');
  const [localitySearch, setLocalitySearch] = useState('');
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const locationPickerRef = useRef(null);

  // Dynamic field values state keyed by tab and field id
  const [fieldValues, setFieldValues] = useState({});

  // Active City
  const currentCity = selectedCity || CITIES.find(c => c.id === 'mumbai') || CITIES[0];
  const cityKey = (currentCity?.id || 'mumbai').toLowerCase();
  const availableLocalities = CITY_LOCALITIES[cityKey] || CITY_LOCALITIES.mumbai || [];

  // Filtered localities based on typing in active city
  const matchingLocalities = availableLocalities.filter(l => 
    l.toLowerCase().includes(localitySearch.trim().toLowerCase())
  );

  // Cross-city matching if typing
  const otherCityMatches = [];
  if (localitySearch.trim().length >= 2) {
    const term = localitySearch.trim().toLowerCase();
    Object.keys(CITY_LOCALITIES).forEach(cId => {
      if (cId !== cityKey) {
        const cityObj = CITIES.find(c => c.id === cId) || { id: cId, name: cId.toUpperCase() };
        (CITY_LOCALITIES[cId] || []).forEach(loc => {
          if (loc.toLowerCase().includes(term)) {
            otherCityMatches.push({ loc, cityObj });
          }
        });
      }
    });
  }

  // Close location dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (locationPickerRef.current && !locationPickerRef.current.contains(e.target)) {
        setIsLocationDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Set field value helper
  const handleFieldChange = (tabId, fieldId, value) => {
    setFieldValues(prev => ({
      ...prev,
      [`${tabId}_${fieldId}`]: value,
    }));
  };

  const getFieldValue = (tabId, fieldId, defaultVal) => {
    return fieldValues[`${tabId}_${fieldId}`] || defaultVal;
  };

  const currentSchema = TAB_SCHEMAS[activeTab] || TAB_SCHEMAS.buy;

  const handleSearch = (e) => {
    e?.preventDefault();
    if (onFilterSubmit) {
      // Gather active fields
      const activeData = {};
      currentSchema.fields.forEach(f => {
        const val = getFieldValue(activeTab, f.id, f.defaultValue);
        activeData[f.id] = (val === f.defaultValue || val.startsWith('All') || val.startsWith('Any')) ? '' : val;
      });

      onFilterSubmit({
        tab: activeTab === 'new_projects' ? 'projects' : activeTab,
        city: currentCity.name,
        locality: locality.trim(),
        query: locality.trim() ? `${locality.trim()}, ${currentCity.name}` : currentCity.name,
        ...activeData,
      });
    }
  };

  const handleSelectCity = (cityObj) => {
    if (onCityChange) {
      onCityChange(cityObj);
    }
    setLocality('');
    setLocalitySearch('');
  };

  const handleSelectLocality = (locName) => {
    setLocality(locName);
    setIsLocationDropdownOpen(false);
    setLocalitySearch('');
  };

  return (
    <div style={{
      width: '100%',
      maxWidth: '920px',
      background: '#FFFFFF',
      borderRadius: '22px',
      boxShadow: '0 20px 48px rgba(11, 31, 68, 0.12)',
      border: '1px solid rgba(226, 232, 240, 0.95)',
      padding: isMobile ? '14px 14px 16px' : '16px 22px 18px',
      fontFamily: 'Inter, sans-serif',
      boxSizing: 'border-box',
      position: 'relative',
    }}>
      {/* ── 1. Search Tabs Bar ── */}
      <div
        className="hide-scrollbar"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
          borderBottom: '1px solid #EEF2F6',
          paddingBottom: '12px',
          marginBottom: '16px',
          overflowX: 'auto',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '14px',
                fontWeight: isActive ? 700 : 500,
                color: isActive ? '#0866F5' : '#475569',
                cursor: 'pointer',
                position: 'relative',
                padding: '4px 2px',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span>{tab.label}</span>
              {isActive && (
                <span style={{
                  position: 'absolute',
                  bottom: '-13px',
                  left: 0,
                  right: 0,
                  height: '2.5px',
                  background: '#0866F5',
                  borderRadius: '3px 3px 0 0',
                }} />
              )}
            </button>
          );
        })}
      </div>

      {/* ── 2. Unified Search Inputs Container ── */}
      <form onSubmit={handleSearch} style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        flexWrap: 'wrap',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          flex: 1,
          minWidth: isMobile ? '100%' : '240px',
          background: '#F8FAFC',
          borderRadius: '14px',
          border: '1.5px solid #E2E8F0',
          padding: '6px 12px',
          gap: '10px',
          position: 'relative',
        }}>
          
          {/* ── Field 1: ACCURATE INTERACTIVE LOCATION ── */}
          <div 
            ref={locationPickerRef}
            style={{
              position: 'relative',
              flex: 1.3,
              minWidth: '150px',
            }}
          >
            <div 
              onClick={() => setIsLocationDropdownOpen(prev => !prev)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                userSelect: 'none',
                padding: '4px 0',
              }}
              title="Click to change city or select verified locality"
            >
              <div style={{
                width: '30px',
                height: '30px',
                borderRadius: '8px',
                background: '#EEF5FF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <MapPin size={16} color="#0866F5" />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <span style={{ 
                    fontSize: '13px', 
                    fontWeight: 700, 
                    color: '#0F172A',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}>
                    {locality || currentCity?.name || 'Mumbai'}
                  </span>
                  <ChevronDown size={13} color="#64748B" />
                </div>
                
                <span style={{ 
                  fontSize: '11px', 
                  color: locality ? '#0866F5' : '#94A3B8',
                  fontWeight: locality ? 600 : 400,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}>
                  {locality ? `${currentCity.name} • Click to change` : 'Select locality / area'}
                </span>
              </div>

              {locality && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLocality('');
                  }}
                  style={{
                    border: 'none',
                    background: '#E2E8F0',
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: '#475569',
                    fontSize: '10px',
                  }}
                  title="Clear locality"
                >
                  <X size={10} />
                </button>
              )}
            </div>

            {/* ── ACCURATE LOCATION DROPDOWN POPOVER ── */}
            {isLocationDropdownOpen && (
              <div style={{
                position: 'absolute',
                top: 'calc(100% + 12px)',
                left: isMobile ? '0' : '-12px',
                width: 'min(340px, calc(100vw - 32px))',
                maxWidth: 'calc(100vw - 32px)',
                background: '#FFFFFF',
                borderRadius: '16px',
                boxShadow: '0 20px 45px rgba(11, 31, 68, 0.22)',
                border: '1px solid #E2E8F0',
                padding: '16px',
                zIndex: 100,
                fontFamily: 'Inter, sans-serif',
                animation: 'fadeIn 0.15s ease',
                boxSizing: 'border-box',
              }}>
                {/* Header: Switch Metro City */}
                <div style={{ marginBottom: '12px' }}>
                  <span style={{
                    fontSize: '10.5px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    color: '#64748B',
                    display: 'block',
                    marginBottom: '8px',
                  }}>
                    Select Metro Region
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {CITIES.map(c => {
                      const isCitySelected = (currentCity?.id || '').toLowerCase() === c.id.toLowerCase();
                      return (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => handleSelectCity(c)}
                          style={{
                            padding: '4px 10px',
                            borderRadius: '20px',
                            fontSize: '11px',
                            fontWeight: isCitySelected ? 700 : 500,
                            border: isCitySelected ? '1px solid #0866F5' : '1px solid #E2E8F0',
                            background: isCitySelected ? '#0866F5' : '#F8FAFC',
                            color: isCitySelected ? '#FFFFFF' : '#334155',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease',
                          }}
                        >
                          {c.name}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div style={{ height: '1px', background: '#F1F5F9', margin: '10px 0' }} />

                {/* Filter / Search Locality Input */}
                <div style={{ marginBottom: '10px' }}>
                  <span style={{
                    fontSize: '10.5px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    color: '#64748B',
                    display: 'block',
                    marginBottom: '6px',
                  }}>
                    Search Locality in {currentCity.name}
                  </span>
                  <div style={{ position: 'relative' }}>
                    <Search size={13} color="#94A3B8" style={{ position: 'absolute', left: '10px', top: '10px' }} />
                    <input
                      type="text"
                      placeholder={`e.g. Bandra, Powai, Worli...`}
                      value={localitySearch}
                      onChange={(e) => setLocalitySearch(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '7px 10px 7px 30px',
                        fontSize: '12px',
                        border: '1.5px solid #CBD5E1',
                        borderRadius: '10px',
                        outline: 'none',
                        boxSizing: 'border-box',
                        background: '#FFFFFF',
                        color: '#0F172A',
                        fontWeight: 500,
                      }}
                      autoFocus
                    />
                  </div>
                </div>

                {/* Verified Locality Chips / List */}
                <div style={{ maxHeight: '180px', overflowY: 'auto' }}>
                  {matchingLocalities.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                      {/* Option to select entire city */}
                      <button
                        type="button"
                        onClick={() => handleSelectLocality('')}
                        style={{
                          padding: '7px 10px',
                          textAlign: 'left',
                          fontSize: '12px',
                          fontWeight: !locality ? 700 : 500,
                          borderRadius: '8px',
                          border: 'none',
                          background: !locality ? '#EEF5FF' : 'transparent',
                          color: !locality ? '#0866F5' : '#1E293B',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}
                      >
                        <span>All of {currentCity.name}</span>
                        {!locality && <Check size={14} color="#0866F5" />}
                      </button>

                      {matchingLocalities.map((loc) => {
                        const isLocActive = locality === loc;
                        return (
                          <button
                            key={loc}
                            type="button"
                            onClick={() => handleSelectLocality(loc)}
                            style={{
                              padding: '7px 10px',
                              textAlign: 'left',
                              fontSize: '12px',
                              fontWeight: isLocActive ? 700 : 500,
                              borderRadius: '8px',
                              border: 'none',
                              background: isLocActive ? '#EEF5FF' : 'transparent',
                              color: isLocActive ? '#0866F5' : '#334155',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                            }}
                          >
                            <span>{loc}</span>
                            {isLocActive && <Check size={14} color="#0866F5" />}
                          </button>
                        );
                      })}
                      </div>
                  ) : null}

                  {/* Matches in other metro regions */}
                  {otherCityMatches.length > 0 && (
                    <div style={{ marginTop: '8px', borderTop: '1px dashed #E2E8F0', paddingTop: '8px' }}>
                      <span style={{
                        fontSize: '10px',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        color: '#64748B',
                        display: 'block',
                        marginBottom: '4px',
                        padding: '0 4px',
                      }}>
                        Matches in other metro regions:
                      </span>
                      {otherCityMatches.slice(0, 6).map(({ loc, cityObj }) => (
                        <button
                          key={`${cityObj.id}-${loc}`}
                          type="button"
                          onClick={() => {
                            handleSelectCity(cityObj);
                            handleSelectLocality(loc);
                          }}
                          style={{
                            width: '100%',
                            padding: '6px 10px',
                            textAlign: 'left',
                            fontSize: '12px',
                            borderRadius: '8px',
                            border: 'none',
                            background: 'transparent',
                            color: '#1E293B',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            transition: 'background 0.15s ease',
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = '#F8FAFC'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                        >
                          <span style={{ fontWeight: 600 }}>{loc}</span>
                          <span style={{
                            fontSize: '10px',
                            fontWeight: 700,
                            background: '#EEF5FF',
                            color: '#0866F5',
                            padding: '2px 8px',
                            borderRadius: '12px',
                          }}>
                            {cityObj.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}

                  {matchingLocalities.length === 0 && otherCityMatches.length === 0 && localitySearch.trim() && (
                    <div style={{ padding: '12px 6px', textAlign: 'center', fontSize: '12px', color: '#64748B' }}>
                      No locality matching "{localitySearch}".
                      <button
                        type="button"
                        onClick={() => handleSelectLocality(localitySearch.trim())}
                        style={{
                          display: 'block',
                          margin: '6px auto 0',
                          background: '#0866F5',
                          color: '#FFFFFF',
                          border: 'none',
                          borderRadius: '6px',
                          padding: '4px 10px',
                          fontSize: '11px',
                          cursor: 'pointer',
                          fontWeight: 600,
                        }}
                      >
                        Use "{localitySearch.trim()}"
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div style={{ width: '1px', height: '28px', background: '#E2E8F0', flexShrink: 0 }} />

          {/* ── Fields 2, 3, 4: DYNAMIC TAB-SPECIFIC FIELDS ── */}
          {currentSchema.fields.map((field, idx) => {
            const currentVal = getFieldValue(activeTab, field.id, field.defaultValue);
            const isPlaceholder = currentVal === field.defaultValue || currentVal.startsWith('All') || currentVal.startsWith('Any');

            return (
              <React.Fragment key={field.id}>
                <div style={{
                  position: 'relative',
                  flex: 1,
                  minWidth: '105px',
                  display: 'flex',
                  alignItems: 'center',
                }}>
                  <select
                    value={currentVal}
                    onChange={(e) => handleFieldChange(activeTab, field.id, e.target.value)}
                    style={{
                      width: '100%',
                      background: 'transparent',
                      border: 'none',
                      outline: 'none',
                      fontSize: '13px',
                      fontWeight: isPlaceholder ? 500 : 700,
                      color: isPlaceholder ? '#64748B' : '#0F172A',
                      cursor: 'pointer',
                      appearance: 'none',
                      paddingRight: '18px',
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                    }}
                    title={field.label}
                  >
                    {field.options.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                  <ChevronDown size={13} color="#64748B" style={{ position: 'absolute', right: '0', pointerEvents: 'none' }} />
                </div>

                {idx < currentSchema.fields.length - 1 && (
                  <div style={{ width: '1px', height: '28px', background: '#E2E8F0', flexShrink: 0 }} />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* ── Field 5: Prominent Royal Blue Search Button ── */}
        <button
          type="submit"
          style={{
            background: '#0866F5',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '40px',
            padding: '13px 30px',
            fontSize: '14px',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            width: isMobile ? '100%' : 'auto',
            flexShrink: 0,
            boxShadow: '0 4px 14px rgba(8, 102, 245, 0.3)',
            transition: 'background 0.15s ease, transform 0.15s ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = '#0653CA'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = '#0866F5'; }}
        >
          <Search size={16} color="#FFFFFF" strokeWidth={2.4} />
          <span>Search</span>
        </button>
      </form>

      {/* ── 3. Quick Popular Localities Chips Strip ── */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginTop: '12px',
        overflowX: 'auto',
        scrollbarWidth: 'none',
      }}>
        <span style={{
          fontSize: '11px',
          fontWeight: 700,
          color: '#64748B',
          whiteSpace: 'nowrap',
          textTransform: 'uppercase',
          letterSpacing: '0.04em',
        }}>
          Popular in {currentCity.name}:
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'nowrap' }}>
          {availableLocalities.slice(0, 5).map((loc) => {
            const isCurrentLoc = locality === loc;
            return (
              <button
                key={loc}
                type="button"
                onClick={() => handleSelectLocality(isCurrentLoc ? '' : loc)}
                style={{
                  background: isCurrentLoc ? '#0866F5' : '#F1F5F9',
                  color: isCurrentLoc ? '#FFFFFF' : '#334155',
                  border: isCurrentLoc ? '1px solid #0866F5' : '1px solid #E2E8F0',
                  borderRadius: '16px',
                  padding: '3px 10px',
                  fontSize: '11px',
                  fontWeight: isCurrentLoc ? 700 : 500,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s ease',
                }}
              >
                {loc}
              </button>
            );
          })}
        </div>
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none !important;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
