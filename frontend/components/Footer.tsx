import Link from 'next/link';
import TrustpilotWidget from './TrustpilotWidget';

export default function Footer() {
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
          <div>
            <h3 className="font-semibold text-foreground mb-3">External Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="https://best-ai-directory.eu/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent-foreground transition-colors text-sm">
                  Best AI Tools
                </a>
                <span className="text-muted-foreground mx-2">·</span>
                <a href="https://aiaccelerator.bg/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent-foreground transition-colors text-sm">
                  AI Automation Services
                </a>
              </li>
            </ul>
          </div>
        </div>
        {/* <div className="mt-8">
          <TrustpilotWidget />
        </div> */}
        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-muted-foreground text-sm">
          <div>© {new Date().getFullYear()} Saas Boilerplate Starters. All rights reserved. <a href="https://www.linkedin.com/in/man0l" target="_blank" rel="noopener noreferrer" className="hover:text-accent-foreground transition-colors">Created by Manol</a></div>
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