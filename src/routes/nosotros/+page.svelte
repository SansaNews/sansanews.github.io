<script lang="ts">
  import logo from "$lib/assets/square-logo.svg";
  import presentation from "$lib/assets/sansanews_presentation.jpg";
</script>

<main>
  <section>
    <h1>Sobre Nosotros</h1>
    <div class="flex items-center gap-12">
      <section>
        <p>
          SansaNews es una iniciativa estudiantil que busca centralizar las
          noticias y eventos de la UTFSM en un solo lugar, con el objetivo de
          facilitar su divulgación en la comunidad sansana.
        </p>
        <p>
          La iniciativa es mantenida solo por 2 estudiantes de la USM, <a
            href="https://github.com/MoonTurtlee">MoonTurtlee</a
          >
          y <a href="https://github.com/LuckJMG">LuckJMG</a>. El proyecto es
          Open Source, lo que significa que puedes ver directamente el código de
          la página para ver cómo funciona, se encuentra alojado públicamente en
          <a href="https://github.com/MoonTurtlee/SansaNews">GitHub</a>.
        </p>
      </section>
      <img src={logo} alt="SansaNews Logo" class="mx-auto w-48 rounded-lg" />
    </div>
    <p>
      La idea no es apropiarnos de las publicaciones, sino ayudar a promocionar
      las diversas iniciativas y eventos que ocurren en nuestra universidad.
      Recordamos encarecidamente que si quieres apoyar a las iniciativas las
      sigas directamente.
    </p>
    <p>
      Por esta razón, todos los posts y perfiles redireccionan directamente a
      los posts y cuentas originales en Instagram. Y no mostramos historias,
      likes, ni comentarios en la página, si quieres verlos tienes que ir a la
      fuente original.
    </p>
    <p>
      Por cualquier comentario, queja, duda o sugerencia, nos puedes contactar
      mediante nuestra cuenta de Instagram <a
        href="https://www.instagram.com/sansanews/">@sansanews</a
      >, y responderemos lo antes posible.
    </p>
  </section>
  <section>
    <h2 id="preguntas-frecuentes">Preguntas Frecuentes</h2>
    <question>
      <p><strong>¿Cómo obtienen los posts de Instagram?</strong></p>
      <p>
        Ocupamos la <a
          href="https://developers.facebook.com/products/instagram/apis/"
          >API oficial</a
        > de Instagram para obtener los posts legalmente. Esto significa que solo
        podemos acceder a los posts de cuentas que sean configuradas voluntariamente
        como profesionales, no podemos acceder a cuentas personales ni privadas ni
        públicas.
      </p>
    </question>
    <question>
      <p>
        <strong>¿Las imágenes de los posts son descargadas y guardadas?</strong>
      </p>
      <p>
        No, para imágenes y videos ocupamos los enlaces temporales que provee la <a
          href="https://developers.facebook.com/products/instagram/apis/"
          >API oficial</a
        > de Instagram, que duran aproximadamente 4 días. Nada es descargado en el
        proceso más que la información textual.
      </p>
    </question>
    <question>
      <p>
        <strong
          >¿Qué pasa si quiero eliminar un post de mi cuenta de Instagram?</strong
        >
      </p>
      <p>
        Al recargarse la página cada hora, el post a lo más durará una hora
        extra en SansaNews. Si se trata de un caso especial un caso especial o
        urgente, contáctenos directamente mediante nuestra cuenta de Instagram <a
          href="https://www.instagram.com/sansanews/">@sansanews</a
        > para solucionarlo lo antes posible.
      </p>
    </question>
    <question>
      <p>
        <strong>¿Cómo puedo añadir/eliminar mi página de SansaNews?</strong>
      </p>
      <p>
        En cualquiera de los dos casos, contáctenos directamente mediante
        nuestra cuenta de Instagram <a
          href="https://www.instagram.com/sansanews/">@sansanews</a
        > para resolverlo lo antes posible.
      </p>
    </question>
    <question>
      <p>
        <strong>¿Por qué actualizan cada 1 hora y no en tiempo real?</strong>
      </p>
      <p>
        La <a href="https://developers.facebook.com/products/instagram/apis/"
          >API oficial</a
        > de Instagram posee un límite de 200 peticiones por hora, por lo que, para
        no colapsar la API, decidimos actualizar cada hora.
      </p>
    </question>
  </section>
  <section>
    <h2 id="historia">Historia</h2>
    <div class="flex items-center gap-12">
      <section>
        <p>
          SansaNews surgió originalmente como un proyecto del ramo de <code
            >Introducción a la Ingeniería</code
          >
          de primer año en el 2022, desarrollado en un principio por
          <a href="https://github.com/GlemTheGemini">GlemTheGemini</a>,
          <a href="https://github.com/RodrigoalDelPlanetaGol"
            >RodrigoaldelPlanetaGol</a
          >, <a href="https://github.com/juanjo000">juanjo000</a>, y
          <a href="https://github.com/MoonTurtlee">MoonTurtlee</a>.
        </p>
        <p>
          La presentación del proyecto fue tan exitosa que muchos querían que se
          volviera una realidad. Para esto <a
            href="https://github.com/MoonTurtlee">MoonTurtlee</a
          >
          buscó a más gente para llevar el proyecto a cabo, entre ellos
          <a href="https://www.github.com/LuckJMG">LuckJMG</a>.
        </p>
      </section>
      <img
        src={presentation}
        alt="Presentación original de SansaNews en Introducción a la Ingeniería"
        class="mx-auto w-full max-w-xs rounded-lg"
      />
    </div>
    <p>
      Inicialmente desarrollado puramente con <a
        href="https://www.djangoproject.com/">Django</a
      >, la segunda versión de SansaNews se intentó desarrollar en el verano de
      2023.
    </p>
    <p>
      Pero por falta de conocimiento, y poco tiempo debido a la universidad, no
      se pudo llevar a cabo, por lo que el proyecto quedó en stand-by
      indefinido.
    </p>
    <p>
      La idea nunca murió, cada semestre escuchamos comentarios sobre cómo
      faltaba un espacio que centralizara toda la información y eventos de la U
      en un solo lugar, y solo podíamos pensar en SansaNews.
    </p>
    <p>
      En verano de 2026, 4 años después de la idea original, en parte por ya
      tener el conocimiento al estar en último año de carrera y por la necesidad
      de hacer algo que mostrar, <a href="https://www.github.com/LuckJMG"
        >LuckJMG</a
      >
      y
      <a href="https://github.com/MoonTurtlee">MoonTurtlee</a> decidieron revivir
      el proyecto y hacerlo realidad de una vez por todas. (Necesitaban salir primero
      Silksong y Hytale)
    </p>
  </section>
  <section>
    <h2 id="agradecimientos">Agradecimientos</h2>
    <p>
      Agradecemos a los contribuidores originales de SansaNews: <a
        href="https://github.com/GlemTheGemini">GlemTheGemini</a
      >,
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
    padding-inline: 4rem;
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
