export interface SectionTemplate {
  id: string;
  name: string;
  category: string;
  thumbnail: string;
  description: string;
  elements: string[];
  html: string;
  css?: string;
  defaultContent?: Record<string, any>;
}

export const sectionTemplates: SectionTemplate[] = [
  {
    id: 'hero-video',
    name: 'Video Background Hero',
    category: 'hero',
    thumbnail: '/templates/hero-video.jpg',
    description: 'Full-screen video with overlay text and CTA buttons',
    elements: ['video-background', 'main-headline', 'subheadline', 'cta-buttons'],
    html: `
      <section class="hero-video relative h-screen flex items-center justify-center overflow-hidden">
        <video autoplay loop muted class="absolute inset-0 w-full h-full object-cover">
          <source src="/videos/hero-bg.mp4" type="video/mp4">
        </video>
        <div class="absolute inset-0 bg-pitch-black/60"></div>
        <div class="relative z-10 text-center px-4 max-w-4xl">
          <h1 class="text-5xl md:text-7xl font-bold text-white mb-6">{{headline}}</h1>
          <p class="text-xl md:text-2xl text-gray-200 mb-8">{{subheadline}}</p>
          <div class="flex gap-4 justify-center">
            <button class="bg-premium-orange text-pitch-black px-8 py-4 rounded-lg font-bold hover:bg-golden-glow transition-all">
              {{ctaText}}
            </button>
            <button class="border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white hover:text-pitch-black transition-all">
              {{secondaryCtaText}}
            </button>
          </div>
        </div>
      </section>
    `,
    defaultContent: {
      headline: 'From Humble Stall to Culinary Legend',
      subheadline: 'Experience the Magic That Transformed Sherghati\'s Street Food Scene',
      ctaText: 'Order Now',
      secondaryCtaText: 'View Menu'
    }
  },
  {
    id: 'hero-slider',
    name: 'Image Slider Hero',
    category: 'hero',
    thumbnail: '/templates/hero-slider.jpg',
    description: 'Rotating image carousel with overlay content',
    elements: ['image-slider', 'text-overlay', 'navigation-dots'],
    html: `
      <section class="hero-slider relative h-screen">
        <div class="slider-container h-full">
          <div class="slide active">
            <img src="{{image1}}" alt="Slide 1" class="w-full h-full object-cover">
            <div class="absolute inset-0 bg-pitch-black/50 flex items-center justify-center">
              <div class="text-center text-white px-4">
                <h2 class="text-5xl font-bold mb-4">{{slide1Title}}</h2>
                <p class="text-xl">{{slide1Description}}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
          <button class="w-3 h-3 rounded-full bg-white"></button>
          <button class="w-3 h-3 rounded-full bg-white/50"></button>
          <button class="w-3 h-3 rounded-full bg-white/50"></button>
        </div>
      </section>
    `,
    defaultContent: {
      image1: '/images/hero-1.jpg',
      slide1Title: 'Award-Winning Momos',
      slide1Description: 'Best Quality Food in Sherghati'
    }
  },
  {
    id: 'hero-minimal',
    name: 'Minimal Text Hero',
    category: 'hero',
    thumbnail: '/templates/hero-minimal.jpg',
    description: 'Clean typography-focused design with centered content',
    elements: ['large-headline', 'subtitle', 'centered-cta'],
    html: `
      <section class="hero-minimal min-h-screen flex items-center justify-center bg-pitch-black text-white px-4">
        <div class="max-w-4xl text-center">
          <h1 class="text-6xl md:text-8xl font-bold mb-6 leading-tight">{{headline}}</h1>
          <p class="text-2xl md:text-3xl text-gray-300 mb-12">{{subtitle}}</p>
          <button class="bg-premium-orange text-pitch-black px-12 py-5 rounded-lg text-xl font-bold hover:bg-golden-glow transition-all">
            {{ctaText}}
          </button>
        </div>
      </section>
    `,
    defaultContent: {
      headline: 'Momos Magic',
      subtitle: 'Sherghati\'s First Kurkure Momos Creator',
      ctaText: 'Explore Menu'
    }
  },

  {
    id: 'features-3col',
    name: '3-Column Features',
    category: 'content',
    thumbnail: '/templates/features-3col.jpg',
    description: 'Icon, title, and description in responsive grid',
    elements: ['section-heading', 'feature-cards', 'icons', 'descriptions'],
    html: `
      <section class="features-3col py-20 px-4 bg-deep-space">
        <div class="max-w-6xl mx-auto">
          <h2 class="text-4xl md:text-5xl font-bold text-center text-white mb-4">{{sectionTitle}}</h2>
          <p class="text-xl text-center text-gray-400 mb-16">{{sectionSubtitle}}</p>
          <div class="grid md:grid-cols-3 gap-8">
            <div class="feature-card bg-charcoal p-8 rounded-lg text-center hover:bg-pitch-black transition-all">
              <div class="text-5xl mb-4">{{icon1}}</div>
              <h3 class="text-2xl font-bold text-white mb-3">{{feature1Title}}</h3>
              <p class="text-gray-400">{{feature1Description}}</p>
            </div>
            <div class="feature-card bg-charcoal p-8 rounded-lg text-center hover:bg-pitch-black transition-all">
              <div class="text-5xl mb-4">{{icon2}}</div>
              <h3 class="text-2xl font-bold text-white mb-3">{{feature2Title}}</h3>
              <p class="text-gray-400">{{feature2Description}}</p>
            </div>
            <div class="feature-card bg-charcoal p-8 rounded-lg text-center hover:bg-pitch-black transition-all">
              <div class="text-5xl mb-4">{{icon3}}</div>
              <h3 class="text-2xl font-bold text-white mb-3">{{feature3Title}}</h3>
              <p class="text-gray-400">{{feature3Description}}</p>
            </div>
          </div>
        </div>
      </section>
    `,
    defaultContent: {
      sectionTitle: 'Why Choose Momos Magic',
      sectionSubtitle: 'Quality, Innovation, and Taste in Every Bite',
      icon1: '🏆',
      feature1Title: 'Award-Winning Quality',
      feature1Description: 'Recognized by District Magistrate for Best Quality Food',
      icon2: '✨',
      feature2Title: 'Unique Innovations',
      feature2Description: 'First to introduce Kurkure and Pizza Momos in Bihar',
      icon3: '🌱',
      feature3Title: '100% Vegetarian',
      feature3Description: 'FSSAI certified with pure vegetarian ingredients'
    }
  },
  {
    id: 'timeline-story',
    name: 'Timeline Story',
    category: 'content',
    thumbnail: '/templates/timeline-story.jpg',
    description: 'Horizontal timeline with milestones and dates',
    elements: ['timeline', 'milestones', 'dates', 'descriptions'],
    html: `
      <section class="timeline-story py-20 px-4 bg-pitch-black">
        <div class="max-w-6xl mx-auto">
          <h2 class="text-4xl md:text-5xl font-bold text-center text-white mb-16">{{sectionTitle}}</h2>
          <div class="relative">
            <div class="absolute left-0 right-0 h-1 bg-premium-orange top-1/2 transform -translate-y-1/2"></div>
            <div class="grid md:grid-cols-4 gap-8 relative">
              <div class="timeline-item text-center">
                <div class="w-16 h-16 bg-premium-orange rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-pitch-black">
                  {{milestone1Icon}}
                </div>
                <h3 class="text-xl font-bold text-white mb-2">{{milestone1Date}}</h3>
                <p class="text-gray-400">{{milestone1Description}}</p>
              </div>
              <div class="timeline-item text-center">
                <div class="w-16 h-16 bg-premium-orange rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-pitch-black">
                  {{milestone2Icon}}
                </div>
                <h3 class="text-xl font-bold text-white mb-2">{{milestone2Date}}</h3>
                <p class="text-gray-400">{{milestone2Description}}</p>
              </div>
              <div class="timeline-item text-center">
                <div class="w-16 h-16 bg-premium-orange rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-pitch-black">
                  {{milestone3Icon}}
                </div>
                <h3 class="text-xl font-bold text-white mb-2">{{milestone3Date}}</h3>
                <p class="text-gray-400">{{milestone3Description}}</p>
              </div>
              <div class="timeline-item text-center">
                <div class="w-16 h-16 bg-premium-orange rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-pitch-black">
                  {{milestone4Icon}}
                </div>
                <h3 class="text-xl font-bold text-white mb-2">{{milestone4Date}}</h3>
                <p class="text-gray-400">{{milestone4Description}}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    `,
    defaultContent: {
      sectionTitle: 'Our Journey',
      milestone1Icon: '🎯',
      milestone1Date: 'Sep 2023',
      milestone1Description: 'Humble beginnings with small stall',
      milestone2Icon: '🥟',
      milestone2Date: 'Nov 2023',
      milestone2Description: 'Pita to Momos transformation',
      milestone3Icon: '✨',
      milestone3Date: 'Jan 2024',
      milestone3Description: 'Kurkure Momos innovation',
      milestone4Icon: '🏆',
      milestone4Date: 'Jun 2024',
      milestone4Description: 'Best Quality Food award'
    }
  },
  {
    id: 'stats-counter',
    name: 'Animated Stats',
    category: 'content',
    thumbnail: '/templates/stats-counter.jpg',
    description: 'Number counters with labels and icons',
    elements: ['animated-numbers', 'stat-labels', 'icons'],
    html: `
      <section class="stats-counter py-20 px-4 bg-premium-orange">
        <div class="max-w-6xl mx-auto">
          <div class="grid md:grid-cols-4 gap-8 text-center">
            <div class="stat-item">
              <div class="text-6xl font-bold text-pitch-black mb-2">{{stat1Number}}</div>
              <p class="text-xl text-pitch-black/80">{{stat1Label}}</p>
            </div>
            <div class="stat-item">
              <div class="text-6xl font-bold text-pitch-black mb-2">{{stat2Number}}</div>
              <p class="text-xl text-pitch-black/80">{{stat2Label}}</p>
            </div>
            <div class="stat-item">
              <div class="text-6xl font-bold text-pitch-black mb-2">{{stat3Number}}</div>
              <p class="text-xl text-pitch-black/80">{{stat3Label}}</p>
            </div>
            <div class="stat-item">
              <div class="text-6xl font-bold text-pitch-black mb-2">{{stat4Number}}</div>
              <p class="text-xl text-pitch-black/80">{{stat4Label}}</p>
            </div>
          </div>
        </div>
      </section>
    `,
    defaultContent: {
      stat1Number: '2000+',
      stat1Label: 'Happy Customers',
      stat2Number: '15+',
      stat2Label: 'Menu Varieties',
      stat3Number: '4.9',
      stat3Label: 'Average Rating',
      stat4Number: '100%',
      stat4Label: 'Vegetarian'
    }
  },

  {
    id: 'menu-grid-3col',
    name: '3-Column Menu Grid',
    category: 'menu',
    thumbnail: '/templates/menu-grid-3col.jpg',
    description: 'Menu items in clean grid layout with prices',
    elements: ['menu-cards', 'prices', 'images', 'add-to-cart'],
    html: `
      <section class="menu-grid py-20 px-4 bg-deep-space">
        <div class="max-w-6xl mx-auto">
          <h2 class="text-4xl md:text-5xl font-bold text-center text-white mb-16">{{sectionTitle}}</h2>
          <div class="grid md:grid-cols-3 gap-8">
            <div class="menu-card bg-charcoal rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all">
              <img src="{{item1Image}}" alt="{{item1Name}}" class="w-full h-48 object-cover">
              <div class="p-6">
                <h3 class="text-2xl font-bold text-white mb-2">{{item1Name}}</h3>
                <p class="text-gray-400 mb-4">{{item1Description}}</p>
                <div class="flex justify-between items-center">
                  <span class="text-premium-orange font-bold text-xl">₹{{item1Price}}</span>
                  <button class="bg-premium-orange text-pitch-black px-4 py-2 rounded-lg font-bold hover:bg-golden-glow transition-all">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `,
    defaultContent: {
      sectionTitle: 'Featured Menu',
      item1Image: '/images/menu/kurkure-momos.jpg',
      item1Name: 'Kurkure Momos',
      item1Description: 'Sherghati exclusive crispy kurkure momos',
      item1Price: '50'
    }
  },

];

export const sectionCategories = [
  { id: 'hero', name: 'Hero Sections', icon: '🎯' },
  { id: 'content', name: 'Content Sections', icon: '📄' },
  { id: 'menu', name: 'Menu & Products', icon: '🥟' },
  { id: 'testimonials', name: 'Testimonials', icon: '⭐' },
  { id: 'contact', name: 'Contact & Forms', icon: '📧' },
  { id: 'footer', name: 'Footer Sections', icon: '🔻' },
];
