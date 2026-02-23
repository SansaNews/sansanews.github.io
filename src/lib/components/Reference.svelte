<script lang="ts">
  import { Github } from "@lucide/svelte";

  let { name, github } = $props();
</script>

<div class="inline p-0">
  <a href={github} class="inline"
    ><Github class="text-muted-foreground inline h-3 w-3" />
    <p class="text-muted-foreground inline text-xs">{name}</p>
  </a>
</div>
