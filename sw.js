/* Den gamle versjonen bruker ikke offline. Fjern den som ble installert av den nye versjonen,
   så telefonen alltid viser denne siden rett fra nettet. */
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    for (const n of await caches.keys()) if (n.startsWith('forbruk-')) await caches.delete(n);
    await self.registration.unregister();
    for (const c of await self.clients.matchAll({ type: 'window' })) c.navigate(c.url);
  })());
});
