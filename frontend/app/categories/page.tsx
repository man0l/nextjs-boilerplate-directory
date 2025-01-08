import Link from 'next/link';
import { Tool } from '../../types';

// Add route segment config
export const revalidate = 3600; // Revalidate every hour

async function getCategories() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tools`, {
    next: { revalidate: 3600 } // Revalidate cache every hour
  });
  if (!res.ok) throw new Error('Failed to fetch tools');
  const data = await res.json();

  // Create a map to count tools per category
  const categoryMap = data.reduce((acc: { [key: string]: number }, tool: Tool) => {
    const category = tool.filter1;
    if (category) {
      acc[category] = (acc[category] || 0) + 1;
    }
    return acc;
  }, {});

  // Convert to array and sort by count
  return Object.entries(categoryMap)
    .map(([name, count]) => ({ name, count: count as number }))
    .sort((a, b) => b.count - a.count);
}

export default async function CategoriesPage() {
  const categories = await getCategories();

  const getFontSize = (count: number) => {
    const max = Math.max(...categories.map(c => c.count));
    const min = Math.min(...categories.map(c => c.count));
    const normalized = (count - min) / (max - min);
    // Font size between 1rem and 2rem
    return 1 + normalized * 1;
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-12">Categories</h1>
      <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
        {categories.map(({ name, count }) => (
          <Link
            key={name}
            href={`/category/${name.toLowerCase().replace(/\./g, '-')}`}
            className="hover:text-primary transition-colors"
            style={{ fontSize: `${getFontSize(count)}rem` }}
          >
            <span>{name}</span>
            <span className="text-muted-foreground ml-1">({count})</span>
          </Link>
        ))}
      </div>
    </div>
  );
} 