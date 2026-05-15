import type { MetadataRoute } from 'next'

// Fallback ensures sitemap never outputs "undefined" if the env var
// is missing — hardcode the production URL as the safe default.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
  'https://protest-against-cbse.vercel.app'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url:             `${siteUrl}/`,
      lastModified:    new Date(),
      changeFrequency: 'weekly',
      priority:        1,
    },
  ]
}