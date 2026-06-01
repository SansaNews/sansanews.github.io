<script lang="ts">
  import { Drawer } from "vaul-svelte";
  import { LayoutGrid } from "@lucide/svelte";
  import usersJSON from "$lib/assets/users.json";
  import mediaJSON from "$lib/assets/media.json";
  import { asset } from "$app/paths";

  const profilePics: Record<string, string> = {};
  for (const { username, profile_picture_url } of mediaJSON.media) {
    if (username && profile_picture_url && !profilePics[username]) {
      profilePics[username] = profile_picture_url;
    }
  }

  const categories = Object.entries(usersJSON).map(([name, usernames]) => ({
    name,
    users: usernames
      .filter((u) => profilePics[u] && u)
      .map((u) => ({
        username: u,
        href: `https://www.instagram.com/${u}`,
      })),
  }));

  const allUsers = categories.flatMap((c) => c.users);
</script>

<!-- Avatar Card -->
{#snippet avatarCard(username: string, href: string)}
  <a
    {href}
    target="_blank"
    class="flex w-16 shrink-0 flex-col items-center gap-1"
  >
    <img
      src={asset(`/pfp/${username}-48.webp`)}
      srcset={`
        ${asset(`/pfp/${username}-48.webp`)} 48w,
        ${asset(`/pfp/${username}-96.webp`)} 96w,
        ${asset(`/pfp/${username}-144.webp`)} 144w
      `}
      sizes="(min-width: 640px) 60px, 48px"
      alt={username}
      class="size-14 rounded-full"
      loading="lazy"
    />
    <span class="text-muted-foreground w-full truncate text-center text-[10px]"
      >{username}</span
    >
  </a>
{/snippet}

<div class="flex lg:hidden">
  <!-- Scroll Area -->
  <div class="relative flex-1 overflow-hidden">
    <!-- Avatars -->
    <div class="flex gap-3 overflow-x-auto p-2" style="scrollbar-width: none;">
      {#each allUsers as { username, href }}
        {@render avatarCard(username, href)}
      {/each}
    </div>
  </div>

  <!-- Drawer -->
  <Drawer.Root>
    <Drawer.Trigger
      class="flex shrink-0 cursor-pointer flex-col items-center gap-1 p-2"
    >
      <div
        class="flex size-14 items-center justify-center rounded-full bg-white"
      >
        <LayoutGrid class="text-muted-foreground h-6 w-6" />
      </div>
      <span class="text-muted-foreground text-[10px]">Todas</span>
    </Drawer.Trigger>
    <Drawer.Portal>
      <!-- Background Darkens -->
      <Drawer.Overlay class="fixed inset-0 z-50 bg-black/40" />
      <!-- Drawer Style -->
      <Drawer.Content
        class="bg-background fixed inset-x-0 bottom-0 z-50 flex flex-col rounded-t-2xl border-t-4"
        style="max-height: 80svh;"
      >
        <!-- Drawer Top Line -->
        <div class="bg-border mx-auto my-3 h-2 w-12 rounded-full"></div>
        <!-- Drawer Content -->
        <div class="flex flex-col gap-6 overflow-y-auto p-5">
          {#each categories as cat}
            <div class="flex flex-col gap-3">
              <!-- Category Title -->
              <div class="flex items-center gap-3">
                <div class="bg-border h-px flex-1"></div>
                <span class="text-primary text-xs font-bold uppercase"
                  >{cat.name}</span
                >
                <div class="bg-border h-px flex-1"></div>
              </div>
              <!-- Users Grid -->
              <div class="grid grid-cols-3 gap-3 [&>a]:w-full">
                {#each cat.users as { username, href }}
                  {@render avatarCard(username, href)}
                {/each}
              </div>
            </div>
          {/each}
        </div>
      </Drawer.Content>
    </Drawer.Portal>
  </Drawer.Root>
</div>

