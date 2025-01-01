# SaaS Boilerplate Starters Directory

A modern, SEO-optimized directory website showcasing the best SaaS boilerplate and starter templates. Built with Next.js for optimal performance and search engine visibility. This project helps developers kickstart their SaaS projects with production-ready templates.

## Features

- 🚀 Built with Next.js for optimal performance
- 📱 Fully responsive design
- 🔍 SEO optimized with meta tags and structured data
- 📊 Data-driven directory from CSV file
- 🎨 Modern UI with clean design
- 🔄 Easy to filter different types of starters
- 🌐 Framework-based navigation
- 📈 Performance optimized with static generation
- 🔎 Search functionality
- 🏷️ Technology stack filtering

## Quick Start

1. Clone the repository:
```bash
git clone https://github.com/yourusername/nextjs-boilerplate-starter.git
cd nextjs-boilerplate-starter
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

To add or modify boilerplate entries:

1. Update the data in the CSV file located in the `data` directory
2. Update the frameworks and technology stacks in the configuration files
3. Adjust the styling and branding as needed

## Data Structure

### CSV Format
Your `data/boilerplate-tools.csv` should follow this structure:
```csv
name,description,framework,techStack,url,image,githubStars,lastUpdate
Starter Name,Starter Description,Framework,tech1|tech2|tech3,https://example.com,/images/starter.png,1000,2024-01-01
```

### Required Fields
- `name`: The name of the boilerplate/starter
- `description`: A brief description of features and stack
- `framework`: Main framework (Next.js, React, Vue, etc.)
- `techStack`: Pipe-separated technologies (|)
- `url`: Repository or demo URL
- `image`: Path to screenshot/preview image
- `githubStars`: Number of GitHub stars
- `lastUpdate`: Last update date

### Custom Fields
To add custom fields:

1. Update the CSV with new columns
2. Modify the data type in `types/Starter.ts`:
```typescript
interface Starter {
  name: string;
  description: string;
  framework: string;
  techStack: string[];
  url: string;
  image: string;
  githubStars: number;
  lastUpdate: string;
  // Add your custom fields:
  pricing?: string;
  complexity?: string;
}
```

3. Update the card component to display new fields

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.
