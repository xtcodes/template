self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('twibbon-cache').then(cache =>
      cache.addAll([
        './',
        './index.html',
        './icon.png',
        './frame.png',
        './manifest.json'
      ])
    )
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  );
});
