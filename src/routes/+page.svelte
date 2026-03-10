<script lang="ts">
  import Post from "$lib/components/Post.svelte";
  import CategoryToggle from "$lib/components/CategoryToggle.svelte";
  import data from "$lib/assets/media.json";
  import {
    type Media,
    jsonToMedia,
    formatDatetime,
    getTimeCategory,
  } from "$lib/media";
  import * as Empty from "$lib/components/ui/empty";
  import { ImageOff } from "@lucide/svelte";
  import { resolve } from "$app/paths";
  import logo from "$lib/assets/extended-logo-black.png";

  let category = $state("");

  const allMedia: Media[] = jsonToMedia(data.media);
  let filteredMedia = $derived.by(() => {
    if (category) {
      return allMedia.filter((media) => media.category === category);
    }
    return allMedia;
  });

  let groupedMedia = $derived.by(() => {
    let groups: Record<string, Media[]> = {};
    const order = ["Hoy", "Ayer", "Última Semana", "Último Mes"];

    filteredMedia.forEach((media) => {
      let category = getTimeCategory(media.datePublished);
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(media);
    });

    return order
      .filter((key) => groups[key] && groups[key].length > 0)
      .map((key) => ({ title: key, items: groups[key] }));
  });

  let now = $state(new Date());
  $effect(() => {
    now = new Date();
    const interval = setInterval(() => {
      now = new Date();
    }, 60 * 1000); // Updates every minute
    return () => clearInterval(interval);
  });

  let lastScrollY = $state(0);
  let hideMobileNav = $state(false);

  function handleScroll() {
    const currentScrollY = window.scrollY;
    hideMobileNav = currentScrollY > lastScrollY && currentScrollY > 10;
    lastScrollY = currentScrollY;
  }
</script>

<svelte:window onscroll={handleScroll} />
<main class="p-4 pt-2 lg:pt-4">
  <!-- Mobile Header -->
  <div
    class="bg-background fixed top-0 right-0 left-0 z-40 border-b-2 transition-transform duration-300 lg:hidden"
    class:-translate-y-full={hideMobileNav}
  >
    <!-- Logo -->
    <div class="flex justify-center pt-2 pb-2">
      <a href={resolve("/")}>
        <img
          src={logo}
          class="h-15 transition-all duration-300"
          alt="SansaNews Logo"
        />
      </a>
    </div>

    <div class="flex items-center justify-center pb-2">
      <CategoryToggle setCategory={(c: string) => (category = c)} />
    </div>
  </div>

  <!-- Desktop Header -->
  <div
    class="mb-8 flex flex-col items-center justify-center gap-4 border-dashed pt-4 lg:flex-row lg:justify-between lg:gap-0 lg:border-t-2"
  >
    <div class="hidden lg:flex">
      <CategoryToggle setCategory={(c: string) => (category = c)} />
    </div>
    <p class="text-muted-foreground text-center text-xs lg:text-right">
      Última Actualización: {formatDatetime(new Date(data.lastUpdate), now)}
    </p>
  </div>

  <!-- Media Feed -->
  <section>
    {#if groupedMedia.length > 0}
      {#each groupedMedia as group}
        <div
          class="mt-8 flex w-full items-center justify-center gap-4 first:mt-0"
        >
          <div class="bg-primary/40 h-0.5 w-full"></div>
          <h2 class="font-heading text-xl whitespace-nowrap">{group.title}</h2>
          <div class="bg-primary/40 h-0.5 w-full"></div>
        </div>

        {#each group.items as media}
          <Post {...media} />
        {/each}
      {/each}
    {:else}
      <Empty.Root class="my-8 border border-dashed">
        <Empty.Media variant="icon" class="shadow">
          <ImageOff class="h-12 w-12" />
        </Empty.Media>
        <Empty.Title>Sin publicaciones</Empty.Title>
        <Empty.Description>
          No hay publicaciones disponibles en esta categoría.
        </Empty.Description>
      </Empty.Root>
    {/if}
  </section>
</main>
