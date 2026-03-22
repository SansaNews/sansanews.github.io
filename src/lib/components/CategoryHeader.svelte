<script lang="ts">
  import { resolve } from "$app/paths";
  import categoriesJSON from "$lib/assets/users.json";
  import * as ToggleGroup from "$lib/components/ui/toggle-group";
  import logo from "$lib/assets/extended-logo-black.png";

  const categories = Object.keys(categoriesJSON);

  let { setCategory, lastUpdate } = $props();

  let lastScrollY = $state(0);
  let hideMobileNav = $state(false);
  let fade = $state({ left: false, right: true });

  function handleScroll() {
    const currentScrollY = window.scrollY;
    hideMobileNav = currentScrollY > lastScrollY && currentScrollY > 10;
    lastScrollY = currentScrollY;
  }
  
  function updateFade(e: Event) {
  const { scrollLeft, scrollWidth, clientWidth } = e.target as HTMLElement;
  fade.left = scrollLeft > 8;
  fade.right = scrollLeft < scrollWidth - clientWidth - 8;
  }
</script>

{#snippet CategorySelector()}
  <ToggleGroup.Root
    type="single"
    spacing={2}
    onValueChange={(value) => setCategory(value)}
  >
  <ToggleGroup.Item
    value=""
    class="data-[state=on]:bg-primary/80 data-[state=on]:text-background text-muted-foreground hover:text-primary 
  hover:bg-primary/10 transition-none shadow-xs cursor-pointer rounded-md bg-white px-4
  text-sm font-medium"
  >
    Todos
  </ToggleGroup.Item>    

    {#each categories as category}
      <ToggleGroup.Item
        value={category.toLowerCase()}
        class="data-[state=on]:bg-primary/80 data-[state=on]:text-background text-muted-foreground hover:text-primary 
      hover:bg-primary/10 transition-none shadow-xs cursor-pointer rounded-md bg-white px-4
      text-sm font-medium"
      >
        {category}
      </ToggleGroup.Item>
    {/each}
  </ToggleGroup.Root>
{/snippet}

<!-- Mobile Header -->
<svelte:window onscroll={handleScroll} />
<div class="h-28 lg:hidden"></div>
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

  <div class="relative">
  
    <!-- Fade -->
    <div class="pointer-events-none absolute top-0 bottom-2 left-0 w-10 bg-gradient-to-r 
    from-gray-100 transition-opacity duration-300 {fade.left ? '' : 'opacity-0'}"></div>
    <div class="pointer-events-none absolute top-0 bottom-2 right-0 w-10 bg-gradient-to-l
    from-gray-100 transition-opacity duration-300 {fade.right ? '' : 'opacity-0'}"></div>
    
    <div onscroll={updateFade} class="overflow-x-auto px-2 pb-2" style="scrollbar-width: none;">
      {@render CategorySelector()}
    </div>
  </div>
</div>

<!-- Desktop Header -->
<div
  class="mb-6 flex flex-col items-center justify-center gap-4 border-dashed pt-4 lg:mt-6 lg:mb-8 lg:flex-row lg:justify-between lg:gap-0 lg:border-t-2"
>
  <div class="hidden lg:flex">
    {@render CategorySelector()}
  </div>
  <p class="text-muted-foreground text-center text-xs lg:text-right">
    Última Actualización: {lastUpdate}
  </p>
</div>
