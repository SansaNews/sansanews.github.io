<script lang="ts">
import GuideFigure from "$lib/components/guides/GuideFigure.svelte";
</script>

<h3>Conexión rápida</h3>
<ol class="guide-steps">
  <li>
    <p>
      Abre el menú de Wi-Fi y selecciona la red <strong>eduroam</strong>.
    </p>
    <GuideFigure
      src="/guias/eduroam/windows/01-seleccionar-red.webp"
      alt="Menú de redes Wi-Fi en Windows mostrando eduroam"
    />
  </li>
  <li>
    <p>Pulsa <strong>Conectar</strong>.</p>
    <GuideFigure
      src="/guias/eduroam/windows/02-conectar.webp"
      alt="Diálogo de Windows con el botón Conectar en eduroam"
    />
  </li>
  <li>
    <p>
      Ingresa tu correo institucional (por ejemplo
      <code>nombre.apellido@usm.cl</code>) y tu contraseña. Si Windows pide
      aceptar un certificado, acéptalo para continuar.
    </p>
    <GuideFigure
      src="/guias/eduroam/windows/03-credenciales.webp"
      alt="Ventana de credenciales de red para eduroam"
    />
  </li>
  <li>
    <p>
      Verifica la conexión entrando a un sitio web. Si falla, prueba la
      configuración manual de abajo.
    </p>
  </li>
</ol>

<h3>Si no conecta: configuración manual (Windows 10)</h3>
<p>
  Usa este camino si la red quedó mal guardada o la conexión rápida no funciona.
</p>
<ol class="guide-steps" start={1}>
  <li>
    <p>
      Olvida la red eduroam si ya aparece en redes conocidas: ve a
      <strong>Configuración de Wi-Fi → Administrar redes conocidas</strong> y
      elimina eduroam.
    </p>
    <GuideFigure
      src="/guias/eduroam/windows/10-administrar-redes.webp"
      alt="Administrar redes conocidas en Windows 10"
    />
  </li>
  <li>
    <p>
      Abre el <strong>Panel de control → Redes e Internet → Centro de redes y
      recursos compartidos</strong>, elige
      <strong>Configurar una nueva conexión o red</strong> y luego
      <strong>Conectarse manualmente a una red inalámbrica</strong>.
    </p>
    <GuideFigure
      src="/guias/eduroam/windows/10-conexion-manual.webp"
      alt="Asistente para conectarse manualmente a una red inalámbrica"
    />
  </li>
  <li>
    <p>Configura la red con estos valores:</p>
    <ul>
      <li><strong>Nombre de la red:</strong> eduroam</li>
      <li><strong>Tipo de seguridad:</strong> WPA2-Enterprise</li>
      <li><strong>Tipo de cifrado:</strong> AES</li>
      <li>Marca <strong>Iniciar esta conexión automáticamente</strong></li>
    </ul>
    <GuideFigure
      src="/guias/eduroam/windows/10-agregar-red.webp"
      alt="Formulario para agregar la red eduroam con WPA2-Enterprise"
    />
  </li>
  <li>
    <p>
      Elige <strong>Cambiar la configuración de conexión</strong>, abre la
      pestaña <strong>Seguridad</strong> y entra a
      <strong>Configuración</strong> del método PEAP.
    </p>
    <GuideFigure
      src="/guias/eduroam/windows/10-seguridad.webp"
      alt="Pestaña Seguridad de las propiedades de eduroam"
    />
  </li>
  <li>
    <p>En propiedades de EAP protegido:</p>
    <ul>
      <li>
        Desmarca <strong>Verificar la identidad del servidor validando el
        certificado</strong>
      </li>
      <li>
        Método de autenticación:
        <strong>Contraseña segura (EAP-MSCHAP v2)</strong>
      </li>
      <li>
        En <strong>Configurar…</strong>, desmarca usar el inicio de sesión de
        Windows
      </li>
    </ul>
    <GuideFigure
      src="/guias/eduroam/windows/10-propiedades-peap.webp"
      alt="Propiedades de EAP protegido con validación de certificado desactivada"
    />
    <GuideFigure
      src="/guias/eduroam/windows/10-mschap.webp"
      alt="Configuración de EAP MSCHAPv2 sin usar credenciales de Windows"
    />
  </li>
  <li>
    <p>
      En <strong>Configuración avanzada</strong>, marca
      <strong>Especificar modo de autenticación</strong> y selecciona
      <strong>Autenticación de usuarios</strong>. Acepta todos los diálogos.
    </p>
    <GuideFigure
      src="/guias/eduroam/windows/10-autenticacion-usuarios.webp"
      alt="Modo de autenticación de usuarios en configuración avanzada 802.1X"
    />
  </li>
  <li>
    <p>
      Selecciona eduroam en la lista de Wi-Fi e ingresa tu correo institucional
      y contraseña.
    </p>
    <GuideFigure
      src="/guias/eduroam/windows/10-credenciales.webp"
      alt="Diálogo de autenticación de red pidiendo usuario y contraseña"
    />
  </li>
</ol>
