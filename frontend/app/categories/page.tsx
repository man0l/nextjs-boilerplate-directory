'use client';
import { useEffect, useState } from 'react';
import { Tool } from '../../types';
import Link from 'next/link';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<{ name: string; count: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/tools')
      .then(res => res.json())
      .then(data => {
        // Create a map to count tools per category
        const categoryMap = data.reduce((acc: { [key: string]: number }, tool: Tool) => {
          const category = tool.filter1;
          if (category) {
            acc[category] = (acc[category] || 0) + 1;
          }
          return acc;
        }, {});

        // Convert to array and sort by count
        const categoriesArray = Object.entries(categoryMap)
          .map(([name, count]) => ({ name, count }))
          .sort((a, b) => b.count - a.count);

        setCategories(categoriesArray);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching categories:', err);
        setLoading(false);
      });
  }, []);

  const getFontSize = (count: number) => {
    const max = Math.max(...categories.map(c => c.count));
    const min = Math.min(...categories.map(c => c.count));
    const normalized = (count - min) / (max - min);
    // Font size between 1rem and 2rem
    return 1 + normalized * 1;
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">AI Tool Categories</h1>
      
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-8">
        <div className="flex flex-wrap gap-4 justify-center">
          {categories.map(({ name, count }) => {
            const fontSize = getFontSize(count);
            const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            
            return (
              <Link
                key={name}
                href={`/category/${slug}`}
                className="inline-block transition-all duration-200 hover:text-accent-foreground"
                style={{
                  fontSize: `${fontSize}rem`,
                  opacity: 0.7 + (fontSize - 1) * 0.3
                }}
              >
                <span className="hover:underline">{name}</span>
                <span className="text-xs ml-1 text-muted-foreground">({count})</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
} 