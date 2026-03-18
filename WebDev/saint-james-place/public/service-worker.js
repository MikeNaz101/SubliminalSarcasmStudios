const CACHE_NAME = "sjp-maint-v2"; // Bumped version to force iPhone to update!
const ASSETS_TO_CACHE = [
    "/",
    // REMOVED "/dashboard" - Never cache protected NextAuth routes!
    "/images/icon-192.png",
    "/images/icon-512.png"
];

self.addEventListener("install", (event) => {
    // Skip waiting ensures the new service worker takes over immediately
    self.skipWaiting();

    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return Promise.allSettled(
                ASSETS_TO_CACHE.map(url => cache.add(url))
            );
        })
    );
});

self.addEventListener("activate", (event) => {
    // Delete old caches when we update the version number
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

self.addEventListener("fetch", (event) => {
    if (event.request.method !== 'GET' || !event.request.url.startsWith('http')) return;

    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) return cachedResponse;

            return fetch(event.request).then((networkResponse) => {
                // THE SAFARI FIX:
                // If NextAuth triggers a redirect, we must clean it up
                // so Safari doesn't throw the "has redirections" error!
                if (networkResponse.redirected) {
                    return Response.redirect(networkResponse.url, 302);
                }
                return networkResponse;
            }).catch(() => {
                // Fallback to home page if completely offline
                if (event.request.mode === 'navigate') {
                    return caches.match("/");
                }
            });
        })
    );
});