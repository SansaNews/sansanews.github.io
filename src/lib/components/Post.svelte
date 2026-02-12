<script lang="ts">
  import * as Card from "$lib/components/ui/card/index.js";
  import { type Media } from "$lib/types";
  import User from "$lib/components/User.svelte";

  let media: Media = $props();
</script>

<Card.Root class="mb-8 border-0 bg-transparent shadow-none">
  <Card.Content class="px-0">
    <div
      class="bg-card card-shadow flex flex-col overflow-hidden rounded-lg border-2 border-t md:h-82 md:flex-row"
    >
      <div class="aspect-square border-b-2 md:border-r-2 md:border-b-0">
        <!-- Post image -->
        <a
          href={media.permalink}
          target="_blank"
          rel="noopener noreferrer"
          class="relative block h-full"
        >
          {#if media.type === "VIDEO"}
            <video
              src={media.url}
              muted
              loop
              autoplay
              class="h-full w-full object-cover object-center"
            ></video>
          {:else}
            <img
              src={media.url}
              alt="Post de {media.username}"
              referrerpolicy="no-referrer"
              class="h-full w-full object-cover"
            />
          {/if}
        </a>
      </div>

      <div class="flex grow flex-col p-4">
        <!-- Description -->
        <p class="grow overflow-y-auto leading-relaxed whitespace-pre-line">
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
