<script lang="ts">
import guidesJSON from "$lib/assets/guides.json";
import GuideCard from "$lib/components/GuideCard.svelte";
import LogoBanner from "$lib/components/LogoBanner.svelte";
import type { Guide } from "$lib/guides";

const guides: Guide[] = guidesJSON.guides;
</script>

<main class="prose-page px-10 lg:px-16">
  <div class="mx-auto flex max-w-lg justify-center lg:hidden">
    <LogoBanner class="w-auto" width={1823} height={377} />
  </div>

  <section>
    <h1>Guías</h1>
    <p>
      En esta sección encontrarás guías con información útil sobre la universidad y sus servicios.
    </p>
  </section>

  <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
    {#each guides as guide (guide.slug)}
      <GuideCard {guide} />
    {/each}
  </div>
</main>
