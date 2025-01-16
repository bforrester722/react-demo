import { precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { CacheFirst } from "workbox-strategies";

// Precache the assets defined in the manifest
precacheAndRoute(self.__WB_MANIFEST);

// Cache all requests to a specific origin using CacheFirst strategy
registerRoute(
  ({ url }) => url.origin === "https://forr-resume.web.app",
  new CacheFirst({
    cacheName: "pages",
  })
);

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
