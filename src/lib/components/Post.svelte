<script lang="ts">
  import * as Card from "$lib/components/ui/card/index.js";
  import * as Popover from "$lib/components/ui/popover/index.js";
  import User from "$lib/components/User.svelte";
  import { GalleryHorizontalEnd } from "@lucide/svelte";
  import { type Media } from "$lib/media";

  let { media }: { media: Media } = $props();
  let videoLoaded = $state(false);

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
          {#if media.type !== "VIDEO"}
            <img
              src={media.url}
              alt="Post de {media.username}"
              referrerpolicy="no-referrer"
              loading="lazy"
              width={media.dimensions.width}
              height={media.dimensions.height}
            />
          {:else if videoLoaded}
            <video
              src={media.url}
              muted
              autoplay
              controls
              width={media.dimensions.width}
              height={media.dimensions.height}
            ></video>
          {:else}
            <button
              class="relative flex w-full cursor-pointer border-none bg-transparent p-0 leading-none"
              onclick={(e) => {
                e.preventDefault();
                videoLoaded = true;
              }}
              aria-label="Reproducir video de {media.username}"
            >
              <img
                src={media.thumbnail}
                alt="Previsualización video de {media.username}"
                loading="lazy"
                width={media.dimensions.width}
                height={media.dimensions.height}
              />
              <div
                class="absolute inset-0 flex items-center justify-center bg-black/20"
              >
                <svg
                  class="h-16 w-16 text-white opacity-80"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                  />
                </svg>
              </div>
            </button>
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
