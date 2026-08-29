import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';

const TABS = [
  { id: 'buy',       label: 'Buy' },
  { id: 'rent',      label: 'Rent' },
  { id: 'interiors', label: 'Interiors' },
  { id: 'materials', label: 'Materials' },
];

const TYPES_BY_TAB = {
  buy:       ['Luxury Apartment', 'Independent Villa', 'Sky Penthouse', 'Residential Plot'],
  rent:      ['Fully Furnished', 'Semi Furnished', 'Bare Shell', 'PG / Coliving'],
  interiors: ['Full Home Design', 'Modular Kitchen', 'Master Bedroom', 'Living Room'],
  materials: ['Cement & Concrete', 'Structural Steel', 'Tiles & Marble', 'Electricals'],
};

const BUDGETS_BY_TAB = {
  buy:       ['Under ₹ 50 Lakhs', '₹ 50L – ₹ 1.5 Cr', '₹ 1.5 – ₹ 3.5 Cr', 'Above ₹ 3.5 Cr'],
  rent:      ['Under ₹ 20K / mo', '₹ 20K – ₹ 60K / mo', '₹ 60K – ₹ 1.5L / mo', '₹ 1.5L+ / mo'],
  interiors: ['Under ₹ 5 Lakhs', '₹ 5L – ₹ 12L', '₹ 12L – ₹ 25L', 'Above ₹ 25L'],
  materials: ['Under ₹ 50,000', '₹ 50K – ₹ 5L', '₹ 5L – ₹ 50L', 'Above ₹ 50L'],
};

export default function QuickFinderWidget({ onFilterSubmit, selectedCity }) {
  const [activeTab, setActiveTab] = useState('buy');
  const [locality, setLocality] = useState('');
  const [type, setType] = useState('');
  const [budget, setBudget] = useState('');
  const [config, setConfig] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (onFilterSubmit) onFilterSubmit({ tab: activeTab, locality, type, budget, city: selectedCity?.name });
  };

  return (
    <div className="search-engine-wrapper">
      <div className="rr-container search-engine-inner">

        {/* Tabs — scrollable on mobile */}
        <div className="search-tabs" style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
          {TABS.map(t => (
            <button key={t.id} type="button"
              onClick={() => { setActiveTab(t.id); setType(''); setBudget(''); }}
              className={`search-tab${activeTab === t.id ? ' active' : ''}`}
              style={{ flexShrink: 0 }}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Search row — stacks on mobile */}
        <form onSubmit={handleSearch}>
          <div className="search-row">

            <div className="search-field">
              <label className="search-label">Locality / Landmark</label>
              <div style={{ position: 'relative' }}>
                <input type="text"
                  placeholder="e.g. Golf Course Rd, Whitefield…"
                  value={locality}
                  onChange={e => setLocality(e.target.value)}
                  className="search-input"
                  style={{ paddingLeft: '36px', width: '100%', boxSizing: 'border-box' }} />
                <MapPin size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#0B192C' }} />
              </div>
            </div>

            <div className="search-field">
              <label className="search-label">
                {activeTab === 'interiors' ? 'Room / Space' : activeTab === 'materials' ? 'Material Category' : 'Property Type'}
              </label>
              <select value={type} onChange={e => setType(e.target.value)} className="search-select">
                <option value="">Select type…</option>
                {TYPES_BY_TAB[activeTab].map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>

            <div className="search-field">
              <label className="search-label">Budget</label>
              <select value={budget} onChange={e => setBudget(e.target.value)} className="search-select">
                <option value="">Select budget…</option>
                {BUDGETS_BY_TAB[activeTab].map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>

            {(activeTab === 'buy' || activeTab === 'rent') && (
              <div className="search-field">
                <label className="search-label">Configuration</label>
                <select value={config} onChange={e => setConfig(e.target.value)} className="search-select">
                  <option value="">Any BHK</option>
                  <option value="1RK">1 RK / Studio</option>
                  <option value="1BHK">1 BHK</option>
                  <option value="2BHK">2 BHK</option>
                  <option value="3BHK">3 BHK</option>
                  <option value="4BHK+">4 BHK & Above</option>
                </select>
              </div>
            )}

            <button type="submit" className="search-submit" style={{ alignSelf: 'flex-end' }}>
              <Search size={15} />
              Search
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
