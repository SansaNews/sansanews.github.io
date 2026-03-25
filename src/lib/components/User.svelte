<script lang="ts">
  import { Avatar } from "$lib/components/ui/avatar";
  import { formatDatetime } from "$lib/media";

  let { username, profileLink, profilePicture, datePublished } = $props();
</script>

<a
  href={profileLink}
  target="_blank"
  rel="noopener noreferrer"
  class="flex items-center gap-2 transition-opacity hover:opacity-80 sm:gap-3"
>
  <!-- Name and publish time -->
  <div class="flex flex-col text-right">
    <span class="truncate font-semibold">
      {username}
    </span>
    <span
      class="text-muted-foreground text-[10px] font-semibold tracking-wider"
    >
      {formatDatetime(datePublished)}
    </span>
  </div>
  <!-- Avatar -->
  <Avatar class="h-12 w-12 sm:h-15 sm:w-15">
    <img
      src={profilePicture}
      alt="Foto de perfil de {username}"
      referrerpolicy="no-referrer"
      loading="lazy"
    />
  </Avatar>
</a>
