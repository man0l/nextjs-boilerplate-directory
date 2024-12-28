'use client';

import Link from 'next/link';
import { useState } from 'react';
import SubmitToolModal from './SubmitToolModal';

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <header className="bg-white border-b border-gray-100">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-xl font-bold gradient-text">
              Best AI Tools
            </Link>
            <div className="flex gap-6 items-center">
              <Link href="/categories" className="text-muted-foreground hover:text-foreground transition-colors">
                Categories
              </Link>
              <button
                onClick={() => setIsModalOpen(true)}
                className="button-primary"
              >
                Submit Tool
              </button>
            </div>
          </div>
        </nav>
      </header>

      <SubmitToolModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
} 