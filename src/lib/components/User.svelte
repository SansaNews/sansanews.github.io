<script lang="ts">
  import { Avatar } from "$lib/components/ui/avatar";
  import { formatDatetime } from "$lib/media";
  import { useClientTime } from "$lib/time.svelte";
  import { Skeleton } from "$lib/components/ui/skeleton/index.js";
  import { asset } from "$app/paths";

  let { username, profileLink, profilePicture, datePublished } = $props();

  const time = useClientTime();
</script>

<a
  href={profileLink}
  target="_blank"
  rel="noopener noreferrer"
  class="flex items-center gap-2 transition-opacity hover:opacity-80 sm:gap-3"
>
  <div class="flex flex-col text-right">
    <span class="truncate font-semibold">
      {username}
    </span>
    {#if time.isMounted}
      <span
        class="text-muted-foreground text-[10px] font-semibold tracking-wider"
      >
        {formatDatetime(datePublished)}
      </span>
    {:else}
      <div class="flex justify-end pt-1">
        <Skeleton class="h-3.25 w-16" />
      </div>
    {/if}
  </div>
  <Avatar class="h-12 w-12 sm:h-15 sm:w-15">
    <img
      src={asset(`/pfp/${username}-48.webp`)}
      srcset={`
        ${asset(`/pfp/${username}-48.webp`)} 48w,
        ${asset(`/pfp/${username}-96.webp`)} 96w,
        ${asset(`/pfp/${username}-144.webp`)} 144w
      `}
      sizes="(min-width: 640px) 60px, 48px"
      alt="Foto de perfil de {username}"
      referrerpolicy="no-referrer"
      loading="lazy"
    />
  </Avatar>
</a>
