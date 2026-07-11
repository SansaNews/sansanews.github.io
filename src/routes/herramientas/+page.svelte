<script lang="ts">
import LogoBanner from "$lib/components/LogoBanner.svelte";

import Tools from "$lib/components/Tools.svelte";
</script>

<main class="prose-page px-10 lg:px-16">
  <div class="mx-auto flex max-w-lg justify-center lg:hidden">
    <LogoBanner class="w-auto" width={1823} height={377} />
  </div>

  <section>
    <h1>Herramientas y servicios a la comunidad</h1>
    <section>
      <p>
        La creatividad sansana tiene muchas formas. A veces, un trabajo pensado para un ramo, un desarrollo
        personal o simplemente algo hecho por diversión puede resultar en algo de increíble valor para la comunidad.
      </p>
      <p>
        En esta sección queremos destacar estas herramientas desarrolladas por sansanos para que más personas puedan 
        conocerlas y beneficiarse de ellas, así como también facilitar el acceso a los servicios más utilizados que ofrece la universidad.
      </p>
    </section>
  </section>

  <Tools />

  <section>
    <h2>¿Conoces alguna otra herramienta o servicio?</h2>
    <p>
      ¡Contáctanos por Instagram en <a
        href="https://www.instagram.com/sansanews/">@sansanews</a
      >! Si es relevante para la comunidad sansana, lo incluiremos en esta
      sección.
    </p>
  </section>
</main>
