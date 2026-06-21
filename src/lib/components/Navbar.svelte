<script lang="ts">
  import { page } from "$app/state";
  import { asset, resolve } from "$app/paths";
  import { Newspaper, PencilRuler, Info } from "@lucide/svelte";
  import { cn } from "$lib/utils";

  const sections = [
    { label: "Noticias", href: resolve("/"), icon: Newspaper },
    {
      label: "Herramientas",
      href: resolve("/herramientas"),
      icon: PencilRuler,
    },
    { label: "Sobre Nosotros", href: resolve("/nosotros"), icon: Info },
  ];

  let lastScrollY = $state(0);
  let hideMobileNav = $state(false);

  function handleScroll() {
    const currentScrollY = window.scrollY;
    hideMobileNav = currentScrollY > lastScrollY && currentScrollY > 10;
    lastScrollY = currentScrollY;
  }
</script>

<!-- Mobile Navigation -->
<svelte:window onscroll={handleScroll} />
<nav
  class={cn(
    "bg-background fixed right-0 bottom-0 left-0 z-50 border-t-2 transition-transform duration-300 lg:hidden",
    hideMobileNav && "translate-y-full",
  )}
>
  <ul class="flex justify-around">
    {#each sections as section (section.href)}
      <li class="flex-1">
        <a
          href={section.href}
          class={cn(
            "flex w-full flex-col items-center py-2 text-sm transition-colors",
            section.href === page.url.pathname
              ? "text-primary"
              : "text-muted-foreground hover:text-primary",
          )}
        >
          {#if section.icon}
            <section.icon class="mb-1 h-4 w-4" />
          {/if}
          {section.label}
        </a>
      </li>
    {/each}
  </ul>
</nav>

<!-- Desktop Navigation -->
<div>
  <div class="mt-4 mb-14 hidden lg:block">
    <a href={resolve("/")}>
      <img
        src={asset("/brand/sansanews_banner_black.svg")}
        class="mx-auto h-24 max-w-lg"
        width="464"
        height="96"
        alt="SansaNews Logo"
      />
    </a>
  </div>

  <div class="hidden items-center justify-center lg:flex">
    <div class="bg-primary/40 h-0.5 w-16"></div>
    <nav class="flex items-center">
      {#each sections as item, i (item.href)}
        <a
          href={item.href}
          class={cn(
            "hover:text-primary focus:text-primary px-4 py-2 text-sm font-semibold whitespace-nowrap transition-colors",
            item.href === page.url.pathname && "text-primary",
          )}
        >
          {item.label}
        </a>

        {#if i < sections.length - 1}
          <span class="mx-1 select-none">/</span>
        {/if}
      {/each}
    </nav>
    <div class="bg-primary/40 h-0.5 w-16"></div>
  </div>
</div>
