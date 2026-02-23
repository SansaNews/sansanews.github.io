# SansaNews

_SansaNews_ es una iniciativa estudiantil que busca centralizar las noticias de la USM en un mismo lugar para facilitar su divulgación en la comunidad sansana.

## Instalar

**Requisitos:**

- [Git](https://git-scm.com/)
- [just](https://github.com/casey/just)
- [Python](https://www.python.org/)
- [Bun](https://bun.sh/)

Para inicializar el proyecto ejecuta los siguientes comandos:

```sh
git clone https://github.com/MoonTurtlee/SansaNews.git
cd SansaNews
just init
```

Para poder usar el script con la API de instagram necesitas crear un archivo `.env` en el root del proyecto y colocar tu token de acceso en el.

```env
ACCESS_TOKEN=tu_token_de_acceso
```

Puedes obtener un token de acceso siguiendo la [guía de la API de Instagram](https://developers.facebook.com/docs/instagram-platform/instagram-api-with-facebook-login/get-started).

## Comandos

Puedes ver todos los comandos del proyecto con `just -l`.

```sh
just dev            # Inicia el entorno de desarrollo
just check username # Chequea si el usuario es accesible mediante la API
just get username   # Obtiene los últimos posts del usuario
just get-all        # Obtiene los últimos posts de los usuarios que se encuentran en `src/lib/assets/users.json`
just build          # Construye el proyecto para ser publicado
```

## Estructura

Usamos [just](https://github.com/casey/just) para crear comandos personalizados para el proyecto.

- `justfile`, configuración de comandos del proyecto.

Para el script del backend ocupamos python junto con la [API Oficial de Instagram](https://developers.facebook.com/docs/instagram-platform) para obtener legalmente los posts.

El script `backend.py` obtiene los usuarios a consultar de `users.json` y guarda los posts en `media.json`.

- `backend.py`, script encargado de actualizar las publicaciones.
- `src/lib/assets/users.json`, lista de usuarios que subir.
- `src/lib/assets/media.json`, lista de posts obtenidos mediante `backend.py`.

El frontend está hecho con [Svelte 5 y SvelteKit 2](https://svelte.dev/).

- `src/routes/`, construcción de las rutas.
- `src/lib/components/`, componentes usados.

Para automatizar la construcción y publicación de la página ocupamos [GitHub Actions](https://docs.github.com/en/actions) para minimizar costos a prácticamente 0, al solo ser una página estática y servirse en [GitHub Pages](https://docs.github.com/en/pages).

- `.github/workflow/backend.yml`, configuración de GitHub Actions para actualizar automáticamente `media.json`.
- `.github/workflow/deploy.yml`, configuración de GitHub Actions para construir y publicar automáticamente la página al subir un commit a la rama `pages`.

## Preguntas Frecuentes

**¿Cómo obtienen los posts de Instagram?**

Mediante la [API oficial](https://developers.facebook.com/products/instagram/apis/) de Instagram, que solo permite acceder a cuentas marcadas como profesionales.

**¿Las imágenes de los posts son descargadas y guardadas?**

No, para imágenes y videos ocupamos los enlaces temporales de la [API](https://developers.facebook.com/products/instagram/apis/), que duran alrededor de 4 días.

**¿Qué pasa si elimino un post de mi cuenta de Instagram?**

El post será eliminado automáticamente de SansaNews con la siguiente recarga de la página. Si es muy urgente, contactanos mediante nuestro Instagram [@sansanews](https://www.instagram.com/sansanews/) para solucionarlo.

**¿Cómo puedo añadir/eliminar mi página de SansaNews?**

Contactanos mediante nuestro Instagram [@sansanews](https://www.instagram.com/sansanews/).

**¿Por qué actualizan cada hora y no en tiempo real?**

La [API](https://developers.facebook.com/products/instagram/apis/) de Instagram posee un límite de 200 peticiones por hora. Esperamos una hora para no superar este límite.

**¿Por qué no se actualiza exactamente cada hora?**

La actualización depende de la disponibilidad de [Github Actions](https://docs.github.com/en/actions), que es lo que usamos para automatizar la actualización. Este no asegura que se actualice con exactitud, solo que en algún momento se hará. Las variaciones pueden llegar a ser de una hora.

## Agradecimientos

Agradecemos a los contribuidores originales de _SansaNews_: [GlemTheGemini](https://github.com/GlemTheGemini), [RodrigoaldelPlanetaGol](https://github.com/RodrigoalDelPlanetaGol) y [juanjo000](https://github.com/juanjo000).
