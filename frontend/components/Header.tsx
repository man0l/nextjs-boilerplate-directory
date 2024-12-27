'use client';

import Link from 'next/link';
import { useState } from 'react';
import SubmitToolModal from './SubmitToolModal';

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <header className="bg-white shadow-sm">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-xl font-bold">
              Best AI Tools
            </Link>
            <div className="flex gap-6 items-center">
              <Link href="/categories" className="hover:text-blue-600">
                Categories
              </Link>
              <Link href="/blog" className="hover:text-blue-600">
                Blog
              </Link>
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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