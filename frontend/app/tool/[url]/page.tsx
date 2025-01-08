import Image from 'next/image';
import Link from 'next/link';
import { Tool } from '../../../types';
import RelatedTools from '../../../components/RelatedTools';
import { semanticSearch } from '../../../utils/semanticSearch';
import { headers } from 'next/headers';

const createSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

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

export default async function ToolDetails({ params }: { params: { url: string } }) {
  const tools: Tool[] = await getTools();
  const tool = tools.find((t: Tool) => createSlug(t.title) === params.url);

  if (!tool) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Tool not found</div>
      </div>
    );
  }

  // Find related tools using semantic search
  const otherTools = tools.filter(t => t.title !== tool.title);
  const searchQuery = `${tool.title} ${tool.description} ${tool.filter1} ${tool.tags?.join(' ') || ''}`;
  const relatedTools = semanticSearch(otherTools, searchQuery, 0.15).slice(0, 5); // Get top 5 most similar tools

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center mb-6">
            {tool.imageUrl && (
              <div className="mr-6">
                <Image
                  src={tool.imageUrl}
                  alt={tool.title}
                  width={80}
                  height={80}
                  className="rounded-lg"
                />
              </div>
            )}
            <div>
              <h1 className="text-3xl font-bold mb-2">{tool.title}</h1>
              <Link
                href={`/category/${createSlug(tool.filter1)}`}
                className="text-blue-600 hover:text-blue-800"
              >
                {tool.filter1}
              </Link>
            </div>
          </div>
          
          <p className="text-gray-700 mb-6">{tool.description}</p>
          
          {tool.tags && tool.tags.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {tool.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex justify-between items-center">
            <a
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Visit Website
            </a>
          </div>
        </div>

        <RelatedTools tools={relatedTools} category={tool.filter1} />
      </div>
    </div>
  );
} 