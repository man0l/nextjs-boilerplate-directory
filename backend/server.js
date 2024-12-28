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

// Load data synchronously at startup
function loadData() {
  try {
    const dataPath = path.join(__dirname, 'data', 'transformed_aitools_with_descriptions_and_images.csv');
    const fileContent = fs.readFileSync(dataPath, 'utf-8');
    
    // Use csv-parse to parse the CSV file
    const records = parse(fileContent, {
      columns: true, // Use the header row to create objects
      skip_empty_lines: true,
      trim: true
    });
    
    aiTools = records.filter(tool => tool.title); // Filter out empty rows
    
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

// Only start the server if we're running directly (not being imported)
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  });
}

// Export the app for Vercel
module.exports = app; 