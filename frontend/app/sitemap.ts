import { MetadataRoute } from 'next'

async function fetchTools() {
  const apiUrl = process.env.INTERNAL_API_URL || process.env.NEXT_PUBLIC_API_URL
  const res = await fetch(`${apiUrl}/tools`, {
    next: { revalidate: 3600 } // Revalidate every hour
  })
  if (!res.ok) return []
  return res.json()
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://boilerplatelist.com'
  const tools = await fetchTools()

  // Get unique categories
  const categories = new Set<string>()
  tools.forEach((tool: any) => {
    if (tool.filter1) {
      tool.filter1.split(',').forEach((category: string) => {
        categories.add(category.trim().toLowerCase())
      })
    }
  })

  const sitemapEntries: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/categories`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    }
  ]

  // Add all tools
  tools.forEach((tool: any) => {
    if (tool.title) {
      const slug = tool.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
      sitemapEntries.push({
        url: `${baseUrl}/tool/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      })
    }
  })

  // Add all categories
  Array.from(categories).forEach((category) => {
    const slug = category.replace(/\s+/g, '-')
    sitemapEntries.push({
      url: `${baseUrl}/category/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    })
  })

  return sitemapEntries
}