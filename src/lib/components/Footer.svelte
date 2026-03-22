<script lang="ts">
  import { resolve } from "$app/paths";
  import { Instagram, Github } from "@lucide/svelte";
</script>

<footer
  class="text-muted-foreground col-span-12 grid grid-cols-3 gap-2 border-t-3 p-4 lg:col-span-8 lg:col-start-3 lg:gap-8 lg:p-6"
>
  <div class="flex flex-col items-start overflow-hidden">
    <h4 class="font-heading pb-2 text-sm lg:text-base">Mapa del Sitio</h4>
    <ul class="space-y-1 text-xs font-medium">
      <li>
        <a class="text-accent underline" href={resolve("/")}>Noticias</a>
      </li>
      <li>
        <a class="text-accent underline" href={resolve("/herramientas")}
          >Herramientas</a
        >
      </li>
      <li>
        <a class="text-accent underline" href={resolve("/nosotros")}
          >Sobre Nosotros</a
        >
      </li>
    </ul>
  </div>

  <div class="flex w-full flex-col items-center px-1">
    <h4 class="font-heading pb-2 text-sm lg:text-base">Misión</h4>
    <p
      class="w-full max-w-sm text-justify text-[11px] leading-snug font-medium hyphens-auto lg:text-center lg:text-xs lg:leading-normal"
    >
      <i>SansaNews</i> busca centralizar las noticias de la USM en un mismo lugar
      para facilitar su divulgación en la comunidad sansana.
    </p>
  </div>

  <div class="flex flex-col items-end overflow-hidden">
    <h4 class="font-heading pb-2 text-sm lg:text-base">Contacto</h4>
    <ul class="space-y-1 text-xs font-medium">
      <li>
        <a
          href="https://www.instagram.com/sansanews/"
          class="flex items-center gap-1"
        >
          <Instagram class="inline h-3.5 w-3.5 lg:h-4 lg:w-4" /> @sansanews
        </a>
      </li>
      <li>
        <a
          href="https://github.com/SansaNews/sansanews.github.io"
          class="flex items-center gap-1 truncate"
        >
          <Github class="inline h-3.5 w-3.5 lg:h-4 lg:w-4" /> SansaNews
        </a>
      </li>
    </ul>
  </div>

  <div class="col-span-3 mt-4 text-center text-xs font-medium lg:mt-2">
    <p>
      &copy; {new Date().getFullYear()} SansaNews. Todos los derechos reservados.
    </p>
  </div>
</footer>

