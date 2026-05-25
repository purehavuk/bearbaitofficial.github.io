'use strict';

// Increment this when a deployment must replace precached assets immediately.
const CACHE_NAME = 'bearbait-static-v11';
const SITE_ASSETS = [
    './',
    './index.html',
    './assets/css/style.css',
    './assets/css/antigravity-field.css',
    './assets/js/terminal.js',
    './assets/js/antigravity-field.js',
    './assets/js/cat.js',
    './assets/js/script.js',
    './assets/fonts/IBM_Plex_Mono/IBMPlexMono-Regular.woff2',
    './assets/fonts/IBM_Plex_Mono/IBMPlexMono-Medium.woff2',
    './assets/fonts/pono_088/Pono_088.woff2',
    './assets/fonts/Reboot/Reboot.woff2',
    './assets/video/prevail-framework.webm',
    './assets/img/background/bearbait-banner.webp',
    './assets/img/background/prevail-framework.webp',
    './assets/img/logos/bearbait-official.png',
    './assets/img/crt/bearbait-CRT-reflection.png',
    './assets/img/crt/bearbait-CRT-handprint.png',
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
    './assets/img/cat/zeroday.png',
    './assets/img/cat/zeroday-eyes-01.png',
    './assets/img/cat/zeroday-eyes-02.png',
    './assets/img/cat/zeroday-eyes-03.png',
    './assets/img/cat/zeroday-eyes-04.png',
    './assets/img/cat/zeroday-eyes-05.png',
    './assets/img/cat/zeroday-eyes-06.png',
    './assets/img/cat/zeroday-eyes-07.png',
    './assets/img/cat/zeroday-eyes-08.png',
    './assets/img/cat/zeroday-eyes-09.png',
    './assets/img/cat/pixel-speech-bubble.png',
    './assets/img/cat/pixel-speech-bubble-tail.png'
];

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(SITE_ASSETS);
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
            fetch(event.request).then(function (networkResponse) {
                if (!networkResponse.ok) return networkResponse;

                const responseCopy = networkResponse.clone();
                return caches.open(CACHE_NAME).then(function (cache) {
                    return cache.put('./index.html', responseCopy);
                }).then(function () {
                    return networkResponse;
                });
            }).catch(function () {
                return caches.match('./index.html');
            })
        );
        return;
    }

    event.respondWith(
        caches.match(event.request).then(function (cachedResponse) {
            const networkRequest = fetch(event.request).then(function (networkResponse) {
                if (!networkResponse.ok) return networkResponse;

                const responseCopy = networkResponse.clone();
                return caches.open(CACHE_NAME).then(function (cache) {
                    return cache.put(event.request, responseCopy);
                }).then(function () {
                    return networkResponse;
                });
            });

            if (cachedResponse) {
                event.waitUntil(networkRequest.catch(function () {
                    return undefined;
                }));
                return cachedResponse;
            }

            return networkRequest;
        })
    );
});
