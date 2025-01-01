import { Tool } from '../types';
import ToolCard from './ToolCard';
import { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface RelatedToolsProps {
  tools: Tool[];
  category: string;
}

export default function RelatedTools({ tools, category }: RelatedToolsProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(tools.length / itemsPerPage);

  if (tools.length === 0) return null;

  const nextSlide = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevSlide = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const visibleTools = tools.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-semibold mb-8">More {category} Boilerplate Starters</h2>
      
      <div 
        className="relative"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Navigation Arrows */}
        {tools.length > itemsPerPage && (
          <>
            <button
              onClick={prevSlide}
              className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-10 p-2 rounded-full bg-white shadow-lg text-gray-600 hover:text-gray-900 transition-all duration-200 ${
                isHovering ? 'opacity-100' : 'opacity-0'
              }`}
              aria-label="Previous slide"
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-10 p-2 rounded-full bg-white shadow-lg text-gray-600 hover:text-gray-900 transition-all duration-200 ${
                isHovering ? 'opacity-100' : 'opacity-0'
              }`}
              aria-label="Next slide"
            >
              <ChevronRightIcon className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Carousel Content */}
        <div className="grid grid-cols-3 gap-8">
          {visibleTools.map((tool, index) => (
            <div key={index} className="transform transition-all duration-300 hover:scale-105">
              <ToolCard
                title={tool.title}
                description={tool.description}
                imageUrl={tool.imageUrl}
                category={tool.filter1}
                filter1={tool.filter1}
                url={tool.url}
                page={tool.page}
                tags={tool.tags || []}
                rank={tool.rank}
              />
            </div>
          ))}
        </div>

        {/* Navigation Dots */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentPage === index
                    ? 'bg-blue-600 w-4'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 