<script lang="ts">
  import "../app.css";
  import * as Card from "$lib/components/ui/card/index.js";
  import SuperNav from "$lib/components/SuperNav.svelte";
  import Footer from "$lib/components/Footer.svelte";

  let { children } = $props();
</script>

<div class="grid grid-cols-12">
  <header class="col-span-12 pb-4 lg:col-span-8 lg:col-start-3">
    <div class="lg:px-4 lg:py-8">
      <SuperNav />
    </div>
  </header>

  <!-- Banner -->
  <div class="col-span-12 px-4 lg:col-span-8 lg:col-start-3">
    <Card.Root class="gap-0 border-0 py-0">
      <Card.Header class="bg-foreground text-background rounded-t-lg py-2">
        <Card.Title
          class="text-center text-sm font-bold tracking-widest uppercase"
        >
          <p>beta-1.0.0</p>
        </Card.Title>
      </Card.Header>
      <Card.Content class="p-4 text-center">
        <h2 class="mb-2 font-[--font-heading] text-xl font-bold lg:text-2xl">
          WORK IN PROGRESS
        </h2>
        <p class="text-muted-foreground text-xs tracking-wide sm:text-sm">
          SansaNews se encuentra en la fase inicial de desarrollo, pronto se
          implementarán secciones nuevas y mejoras en la interfaz.
        </p>
        <p class="text-muted-foreground text-xs tracking-wide sm:text-sm">
          ¡Gracias por ser parte de este proceso!
        </p>
      </Card.Content>
    </Card.Root>
  </div>

  <div class="col-span-12 lg:col-span-8 lg:col-start-3">
    {@render children()}
  </div>

  <Footer />
</div>

