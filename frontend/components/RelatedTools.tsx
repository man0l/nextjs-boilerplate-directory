import { Tool } from '../types';
import ToolCard from './ToolCard';

interface RelatedToolsProps {
  tools: Tool[];
  category: string;
}

export default function RelatedTools({ tools, category }: RelatedToolsProps) {
  if (tools.length === 0) return null;

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-semibold mb-8">More {category} Tools</h2>
      <div className="flex flex-wrap justify-center gap-8">
        {tools.map((tool, index) => (
          <div key={index} className="w-full md:w-auto">
            <ToolCard
              title={tool.title}
              description={tool.description}
              imageUrl={tool.imageUrl}
              category={tool.filter1}
              url={tool.url}
              tags={tool.Tags ? tool.Tags.split(',') : []}
              rank={tool.rank}
            />
          </div>
        ))}
      </div>
    </div>
  );
} 