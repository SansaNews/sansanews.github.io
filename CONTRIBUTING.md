# Guía de contribución de SansaNews

## Bienvenida

Te damos la bienvenida a la guía de contribución de _SansaNews_ y te agradecemos tu interés.

Aceptamos estas contribuciones:

- Corrección de errores y mejoras del sitio
  - [Configurar el entorno](#configurar-el-entorno)
  - [Buenas prácticas](#buenas-prácticas)
  - [Flujo de contribución](#flujo-de-contribución)
- Mejoras a la documentación
  - [Formatos de texto](#formatos-de-texto)
  - [Flujo de contribución](#flujo-de-contribución)
- Reportes de errores e ideas
  - [Reportar errores](#reportar-errores)
  - [Compartir ideas](#compartir-ideas)

## Resumen del proyecto

_SansaNews_ reúne en una sola página las publicaciones recientes de Instagram de las cuentas de la USM. El [README](README.md) explica el proyecto en detalle.

## Compartir ideas

Para proponer una idea, sigue estos pasos.

1. Busca en los [_issues_](https://github.com/SansaNews/sansanews.github.io/issues) si alguien ya la propuso.
2. Si nadie la propuso, abre un _issue_ nuevo.
3. Describe el problema que resuelve tu idea y cómo la imaginas.

Para añadir o eliminar una cuenta, escribe a [@sansanews](https://www.instagram.com/sansanews/) en Instagram.

## Antes de empezar

Antes de contribuir, ten lo siguiente.

- Una cuenta de GitHub.
- [Git](https://git-scm.com/), [just](https://github.com/casey/just) y [Bun](https://bun.sh/) instalados.
- Opcional: un _token_ de acceso de la API de Instagram, necesario solo para ejecutar `just update`.

## Configurar el entorno

Para configurar el entorno, sigue estos pasos.

1. Haz un _fork_ del repositorio y clónalo. La sección [Hacer fork y clonar](#hacer-fork-y-clonar) explica cómo.
2. Instala las dependencias con `just init`.
3. Si tienes un _token_, crea el archivo `.env` y ejecuta `just update`. La sección [Configurar SansaNews](README.md#configurar-sansanews) del README explica cómo.
4. Si no tienes un _token_, crea un archivo `src/lib/assets/media.json` de prueba. Para eso, copia el comando del paso `Create fake media.json` de `.github/workflows/ci.yml`, que el CI usa para ejecutar `svelte-check` sin publicaciones reales.
5. Inicia el servidor de desarrollo con `just dev`. Los comandos de `just` exigen el archivo `.env`, por lo que, si no tienes uno, usa `bun run dev`.

### Solucionar problemas

Si tienes problemas al configurar el entorno, lee la sección [Solucionar problemas de SansaNews](README.md#solucionar-problemas-de-sansanews) del README.

## Buenas prácticas

El proyecto adopta estas prácticas.

- Formatea el código con Biome, que usa tabulaciones y comillas dobles. La configuración está en `.biome.json`.
- Ordena las clases de Tailwind con `bun x biome check --write --unsafe`.
- Usa los _tokens_ de color de [`DESIGN.md`](DESIGN.md) en lugar de clases como `bg-white` o `gray-*`.
- Evita editar a mano los componentes de `src/lib/components/ui/` sin una razón, ya que son componentes de shadcn-svelte.
- Ejecuta `just lint` antes de abrir un _pull request_, porque el CI ejecuta las mismas comprobaciones.

## Idioma

El proyecto usa dos idiomas.

- Inglés: todo el código, incluidos los mensajes de _commit_ y los nombres de las ramas.
- Español: la documentación y el contenido de la página.

## Uso de agentes de IA

Puedes usar agentes de IA para hacer contribuciones, siempre que lo divulgues. Para eso, escribe en la descripción del _pull request_ una línea que nombre la herramienta y diga para qué la usaste.

## Flujo de contribución

### Hacer fork y clonar

1. Haz un _fork_ de [`SansaNews/sansanews.github.io`](https://github.com/SansaNews/sansanews.github.io) en GitHub.
2. Clona tu _fork_ con este comando.

   ```sh
   git clone git@github.com:<tu-usuario>/sansanews.github.io.git
   ```

### Reportar errores

Para reportar un error, abre un [_issue_](https://github.com/SansaNews/sansanews.github.io/issues) con esta información.

- Qué esperabas que pasara.
- Qué pasó en realidad.
- Los pasos para reproducir el error.
- El navegador y el dispositivo, si el error es visual.

### Mensajes de commit

El proyecto exige [Conventional Commits](https://www.conventionalcommits.org/) en inglés, con el formato `tipo(ámbito): descripción`. El ámbito es opcional.

```text
fix(backend): match the full host in the image host allowlist
docs: describe the Biome setup and the CI workflow in AGENTS.md
```

Los tipos permitidos son `feat`, `fix`, `docs`, `style`, `refactor`, `build`, `ci` y `chore`.

### Crear ramas

Crea tu rama desde `main`, ya que el desarrollo ocurre en esa rama. Nómbrala en inglés con el formato `tipo/short-description`, por ejemplo `fix/category-filter`, con los mismos tipos que usan los mensajes de _commit_. No hagas _push_ a la rama `pages`, porque esa rama publica el sitio y solo los mantenedores la usan.

### Pull requests

Para enviar un _pull request_, sigue estos pasos.

1. Haz _push_ de tu rama a tu _fork_.
2. Abre un _pull request_ hacia `main`.
3. Describe qué cambia y por qué.
4. Espera a que pasen las comprobaciones del CI, que ejecutan `biome ci` y `svelte-check`.

### Publicación de cambios

Los mantenedores publican los cambios con un _push_ a la rama `pages`. Además, el sitio se reconstruye cada hora para incluir las publicaciones nuevas de Instagram.

### Formatos de texto

La documentación está en Markdown. `AGENTS.md` es la única excepción a la regla de idioma y está en inglés, ya que lo leen agentes de código.
