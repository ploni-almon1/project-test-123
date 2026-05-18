const CACHE_NAME = 'alive-app-offline-v1';

// Seznam souborů, které si telefon uloží pro offline použití
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './ikona.png',
  './karta.gif',
  './tlacitko.png'
];

// Instalace - uložení souborů do paměti telefonu
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Zobrazení offline - když není internet, vezme se to z paměti
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
