'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Tool } from '../../../types';
import ToolCard from '../../../components/ToolCard';

export default function CategoryPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug;
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const fetchTools = async () => {
      try {
        const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        const res = await fetch(`${API_BASE_URL}/api/tools`);
        
        if (!res.ok) throw new Error('Failed to fetch tools');
        
        const data = await res.json();
        const normalizedSlug = decodeURIComponent(slug.toString()).replace(/-/g, ' ').toLowerCase().trim();

        const categoryTools = data.filter((tool: Tool) => {
          const toolCategory = (tool.filter1 || tool.category || '').toLowerCase().trim();
          const toolCategories = toolCategory.split(',').map(cat => cat.trim());
          return toolCategories.some(cat => cat === normalizedSlug);
        });
        
        setTools(categoryTools);
      } catch (err) {
        console.error('Error fetching tools:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTools();
  }, [slug]);

  if (loading) {
    return (
      <div className="container mx-auto">
        <div className="text-center py-8">Loading...</div>
      </div>
    );
  }

  if (tools.length === 0 && !loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">No tools found</h1>
        <p>No tools found for category: {decodeURIComponent(slug?.toString() || '').replace(/-/g, ' ')}</p>
        <button 
          onClick={() => router.push('/')}
          className="mt-4 text-blue-600 hover:text-blue-800"
        >
          Return to home
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 capitalize">
        {decodeURIComponent(slug?.toString() || '').replace(/-/g, ' ')}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {tools.map((tool, index) => (
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
    </div>
  );
} 