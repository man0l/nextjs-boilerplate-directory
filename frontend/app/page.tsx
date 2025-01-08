import { Tool } from '../types';
import Hero from '../components/Hero';
import ToolCard from '../components/ToolCard';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import Pagination from '../components/Pagination';
import ClientWrapper from '../components/ClientWrapper';
import { headers } from 'next/headers';

const ITEMS_PER_PAGE = 9;

async function getTools() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tools`, {
    cache: 'no-store',
    headers: headers()
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch tools');
  }
  
  const data: Tool[] = await res.json();
  return data.filter((tool) => tool.description && tool.description.trim() !== '');
}

async function getCategories(tools: Tool[]) {
  return Array.from(new Set(tools.map((tool) => tool.filter1)));
}

export default async function Home() {
  const tools = await getTools();
  const categories = await getCategories(tools);

  return (
    <main>
      <Hero />
      <div className="container mx-auto px-4 py-8">
        <ClientWrapper
          tools={tools}
          categories={categories}
          itemsPerPage={ITEMS_PER_PAGE}
        />
      </div>
    </main>
  );
}
