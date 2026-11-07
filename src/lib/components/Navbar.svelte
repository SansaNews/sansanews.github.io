<script lang="ts">
import { Info, Newspaper, PencilRuler } from "@lucide/svelte";
import LogoBanner from "#lib/components/LogoBanner.svelte";
import { hideOnScroll } from "#lib/scroll.svelte.js";
import { cn } from "#lib/utils.js";
import { resolve } from "$app/paths";
import { page } from "$app/state";

const scroll = hideOnScroll();

const sections = [
	{ label: "Noticias", href: resolve("/"), icon: Newspaper },
	{
		label: "Herramientas",
		href: resolve("/herramientas"),
		icon: PencilRuler,
	},
	{ label: "Sobre Nosotros", href: resolve("/nosotros"), icon: Info },
];
</script>

<!-- Mobile Navigation -->
<nav
  class={cn(
    "fixed right-0 bottom-0 left-0 z-50 border-t-2 bg-background transition-transform duration-300 lg:hidden",
    scroll.hidden && "translate-y-full",
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
          <section.icon class="mb-1 h-4 w-4" />
          {section.label}
        </a>
      </li>
    {/each}
  </ul>
</nav>

<!-- Desktop Navigation -->
<div>
  <div class="mt-4 mb-14 hidden lg:block">
    <LogoBanner class="mx-auto h-24 max-w-lg" width={464} height={96} />
  </div>

  <div class="hidden items-center justify-center lg:flex">
    <div class="h-0.5 w-16 bg-primary/40"></div>
    <nav class="flex items-center">
      {#each sections as item, i (item.href)}
        <a
          href={item.href}
          class={cn(
            "px-4 py-2 text-sm font-semibold whitespace-nowrap transition-colors hover:text-primary focus:text-primary",
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
    <div class="h-0.5 w-16 bg-primary/40"></div>
  </div>
</div>
