'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Tool } from '../../../types';
import ToolCard from '../../../components/ToolCard';
import Pagination from '../../../components/Pagination';

interface CategoryClientWrapperProps {
  initialTools: Tool[];
  itemsPerPage: number;
}

export default function CategoryClientWrapper({ initialTools, itemsPerPage }: CategoryClientWrapperProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(() => {
    return Number(searchParams.get('page')) || 1;
  });

  const totalPages = Math.ceil(initialTools.length / itemsPerPage);
  const paginatedTools = initialTools.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const url = new URL(window.location.href);
    url.searchParams.set('page', page.toString());
    router.push(url.pathname + url.search, { scroll: false });
  };

  if (initialTools.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-lg text-muted-foreground">No tools found in this category.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {paginatedTools.map((tool) => (
          <ToolCard
            key={tool.title}
            {...tool}
            tags={tool.tags || []}
          />
        ))}
      </div>
      
      {initialTools.length > itemsPerPage && (
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