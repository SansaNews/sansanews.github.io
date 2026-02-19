<script lang="ts">
  import { page } from '$app/state';
  import { resolve } from '$app/paths';
  import { goto } from '$app/navigation';

  let { navItems, logo, topVisible } = $props();

  let navItemsFiltered = $derived(navItems.filter((item: any) => item.label !== "Sobre Nosotros" && item.label !== "Inicio"));

  let isNosotros = $derived(page.url.pathname === resolve("/nosotros"));

  // Go to home when clicking an active item
  function handleClick(m: MouseEvent, isActive: boolean) {
    if (isActive) {
      m.preventDefault();
      goto(resolve("/"));
    }
  }
</script>

<div
  class="lg:hidden fixed top-0 left-0 right-0 z-40 transition-transform duration-300 bg-background"
  class:-translate-y-full={!topVisible}
>
  <!-- Logo -->
  <div 
    class="flex justify-center pt-2 pb-2"
    class:border-b-2={isNosotros}
  >
    <a href={resolve("/")}>
      <img 
        src={logo} 
        class="w-auto transition-all duration-300"
        class:h-15={!isNosotros}
        class:h-24={isNosotros}
        alt="SansaNews Logo" 
      />
    </a>
  </div>

  {#if !isNosotros}
    <div class="relative border-b-2">
      <div class="pointer-events-none absolute right-0 top-0 h-full w-8 bg-linear-to-l from-background to-transparent z-50"></div>
      <nav
        class="flex items-center gap-1 overflow-x-auto scroll-smooth md:justify-center px-3 pb-2"
        style="scrollbar-width: none;"
      >
        {#each navItemsFiltered as item}
          {@const isActive = page.url.pathname === item.href}
          <a
            href={item.href}
            onclick={(e) => handleClick(e, isActive)}
            class="shrink-0 rounded-md px-4 py-1.5 text-sm font-medium whitespace-nowrap"
            class:bg-primary={isActive}
            class:text-background={isActive}
            class:text-muted-foreground={!isActive}
          >
            {item.label}
          </a>
        {/each}
      </nav>
    </div>
  {/if}
</div>