<script lang="ts">
  import { page } from "$app/state";
  import { type NavItem, isSectionActive } from "./nav";

  let {
    sections: navSections,
    hidden,
  }: {
    sections: NavItem[];
    hidden: boolean;
  } = $props();
</script>

<nav
  class="bg-background fixed right-0 bottom-0 left-0 z-50 border-t-2 transition-transform duration-300 lg:hidden"
  class:translate-y-full={hidden}
>
  <ul class="flex justify-around">
    {#each navSections as section}
      {@const active = isSectionActive(section.href, page.url.pathname)}
      <li class="flex-1">
        <a
          href={section.href}
          class="flex w-full flex-col items-center py-2 text-sm transition-colors"
          class:text-primary={active}
          class:text-muted-foreground={!active}
          class:hover:text-primary={!active}
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