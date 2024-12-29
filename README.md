# AI Tools Directory

A modern, SEO-optimized directory website showcasing the best AI tools. Built with Next.js for optimal performance and search engine visibility. This project can be easily adapted for any niche by modifying the data source.

## Features

- 🚀 Built with Next.js for optimal performance
- 📱 Fully responsive design
- 🔍 SEO optimized with meta tags and structured data
- 📊 Data-driven directory from CSV file
- 🎨 Modern UI with clean design
- 🔄 Easy to customize for different niches
- 🌐 Category-based navigation
- 📈 Performance optimized with static generation
- 🔎 Search functionality
- 🏷️ Tag-based filtering

## Quick Start

1. Clone the repository:
```bash
git clone https://github.com/yourusername/best-tools-nextjs.git
cd best-tools-nextjs
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Customizing the Directory

To adapt this directory for a different niche:

1. Modify the data in the CSV file located in the `data` directory
2. Update the categories and tags in the configuration files
3. Adjust the styling and branding as needed

## Data Structure

### CSV Format
Your `data/tools.csv` should follow this structure:
```csv
name,description,category,tags,url,image
Tool Name,Tool Description,Category,tag1|tag2|tag3,https://example.com,/images/tool.png
```

### Required Fields
- `name`: The name of your directory item
- `description`: A brief description (recommended: 150-200 characters)
- `category`: Main category (must match categories in config)
- `tags`: Pipe-separated tags (|)
- `url`: Website URL
- `image`: Path to image (stored in public/images/)

### Custom Fields
To add custom fields:

1. Update the CSV with new columns
2. Modify the data type in `types/Tool.ts`:
```typescript
interface Tool {
  name: string;
  description: string;
  category: string;
  tags: string[];
  url: string;
  image: string;
  // Add your custom fields:
  pricing?: string;
  rating?: number;
}
```

3. Update the card component to display new fields

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.
