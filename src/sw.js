import { precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { CacheFirst } from "workbox-strategies";
import { NetworkFirst } from "workbox-strategies";
import { ExpirationPlugin } from "workbox-expiration";
/* eslint-disable no-restricted-globals */
// Skip waiting and claim clients immediately
self.addEventListener("install", (event) => {
  self.skipWaiting();
});
self.addEventListener("activate", (event) => {
  self.clients.claim();
});

// Precache assets
precacheAndRoute(self.__WB_MANIFEST);

// Cache specific routes
registerRoute(
  ({ request }) => request.destination === "document", // Match HTML documents
  new NetworkFirst({
    cacheName: "pages",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 50, // Cache up to 50 entries
        maxAgeSeconds: 30 * 24 * 60 * 60, // Cache for 30 days
      }),
    ],
  })
);
