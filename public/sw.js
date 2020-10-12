importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.0.0/workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);

  workbox.precaching.precacheAndRoute([]);
  workbox.skipWaiting();
  workbox.clientsClaim();

  workbox.routing.registerRoute(
   /https:\/\/forr-resume\.web\.app\//,
    workbox.strategies.cacheFirst({
      cacheName: "pages",
    }),
  ); 
}else {
  console.log(`Boo! Workbox didn't load 😬`);
}