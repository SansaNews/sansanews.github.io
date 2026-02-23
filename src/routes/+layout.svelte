<script lang="ts">
  import "../app.css";
  import Navbar from "$lib/components/navbar/Navbar.svelte";
  import Footer from "$lib/components/Footer.svelte";

  let { children } = $props();
</script>

<div class="grid grid-cols-12">
  <header class="col-span-12 pb-4 lg:col-span-8 lg:col-start-3">
    <div class="lg:px-4 lg:pt-8 lg:pb-6">
      <Navbar />
    </div>
  </header>

  <div class="col-span-12 lg:col-span-8 lg:col-start-3">
    {@render children()}
  </div>

  <Footer />
</div>
