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
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>SansaNews</title>
  <link rel="icon" href={favicon} />
</svelte:head>

<div
  class="grid min-h-screen grid-rows-[auto_1fr_auto] relative bg-background text-foreground overflow-x-hidden"
>
  <header class="w-full bg-background z-50 relative">
    <div class="w-full max-w-7xl mx-auto px-4 py-8">
      <!-- Logo -->
      <div class="text-center mb-6">
        <a href={resolve("/")} class="inline-block w-full">
          <img
            src={logo}
            class="h-auto w-full max-w-120 mx-auto"
            alt="SansaNews Logo"
          />
        </a>
      </div>

      <Navbar {navItems} />
      <MobileMenu {navItems} />
    </div>
  </header>

  <!-- Banner -->
  <div class="w-full px-4 sm:px-0">
    <Card.Root class="max-w-7xl max-h-42 mx-auto gap-0 border-0 py-0">
      <Card.Header
        class="border-0 bg-foreground text-background px-4 py-2 rounded-t-lg"
      >
        <Card.Title
          class="text-center text-sm font-bold uppercase tracking-widest"
        >
          <p>alpha-1.0.1</p>
        </Card.Title>
      </Card.Header>
      <Card.Content class="p-4 text-center">
        <h2
          class="text-xl sm:text-2xl md:text-3xl font-bold font-[--font-heading] text-foreground mb-2"
        >
          WORK IN PROGRESS
        </h2>
        <p class="text-xs sm:text-sm text-muted-foreground tracking-wide">
          SansaNews se encuentra en la fase inicial de desarrollo, pronto se
          implementaran secciones nuevas y mejoras en la interfaz. ¡Gracias por
          ser parte de este proceso!
        </p>
      </Card.Content>
    </Card.Root>
  </div>

  {@render children()}

  <footer
    class="border-t-3 border-double p-6 text-center text-sm font-medium text-muted-foreground"
  >
    <p class="px-4">
      SansaNews es un medio de comunicación automatizado que visibiliza las
      iniciativas estudiantiles de la USM
    </p>
  </footer>
</div>
