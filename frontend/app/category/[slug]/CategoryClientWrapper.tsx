'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Tool } from '../../../types';
import ToolCard from '../../../components/ToolCard';
import Pagination from '../../../components/Pagination';
import type { JSX } from 'react';

interface CategoryClientWrapperProps {
  tools: Tool[];
  itemsPerPage: number;
}

export default function CategoryClientWrapper({ tools, itemsPerPage }: CategoryClientWrapperProps): JSX.Element {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(() => {
    return Number(searchParams.get('page')) || 1;
  });

  if (tools.length === 0) {
    return (
      <div className="text-center">
        <p className="text-xl mb-4">No tools found in this category</p>
        <button 
          onClick={() => router.push('/')}
          className="text-blue-600 hover:text-blue-800 underline"
        >
          Return to home
        </button>
      </div>
    );
  }

  const totalPages = Math.ceil(tools.length / itemsPerPage);
  const paginatedTools = tools.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const url = new URL(window.location.href);
    url.searchParams.set('page', page.toString());
    router.push(url.pathname + url.search, { scroll: false });
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {paginatedTools.map((tool) => (
          <ToolCard
            {...tool}
            key={tool.title}
            tags={tool.tags || []}
          />
        ))}
      </div>

      {tools.length > itemsPerPage && (
        <div className="mt-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </>
  );
} 