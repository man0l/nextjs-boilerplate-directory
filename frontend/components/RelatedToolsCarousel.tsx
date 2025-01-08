'use client';

import { useState } from 'react';
import { Tool } from '../types';
import ToolCard from './ToolCard';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface RelatedToolsCarouselProps {
  tools: Tool[];
}

export default function RelatedToolsCarousel({ tools }: RelatedToolsCarouselProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(tools.length / itemsPerPage);

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
      className="relative"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {visibleTools.map((tool) => (
          <ToolCard key={tool.title} {...tool} tags={tool.tags || []} />
        ))}
      </div>

      {totalPages > 1 && isHovering && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 p-2 rounded-full bg-background/80 hover:bg-background shadow-md"
            aria-label="Previous tools"
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 p-2 rounded-full bg-background/80 hover:bg-background shadow-md"
            aria-label="Next tools"
          >
            <ChevronRightIcon className="w-6 h-6" />
          </button>
        </>
      )}
    </div>
  );
} 