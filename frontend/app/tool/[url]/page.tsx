import Image from 'next/image';
import Link from 'next/link';
import { Tool } from '../../../types';
import RelatedTools from '../../../components/RelatedTools';
import { semanticSearch } from '../../../utils/semanticSearch';

// Add route segment config
export const revalidate = 3600; // Revalidate every hour

const createSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

async function getToolData(url: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tools`, {
    next: { revalidate: 3600 } // Revalidate cache every hour
  });
  
  if (!res.ok) throw new Error('Failed to fetch tools');
  
  const data: Tool[] = await res.json();
  const tool = data.find((t: Tool) => createSlug(t.title) === url);
  
  if (!tool) {
    return { tool: null, relatedTools: [] };
  }
  
  // Find related tools using semantic search
  const otherTools = data.filter(t => t.title !== tool.title);
  const searchQuery = `${tool.title} ${tool.description} ${tool.filter1} ${tool.tags?.join(' ') || ''}`;
  const relatedTools = semanticSearch(otherTools, searchQuery, 0.15).slice(0, 5);
  
  return { tool, relatedTools };
}

export default async function ToolDetails({ params }: { params: { url: string } }) {
  const { tool, relatedTools } = await getToolData(params.url);

  if (!tool) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Tool Not Found</h1>
          <p className="text-muted-foreground mb-4">The tool you're looking for doesn't exist.</p>
          <Link href="/" className="text-primary hover:underline">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="bg-card rounded-lg shadow-lg overflow-hidden">
          {tool.imageUrl && (
            <div className="relative w-full h-64">
              <Image
                src={tool.imageUrl}
                alt={tool.title}
                fill
                className="object-cover"
              />
            </div>
          )}
          
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">{tool.title}</h1>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {tool.tags?.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-muted rounded-full text-sm text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="text-lg mb-6 prose max-w-none">
              {tool.description && (
                <div dangerouslySetInnerHTML={{ __html: tool.description }} suppressHydrationWarning />
              )}
            </div>
            
            <div className="flex items-center justify-between">
              <Link
                href={`/category/${tool.filter1?.toLowerCase().replace(/\./g, '-')}`}
                className="text-primary hover:underline"
              >
                {tool.filter1}
              </Link>
              
              <a
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                View Project
              </a>
            </div>
          </div>
        </div>

        {relatedTools.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Related Tools</h2>
            <RelatedTools tools={relatedTools} category={tool.filter1 || ''} />
          </div>
        )}
      </div>
    </div>
  );
} 