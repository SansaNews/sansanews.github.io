<script lang="ts">
import "../app.css";
import { asset } from "$app/paths";
import Footer from "$lib/components/Footer.svelte";
import Navbar from "$lib/components/Navbar.svelte";

let { children } = $props();
</script>

<svelte:head>
  <link
    rel="preload"
    href={asset("/fonts/CharisSIL-Regular.woff2")}
    as="font"
    type="font/woff2"
    crossorigin="anonymous"
  />
  <link
    rel="preload"
    href={asset("/fonts/SourceSerif4-VariableFont_opsz,wght.woff2")}
    as="font"
    type="font/woff2"
    crossorigin="anonymous"
  />
</svelte:head>

<div class="grid grid-cols-12">
  <header class="col-span-12 pb-4 lg:col-span-8 lg:col-start-3">
    <Navbar />
  </header>

  <div class="col-span-12 lg:col-span-8 lg:col-start-3">
    {@render children()}
  </div>

  <Footer />
</div>
