const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Store data in memory
let aiTools = [];

// Add markdown to HTML conversion function
function markdownToHtml(markdown) {
  if (!markdown) return '';
  
  // Convert headers
  let html = markdown.replace(/^### (.*$)/gm, '<h3>$1</h3>')
                    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
                    .replace(/^# (.*$)/gm, '<h1>$1</h1>');
  
  // Convert bold text
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  // Convert italics
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
  
  // Convert lists
  html = html.replace(/^\s*[-*]\s(.*)$/gm, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>');
  
  // Convert paragraphs (any line that doesn't start with a special character)
  html = html.replace(/^(?!<[h|u|l])(.*$)/gm, '<p>$1</p>');
  
  // Clean up empty paragraphs
  html = html.replace(/<p>\s*<\/p>/g, '');
  
  return html;
}

// Load data synchronously at startup
function loadData() {
  try {
    const dataPath = path.join(__dirname, 'data', 'boilerplate-tools.csv');
    const fileContent = fs.readFileSync(dataPath, 'utf-8');
    
    // Use csv-parse to parse the CSV file
    const records = parse(fileContent, {
      columns: true, // Use the header row to create objects
      skip_empty_lines: true,
      trim: true
    });
    
    // Process the records and convert markdown to HTML
    aiTools = records.filter(tool => tool.title).map(tool => ({
      ...tool,
      description: markdownToHtml(tool.description)
    }));
    
    console.log('Data loaded successfully');
    console.log('Total tools loaded:', aiTools.length);
  } catch (error) {
    console.error('Error loading data:', error);
    // Initialize with empty array if file can't be loaded
    aiTools = [];
  }
}

// Load data immediately
loadData();

// Routes
app.get('/api/tools', (req, res) => {
  const filteredTools = aiTools.filter(tool => tool.description && tool.description.trim() !== '');
  res.json(filteredTools);
});

app.get('/api/tools/:id', (req, res) => {
  const tool = aiTools.find(t => t.id === req.params.id);
  if (!tool) {
    return res.status(404).json({ message: 'Tool not found' });
  }
  res.json(tool);
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', toolsCount: aiTools.length });
});

// Helper function to get unique categories
function getUniqueCategories() {
  const categories = new Set();
  aiTools.forEach(tool => {
    if (tool.filter1) {
      tool.filter1.split(',').forEach(category => {
        categories.add(category.trim());
      });
    }
  });
  return Array.from(categories);
}

// Helper function to generate sitemap XML
function generateSitemapXML(baseUrl) {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  // Add homepage
  xml += `  <url>
    <loc>${baseUrl}</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>\n`;

  // Add all tools
  aiTools.forEach(tool => {
    if (tool.url) {
      xml += `  <url>
    <loc>${baseUrl}/tool/${encodeURIComponent(tool.url)}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>\n`;
    }
  });

  // Add all categories
  getUniqueCategories().forEach(category => {
    const categorySlug = category.toLowerCase().replace(/\s+/g, '-');
    xml += `  <url>
    <loc>${baseUrl}/category/${encodeURIComponent(categorySlug)}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>\n`;
  });

  xml += '</urlset>';
  return xml;
}

// Sitemap endpoint
app.get('/api/sitemap.xml', (req, res) => {
  const protocol = req.headers['x-forwarded-proto'] || req.protocol;
  const baseUrl = `${protocol}://${req.headers.host}`;
  
  res.header('Content-Type', 'application/xml');
  res.send(generateSitemapXML(baseUrl));
});

// Only start the server if we're running directly (not being imported)
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  });
}

// Export the app for Vercel
module.exports = app; 