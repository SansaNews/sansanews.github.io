<script lang="ts">
import "../app.css";
import Footer from "#lib/components/Footer.svelte";
import Navbar from "#lib/components/Navbar.svelte";
import { asset } from "$app/paths";

let { children } = $props();
</script>

<svelte:head>
  <link
    rel="preload"
    href={asset("fonts/CharisSIL-Regular.woff2")}
    as="font"
    type="font/woff2"
    crossorigin="anonymous"
  />
</svelte:head>

<a
  href="#contenido"
  class="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:text-primary"
  >Saltar al contenido</a
>

<div class="grid grid-cols-12">
  <header class="col-span-12 pb-4 lg:col-span-8 lg:col-start-3">
    <Navbar />
  </header>

  <div id="contenido" tabindex="-1" class="col-span-12 outline-none lg:col-span-8 lg:col-start-3">
    {@render children()}
  </div>

  <Footer />
</div>
