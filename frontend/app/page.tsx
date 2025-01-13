import { Suspense } from 'react';
import { Tool } from '../types';
import Hero from '../components/Hero';
import ClientWrapper from '../components/ClientWrapper';

const ITEMS_PER_PAGE = 9;

async function getTools(page: number = 1) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tools`, {
    cache: 'no-store'
  });
  if (!res.ok) throw new Error('Failed to fetch tools');
  const allTools = await res.json();
  
  // Filter valid tools
  const validTools = (allTools as Tool[]).filter((tool) => tool.description && tool.description.trim() !== '');
  
  // Calculate pagination
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedTools = validTools.slice(startIndex, endIndex);
  const totalPages = Math.ceil(validTools.length / ITEMS_PER_PAGE);
  
  return {
    tools: paginatedTools,
    totalItems: validTools.length,
    totalPages,
    currentPage: page
  };
}

export default async function Home({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const page = Number(searchParams.page) || 1;
  const { tools: validTools, totalPages, currentPage } = await getTools(page);
  
  // Extract unique categories and ensure they're strings
  const uniqueCategories = Array.from(
    new Set(validTools.map((tool: Tool) => tool.filter1 || ''))
  ).filter(Boolean);

  return (
    <main>
      <Hero />
      <div className="container mx-auto px-4 py-12">
        <Suspense fallback={
          <div className="text-center py-8">
            <p className="text-lg text-muted-foreground">Loading...</p>
          </div>
        }>
          <ClientWrapper 
            initialTools={validTools}
            initialCategories={uniqueCategories}
            totalPages={totalPages}
            currentPage={currentPage}
          />
        </Suspense>
      </div>
    </main>
  );
}
