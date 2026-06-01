'use strict';

const CACHE_NAME = 'bearbait-static-v44';
const SITE_ASSETS = [
    './',
    './index.html',
    './favicon.png?v=1',
    './assets/css/style.css',
    './assets/css/outforblood.css',
    './assets/js/terminal.js',
    './assets/js/outforblood.js',
    './assets/js/zeroday.js',
    './assets/js/noise.js',
    './assets/js/script.js',
    './assets/fonts/IBM_Plex_Mono/IBMPlexMono-Regular.woff2',
    './assets/fonts/IBM_Plex_Mono/IBMPlexMono-Medium.woff2',
    './assets/fonts/pono_088/Pono_088.woff2',
    './assets/fonts/Reboot/Reboot.woff2',
    './assets/video/bloodflow.webm',
    './assets/img/background/bearbait-banner.webp',
    './assets/img/background/prevail-framework.webp',
    './assets/img/logos/bearbait-official.png',
    './assets/img/crt/bearbait-CRT-reflection.png',
    './assets/img/crt/bearbait-CRT-handprint.webp',
    './assets/img/crt/bearbait-CRT-handprint-mobile.webp',
    './assets/img/author/gt-author-full.png',
    './assets/img/book/intended-user-3d-cover.png',
    './assets/img/book/intended-user-secrect-cover.png',
    './assets/img/social/tiktok-white.png',
    './assets/img/social/tiktok-color.png',
    './assets/img/social/youtube-white.png',
    './assets/img/social/youtube-color.png',
    './assets/img/social/facebook-white.png',
    './assets/img/social/facebook-color.png',
    './assets/img/social/discord-white.png',
    './assets/img/social/discord-color.png',
    './assets/img/zeroday/zeroday.png',
    './assets/img/zeroday/zeroday-eyes-01.png',
    './assets/img/zeroday/zeroday-eyes-02.png',
    './assets/img/zeroday/zeroday-eyes-03.png',
    './assets/img/zeroday/zeroday-eyes-04.png',
    './assets/img/zeroday/zeroday-eyes-05.png',
    './assets/img/zeroday/zeroday-eyes-06.png',
    './assets/img/zeroday/zeroday-eyes-07.png',
    './assets/img/zeroday/zeroday-eyes-08.png',
    './assets/img/zeroday/zeroday-eyes-09.png',
    './assets/img/zeroday/zeroday-reticle.webp',
    './assets/img/zeroday/zeroday-termination.png',
    './assets/img/zeroday/zeroday-ASCII.webp',
    './assets/img/zeroday/pixel-speech-bubble.png',
    './assets/img/zeroday/pixel-speech-bubble-tail.png',
    './assets/audio/target-acquired.mp3',
    './assets/audio/explosion.mp3'
];

function scopedUrl(path) {
    return new URL(path, self.registration.scope).href;
}

function fetchAndCache(request, cacheKey) {
    return fetch(request, { cache: 'no-cache' }).then(function (networkResponse) {
        if (!networkResponse.ok) return networkResponse;

        const responseCopy = networkResponse.clone();
        return caches.open(CACHE_NAME).then(function (cache) {
            return cache.put(cacheKey || request, responseCopy);
        }).then(function () {
            return networkResponse;
        });
    });
}

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(SITE_ASSETS.map(function (asset) {
                return new Request(scopedUrl(asset), { cache: 'reload' });
            }));
        }).then(function () {
            return self.skipWaiting();
        })
    );
});

self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then(function (keys) {
            return Promise.all(keys.map(function (key) {
                if (key !== CACHE_NAME && key.indexOf('bearbait-static-') === 0) {
                    return caches.delete(key);
                }
                return undefined;
            }));
        }).then(function () {
            return self.clients.claim();
        })
    );
});

self.addEventListener('fetch', function (event) {
    if (event.request.method !== 'GET') return;
    if (event.request.headers.has('range')) return;

    const requestUrl = new URL(event.request.url);
    if (requestUrl.origin !== self.location.origin) return;

    if (event.request.mode === 'navigate') {
        event.respondWith(
            fetchAndCache(event.request, scopedUrl('./index.html')).catch(function () {
                return caches.match(scopedUrl('./index.html'));
            })
        );
        return;
    }

    event.respondWith(
        fetchAndCache(event.request).catch(function () {
            return caches.match(event.request);
        })
    );
});
