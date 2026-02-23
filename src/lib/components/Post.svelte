<script lang="ts">
  import * as Card from "$lib/components/ui/card/index.js";
  import * as Popover from "$lib/components/ui/popover/index.js";
  import User from "$lib/components/User.svelte";
  import { GalleryHorizontalEnd } from "@lucide/svelte";
  import { type Media } from "$lib/media";

  let media: Media = $props();

  let open = $state(false);
  let closeTimer: ReturnType<typeof setTimeout>;

  function handleOpen() {
    clearTimeout(closeTimer);
    open = true;
  }

  function handleClose() {
    closeTimer = setTimeout(() => {
      open = false;
    }, 150);
  }

  function handleScroll() {
    if (open) {
      clearTimeout(closeTimer);
      open = false;
    }
  }
</script>

<svelte:window onscroll={handleScroll} />

<Card.Root class="mb-8 border-0 bg-transparent shadow-none">
  <Card.Content class="px-0">
    <div
      class="bg-card card-shadow relative flex flex-col overflow-hidden rounded-lg border-2 border-t lg:flex-row"
    >
      <div
        class="relative border-b-2 lg:w-1/3 lg:shrink-0 lg:border-r-2 lg:border-b-0"
      >
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

        {#if media.children}
          <Popover.Root bind:open>
            <Popover.Trigger
              onmouseenter={handleOpen}
              onmouseleave={handleClose}
              onclick={(e) => {
                e.preventDefault();
                open = true;
              }}
              class="absolute top-2 right-2 z-10 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-black/50"
            >
              <GalleryHorizontalEnd class="h-4 w-4 text-white opacity-75" />
            </Popover.Trigger>

            <Popover.Content
              onmouseenter={handleOpen}
              onmouseleave={handleClose}
              side="top"
              sideOffset={12}
              class="mx-4 w-48 border-0 bg-black/50 p-1 text-center text-xs text-white"
            >
              Más contenido en Instagram
            </Popover.Content>
          </Popover.Root>
        {/if}
      </div>

      <div class="flex w-full flex-col justify-between p-4">
        <p
          class="overflow-y-auto wrap-break-word whitespace-pre-line lg:grow lg:basis-0"
        >
          {media.caption}
        </p>

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
    transition: box-shadow 200ms;
  }

  .card-shadow:hover {
    box-shadow: 6px 6px 0px 0px var(--border);
  }
</style>
