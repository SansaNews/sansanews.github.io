<script lang="ts">
  import Post from "$lib/components/Post.svelte";
  import AvatarScroll from "$lib/components/AvatarScroll.svelte";
  import { Skeleton } from "$lib/components/ui/skeleton/index.js";
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
  import { useClientTime } from "$lib/time.svelte";

  let category = $state("");
  const time = useClientTime();

  const allMedia: Media[] = jsonToMedia(data.media);
  let filteredMedia = $derived.by(() => {
    if (category) {
      return allMedia.filter((media) => media.category === category);
    }
    return allMedia;
  });

  let groupedMedia = $derived.by(() => {
    if (!time.isMounted) {
      return [{ title: "Hoy", items: filteredMedia }];
    }

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
</script>

<main class="p-4 pt-2 lg:pt-4">
  <div class="h-28 lg:hidden"></div>
  <AvatarScroll />
  <CategoryHeader
    setCategory={(value: string) => (category = value)}
    isTimeMounted={time.isMounted}
    lastUpdate={formatDatetime(new Date(data.lastUpdate), time.now)}
  />

  <section>
    {#if groupedMedia.length > 0}
      {#each groupedMedia as group (group.title)}
        <div
          class="mt-8 flex w-full items-center justify-center gap-4 first:mt-0"
        >
          <div class="bg-primary/40 h-0.5 w-full"></div>
          {#if time.isMounted}
            <h2 class="font-heading text-xl whitespace-nowrap">
              {group.title}
            </h2>
          {:else}
            <div class="flex h-8 w-30 items-center justify-center">
              <Skeleton class="h-5 w-full bg-gray-200" />
            </div>
          {/if}
          <div class="bg-primary/40 h-0.5 w-full"></div>
        </div>

        {#each group.items as media (media.permalink + media.username)}
          <Post {media} />
        {/each}
      {/each}

      <!-- Last Update Mobile -->
      {#if time.isMounted}
        <p class="text-muted-foreground text-center text-xs lg:hidden">
          Última Actualización: {formatDatetime(
            new Date(data.lastUpdate),
            time.now,
          )}
        </p>
      {:else}
        <div class="flex justify-center">
          <Skeleton class="h-3 w-52 bg-gray-200" />
        </div>
      {/if}
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
