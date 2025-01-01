import { Tool } from '../types';

// Convert text to vector using a simple bag-of-words approach
function textToVector(text: string): Map<string, number> {
  const words = text.toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 2); // Filter out short words

  const vector = new Map<string, number>();
  words.forEach(word => {
    vector.set(word, (vector.get(word) || 0) + 1);
  });
  return vector;
}

// Calculate cosine similarity between two vectors
function cosineSimilarity(vec1: Map<string, number>, vec2: Map<string, number>): number {
  let dotProduct = 0;
  let norm1 = 0;
  let norm2 = 0;

  // Calculate dot product and norms
  for (const [word, count1] of vec1) {
    const count2 = vec2.get(word) || 0;
    dotProduct += count1 * count2;
    norm1 += count1 * count1;
  }

  for (const [_, count2] of vec2) {
    norm2 += count2 * count2;
  }

  // Return cosine similarity
  return dotProduct / (Math.sqrt(norm1) * Math.sqrt(norm2)) || 0;
}

// Preprocess tool for search
function preprocessTool(tool: Tool): Map<string, number> {
  const text = `${tool.title} ${tool.description} ${tool.filter1} ${tool.tags?.join(' ') || ''}`.toLowerCase();
  return textToVector(text);
}

// Main semantic search function
export function semanticSearch(tools: Tool[], query: string, threshold: number = 0.1): Tool[] {
  if (!query.trim()) return tools;

  const queryVector = textToVector(query);
  const toolVectors = new Map<Tool, Map<string, number>>();

  // Preprocess all tools
  tools.forEach(tool => {
    toolVectors.set(tool, preprocessTool(tool));
  });

  // Calculate similarities and sort
  const results = tools
    .map(tool => ({
      tool,
      similarity: cosineSimilarity(queryVector, toolVectors.get(tool)!)
    }))
    .filter(result => result.similarity > threshold)
    .sort((a, b) => b.similarity - a.similarity)
    .map(result => result.tool);

  return results;
} 