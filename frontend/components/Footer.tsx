'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function Footer() {
  const TrustpilotWidget = () => {
    useEffect(() => {
      // Wait for Trustpilot to be available
      const initTrustpilot = () => {
        if (window.Trustpilot) {
          window.Trustpilot.loadFromElement(document.getElementById('trustbox'));
        } else {
          setTimeout(initTrustpilot, 100);
        }
      };

      initTrustpilot();
    }, []);

    return (
      <div
        id="trustbox"
        className="trustpilot-widget"
        data-locale="en-US"
        data-template-id="56278e9abfbbba0bdcd568bc"
        data-businessunit-id="6771aa4f775a7e4dc3a6b1dd"
        data-style-height="52px"
        data-style-width="100%"
        data-theme="light"
      >
        <a
          href="https://www.trustpilot.com/review/saas-boilerplate-starters.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Trustpilot
        </a>
      </div>
    );
  };

  return (
    <footer className="bg-secondary border-t border-gray-100">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold text-foreground mb-3">About</h3>
            <p className="text-muted-foreground text-sm">
              Explore the ultimate collection of top-notch Saas Boilerplate Starters.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/submit" className="text-muted-foreground hover:text-accent-foreground transition-colors text-sm">
                  Submit Boilerplate
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-muted-foreground hover:text-accent-foreground transition-colors text-sm">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-accent-foreground transition-colors text-sm">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-accent-foreground transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div className="Categories">
            <h3 className="font-semibold text-foreground mb-4">Saas Boilerplate Starters</h3>
            <div className="space-y-2">
              <Link 
                href="/category/next-js" 
                className="block text-muted-foreground hover:text-accent-foreground transition-colors"
              >
                Next.js Boilerplate Starters
              </Link>
              <Link 
                href="/category/laravel" 
                className="block text-muted-foreground hover:text-accent-foreground transition-colors"
              >
                Laravel Boilerplate Starters
              </Link>
              <Link 
                href="/category/django" 
                className="block text-muted-foreground hover:text-accent-foreground transition-colors"
              >
                Django Boilerplate Starters
              </Link>
              <Link 
                href="/category/remix" 
                className="block text-muted-foreground hover:text-accent-foreground transition-colors"
              >
                Remix Boilerplate Starters
              </Link>
              <Link 
                href="/category/express-js" 
                className="block text-muted-foreground hover:text-accent-foreground transition-colors"
              >
                Express.js Boilerplate Starters
              </Link>
            </div>
          </div>
        </div>
        {/* <div className="mt-8">
          <TrustpilotWidget />
        </div> */}
        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-muted-foreground text-sm">
          <div>© {new Date().getFullYear()} Saas Boilerplate Starters. All rights reserved.</div>
          <div className="mt-2 space-x-4">
            <Link href="/terms" className="hover:text-accent-foreground transition-colors">
              Terms & Conditions
            </Link>
            <span>·</span>
            <Link href="/privacy" className="hover:text-accent-foreground transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
} 