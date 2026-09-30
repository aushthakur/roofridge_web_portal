// Mock Data for Roof Ridge - Property & Home SuperApp Ecosystem (whattobuild.txt compliant)

export const CITIES = [
  { id: 'delhi', name: 'Delhi NCR', code: 'DEL', region: 'North' },
  { id: 'mumbai', name: 'Mumbai', code: 'BOM', region: 'West' },
  { id: 'bengaluru', name: 'Bengaluru', code: 'BLR', region: 'South' },
  { id: 'hyderabad', name: 'Hyderabad', code: 'HYD', region: 'South' },
  { id: 'pune', name: 'Pune', code: 'PNE', region: 'West' },
  { id: 'chennai', name: 'Chennai', code: 'MAA', region: 'South' },
  { id: 'kolkata', name: 'Kolkata', code: 'CCU', region: 'East' }
];

export const CATEGORIES = [
  { id: 'buy', name: 'Buy Property', badge: 'Verified RERA', icon: 'Home' },
  { id: 'rent', name: 'Rent & Manage', badge: '0% Brokerage', icon: 'Key' },
  { id: 'interiors', name: 'Modular Interiors', badge: '3D VR Tour', icon: 'Layout' },
  { id: 'construction', name: 'Construction & Build', badge: 'Turnkey Contract', icon: 'HardHat' },
  { id: 'materials', name: 'Building Materials', badge: 'B2B Factory Wholesale', icon: 'Layers' },
  { id: 'professionals', name: 'Skilled Pros & Mistris', badge: 'GPS On-Demand', icon: 'Users' },
  { id: 'maintenance', name: 'Home AMC & Repairs', badge: '24/7 Emergency', icon: 'Wrench' },
  { id: 'legal', name: 'Legal & Registry Desk', badge: 'Doorstep e-Sign', icon: 'FileText' },
  { id: 'myhub', name: 'My Property Hub', badge: 'Digital Locker', icon: 'ShieldCheck' },
  { id: 'experience', name: 'Experience Hubs', badge: 'Physical Showroom', icon: 'MapPin' }
];

export const HERO_SLIDES = [
  {
    id: 1,
    title: 'India\'s Premier Property & Home Services SuperApp',
    subtitle: 'Buy verified homes, hire civil contractors, order factory wholesale cement & book 24/7 plumbers under one roof.',
    tag: 'INTEGRATED SUPERAPP ECOSYSTEM',
    ctaText: 'Explore Verified Properties',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=80',
    offerCode: 'SUPER2026',
    cashback: 'Flat ₹50,000 Booking Cashback'
  },
  {
    id: 2,
    title: 'Turnkey Modular Interiors & Smart Construction',
    subtitle: 'Get 3D VR walkthroughs, 100% Flat 10-Year Warranty, and guaranteed 45-day installation.',
    tag: 'DESIGN & BUILD EXCELLENCE',
    ctaText: 'Book Free 3D VR Consultation',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80',
    offerCode: 'DESIGNS3D',
    cashback: 'Free VR Home Design Blueprint'
  },
  {
    id: 3,
    title: 'B2B Wholesale Building Materials & Site Delivery',
    subtitle: 'Direct factory rates for UltraTech Cement, TATA Tiscon TMT Steel & Kajaria Tiles across 35+ cities.',
    tag: 'FACTORY DIRECT SUPPLY CHAIN',
    ctaText: 'View Wholesale Price Index',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1400&q=80',
    offerCode: 'BULKSTEEL',
    cashback: 'Up to 15% Volume Rebate'
  }
];

export const PROMO_CARDS = [
  {
    id: 1,
    title: 'Glow with Luxury Modular Kitchens',
    subtitle: 'Custom German-engineered soft-close cabinetry with marine ply carcase',
    tag: 'UP TO 40% OFF',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    title: 'Commercial IT Parks & Office Assets',
    subtitle: 'Pre-leased high yield commercial spaces with 8.5% net rental yield',
    tag: '8.5% NET ROI',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80'
  }
];

export const VALUE_PROPS = [
  {
    id: 1,
    title: '50,000+ Verified Listings',
    desc: 'Strict 100-point physical verification & RERA title audit',
    icon: 'ShieldCheck'
  },
  {
    id: 2,
    title: 'Turnkey Civil & Interiors',
    desc: 'Contractors, Architects & Modular Interior Designers',
    icon: 'Compass'
  },
  {
    id: 3,
    title: 'Factory Wholesale Materials',
    desc: 'Direct manufacturer pricing for cement, steel & tiles',
    icon: 'Truck'
  },
  {
    id: 4,
    title: 'On-Demand Skilled Workforce',
    desc: 'GPS verified Mistris, Plumbers, Electricians & Shuttering crew',
    icon: 'BadgePercent'
  }
];

export const PROPERTIES = [
  {
    id: 'prop-101',
    title: 'The Skyview Crest 4BHK Sky Penthouse',
    location: 'Golf Course Road, Gurgaon, Delhi NCR',
    price: '₹ 4.85 Cr',
    originalPrice: '₹ 5.20 Cr',
    specs: '4 BHK • 3,450 sq.ft • Furnished',
    rating: 4.9,
    reviewsCount: 42,
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
    badge: 'RERA Verified',
    tagType: 'rera',
    type: 'buy',
    discount: 'Save 35L',
    isTrending: true
  },
  {
    id: 'prop-102',
    title: 'Botanica Eco Villa & Private Lawn',
    location: 'Whitefield, Bengaluru',
    price: '₹ 2.95 Cr',
    originalPrice: '₹ 3.15 Cr',
    specs: '3 BHK Villa • 2,800 sq.ft • Gated',
    rating: 4.8,
    reviewsCount: 38,
    image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80',
    badge: 'Ready to Move',
    tagType: 'offer',
    type: 'buy',
    discount: '30% Price Drop',
    isTrending: true
  },
  {
    id: 'prop-103',
    title: 'Azure Oceanfront Skyline Apartment',
    location: 'Worli Sea Face, Mumbai',
    price: '₹ 1.80 Lakh / mo',
    originalPrice: '₹ 2.10 Lakh',
    specs: '3 BHK • 2,100 sq.ft • Sea View',
    rating: 5.0,
    reviewsCount: 19,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    badge: 'Zero Brokerage',
    tagType: 'rera',
    type: 'rent',
    discount: 'Furnished',
    isTrending: false
  },
  {
    id: 'prop-104',
    title: 'Scandinavian Luxury Modular Villa Interior',
    location: 'Banjara Hills, Hyderabad',
    price: '₹ 12.50 Lakh',
    originalPrice: '₹ 15.00 Lakh',
    specs: 'Full Home Interior • 45 Day Delivery',
    rating: 4.9,
    reviewsCount: 64,
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
    badge: '10-Yr Warranty',
    tagType: 'offer',
    type: 'interiors',
    discount: 'FLAT 20% OFF',
    isTrending: true
  }
];

export const SKILLED_PROFESSIONALS = [
  {
    id: 'pro-1',
    name: 'Master Civil Mistri & Lenter Crew',
    category: 'Construction & Civil Work',
    experience: '14+ Years Exp',
    rating: 4.9,
    jobsDone: 340,
    rate: '₹ 750 / day',
    availability: 'Available Today',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=600&q=80',
    skills: ['Brickwork', 'Lenter Shuttering', 'Plastering', 'Concrete Pouring']
  },
  {
    id: 'pro-2',
    name: 'Certified Senior Master Plumber',
    category: 'Home Maintenance',
    experience: '10+ Years Exp',
    rating: 4.95,
    jobsDone: 510,
    rate: '₹ 499 / visit',
    availability: '30-Min Emergency Response',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80',
    skills: ['Pipeline Leakage', 'Bath Fitting', 'Pressure Pump', 'Sewer Unclog']
  },
  {
    id: 'pro-3',
    name: 'Licensed High-Voltage Electrician',
    category: 'Home Maintenance',
    experience: '12+ Years Exp',
    rating: 4.88,
    jobsDone: 420,
    rate: '₹ 399 / visit',
    availability: 'Available Today',
    image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=600&q=80',
    skills: ['Three-Phase Wiring', 'MCB Tripping', 'Solar Grid Connection', 'Inverter Setup']
  },
  {
    id: 'pro-4',
    name: 'Italian Marble & Flooring Specialist',
    category: 'Home Finishing',
    experience: '15+ Years Exp',
    rating: 4.92,
    jobsDone: 280,
    rate: '₹ 45 / sq.ft',
    availability: 'Book for Tomorrow',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80',
    skills: ['Statuario Polishing', 'Vitrified Tile Laying', 'Epoxy Grouting', 'Skirting']
  }
];

export const BUILDING_MATERIALS = [
  {
    id: 'mat-1',
    name: 'UltraTech Super Premium Cement (50kg)',
    category: 'Cement & Concrete',
    price: '₹ 385 / bag',
    originalPrice: '₹ 430 / bag',
    moq: 'MOQ: 50 bags',
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=600&q=80',
    rating: 4.9
  },
  {
    id: 'mat-2',
    name: 'TATA Tiscon 500D TMT Rebars (12mm)',
    category: 'Structural Steel',
    price: '₹ 64,500 / ton',
    originalPrice: '₹ 68,000 / ton',
    moq: 'MOQ: 2 tons',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80',
    rating: 4.8
  },
  {
    id: 'mat-3',
    name: 'Kajaria Glazed Vitrified Tiles (800x1600mm)',
    category: 'Flooring Tiles',
    price: '₹ 85 / sq.ft',
    originalPrice: '₹ 110 / sq.ft',
    moq: 'MOQ: 500 sq.ft',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80',
    rating: 4.9
  },
  {
    id: 'mat-4',
    name: 'Schneider Electric Smart Automation Switch Kit',
    category: 'Electricals & Smart',
    price: '₹ 45,000 / kit',
    originalPrice: '₹ 58,000 / kit',
    moq: 'MOQ: 1 kit',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=600&q=80',
    rating: 5.0
  }
];

export const AMC_PACKAGES = [
  {
    id: 'amc-1',
    name: 'Essential Home Protect AMC',
    price: '₹ 4,999 / year',
    servicesCount: '12 Visits Included',
    features: [
      'Quarterly Plumbing Inspection',
      'Quarterly Electrical Audit',
      '2 Emergency Plumbing Visits',
      '1 Full House Deep Cleaning'
    ],
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'amc-2',
    name: 'Premium Villa & Penthouse Care AMC',
    price: '₹ 11,999 / year',
    servicesCount: '24 Visits Included',
    features: [
      'Bi-Monthly Electrical & AC Service',
      'Unlimited Emergency Plumbing Response',
      'Semi-Annual Herbal Pest Control',
      'Solar Panel Maintenance & Cleaning'
    ],
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80'
  }
];

export const LEGAL_SERVICES = [
  {
    id: 'leg-1',
    title: 'Sale Deed Drafting & Registry Assistance',
    price: '₹ 7,500 flat',
    turnaround: '48 Hours',
    desc: 'End-to-end legal title verification, stamp duty calculation, e-Sign drafting and physical registrar office assistance.',
    image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'leg-2',
    title: 'Property Title Search Report (30-Year History)',
    price: '₹ 4,999 flat',
    turnaround: '24 Hours',
    desc: 'Thorough search of municipal records, court litigation history, encumbrance certificate (EC) and bank lien check.',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80'
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Ananya & Vikram Sharma',
    role: 'Homeowner, Gurgaon',
    quote: 'Roof Ridge transformed our bare 4BHK into a Scandinavian masterpiece in just 40 days! Hiring civil mistris and ordering UltraTech cement directly on the app saved us lakhs.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 2,
    name: 'Rajesh K. Singhania',
    role: 'Managing Director, Apex Builders',
    quote: 'As a property developer, listing our RERA registered projects on Roof Ridge yielded 3x verified leads compared to traditional portals.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
  }
];
