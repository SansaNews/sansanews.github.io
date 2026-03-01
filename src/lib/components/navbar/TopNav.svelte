<script lang="ts">
  import logo from "$lib/assets/extended-logo-black.png";
  import { page } from "$app/state";
  import { resolve } from "$app/paths";
  import { type NavItem, handleNavClick } from "./nav";

  let {
    categories,
    hidden,
  }: {
    categories: NavItem[];
    hidden: boolean;
  } = $props();

  let showCategories = $derived(
    page.url.pathname === resolve("/") ||
      categories.some((category) => category.href === page.url.pathname),
  );

</script>

<div
  class="bg-background fixed top-0 right-0 left-0 z-40 transition-transform duration-300 lg:hidden"
  class:-translate-y-full={hidden}
>
  <!-- Logo -->
  <div class="flex justify-center pt-2 pb-2" class:border-b-2={!showCategories}>
    <a href={resolve("/")}>
      <img
        src={logo}
        class="w-auto transition-all duration-300"
        class:h-15={showCategories}
        class:h-24={!showCategories}
        alt="SansaNews Logo"
      />
    </a>
  </div>

  {#if showCategories}
    <div class="relative border-b-2">
      <div class="from-background pointer-events-none absolute top-0 right-0 z-50 h-full w-8 bg-linear-to-l to-transparent"></div>
      
      <nav
        class="flex items-center justify-center gap-1 overflow-x-auto scroll-smooth px-3 pb-2"
        style="scrollbar-width: none;"
      >
        {#each categories as category}
          {@const isActive = page.url.pathname === category.href}
          <a
            href={category.href}
            onclick={(e) => handleNavClick(e, isActive)}
            class="shrink-0 rounded-md px-4 py-1.5 text-sm font-medium whitespace-nowrap"
            class:bg-primary={isActive}
            class:text-background={isActive}
            class:text-muted-foreground={!isActive}
          >
            {category.label}
          </a>
        {/each}
      </nav>
    </div>
  {/if}
</div>
