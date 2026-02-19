<script lang="ts">
    import { resolve } from '$app/paths';
  import { page } from '$app/state';
    
  let { navItems, bottomHidden } = $props();

  let navItemsFiltered = $derived(navItems.filter((item: any) => item.label === "Sobre Nosotros" || item.label === "Inicio"));

  // Always highlight "Inicio" when not on "Sobre Nosotros"
  function isActive(item: any) {
    if (item.label === "Sobre Nosotros") {
      return page.url.pathname === item.href;
    }
    
    return page.url.pathname !== resolve("/nosotros");
  }
</script>

<nav
  class="fixed bottom-0 left-0 right-0 bg-background border-t-2 z-50 lg:hidden transition-transform duration-300"
  class:translate-y-full={bottomHidden}
>
  <ul class="flex justify-around">
    {#each navItemsFiltered as item}
      <li>
        <a
          href={item.href}
          class="flex flex-col items-center py-2 text-sm transition-colors"
          class:text-primary={isActive(item)}
          class:text-muted-foreground={!isActive(item)}
        >    
          <item.icon class="h-4 w-4 mb-1" />
          {item.label}
        </a>
      </li>
    {/each}
  </ul>
</nav>