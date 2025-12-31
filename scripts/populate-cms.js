/**
 * CMS POPULATION SCRIPT - Phase 5 Task 2
 * 
 * Populates CMS with existing website content
 * Creates CMS data files from hardcoded website content
 */

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data', 'cms');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

console.log('🚀 Starting CMS population with existing website content...\n');


console.log('📄 Populating Hero Section...');
const heroData = {
  headline: "From Humble Stall to Culinary Legend",
  subheadline: "Experience the Magic That Transformed Sherghati's Street Food Scene",
  primaryButton: {
    text: "Order Now",
    link: "/menu"
  },
  secondaryButton: {
    text: "Our Story",
    link: "/about"
  },
  backgroundType: "video",
  backgroundVideo: "/videos/hero-bg.mp4",
  backgroundImage: "/images/hero-poster.jpg",
  achievements: [
    { text: "⭐ 4.9/5 Rating", subtext: "2000+ Reviews" },
    { text: "🏆 Award Winner", subtext: "Best Quality Food 2024" },
    { text: "✅ FSSAI Certified", subtext: "License: 20424201001152" },
    { text: "🌱 100% Vegetarian", subtext: "Pure & Hygienic" }
  ]
};
fs.writeFileSync(path.join(DATA_DIR, 'hero.json'), JSON.stringify(heroData, null, 2));
console.log('   ✅ Hero section populated\n');


console.log('📄 Populating Menu Items...');
const menuData = {
  categories: [
    "Steamed Perfection",
    "Crispy Fried Delights",
    "Magic Signatures",
    "Fusion Innovations"
  ],
  items: [
    {
      id: "menu-1",
      name: "Veg Steamed Momos",
      category: "Steamed Perfection",
      description: "Classic steamed momos filled with fresh vegetables and aromatic spices",
      price5pc: 40,
      price10pc: 80,
      image: "/images/menu/veg-steamed.jpg",
      isAvailable: true,
      isFeatured: true,
      isVegetarian: true,
      spiceLevel: "mild"
    },
    {
      id: "menu-2",
      name: "Paneer Steamed Momos",
      category: "Steamed Perfection",
      description: "Soft steamed momos with cottage cheese and special masala",
      price5pc: 50,
      price10pc: 100,
      image: "/images/menu/paneer-steamed.jpg",
      isAvailable: true,
      isFeatured: true,
      isVegetarian: true,
      spiceLevel: "mild"
    },
    {
      id: "menu-3",
      name: "Soya Steamed Momos",
      category: "Steamed Perfection",
      description: "Protein-rich soya chunks in traditional momo style",
      price5pc: 45,
      price10pc: 90,
      image: "/images/menu/soya-steamed.jpg",
      isAvailable: true,
      isFeatured: false,
      isVegetarian: true,
      spiceLevel: "mild"
    },
    {
      id: "menu-4",
      name: "Veg Fried Momos",
      category: "Crispy Fried Delights",
      description: "Golden fried momos with crispy exterior and juicy filling",
      price5pc: 50,
      price10pc: 100,
      image: "/images/menu/veg-fried.jpg",
      isAvailable: true,
      isFeatured: true,
      isVegetarian: true,
      spiceLevel: "medium"
    },
    {
      id: "menu-5",
      name: "Paneer Fried Momos",
      category: "Crispy Fried Delights",
      description: "Crispy fried momos with paneer filling",
      price5pc: 60,
      price10pc: 120,
      image: "/images/menu/paneer-fried.jpg",
      isAvailable: true,
      isFeatured: false,
      isVegetarian: true,
      spiceLevel: "medium"
    },
    {
      id: "menu-6",
      name: "Kurkure Momos",
      category: "Magic Signatures",
      description: "Our signature crispy kurkure momos - the most popular item!",
      price5pc: 70,
      price10pc: 140,
      image: "/images/menu/kurkure.jpg",
      isAvailable: true,
      isFeatured: true,
      isVegetarian: true,
      spiceLevel: "medium",
      badge: "BESTSELLER"
    },
    {
      id: "menu-7",
      name: "Pizza Momos",
      category: "Fusion Innovations",
      description: "Fusion pizza-style momos with cheese and Italian herbs",
      price5pc: 80,
      price10pc: 160,
      image: "/images/menu/pizza-momos.jpg",
      isAvailable: true,
      isFeatured: true,
      isVegetarian: true,
      spiceLevel: "mild",
      badge: "NEW"
    },
    {
      id: "menu-8",
      name: "Cheese Corn Momos",
      category: "Fusion Innovations",
      description: "Cheesy corn filling with special sauce",
      price5pc: 70,
      price10pc: 140,
      image: "/images/menu/cheese-corn.jpg",
      isAvailable: true,
      isFeatured: false,
      isVegetarian: true,
      spiceLevel: "mild"
    }
  ]
};
fs.writeFileSync(path.join(DATA_DIR, 'menu.json'), JSON.stringify(menuData, null, 2));
console.log(`   ✅ ${menuData.items.length} menu items populated\n`);


console.log('📄 Populating About Page...');
const aboutData = {
  founder: {
    name: "Dhruv Gupta",
    title: "Founder & Chef",
    location: "Sherghati, Bihar",
    established: "September 2023",
    image: "/images/founder/dhruv-gupta.jpg",
    story: [
      "Dhruv Gupta, a young entrepreneur from Sherghati, Bihar, refused to settle for the ordinary. Tired of the 9-to-5 rat race, he believed in the philosophy: 'Why be an employee when you can be an employer?' In September 2023, with dreams bigger than his pocket, he started with a small stall in Naya Bazar.",
      "His first venture featured 'Pita' - a traditional Bihari delicacy made from rice and lentils, fried to perfection. While the dish held cultural significance, the market response was lukewarm. For two months, Dhruv watched as customers passed by, unaware of this hidden gem. It became clear - sometimes the best recipes need the right audience.",
      "Undeterred by initial setbacks, Dhruv pivoted to momos - a universally loved street food. But these weren't ordinary momos. He infused them with the same passion and quality standards he maintained for his traditional recipes. The small stall began attracting attention, and soon 'Momos Magic' became the talk of Sherghati.",
      "As demand skyrocketed, Dhruv introduced innovations that set Momos Magic apart: Kurkure Momos - a crispy, crunchy variation nobody else offered; Pizza Momos - fusion creativity that became an instant hit; and a Premium Stall Design - transforming from basic to branded excellence.",
      "From that humble stall in September 2023 to a premium branded experience in 2025, Momos Magic now stands as testament to Dhruv's belief: 'Better to be a small owner than someone else's employee.' The magic continues to spread, one momo at a time."
    ]
  },
  philosophy: {
    title: "Our Philosophy",
    description: "At Momos Magic, we believe in three core principles that guide everything we do:",
    values: [
      {
        title: "Quality Over Quantity",
        description: "Every momo is handcrafted with premium ingredients. We never compromise on quality, even if it means serving fewer customers.",
        icon: "⭐"
      },
      {
        title: "Innovation with Tradition",
        description: "We respect traditional recipes while constantly innovating. Our Kurkure and Pizza Momos are perfect examples of this balance.",
        icon: "💡"
      },
      {
        title: "Customer First",
        description: "Your satisfaction is our success. We listen to feedback and continuously improve our offerings based on what you love.",
        icon: "❤️"
      },
      {
        title: "Hygiene & Safety",
        description: "FSSAI certified kitchen with strict hygiene protocols. Your health and safety are our top priorities.",
        icon: "✅"
      },
      {
        title: "Fair Pricing",
        description: "Premium quality at affordable prices. We believe everyone deserves to enjoy great food without breaking the bank.",
        icon: "💰"
      },
      {
        title: "Community Impact",
        description: "We source locally, employ locally, and give back to our community. Your purchase supports local families.",
        icon: "🤝"
      }
    ]
  },
  timeline: [
    {
      date: "September 2023",
      title: "The Beginning",
      description: "Started with a small stall in Naya Bazar, Sherghati, selling traditional Bihari Pita"
    },
    {
      date: "November 2023",
      title: "The Pivot",
      description: "Switched to momos after understanding market demand. First batch sold out in 2 hours!"
    },
    {
      date: "January 2024",
      title: "Innovation Begins",
      description: "Introduced Kurkure Momos - our signature crispy variation that became an instant hit"
    },
    {
      date: "June 2024",
      title: "Recognition",
      description: "Awarded 'Best Quality Food in City' by District Magistrate. FSSAI certification received"
    },
    {
      date: "December 2024",
      title: "Expansion",
      description: "Upgraded to premium branded stall. Introduced Pizza Momos and expanded menu to 15+ varieties"
    },
    {
      date: "March 2025",
      title: "Digital Presence",
      description: "Launched website and online ordering. Reached 2000+ positive reviews with 4.9/5 rating"
    }
  ]
};
fs.writeFileSync(path.join(DATA_DIR, 'about.json'), JSON.stringify(aboutData, null, 2));
console.log('   ✅ About page populated\n');


console.log('📄 Populating Contact Information...');
const contactData = {
  address: {
    line1: "Naya Bazar, Near Post Office",
    city: "Sherghati",
    state: "Bihar",
    pincode: "824211",
    country: "India"
  },
  phone: "+91 9955955191",
  email: "info@momomagics.com",
  website: "www.momomagics.com",
  hours: {
    weekdays: "10:00 AM - 10:00 PM",
    weekends: "10:00 AM - 10:00 PM",
    note: "Open Every Day"
  },
  social: {
    facebook: "https://facebook.com/momomagicsherghati",
    instagram: "https://instagram.com/momomagicsherghati",
    youtube: "https://youtube.com/@momomagicsherghati",
    whatsapp: "+919955955191"
  },
  googleMaps: {
    embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3620.5!2d85.1234!3d24.5678",
    latitude: 24.5678,
    longitude: 85.1234
  }
};
fs.writeFileSync(path.join(DATA_DIR, 'contact.json'), JSON.stringify(contactData, null, 2));
console.log('   ✅ Contact information populated\n');


console.log('📄 Populating Testimonials...');
const testimonialsData = {
  items: [
    {
      id: "test-1",
      name: "Rohan Kumar",
      location: "Sherghati",
      rating: 5,
      date: "2024-12-15",
      text: "Best momos in Sherghati! The Kurkure Momos are absolutely amazing. Crispy outside, juicy inside. I visit at least twice a week. Highly recommended!",
      image: "/images/testimonials/customer-1.jpg",
      isFeatured: true,
      isVerified: true
    },
    {
      id: "test-2",
      name: "Priya Singh",
      location: "Gaya",
      rating: 5,
      date: "2024-11-20",
      text: "Traveled from Gaya just to try these momos after hearing so much about them. Worth every kilometer! The Pizza Momos are unique and delicious.",
      image: "/images/testimonials/customer-2.jpg",
      isFeatured: true,
      isVerified: true
    }
  ],
  stats: {
    totalReviews: 2000,
    averageRating: 4.9,
    fiveStarCount: 1850,
    fourStarCount: 130,
    threeStarCount: 15,
    twoStarCount: 3,
    oneStarCount: 2
  }
};
fs.writeFileSync(path.join(DATA_DIR, 'testimonials.json'), JSON.stringify(testimonialsData, null, 2));
console.log(`   ✅ ${testimonialsData.items.length} testimonials populated\n`);


console.log('📄 Populating Gallery...');
const galleryData = {
  albums: [
    { id: "album-1", name: "Food Photography", description: "Our delicious momos in all their glory" },
    { id: "album-2", name: "Stall & Setup", description: "Our premium branded stall" },
    { id: "album-3", name: "Customer Moments", description: "Happy customers enjoying our momos" },
    { id: "album-4", name: "Behind the Scenes", description: "How we make the magic happen" }
  ],
  images: [
    {
      id: "img-1",
      albumId: "album-1",
      url: "/images/gallery/kurkure-momos-1.jpg",
      title: "Kurkure Momos",
      description: "Our signature crispy kurkure momos",
      uploadedAt: "2024-01-15"
    },
    {
      id: "img-2",
      albumId: "album-1",
      url: "/images/gallery/pizza-momos-1.jpg",
      title: "Pizza Momos",
      description: "Fusion pizza-style momos",
      uploadedAt: "2024-01-15"
    },
    {
      id: "img-3",
      albumId: "album-2",
      url: "/images/gallery/stall-exterior.jpg",
      title: "Our Stall",
      description: "Premium branded stall in Naya Bazar",
      uploadedAt: "2024-01-10"
    }
  ]
};
fs.writeFileSync(path.join(DATA_DIR, 'gallery.json'), JSON.stringify(galleryData, null, 2));
console.log(`   ✅ ${galleryData.images.length} gallery images populated\n`);


console.log('📄 Populating Combo Deals...');
const combosData = {
  items: [
    {
      id: "combo-1",
      name: "Family Pack",
      description: "Perfect for family gatherings - 20 momos + 2 dips",
      items: ["10 Kurkure Momos", "10 Pizza Momos", "Schezwan Dip", "Mayonnaise Dip"],
      originalPrice: 300,
      discountedPrice: 250,
      savings: 50,
      image: "/images/combos/family-pack.jpg",
      isAvailable: true,
      isFeatured: true
    },
    {
      id: "combo-2",
      name: "Couple Special",
      description: "Romantic evening combo - 10 momos + 2 drinks",
      items: ["5 Kurkure Momos", "5 Pizza Momos", "2 Cold Drinks"],
      originalPrice: 200,
      discountedPrice: 170,
      savings: 30,
      image: "/images/combos/couple-special.jpg",
      isAvailable: true,
      isFeatured: true
    }
  ]
};
fs.writeFileSync(path.join(DATA_DIR, 'combos.json'), JSON.stringify(combosData, null, 2));
console.log(`   ✅ ${combosData.items.length} combo deals populated\n`);


console.log('📄 Populating Catering Services...');
const cateringData = {
  packages: [
    {
      id: "catering-1",
      name: "Birthday Party Package",
      description: "Perfect for birthday celebrations",
      servings: "50-100 people",
      items: ["100 Assorted Momos", "Dips & Sauces", "Disposable Plates & Napkins"],
      price: 5000,
      image: "/images/catering/birthday.jpg"
    },
    {
      id: "catering-2",
      name: "Corporate Event Package",
      description: "Ideal for office parties and corporate events",
      servings: "100-200 people",
      items: ["200 Assorted Momos", "Premium Dips", "Serving Staff", "Setup & Cleanup"],
      price: 10000,
      image: "/images/catering/corporate.jpg"
    }
  ]
};
fs.writeFileSync(path.join(DATA_DIR, 'catering.json'), JSON.stringify(cateringData, null, 2));
console.log(`   ✅ ${cateringData.packages.length} catering packages populated\n`);


console.log('📄 Populating Franchise Information...');
const franchiseData = {
  investment: {
    franchiseFee: 50000,
    initialInventory: 25000,
    kitchenSetup: { min: 100000, max: 200000 },
    totalEstimate: { min: 175000, max: 275000 }
  },
  royalty: {
    type: "percentage",
    percentage: 5,
    description: "5% of monthly revenue"
  },
  support: [
    "Complete training program",
    "Recipe and preparation guidance",
    "Marketing materials and branding",
    "Ongoing operational support",
    "Supply chain assistance"
  ],
  requirements: [
    "Minimum 200 sq ft space",
    "Location in high-traffic area",
    "Commitment to quality standards",
    "Passion for food business"
  ]
};
fs.writeFileSync(path.join(DATA_DIR, 'franchise.json'), JSON.stringify(franchiseData, null, 2));
console.log('   ✅ Franchise information populated\n');


console.log('\n📊 CMS POPULATION SUMMARY');
console.log('========================\n');

const summary = {
  timestamp: new Date().toISOString(),
  modules: {
    hero: { populated: true, items: 1 },
    menu: { populated: true, items: menuData.items.length },
    about: { populated: true, items: 1 },
    contact: { populated: true, items: 1 },
    testimonials: { populated: true, items: testimonialsData.items.length },
    gallery: { populated: true, items: galleryData.images.length },
    combos: { populated: true, items: combosData.items.length },
    catering: { populated: true, items: cateringData.packages.length },
    franchise: { populated: true, items: 1 }
  },
  totalModules: 9,
  totalItems: menuData.items.length + testimonialsData.items.length + galleryData.images.length + combosData.items.length + cateringData.packages.length + 4
};

console.log(`✅ Hero Section: 1 entry`);
console.log(`✅ Menu Items: ${menuData.items.length} items`);
console.log(`✅ About Page: 1 entry`);
console.log(`✅ Contact Info: 1 entry`);
console.log(`✅ Testimonials: ${testimonialsData.items.length} items`);
console.log(`✅ Gallery Images: ${galleryData.images.length} items`);
console.log(`✅ Combo Deals: ${combosData.items.length} items`);
console.log(`✅ Catering Packages: ${cateringData.packages.length} items`);
console.log(`✅ Franchise Info: 1 entry`);
console.log(`\n📈 Total: ${summary.totalModules} modules, ${summary.totalItems} items\n`);

fs.writeFileSync(
  path.join(DATA_DIR, 'population-summary.json'),
  JSON.stringify(summary, null, 2)
);

console.log('✅ CMS population complete!');
console.log(`📁 All data saved to: ${DATA_DIR}\n`);
