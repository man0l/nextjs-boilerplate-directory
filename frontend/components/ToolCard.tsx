import Image from 'next/image';
import Link from 'next/link';
import { stripHtml } from '../utils/textUtils';

const createSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

interface ToolCardProps {
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  url: string;
  tags?: string[];
  rank?: number;
}

export default function ToolCard({ 
  title, 
  description, 
  imageUrl, 
  category, 
  url,
  tags = [],
  rank
}: ToolCardProps) {
  const cleanDescription = description ? stripHtml(description) : '';
  const defaultImage = 'https://uploads-ssl.webflow.com/63994dae1033718bee6949ce/639bb00c6ca245d55dcf6bc9_Cld_SocShare_Card_FB_2020.jpeg';
  const slug = createSlug(title);

  return (
    <Link href={`/tool/${slug}`} className="block group">
      <div className="card overflow-hidden bg-white hover:scale-[1.02] transition-all duration-300">
        <div className="relative w-full aspect-[16/9]">
          <Image
            src={imageUrl || defaultImage}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          />
          {rank && (
            <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
              #{rank}
            </div>
          )}
        </div>
        
        <div className="p-6">
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-accent text-accent-foreground">
              {category}
            </span>
            {tags.slice(0, 2).map((tag, index) => (
              <span 
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <h3 className="text-lg font-semibold mb-2 group-hover:text-indigo-600 transition-colors">
            {title}
          </h3>
          
          <p className="text-muted-foreground text-sm line-clamp-2">
            {cleanDescription}
          </p>
        </div>
      </div>
    </Link>
  );
} 