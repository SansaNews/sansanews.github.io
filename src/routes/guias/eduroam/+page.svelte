<script lang="ts">
import { resolve } from "$app/paths";
import EduroamGuide from "$lib/components/guides/eduroam/EduroamGuide.svelte";
import LogoBanner from "$lib/components/LogoBanner.svelte";
</script>

<main class="prose-page px-10 lg:px-16">
  <div class="mx-auto flex max-w-lg justify-center lg:hidden">
    <LogoBanner class="w-auto" width={1823} height={377} />
  </div>

  <p class="text-muted-foreground text-sm">
    <a href={resolve("/guias")}>Guías</a>
    <span aria-hidden="true"> / </span>
    <span>Eduroam</span>
  </p>

  <section>
    <h1>Conectarse a Eduroam</h1>
    <p>
      Eduroam es la red Wi-Fi institucional de la USM. Con tus credenciales
      puedes conectarte en el campus y en otras instituciones que participen de
      la red.
    </p>
  </section>

  <section>
    <h2>Requisitos previos</h2>
    <p>
      Necesitas una cuenta institucional activa con uno de estos dominios:
    </p>
    <ul>
      <li><code>@usm.cl</code></li>
      <li><code>@sansano.usm.cl</code></li>
      <li><code>@alumnos.usm.cl</code></li>
      <li><code>@externos.usm.cl</code></li>
    </ul>
    <p>
      Usa el correo completo como identidad (por ejemplo
      <code>nombre.apellido@usm.cl</code>) y la contraseña de tu cuenta USM.
    </p>
  </section>

  <EduroamGuide />

  <aside class="guide-note">
    <p>
      Esta guía adapta los instructivos oficiales de la Dirección de
      Tecnologías de la Información. La fuente original está en
      <a
        href="https://dti.usm.cl/eduroam/"
        target="_blank"
        rel="noopener noreferrer">dti.usm.cl/eduroam</a
      >. Si algo no coincide con tu dispositivo, prioriza la información del
      sitio de la DTI.
    </p>
  </aside>

  <section>
    <h2>Soporte técnico</h2>
    <p>
      Si no logras conectarte, contacta a la Mesa de Servicios 360:
    </p>
    <ul>
      <li>
        Portal de requerimientos:
        <a
          href="https://requerimientos.usm.cl/"
          target="_blank"
          rel="noopener noreferrer">requerimientos.usm.cl</a
        >
      </li>
      <li>Teléfono: +56 32 265 4500 (anexo 4500)</li>
    </ul>
  </section>
</main>
