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
  .on('data', (data) => aiTools.push(data))
  .on('end', () => {
    console.log('CSV file successfully processed');
  });

// Routes
app.get('/api/tools', (req, res) => {
  res.json(aiTools);
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