<script lang="ts">
import { asset } from "$app/paths";

let {
	src,
	alt,
	caption,
	eager = false,
}: {
	src: string;
	alt: string;
	caption?: string;
	eager?: boolean;
} = $props();
</script>

<!-- Recuadro en el que se muestran las imágenes/figuras dentro de las guías -->
<figure class="guide-figure">
  <img src={asset(src)} {alt} loading={eager ? "eager" : "lazy"} decoding="async"
  />
  {#if caption}
    <figcaption>{caption}</figcaption>
  {/if}
</figure>
