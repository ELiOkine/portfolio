import type { MetadataRoute } from 'next';
import { projects } from '@/data/projects';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://emmanuel-okine.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.id}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...projectRoutes,
  ];
}
