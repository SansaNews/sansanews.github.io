<script lang="ts">
  import "../app.css";
  import {
    House,
    Building2,
    Users,
    Trophy,
    Megaphone,
    Info,
  } from "@lucide/svelte";
  import * as Card from "$lib/components/ui/card/index.js";
  import MobileNav from "$lib/components/MobileNav.svelte";
  import Navbar from "$lib/components/Navbar.svelte";
  import logo from "$lib/assets/extended-logo-black.png";
  import { resolve } from "$app/paths";
  import Footer from "$lib/components/Footer.svelte";

  const navItems = [
    { label: "Inicio", icon: House, href: resolve("/") },

    {
      label: "USM",
      icon: Building2,
      href: resolve("/[[category]]", { category: "usm" }),
    },

    {
      label: "Iniciativas",
      icon: Users,
      href: resolve("/[[category]]", { category: "iniciativas" }),
    },

    {
      label: "Deportes",
      icon: Trophy,
      href: resolve("/[[category]]", { category: "deportes" }),
    },

    {
      label: "Centros",
      icon: Megaphone,
      href: resolve("/[[category]]", { category: "centros" }),
    },

    {
      label: "Sobre Nosotros",
      icon: Info,
      href: resolve("/nosotros"),
    },
  ];

  let { children } = $props();
</script>

<div class="grid grid-cols-12">
  <header class="col-span-12 pb-4 lg:col-span-8 lg:col-start-3">
    <div class="lg:px-4 lg:py-8">
      <Navbar {navItems} {logo} />
      <MobileNav {navItems} {logo} />
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
