const express = require('express');
const cors = require('cors');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Store data in memory
let aiTools = [];

// Read CSV file
fs.createReadStream(path.join('/app/data/transformed_aitools_with_descriptions_and_images.csv'))
  .pipe(csv())
  .on('data', (data) => {
    // Log any tool without a description
    if (!data.description || data.description.trim() === '') {
      console.log('Tool without description:', data.title);
    }
    aiTools.push(data);
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
    console.log('Total tools loaded:', aiTools.length);
  });

// Routes
app.get('/api/tools', (req, res) => {
  // Add debug logging
  console.log('Total tools before filtering:', aiTools.length);
  const toolsWithoutDesc = aiTools.filter(tool => !tool.description || tool.description.trim() === '');
  console.log('Number of tools without description:', toolsWithoutDesc.length);
  if (toolsWithoutDesc.length > 0) {
    console.log('Tools without description:', toolsWithoutDesc.map(t => ({ title: t.title, description: t.description })));
  }
  
  // Filter out tools without descriptions
  const filteredTools = aiTools.filter(tool => tool.description && tool.description.trim() !== '');
  console.log('Total tools after filtering:', filteredTools.length);
  
  res.json(filteredTools);
});

app.get('/api/tools/:id', (req, res) => {
  const tool = aiTools.find(t => t.id === req.params.id);
  if (!tool) {
    return res.status(404).json({ message: 'Tool not found' });
  }
  res.json(tool);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 