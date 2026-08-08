<script lang="ts">
import { resolve } from "$app/paths";
import type { Guide } from "$lib/guides";

let { guide }: { guide: Guide } = $props();
</script>

<article
  class="card-shadow bg-card flex flex-col overflow-hidden rounded-lg border-2"
>
  <div class="flex flex-1 flex-col gap-3 p-4">
    <div class="flex flex-1 flex-col gap-2">
      <div class="flex items-center gap-2">
        <h2 class="font-heading text-xl font-bold">{guide.title}</h2>
      </div>
      <p class="text-muted-foreground text-sm">{guide.description}</p>
    </div>

    <div class="flex justify-end border-t-2 pt-3">
      <a
        href={`${resolve("/guias")}/${guide.slug}`}
        class="bg-primary text-primary-foreground rounded-md px-4 py-2 text-xs font-bold no-underline"
      >
        Leer guía
      </a>
    </div>
  </div>
</article>
