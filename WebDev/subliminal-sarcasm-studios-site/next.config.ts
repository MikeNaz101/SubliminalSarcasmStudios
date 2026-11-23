import type { NextConfig } from "next";

// Pages from the old static site (the Website/ folder) that Google still has on file.
// Each one now points permanently to the page that replaced it, so old links and
// search results land somewhere real instead of a 404.
const oldStaticPages: Record<string, string> = {
  '/index.html': '/',
  '/about.html': '/about',
  '/syn_city.html': '/syn-city',
  '/donner_party.html': '/donner-party',
  '/geometry_defenders.html': '/geometry-defenders',
  '/fptd_bugs.html': '/fptd-bugs',
  '/ishana.html': '/',
  '/welcome.html': '/',
  '/login.html': '/',
  '/admin_stats.html': '/',
};

const nextConfig: NextConfig = {
  async redirects() {
    return Object.entries(oldStaticPages).map(([source, destination]) => ({
      source,
      destination,
      permanent: true,
    }));
  },
  async headers() {
    return [
      {
        // Private previews (app/preview): keep them out of search engines and archives,
        // and never send the secret link to other sites as a referrer.
        source: '/preview/:path*',
        headers: [
          { key: 'X-Robots-Tag', value: 'noindex, nofollow, noarchive, nosnippet' },
          { key: 'Referrer-Policy', value: 'no-referrer' },
          { key: 'Cache-Control', value: 'private, no-store' },
        ],
      },
    ];
  },
};

export default nextConfig;
