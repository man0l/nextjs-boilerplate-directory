'use client';

import { Tool } from '../../../types';
import RelatedTools from '../../../components/RelatedTools';

interface RelatedToolsSectionProps {
  tools: Tool[];
  category: string;
}

export default function RelatedToolsSection({ tools, category }: RelatedToolsSectionProps) {
  if (tools.length === 0) return null;
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Related Tools</h2>
      <RelatedTools tools={tools} category={category} />
    </div>
  );
} 