<script lang="ts">
import { Github, Instagram } from "@lucide/svelte";

interface Props {
	name: string;
	github?: string;
	instagram?: string;
}

let { name, github, instagram }: Props = $props();
</script>

<div class="inline p-0">
  {#if github}
    <a href={github} class="mr-2 inline" target="_blank" rel="noopener noreferrer">
      <Github class="inline h-3 w-3 text-muted-foreground" />
      <span class="inline text-xs text-muted-foreground">{name}</span>
    </a>
  {/if}

  {#if instagram}
    <a href={instagram} class="inline" target="_blank" rel="noopener noreferrer">
      <Instagram class="inline h-3 w-3 text-muted-foreground" />
      <span class="inline text-xs text-muted-foreground">{name}</span>
    </a>
  {/if}
</div>
