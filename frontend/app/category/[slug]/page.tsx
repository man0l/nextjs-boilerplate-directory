import { Suspense } from 'react';
import { Tool } from '../../../types';
import CategoryClientWrapper from './CategoryClientWrapper';

// Add route segment config
export const revalidate = 3600; // Revalidate every hour

const ITEMS_PER_PAGE = 9;

async function getCategoryTools(slug: string) {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${API_BASE_URL}/tools`, {
    next: { revalidate: 3600 } // Revalidate cache every hour
  });
  
  if (!res.ok) throw new Error('Failed to fetch tools');
  
  const data = await res.json();
  const normalizedSlug = decodeURIComponent(slug)
    .replace(/-/g, '.')
    .toLowerCase()
    .trim();

  return data.filter((tool: Tool) => {
    const toolCategory = (tool.filter1 || '').toLowerCase().trim();
    const toolCategories = toolCategory.split(',').map(cat => cat.trim());
    return toolCategories.some(cat => cat === normalizedSlug);
  });
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const tools = await getCategoryTools(params.slug);
  const categoryName = decodeURIComponent(params.slug)
    .replace(/-/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-12">
        {categoryName} Tools
      </h1>
      <Suspense fallback={
        <div className="text-center py-8">
          <p className="text-lg text-muted-foreground">Loading...</p>
        </div>
      }>
        <CategoryClientWrapper 
          initialTools={tools}
          itemsPerPage={ITEMS_PER_PAGE}
        />
      </Suspense>
    </div>
  );
} 