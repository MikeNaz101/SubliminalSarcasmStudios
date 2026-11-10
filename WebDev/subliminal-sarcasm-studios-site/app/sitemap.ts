import type { MetadataRoute } from 'next';
import { featuredGames, inDevelopment } from '../lib/games';

// Served at /sitemap.xml. Lists every public page so search engines can find them.
// Game pages come from lib/games.ts, so a new game page shows up here automatically.

const SITE = 'https://subliminalsarcasmstudios.com';

export default function sitemap(): MetadataRoute.Sitemap {
    const lastModified = new Date();
    const page = (path: string, priority: number): MetadataRoute.Sitemap[number] => ({
        url: `${SITE}${path}`,
        lastModified,
        priority,
    });

    const earlyPages = inDevelopment
        .map((project) => project.href)
        .filter((href): href is string => !!href && href.startsWith('/'));

    return [
        page('/', 1),
        ...featuredGames.map((game) => page(game.href, 0.9)),
        page('/void-runner/playtest', 0.7),
        page('/about', 0.6),
        ...earlyPages.map((href) => page(href, 0.4)),
        page('/void-runner/support', 0.3),
        page('/void-runner/privacy', 0.2),
    ];
}
