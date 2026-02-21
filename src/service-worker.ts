/// <reference types="@sveltejs/kit" />
/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />

import { build, files, version } from '$service-worker';

declare const self: ServiceWorkerGlobalScope;

const CACHE_STATIC = `sansanews-static-${version}`;
const CACHE_IMAGES = `sansanews-images-${version}`;

const IMAGE_CACHE_LIMIT = 50;

const ASSETS = [...build, ...files];

async function trimCache(cacheName: string, maxItems: number): Promise<void> {
	const cache = await caches.open(cacheName);
	const keys = await cache.keys();
	const toDelete = keys.slice(0, Math.max(0, keys.length - maxItems));
	await Promise.all(toDelete.map((key) => cache.delete(key)));
}

self.addEventListener('install', (event) => {
	event.waitUntil(
		(async () => {
			const cache = await caches.open(CACHE_STATIC);
			await cache.addAll(ASSETS);
			await self.skipWaiting();
		})()
	);
});

self.addEventListener('activate', (event) => {
	event.waitUntil(
		(async () => {
			const validCaches = [CACHE_STATIC, CACHE_IMAGES];

			for (const key of await caches.keys()) {
				if (!validCaches.includes(key)) {
					await caches.delete(key);
				}
			}
			await self.clients.claim();
		})()
	);
});


self.addEventListener('fetch', (event) => {
	const url = new URL(event.request.url);
	event.respondWith(respond(event, url));
});


async function respond(event: FetchEvent, url: URL): Promise<Response> {
	const staticCache = await caches.open(CACHE_STATIC);
	const imageCache  = await caches.open(CACHE_IMAGES);


	// CACHE-FIRST
	if (url.origin === self.location.origin) {
		const cached = await staticCache.match(event.request);
		if (cached) return cached;

		try {
			const response = await fetch(event.request);
			if (response.ok) {
				await staticCache.put(event.request, response.clone());
			}
			return response;
		} catch {
			const isNavigation = event.request.mode === 'navigate';
			if (isNavigation) {
				return new Response(
					`<!DOCTYPE html>
                    <html lang="es">
                      <head>
                        <meta charset="utf-8" />
                        <meta name="viewport" content="width=device-width, initial-scale=1" />
                        <title>Sin conexión — SansaNews</title>
                        <style>
                          body { font-family: serif; display: flex; flex-direction: column;
                                 align-items: center; justify-content: center; min-height: 100vh;
                                 margin: 0; background: #f4f1ee; color: #1e2a32; text-align: center; }
                          h1   { font-size: 2rem; margin-bottom: 0.5rem; }
                          p    { color: #555; }
                        </style>
                      </head>
                      <body>
                        <h1>Sin conexión</h1>
                        <p>No hay conexión a internet. Vuelve a intentarlo cuando estés en línea.</p>
                      </body>
                    </html>`,
					{ status: 503, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
				);
			}
			return new Response('Sin conexión / No connection', {
				status: 503,
				headers: { 'Content-Type': 'text/plain; charset=utf-8' }
			});
		}
	}


	// STALE-WHILE-REVALIDATE
	const isInstagramCDN =
		url.hostname.endsWith('cdninstagram.com') ||
		url.hostname.endsWith('fbcdn.net');

	if (isInstagramCDN) {
		const cached = await imageCache.match(event.request);
		const corsRequest = new Request(event.request.url, {
			mode: 'cors',
			credentials: 'omit',
		});

		const networkUpdate = fetch(corsRequest)
			.then(async (response) => {
				if (response.ok && response.type !== 'opaque') {
					try {
						await imageCache.put(event.request, response.clone());
						await trimCache(CACHE_IMAGES, IMAGE_CACHE_LIMIT);
					} catch {
					}
				}
				return response;
			})
			.catch(() => {
				return cached ?? new Response('', { status: 503 });
			});

		if (cached) {
			event.waitUntil(networkUpdate);
			return cached;
		}
		return networkUpdate;
	}


	// NETWORK-ONLY
	try {
		return await fetch(event.request);
	} catch {
		return new Response('Sin conexión / No connection', {
			status: 503,
			headers: { 'Content-Type': 'text/plain; charset=utf-8' }
		});
	}
}
