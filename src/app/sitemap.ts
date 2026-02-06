import { MetadataRoute } from 'next';
import { SECTION_IDS } from '@/shared/constants';

/**
 * Generate sitemap for public pages only
 * Admin pages are intentionally excluded (already blocked in robots.txt)
 */
export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://quangit.dev';

    // Only include public-facing pages in sitemap
    const routes: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1.0,
        },
        {
            url: `${baseUrl}/${SECTION_IDS.skills}`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/${SECTION_IDS.experience}`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/${SECTION_IDS.projects}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/${SECTION_IDS.contact}`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.7,
        },
    ];

    return routes;
}
