<script lang="ts">
import GuideFigure from "$lib/components/guides/GuideFigure.svelte";
</script>

<h3>Conexión habitual</h3>
<ol class="guide-steps">
  <li>
    <p>
      Abre el menú Wi-Fi desde la barra superior y activa el Wi-Fi si hace falta.
    </p>
    <GuideFigure
      src="/guias/eduroam/macos/01-wifi.webp"
      alt="Icono de Wi-Fi en la barra de menú de macOS"
    />
  </li>
  <li>
    <p>Selecciona la red <strong>eduroam</strong> en la lista.</p>
    <GuideFigure
      src="/guias/eduroam/macos/02-redes.webp"
      alt="Lista de redes Wi-Fi en macOS con eduroam"
    />
  </li>
  <li>
    <p>
      Ingresa tu correo institucional (por ejemplo
      <code>nombre.apellido@usm.cl</code>) y tu contraseña.
    </p>
    <GuideFigure
      src="/guias/eduroam/macos/03-credenciales.webp"
      alt="Diálogo de credenciales para conectarse a eduroam en macOS"
    />
  </li>
  <li>
    <p>
      Si aparece la verificación de certificado, pulsa
      <strong>Continuar</strong> e introduce la contraseña de tu Mac si te la
      pide.
    </p>
    <GuideFigure
      src="/guias/eduroam/macos/04-certificado.webp"
      alt="Diálogo de verificación de certificado en macOS"
    />
  </li>
  <li>
    <p>
      Confirma que eduroam aparece como red conectada y prueba abrir un sitio
      web.
    </p>
  </li>
</ol>

<h3>Si pide perfil o no aparece la red</h3>
<ol class="guide-steps">
  <li>
    <p>
      Abre <strong>Preferencias del Sistema → Red</strong> (o Ajustes del
      Sistema → Wi-Fi) desde el menú de redes.
    </p>
    <GuideFigure
      src="/guias/eduroam/macos/05-preferencias.webp"
      alt="Preferencias de red de macOS"
    />
  </li>
  <li>
    <p>
      Entra a <strong>Avanzado</strong> y agrega eduroam a las redes
      preferidas con el botón <strong>+</strong>.
    </p>
    <GuideFigure
      src="/guias/eduroam/macos/06-avanzado.webp"
      alt="Ventana avanzada de Wi-Fi en macOS"
    />
    <GuideFigure
      src="/guias/eduroam/macos/07-agregar-red.webp"
      alt="Agregar red eduroam a redes preferidas en macOS"
    />
  </li>
  <li>
    <p>
      Guarda los cambios, vuelve a seleccionar eduroam e ingresa tus
      credenciales.
    </p>
  </li>
</ol>
