'use client';

import { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { Tool } from '../types';
import ToolCard from './ToolCard';

interface CarouselControlsProps {
  tools: Tool[];
  itemsPerPage: number;
  totalPages: number;
}

export default function CarouselControls({ tools, itemsPerPage, totalPages }: CarouselControlsProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Add preload links for all tool images
  useEffect(() => {
    tools.forEach(tool => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = tool.imageUrl;
      document.head.appendChild(link);
    });
  }, [tools]);

  const nextSlide = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevSlide = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const startIndex = currentPage * itemsPerPage;
  const visibleTools = tools.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div 
      className="relative w-full"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {tools.map((tool, index) => (
          <div
            key={tool.title}
            className={`transition-opacity duration-300 ${
              mounted
                ? index >= startIndex && index < startIndex + itemsPerPage
                  ? 'opacity-100 visible'
                  : 'opacity-0 invisible absolute'
                : 'opacity-100 visible'
            }`}
          >
            <ToolCard {...tool} tags={tool.tags || []} />
          </div>
        ))}
      </div>

      {totalPages > 1 && mounted && (
        <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between pointer-events-none">
          <button
            onClick={prevSlide}
            className={`pointer-events-auto p-2 rounded-full bg-background/80 hover:bg-background shadow-md transition-opacity duration-200 ${
              isHovering ? 'opacity-100' : 'opacity-0'
            }`}
            aria-label="Previous tools"
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>
          
          <button
            onClick={nextSlide}
            className={`pointer-events-auto p-2 rounded-full bg-background/80 hover:bg-background shadow-md transition-opacity duration-200 ${
              isHovering ? 'opacity-100' : 'opacity-0'
            }`}
            aria-label="Next tools"
          >
            <ChevronRightIcon className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
} 