<script lang="ts">
  import Post from "$lib/components/Post.svelte";
  import AvatarScroll from "$lib/components/AvatarScroll.svelte";
  import data from "$lib/assets/media.json";
  import {
    type Media,
    jsonToMedia,
    formatDatetime,
    getTimeCategory,
  } from "$lib/media";
  import * as Empty from "$lib/components/ui/empty";
  import { ImageOff } from "@lucide/svelte";
  import CategoryHeader from "$lib/components/CategoryHeader.svelte";

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
    }, 60 * 1000);
    return () => clearInterval(interval);
  });
</script>

<main class="p-4 pt-2 lg:pt-4">
  <CategoryHeader
    setCategory={(value: string) => (category = value)}
    lastUpdate={formatDatetime(new Date(data.lastUpdate), now)}
  />
  <AvatarScroll />

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