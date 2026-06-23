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
    <a href={github} class="inline mr-2" target="_blank" rel="noopener noreferrer">
      <Github class="text-muted-foreground inline h-3 w-3" />
      <span class="text-muted-foreground inline text-xs">{name}</span>
    </a>
  {/if}

  {#if instagram}
    <a href={instagram} class="inline" target="_blank" rel="noopener noreferrer">
      <Instagram class="text-muted-foreground inline h-3 w-3" />
      <span class="text-muted-foreground inline text-xs">{name}</span>
    </a>
  {/if}
</div>
