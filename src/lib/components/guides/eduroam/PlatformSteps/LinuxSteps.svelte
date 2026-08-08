<script lang="ts">
import GuideFigure from "$lib/components/guides/GuideFigure.svelte";
</script>

<ol class="guide-steps">
  <li>
    <p>
      Abre el menú Wi-Fi (esquina superior derecha en Ubuntu) y activa el Wi-Fi.
    </p>
    <GuideFigure
      src="/guias/eduroam/linux/01-menu-wifi.webp"
      alt="Menú Wi-Fi del sistema en Ubuntu"
    />
  </li>
  <li>
    <p>Entra a <strong>Todas las redes</strong> (o el listado completo).</p>
    <GuideFigure
      src="/guias/eduroam/linux/02-todas-las-redes.webp"
      alt="Lista de redes inalámbricas en Ubuntu"
    />
  </li>
  <li>
    <p>Selecciona la red <strong>eduroam</strong>.</p>
    <GuideFigure
      src="/guias/eduroam/linux/03-seleccionar-eduroam.webp"
      alt="Selección de la red eduroam en Ubuntu"
    />
  </li>
  <li>
    <p>En el diálogo de autenticación configura:</p>
    <ul>
      <li>
        <strong>Seguridad inalámbrica:</strong> WPA y WPA2 enterprise
      </li>
      <li><strong>Autenticación:</strong> EAP protegido (PEAP)</li>
      <li>
        Marca <strong>No se necesita ningún certificado CA</strong> (o deja el
        certificado en ninguno)
      </li>
      <li><strong>Autenticación interna:</strong> MSCHAPv2</li>
      <li>
        <strong>Nombre de usuario:</strong>
        <code>nombre.apellido@usm.cl</code> (tu correo institucional)
      </li>
      <li><strong>Contraseña:</strong> la de tu cuenta USM</li>
    </ul>
    <GuideFigure
      src="/guias/eduroam/linux/04-autenticacion.webp"
      alt="Diálogo de autenticación eduroam en Linux con PEAP y MSCHAPv2"
    />
  </li>
  <li>
    <p>
      Pulsa <strong>Conectar</strong> y verifica que el estado pase a
      conectado.
    </p>
    <GuideFigure
      src="/guias/eduroam/linux/05-conectado.webp"
      alt="Red eduroam marcada como conectada en Ubuntu"
    />
  </li>
</ol>
