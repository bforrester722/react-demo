importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');
import {precacheAndRoute} from 'workbox-precaching';
import {registerRoute} from 'workbox-routing';
import {CacheFirst} from 'workbox-strategies'
precacheAndRoute(self.__WB_MANIFEST, {});


if (workbox) {
 console.log(`Yay! Workbox is loaded 🎉`);
 skipWaiting();
 registerRoute(
   /https:\/\/forr-resume\.web\.app\//,
    new CacheFirst({
      cacheName: "pages",
    }),
  ); 
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

