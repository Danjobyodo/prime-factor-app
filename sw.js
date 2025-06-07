// キャッシュするファイルの名前をバージョン管理する
const CACHE_NAME = 'prime-factor-app-cache-v1';
// キャッシュするファイルのリスト
const urlsToCache = [
  '/prime-factor-app/',
  '/prime-factor-app/index.html',
  '/prime-factor-app/script.js',
  '/prime-factor-app/images/icon-512x512.png'
];

// 1. インストール処理
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// 2. リクエストがあった場合に、キャッシュから返す処理
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // キャッシュにあればそれを返す、なければネットワークに取りに行く
        return response || fetch(event.request);
      })
  );
});
