import type { MetadataRoute } from 'next';

// Served at /robots.txt. Everything is open to crawlers; this mainly points them at the sitemap.
export default function robots(): MetadataRoute.Robots {
    return {
        rules: { userAgent: '*', allow: '/' },
        sitemap: 'https://subliminalsarcasmstudios.com/sitemap.xml',
    };
}
