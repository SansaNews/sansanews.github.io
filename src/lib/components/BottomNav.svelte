<script lang="ts">
  import { resolve } from "$app/paths";
  import { page } from "$app/state";
  import { type NavItem } from "$lib/nav";

  let {
    sections,
    hidden,
  }: {
    sections: NavItem[];
    hidden: boolean;
  } = $props();

  function isActive(section: NavItem): boolean {
    if (page.url.pathname === section.href) return true;
    // Check if we are in a category
    if (
      section.href === resolve("/") &&
      !sections.some((s) => s.href === page.url.pathname)
    )
      return true;
    return false;
  }
</script>

<nav
  class="bg-background fixed right-0 bottom-0 left-0 z-50 border-t-2 transition-transform duration-300 lg:hidden"
  class:translate-y-full={hidden}
>
  <ul class="flex justify-around">
    {#each sections as section}
      <li>
        <a
          href={section.href}
          class="flex flex-col items-center py-2 text-sm transition-colors"
          class:text-primary={isActive(section)}
          class:text-muted-foreground={!isActive(section)}
        >
          <section.icon class="mb-1 h-4 w-4" />
          {section.label}
        </a>
      </li>
    {/each}
  </ul>
</nav>

