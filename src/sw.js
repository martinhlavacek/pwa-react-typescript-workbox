/* eslint-disable no-console */
import workbox from 'workbox';

workbox.routing.registerRoute(
    new RegExp('https:.*min\.(css|js)'),
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'cdn-cache'
    })
  )
  
  workbox.routing.registerRoute(
    new RegExp('http://.*:4567.*\.json'),
    new workbox.strategies.NetworkFirst()
  )
  
  self.addEventListener('fetch', event => {
    if(event.request.method === "POST" || event.request.method === "DELETE") {
      event.respondWith(
        fetch(event.request).catch(err => {
          return new Response(
            JSON.stringify({ error: "This action disabled while app is offline" }), {
              headers: { 'Content-Type': 'application/json' }
            }
          )
        })
      )
    }
  })
  
  self.addEventListener('install', event => {
    console.log('install', event);
    self.skipWaiting();
  })
  
  self.addEventListener('activate', event => {
    console.log('activate', event)
  })
  
  self.addEventListener('push', event => {
    event.waitUntil(self.registration.showNotification('Todo List', {
      icon: '/icon-120.png',
      body: event.data.text()
    }))
  })
  
  workbox.precaching.precacheAndRoute(self.__precacheManifest || [])
  