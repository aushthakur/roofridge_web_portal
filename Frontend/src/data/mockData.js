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

export const CITY_LOCALITIES = {
  mumbai: [
    'Bandra West', 'Andheri West', 'Worli', 'Powai', 'Thane West',
    'Juhu', 'Navi Mumbai', 'Malad West', 'Alibaug Coastal', 'Lower Parel',
    'Goregaon East', 'Borivali West', 'Dadar', 'Kharghar'
  ],
  delhi: [
    'Neharpar (Greater Faridabad)', 'Sector 75-89, Faridabad', 'Golf Course Road, Gurgaon',
    'Sector 150, Noida', 'Cyber City, Gurgaon', 'Dwarka Expressway',
    'Greenfields Colony, Faridabad', 'Surajkund & Charmwood, Faridabad', 'Mathura Road, Faridabad',
    'Indirapuram, Ghaziabad', 'Greater Noida West', 'Sector 62, Noida',
    'Vasant Kunj, Delhi', 'Sohna Road, Gurgaon', 'Sector 14 & 15, Faridabad'
  ],
  bengaluru: [
    'Whitefield', 'Koramangala', 'Indiranagar', 'HSR Layout',
    'Electronic City', 'Bellandur', 'Hebbal', 'Sarjapur Road',
    'Jayanagar', 'Marathahalli'
  ],
  pune: [
    'Baner', 'Wakad', 'Hinjewadi IT Park', 'Kharadi',
    'Viman Nagar', 'Koregaon Park', 'Hadapsar', 'Aundh', 'Bavdhan'
  ],
  hyderabad: [
    'Hitec City', 'Gachibowli', 'Madhapur', 'Jubilee Hills',
    'Banjara Hills', 'Kondapur', 'Financial District', 'Kukatpally'
  ],
  chennai: [
    'OMR IT Corridor', 'Adyar', 'Anna Nagar', 'Velachery',
    'ECR Beach Road', 'T. Nagar', 'Porur', 'Guindy'
  ],
  kolkata: [
    'New Town', 'Salt Lake Sector V', 'Ballygunge', 'Rajarhat',
    'EM Bypass', 'Alipore', 'Park Street', 'Gariahat'
  ],
};

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
  // Buy Properties
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
    propertyType: 'Penthouse',
    bhk: '4 BHK+',
    city: 'mumbai',
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
    propertyType: 'Villa',
    bhk: '3 BHK',
    city: 'bengaluru',
    discount: '30% Price Drop',
    isTrending: true
  },
  {
    id: 'prop-105',
    title: 'Oberoi Sky Heights Luxury Apartment',
    location: 'Worli, South Mumbai',
    price: '₹ 6.40 Cr',
    originalPrice: '₹ 6.80 Cr',
    specs: '3 BHK • 2,250 sq.ft • Sea View',
    rating: 4.95,
    reviewsCount: 56,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    badge: 'RERA Verified',
    tagType: 'rera',
    type: 'buy',
    propertyType: 'Apartment',
    bhk: '3 BHK',
    city: 'mumbai',
    discount: 'Premium',
    isTrending: true
  },
  {
    id: 'prop-106',
    title: 'The Grandeur Palms Garden Duplex',
    location: 'Bandra West, Mumbai',
    price: '₹ 8.90 Cr',
    originalPrice: '₹ 9.50 Cr',
    specs: '4 BHK Duplex • 3,800 sq.ft • Private Terrace',
    rating: 5.0,
    reviewsCount: 29,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    badge: 'Exclusive',
    tagType: 'rera',
    type: 'buy',
    propertyType: 'Duplex',
    bhk: '4 BHK+',
    city: 'mumbai',
    discount: 'Zero Brokerage',
    isTrending: true
  },

  // Rent Properties
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
    propertyType: 'Furnished',
    bhk: '3 BHK',
    city: 'mumbai',
    discount: 'Furnished',
    isTrending: false
  },
  {
    id: 'prop-107',
    title: 'Palais Royale Designer Studio Flat',
    location: 'Bandra Kurla Complex (BKC), Mumbai',
    price: '₹ 85,000 / mo',
    originalPrice: '₹ 95,000',
    specs: '1 BHK • 720 sq.ft • Fully Furnished',
    rating: 4.85,
    reviewsCount: 22,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
    badge: 'Instant Move-in',
    tagType: 'offer',
    type: 'rent',
    propertyType: 'Furnished',
    bhk: '1 BHK',
    city: 'mumbai',
    discount: 'No Deposit Lock',
    isTrending: true
  },
  {
    id: 'prop-108',
    title: 'Hiranandani Zen Garden High-Rise',
    location: 'Powai, Mumbai',
    price: '₹ 1.25 Lakh / mo',
    originalPrice: '₹ 1.40 Lakh',
    specs: '2 BHK • 1,350 sq.ft • Lake View Balcony',
    rating: 4.9,
    reviewsCount: 31,
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
    badge: 'Verified Owner',
    tagType: 'rera',
    type: 'rent',
    propertyType: 'Semi Furnished',
    bhk: '2 BHK',
    city: 'mumbai',
    discount: '0% Brokerage',
    isTrending: true
  },

  // New Projects
  {
    id: 'prop-109',
    title: 'Godrej Horizon Serenity Towers',
    location: 'Dadar-Wadala, Mumbai',
    price: '₹ 2.85 Cr onwards',
    originalPrice: '₹ 3.10 Cr',
    specs: '2, 3 & 4 BHK • Possession Dec 2026',
    rating: 4.92,
    reviewsCount: 78,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    badge: 'New Launch',
    tagType: 'rera',
    type: 'projects',
    propertyType: 'Township',
    bhk: '3 BHK',
    city: 'mumbai',
    discount: 'Pre-launch Benefit',
    isTrending: true
  },
  {
    id: 'prop-110',
    title: 'Lodha Park Reserve — The Jewel Tower',
    location: 'Lower Parel, Mumbai',
    price: '₹ 5.25 Cr onwards',
    originalPrice: '₹ 5.80 Cr',
    specs: '3 & 4 BHK Sky Mansions • 7-Acre Park',
    rating: 4.98,
    reviewsCount: 104,
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    badge: 'RERA Approved',
    tagType: 'rera',
    type: 'projects',
    propertyType: 'Luxury Highrise',
    bhk: '4 BHK+',
    city: 'mumbai',
    discount: 'Save Up to 40L',
    isTrending: true
  },
  {
    id: 'prop-111',
    title: 'Prestige Waterfront Bay Residences',
    location: 'Marine Lines, Mumbai',
    price: '₹ 7.50 Cr onwards',
    originalPrice: '₹ 8.20 Cr',
    specs: '3 & 5 BHK • Arab Sea View • 2027 Handover',
    rating: 4.9,
    reviewsCount: 45,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    badge: 'Exclusive Launch',
    tagType: 'rera',
    type: 'projects',
    propertyType: 'Waterfront Tower',
    bhk: '3 BHK',
    city: 'mumbai',
    discount: 'Flexible 10:90',
    isTrending: true
  },

  // Plots & Land
  {
    id: 'prop-112',
    title: 'Alibaug Coastal Palm Villa Plots',
    location: 'Mandwa Jetty Road, Alibaug / Mumbai Outskirts',
    price: '₹ 1.45 Cr',
    originalPrice: '₹ 1.65 Cr',
    specs: '5,000 sq.ft • Clear NA Title • Gated Community',
    rating: 4.88,
    reviewsCount: 34,
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
    badge: 'Clear NA Title',
    tagType: 'rera',
    type: 'plot',
    propertyType: 'Residential Plot',
    bhk: 'Any',
    city: 'mumbai',
    discount: 'Instant Registry',
    isTrending: true
  },
  {
    id: 'prop-113',
    title: 'Lonavala Mist Valley Gated Estate Plot',
    location: 'Tungarli, Lonavala / Pune Corridor',
    price: '₹ 2.10 Cr',
    originalPrice: '₹ 2.40 Cr',
    specs: '8,400 sq.ft • Hill View • Clubhouse Access',
    rating: 4.94,
    reviewsCount: 27,
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80',
    badge: 'Collector Approved',
    tagType: 'rera',
    type: 'plot',
    propertyType: 'Estate Plot',
    bhk: 'Any',
    city: 'mumbai',
    discount: 'Freehold Land',
    isTrending: true
  },

  // Commercial
  {
    id: 'prop-114',
    title: 'One BKC Corporate HQ Grade-A Office',
    location: 'Bandra Kurla Complex (BKC), Mumbai',
    price: '₹ 14.80 Cr',
    originalPrice: '₹ 16.00 Cr',
    specs: '4,500 sq.ft • Pre-leased 8.4% Net Yield',
    rating: 4.96,
    reviewsCount: 52,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    badge: 'Pre-Leased ROI 8.4%',
    tagType: 'rera',
    type: 'commercial',
    propertyType: 'Office Space',
    bhk: 'Any',
    city: 'mumbai',
    discount: 'Immediate Rent Cashflow',
    isTrending: true
  },
  {
    id: 'prop-115',
    title: 'Lower Parel Boulevard High-Street Retail',
    location: 'Senapati Bapat Marg, Lower Parel, Mumbai',
    price: '₹ 6.90 Cr',
    originalPrice: '₹ 7.50 Cr',
    specs: '1,800 sq.ft • High Footfall Glass Facade',
    rating: 4.9,
    reviewsCount: 39,
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    badge: 'High Footfall',
    tagType: 'offer',
    type: 'commercial',
    propertyType: 'Retail Showroom',
    bhk: 'Any',
    city: 'mumbai',
    discount: 'Zero Brokerage',
    isTrending: true
  },

  // PG & Co-Living
  {
    id: 'prop-pg-1',
    title: 'Stanza Living Austin House — Premium Co-Living',
    location: 'Powai, Mumbai',
    price: '₹ 18,500 / mo',
    originalPrice: '₹ 21,000 / mo',
    specs: 'Single & Double Sharing • 3 Meals Included • 100 Mbps WiFi',
    rating: 4.9,
    reviewsCount: 86,
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
    badge: 'Meals Included',
    tagType: 'offer',
    type: 'pg',
    propertyType: 'Single Room',
    bhk: 'Single Room',
    city: 'mumbai',
    discount: 'Zero Deposit Lock',
    isTrending: true
  },
  {
    id: 'prop-pg-2',
    title: 'Zolo Stays Signature Suites — Luxury PG for Pros',
    location: 'Whitefield, Bengaluru',
    price: '₹ 14,000 / mo',
    originalPrice: '₹ 16,500 / mo',
    specs: 'Double Sharing • Attached Washroom • Biometric Security',
    rating: 4.85,
    reviewsCount: 52,
    image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80',
    badge: 'Verified Staff',
    tagType: 'rera',
    type: 'pg',
    propertyType: 'Double Sharing',
    bhk: 'Double Sharing',
    city: 'bengaluru',
    discount: 'No Brokerage',
    isTrending: true
  },
  {
    id: 'prop-pg-3',
    title: 'Housr Coliving Qube — Executive PG & Studio',
    location: 'Sector 150, Noida, Delhi NCR',
    price: '₹ 16,500 / mo',
    originalPrice: '₹ 19,000 / mo',
    specs: 'Single Room • Food Mess • Daily Housekeeping & Gym',
    rating: 4.92,
    reviewsCount: 64,
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80',
    badge: 'Executive PG',
    tagType: 'offer',
    type: 'pg',
    propertyType: 'Single Room',
    bhk: 'Single Room',
    city: 'delhi',
    discount: 'Instant Move-in',
    isTrending: true
  },
  {
    id: 'prop-pg-4',
    title: 'Boston Living Designer Co-Living Hub',
    location: 'Hitec City, Hyderabad',
    price: '₹ 15,200 / mo',
    originalPrice: '₹ 17,500 / mo',
    specs: 'Double Sharing • Gaming Lounge • Chef Cooked Food',
    rating: 4.88,
    reviewsCount: 47,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
    badge: 'Chef Meals',
    tagType: 'offer',
    type: 'pg',
    propertyType: 'Double Sharing',
    bhk: 'Double Sharing',
    city: 'hyderabad',
    discount: '100% Verified',
    isTrending: true
  },
  {
    id: 'prop-pg-5',
    title: 'Tribe Student & Professional Living PG',
    location: 'Viman Nagar, Pune',
    price: '₹ 19,000 / mo',
    originalPrice: '₹ 22,000 / mo',
    specs: 'Single & Triple Sharing • Library & Gym • 24/7 Security',
    rating: 4.95,
    reviewsCount: 93,
    image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80',
    badge: 'Zero Lock-in',
    tagType: 'rera',
    type: 'pg',
    propertyType: 'Triple Sharing',
    bhk: 'Triple Sharing',
    city: 'pune',
    discount: 'Student Discount',
    isTrending: true
  },

  // Faridabad & Nehar Par Properties
  {
    id: 'prop-116',
    title: 'BPTP Parklands Pride 3BHK Luxury Builder Floor',
    location: 'Neharpar (Greater Faridabad), Delhi NCR',
    price: '₹ 95.00 Lakh',
    originalPrice: '₹ 1.10 Cr',
    specs: '3 BHK • 1,750 sq.ft • Independent Floor & Stilt Parking',
    rating: 4.88,
    reviewsCount: 31,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    badge: 'RERA Verified',
    tagType: 'rera',
    type: 'buy',
    propertyType: 'Apartment',
    bhk: '3 BHK',
    city: 'delhi',
    discount: 'Direct Builder Price',
    isTrending: true
  },
  {
    id: 'prop-117',
    title: 'Omaxe Spa Village High-Rise Residency',
    location: 'Sector 78, Neharpar, Greater Faridabad',
    price: '₹ 32,000 / mo',
    originalPrice: '₹ 36,000 / mo',
    specs: '3 BHK • 2,100 sq.ft • Modular Kitchen & Club',
    rating: 4.85,
    reviewsCount: 24,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
    badge: '0% Brokerage',
    tagType: 'rera',
    type: 'rent',
    propertyType: 'Furnished',
    bhk: '3 BHK',
    city: 'delhi',
    discount: 'Ready Move',
    isTrending: true
  },
  {
    id: 'prop-118',
    title: 'Puri Diplomatic Greens Signature Highrise',
    location: 'Sector 82, Neharpar, Greater Faridabad',
    price: '₹ 1.25 Cr onwards',
    originalPrice: '₹ 1.40 Cr',
    specs: '3 & 4 BHK • 80% Green Open Area • Dec 2026 Handover',
    rating: 4.92,
    reviewsCount: 47,
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    badge: 'New Launch',
    tagType: 'rera',
    type: 'projects',
    propertyType: 'Luxury Highrise',
    bhk: '3 BHK',
    city: 'delhi',
    discount: 'Early Bird 5%',
    isTrending: true
  },
  {
    id: 'prop-119',
    title: 'BPTP District Gated Villa Plots',
    location: 'Neharpar (Greater Faridabad), Delhi NCR',
    price: '₹ 68.00 Lakh',
    originalPrice: '₹ 75.00 Lakh',
    specs: '1,450 sq.ft • Freehold Clear Registry • Gated Township',
    rating: 4.9,
    reviewsCount: 19,
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
    badge: 'Clear NA Title',
    tagType: 'rera',
    type: 'plot',
    propertyType: 'Residential Plot',
    bhk: 'Any',
    city: 'delhi',
    discount: 'Instant Registry',
    isTrending: true
  },
  {
    id: 'prop-120',
    title: 'SRS Tower & Business Hub Office Suite',
    location: 'Mathura Road & Sector 31, Faridabad',
    price: '₹ 85.00 Lakh',
    originalPrice: '₹ 95.00 Lakh',
    specs: '1,200 sq.ft • Grade-A Glass Facade • Pre-Leased 8.2% ROI',
    rating: 4.87,
    reviewsCount: 22,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    badge: 'Pre-Leased ROI',
    tagType: 'rera',
    type: 'commercial',
    propertyType: 'Office Space',
    bhk: 'Any',
    city: 'delhi',
    discount: 'High ROI',
    isTrending: true
  },
  {
    id: 'prop-pg-6',
    title: 'Scholar Stays Executive PG & Co-Living',
    location: 'Neharpar, Sector 81, Greater Faridabad',
    price: '₹ 9,500 / mo',
    originalPrice: '₹ 11,500 / mo',
    specs: 'Single Room • 3 Meals Mess • AC & WiFi Included',
    rating: 4.88,
    reviewsCount: 33,
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
    badge: 'Zero Deposit Lock',
    tagType: 'offer',
    type: 'pg',
    propertyType: 'Single Room',
    bhk: 'Single Room',
    city: 'delhi',
    discount: '3 Meals + Laundry Included',
    isTrending: true
  },

  // Interiors showcase
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
    quote: 'Roof Ridge finished our 4-bedroom home interiors in just 40 days! Being able to hire reliable masons and buy cement directly at wholesale prices saved us lakhs of rupees.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 2,
    name: 'Rajesh K. Singhania',
    role: 'Managing Director, Apex Builders',
    quote: 'Listing our housing project on Roof Ridge helped us connect directly with genuine families looking to buy, without any fake inquiries or broker hassle.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
  }
];
