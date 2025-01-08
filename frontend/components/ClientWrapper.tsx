'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Tool } from '../types';
import SearchBar from './SearchBar';
import CategoryFilter from './CategoryFilter';
import ToolCard from './ToolCard';
import Pagination from './Pagination';
import { semanticSearch } from '../utils/semanticSearch';

const ITEMS_PER_PAGE = 9;

interface ClientWrapperProps {
  initialTools: Tool[];
  initialCategories: string[];
}

export default function ClientWrapper({ initialTools, initialCategories }: ClientWrapperProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [tools] = useState<Tool[]>(initialTools);
  const [filteredTools, setFilteredTools] = useState<Tool[]>(initialTools);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(() => {
    return Number(searchParams.get('page')) || 1;
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    let filtered = [...tools];

    if (query) {
      filtered = semanticSearch(filtered, query);
    }

    if (selectedCategory) {
      filtered = filtered.filter(tool => tool.filter1 === selectedCategory);
    }

    setFilteredTools(filtered);
    setCurrentPage(1);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    let filtered = [...tools];

    if (searchQuery) {
      filtered = semanticSearch(filtered, searchQuery);
    }

    if (category) {
      filtered = filtered.filter(tool => tool.filter1 === category);
    }

    setFilteredTools(filtered);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredTools.length / ITEMS_PER_PAGE);
  const paginatedTools = filteredTools.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const url = new URL(window.location.href);
    url.searchParams.set('page', page.toString());
    router.push(url.pathname + url.search, { scroll: false });
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
        {paginatedTools.map((tool) => (
          <ToolCard
            key={tool.title}
            {...tool}
            tags={tool.tags || []}
          />
        ))}
      </div>
      
      {filteredTools.length > ITEMS_PER_PAGE && (
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
