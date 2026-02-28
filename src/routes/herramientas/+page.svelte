<script lang="ts">
  import Tools from "$lib/components/Tools.svelte";
</script>

<main class="px-10 md:px-16">
  <section>
    <h1>Herramientas de la Comunidad</h1>
    <section>
      <p>
        La creatividad sansana no siempre viene en forma de
        iniciativa estudiantil, a veces un proyecto pensado para un
        ramo, un proyecto personal o simplemente algo hecho por
        diversión con amigos puede resultar en algo de increible valor para la comunidad.
      </p>
      <p>
        En esta sección queremos destacar aquellos proyectos, para que más
        personas puedan conocerlos y beneficiarse de ellos.
      </p>
    </section>
  </section>
  
  <Tools />

  <section>
    <h2>¿Tienes un proyecto que quieras compartir?</h2>
    <p>
      ¡Contáctanos por Instagram en <a href="https://www.instagram.com/sansanews/">@sansanews</a>!
      Si es relevante para la comunidad sansana,
      lo agregaremos en esta sección.
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
    color: var(--color-primary);
    text-decoration: underline;
  }
</style>