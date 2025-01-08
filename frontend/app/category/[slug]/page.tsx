import { Tool } from '../../../types';
import ToolCard from '../../../components/ToolCard';
import Pagination from '../../../components/Pagination';
import CategoryClientWrapper from './CategoryClientWrapper';
import { headers } from 'next/headers';

const ITEMS_PER_PAGE = 9;

async function getToolsByCategory(slug: string) {
  try {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${API_BASE_URL}/tools`, {
      cache: 'no-store',
      headers: headers()
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
  } catch (err) {
    console.error('Error fetching tools:', err);
    return [];
  }
}

export default async function CategoryPage({
  params
}: {
  params: { slug: string }
}) {
  const tools = await getToolsByCategory(params.slug);
  const categoryName = decodeURIComponent(params.slug).replace(/-/g, ' ');

  return (
    <main>
      <h1 className="text-4xl font-bold text-center mb-8 capitalize">
        {categoryName}
      </h1>
      <CategoryClientWrapper
        tools={tools}
        itemsPerPage={ITEMS_PER_PAGE}
      />
    </main>
  );
} 