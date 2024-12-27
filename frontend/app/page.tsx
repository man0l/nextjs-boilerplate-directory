'use client';
import { useEffect, useState } from 'react';
import { Tool } from '../types';
import Hero from '../components/Hero';
import ToolCard from '../components/ToolCard';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import Pagination from '../components/Pagination';

const ITEMS_PER_PAGE = 9;

export default function Home() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [filteredTools, setFilteredTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/tools')
      .then(res => res.json())
      .then(data => {
        setTools(data);
        // Extract unique categories
        const uniqueCategories = Array.from(new Set(data.map((tool: Tool) => tool.filter1)));
        setCategories(uniqueCategories);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching tools:', err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let filtered = [...tools];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(tool =>
        tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter(tool => tool.filter1 === selectedCategory);
    }

    setFilteredTools(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchQuery, selectedCategory, tools]);

  const totalPages = Math.ceil(filteredTools.length / ITEMS_PER_PAGE);
  const paginatedTools = filteredTools.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <>
      <Hero />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto mb-12">
          <SearchBar onSearch={setSearchQuery} />
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>
        
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
              {paginatedTools.map((tool, index) => (
                <ToolCard
                  key={index}
                  title={tool.title}
                  description={tool.description}
                  imageUrl={tool.imageUrl}
                  category={tool.filter1}
                  url={tool.url}
                  tags={tool.Tags ? tool.Tags.split(',') : []}
                  rank={tool.rank}
                />
              ))}
            </div>
            
            {filteredTools.length > ITEMS_PER_PAGE && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </>
        )}
      </div>
    </>
  );
}
