<script lang="ts">
import GuideFigure from "$lib/components/guides/GuideFigure.svelte";
</script>

<ol class="guide-steps">
  <li>
    <p>
      Activa el Wi-Fi del teléfono y selecciona la red <strong>eduroam</strong>
      entre las redes disponibles.
    </p>
    <GuideFigure
      src="/guias/eduroam/android/01-seleccionar-red.webp"
      alt="Lista de redes Wi-Fi en Android con eduroam disponible"
    />
  </li>
  <li>
    <p>Configura los siguientes valores:</p>
    <ul>
      <li><strong>Método EAP:</strong> PEAP</li>
      <li>
        <strong>Identidad:</strong> tu correo institucional (por ejemplo
        <code>nombre.apellido@usm.cl</code>)
      </li>
      <li><strong>Contraseña:</strong> la de tu cuenta USM</li>
    </ul>
    <GuideFigure
      src="/guias/eduroam/android/02-credenciales.webp"
      alt="Pantalla de configuración eduroam con identidad y contraseña"
    />
  </li>
  <li>
    <p>
      En <strong>Certificado CA</strong>, abre el selector y elige
      <strong>No validar</strong> (puede aparecer como “Don't validate”). Luego
      toca <strong>Ver más</strong> si tu teléfono lo muestra.
    </p>
    <GuideFigure
      src="/guias/eduroam/android/03-certificado-ca.webp"
      alt="Selector de certificado CA en Android"
    />
    <GuideFigure
      src="/guias/eduroam/android/04-no-validar.webp"
      alt="Opción No validar seleccionada en el certificado CA"
    />
  </li>
  <li>
    <p>
      Revisa que <strong>Autenticación de fase 2</strong> esté en
      <strong>MSCHAPV2</strong> y toca <strong>Conectar</strong>.
    </p>
    <GuideFigure
      src="/guias/eduroam/android/05-fase2-conectar.webp"
      alt="Autenticación de fase 2 en MSCHAPV2 y botón Conectar"
    />
  </li>
  <li>
    <p>
      Comprueba la conexión abriendo un sitio web en el navegador. Si no carga,
      olvida la red eduroam y vuelve a intentarlo, o contacta soporte.
    </p>
  </li>
</ol>
