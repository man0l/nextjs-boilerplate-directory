'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Tool } from '../../../types';
import ToolCard from '../../../components/ToolCard';

const createSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

export default function ToolDetails({ params }: { params: { url: string } }) {
  const [tool, setTool] = useState<Tool | null>(null);
  const [relatedTools, setRelatedTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/tools`)
      .then(res => res.json())
      .then(data => {
        const foundTool = data.find((t: Tool) => createSlug(t.title) === params.url);
        setTool(foundTool || null);
        
        if (foundTool) {
          // Find related tools from the same category
          const related = data
            .filter((t: Tool) => 
              t.filter1 === foundTool.filter1 && // Same category
              t.title !== foundTool.title // Exclude current tool
            )
            .slice(0, 5); // Take first 5
          setRelatedTools(related);
        }
        
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching tool details:', err);
        setLoading(false);
      });
  }, [params.url]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!tool) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="text-xl mb-4">Tool not found</div>
        <Link href="/" className="text-blue-600 hover:underline">
          Return to homepage
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <Link href="/" className="text-blue-600 hover:underline mb-6 inline-block">
              ← Back to Tools
            </Link>
            
            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* Tool Image */}
              <div className="w-full md:w-[299px] flex-shrink-0">
                <div className="relative w-[299px] h-[168px]">
                  <Image
                    src={tool.imageUrl}
                    alt={tool.title}
                    fill
                    className="object-cover rounded-lg shadow-md"
                    sizes="299px"
                  />
                </div>
              </div>

              {/* Tool Info */}
              <div className="flex-grow">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {tool.title}
                    </h1>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="inline-block px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-full">
                        {tool.filter1}
                      </span>
                      {tool.Tags && tool.Tags.split(',').map((tag, index) => (
                        <span
                          key={index}
                          className="inline-block px-3 py-1 text-sm bg-gray-50 text-gray-600 rounded-full"
                        >
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                  {tool.rank && (
                    <div className="text-lg text-gray-500">
                      #{tool.rank}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-2xl font-semibold mb-6">About {tool.title}</h2>
            <div 
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: tool.description }}
            />

            <div className="mt-8 pt-8 border-t">
              <a
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Visit Website →
              </a>
            </div>
          </div>

          {/* Related Tools Section */}
          {relatedTools.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-semibold mb-8">More {tool.filter1} Tools</h2>
              <div className="flex flex-wrap justify-center gap-8">
                {relatedTools.map((relatedTool, index) => (
                  <div key={index} className="w-full md:w-auto">
                    <ToolCard
                      title={relatedTool.title}
                      description={relatedTool.description}
                      imageUrl={relatedTool.imageUrl}
                      category={relatedTool.filter1}
                      url={relatedTool.url}
                      tags={relatedTool.Tags ? relatedTool.Tags.split(',') : []}
                      rank={relatedTool.rank}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 