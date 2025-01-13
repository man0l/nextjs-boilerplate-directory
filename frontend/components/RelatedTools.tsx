'use client';

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
      <RelatedToolsCarousel tools={tools} />
    </div>
  );
} 