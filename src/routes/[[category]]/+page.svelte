<script lang="ts">
  import Post from "$lib/components/Post.svelte";
  import mediaFile from "$lib/assets/media.json";
  import { type Media } from "$lib/types";
  import type { PageProps } from "./$types";

  let { params }: PageProps = $props();

  const allMedia: Media[] = mediaFile.map((media) => ({
    caption: media.caption || "Sin descripción",
    category: media.category,
    datePublished: new Date(media.timestamp),
    permalink: media.permalink,
    profileLink: "https://www.instagram.com/" + media.username,
    profilePicture: media.profile_picture_url,
    type: media.media_type,
    url: media.media_url,
    username: media.username,
  }));

  const mediaList = $derived.by(() => {
    if (params.category) {
      return allMedia.filter((media) => media.category === params.category);
    }

    return allMedia;
  });
</script>

<main class="p-4">
  <section>
    {#each mediaList as media}
      <Post {...media} />
    {/each}
  </section>
</main>
