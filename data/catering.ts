export interface CateringPackage {
  id: string;
  name: string;
  category: 'wedding' | 'office' | 'birthday' | 'custom';
  badge: string;
  basePrice: number;
  priceNote: string;
  perGuestPrice: number;
  description: string;
  includes: string[];
  guestRange: {
    min: number;
    max: number;
  };
  serviceDuration: string;
  metaInfo: string[];
  isActive: boolean;
  isFeatured: boolean;
  image: string;
  displayOrder: number;
}

export interface MenuItem {
  id: string;
  name: string;
  category: 'steamed' | 'fried' | 'kurkure' | 'pizza' | 'addons';
  price: number;
  quantity: string;
  isAvailable: boolean;
  description: string;
}

export interface CateringBooking {
  id: string;
  clientName: string;
  phone: string;
  email?: string;
  eventType: string;
  guestCount: number;
  eventDate: string;
  eventLocation?: string;
  packageId: string;
  menuSelections: string[];
  additionalRequirements?: string;
  estimatedCost: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

export const cateringPackages: CateringPackage[] = [
  {
    id: 'wedding-basic',
    name: 'Basic Wedding Package',
    category: 'wedding',
    badge: 'Budget Friendly',
    basePrice: 5000,
    priceNote: 'for 100 guests',
    perGuestPrice: 50,
    description: 'Perfect for intimate wedding celebrations with essential catering services',
    includes: [
      '3 Types of Momos (Your Choice)',
      '2 Special Dips & Chutneys',
      'Basic Serving Setup',
      '3 Hours Service',
      'Free Delivery',
    ],
    guestRange: {
      min: 50,
      max: 150,
    },
    serviceDuration: '3 Hours',
    metaInfo: ['👥 50-150 Guests', '🕒 3 Hours Service', '🎯 Perfect for Small Weddings'],
    isActive: true,
    isFeatured: false,
    image: '/images/catering/wedding-basic.jpg',
    displayOrder: 1,
  },
  {
    id: 'wedding-premium',
    name: 'Premium Wedding Package',
    category: 'wedding',
    badge: 'Most Popular',
    basePrice: 8500,
    priceNote: 'for 100 guests',
    perGuestPrice: 85,
    description: 'Complete wedding catering experience with professional service and elegant setup',
    includes: [
      '5 Types of Momos (All Signature)',
      '4 Premium Dips & Sauces',
      'Professional Serving Staff (2 People)',
      'Elegant Serving Setup',
      '4 Hours Service',
      'Complimentary Decorations',
      'Free Delivery & Setup',
    ],
    guestRange: {
      min: 80,
      max: 200,
    },
    serviceDuration: '4 Hours',
    metaInfo: ['👥 80-200 Guests', '🕒 4 Hours Service', '💫 Full Service Experience'],
    isActive: true,
    isFeatured: true,
    image: '/images/catering/wedding-premium.jpg',
    displayOrder: 2,
  },
  {
    id: 'wedding-royal',
    name: 'Royal Wedding Package',
    category: 'wedding',
    badge: 'Luxury Experience',
    basePrice: 15000,
    priceNote: 'for 100 guests',
    perGuestPrice: 150,
    description: 'Ultimate luxury wedding catering with live counter and dedicated event coordinator',
    includes: [
      'All 7 Momos Varieties',
      '6 Premium Dips & International Sauces',
      'Dedicated Serving Team (4 People)',
      'Luxury Serving Setup',
      '6 Hours Service',
      'Premium Decorations',
      'Personal Event Coordinator',
      'Live Momos Counter',
      'Free Delivery & Premium Setup',
    ],
    guestRange: {
      min: 100,
      max: 300,
    },
    serviceDuration: '6 Hours',
    metaInfo: ['👥 100-300+ Guests', '🕒 6 Hours Service', '👑 Luxury Wedding Experience'],
    isActive: true,
    isFeatured: false,
    image: '/images/catering/wedding-royal.jpg',
    displayOrder: 3,
  },
  {
    id: 'office-corporate',
    name: 'Office Party Package',
    category: 'office',
    badge: 'Corporate Special',
    basePrice: 2500,
    priceNote: 'for 50 guests',
    perGuestPrice: 50,
    description: 'Perfect for office celebrations, team meetings, and corporate events',
    includes: [
      '3 Types of Momos (Mix)',
      '2 Dips & Sauces',
      'Quick 30-min Setup',
      'Disposable Plates & Cutlery',
      '2 Hours Service',
      'Special Corporate Discount',
      'Hygiene Certified Service',
    ],
    guestRange: {
      min: 20,
      max: 100,
    },
    serviceDuration: '2 Hours',
    metaInfo: ['👥 20-100 People', '🕒 2 Hours Service', '🏢 Perfect for Offices'],
    isActive: true,
    isFeatured: false,
    image: '/images/catering/office-party.jpg',
    displayOrder: 4,
  },
  {
    id: 'birthday-bash',
    name: 'Birthday Bash Package',
    category: 'birthday',
    badge: 'Family Favorite',
    basePrice: 1500,
    priceNote: 'for 25 guests',
    perGuestPrice: 60,
    description: 'Make birthdays special with fun momos presentation and themed service',
    includes: [
      '2 Types of Momos (Your Choice)',
      '2 Fun Dips & Sauces',
      'Themed Presentation',
      'Birthday Special Momos',
      'Free Cake Coordination',
      'Fun Serving Style',
      '3 Hours Service',
    ],
    guestRange: {
      min: 10,
      max: 50,
    },
    serviceDuration: '3 Hours',
    metaInfo: ['👥 10-50 People', '🕒 3 Hours Service', '🎂 Perfect for Birthdays'],
    isActive: true,
    isFeatured: false,
    image: '/images/catering/birthday-bash.jpg',
    displayOrder: 5,
  },
  {
    id: 'custom-quote',
    name: 'Custom Catering Package',
    category: 'custom',
    badge: 'Fully Customizable',
    basePrice: 0,
    priceNote: 'custom quote',
    perGuestPrice: 0,
    description: 'Build your perfect catering package tailored to your specific needs and budget',
    includes: [
      'Choose Your Momos Varieties',
      'Select Your Preferred Dips',
      'Customize Service Duration',
      'Flexible Guest Count',
      'Add-ons Available',
      'Personalized Setup',
      'Custom Pricing',
    ],
    guestRange: {
      min: 10,
      max: 1000,
    },
    serviceDuration: 'Flexible',
    metaInfo: ['👥 10-1000+ Guests', '🕒 Flexible Duration', '🎯 Fully Customizable'],
    isActive: true,
    isFeatured: false,
    image: '/images/catering/custom-package.jpg',
    displayOrder: 6,
  },
];

export const menuItems: MenuItem[] = [
  {
    id: 'steamed-veg',
    name: 'Steamed Veg Momos',
    category: 'steamed',
    price: 200,
    quantity: '50 pieces',
    isAvailable: true,
    description: 'Fresh vegetables wrapped in soft steamed dough',
  },
  {
    id: 'steamed-paneer',
    name: 'Steamed Paneer Momos',
    category: 'steamed',
    price: 300,
    quantity: '50 pieces',
    isAvailable: true,
    description: 'Premium paneer filling with special spices',
  },
  {
    id: 'steamed-soya',
    name: 'Steamed Soya Momos',
    category: 'steamed',
    price: 250,
    quantity: '50 pieces',
    isAvailable: true,
    description: 'Protein-rich soya chunks with herbs',
  },
  {
    id: 'steamed-cheese-corn',
    name: 'Steamed Cheese Corn Momos',
    category: 'steamed',
    price: 400,
    quantity: '50 pieces',
    isAvailable: true,
    description: 'Creamy cheese and sweet corn combination',
  },
  {
    id: 'fried-veg',
    name: 'Fried Veg Momos',
    category: 'fried',
    price: 250,
    quantity: '50 pieces',
    isAvailable: true,
    description: 'Crispy golden fried vegetable momos',
  },
  {
    id: 'fried-paneer',
    name: 'Fried Paneer Momos',
    category: 'fried',
    price: 350,
    quantity: '50 pieces',
    isAvailable: true,
    description: 'Crunchy paneer momos with perfect texture',
  },
  {
    id: 'fried-cheese-corn',
    name: 'Fried Cheese Corn Momos',
    category: 'fried',
    price: 450,
    quantity: '50 pieces',
    isAvailable: true,
    description: 'Crispy fried cheese corn delight',
  },
  {
    id: 'kurkure-veg',
    name: 'Kurkure Veg Momos',
    category: 'kurkure',
    price: 500,
    quantity: '50 pieces',
    isAvailable: true,
    description: 'Signature crispy kurkure coating on veg momos',
  },
  {
    id: 'kurkure-paneer',
    name: 'Kurkure Paneer Momos',
    category: 'kurkure',
    price: 600,
    quantity: '50 pieces',
    isAvailable: true,
    description: 'Premium paneer in crunchy kurkure shell',
  },
  {
    id: 'kurkure-cheese',
    name: 'Kurkure Cheese Momos',
    category: 'kurkure',
    price: 600,
    quantity: '50 pieces',
    isAvailable: true,
    description: 'Cheesy goodness in crispy kurkure coating',
  },
  {
    id: 'pizza-veg',
    name: 'Veg Pizza Momos',
    category: 'pizza',
    price: 800,
    quantity: '50 pieces',
    isAvailable: true,
    description: 'Fusion pizza flavors in momo form',
  },
  {
    id: 'pizza-paneer',
    name: 'Paneer Pizza Momos',
    category: 'pizza',
    price: 1000,
    quantity: '50 pieces',
    isAvailable: true,
    description: 'Paneer pizza momos with special toppings',
  },
  {
    id: 'addon-sauce',
    name: 'Extra Magic Sauce',
    category: 'addons',
    price: 100,
    quantity: '500ml',
    isAvailable: true,
    description: 'Our signature magic sauce',
  },
  {
    id: 'addon-cold-drinks',
    name: 'Cold Drinks Pack',
    category: 'addons',
    price: 600,
    quantity: '24 cans',
    isAvailable: true,
    description: 'Assorted cold drinks for your event',
  },
  {
    id: 'addon-premium-setup',
    name: 'Premium Serving Setup',
    category: 'addons',
    price: 1000,
    quantity: '1 set',
    isAvailable: true,
    description: 'Elegant serving stations and decorations',
  },
  {
    id: 'addon-extra-staff',
    name: 'Additional Serving Staff',
    category: 'addons',
    price: 500,
    quantity: 'per person',
    isAvailable: true,
    description: 'Extra professional serving staff',
  },
];

export const cateringCategories = [
  {
    id: 'wedding',
    name: 'Wedding Catering',
    description: 'Perfect for 50-300+ guests',
    icon: '💒',
    color: 'premium-orange',
  },
  {
    id: 'office',
    name: 'Office Parties',
    description: 'Corporate events & meetings',
    icon: '🏢',
    color: 'golden-glow',
  },
  {
    id: 'birthday',
    name: 'Birthday Parties',
    description: 'Fun celebrations for all ages',
    icon: '🎂',
    color: 'vegetarian-green',
  },
  {
    id: 'custom',
    name: 'Custom Events',
    description: 'Tailored to your needs',
    icon: '🎯',
    color: 'warm-orange',
  },
];

export function getPackageRecommendation(guestCount: number): CateringPackage | null {
  const suitablePackages = cateringPackages.filter(
    (pkg) => guestCount >= pkg.guestRange.min && guestCount <= pkg.guestRange.max && pkg.id !== 'custom-quote'
  );

  if (suitablePackages.length === 0) return null;

  const featured = suitablePackages.find((pkg) => pkg.isFeatured);
  if (featured) return featured;

  return suitablePackages[0];
}

export function calculateEstimatedCost(
  packageId: string,
  guestCount: number,
  selectedMenuItems: string[] = []
): number {
  const selectedPackage = cateringPackages.find((pkg) => pkg.id === packageId);
  if (!selectedPackage) return 0;

  let baseCost = selectedPackage.basePrice;

  if (selectedPackage.perGuestPrice > 0) {
    baseCost = guestCount * selectedPackage.perGuestPrice;
  }

  const menuItemsCost = selectedMenuItems.reduce((total, itemId) => {
    const item = menuItems.find((mi) => mi.id === itemId);
    return total + (item?.price || 0);
  }, 0);

  return baseCost + menuItemsCost;
}
