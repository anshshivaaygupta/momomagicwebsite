
export interface AppFeature {
  id: string;
  icon: string;
  title: string;
  description: string;
  points: string[];
  metadata?: Record<string, any>;
}

export interface AppScreenshot {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: 'menu' | 'cart' | 'tracking' | 'profile' | 'offers';
}

export interface AppOffer {
  id: string;
  title: string;
  description: string;
  discount: string;
  validUntil: string;
  terms: string[];
  isActive: boolean;
}

export interface DownloadLink {
  platform: 'android' | 'ios' | 'qr';
  storeName: string;
  storeIcon: string;
  rating: number;
  reviews: number;
  downloadUrl: string;
  qrCodeUrl?: string;
}

export interface HowToStep {
  step: number;
  title: string;
  description: string;
  icon: string;
  duration: string;
}

export const appStats = {
  downloads: '10,000+',
  rating: 4.8,
  reviews: 4300,
  firstOrderDiscount: '50% OFF',
};

export const appFeatures: AppFeature[] = [
  {
    id: 'online-ordering',
    icon: '📱',
    title: 'Online Ordering',
    description: 'Browse menu, customize orders, and place orders in 30 seconds',
    points: [
      'Live menu with real-time availability',
      'Customize spice levels and ingredients',
      'Save favorite combinations',
      'One-tap reordering',
    ],
  },
  {
    id: 'live-tracking',
    icon: '🚗',
    title: 'Live Order Tracking',
    description: 'Real-time updates from preparation to pickup ready',
    points: [
      'Order confirmation instantly',
      'Preparation status updates',
      'Ready for pickup notification',
      'Estimated wait times',
    ],
  },
  {
    id: 'easy-payments',
    icon: '💰',
    title: 'Easy Payments',
    description: 'Secure payments with PhonePe integration',
    points: [
      'PhonePe UPI/QR/Card payments',
      'Secure transaction processing',
      'Instant payment confirmation',
      'Digital receipts',
    ],
    metadata: {
      merchantId: 'M1DD3WP1E1VF',
      keyIndex: 1,
      paymentMethods: ['UPI', 'QR Code', 'Debit Card', 'Credit Card', 'Net Banking'],
    },
  },
  {
    id: 'exclusive-offers',
    icon: '🎁',
    title: 'Exclusive Offers',
    description: 'App-only discounts and loyalty rewards',
    points: [
      '50% OFF on first order',
      'Birthday special offers',
      'Loyalty points system',
      'Personalized recommendations',
    ],
  },
];

export const appScreenshots: AppScreenshot[] = [
  {
    id: 'home-screen',
    title: 'Home Screen',
    description: 'Browse our complete menu with live availability',
    imageUrl: '/images/app/home-screen.png',
    category: 'menu',
  },
  {
    id: 'menu-browse',
    title: 'Menu Browser',
    description: 'Filter by category and customize your order',
    imageUrl: '/images/app/menu-browse.png',
    category: 'menu',
  },
  {
    id: 'cart-view',
    title: 'Shopping Cart',
    description: 'Review your order and apply offers',
    imageUrl: '/images/app/cart-view.png',
    category: 'cart',
  },
  {
    id: 'checkout',
    title: 'Checkout',
    description: 'Secure payment with PhonePe',
    imageUrl: '/images/app/checkout.png',
    category: 'cart',
  },
  {
    id: 'order-tracking',
    title: 'Order Tracking',
    description: 'Real-time status updates',
    imageUrl: '/images/app/order-tracking.png',
    category: 'tracking',
  },
  {
    id: 'profile',
    title: 'User Profile',
    description: 'Manage your account and view order history',
    imageUrl: '/images/app/profile.png',
    category: 'profile',
  },
];

export const appOffers: AppOffer[] = [
  {
    id: 'first-order',
    title: 'First Order Special',
    description: 'Get 50% OFF on your first order through the app',
    discount: '50% OFF',
    validUntil: '2025-12-31',
    terms: [
      'Valid only on first order',
      'Minimum order value ₹100',
      'Maximum discount ₹150',
      'Cannot be combined with other offers',
    ],
    isActive: true,
  },
  {
    id: 'birthday-special',
    title: 'Birthday Bonanza',
    description: 'Free momos on your birthday month',
    discount: 'FREE 5pc',
    validUntil: '2025-12-31',
    terms: [
      'Valid throughout birthday month',
      'One-time use per year',
      'Minimum order value ₹200',
      'Free 5pc Veg Momos',
    ],
    isActive: true,
  },
  {
    id: 'loyalty-points',
    title: 'Loyalty Rewards',
    description: 'Earn 1 point for every ₹10 spent',
    discount: '10% Cashback',
    validUntil: '2025-12-31',
    terms: [
      'Earn 1 point per ₹10',
      '100 points = ₹100 discount',
      'Points valid for 1 year',
      'Redeem anytime',
    ],
    isActive: true,
  },
  {
    id: 'weekend-special',
    title: 'Weekend Fiesta',
    description: 'Extra 20% OFF on weekends',
    discount: '20% OFF',
    validUntil: '2025-12-31',
    terms: [
      'Valid on Saturday & Sunday',
      'Minimum order value ₹150',
      'Maximum discount ₹100',
      'Auto-applied at checkout',
    ],
    isActive: true,
  },
];

export const downloadLinks: DownloadLink[] = [
  {
    platform: 'android',
    storeName: 'Google Play',
    storeIcon: '🤖',
    rating: 4.8,
    reviews: 2500,
    downloadUrl: 'https://play.google.com/store/apps/details?id=com.momomagics.app',
    qrCodeUrl: '/images/app/qr-android.png',
  },
  {
    platform: 'ios',
    storeName: 'App Store',
    storeIcon: '🍎',
    rating: 4.9,
    reviews: 1800,
    downloadUrl: 'https://apps.apple.com/app/momos-magic/id123456789',
    qrCodeUrl: '/images/app/qr-ios.png',
  },
  {
    platform: 'qr',
    storeName: 'Scan QR Code',
    storeIcon: '📱',
    rating: 0,
    reviews: 0,
    downloadUrl: '',
    qrCodeUrl: '/images/app/qr-universal.png',
  },
];

export const howToUseSteps: HowToStep[] = [
  {
    step: 1,
    title: 'Download & Register',
    description: 'Download the app and create your account with phone number',
    icon: '📱',
    duration: '1 min',
  },
  {
    step: 2,
    title: 'Browse & Customize',
    description: 'Explore our menu and customize your momos order',
    icon: '🥟',
    duration: '2 mins',
  },
  {
    step: 3,
    title: 'Pay Securely',
    description: 'Complete payment using PhonePe - UPI, Card, or Net Banking',
    icon: '💳',
    duration: '30 secs',
  },
  {
    step: 4,
    title: 'Track & Pickup',
    description: 'Track your order in real-time and pickup when ready',
    icon: '🎉',
    duration: '15-20 mins',
  },
];

export const appBenefits = {
  title: 'Why Download Momos Magic App?',
  benefits: [
    {
      icon: '⚡',
      title: 'Faster Ordering',
      description: 'Order in 30 seconds with saved preferences',
    },
    {
      icon: '💰',
      title: 'Exclusive Discounts',
      description: 'App-only offers and loyalty rewards',
    },
    {
      icon: '🔔',
      title: 'Order Notifications',
      description: 'Real-time updates on your order status',
    },
    {
      icon: '📊',
      title: 'Order History',
      description: 'Track all your orders and reorder favorites',
    },
    {
      icon: '🎁',
      title: 'Loyalty Program',
      description: 'Earn points on every order',
    },
    {
      icon: '🎂',
      title: 'Birthday Rewards',
      description: 'Free momos on your special day',
    },
  ],
};

export const phonePeConfig = {
  merchantId: 'M1DD3WP1E1VF',
  keyIndex: 1,
  merchantName: 'Momos Magic',
  paymentMethods: [
    { id: 'upi', name: 'UPI', icon: '📱', enabled: true },
    { id: 'qr', name: 'QR Code', icon: '📷', enabled: true },
    { id: 'card', name: 'Debit/Credit Card', icon: '💳', enabled: true },
    { id: 'netbanking', name: 'Net Banking', icon: '🏦', enabled: true },
  ],
  features: [
    'Instant payment confirmation',
    'Secure encrypted transactions',
    'Multiple payment options',
    'Auto-refund on cancellation',
  ],
};

export function getFeatureById(id: string): AppFeature | undefined {
  return appFeatures.find((feature) => feature.id === id);
}

export function getScreenshotsByCategory(category: AppScreenshot['category']): AppScreenshot[] {
  return appScreenshots.filter((screenshot) => screenshot.category === category);
}

export function getActiveOffers(): AppOffer[] {
  return appOffers.filter((offer) => offer.isActive);
}

export function getDownloadLinkByPlatform(platform: DownloadLink['platform']): DownloadLink | undefined {
  return downloadLinks.find((link) => link.platform === platform);
}
