<script lang="ts">
  import * as Card from "$lib/components/ui/card/index.js";
  import { type Media } from "$lib/types";
  import User from "$lib/components/User.svelte";

  let media: Media = $props();
</script>

<Card.Root class="mb-8 border-0 bg-transparent shadow-none">
  <Card.Content class="px-0">
    <div
      class="bg-card card-shadow relative flex flex-col overflow-hidden rounded-lg border-2 border-t md:flex-row"
    >
      <div class="border-b-2 md:w-1/3 md:shrink-0 md:border-r-2 md:border-b-0">
        <!-- Post image -->
        <a href={media.permalink} target="_blank" rel="noopener noreferrer">
          {#if media.type === "VIDEO"}
            <video
              src={media.url}
              muted
              loop
              autoplay
              class="h-auto w-full object-contain"
            ></video>
          {:else}
            <img
              src={media.url}
              alt="Post de {media.username}"
              referrerpolicy="no-referrer"
              class="h-auto w-full object-contain"
            />
          {/if}
        </a>
      </div>

      <div class="flex w-full flex-col justify-between p-4">
        <!-- Description -->
        <p
          class="overflow-y-auto wrap-break-word whitespace-pre-line md:grow md:basis-0"
        >
          {media.caption}
        </p>

        <!-- Footer -->
        <div class="flex justify-end border-t-2 pt-4">
          <User
            username={media.username}
            profileLink={media.profileLink}
            profilePicture={media.profilePicture}
            datePublished={media.datePublished}
          />
        </div>
      </div>
    </div>
  </Card.Content>
</Card.Root>

<style>
  .card-shadow {
    box-shadow: 4px 4px 0px 0px var(--border);
    transition: box-shadow 300ms;
  }

  .card-shadow:hover {
    box-shadow: 6px 6px 0px 0px var(--border);
  }
</style>
