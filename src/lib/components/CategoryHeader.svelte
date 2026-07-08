<script lang="ts">
import categoriesJSON from "$lib/assets/users.json";
import LogoBanner from "$lib/components/LogoBanner.svelte";
import { Skeleton } from "$lib/components/ui/skeleton/index.js";
import * as ToggleGroup from "$lib/components/ui/toggle-group";
import { hideOnScroll } from "$lib/scroll.svelte";
import { cn } from "$lib/utils";

const { hidden } = hideOnScroll();

const categories = Object.keys(categoriesJSON);

let { setCategory, lastUpdate, isTimeMounted } = $props();

let fade = $state({ left: false, right: true });

function updateFade(e: Event) {
	const { scrollLeft, scrollWidth, clientWidth } = e.target as HTMLElement;
	fade.left = scrollLeft > 8;
	fade.right = scrollLeft < scrollWidth - clientWidth - 8;
}
</script>

{#snippet CategorySelector()}
  <ToggleGroup.Root
    type="single"
    spacing={2}
    onValueChange={(value) => setCategory(value)}
  >
    <ToggleGroup.Item
      value=""
      class="data-[state=on]:bg-primary/80 data-[state=on]:text-background text-muted-foreground hover:text-primary 
  hover:bg-primary/10 cursor-pointer rounded-md bg-white px-4 text-sm font-medium
  shadow-xs transition-none"
    >
      Todos
    </ToggleGroup.Item>

    {#each categories as category (category)}
      <ToggleGroup.Item
        value={category.toLowerCase()}
        class="data-[state=on]:bg-primary/80 data-[state=on]:text-background text-muted-foreground hover:text-primary 
      hover:bg-primary/10 cursor-pointer rounded-md bg-white px-4 text-sm font-medium
      shadow-xs transition-none"
      >
        {category}
      </ToggleGroup.Item>
    {/each}
  </ToggleGroup.Root>
{/snippet}

<!-- Mobile Header -->
<div
  class={cn(
    "bg-background fixed top-0 right-0 left-0 z-40 border-b-2 transition-transform duration-300 lg:hidden",
    hidden() && "-translate-y-full",
  )}
>
  <div class="flex justify-center pt-4 pb-5">
    <LogoBanner class="h-10" width={193} height={40} />
  </div>

  <div class="relative">
    <div
      class="pointer-events-none absolute top-0 bottom-2 left-0 w-10 bg-linear-to-r
    from-gray-100 transition-opacity duration-300 {fade.left
        ? ''
        : 'opacity-0'}"
    ></div>
    <div
      class="pointer-events-none absolute top-0 right-0 bottom-2 w-10 bg-linear-to-l
    from-gray-100 transition-opacity duration-300 {fade.right
        ? ''
        : 'opacity-0'}"
    ></div>

    <div
      onscroll={updateFade}
      class="overflow-x-auto px-2 pb-2"
      style="scrollbar-width: none;"
    >
      {@render CategorySelector()}
    </div>
  </div>
</div>

<!-- Desktop Header -->
<div
  class="mb-6 hidden flex-col items-center justify-center gap-4 border-dashed pt-4 lg:mt-6 lg:mb-8 lg:flex lg:flex-row lg:justify-between lg:gap-0 lg:border-t-2"
>
  <div class="hidden lg:flex">
    {@render CategorySelector()}
  </div>
  {#if isTimeMounted}
    <p class="text-muted-foreground text-center text-xs lg:text-right">
      Última Actualización: {lastUpdate}
    </p>
  {:else}
    <Skeleton class="h-3 w-52 bg-gray-200" />
  {/if}
</div>
