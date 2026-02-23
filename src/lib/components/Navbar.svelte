<script lang="ts">
  import logo from "$lib/assets/extended-logo-black.png";
  import { page } from "$app/state";
  import { resolve } from "$app/paths";
  import { type NavItem } from "$lib/nav";

  let { navItems }: { navItems: NavItem[] } = $props();
</script>

<!-- Logo -->
<div class="hidden lg:mb-6 lg:block">
  <a href={resolve("/")}>
    <img src={logo} class="mx-auto w-full max-w-lg" alt="SansaNews Logo" />
  </a>
</div>

<!-- Navbar -->
<div class="hidden items-center justify-center lg:flex">
  <div class="bg-primary/40 h-0.5 w-16"></div>
  <nav class="flex items-center">
    {#each navItems as item, i}
      {@const isActive = page.url.pathname === item.href}
      <a
        href={item.href}
        class="hover:text-primary focus:text-primary px-4 py-2 text-sm font-semibold whitespace-nowrap transition-colors"
        class:text-primary={isActive}
      >
        {item.label}
      </a>

      {#if i < navItems.length - 1}
        <span class="mx-1 select-none">/</span>
      {/if}
    {/each}
  </nav>
  <div class="bg-primary/40 h-0.5 w-16"></div>
</div>

