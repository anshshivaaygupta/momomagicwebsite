
export interface User {
  id: string;
  phone: string;
  name: string;
  email?: string;
  createdAt: string;
  loyaltyPoints: number;
  orderHistory: string[]; // Order IDs
}

export interface MenuItem {
  id: string;
  name: string;
  category: 'steamed' | 'fried' | 'kurkure' | 'pizza';
  price5pc: number;
  price10pc: number;
  description: string;
  isVeg: boolean;
  isAvailable: boolean;
  stockLevel: number; // 0 = out of stock
  imageUrl: string;
  spiceLevels: ('mild' | 'medium' | 'hot')[];
  customizations: string[];
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number; // 5pc or 10pc
  spiceLevel: 'mild' | 'medium' | 'hot';
  specialInstructions?: string;
  subtotal: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  paymentMethod: 'phonepe' | 'cash';
  phonepeTransactionId?: string;
  createdAt: string;
  confirmedAt?: string;
  preparingAt?: string;
  readyAt?: string;
  completedAt?: string;
  cancelledAt?: string;
  cancellationReason?: string;
  estimatedTime: number; // minutes
  canCancel: boolean; // true if within 5-minute window
}

export interface PaymentConfig {
  merchantId: string;
  keyIndex: number;
  merchantName: string;
  callbackUrl: string;
  redirectUrl: string;
}

export interface InventoryItem {
  menuItemId: string;
  stockLevel: number;
  lowStockThreshold: number;
  lastUpdated: string;
  isManuallyMarkedOutOfStock: boolean;
}

export const paymentConfig: PaymentConfig = {
  merchantId: 'M1DD3WP1E1VF',
  keyIndex: 1,
  merchantName: 'Momos Magic',
  callbackUrl: '/api/payment/callback',
  redirectUrl: '/order/confirmation',
};

export const orderStatusFlow = {
  pending: { next: 'confirmed', label: 'Order Placed', color: '#ffc241' },
  confirmed: { next: 'preparing', label: 'Confirmed', color: '#ffd700' },
  preparing: { next: 'ready', label: 'Preparing', color: '#EA580C' },
  ready: { next: 'completed', label: 'Ready for Pickup', color: '#059669' },
  completed: { next: null, label: 'Completed', color: '#059669' },
  cancelled: { next: null, label: 'Cancelled', color: '#ef4444' },
};

export const pricingConfig = {
  taxRate: 0.05, // 5% GST
  deliveryCharge: 0, // Currently takeaway only
  minOrderValue: 0,
  firstOrderDiscount: 0.5, // 50% OFF
  maxFirstOrderDiscount: 150, // ₹150 max discount
};

export const cancellationPolicy = {
  windowMinutes: 5,
  refundPercentage: 100,
  message: 'Orders can be cancelled within 5 minutes of placement for full refund',
};

export function calculateOrderTotal(items: CartItem[]): {
  subtotal: number;
  tax: number;
  total: number;
} {
  const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0);
  const tax = subtotal * pricingConfig.taxRate;
  const total = subtotal + tax;
  return { subtotal, tax, total };
}

export function canCancelOrder(order: Order): boolean {
  if (order.status === 'cancelled' || order.status === 'completed') {
    return false;
  }
  const createdTime = new Date(order.createdAt).getTime();
  const currentTime = new Date().getTime();
  const minutesElapsed = (currentTime - createdTime) / (1000 * 60);
  return minutesElapsed <= cancellationPolicy.windowMinutes;
}

export function calculateEstimatedTime(items: CartItem[]): number {
  const baseTime = 15;
  const itemTime = items.length * 2;
  return baseTime + itemTime;
}

export function applyFirstOrderDiscount(subtotal: number): number {
  const discount = subtotal * pricingConfig.firstOrderDiscount;
  return Math.min(discount, pricingConfig.maxFirstOrderDiscount);
}

export function generateOrderId(): string {
  const prefix = 'ORD';
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `${prefix}-${timestamp}${random}`;
}

export function generateTransactionId(): string {
  const prefix = 'TXN';
  const timestamp = Date.now().toString();
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `${prefix}-${timestamp}-${random}`;
}

export const mockUser: User = {
  id: 'user-001',
  phone: '+919955955191',
  name: 'Rohan Kumar',
  email: 'rohan@example.com',
  createdAt: new Date().toISOString(),
  loyaltyPoints: 150,
  orderHistory: [],
};

export const sampleMenuItems: MenuItem[] = [
  {
    id: 'veg-steamed',
    name: 'Veg Momos',
    category: 'steamed',
    price5pc: 25,
    price10pc: 50,
    description: 'Fresh vegetables wrapped in soft dough, steamed to perfection',
    isVeg: true,
    isAvailable: true,
    stockLevel: 100,
    imageUrl: '/images/menu/veg-steamed.png',
    spiceLevels: ['mild', 'medium', 'hot'],
    customizations: ['Extra sauce', 'Less oil', 'No onion', 'No garlic'],
  },
  {
    id: 'paneer-steamed',
    name: 'Paneer Momos',
    category: 'steamed',
    price5pc: 35,
    price10pc: 70,
    description: 'Cottage cheese filling with aromatic spices',
    isVeg: true,
    isAvailable: true,
    stockLevel: 80,
    imageUrl: '/images/menu/paneer-steamed.png',
    spiceLevels: ['mild', 'medium', 'hot'],
    customizations: ['Extra sauce', 'Less oil', 'No onion', 'No garlic'],
  },
  {
    id: 'veg-fried',
    name: 'Veg Fried Momos',
    category: 'fried',
    price5pc: 30,
    price10pc: 60,
    description: 'Crispy fried momos with vegetable filling',
    isVeg: true,
    isAvailable: true,
    stockLevel: 90,
    imageUrl: '/images/menu/veg-fried.png',
    spiceLevels: ['mild', 'medium', 'hot'],
    customizations: ['Extra sauce', 'Extra crispy', 'Less oil'],
  },
  {
    id: 'paneer-fried',
    name: 'Paneer Fried Momos',
    category: 'fried',
    price5pc: 40,
    price10pc: 80,
    description: 'Golden fried momos with paneer filling',
    isVeg: true,
    isAvailable: true,
    stockLevel: 70,
    imageUrl: '/images/menu/paneer-fried.png',
    spiceLevels: ['mild', 'medium', 'hot'],
    customizations: ['Extra sauce', 'Extra crispy', 'Less oil'],
  },
  {
    id: 'kurkure-veg',
    name: 'Kurkure Momos',
    category: 'kurkure',
    price5pc: 50,
    price10pc: 100,
    description: 'Sherghati exclusive! Extra crispy kurkure coating',
    isVeg: true,
    isAvailable: true,
    stockLevel: 60,
    imageUrl: '/images/menu/kurkure-veg.png',
    spiceLevels: ['mild', 'medium', 'hot'],
    customizations: ['Extra sauce', 'Extra crispy'],
  },
  {
    id: 'kurkure-paneer',
    name: 'Paneer Kurkure Momos',
    category: 'kurkure',
    price5pc: 60,
    price10pc: 120,
    description: 'Premium paneer with signature kurkure coating',
    isVeg: true,
    isAvailable: true,
    stockLevel: 50,
    imageUrl: '/images/menu/kurkure-paneer.png',
    spiceLevels: ['mild', 'medium', 'hot'],
    customizations: ['Extra sauce', 'Extra crispy'],
  },
  {
    id: 'pizza-veg',
    name: 'Veg Pizza Momos',
    category: 'pizza',
    price5pc: 80,
    price10pc: 160,
    description: 'Fusion innovation! Pizza flavors in momo form',
    isVeg: true,
    isAvailable: true,
    stockLevel: 40,
    imageUrl: '/images/menu/pizza-veg.png',
    spiceLevels: ['mild', 'medium'],
    customizations: ['Extra cheese', 'Extra sauce'],
  },
  {
    id: 'pizza-paneer',
    name: 'Paneer Pizza Momos',
    category: 'pizza',
    price5pc: 100,
    price10pc: 200,
    description: 'Premium paneer with pizza spices and cheese',
    isVeg: true,
    isAvailable: true,
    stockLevel: 30,
    imageUrl: '/images/menu/pizza-paneer.png',
    spiceLevels: ['mild', 'medium'],
    customizations: ['Extra cheese', 'Extra sauce'],
  },
];

export const sampleOrders: Order[] = [
  {
    id: 'ORD-123456',
    userId: 'user-001',
    items: [
      {
        menuItem: sampleMenuItems[0],
        quantity: 5,
        spiceLevel: 'medium',
        subtotal: 25,
      },
      {
        menuItem: sampleMenuItems[2],
        quantity: 5,
        spiceLevel: 'hot',
        subtotal: 30,
      },
    ],
    subtotal: 55,
    tax: 2.75,
    discount: 0,
    total: 57.75,
    status: 'preparing',
    paymentStatus: 'paid',
    paymentMethod: 'phonepe',
    phonepeTransactionId: 'TXN-1234567890-1234',
    createdAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(), // 10 minutes ago
    confirmedAt: new Date(Date.now() - 9 * 60 * 1000).toISOString(),
    preparingAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    estimatedTime: 20,
    canCancel: false,
  },
];
