// LE CLOSING — service worker : cache-first, app 100 % hors-ligne
const CACHE = "closing-v49-le-fonds";
const ASSETS = [
  "./",
  "./index.html",
  "./data-deals.js",
  "./data-academy.js",
  "./data-sparring.js",
  "./data-paliers.js",
  "./data-lexique.js",
  "./data-drills.js",
  "./data-flashcards.js",
  "./data-feynman.js",
  "./data-masterclass.js",
  "./data-boite.js",
  "./data-boite-n1.js",
  "./data-formules.js",
  "./data-boite-marche.js",
  "./data-boite-jalons.js",
  "./data-exos.js",
  "./data-cas.js",
  "./data-chiffrage.js",
  "./data-boite-n2.js",
  "./data-boite-n3.js",
  "./data-deals-tech.js",
  "./data-economie.js",
  "./data-stage.js",
  "./data-quotidien.js",
  "./data-recitation.js",
  "./data-pensees.js",
  "./data-fonds.js",
  "./manifest.webmanifest"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

/* ⚠️ NE PURGER QUE SES PROPRES CACHES (corrigé le 2026-11-23).
   Les ~30 apps vivent sur UNE SEULE origine (niclaeysthomas-ctrl.github.io),
   donc elles partagent le même CacheStorage. L'ancien code supprimait
   toute clé différente de CACHE : chaque déploiement du closing vidait le
   cache hors-ligne du Pointage, de 990, de cumbre… Constaté en direct :
   après une installation, il ne restait que le cache du closing. */
const PREFIXE = "closing-";
self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k.startsWith(PREFIXE) && k !== CACHE).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  if (e.request.method !== "GET" || !e.request.url.startsWith(self.location.origin) || e.request.url.includes("/forge/forge-sync.js")) return;
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then(hit =>
      hit ||
      /* Ne jamais mettre en cache une réponse qui n'est pas OK : pendant un
         build GitHub Pages, le site répond 404, et une 404 cachée fige l'app
         sur « File not found » jusqu'au prochain changement de version. */
      fetch(e.request).then(res => {
        if (res && res.ok) {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, copy));
        }
        return res;
      })
    )
  );
});
