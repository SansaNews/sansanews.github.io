<script lang="ts">
  import * as Card from "$lib/components/ui/card/index.js";
  import { type Media } from "$lib/types";
  import User from "$lib/components/User.svelte";

  let media: Media = $props();
</script>

<Card.Root class="border-0 shadow-none bg-transparent mb-8">
  <Card.Content class="px-0 sm:px-6">
    <div
      class="bg-card border-2 border-border border-t card-shadow overflow-hidden flex flex-col md:flex-row md:h-82 rounded-lg"
    >
      <div
        class="w-full md:w-auto h-full aspect-square shrink-0 border-b-2 md:border-b-0 md:border-r-2 border-border overflow-hidden"
      >
        <!-- Post image -->
        <a
          href={media.permalink}
          target="_blank"
          rel="noopener noreferrer"
          class="relative w-full h-full group block"
        >
          <img
            src={media.url}
            alt="Post de {media.username}"
            referrerpolicy="no-referrer"
            class="absolute inset-0 w-full h-full object-cover"
          />
        </a>
      </div>

      <div
        class="w-full flex-1 min-w-0 p-4 md:p-4 flex flex-col justify-between"
      >
        <!-- Description -->
        <p
          class="overflow-y-auto text-sm sm:text-base text-foreground leading-relaxed whitespace-pre-line wrap-break-word"
        >
          {media.caption}
        </p>

        <!-- Footer -->
        <div
          class="pt-4 border-t-2 border-border flex items-center justify-end shrink-0"
        >
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
