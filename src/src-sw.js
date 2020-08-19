import {precacheAndRoute} from 'workbox-precaching';
import {registerRoute} from 'workbox-routing';
import {StaleWhileRevalidate} from 'workbox-strategies'

// simple service worker
precacheAndRoute(self.__WB_MANIFEST, {});

registerRoute(
  /https:\/\/forr-resume\.web\.app\//,
  new CacheFirst({
    StaleWhileRevalidate: "pages",
  })
);

addEventListener("message", event => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    skipWaiting();
  }
});
