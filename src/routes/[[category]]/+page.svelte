<script lang="ts">
  import Post from "$lib/components/Post.svelte";
  import data from "$lib/assets/media.json";
  import { type Media, jsonToMedia, formatDatetime } from "$lib/media";
  import type { PageProps } from "./$types";
  import * as Empty from "$lib/components/ui/empty";
  import { ImageOff } from "@lucide/svelte";

  let { params }: PageProps = $props();

  const allMedia: Media[] = jsonToMedia(data.media);
  const mediaList = $derived.by(() => {
    if (params.category) {
      return allMedia.filter((media) => media.category === params.category);
    }

    return allMedia;
  });

  let now = $state(new Date());

  $effect(() => {
    const interval = setInterval(() => {
      now = new Date();
    }, 60 * 1000); // Updates every minute

    return () => clearInterval(interval);
  });
</script>

<main class="p-4">
  <p class="text-muted-foreground text-center text-xs">
    Última Actualización: {formatDatetime(new Date(data.lastUpdate), now)}
  </p>

  <section>
    {#each mediaList as media}
      <Post {...media} />
    {:else}
      <Empty.Root class="border border-dashed my-8">
        <Empty.Media variant="icon" class="shadow">
          <ImageOff class="h-12 w-12" />
        </Empty.Media>
        <Empty.Title>Sin publicaciones</Empty.Title>
        <Empty.Description>
          No hay publicaciones nuevas en el último mes.
        </Empty.Description>
      </Empty.Root>
    {/each}
  </section>
</main>
