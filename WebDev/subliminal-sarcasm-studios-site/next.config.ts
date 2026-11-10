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
};

export default nextConfig;
