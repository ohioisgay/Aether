importScripts('/uv/uv.bundle.js');
importScripts('/uv/uv.config.js');
importScripts('/uv/uv.sw.js');
importScripts('/scram/scramjet.all.js');

const uv = new UVServiceWorker();
const scram = new ScramjetServiceWorker();

self.addEventListener('fetch', (event) => {
    if (event.request.url.includes('/service/')) {
        event.respondWith(uv.fetch(event));
    } else if (event.request.url.includes('/scram/')) {
        event.respondWith(scram.fetch(event));
    }
});
