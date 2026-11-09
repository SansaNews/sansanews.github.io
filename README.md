<p align="center">
  <img src="static/brand/sansanews_logo.svg" alt="Logo de SansaNews" width="160">
</p>

# SansaNews

Sitio web: <https://sansanews.github.io>

## Descripción del proyecto

_SansaNews_ es una iniciativa estudiantil que busca centralizar las noticias de la USM en un mismo lugar para facilitar su divulgación en la comunidad sansana. Para eso, reúne en una sola página las publicaciones recientes de Instagram de las iniciativas y cuentas de la universidad.

## Para quién es este proyecto

Este proyecto es para estudiantes y miembros de la comunidad sansana que quieren informarse sobre las noticias de la USM sin visitar cada cuenta de Instagram. También es para desarrolladores que quieren mejorar el sitio.

## Dependencias del proyecto

Antes de usar _SansaNews_, instala las siguientes herramientas.

- [Git](https://git-scm.com/), para clonar el repositorio.
- [just](https://github.com/casey/just), para ejecutar los comandos del proyecto.
- [Bun](https://bun.sh/), para ejecutar los scripts y el servidor de desarrollo.

Además, necesitas un _token_ de acceso de la API de Instagram para obtener las publicaciones. El apartado [Configurar SansaNews](#configurar-sansanews) explica cómo conseguirlo.

## Instrucciones para usar SansaNews

Para empezar, clona el repositorio e instala las dependencias.

### Instalar SansaNews

1. Clona el repositorio con estos comandos.

   ```sh
   git clone https://github.com/SansaNews/sansanews.github.io.git
   cd sansanews.github.io
   ```

2. Instala las dependencias con este comando.

   ```sh
   just init
   ```

### Configurar SansaNews

Todos los comandos de `just` requieren que el archivo `.env` exista, por lo que debes crearlo antes de ejecutarlos.

1. Obtén un _token_ de acceso. Para eso, ve a [Meta for Developers](https://developers.facebook.com/) y busca «Instagram API with Facebook Login».
2. Crea un archivo `.env` en la raíz del proyecto.
3. Escribe tu _token_ en el archivo, con este formato.

   ```env
   ACCESS_TOKEN=tu_token_de_acceso
   ```

### Ejecutar SansaNews

Los archivos `media.json`, `static/pfp/` y `static/posts/` no están en el repositorio, por lo que debes ejecutar `just update` antes de `just dev` o `just build`.

1. Obtén las publicaciones de las cuentas de `src/lib/assets/users.json`.

   ```sh
   just update
   ```

2. Inicia el servidor de desarrollo.

   ```sh
   just dev
   ```

3. Opcional: construye el sitio y abre una vista previa.

   ```sh
   just build
   ```

### Comandos disponibles

Para ver todos los comandos, ejecuta `just --list`.

```sh
just dev            # Inicia el entorno de desarrollo (requiere haber ejecutado `just update`)
just check username # Chequea si el usuario es accesible mediante la API
just get username   # Obtiene las últimas publicaciones del usuario (flags: --sanitize, --since <dias>, --max <cantidad>)
just rate-limit     # Muestra el uso actual del límite de peticiones de la API
just update         # Obtiene las últimas publicaciones de los usuarios de `src/lib/assets/users.json`
just lint           # Ejecuta svelte-check y biome check
just build          # Construye el proyecto y abre una vista previa
```

### Solucionar problemas de SansaNews

La tabla lista los problemas más comunes y su solución.

| Problema                                                  | Solución                                                                            |
| --------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| Todos los comandos de `just` fallan                       | Crea el archivo `.env` en la raíz del proyecto.                                     |
| `just dev` o `just build` fallan al importar `media.json` | Ejecuta `just update` para crear el archivo.                                        |
| Una cuenta no aparece en el sitio                         | Ejecuta `just check username`. La API solo permite acceder a cuentas profesionales. |
| Quieres saber cuántas peticiones quedan                   | Ejecuta `just rate-limit`. La API permite 200 peticiones por hora.                  |

## Preguntas frecuentes

**¿Por qué no muestran toda la información de la publicación?**

_SansaNews_ no reemplaza a las cuentas oficiales de las iniciativas, ya que solo busca facilitar que la comunidad sansana se informe sobre las noticias. Por esta razón muestra la primera imagen o video y la descripción.

**¿Por qué solo muestran las publicaciones del último mes?**

La idea es difundir las noticias más recientes de la universidad y no ser un archivo de publicaciones. Para ver publicaciones más antiguas, visita las cuentas oficiales de las iniciativas.

**¿Cómo puedo añadir o eliminar mi página de _SansaNews_?**

Contáctanos mediante nuestro Instagram [@sansanews](https://www.instagram.com/sansanews/).

**¿Qué pasa si elimino una publicación de mi cuenta de Instagram?**

_SansaNews_ elimina la publicación automáticamente en la siguiente recarga de la página. Si es muy urgente, contáctanos mediante nuestro Instagram [@sansanews](https://www.instagram.com/sansanews/).

**¿Cómo obtienen las publicaciones de Instagram?**

Mediante la [API oficial](https://developers.facebook.com/products/instagram/apis/) de Instagram, que solo permite acceder a cuentas marcadas como profesionales.

**¿Se descargan y se guardan las imágenes de las publicaciones?**

Sí, _SansaNews_ las descarga y las optimiza para que la página cargue más rápido, especialmente en conexiones lentas como las de la universidad.

Cada actualización borra y vuelve a descargar estos archivos. Los archivos viven solo en el servidor de la página y no en el repositorio, por lo que no queda historial de ellos.

**¿Por qué actualizan cada hora y no en tiempo real?**

La API de Instagram tiene un límite de 200 peticiones por hora, por lo que _SansaNews_ espera una hora entre actualizaciones.

**¿Por qué no se actualiza exactamente cada hora?**

La actualización depende de la disponibilidad de [GitHub Actions](https://docs.github.com/en/actions). Este servicio asegura que la ejecución ocurrirá en algún momento, pero no asegura puntualidad. Las variaciones pueden llegar a una hora.

## Guía de contribución

Para contribuir al proyecto, lee la [guía de contribución](CONTRIBUTING.md).

## Documentación adicional

- [`AGENTS.md`](AGENTS.md): contexto del proyecto para agentes de código, en inglés.
- [`DESIGN.md`](DESIGN.md): reglas de diseño del _frontend_.

### Estructura del proyecto

El _backend_ usa [TypeScript](https://www.typescriptlang.org/) sobre Bun y la [API oficial de Instagram](https://developers.facebook.com/docs/instagram-platform), ya que esta API permite obtener las publicaciones de forma legal. El _frontend_ usa [Svelte 5 y SvelteKit 3](https://svelte.dev/). La página es estática y se sirve en [GitHub Pages](https://docs.github.com/en/pages), por lo que el costo es prácticamente cero.

- `justfile`: comandos del proyecto.
- `backend/main.ts`: actualiza las publicaciones. Lee `users.json`, guarda las publicaciones en `media.json` y descarga las imágenes en `static/pfp/` y `static/posts/`.
- `backend/instagram-fetch.ts`: hace la petición a la API de Instagram.
- `backend/logging.ts`: muestra registros de ejecución.
- `backend/test.ts`: prueba publicaciones con los comandos `check`, `get` y `rate-limit`.
- `src/lib/assets/users.json`: lista de usuarios que se muestran.
- `src/lib/assets/media.json`: lista de publicaciones que obtiene `main.ts`.
- `src/routes/`: rutas del sitio.
- `src/lib/components/`: componentes del sitio.
- `.github/workflows/deploy.yml`: obtiene las publicaciones, construye y publica la página cada hora, al subir un _commit_ a la rama `pages` o de forma manual.

## Cómo obtener ayuda

- Para dudas sobre el sitio, o para añadir o eliminar una cuenta, escribe a [@sansanews](https://www.instagram.com/sansanews/) en Instagram.
- Para reportar un error o proponer una mejora, abre un [_issue_ en GitHub](https://github.com/SansaNews/sansanews.github.io/issues).

## Términos de uso

_SansaNews_ se publica bajo la licencia MIT. El archivo [`LICENSE`](LICENSE) contiene el texto completo.

## Agradecimientos

Agradecemos a los contribuidores originales de _SansaNews_: [GlemTheGemini](https://github.com/GlemTheGemini), [RodrigoaldelPlanetaGol](https://github.com/RodrigoalDelPlanetaGol) y [juanjo000](https://github.com/juanjo000).

---

© 2022 SansaNews. Todos los derechos reservados.
