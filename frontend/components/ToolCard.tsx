import Image from 'next/image';
import Link from 'next/link';
import { stripHtml } from '../utils/textUtils';
import { Tool } from '../types';

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
  const cleanDescription = stripHtml(description);
  const defaultImage = 'https://uploads-ssl.webflow.com/63994dae1033718bee6949ce/639bb00c6ca245d55dcf6bc9_Cld_SocShare_Card_FB_2020.jpeg';

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
      <Link href={`/tool/${url}`}>
        <div className="p-6">
          <div className="flex items-center space-x-4">
            <div className="relative w-12 h-12 flex-shrink-0">
              <Image
                src={imageUrl || defaultImage}
                alt={title}
                fill
                className="object-contain rounded-lg"
              />
            </div>
            <div className="flex-grow">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
              <div className="flex flex-wrap gap-2">
                <span className="inline-block px-2 py-1 text-xs bg-blue-50 text-blue-600 rounded-full">
                  {category}
                </span>
                {tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="inline-block px-2 py-1 text-xs bg-gray-50 text-gray-600 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            {rank && (
              <div className="text-sm text-gray-500">
                #{rank}
              </div>
            )}
          </div>
          <p className="mt-3 text-gray-600 text-sm line-clamp-2">{cleanDescription}</p>
        </div>
      </Link>
    </div>
  );
} 