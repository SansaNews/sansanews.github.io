/// <reference types="@sveltejs/kit" />
/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />

const sw = globalThis as unknown as ServiceWorkerGlobalScope;

sw.addEventListener("install", () => {
	sw.skipWaiting();
});

sw.addEventListener("activate", (event) => {
	event.waitUntil(sw.clients.claim());
});

sw.addEventListener("fetch", (event) => {
	if (event.request.mode !== "navigate") return;

	event.respondWith(
		fetch(event.request).catch(
			() =>
				new Response(
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
				    <p>No hay conexión a internet.</p> 
					<p>Vuelve a intentarlo cuando estés en línea.</p>
				  </body>
				</html>`,
					{
						status: 503,
						headers: { "Content-Type": "text/html; charset=utf-8" },
					},
				),
		),
	);
});
