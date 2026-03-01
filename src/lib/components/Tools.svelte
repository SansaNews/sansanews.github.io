<script lang="ts">
  import { ExternalLink } from "@lucide/svelte";
  import { type Tool } from "$lib/tools";
  import toolsJSON from "$lib/assets/tools.json";

  const toolList: Tool[] = toolsJSON.tools;
</script>

<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
  {#each toolList as tool}
    <article class="card-shadow flex flex-col overflow-hidden rounded-lg border-2 bg-card">
      
      <!-- Tool Image -->
      <a
        href={tool.url}
        target="_blank" 
        rel="noopener noreferrer" 
        aria-label={tool.title}>
        <img 
          src={tool.image} 
          alt={tool.alt} 
          class="aspect-video w-full border-b-2 object-contain bg-muted"
        />
      </a>

      <div class="flex flex-1 flex-col gap-3 p-4">
        
        <!-- Title and Description -->
        <div class="flex flex-1 flex-col gap-1">
          <h2>{tool.title}</h2>
          <p class="text-sm text-muted-foreground">{tool.description}</p>
        </div>

        <!-- Author and Link -->
        <div class="flex items-center justify-between border-t-2 pt-3">
          <span class="text-xs italic text-muted-foreground">{tool.author}</span>
          <a
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center rounded-md bg-primary px-4 py-2 text-xs font-bold text-primary-foreground"
            aria-label={tool.title}
          >
            <p class="whitespace-nowrap">Visitar</p>
            <ExternalLink class="ml-1 h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </article>
  {/each}
</div>

<style>
  h2 {
    font-family: var(--font-heading);
    font-size: 1.25rem;
    font-weight: 700;
  }
  .card-shadow {
    box-shadow: 4px 4px 0px 0px var(--border);
    transition: box-shadow 200ms;
  }
  .card-shadow:hover {
    box-shadow: 6px 6px 0px 0px var(--border);
  }
</style>