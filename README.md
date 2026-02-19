# SansaNews

SansaNews es una iniciativa estudiantil que busca centralizar las noticias y eventos de la UTFSM en un solo lugar, con el objetivo de facilitar su divulgación en la comunidad sansana.

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

Ocupamos la [API oficial](https://developers.facebook.com/products/instagram/apis/) de Instagram para obtener los posts legalmente. Esto significa que solo podemos acceder a los posts de cuentas que sean configuradas voluntariamente como profesionales, no podemos acceder a cuentas personales ni privadas ni públicas.

**¿Las imágenes de los posts son descargadas y guardadas?**

No, para imágenes y videos ocupamos los enlaces temporales que provee la [API oficial](https://developers.facebook.com/products/instagram/apis/) de Instagram, que duran aproximadamente 4 días. Nada es descargado en el proceso más que la información textual.

**¿Qué pasa si quiero eliminar un post de mi cuenta de Instagram?**

El post será eliminado de SansaNews con la siguiente recarga de la página automáticamente, que normalmente es cada hora. Si se trata de un caso especial un caso especial o urgente, contáctenos directamente mediante nuestra cuenta de Instagram  [@sansanews](https://www.instagram.com/sansanews/) para solucionarlo lo antes posible.

**¿Cómo puedo añadir/eliminar mi página de SansaNews?**

En cualquiera de los dos casos, contáctenos directamente mediante nuestra cuenta de Instagram [@sansanews](https://www.instagram.com/sansanews/) para resolverlo lo antes posible.

**¿Por qué actualizan cada hora y no en tiempo real?**

La [API oficial](https://developers.facebook.com/products/instagram/apis/) de Instagram posee un límite de 200 peticiones por hora, por lo que, para no colapsar la API, decidimos actualizar cada hora.
 La actualización también depende de la disponibilidad de [Github Actions](https://docs.github.com/en/actions), que es el servicio que usamos para automatizar el proceso de actualización, por lo que, los tiempos de actualización pueden variar, pero casi siempre serán aproximadamente cada hora.

## Historia

SansaNews surgió originalmente como un proyecto del ramo de `Introducción a la Ingeniería` de primer año en el 2022, desarrollado en un principio por [GlemTheGemini](https://github.com/GlemTheGemini), [RodrigoaldelPlanetaGol](https://github.com/RodrigoalDelPlanetaGol), [juanjo000](https://github.com/juanjo000), y [MoonTurtlee](https://github.com/MoonTurtlee).

La presentación del proyecto fue tan exitosa que muchos querían que se volviera una realidad. Para esto [@MoonTurtlee](https://github.com/MoonTurtlee) buscó a más gente para llevar el proyecto a cabo, entre ellos [LuckJMG](https://www.github.com/LuckJMG).

Inicialmente desarrollado puramente con [Django](https://www.djangoproject.com/), la segunda versión de SansaNews se intentó desarrollar en el verano de 2023.

Pero por falta de conocimiento, y poco tiempo debido a la universidad, no se pudo llevar a cabo, por lo que el proyecto quedó en stand-by indefinido.

La idea nunca murió, cada semestre escuchamos comentarios sobre cómo faltaba un espacio que centralizara toda la información y eventos de la U en un solo lugar, y solo podíamos pensar en SansaNews.

En verano de 2026, 4 años después de la idea original, en parte por ya tener el conocimiento al estar en último año de carrera y por la necesidad de hacer algo que mostrar, [LuckJMG](https://www.github.com/LuckJMG) y [MoonTurtlee](https://github.com/MoonTurtlee) decidieron revivir el proyecto y hacerlo realidad de una vez por todas. (Necesitaban salir primero Silksong y Hytale)

## Agradecimientos

Agradecemos a los contribuidores originales de SansaNews: [GlemTheGemini](https://github.com/GlemTheGemini), [RodrigoaldelPlanetaGol](https://github.com/RodrigoalDelPlanetaGol) y [juanjo000](https://github.com/juanjo000).

