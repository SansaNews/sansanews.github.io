<script lang="ts">
import { BookOpen, Info, Newspaper, PencilRuler } from "@lucide/svelte";
import { resolve } from "$app/paths";
import { page } from "$app/state";
import LogoBanner from "$lib/components/LogoBanner.svelte";
import { hideOnScroll } from "$lib/scroll.svelte";
import { cn } from "$lib/utils";

const { hidden } = hideOnScroll();

const sections = [
	{ label: "Noticias", href: resolve("/"), icon: Newspaper },
	{
		label: "Herramientas",
		href: resolve("/herramientas"),
		icon: PencilRuler,
	},
	{ label: "Guías", href: resolve("/guias"), icon: BookOpen },
	{ label: "Sobre Nosotros", href: resolve("/nosotros"), icon: Info },
];

function isActive(href: string): boolean {
	const path = page.url.pathname;
	if (href === resolve("/")) return path === href;
	return path === href || path.startsWith(`${href}/`);
}
</script>

<!-- Mobile Navigation -->
<nav
  class={cn(
    "bg-background fixed right-0 bottom-0 left-0 z-50 border-t-2 transition-transform duration-300 lg:hidden",
    hidden() && "translate-y-full",
  )}
>
  <ul class="flex items-stretch">
    {#each sections as section (section.href)}
      <li class="flex flex-1">
        <a
          href={section.href}
          class={cn(
            "flex h-full w-full flex-col items-center justify-center px-1 py-2 text-center text-xs leading-tight transition-colors sm:text-sm",
            isActive(section.href)
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
    <LogoBanner class="mx-auto h-24 max-w-lg" width={464} height={96} />
  </div>

  <div class="hidden items-center justify-center lg:flex">
    <div class="bg-primary/40 h-0.5 w-16"></div>
    <nav class="flex items-center">
      {#each sections as item, i (item.href)}
        <a
          href={item.href}
          class={cn(
            "hover:text-primary focus:text-primary px-4 py-2 text-sm font-semibold whitespace-nowrap transition-colors",
            isActive(item.href) && "text-primary",
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
