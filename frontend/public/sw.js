const CACHE_NAME = "eq-track-cache-v1";
const ASSETS_TO_CACHE = [
    "/",
    "/index.html",
    "/assets/index-Bt5qnjlm.css",
    "/assets/index-26uJkKcV.js",
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then((cache) => {
                cache.addAll(ASSETS_TO_CACHE)
            })
            .catch(err => console.error('sw error...', err))
    );
    self.skipWaiting();
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches
            .match(event.request)
            .then((response) => {
                return response || fetch(event.request);
            })
    );
});
