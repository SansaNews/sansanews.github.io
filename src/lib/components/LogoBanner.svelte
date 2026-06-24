<script lang="ts">
import { asset, resolve } from "$app/paths";

let { class: className, width = 464, height = 96 } = $props();
</script>

<a href={resolve("/")}>
  <img
    src={asset("/brand/sansanews_banner_black.svg")}
    class={className}
    {width}
    {height}
    alt="SansaNews Logo"
  />
</a>
