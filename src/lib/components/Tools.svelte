<script lang="ts">
import { ExternalLink } from "@lucide/svelte";
import toolsJSON from "#lib/assets/tools.json";

const toolList = toolsJSON.tools;
</script>

<div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
  {#each toolList as tool (tool.title)}
    <article
      class="card-shadow flex flex-col overflow-hidden rounded-lg border-2 bg-card"
    >
      <!-- Tool Image -->
      <!-- biome-ignore lint/a11y/useAnchorContent: hidden duplicate of the "Visitar" link -->
      <a
        href={tool.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-hidden="true"
        tabindex="-1"
      >
        <img
          src={tool.image}
          alt={tool.alt}
          class="bg-muted {tool.aspectRatio} w-full border-b-2 object-cover object-center"
        />
      </a>

      <div class="flex flex-1 flex-col gap-3 p-4">
        <!-- Title and Description -->
        <div class="flex flex-1 flex-col gap-1">
          <h2 class="font-heading text-xl font-bold">{tool.title}</h2>
          <p class="text-sm text-muted-foreground">{tool.description}</p>
        </div>

        <!-- Author and Link -->
        <div class="flex items-center justify-between border-t-2 pt-3">
          <span class="text-xs text-muted-foreground italic">{tool.author}</span
          >
          <a
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center rounded-md bg-primary px-4 py-2 text-xs font-bold text-primary-foreground"
            aria-label="Visitar {tool.title} (abre en una pestaña nueva)"
          >
            <p class="whitespace-nowrap">Visitar</p>
            <ExternalLink class="ml-1 h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </article>
  {/each}
</div>
