import React, { useState } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';

const NAV_ITEMS = [
  {
    id: 'buy',
    label: 'Buy Properties',
    cols: [
      { heading: 'Residential', links: ['3 BHK Luxury Apartments', '4 BHK Sky Penthouses', 'Independent Eco Villas', 'Residential Plots', 'Gated Communities'] },
      { heading: 'Commercial', links: ['IT Park Office Spaces', 'High-Street Retail', 'Pre-Leased (8.5% ROI)', 'Industrial Warehouses'] },
      { heading: 'Top Localities', links: ['Golf Course Rd, Gurgaon', 'Whitefield, Bengaluru', 'Worli Sea Face, Mumbai', 'Banjara Hills, Hyderabad', 'BKC Commercial Hub'] },
      { heading: 'Budget', links: ['Under ₹ 50 Lakhs', '₹ 50L – ₹ 1.5 Cr', '₹ 1.5 – ₹ 3.5 Cr', 'Above ₹ 3.5 Cr'] },
    ],
    promo: {
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80',
      label: 'Featured Residence',
      title: 'Skyview Crest 4BHK Penthouse',
      cta: 'Explore Residence',
    }
  },
  {
    id: 'rent',
    label: 'Rent & Manage',
    cols: [
      { heading: 'Residential Rentals', links: ['Fully Furnished 2BHK', 'Luxury 3BHK Apartments', 'Studio Apartments', 'Penthouse Rentals'] },
      { heading: 'Rental Management', links: ['Automated Rent Collection', 'Tenant Verification', 'Periodic Inspection', 'Deposit Protection'] },
      { heading: 'Commercial Leasing', links: ['Coworking Desks', 'Corporate HQ', 'Retail Showroom Space'] },
    ],
    promo: {
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80',
      label: 'Zero Brokerage',
      title: 'Zero Brokerage Rental Homes',
      cta: 'Browse Rentals',
    }
  },
  {
    id: 'construction',
    label: 'House Construction',
    cols: [
      { heading: 'House Building', links: ['Complete House Builders', 'Soil Testing & Foundation', 'Brickwork & Plastering', 'Structural Engineering'] },
      { heading: 'Roofing & Concrete', links: ['Slab Shuttering Crew', 'Concrete Pouring', 'Steel Rebar Binding'] },
      { heading: 'House Plans & Maps', links: ['Municipal Sanction Maps', '3D Front Elevations', 'Vastu Compliant Plans', 'Structural Designs'] },
    ],
    promo: {
      image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=600&q=80',
      label: 'Build Your Home',
      title: 'Calculate Your Building Budget Instantly',
      cta: 'Estimate Cost',
    }
  },
  {
    id: 'interiors',
    label: 'Home Interiors',
    cols: [
      { heading: 'Modular Kitchens', links: ['L-Shape Kitchens', 'Island Kitchen Layouts', 'Parallel Kitchens', 'U-Shape Kitchens'] },
      { heading: 'Wardrobes & Storage', links: ['Acrylic Wardrobes', 'PU Gloss Finish', 'Walk-in Closets', 'TV Media Units'] },
      { heading: 'Interior Themes', links: ['Modern Minimalist', 'Warm Contemporary', 'Italian Luxe Style', 'False Ceiling & Lighting'] },
    ],
    promo: {
      image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80',
      label: 'Home Interiors',
      title: 'Modern Modular Kitchens — 45-day handover',
      cta: 'View Kitchen Designs',
    }
  },
  {
    id: 'materials',
    label: 'Building Materials',
    cols: [
      { heading: 'Cement & Concrete', links: ['UltraTech Super Cement', 'ACC Concrete (50kg)', 'JK Super Cement', 'Ready Mix Concrete'] },
      { heading: 'Steel Rods (Sariya)', links: ['TATA Tiscon 500D', 'JSW Neo Steel', 'Jindal Panther TMT'] },
      { heading: 'Tiles & Marble', links: ['Kajaria Vitrified Tiles', 'Imported Italian Marble', 'Granite Countertops', 'Wooden Flooring'] },
      { heading: 'Electricals', links: ['Schneider Smart Kits', 'Havells Wires & Cables', 'Legrand Modular Switches'] },
    ],
    promo: {
      image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=600&q=80',
      label: 'Wholesale Rates',
      title: 'Direct Factory Wholesale Price List',
      cta: 'View Material Prices',
    }
  },
  {
    id: 'professionals',
    label: 'Hire Workers',
    cols: [
      { heading: 'Construction Workers', links: ['Master Civil Mason (Mistri)', 'Shuttering Workers', 'Labour Contractors', 'Brickwork Workers'] },
      { heading: 'Repair Technicians', links: ['Expert Plumbers', 'Licensed Electricians', 'Custom Carpenters'] },
      { heading: 'Finishing Experts', links: ['Marble Polishers', 'Tile Layers', 'False Ceiling & POP Crew'] },
    ],
    promo: {
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80',
      label: 'Verified Pros',
      title: 'Hire Verified Masons, Plumbers & Electricians',
      cta: 'Book Workers',
    }
  },
  {
    id: 'maintenance',
    label: 'Repairs & Care',
    cols: [
      { heading: 'Annual Care Plans', links: ['Essential Home Care Plan', 'Villa Care Plan', 'Commercial Care Plan'] },
      { heading: 'Cleaning & Care', links: ['Full Home Deep Cleaning', 'Herbal Pest Control', 'Solar Panel Cleaning', 'Water Tank Cleaning'] },
      { heading: 'Emergency Services', links: ['30-Min Emergency Van', 'Emergency Plumbing', 'Emergency Electrical', '24/7 Lockout Support'] },
    ],
    promo: {
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80',
      label: 'Emergency Help',
      title: '30-Minute Emergency Repair Van',
      cta: 'Call Emergency Help',
    }
  },
  {
    id: 'loans',
    label: 'Loans & Paperwork',
    cols: [
      { heading: 'Home Loans', links: ['SBI Home Loan (8.1%)', 'HDFC Home Loans', 'ICICI Balance Transfer', 'EMI Calculator'] },
      { heading: 'Legal & Papers', links: ['Sale Deed Drafting', '30-Year Title Search', 'Encumbrance Certificate', 'Property Tax & Mutation'] },
    ],
    promo: {
      image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80',
      label: 'Legal Desk',
      title: 'Legal Paperwork Check & Home Loan Assistance',
      cta: 'Check Property Papers',
    }
  },
];

export default function CategoryNavbar({ activeCategory, onSelectCategory }) {
  const [open, setOpen] = useState(null);

  const active = NAV_ITEMS.find(n => n.id === open);

  return (
    <nav
      className="category-navbar"
      onMouseLeave={() => setOpen(null)}
    >
      <div className="rr-container category-nav-container">
        {NAV_ITEMS.map(item => (
          <div
            key={item.id}
            className={`category-nav-item${(activeCategory === item.id || open === item.id) ? ' active' : ''}`}
            onMouseEnter={() => setOpen(item.id)}
            onClick={() => { onSelectCategory(item.id); setOpen(null); }}
          >
            <span>{item.label}</span>
            <ChevronDown
              size={12}
              style={{
                transform: open === item.id ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s',
                color: open === item.id ? '#0B192C' : '#9CA3AF',
              }}
            />
          </div>
        ))}
      </div>

      {/* Full-width mega menu */}
      {active && (
        <div
          className="mega-menu animate-mega"
          onMouseEnter={() => setOpen(active.id)}
          onMouseLeave={() => setOpen(null)}
        >
          <div className="rr-container">
            <div className="mega-menu-inner" style={{ gridTemplateColumns: active.cols.length >= 4 ? '1fr 320px' : '1fr 320px' }}>

              {/* Columns */}
              <div
                className="mega-menu-cols"
                style={{ gridTemplateColumns: `repeat(${Math.min(active.cols.length, 4)}, 1fr)` }}
              >
                {active.cols.map((col, ci) => (
                  <div key={ci} className="mega-menu-col">
                    <p className="mega-col-title">{col.heading}</p>
                    <ul className="mega-col-links">
                      {col.links.map((lnk, li) => (
                        <li key={li}>
                          <button
                            className="mega-col-link"
                            onClick={() => { onSelectCategory(active.id); setOpen(null); }}
                          >
                            {lnk}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Promo panel */}
              <div className="mega-menu-promo">
                <div className="mega-promo-image">
                  <img src={active.promo.image} alt={active.promo.title} />
                </div>
                <div className="mega-promo-content">
                  <span className="mega-promo-label">{active.promo.label}</span>
                  <p className="mega-promo-title">{active.promo.title}</p>
                  <button
                    className="mega-promo-cta"
                    onClick={() => { onSelectCategory(active.id); setOpen(null); }}
                  >
                    {active.promo.cta} <ArrowRight size={13} />
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
