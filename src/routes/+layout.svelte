<script lang="ts">
  import "../app.css";
  import * as Card from "$lib/components/ui/card/index.js";
  import MobileMenu from "$lib/components/MobileMenu.svelte";
  import Navbar from "$lib/components/Navbar.svelte";
  import favicon from "$lib/assets/favicon.svg";
  import logo from "$lib/assets/logo-sn.png";
  import { resolve } from "$app/paths";

  const navItems = [
    { label: "Iniciativas", href: resolve("/iniciativas") },
    { label: "Avisos", href: resolve("/avisos") },
    { label: "¿Qué es una iniciativa?", href: resolve("/que-es") },
    { label: "Sobre Nosotros", href: resolve("/nosotros") },
  ];

  let { children } = $props();
</script>

<svelte:head>
  <meta charset="UTF-8" />
  <title>SansaNews</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta
    name="description"
    content="SansaNews es un medio de comunicación automatizado que visibiliza las iniciativas estudiantiles de la USM"
  />
  <link rel="icon" href={favicon} />
</svelte:head>

<div class="md:px-16">
  <header>
    <div class="px-4 py-8">
      <!-- Logo -->
      <div class="mb-6">
        <a href={resolve("/")}>
          <img
            src={logo}
            class="mx-auto w-full max-w-lg"
            alt="SansaNews Logo"
          />
        </a>
      </div>

      <Navbar {navItems} />
      <MobileMenu {navItems} />
    </div>
  </header>

  <!-- Banner -->
  <div class="px-4">
    <Card.Root class="gap-0 border-0 py-0">
      <Card.Header class="bg-foreground text-background rounded-t-lg py-2">
        <Card.Title
          class="text-center text-sm font-bold tracking-widest uppercase"
        >
          <p>alpha-1.0.1</p>
        </Card.Title>
      </Card.Header>
      <Card.Content class="p-4 text-center">
        <h2 class="mb-2 font-[--font-heading] text-xl font-bold md:text-2xl">
          WORK IN PROGRESS
        </h2>
        <p class="text-muted-foreground text-xs tracking-wide sm:text-sm">
          SansaNews se encuentra en la fase inicial de desarrollo, pronto se
          implementaran secciones nuevas y mejoras en la interfaz.
        </p>
        <p class="text-muted-foreground text-xs tracking-wide sm:text-sm">
          ¡Gracias por ser parte de este proceso!
        </p>
      </Card.Content>
    </Card.Root>
  </div>

  {@render children()}

  <footer
    class="text-muted-foreground border-t-3 border-double p-6 text-center text-sm font-medium"
  >
    <p class="px-4">
      SansaNews es un medio de comunicación automatizado que visibiliza las
      iniciativas estudiantiles de la USM
    </p>
  </footer>
</div>
