const User = require('../models/User');
const Property = require('../models/Property');
const MaterialCategory = require('../models/MaterialCategory');
const MaterialProduct = require('../models/MaterialProduct');
const Banner = require('../models/Banner');

const seedInitialData = async () => {
  try {
    console.log('[Seed] Verifying initial platform entities...');

    // 1. Ensure Default Admin & Agents
    let admin = await User.findOne({ email: 'admin@roofridge.com' });
    if (!admin) {
      admin = await User.create({
        name: 'Roof Ridge Administrator',
        email: 'admin@roofridge.com',
        phone: '9999999999',
        role: 'admin',
        isVerified: true,
        city: 'Noida',
      });
      console.log('[Seed] Created default admin user (admin@roofridge.com)');
    }

    let agent = await User.findOne({ email: 'vikram.agent@roofridge.com' });
    if (!agent) {
      agent = await User.create({
        name: 'Vikram Malhotra',
        email: 'vikram.agent@roofridge.com',
        phone: '9876543210',
        role: 'agent',
        isVerified: true,
        city: 'Noida',
      });
    }

    let seller = await User.findOne({ email: 'sales@ats.in' });
    if (!seller) {
      seller = await User.create({
        name: 'ATS Infrastructure Ltd',
        email: 'sales@ats.in',
        phone: '9811223344',
        role: 'builder',
        isVerified: true,
        city: 'Noida',
      });
    }

    // 2. Ensure Initial Properties
    const propCount = await Property.countDocuments();
    if (propCount === 0) {
      await Property.create([
        {
          title: 'ATS Pious Hideaways — Luxury 3 BHK',
          description:
            'Spectacular 3 BHK apartment located in Sector 150, the greenest sector of Noida. Features high ceilings, Italian marble flooring, and panoramic golf course views.',
          price: 14500000,
          priceDisplay: '₹1.45 Cr',
          type: 'buy',
          propertyType: 'residential',
          subType: 'apartment',
          bhk: 3,
          location: {
            address: 'Tower B, ATS Pious Hideaways',
            locality: 'Sector 150',
            city: 'Noida',
            state: 'Uttar Pradesh',
            zipCode: '201310',
            coordinates: { lat: 28.4682, lng: 77.4988 },
          },
          features: {
            bedrooms: 3,
            bathrooms: 3,
            balconies: 2,
            areaSqFt: 1675,
            carpetAreaSqFt: 1250,
            furnishingStatus: 'semi-furnished',
            floorNumber: 14,
            totalFloors: 26,
            facing: 'north-east',
            possessionStatus: 'ready_to_move',
          },
          amenities: [
            'Swimming Pool',
            'Clubhouse',
            'Gymnasium',
            'Tennis Court',
            '24x7 Security',
            'Power Backup',
          ],
          owner: seller._id,
          ownerType: 'builder',
          status: 'available',
          approvalStatus: 'approved',
          isVerified: true,
          isFeatured: true,
          images: [
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
          ],
        },
        {
          title: 'Godrej Woods — 4 BHK Forest View Residence',
          description:
            'Exquisite modern 4 BHK home nestled among 600 lush trees in Sector 43, central Noida. Close to Metro and Golf Course.',
          price: 28500000,
          priceDisplay: '₹2.85 Cr',
          type: 'buy',
          propertyType: 'residential',
          subType: 'apartment',
          bhk: 4,
          location: {
            address: 'Godrej Woods, Sector 43',
            locality: 'Sector 43',
            city: 'Noida',
            state: 'Uttar Pradesh',
            zipCode: '201303',
            coordinates: { lat: 28.5612, lng: 77.3481 },
          },
          features: {
            bedrooms: 4,
            bathrooms: 4,
            balconies: 3,
            areaSqFt: 2550,
            carpetAreaSqFt: 1980,
            furnishingStatus: 'furnished',
            floorNumber: 18,
            totalFloors: 32,
            facing: 'east',
            possessionStatus: 'ready_to_move',
          },
          amenities: [
            'Private Forest',
            'Olympic Pool',
            'Spa & Wellness',
            'Smart Home Automation',
            'Valet Parking',
          ],
          owner: agent._id,
          ownerType: 'agent',
          status: 'available',
          approvalStatus: 'approved',
          isVerified: true,
          isFeatured: true,
          images: [
            'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
          ],
        },
        {
          title: 'Jaypee Greens — 5 BHK Golf Villa',
          description:
            'Stunning independent golf villa surrounded by Greg Norman 18-hole championship golf course. Private lawn, plunge pool, and terrace deck.',
          price: 65000000,
          priceDisplay: '₹6.50 Cr',
          type: 'buy',
          propertyType: 'residential',
          subType: 'villa',
          bhk: 5,
          location: {
            address: 'The Castille, Jaypee Greens',
            locality: 'Jaypee Greens',
            city: 'Greater Noida',
            state: 'Uttar Pradesh',
            zipCode: '201310',
            coordinates: { lat: 28.4721, lng: 77.5023 },
          },
          features: {
            bedrooms: 5,
            bathrooms: 6,
            balconies: 4,
            areaSqFt: 5200,
            carpetAreaSqFt: 4400,
            furnishingStatus: 'furnished',
            floorNumber: 1,
            totalFloors: 3,
            facing: 'north-east',
            possessionStatus: 'ready_to_move',
          },
          amenities: [
            'Golf Course View',
            'Private Pool',
            'Personal Elevator',
            'Clubhouse',
            'Concierge Service',
          ],
          owner: admin._id,
          ownerType: 'owner',
          status: 'available',
          approvalStatus: 'approved',
          isVerified: true,
          isFeatured: true,
          images: [
            'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80',
          ],
        },
        {
          title: 'Modern High-Rise 2 BHK in Sector 76',
          description:
            'Bright and airy 2 BHK apartment for rent with open modular kitchen, premium fixtures, and adjacent to Sector 76 metro station.',
          price: 28000,
          priceDisplay: '₹28,000 / mo',
          type: 'rent',
          propertyType: 'residential',
          subType: 'apartment',
          bhk: 2,
          location: {
            address: 'Amrapali Silicon City, Sector 76',
            locality: 'Sector 76',
            city: 'Noida',
            state: 'Uttar Pradesh',
            zipCode: '201301',
            coordinates: { lat: 28.5678, lng: 77.3822 },
          },
          features: {
            bedrooms: 2,
            bathrooms: 2,
            balconies: 2,
            areaSqFt: 1100,
            carpetAreaSqFt: 850,
            furnishingStatus: 'semi-furnished',
            floorNumber: 8,
            totalFloors: 19,
            facing: 'east',
            possessionStatus: 'ready_to_move',
          },
          amenities: ['Gym', 'Gated Security', 'Children Play Area', 'Metro Proximity'],
          owner: agent._id,
          ownerType: 'agent',
          status: 'available',
          approvalStatus: 'approved',
          isVerified: true,
          isFeatured: false,
          images: [
            'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
          ],
        },
      ]);
      console.log('[Seed] Seeded initial properties.');
    }

    // 3. Ensure Material Categories & Products
    const catCount = await MaterialCategory.countDocuments();
    if (catCount === 0) {
      const catCement = await MaterialCategory.create({
        name: 'Cement & Concrete',
        icon: 'Layers',
        description: 'Grade 53 & 43 Portland cement, PPC, and ready-mix concrete.',
      });

      const catSteel = await MaterialCategory.create({
        name: 'Steel & TMT Bars',
        icon: 'Box',
        description: 'Fe 550D TMT reinforcement rebars with corrosion resistance.',
      });

      const catTiles = await MaterialCategory.create({
        name: 'Tiles & Flooring',
        icon: 'Grid',
        description: 'Vitrified, ceramic, Italian marble, and anti-skid floor tiles.',
      });

      const catElectrical = await MaterialCategory.create({
        name: 'Electrical & Wiring',
        icon: 'Zap',
        description: 'Flame-retardant copper wires, modular switchboards, and MCBs.',
      });

      await MaterialProduct.create([
        {
          name: 'UltraTech Super Cement (50 kg)',
          brand: 'UltraTech',
          category: catCement._id,
          categoryName: 'Cement & Concrete',
          price: 385,
          mrp: 420,
          unit: 'bag',
          inStock: true,
          stockQuantity: 500,
          rating: 4.9,
          images: [
            'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80',
          ],
        },
        {
          name: 'Tata Tiscon 550D Rebars (12mm)',
          brand: 'Tata Tiscon',
          category: catSteel._id,
          categoryName: 'Steel & TMT Bars',
          price: 64500,
          mrp: 68000,
          unit: 'tonne',
          inStock: true,
          stockQuantity: 80,
          rating: 4.9,
          images: [
            'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
          ],
        },
        {
          name: 'Kajaria Glazed Vitrified Tiles (60x60 cm)',
          brand: 'Kajaria',
          category: catTiles._id,
          categoryName: 'Tiles & Flooring',
          price: 58,
          mrp: 72,
          unit: 'sq ft',
          inStock: true,
          stockQuantity: 2400,
          rating: 4.8,
          images: [
            'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
          ],
        },
        {
          name: 'Havells Life Line Plus FR Cable 2.5 sq mm',
          brand: 'Havells',
          category: catElectrical._id,
          categoryName: 'Electrical & Wiring',
          price: 2450,
          mrp: 2900,
          unit: 'box (90m)',
          inStock: true,
          stockQuantity: 120,
          rating: 4.8,
          images: [
            'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&w=800&q=80',
          ],
        },
      ]);
      console.log('[Seed] Seeded material categories and products.');
    }

    // 4. Ensure Banner
    const bannerCount = await Banner.countDocuments();
    if (bannerCount === 0) {
      await Banner.create({
        title: 'Find Verified Properties in Noida & NCR',
        subtitle:
          'Zero brokerage on direct-owner listings, RERA approved projects, and home construction services.',
        badgeText: 'RERA CERTIFIED PLATFORM',
        imageUrl:
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
        ctaText: 'Explore Properties',
        ctaLink: '/properties',
        placement: 'home_hero',
      });
      console.log('[Seed] Seeded home hero banner.');
    }

    console.log('[Seed] Platform initialization complete!');
  } catch (error) {
    console.error('[Seed Error]:', error.message);
  }
};

module.exports = seedInitialData;
