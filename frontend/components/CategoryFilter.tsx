import { useState } from 'react';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategoryFilter({ 
  categories, 
  selectedCategory, 
  onCategoryChange 
}: CategoryFilterProps) {
  const [showAll, setShowAll] = useState(false);
  const INITIAL_DISPLAY_COUNT = 6;
  
  const displayedCategories = showAll ? categories : categories.slice(0, INITIAL_DISPLAY_COUNT);

  return (
    <div className="mb-8">
      <div className="flex flex-wrap gap-2 justify-center mb-4">
        <button
          onClick={() => onCategoryChange('')}
          className={`px-4 py-2 rounded-full transition-all ${
            selectedCategory === ''
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          All
        </button>
        {displayedCategories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-4 py-2 rounded-full transition-all ${
              selectedCategory === category
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      
      {categories.length > INITIAL_DISPLAY_COUNT && (
        <div className="text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-blue-500 hover:text-blue-600 font-medium text-sm"
          >
            {showAll ? '← Show Less' : 'See All Categories →'}
          </button>
        </div>
      )}
    </div>
  );
} 