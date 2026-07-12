// LE CLOSING — service worker : cache-first, app 100 % hors-ligne
const CACHE = "closing-v8";
const ASSETS = [
  "./",
  "./index.html",
  "./data-deals.js",
  "./data-academy.js",
  "./data-sparring.js",
  "./data-lexique.js",
  "./data-drills.js",
  "./data-flashcards.js",
  "./data-feynman.js",
  "./data-masterclass.js",
  "./manifest.webmanifest"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then(hit =>
      hit ||
      fetch(e.request).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy));
        return res;
      })
    )
  );
});
