<script lang="ts">
  import { Drawer } from "vaul-svelte";
  import { LayoutGrid } from "@lucide/svelte";
  import usersJSON from "$lib/assets/users.json";
  import mediaJSON from "$lib/assets/media.json";

  const profilePics: Record<string, string> = {};
  for (const { username, profile_picture_url } of mediaJSON.media) {
    if (username && profile_picture_url && !profilePics[username]) {
      profilePics[username] = profile_picture_url;
    }
  }

  const categories = Object.entries(usersJSON).map(([name, usernames]) => ({
    name,
    users: usernames
      .filter((u) => profilePics[u])
      .map((u) => ({ username: u, pic: profilePics[u], href: `https://www.instagram.com/${u}` })),
  }));

  const allUsers = categories.flatMap((c) => c.users);
</script>

<!-- Avatar Card -->
{#snippet avatarCard(pic: string, username: string, href: string)}
  <a {href} target="_blank" class="flex flex-col items-center gap-1 shrink-0">
    <img src={pic} alt={username} class="size-14 rounded-full" />
    <span class="w-full truncate text-center text-[10px] text-muted-foreground">{username}</span>
  </a>
{/snippet}


<div class="flex lg:hidden">
  <!-- Scroll Area -->
  <div class="relative flex-1 overflow-hidden">
    <!-- Avatars -->
    <div class="flex gap-3 overflow-x-auto p-2" style="scrollbar-width: none;">
      {#each allUsers as { pic, username, href }}
        {@render avatarCard(pic, username, href)}
      {/each}
    </div>
  </div>

  <!-- Drawer -->
  <Drawer.Root>
    <Drawer.Trigger class="flex flex-col items-center gap-1 shrink-0 p-2 cursor-pointer">
      <div class="size-14 rounded-full bg-white flex items-center justify-center">
        <LayoutGrid class="h-6 w-6 text-muted-foreground" />
      </div>
      <span class="text-[10px] text-muted-foreground">Todas</span>
    </Drawer.Trigger>
    <Drawer.Portal>
      <!-- Background Darkens -->
      <Drawer.Overlay class="fixed inset-0 z-50 bg-black/40" />
      <!-- Drawer Style -->
      <Drawer.Content class="flex flex-col fixed inset-x-0 bottom-0 z-50 rounded-t-2xl border-t-4 bg-background" style="max-height: 80svh;">
        <!-- Drawer Top Line --> 
        <div class="mx-auto my-3 h-2 w-12 rounded-full bg-border"></div>
        <!-- Drawer Content -->
        <div class="flex flex-col gap-6 overflow-y-auto p-5 ">
          {#each categories as cat}
            <div class="flex flex-col gap-3">
              <!-- Category Title -->
              <div class="flex items-center gap-3">
                <div class="h-px flex-1 bg-border"></div>
                <span class="text-xs font-bold uppercase text-primary">{cat.name}</span>
                <div class="h-px flex-1 bg-border"></div>
              </div>
              <!-- Users Grid -->
              <div class="grid grid-cols-3 gap-3">
                {#each cat.users as { pic, username, href }}
                  {@render avatarCard(pic, username, href)}
                {/each}
              </div>
            </div>
          {/each}
        </div>
      </Drawer.Content>
    </Drawer.Portal>
  </Drawer.Root>
</div>