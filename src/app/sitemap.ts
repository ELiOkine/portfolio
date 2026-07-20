import type { MetadataRoute } from 'next';
import { projects } from '@/data/projects';
import { dataScienceProjects } from '@/data/dataScience';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://emmanuel-okine.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.id}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const dataScienceRoutes: MetadataRoute.Sitemap = dataScienceProjects.map((project) => ({
    url: `${baseUrl}/data-science/${project.id}`,
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
    {
      url: `${baseUrl}/data-science`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    ...projectRoutes,
    ...dataScienceRoutes,
  ];
}
