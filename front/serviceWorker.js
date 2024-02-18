let CACHE_NAME = "my-site-cache-v1";

const urlsToCache = ["/", "/index.html", "/manifest.json"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

self.addEventListener("push", async (event) => {
  const message = await event.data.json();
  let { title, body } = message;

  await event.waitUntil(
    self.registration.showNotification(title, {
      body: body,
    })
  );
});
