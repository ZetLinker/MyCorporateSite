const CACHE_NAME = "baseweb-cache-v2"; // バージョンを変更
const urlsToCache = [
  "/",
  "/index.html",
  // 必要に応じて他のリソースを追加
];

// インストールイベント
self.addEventListener("install", (event) => {
  // 古いキャッシュを削除する
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      ).then(() => {
        return caches.open(CACHE_NAME).then((cache) => {
          return cache.addAll(urlsToCache);
        });
      });
    })
  );
});

// フェッチイベント
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// アクティベートイベント
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
