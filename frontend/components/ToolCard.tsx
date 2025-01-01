import Image from 'next/image';
import Link from 'next/link';
import { stripHtml } from '../utils/textUtils';
import { Tool } from '@/types';

const createSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

export default function ToolCard({ 
  title, 
  description, 
  imageUrl, 
  category, 
  url,
  page,
  tags = [],
  rank
}: Tool) {
  const slug = page;
  
  return (
    <Link href={`/tool/${slug}`} className="card block h-full">
      <div className="p-6">
        {/* Title and Tags Section */}
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600"
                >
                  {tag.trim()}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Image Section - Now Wider */}
        <div className="relative aspect-[16/9] w-full mb-4">
          <Image
            src={imageUrl || '/placeholder.png'}
            alt={title}
            fill
            className="object-cover rounded-lg"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {rank && (
            <span className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium">
              #{rank}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-muted-foreground text-sm line-clamp-2">
          {stripHtml(description)}
        </p>

        {/* Category */}
        <div className="mt-4">
          <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-full">
            {category}
          </span>
        </div>
      </div>
    </Link>
  );
} 