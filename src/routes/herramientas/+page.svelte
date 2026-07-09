<script lang="ts">
import LogoBanner from "$lib/components/LogoBanner.svelte";

import Tools from "$lib/components/Tools.svelte";
</script>

<main class="prose-page px-10 lg:px-16">
  <div class="mx-auto flex max-w-lg justify-center lg:hidden">
    <LogoBanner class="w-auto" width={1823} height={377} />
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
