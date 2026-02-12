<script lang="ts">
  import Post from "$lib/components/Post.svelte";
  import mediaFile from "$lib/assets/media.json";
  import { type Media } from "$lib/types";

  const mediaList: Media[] = mediaFile.map((media) => ({
    caption: media.caption || "Sin descripción",
    url: media.media_url,
    username: media.username,
    profileLink: "https://www.instagram.com/" + media.username,
    profilePicture: media.profile_picture_url,
    permalink: media.permalink,
    datePublished: new Date(media.timestamp),
  }));
</script>

<main class="p-4">
  <section>
    {#each mediaList as media}
      <Post {...media} />
    {/each}
  </section>
</main>
