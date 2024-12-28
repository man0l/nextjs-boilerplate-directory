const express = require('express');
const cors = require('cors');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
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
    const results = [];
    fs.createReadStream(path.join(__dirname, 'data', 'transformed_aitools_with_descriptions_and_images.csv'))
      .pipe(csv())
      .on('data', (data) => {
        if (!data.description || data.description.trim() === '') {
          console.log('Tool without description:', data.title);
        }
        results.push(data);
      })
      .on('end', () => {
        aiTools = results;
        console.log('CSV file successfully processed');
        console.log('Total tools loaded:', aiTools.length);
      });
  } catch (error) {
    console.error('Error loading data:', error);
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

// Only start the server if we're running directly (not being imported)
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

// Export the app for Vercel
module.exports = app; 