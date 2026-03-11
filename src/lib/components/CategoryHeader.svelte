<script lang="ts">
  import { resolve } from "$app/paths";
  import categoriesJSON from "$lib/assets/users.json";
  import * as ToggleGroup from "$lib/components/ui/toggle-group";
  import logo from "$lib/assets/extended-logo-black.png";

  const categories = Object.keys(categoriesJSON);

  let { setCategory, lastUpdate } = $props();

  let lastScrollY = $state(0);
  let hideMobileNav = $state(false);

  function handleScroll() {
    const currentScrollY = window.scrollY;
    hideMobileNav = currentScrollY > lastScrollY && currentScrollY > 10;
    lastScrollY = currentScrollY;
  }
</script>

{#snippet CategorySelector()}
  <ToggleGroup.Root
    type="single"
    variant="outline"
    spacing={2}
    onValueChange={(value) => setCategory(value)}
  >
    {#each categories as category}
      <ToggleGroup.Item
        value={category.toLowerCase()}
        class="data-[state=on]:bg-primary/80 data-[state=on]:text-background text-muted-foreground hover:text-primary 
      hover:bg-primary/10 shadow-border cursor-pointer rounded-md bg-white px-4 py-1.5 
      text-sm font-medium shadow-[2px_2px_0px_0px]"
      >
        {category}
      </ToggleGroup.Item>
    {/each}
  </ToggleGroup.Root>
{/snippet}

<!-- Mobile Header -->
<svelte:window onscroll={handleScroll} />
<div class="h-30 lg:hidden"></div>
<div
  class="bg-background fixed top-0 right-0 left-0 z-40 border-b-2 transition-transform duration-300 lg:hidden"
  class:-translate-y-full={hideMobileNav}
>
  <div class="flex justify-center pt-2 pb-2">
    <a href={resolve("/")}>
      <img
        src={logo}
        class="h-15 transition-all duration-300"
        alt="SansaNews Logo"
      />
    </a>
  </div>

  <div class="flex items-center justify-center pb-2">
    {@render CategorySelector()}
  </div>
</div>

<!-- Desktop Header -->
<div
  class="mt-6 mb-8 flex flex-col items-center justify-center gap-4 border-dashed pt-4 lg:flex-row lg:justify-between lg:gap-0 lg:border-t-2"
>
  <div class="hidden lg:flex">
    {@render CategorySelector()}
  </div>
  <p class="text-muted-foreground text-center text-xs lg:text-right">
    Última Actualización: {lastUpdate}
  </p>
</div>
