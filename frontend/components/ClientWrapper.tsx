'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Tool } from '../types';
import SearchBar from './SearchBar';
import CategoryFilter from './CategoryFilter';
import ToolCard from './ToolCard';
import Pagination from './Pagination';

interface ClientWrapperProps {
  initialTools: Tool[];
  initialCategories: string[];
  totalPages: number;
  currentPage: number;
}

export default function ClientWrapper({ 
  initialTools, 
  initialCategories,
  totalPages,
  currentPage
}: ClientWrapperProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    router.push('/?page=1', { scroll: false });
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    router.push('/?page=1', { scroll: false });
  };

  const handlePageChange = (page: number) => {
    router.push(`/?page=${page}`, { scroll: false });
  };

  return (
    <>
      <div className="max-w-2xl mx-auto mb-12">
        <SearchBar onSearch={handleSearch} />
        <CategoryFilter
          categories={initialCategories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {initialTools.map((tool) => (
          <ToolCard
            key={tool.title}
            {...tool}
            tags={tool.tags || []}
          />
        ))}
      </div>
      
      {totalPages > 1 && (
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
