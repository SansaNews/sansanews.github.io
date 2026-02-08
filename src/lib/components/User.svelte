<script lang="ts">
  import { Avatar } from "$lib/components/ui/avatar";

  let { username, profileLink, profilePicture, datePublished } = $props();

  function formatDatetime(datetime: Date): string {
    let now = new Date();

    let diffSeconds = Math.floor((now.getTime() - datetime.getTime()) / 1000);
    if (diffSeconds < 60) {
      return "Hace menos de un minuto";
    }

    const diffMinutes = Math.floor(diffSeconds / 60);
    if (diffMinutes < 60) {
      return `Hace ${diffMinutes} minutos`;
    }

    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) {
      if (diffHours === 1) return "Hace 1 hora";
      return `Hace ${diffHours} horas`;
    }

    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);

    if (
      datetime.getDate() === yesterday.getDate() &&
      datetime.getMonth() === yesterday.getMonth() &&
      datetime.getFullYear() === yesterday.getFullYear()
    ) {
      return "Ayer";
    }

    // DD/MM/YYYY
    return datetime.toLocaleDateString("en-GB");
  }
</script>

<a
  href={profileLink}
  target="_blank"
  rel="noopener noreferrer"
  class="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity"
>
  <!-- Name and publish time -->
  <div class="flex flex-col text-right min-w-0">
    <span class="text-base sm:text-base font-semibold text-foreground truncate">
      {username}
    </span>
    <span
      class="text-[10px] uppercase text-muted-foreground tracking-wider font-semibold whitespace-nowrap"
    >
      {formatDatetime(datePublished)}
    </span>
  </div>
  <!-- Avatar -->
  <Avatar class="h-12 w-12 sm:h-15 sm:w-15 shrink-0">
    <img
      src={profilePicture}
      alt="Post de {username}"
      referrerpolicy="no-referrer"
      class="absolute inset-0 w-full h-full object-cover"
    />
  </Avatar>
</a>
