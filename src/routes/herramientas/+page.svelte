<script lang="ts">
  import { resolve } from "$app/paths";
  import logo from "$lib/assets/extended-logo-black.png";

  import Tools from "$lib/components/Tools.svelte";
</script>

<main class="px-10 lg:px-16">
  <div class="mx-auto flex max-w-lg justify-center lg:hidden">
    <a href={resolve("/")}>
      <img
        src={logo}
        class="w-auto transition-all duration-300"
        alt="SansaNews Logo"
      />
    </a>
  </div>

  <section>
    <h1>Herramientas de la Comunidad</h1>
    <section>
      <p>
        La creatividad sansana no siempre viene en forma de iniciativa
        estudiantil. A veces, un trabajo pensado para un ramo, un desarrollo
        personal o simplemente algo hecho por diversión con amigos puede
        resultar en algo de increíble valor para la comunidad.
      </p>
      <p>
        En esta sección queremos destacar estas herramientas, para que más
        personas puedan conocerlas y beneficiarse de ellas.
      </p>
    </section>
  </section>

  <Tools />

  <section>
    <h2>¿Conoces alguna otra herramienta?</h2>
    <p>
      ¡Contáctanos por Instagram en <a
        href="https://www.instagram.com/sansanews/">@sansanews</a
      >! Si es relevante para la comunidad sansana, la agregaremos en esta
      sección.
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
