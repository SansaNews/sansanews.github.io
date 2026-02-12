# SansaNews

Iniciativa estudiantil con el objetivo de centralizar las distintas publicaciones de Instagram relacionadas con la vida universitaria. La idea no es adueñarnos de las publicaciones, sino promocionar las diversas iniciativas y eventos que ocurren en la universidad.

> Si quieres que tu iniciativa sea añadida o eliminada de SansaNews, contáctanos en nuestra cuenta de instagram [@SansaNews](https://www.instagram.com/sansanews/).

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

## Consideraciones

### Limitación de Peticiones

La [API de Instagram](https://developers.facebook.com/docs/instagram-platform) tiene una limitación de 500 peticiones por hora. Se debe tener en cuenta que por cada usuario se necesita una petición para obtener sus posts.

### Cuentas Profesionales

Solo se puede acceder a cuentas que estén configuradas como [Professional Accounts](https://www.facebook.com/business/help/502981923235522), lo que es activado voluntariamente y puede ser desactivado en cualquier momento.

Las cuentas que originalmente fueran profesionales, estuvieron en SansaNews, pero posteriormente dejaron de ser profesionales, en a más tardar 1 hora todos sus posts serán borrados.

### Links Temporales

Los links directos de las imagenes (no los links a los posts) son temporales y duran aproximadamente 4 días. Por eso necesitamos de actualización constante de `media.json`, en nuestro caso se actualiza cada 1 hora.

Esto hace que cualquier post que sea borrado en Instagram y que se haya súbido previamente a SansaNews, será borrado en a más tardar 1 hora.

De todas formas las imagenes y videos **NUNCA** son descargados y guardados localmente, solo se acceden mediante los links temporales proveídos por la API de instagram.

## Historia

SansaNews surgió originalmente como un proyecto del ramo de `Introducción a la Ingeniería` de primer año en el 2022, desarrollado originalmente por [GlemTheGemini](https://github.com/GlemTheGemini), [RodrigoaldelPlanetaGol](https://github.com/RodrigoalDelPlanetaGol), [juanjo000](https://github.com/juanjo000), y [MoonTurtlee](https://github.com/MoonTurtlee).

La presentación del proyecto fue tan exitosa que muchos querían que se volviera una realidad. Para esto MoonTurtlee buscó a más gente para llevar el proyecto a cabo, entre ellos [LuckJMG](https://www.github.com/LuckJMG).

Inicialmente desarrollado puramente con [Django](https://www.djangoproject.com/), la segunda versión de SansaNews se intentó desarrollar en el verano de 2023.

Pero por falta de conocimiento, y poco tiempo debido a la universidad, no se pudo llevar a cabo, quedando el proyecto en stand-by indefinido.

La idea nunca murió, cada semestre escuchamos comentarios sobre como faltaba un lugar que centralizara toda la información y eventos de la U en un solo lugar, y solo podíamos pensar en SansaNews.

En verano de 2026, 4 años después de la idea original, en parte por ya tener el conocimiento al estar en último año de carrera y por la necesidad de hacer algo que mostrar, [LuckJMG](https://www.github.com/LuckJMG) y [MoonTurtlee](https://github.com/MoonTurtlee) decidieron revivir el proyecto y hacerlo realidad de una vez por todas. (Necesitaba salir primero Silksong y Hytale)

## Agradecimientos

Agradecemos a los contribuidores originales de SansaNews: [GlemTheGemini](https://github.com/GlemTheGemini), [RodrigoaldelPlanetaGol](https://github.com/RodrigoalDelPlanetaGol) y [juanjo000](https://github.com/juanjo000).

