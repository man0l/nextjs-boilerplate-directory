import { Tool } from '../types';
import ToolCard from './ToolCard';
import RelatedToolsCarousel from './RelatedToolsCarousel';

interface RelatedToolsProps {
  tools: Tool[];
  category: string;
}

export default function RelatedTools({ tools, category }: RelatedToolsProps) {
  if (tools.length === 0) return null;

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">More {category} Tools</h2>
      <RelatedToolsCarousel tools={tools} />
    </div>
  );
} 