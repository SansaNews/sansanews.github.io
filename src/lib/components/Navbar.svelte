<script lang="ts">
  import * as NavigationMenu from "$lib/components/ui/navigation-menu/index.js";
  import { navigationMenuTriggerStyle } from "$lib/components/ui/navigation-menu/navigation-menu-trigger.svelte";

  let { navItems } = $props();
</script>

<div class="hidden md:flex items-center justify-center gap-4">
  <div class="h-0.5 w-16 bg-primary/40"></div>

  <NavigationMenu.Root>
    <NavigationMenu.List
      class="flex items-center [&>li:not(:last-child)]:after:content-['/'] [&>li:not(:last-child)]:after:mx-1 [&>li:not(:last-child)]:after:text-muted-foreground"
    >
      {#each navItems as item}
        <NavigationMenu.Item>
          <NavigationMenu.Link href={item.href}>
            {#snippet child({ props })}
              <a
                href={item.href}
                {...props}
                class="bg-transparent focus:bg-transparent hover:bg-transparent active:bg-transparent data-active:bg-transparent data-[state=open]:bg-transparent transition-colors hover:text-primary focus:text-primary {navigationMenuTriggerStyle()}"
              >
                {item.label}
              </a>
            {/snippet}
          </NavigationMenu.Link>
        </NavigationMenu.Item>
      {/each}
    </NavigationMenu.List>
  </NavigationMenu.Root>

  <div class="h-0.5 w-16 bg-primary/40"></div>
</div>
