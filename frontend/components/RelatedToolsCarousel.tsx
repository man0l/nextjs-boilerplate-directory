import { Tool } from '../types';
import CarouselControls from './CarouselControls';

interface RelatedToolsCarouselProps {
  tools: Tool[];
}

export default function RelatedToolsCarousel({ tools }: RelatedToolsCarouselProps) {
  const itemsPerPage = 3;
  const totalPages = Math.ceil(tools.length / itemsPerPage);

  return (
    <div className="relative">
      <CarouselControls 
        tools={tools}
        itemsPerPage={itemsPerPage}
        totalPages={totalPages}
      />
    </div>
  );
} 