export interface MenuItem {
  id: string;
  name: string;
  category: 'steamed' | 'fried' | 'kurkure' | 'combo';
  type: 'veg' | 'paneer' | 'soya' | 'cheese-corn' | 'mixed';
  price: number; // Full plate price (10pc)
  halfPrice: number; // Half plate price (5pc)
  description: string;
  image: string;
  popular?: boolean;
  new?: boolean;
  spicy?: boolean;
  spiceLevel?: 'mild' | 'medium' | 'hot' | 'extra-magic';
}

export const menuItems: MenuItem[] = [
  {
    id: 'steamed-veg',
    name: 'Veg Steamed Momos',
    category: 'steamed',
    type: 'veg',
    price: 50,
    halfPrice: 25,
    description: 'Soft and juicy steamed momos filled with fresh vegetables',
    image: '/images/stock/steamed.jpg',
    popular: true,
    spiceLevel: 'mild',
  },
  {
    id: 'steamed-paneer',
    name: 'Paneer Steamed Momos',
    category: 'steamed',
    type: 'paneer',
    price: 70,
    halfPrice: 35,
    description: 'Steamed momos with creamy paneer filling',
    image: '/images/stock/steamed.jpg',
    popular: true,
    spiceLevel: 'mild',
  },
  {
    id: 'steamed-soya',
    name: 'Soya Steamed Momos',
    category: 'steamed',
    type: 'soya',
    price: 60,
    halfPrice: 30,
    description: 'Protein-rich soya steamed momos',
    image: '/images/stock/steamed.jpg',
    spiceLevel: 'mild',
  },
  {
    id: 'steamed-cheese',
    name: 'Cheese Corn Steamed Momos',
    category: 'steamed',
    type: 'cheese-corn',
    price: 100,
    halfPrice: 50,
    description: 'Steamed momos with cheese and sweet corn',
    image: '/images/stock/steamed.jpg',
    popular: true,
    spiceLevel: 'mild',
  },

  {
    id: 'fried-veg',
    name: 'Veg Fried Momos',
    category: 'fried',
    type: 'veg',
    price: 60,
    halfPrice: 30,
    description: 'Golden-fried momos with crispy exterior',
    image: '/images/stock/fried.jpg',
    popular: true,
    spiceLevel: 'medium',
  },
  {
    id: 'fried-paneer',
    name: 'Paneer Fried Momos',
    category: 'fried',
    type: 'paneer',
    price: 80,
    halfPrice: 40,
    description: 'Crispy fried momos with paneer filling',
    image: '/images/stock/fried.jpg',
    spiceLevel: 'medium',
  },
  {
    id: 'fried-soya',
    name: 'Soya Fried Momos',
    category: 'fried',
    type: 'soya',
    price: 70,
    halfPrice: 35,
    description: 'Crispy fried soya momos',
    image: '/images/stock/fried.jpg',
    spiceLevel: 'medium',
  },
  {
    id: 'fried-cheese',
    name: 'Cheese Corn Fried Momos',
    category: 'fried',
    type: 'cheese-corn',
    price: 110,
    halfPrice: 55,
    description: 'Fried momos with cheese and corn',
    image: '/images/stock/fried.jpg',
    spiceLevel: 'medium',
  },

  {
    id: 'kurkure-veg',
    name: 'Kurkure Veg Momos',
    category: 'kurkure',
    type: 'veg',
    price: 100,
    halfPrice: 50,
    description: 'Our signature crispy, crunchy Kurkure momos',
    image: '/images/outlet/kurkure.webp',
    popular: true,
    spicy: true,
    spiceLevel: 'hot',
  },
  {
    id: 'kurkure-paneer',
    name: 'Kurkure Paneer Momos',
    category: 'kurkure',
    type: 'paneer',
    price: 120,
    halfPrice: 60,
    description: 'Kurkure coating with creamy paneer filling',
    image: '/images/outlet/kurkure.webp',
    popular: true,
    spicy: true,
    spiceLevel: 'hot',
  },
  {id: 'kurkure-soya', name:'Kurkure Soya Momos',category:'kurkure',type:'soya',price:100,halfPrice:50,description:'Crunchy crumb coating with a savoury soya filling',image:'/images/outlet/kurkure.webp',spiceLevel:'hot'},
  {
    id: 'kurkure-cheese',
    name: 'Kurkure Cheese Corn Momos',
    category: 'kurkure',
    type: 'cheese-corn',
    price: 120,
    halfPrice: 60,
    description: 'Ultimate Kurkure momos with cheese and corn',
    image: '/images/stock/fried.jpg',
    new: true,
    spicy: true,
    spiceLevel: 'extra-magic',
  },

  {
    id: 'combo-platter',
    name: 'Momos Magic Combo Platter',
    category: 'combo',
    type: 'mixed',
    price: 250,
    halfPrice: 150,
    description: 'A delightful mix of our best momos - Steamed, Fried, and Kurkure varieties (15 pieces)',
    image: '/images/stock/platter.jpg',
    popular: true,
    new: true,
    spiceLevel: 'medium',
  },
];

export const categories = [
  {
    id: 'steamed',
    name: 'Steamed Perfection',
    description: 'Fresh & Healthy',
    icon: '🥟',
    color: 'vegetarian-green',
  },
  {
    id: 'fried',
    name: 'Crispy Fried Delights',
    description: 'Golden & Crunchy',
    icon: '🔥',
    color: 'warm-orange',
  },
  {
    id: 'kurkure',
    name: 'Magic Signatures',
    description: 'Sherghati Exclusive',
    icon: '✨',
    color: 'golden-glow',
  },
  {
    id: 'combo',
    name: 'Combo Platters',
    description: 'Best Value Deals',
    icon: '🎉',
    color: 'golden-glow',
  },
];

