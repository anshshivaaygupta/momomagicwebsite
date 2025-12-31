
export interface FranchiseInvestment {
  franchiseFee: number;
  kitchenSetupMin: number;
  kitchenSetupMax: number;
  initialInventory: number;
  marketingSupport: number;
}

export interface FranchiseRoyalty {
  percentage: number;
  fixedAmount: number;
  calculationType: 'percentage' | 'fixed';
}

export interface FranchiseSupport {
  trainingDuration: number;
  marketingAssistance: boolean;
  operationalSupport: boolean;
  qualityControl: boolean;
}

export interface FranchiseLocation {
  id: string;
  city: string;
  state: string;
  status: 'available' | 'coming-soon' | 'sold-out' | 'head-office';
  availableUnits: number;
  territory: string;
  priority: number;
  position: {
    top: string;
    left: string;
  };
}

export interface FranchiseApplication {
  id: string;
  applicantName: string;
  email: string;
  phone: string;
  currentCity: string;
  preferredLocation: string;
  investmentCapacity: string;
  experience: string;
  timeline: string;
  motivation: string;
  questions: string;
  status: 'new' | 'contacted' | 'meeting-scheduled' | 'approved' | 'rejected';
  createdAt: string;
  notes: string;
}

export interface FranchiseBenefit {
  id: string;
  icon: string;
  title: string;
  description: string;
  points: string[];
}

export interface FranchiseProcessStep {
  stepNumber: number;
  title: string;
  description: string;
  details: string[];
  duration: string;
}

export interface FranchiseTestimonial {
  id: string;
  content: string;
  authorName: string;
  authorTitle: string;
  authorStatus: string;
  authorImage: string;
}

export interface FranchiseDocument {
  id: string;
  icon: string;
  title: string;
  description: string;
  fileSize: string;
  metadata: string;
  downloadUrl: string;
  type: 'download' | 'contact';
}

export interface FranchiseSettings {
  investment: FranchiseInvestment;
  royalty: FranchiseRoyalty;
  support: FranchiseSupport;
  isLaunched: boolean;
  launchDate: string;
}

export const franchiseInvestment: FranchiseInvestment = {
  franchiseFee: 50000,
  kitchenSetupMin: 100000,
  kitchenSetupMax: 200000,
  initialInventory: 25000,
  marketingSupport: 15000,
};

export const franchiseRoyalty: FranchiseRoyalty = {
  percentage: 5,
  fixedAmount: 0,
  calculationType: 'percentage',
};

export const franchiseSupport: FranchiseSupport = {
  trainingDuration: 15,
  marketingAssistance: true,
  operationalSupport: true,
  qualityControl: true,
};

export const franchiseLocations: FranchiseLocation[] = [
  {
    id: 'patna',
    city: 'Patna',
    state: 'Bihar',
    status: 'available',
    availableUnits: 3,
    territory: 'Patna District',
    priority: 1,
    position: { top: '35%', left: '60%' },
  },
  {
    id: 'gaya',
    city: 'Gaya',
    state: 'Bihar',
    status: 'available',
    availableUnits: 2,
    territory: 'Gaya District',
    priority: 2,
    position: { top: '55%', left: '55%' },
  },
  {
    id: 'muzaffarpur',
    city: 'Muzaffarpur',
    state: 'Bihar',
    status: 'available',
    availableUnits: 2,
    territory: 'Muzaffarpur District',
    priority: 3,
    position: { top: '25%', left: '50%' },
  },
  {
    id: 'bhagalpur',
    city: 'Bhagalpur',
    state: 'Bihar',
    status: 'coming-soon',
    availableUnits: 0,
    territory: 'Bhagalpur District',
    priority: 4,
    position: { top: '30%', left: '75%' },
  },
  {
    id: 'sherghati',
    city: 'Sherghati',
    state: 'Bihar',
    status: 'head-office',
    availableUnits: 0,
    territory: 'Gaya District',
    priority: 0,
    position: { top: '50%', left: '50%' },
  },
  {
    id: 'darbhanga',
    city: 'Darbhanga',
    state: 'Bihar',
    status: 'coming-soon',
    availableUnits: 0,
    territory: 'Darbhanga District',
    priority: 5,
    position: { top: '20%', left: '55%' },
  },
  {
    id: 'purnia',
    city: 'Purnia',
    state: 'Bihar',
    status: 'coming-soon',
    availableUnits: 0,
    territory: 'Purnia District',
    priority: 6,
    position: { top: '15%', left: '70%' },
  },
  {
    id: 'arrah',
    city: 'Arrah',
    state: 'Bihar',
    status: 'coming-soon',
    availableUnits: 0,
    territory: 'Bhojpur District',
    priority: 7,
    position: { top: '40%', left: '45%' },
  },
];

export const franchiseBenefits: FranchiseBenefit[] = [
  {
    id: 'proven-model',
    icon: '📈',
    title: 'Proven Business Model',
    description: 'Successfully tested in Sherghati with 2000+ happy customers and consistent growth',
    points: [
      'Daily sales tracking system',
      'Inventory management tools',
      'Customer feedback system',
      'Performance analytics',
    ],
  },
  {
    id: 'brand-recognition',
    icon: '🏆',
    title: 'Brand Recognition',
    description: 'Leverage our award-winning reputation and customer trust from day one',
    points: [
      '"Best Quality Food" award winner',
      '4.9/5 Google rating',
      'FSSAI certified quality',
      'Local media coverage',
    ],
  },
  {
    id: 'training-support',
    icon: '🎓',
    title: 'Complete Training & Support',
    description: 'From kitchen setup to customer service - we train you for success',
    points: [
      '15-day intensive training',
      'Secret recipes & techniques',
      'Marketing & sales training',
      'Ongoing operational support',
    ],
  },
  {
    id: 'marketing-assistance',
    icon: '📱',
    title: 'Marketing Assistance',
    description: 'We handle brand marketing while you focus on operations',
    points: [
      'Digital marketing campaigns',
      'Social media management',
      'Local promotion support',
      'Grand opening events',
    ],
  },
];

export const franchiseProcessSteps: FranchiseProcessStep[] = [
  {
    stepNumber: 1,
    title: 'Inquiry & Initial Meeting',
    description: 'Submit your application and have a virtual meeting with our franchise team',
    details: [
      'Fill online application form',
      'Initial eligibility check',
      'Virtual meeting (30-45 mins)',
      'Receive franchise kit',
    ],
    duration: '2-3 days',
  },
  {
    stepNumber: 2,
    title: 'Location Finalization & Agreement',
    description: 'Finalize your location and sign the franchise agreement',
    details: [
      'Location survey and approval',
      'Franchise agreement signing',
      'Initial investment payment',
      'Bank loan assistance',
    ],
    duration: '1-2 weeks',
  },
  {
    stepNumber: 3,
    title: 'Training & Setup',
    description: 'Complete training and set up your Momos Magic outlet',
    details: [
      '15-day intensive training',
      'Kitchen setup and design',
      'Equipment installation',
      'Staff hiring assistance',
    ],
    duration: '3-4 weeks',
  },
  {
    stepNumber: 4,
    title: 'Launch & Ongoing Support',
    description: 'Grand opening and continuous support for your success',
    details: [
      'Grand opening event',
      'Marketing campaigns',
      'First month hand-holding',
      'Ongoing operational support',
    ],
    duration: 'Ongoing',
  },
];

export const franchiseTestimonials: FranchiseTestimonial[] = [
  {
    id: 'testimonial-1',
    content:
      'The business model is solid and the brand reputation in Sherghati is exceptional. I\'m excited to bring Momos Magic to Patna!',
    authorName: 'Rajesh Kumar',
    authorTitle: 'Potential Franchisee, Patna',
    authorStatus: '📍 Location Approved',
    authorImage: '/images/franchise/testimonial-1.jpg',
  },
  {
    id: 'testimonial-2',
    content:
      'The ROI projections are realistic and the support system seems comprehensive. Perfect opportunity for first-time entrepreneurs.',
    authorName: 'Priya Singh',
    authorTitle: 'Business Consultant, Gaya',
    authorStatus: '📊 Financials Verified',
    authorImage: '/images/franchise/testimonial-2.jpg',
  },
  {
    id: 'testimonial-3',
    content:
      'As someone from food industry, I appreciate the quality standards and secret recipes. This franchise has great potential.',
    authorName: 'Amit Sharma',
    authorTitle: 'Restaurant Owner, Muzaffarpur',
    authorStatus: '👨‍🍳 Industry Experience',
    authorImage: '/images/franchise/testimonial-3.jpg',
  },
];

export const franchiseDocuments: FranchiseDocument[] = [
  {
    id: 'franchise-kit',
    icon: '📋',
    title: 'Franchise Information Kit',
    description: 'Complete details about franchise opportunity, requirements, and benefits',
    fileSize: '2.5 MB',
    metadata: 'Updated: Jan 2025',
    downloadUrl: '/downloads/franchise-kit.pdf',
    type: 'download',
  },
  {
    id: 'business-plan',
    icon: '📊',
    title: 'Business Plan Template',
    description: 'Detailed business plan with financial projections and operational guide',
    fileSize: '1.8 MB',
    metadata: 'Excel Templates Included',
    downloadUrl: '/downloads/business-plan-template.pdf',
    type: 'download',
  },
  {
    id: 'location-guidelines',
    icon: '🏪',
    title: 'Location Guidelines',
    description: 'Requirements and recommendations for franchise location selection',
    fileSize: '1.2 MB',
    metadata: 'Site Evaluation Checklist',
    downloadUrl: '/downloads/location-guidelines.pdf',
    type: 'download',
  },
  {
    id: 'contact-team',
    icon: '📞',
    title: 'Contact Franchise Team',
    description: 'Get direct access to our franchise development team for queries',
    fileSize: '',
    metadata: '',
    downloadUrl: 'tel:+919955955191',
    type: 'contact',
  },
];

export const franchiseSettings: FranchiseSettings = {
  investment: franchiseInvestment,
  royalty: franchiseRoyalty,
  support: franchiseSupport,
  isLaunched: false,
  launchDate: '2025-06-01',
};


export function calculateTotalInvestment(kitchenSetup: number): number {
  return (
    franchiseInvestment.franchiseFee +
    kitchenSetup +
    franchiseInvestment.initialInventory +
    franchiseInvestment.marketingSupport
  );
}

export function calculateMonthlyRevenue(dailyCustomers: number, avgOrderValue: number): number {
  return dailyCustomers * avgOrderValue * 30;
}

export function calculateMonthlyExpenses(revenue: number): {
  rawMaterials: number;
  rentUtilities: number;
  staffSalary: number;
  royalty: number;
  total: number;
} {
  const rawMaterials = revenue * 0.4;
  const rentUtilities = 12000;
  const staffSalary = 16000;
  const royalty = revenue * (franchiseRoyalty.percentage / 100);
  const total = rawMaterials + rentUtilities + staffSalary + royalty;

  return {
    rawMaterials,
    rentUtilities,
    staffSalary,
    royalty,
    total,
  };
}

export function calculateMonthlyProfit(revenue: number): number {
  const expenses = calculateMonthlyExpenses(revenue);
  return revenue - expenses.total;
}

export function calculateROIMonths(totalInvestment: number, monthlyProfit: number): number {
  return Math.ceil(totalInvestment / monthlyProfit);
}

export function getAvailableLocations(): FranchiseLocation[] {
  return franchiseLocations.filter((location) => location.status === 'available');
}

export function getComingSoonLocations(): FranchiseLocation[] {
  return franchiseLocations.filter((location) => location.status === 'coming-soon');
}

export function getLocationById(id: string): FranchiseLocation | undefined {
  return franchiseLocations.find((location) => location.id === id);
}

export function getLocationsByStatus(
  status: 'available' | 'coming-soon' | 'sold-out' | 'head-office'
): FranchiseLocation[] {
  return franchiseLocations.filter((location) => location.status === status);
}
