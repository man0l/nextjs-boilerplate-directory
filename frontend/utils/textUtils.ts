export function stripHtml(html: string): string {
  // Server-safe HTML stripping using regex
  const text = html
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/&nbsp;/g, ' ') // Replace &nbsp; with space
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();
    
  // Create excerpt (first 150 characters)
  return text.substring(0, 150) + (text.length > 150 ? '...' : '');
} 