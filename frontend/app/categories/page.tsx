import { Tool } from '../../types';
import Link from 'next/link';
import { headers } from 'next/headers';

async function getTools() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tools`, {
    cache: 'no-store',
    headers: headers()
  });

  if (!res.ok) {
    throw new Error('Failed to fetch tools');
  }

  return res.json();
}

function getFontSize(count: number, categories: { name: string; count: number }[]) {
  const max = Math.max(...categories.map(c => c.count));
  const min = Math.min(...categories.map(c => c.count));
  const normalized = (count - min) / (max - min);
  // Font size between 1rem and 2rem
  return 1 + normalized * 1;
}

export default async function CategoriesPage() {
  const data: Tool[] = await getTools();
  
  // Create a map to count tools per category
  const categoryMap = data.reduce((acc: { [key: string]: number }, tool: Tool) => {
    const category = tool.filter1;
    if (category) {
      acc[category] = (acc[category] || 0) + 1;
    }
    return acc;
  }, {});

  // Convert to array and sort by count
  const categories = Object.entries(categoryMap)
    .map(([name, count]) => ({ name, count: count as number }))
    .sort((a, b) => b.count - a.count);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-12">
        All Categories
      </h1>
      
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map(({ name, count }) => {
            const fontSize = getFontSize(count, categories);
            const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            
            return (
              <Link
                key={name}
                href={`/category/${slug}`}
                className="inline-block px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                style={{ fontSize: `${fontSize}rem` }}
              >
                <span className="text-gray-900">{name}</span>
                <span className="text-gray-500 text-sm ml-2">({count})</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
} 