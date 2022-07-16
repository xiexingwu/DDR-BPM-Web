const staticDDRBPM = 'DDR BPM';
const assets = [
  '/',
  '/index.html',
  '/src/index.jsx',
  '/src/assets/jackets/888-jacket.png',
  '/src/assets/data/888.json'
];

self.addEventListener('install', installEvent => {
  installEvent.waitUntil(
    caches.open(staticDDRBPM).then(cache => {
      cache.addAll(assets)
    })
  )
})