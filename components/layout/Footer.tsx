import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-deep-space border-t border-charcoal">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="col-span-1 md:col-span-2 lg:col-span-2">
            <h3 className="text-2xl font-bold text-premium-orange mb-4">
              Momos Magic
            </h3>
            <p className="text-foreground/80 mb-4">
              From Humble Stall to Culinary Legend. Experience the Magic That 
              Transformed Sherghati's Street Food Scene.
            </p>
            <div className="flex space-x-4 mb-6">
              <span className="text-vegetarian-green">📍</span>
              <span className="text-foreground/80">
                Naya Bazar, Near Post Office<br />
                Sherghati, Bihar 824211
              </span>
            </div>
            
            {/* Download App Section */}
            <div className="mt-6">
              <h4 className="text-lg font-semibold text-golden-glow mb-3">
                📱 Get Our App
              </h4>
              <Link 
                href="/download-app" 
                className="inline-block bg-premium-orange text-pitch-black px-6 py-3 rounded-lg text-sm font-bold hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(255,194,65,0.3)] transition-all duration-300"
              >
                Download Now
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-golden-glow mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-foreground/80 hover:text-premium-orange transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/menu" className="text-foreground/80 hover:text-premium-orange transition-colors">
                  Menu
                </Link>
              </li>
              <li>
                <Link href="/combo-deals" className="text-foreground/80 hover:text-premium-orange transition-colors">
                  Combo Deals
                </Link>
              </li>
              <li>
                <Link href="/catering" className="text-foreground/80 hover:text-premium-orange transition-colors">
                  Catering
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-foreground/80 hover:text-premium-orange transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/franchise" className="text-foreground/80 hover:text-premium-orange transition-colors">
                  Franchise
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-foreground/80 hover:text-premium-orange transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-foreground/80 hover:text-premium-orange transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-golden-glow mb-4">
              Legal
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy-policy" className="text-foreground/80 hover:text-premium-orange transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-conditions" className="text-foreground/80 hover:text-premium-orange transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/refund-cancellation" className="text-foreground/80 hover:text-premium-orange transition-colors">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/shipping-delivery" className="text-foreground/80 hover:text-premium-orange transition-colors">
                  Delivery Policy
                </Link>
              </li>
              <li>
                <Link href="/online-ordering-policy" className="text-foreground/80 hover:text-premium-orange transition-colors">
                  Online Ordering
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-foreground/80 hover:text-premium-orange transition-colors">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-golden-glow mb-4">
              Contact Info
            </h4>
            <ul className="space-y-2 text-foreground/80">
              <li>📞 +91 9955955191</li>
              <li>🌐 www.momomegics.com</li>
              <li>⏰ 10:00 AM - 10:00 PM</li>
              <li>📅 Every Day</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-charcoal mt-8 pt-8 relative">
          <p className="text-foreground/60 text-center">
            © 2024 Momos Magic. All rights reserved. | FSSAI License: 20424201001152
          </p>
          
          {/* Admin Login Button - Bottom Right */}
          <Link 
            href="/admin/login" 
            className="absolute bottom-0 right-0 bg-premium-orange text-pitch-black px-4 py-2 rounded-lg text-sm font-bold hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(255,194,65,0.3)] transition-all duration-300"
          >
            Admin Login
          </Link>
        </div>
      </div>
    </footer>
  );
};
