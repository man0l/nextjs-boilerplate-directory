'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) throw new Error('Subscription failed');

      setStatus('success');
      setEmail('');
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <footer className="bg-secondary border-t border-gray-100">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold text-foreground mb-3">About</h3>
            <p className="text-muted-foreground text-sm">
              Discover and explore the best AI tools to enhance your workflow and productivity.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/submit" className="text-muted-foreground hover:text-accent-foreground transition-colors text-sm">
                  Submit Tool
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-muted-foreground hover:text-accent-foreground transition-colors text-sm">
                  Categories
                </Link>
              </li>
            </ul>
          </div>
          <div className="Categories">
            <h3 className="font-semibold text-foreground mb-4">Categories</h3>
            <div className="space-y-2">
              <Link 
                href="/category/generative-art" 
                className="block text-muted-foreground hover:text-accent-foreground transition-colors"
              >
                Best AI Generative Art Tools
              </Link>
              <Link 
                href="/category/social-media" 
                className="block text-muted-foreground hover:text-accent-foreground transition-colors"
              >
                Best AI Social Media Tools
              </Link>
              <Link 
                href="/category/marketing" 
                className="block text-muted-foreground hover:text-accent-foreground transition-colors"
              >
                Best AI Marketing Tools
              </Link>
              <Link 
                href="/category/copywriting" 
                className="block text-muted-foreground hover:text-accent-foreground transition-colors"
              >
                Best AI Copywriting Tools
              </Link>
              <Link 
                href="/category/ai-detection" 
                className="block text-muted-foreground hover:text-accent-foreground transition-colors"
              >
                Best Detection Tools
              </Link>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-3">Newsletter</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Stay updated with the latest AI tools and trends.
            </p>
            <form onSubmit={handleSubmit} className="space-y-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="input"
                required
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="button-primary w-full"
              >
                {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
              </button>
              {status === 'success' && (
                <p className="text-green-600 text-sm">Successfully subscribed!</p>
              )}
              {status === 'error' && (
                <p className="text-red-600 text-sm">Subscription failed. Please try again.</p>
              )}
            </form>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-muted-foreground text-sm">
          © {new Date().getFullYear()} Best AI Tools. All rights reserved.
        </div>
      </div>
    </footer>
  );
} 