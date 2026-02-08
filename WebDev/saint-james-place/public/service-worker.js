const CACHE_NAME = "sjp-maint-v1";
const ASSETS_TO_CACHE = [
    "/",
    "/dashboard",
    "/images/icon-192.png",
    "/images/icon-512.png"
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            // Use {status: 'fulfilled'} logic to prevent one failing file from breaking the whole cache
            return Promise.allSettled(
                ASSETS_TO_CACHE.map(url => cache.add(url))
            );
        })
    );
});

self.addEventListener("fetch", (event) => {
    // Only intercept standard GET requests, ignore browser extensions and Next.js HMR
    if (event.request.method !== 'GET' || !event.request.url.startsWith('http')) return;

    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request).catch(() => {
                // Optional: Return a custom offline page if the network fails
                return caches.match("/");
            });
        })
    );
});