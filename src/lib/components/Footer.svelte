<script lang="ts">
  import { resolve } from "$app/paths";
  import { Instagram, Github } from "@lucide/svelte";
</script>

<footer
  class="text-muted-foreground col-span-12 lg:col-span-8 lg:col-start-3 grid grid-cols-3 gap-6 border-t-3 border-double p-6 md:gap-8"
>
  <div class="flex flex-col items-start">
    <h4 class="font-heading pb-2">Mapa del Sitio</h4>
    <ul class="text-xs font-medium">
      <li>
        <a class="text-accent underline" href={resolve("/")}>Inicio</a>
      </li>
      <li>
        <a class="text-accent underline" href={resolve("/nosotros")}
          >Sobre Nosotros</a
        >
      </li>
    </ul>
  </div>
  <div class="flex flex-col items-center">
    <h4 class="font-heading pb-2">SansaNews</h4>
    <p class="text-center max-w-sm text-xs font-medium">
      <i>SansaNews</i> es una iniciativa estudiantil que busca centralizar las noticias
      de la USM en un mismo lugar para facilitar su divulgación en la comunidad sansana.
    </p>
  </div>
  <div class="flex flex-col items-end">
    <h4 class="font-heading pb-2">Contacto</h4>
    <ul class="text-xs font-medium">
      <li>
        <a href="https://www.instagram.com/sansanews/" class="flex items-center gap-1">
          <Instagram class="inline h-4 w-4" /> @sansanews
        </a>
      </li>
      <li>
        <a href="https://github.com/SansaNews/sansanews.github.io" class="flex items-center gap-1">
          <Github class="inline h-4 w-4" /> SansaNews
        </a>
      </li>
    </ul>
  </div>
  <div class="col-span-3 text-center text-xs font-medium">
    <p>
      &copy; {new Date().getFullYear()} SansaNews. Todos los derechos reservados.
    </p>
  </div>
</footer>