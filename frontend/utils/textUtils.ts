export function stripHtml(html: string): string {
  // Remove HTML tags
  const tmp = document.createElement('DIV');
  tmp.innerHTML = html;
  const text = tmp.textContent || tmp.innerText || '';
  
  // Create excerpt (first 150 characters)
  return text.trim().substring(0, 150) + (text.length > 150 ? '...' : '');
} 