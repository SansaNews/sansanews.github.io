<script lang="ts">
  import Post from "$lib/components/Post.svelte";
  import mediaFile from "$lib/assets/media.json";
  import { type Media } from "$lib/types";

  const mediaList: Media[] = mediaFile.map((media) => ({
    caption: media.caption || "Sin descripción",
    datePublished: new Date(media.timestamp),
    permalink: media.permalink,
    profileLink: "https://www.instagram.com/" + media.username,
    profilePicture: media.profile_picture_url,
    type: media.media_type,
    url: media.media_url,
    username: media.username,
  }));
</script>

<main class="p-4">
  <section>
    {#each mediaList as media}
      <Post {...media} />
    {/each}
  </section>
</main>
