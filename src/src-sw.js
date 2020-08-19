import {precacheAndRoute} from 'workbox-precaching';
import {registerRoute} from 'workbox-routing';
import {CacheFirst} from 'workbox-strategies'
precacheAndRoute(self.__WB_MANIFEST, {});

registerRoute(
  /https:\/\/forr-resume\.web\.app\//,
  new CacheFirst({
    cacheName: "pages",

  })
);

addEventListener("message", event => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    skipWaiting();
  }
});
