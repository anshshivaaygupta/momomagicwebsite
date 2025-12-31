
export interface LegalSection {
  id: string;
  title: string;
  content: string | React.ReactNode;
  subsections?: LegalSubsection[];
}

export interface LegalSubsection {
  id: string;
  title: string;
  content: string | React.ReactNode;
}

export interface LegalPage {
  slug: string;
  title: string;
  lastUpdated: string;
  summary: string;
  sections: LegalSection[];
}

export interface ContactMethod {
  icon: string;
  title: string;
  detail: string;
  hours: string;
  action: string;
  actionLink: string;
}

export interface JobPosting {
  id: string;
  title: string;
  category: string;
  location: string;
  type: string; // Full-time, Part-time, Contract
  experience: string;
  salary: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  isActive: boolean;
  postedDate: string;
}

export interface JobApplication {
  id: string;
  jobId: string;
  fullName: string;
  phone: string;
  email: string;
  city: string;
  position: string;
  experience: string;
  expectedSalary: string;
  noticePeriod: string;
  motivation: string;
  skills: string;
  status: 'pending' | 'reviewing' | 'shortlisted' | 'rejected' | 'hired';
  appliedDate: string;
}

export const contactMethods: ContactMethod[] = [
  {
    icon: '📞',
    title: 'Call Us',
    detail: '+91 9955955191',
    hours: '10:00 AM - 10:00 PM (Every Day)',
    action: 'Call Now',
    actionLink: 'tel:+919955955191'
  },
  {
    icon: '💬',
    title: 'WhatsApp',
    detail: 'Same Number',
    hours: 'Instant Reply Guaranteed',
    action: 'Message on WhatsApp',
    actionLink: 'https://wa.me/919955955191'
  },
  {
    icon: '🏪',
    title: 'Visit Us',
    detail: 'Naya Bazar, Near Post Office',
    hours: 'Sherghati, Bihar 824211',
    action: 'Get Directions',
    actionLink: 'https://maps.google.com/?q=Momos+Magic+Sherghati'
  },
  {
    icon: '📧',
    title: 'Email Us',
    detail: 'contact@momomagics.com',
    hours: 'Response within 6 hours',
    action: 'Send Email',
    actionLink: 'mailto:contact@momomagics.com'
  }
];

export const jobCategories = [
  {
    icon: '🍳',
    title: 'Kitchen Staff',
    subtitle: 'Momos Specialists & Food Preparers',
    requirements: [
      'Food preparation expertise',
      'Hygiene consciousness',
      'Team player attitude'
    ]
  },
  {
    icon: '🚗',
    title: 'Delivery Partners',
    subtitle: 'Bike/Cycle Delivery Staff',
    requirements: [
      'Knowledge of local areas',
      'Punctual and reliable',
      'Good communication skills'
    ]
  },
  {
    icon: '📞',
    title: 'Customer Support',
    subtitle: 'Phone & WhatsApp Support',
    requirements: [
      'Excellent communication',
      'Problem-solving skills',
      'Customer-first attitude'
    ]
  },
  {
    icon: '💼',
    title: 'Management Trainees',
    subtitle: 'Future Leaders & Managers',
    requirements: [
      'Leadership potential',
      'Business acumen',
      'Growth mindset'
    ]
  }
];

export const workBenefits = [
  {
    icon: '💰',
    title: 'Competitive Salary',
    description: 'Fair compensation with performance incentives'
  },
  {
    icon: '🎓',
    title: 'Training & Growth',
    description: 'Comprehensive training and career advancement opportunities'
  },
  {
    icon: '🍕',
    title: 'Free Meals',
    description: 'Complimentary meals during shifts'
  },
  {
    icon: '👨‍👩‍👧‍👦',
    title: 'Family Environment',
    description: 'Supportive team and positive work culture'
  }
];

export const sampleJobPostings: JobPosting[] = [
  {
    id: 'job-001',
    title: 'Momos Specialist',
    category: 'Kitchen Staff',
    location: 'Sherghati, Bihar',
    type: 'Full-time',
    experience: '0-2 years',
    salary: '₹10,000 - ₹15,000/month',
    description: 'We are looking for a passionate momos specialist to join our kitchen team.',
    requirements: [
      'Experience in momos preparation (preferred)',
      'Understanding of food hygiene standards',
      'Ability to work in fast-paced environment',
      'Team player with positive attitude'
    ],
    responsibilities: [
      'Prepare various types of momos as per recipes',
      'Maintain cleanliness and hygiene in kitchen',
      'Follow food safety protocols',
      'Assist in inventory management'
    ],
    benefits: [
      'Competitive salary',
      'Free meals during shifts',
      'Training provided',
      'Growth opportunities'
    ],
    isActive: true,
    postedDate: '2025-01-15'
  }
];

export const jobApplicationsStore = new Map<string, JobApplication>();

export function canApplyForJob(jobId: string): boolean {
  const job = sampleJobPostings.find(j => j.id === jobId);
  return job?.isActive || false;
}
