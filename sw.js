const CACHE_NAME = 'jogos-educativos-v1';
const assets = [
  '/',
  'index.html',
  'style.css',
  'script.js',
  'acerto.mp3',
  'sucesso.mp3',
  '1.png',
  '2.png',
  '3.png',
  'icone-192.png',
  'icone-512.png'
];

// Instala o Service Worker e guarda os arquivos no cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assets);
    })
  );
});

// Responde com o cache quando estiver offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});