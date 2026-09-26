import type { MetadataRoute } from 'next'
import { site } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date('2026-09-26')
  return [
    { url: `${site.url}/`, lastModified, changeFrequency: 'weekly', priority: 1 },
    { url: `${site.url}/demo`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${site.url}/eden-framework`, lastModified, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${site.url}/api-docs`, lastModified, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${site.url}/privacy`, lastModified, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${site.url}/terms`, lastModified, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${site.url}/imprint`, lastModified, changeFrequency: 'yearly', priority: 0.2 },
  ]
}
