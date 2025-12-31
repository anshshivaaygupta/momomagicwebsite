export interface ComboDeal {
  id: string;
  name: string;
  category: 'family' | 'party' | 'student' | 'weekly' | 'festival';
  description: string;
  regularPrice: number;
  comboPrice: number;
  includedItems: string[];
  preparationTime: number; // in minutes
  serves: string;
  isActive: boolean;
  isFeatured: boolean;
  badge?: string;
  offerTimer?: {
    startDate: string;
    endDate: string;
    showCountdown: boolean;
  };
  image: string;
  displayOrder: number;
}

export const combos: ComboDeal[] = [
  {
    id: 'family-feast',
    name: 'Family Feast Combo',
    category: 'family',
    description: 'Perfect combination for family dinners with variety of momos',
    regularPrice: 380,
    comboPrice: 299,
    includedItems: [
      '10 Steamed Veg Momos',
      '10 Steamed Paneer Momos',
      '10 Fried Veg Momos',
      '4 Cold Drink Cans',
      '2 Magic Spicy Sauces',
    ],
    preparationTime: 20,
    serves: '2-4 People',
    isActive: true,
    isFeatured: true,
    badge: 'Family Favorite',
    image: '/images/combos/family-feast.jpg',
    displayOrder: 1,
  },
  {
    id: 'family-delight',
    name: 'Family Delight Combo',
    category: 'family',
    description: 'Best value combo with mix of steamed, fried, and kurkure momos',
    regularPrice: 650,
    comboPrice: 499,
    includedItems: [
      '15 Steamed Momos (Mix)',
      '15 Fried Momos (Mix)',
      '10 Kurkure Momos',
      '6 Cold Drink Cans',
      '4 Magic Sauces',
      'Free Paper Plates',
    ],
    preparationTime: 25,
    serves: '3-5 People',
    isActive: true,
    isFeatured: true,
    badge: 'Best Value',
    image: '/images/combos/family-delight.jpg',
    displayOrder: 2,
  },

  {
    id: 'party-starter',
    name: 'Party Starter Combo',
    category: 'party',
    description: 'Perfect for small gatherings and celebrations',
    regularPrice: 1050,
    comboPrice: 799,
    includedItems: [
      '30 Steamed Momos (Assorted)',
      '20 Fried Momos (Assorted)',
      '15 Kurkure Momos',
      '10 Cold Drink Cans',
      '6 Magic Dips & Sauces',
      'Free Serving Plates',
    ],
    preparationTime: 30,
    serves: '5-8 People',
    isActive: true,
    isFeatured: true,
    badge: 'Party Special',
    image: '/images/combos/party-starter.jpg',
    displayOrder: 3,
  },
  {
    id: 'mega-party',
    name: 'Mega Party Combo',
    category: 'party',
    description: 'Ultimate party combo with maximum variety and savings',
    regularPrice: 1750,
    comboPrice: 1299,
    includedItems: [
      '50 Steamed Momos (All Types)',
      '30 Fried Momos (All Types)',
      '20 Kurkure Momos',
      '15 Cold Drink Cans',
      '8 Magic Dips & Sauces',
      'Free Plates & Tissue Box',
      'Special Party Packaging',
    ],
    preparationTime: 45,
    serves: '8-12 People',
    isActive: true,
    isFeatured: true,
    badge: 'Mega Savings',
    image: '/images/combos/mega-party.jpg',
    displayOrder: 4,
  },

  {
    id: 'student-combo',
    name: 'Student Budget Combo',
    category: 'student',
    description: 'Affordable combo perfect for students and quick meals',
    regularPrice: 200,
    comboPrice: 149,
    includedItems: [
      '10 Steamed Momos (Choice)',
      '5 Fried Momos',
      '2 Cold Drinks',
      '1 Magic Sauce',
    ],
    preparationTime: 15,
    serves: '1-2 People',
    isActive: true,
    isFeatured: false,
    badge: 'Student Special',
    image: '/images/combos/student-combo.jpg',
    displayOrder: 5,
  },
  {
    id: 'budget-combo',
    name: 'Quick Bite Combo',
    category: 'student',
    description: 'Quick and delicious combo for busy days',
    regularPrice: 250,
    comboPrice: 199,
    includedItems: [
      '12 Steamed Momos (Mix)',
      '8 Fried Momos',
      '3 Cold Drinks',
      '2 Magic Sauces',
    ],
    preparationTime: 18,
    serves: '2-3 People',
    isActive: true,
    isFeatured: false,
    badge: 'Quick Bite',
    image: '/images/combos/budget-combo.jpg',
    displayOrder: 6,
  },

  {
    id: 'weekend-special',
    name: 'Weekend Special Combo',
    category: 'weekly',
    description: 'Special weekend offer with amazing savings',
    regularPrice: 280,
    comboPrice: 199,
    includedItems: [
      '10 Steamed Momos (Choice)',
      '5 Fried Momos (Choice)',
      '2 Cold Drinks',
      '1 Magic Sauce',
    ],
    preparationTime: 15,
    serves: '2-3 People',
    isActive: true,
    isFeatured: true,
    badge: 'Weekend Only',
    offerTimer: {
      startDate: '2025-10-24T00:00:00',
      endDate: '2025-10-27T23:59:59',
      showCountdown: true,
    },
    image: '/images/combos/weekend-special.jpg',
    displayOrder: 7,
  },
  {
    id: 'monsoon-magic',
    name: 'Monsoon Magic Combo',
    category: 'festival',
    description: 'Special monsoon combo with hot and spicy momos',
    regularPrice: 450,
    comboPrice: 349,
    includedItems: [
      '12 Steamed Momos',
      '8 Fried Momos',
      '6 Kurkure Momos',
      '4 Cold Drinks',
      '2 Hot Garlic Sauces',
    ],
    preparationTime: 20,
    serves: '3-4 People',
    isActive: true,
    isFeatured: true,
    badge: 'This Month Only',
    offerTimer: {
      startDate: '2025-10-01T00:00:00',
      endDate: '2025-10-31T23:59:59',
      showCountdown: true,
    },
    image: '/images/combos/monsoon-magic.jpg',
    displayOrder: 8,
  },
];

export const comboCategories = [
  {
    id: 'family',
    name: 'Family Combos',
    description: 'Perfect for 2-5 people',
    icon: '👨‍👩‍👧‍👦',
    color: 'vegetarian-green',
  },
  {
    id: 'party',
    name: 'Party Combos',
    description: 'For 5-12 people',
    icon: '🎉',
    color: 'premium-orange',
  },
  {
    id: 'student',
    name: 'Student Specials',
    description: 'Budget-friendly options',
    icon: '🎓',
    color: 'golden-glow',
  },
  {
    id: 'weekly',
    name: 'Weekly Offers',
    description: 'Limited time deals',
    icon: '⚡',
    color: 'warm-orange',
  },
  {
    id: 'festival',
    name: 'Festival Specials',
    description: 'Seasonal combos',
    icon: '🎊',
    color: 'golden-glow',
  },
];
