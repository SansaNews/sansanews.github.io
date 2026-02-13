<script lang="ts">
  import * as NavigationMenu from "$lib/components/ui/navigation-menu/index.js";
  import { navigationMenuTriggerStyle } from "$lib/components/ui/navigation-menu/navigation-menu-trigger.svelte";

  let { navItems } = $props();
</script>

<div class="hidden items-center justify-center md:flex">
  <div class="bg-primary/40 h-0.5 w-16"></div>

  <NavigationMenu.Root>
    <NavigationMenu.List
      class="[&>li:not(:last-child)]:after:mx-1 [&>li:not(:last-child)]:after:content-['/']"
    >
      {#each navItems as item}
        <NavigationMenu.Item>
          <NavigationMenu.Link href={item.href}>
            {#snippet child({ props })}
              <a
                href={item.href}
                {...props}
                class="hover:text-primary focus:text-primary transition-colors hover:bg-transparent active:bg-transparent focus:bg-transparent {navigationMenuTriggerStyle()}"
              >
                {item.label}
              </a>
            {/snippet}
          </NavigationMenu.Link>
        </NavigationMenu.Item>
      {/each}
    </NavigationMenu.List>
  </NavigationMenu.Root>

  <div class="bg-primary/40 h-0.5 w-16"></div>
</div>
