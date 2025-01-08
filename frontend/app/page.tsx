import { Suspense } from 'react';
import { Tool } from '../types';
import Hero from '../components/Hero';
import ClientWrapper from '../components/ClientWrapper';

// Add route segment config
export const revalidate = 3600; // Revalidate every hour

async function getTools() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tools`, {
    next: { revalidate: 3600 } // Revalidate cache every hour
  });
  if (!res.ok) throw new Error('Failed to fetch tools');
  return res.json();
}

export default async function Home() {
  const toolsData: Tool[] = await getTools();
  // Only keep tools with descriptions
  const validTools = toolsData.filter((tool) => tool.description && tool.description.trim() !== '');
  // Extract unique categories
  const uniqueCategories = Array.from(new Set(validTools.map((tool) => tool.filter1)));

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
          />
        </Suspense>
      </div>
    </main>
  );
}
