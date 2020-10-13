importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.0.0/workbox-sw.js');
// importScripts('https://www.gstatic.com/firebasejs/7.23.0/firebase-auth.js');

console.log(`sd! Workbox is loaded 🎉`);
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