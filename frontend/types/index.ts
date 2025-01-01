export interface Tool {
  title: string;
  description: string;
  imageUrl: string;
  category?: string;
  filter1: string;
  url: string;
  page: string;
  tags?: string[];
  rank?: number;
  // Add any additional fields that your API returns
} 