<script lang="ts">
  import logo from "$lib/assets/square-logo.svg";
  import presentation from "$lib/assets/sansanews_presentation.jpg";
  import Reference from "$lib/components/Reference.svelte";
</script>

<main class="px-10 md:px-16">
  <section>
    <h1>Sobre Nosotros</h1>
    <div class="flex flex-col items-center gap-4 md:flex-row md:gap-12">
      <section>
        <p>
          <i>SansaNews</i> es una iniciativa estudiantil que busca centralizar las
          noticias de la USM en un mismo lugar para facilitar su divulgación en la
          comunidad sansana.
        </p>
        <p>
          La iniciativa es desarrollada por dos sansanos, <i
            >Joaquín Domínguez</i
          >
          y <i>Lucas Mosquera</i>. El proyecto es público, y se encuentra
          alojado en
          <a href="https://github.com/MoonTurtlee/SansaNews">GitHub</a>.
        </p>
        <p>
          El objetivo de la página es ayudar a difundir las diversas iniciativas
          y eventos que ocurren en nuestra universidad. <strong
            >Si quieres apoyar a las iniciativas, siguelas directamente, y
            participa en sus actividades.</strong
          >
        </p>
        <p>
          Cualquier comentario, queja, duda o sugerencia, nos puedes contactar
          por nuestra cuenta de Instagram <a
            href="https://www.instagram.com/sansanews/">@sansanews</a
          >.
        </p>
      </section>
      <div class="flex w-md max-w-xs flex-col items-center pt-4 pb-1">
        <img
          src={logo}
          alt="SansaNews Logo"
          class="mx-auto mb-2 w-48 rounded-lg"
        />
        <Reference
          name="Joaquín Domínguez"
          github="https://github.com/MoonTurtlee"
        />
        <Reference name="Lucas Mosquera" github="https://github.com/LuckJMG" />
      </div>
    </div>
  </section>
  <section>
    <h2 id="preguntas-frecuentes">Preguntas Frecuentes</h2>
    <question>
      <p>
        <strong
          >¿Por qué no muestran toda la información de la publicación?</strong
        >
      </p>
      <p>
        No somos un reemplazo de las cuentas oficiales de las iniciativas, solo
        queremos que sea más fácil informarse sobre las noticias de la comunidad
        sansana. Por esta razón solo mostramos la primera imagen/video y la
        descripción de las publicaciones.
      </p>
    </question>
    <question>
      <p>
        <strong>¿Por qué solo muestran las publicaciones del último mes?</strong
        >
      </p>
      <p>
        La idea es difundir las noticias más recientes de la universidad, no ser
        un archivo de publicaciones. Si quieres ver posts más antiguos, buscalos
        en a las cuentas oficiales de las iniciativas.
      </p>
    </question>
    <question>
      <p>
        <strong>¿Cómo puedo añadir/eliminar mi página de SansaNews?</strong>
      </p>
      <p>
        Contactanos mediante nuestro Instagram <a
          href="https://www.instagram.com/sansanews/">@sansanews</a
        >.
      </p>
    </question>
    <question>
      <p>
        <strong>¿Qué pasa si elimino un post de mi cuenta de Instagram?</strong>
      </p>
      <p>
        El post será eliminado automáticamente de SansaNews con la siguiente
        recarga de la página. Si es muy urgente, contactanos mediante nuestro
        Instagram <a href="https://www.instagram.com/sansanews/">@sansanews</a> para
        solucionarlo.
      </p>
    </question>
    <question>
      <p><strong>¿Cómo obtienen los posts de Instagram?</strong></p>
      <p>
        Mediante la <a
          href="https://developers.facebook.com/products/instagram/apis/"
          >API oficial</a
        > de Instagram, que solo permite acceder a cuentas marcadas como profesionales.
      </p>
    </question>
    <question>
      <p>
        <strong>¿Las imágenes de los posts son descargadas y guardadas?</strong>
      </p>
      <p>
        No, para imágenes y videos ocupamos los enlaces temporales de la <a
          href="https://developers.facebook.com/products/instagram/apis/">API</a
        >, que duran alrededor de 4 días.
      </p>
    </question>
    <question>
      <p>
        <strong>¿Por qué actualizan cada hora y no en tiempo real?</strong>
      </p>
      <p>
        La <a href="https://developers.facebook.com/products/instagram/apis/"
          >API</a
        >
        de Instagram posee un límite de 200 peticiones por hora. Esperamos una hora
        superar este límite.
      </p>
    </question>
    <question>
      <p>
        <strong>¿Por qué no se actualiza exactamente cada hora?</strong>
      </p>
      <p>
        La actualización depende de la disponibilidad de
        <a href="https://docs.github.com/en/actions">Github Actions</a>, que es
        lo que usamos para automatizar la actualización. Este no asegura
        puntualidad, solo que en algún momento se hará. Las variaciones pueden
        llegar a ser de una hora.
      </p>
    </question>
  </section>
  <section>
    <h2 id="historia">Historia</h2>
    <div class="flex flex-col items-center gap-4 md:flex-row md:gap-12">
      <section>
        <p>
          <i>SansaNews</i> surgió como un proyecto del ramo de
          <i>Introducción a la Ingeniería</i>
          de primer año en el 2022, desarrollado en un principio por
          <a href="https://github.com/GlemTheGemini">GlemTheGemini</a>,
          <a href="https://github.com/RodrigoalDelPlanetaGol"
            >RodrigoaldelPlanetaGol</a
          >, <a href="https://github.com/juanjo000">juanjo000</a>, y
          <i>Joaquín Domínguez</i> usando
          <a href="https://www.djangoproject.com/">Django</a>.
        </p>
        <p>
          La presentación del proyecto fue tan exitosa que muchos querían que se
          volviera una realidad. Para esto <i>Joaquín Domínguez</i> buscó a más
          personas para hacer el proyecto, entre ellos
          <i>Lucas Mosquera</i>.
        </p>
        <p>
          La segunda versión de <i>SansaNews</i> se intentó hacer en el verano de
          2023. Pero por falta de tiempo y conocimiento no se pudo finalizar, quedando
          el proyecto en stand-by.
        </p>
      </section>
      <img
        src={presentation}
        alt="Presentación original de SansaNews en Introducción a la Ingeniería"
        class="mx-auto my-4 w-full max-w-xs rounded-lg"
      />
    </div>
    <p>
      La idea nunca murió, cada semestre escuchamos comentarios sobre cómo
      faltaba un espacio centralizado para divulgar las noticias de la
      universidad, y solo podíamos pensar en SansaNews.
    </p>
    <p>
      En verano de 2026, 4 años después de la versión original, en parte por ya
      tener el conocimiento y en parte por la necesidad terminar lo que se
      empezó, y
      <i>Joaquín Domínguez</i> y <i>Lucas Mosquera</i> decidieron revivir el proyecto
      y finalmente publicarlo. (Necesitaban salir primero Silksong y Hytale)
    </p>
  </section>
  <section>
    <h2 id="agradecimientos">Agradecimientos</h2>
    <p>
      Agradecemos a los contribuidores originales de <i>SansaNews</i>:
      <a href="https://github.com/GlemTheGemini">GlemTheGemini</a>,
      <a href="https://github.com/RodrigoalDelPlanetaGol"
        >RodrigoaldelPlanetaGol</a
      >
      y <a href="https://github.com/juanjo000">juanjo000</a>.
    </p>
  </section>
</main>

<style>
  main {
    padding-block: 2rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  question {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  h1 {
    font-family: var(--font-heading);
    font-size: 2rem;
    font-weight: bold;
  }

  h2 {
    font-family: var(--font-heading);
    font-size: 1.5rem;
    font-weight: bold;
  }

  p {
    text-align: justify;
  }

  a {
    color: var(--primary);
    text-decoration: underline;
  }
</style>
