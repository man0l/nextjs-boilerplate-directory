'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Tool } from '../types';
import SearchBar from './SearchBar';
import CategoryFilter from './CategoryFilter';
import ToolCard from './ToolCard';
import Pagination from './Pagination';
import { semanticSearch } from '../utils/semanticSearch';
import type { JSX } from 'react';

interface ClientWrapperProps {
  tools: Tool[];
  categories: string[];
  itemsPerPage: number;
}

export default function ClientWrapper({ tools, categories, itemsPerPage }: ClientWrapperProps): JSX.Element {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filteredTools, setFilteredTools] = useState<Tool[]>(tools);
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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const url = new URL(window.location.href);
    url.searchParams.set('page', page.toString());
    router.push(url.pathname + url.search, { scroll: false });
  };

  const totalPages = Math.ceil(filteredTools.length / itemsPerPage);
  const paginatedTools = filteredTools.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <div className="max-w-2xl mx-auto mb-12">
        <SearchBar onSearch={handleSearch} />
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto mt-8">
        {paginatedTools.map((tool) => (
          <ToolCard
            {...tool}
            key={tool.title}
            tags={tool.tags || []}
          />
        ))}
      </div>

      {filteredTools.length > itemsPerPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
} 