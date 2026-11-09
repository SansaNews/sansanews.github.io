# DESIGN.md

Este archivo describe las reglas de diseño del _frontend_ de SansaNews. Los _tokens_ de color, tipografía y radio están en `src/app.css`.

## Identidad

El estilo es editorial, como el de un diario impreso, por lo que usa títulos _serif_, líneas delgadas y separadores `/` en la navegación. El color base es un blanco cálido y el color de marca es verde azulado (`#03989E`), que también es el `theme-color` del sitio y del manifiesto.

El texto de la interfaz está en español, con mayúscula inicial en cada palabra de las etiquetas, como en «Última Actualización» y «Sobre Nosotros». Los nombres de proyectos y obras van en cursiva, como _SansaNews_.

## Color

Los colores son _tokens_ OKLCH con los nombres de shadcn. Usa siempre un _token_ y no uses clases como `bg-white` o `gray-*`, ya que el sitio depende de los _tokens_ para mantener el contraste.

| _Token_            | Uso                                                                   |
| ------------------ | --------------------------------------------------------------------- |
| `background`       | Fondo de la página, barras fijas y degradados de desplazamiento       |
| `foreground`       | Texto del cuerpo                                                      |
| `card`             | Tarjetas de publicaciones y herramientas, filtros y círculos blancos  |
| `primary`          | Elemento activo de navegación, filtro seleccionado, botones y enlaces |
| `border`           | Todos los bordes y la sombra de las tarjetas, en verde azulado        |
| `muted-foreground` | Metadatos, fechas y elementos inactivos de navegación                 |
| `border/50`        | Relleno de los _skeletons_                                            |

El _token_ `primary` (`#006b72`) es más oscuro que el color de marca, puesto que el texto en `primary` y el texto blanco sobre `primary` deben cumplir el contraste AA de WCAG. Por la misma razón, `muted-foreground` tiene la luminosidad necesaria para alcanzar un contraste de 4,5:1 sobre `background`. Los _skeletons_ usan `border/50`, ya que `bg-muted` se parece demasiado al fondo.

Las líneas decorativas usan `bg-primary/40` con `h-0.5`. Los estados _hover_ usan `text-primary`, y los filtros además usan `bg-primary/10`. Las capas sobre imágenes y videos usan `bg-black/20` y `bg-black/50`, mientras que el fondo del _drawer_ usa `bg-black/40`.

Los _tokens_ `.dark` existen, pero ningún elemento activa la clase `dark`, por lo que el modo oscuro no está activo.

## Tipografía

Los títulos usan `font-heading`, que corresponde a Charis SIL en pesos 400 y 700 con cursivas. El texto del cuerpo usa la fuente _sans_ por defecto de Tailwind.

La escala de tamaños es una cuarta justa (x1.414), con estos valores:

- `xl`: 1.414rem
- `2xl`: 1.999rem
- `3xl`: 2.827rem
- `4xl`: 3.997rem
- `5xl`: 5.652rem

Los títulos de sección usan `font-heading text-xl`, y los títulos de tarjeta agregan `font-bold`. La clase `.prose-page` define `h1` como `text-2xl` y `h2` como `text-xl`, y justifica sus párrafos.

Los enlaces de las páginas de texto y del pie de página usan `text-primary underline`. Los metadatos usan `text-xs`, y los nombres de los avatares y las fechas de las publicaciones usan `text-[10px]`.

## Diseño de página

La página usa una cuadrícula de 12 columnas, y en `lg` el contenido ocupa 8 columnas desde la columna 3. El único punto de quiebre del diseño es `lg`, aunque algunos tamaños también cambian en `sm`.

Las publicaciones usan una columna, y en `lg` la imagen ocupa un tercio del ancho de la tarjeta. Las herramientas usan una columna, que pasa a dos columnas en `lg`.

El espaciado habitual tiene estos valores:

- `p-4` en las tarjetas
- `mb-8` entre publicaciones
- `gap-6` en las cuadrículas
- `gap-8` entre las secciones de texto

## Componentes

- **Tarjeta.** Usa `bg-card rounded-lg border-2` y `.card-shadow`. La sombra es un desplazamiento sólido de `4px 4px 0` en el color del borde, que crece a `6px 6px` en 200 ms con _hover_.
- **Divisor interno.** `border-t-2` separa el pie de la tarjeta, y `border-b-2` o `border-r-2` separan la imagen del texto.
- **Divisor de sección.** Tiene una línea, un título centrado en `font-heading text-xl` y una segunda línea. En el _drawer_, el título es pequeño, en negrita, en mayúsculas y en `text-primary`.
- **Filtro.** Es un elemento de `ToggleGroup` con `bg-card rounded-md shadow-xs text-sm font-medium`. El filtro seleccionado usa `bg-primary` con `text-primary-foreground`.
- **Botón principal.** Usa `bg-primary text-primary-foreground rounded-md px-4 py-2 text-xs font-bold` y termina con el ícono `ExternalLink`.
- **Avatar.** Es redondo y mide 48 px en móvil y 60 px desde `sm`.
- **Íconos.** Son de Lucide (`@lucide/svelte`) y miden 16 px. Los íconos de los metadatos miden entre 12 y 14 px.

## Navegación y comportamiento adaptable

En escritorio, la navegación muestra un logo grande (`h-24`) y, debajo, enlaces de texto separados por `/`, con una línea corta verde azulada a cada lado.

En móvil, la navegación es una barra de pestañas fija en la parte inferior, con ícono y etiqueta, y un encabezado fijo en la parte superior, con el logo y los filtros. Las dos barras se ocultan al desplazar la página hacia abajo y aparecen al desplazarla hacia arriba (`hideOnScroll`). Una barra oculta vuelve a aparecer cuando uno de sus elementos recibe el foco del teclado, para que el usuario vea el elemento enfocado.

Las áreas de desplazamiento horizontal ocultan la barra de desplazamiento y muestran degradados en los bordes con `from-background`. En móvil, un _drawer_ inferior de `vaul-svelte`, con `rounded-t-2xl` y un asa, lista todas las cuentas por categoría.

## Estados e imágenes

Los _skeletons_ reemplazan todo texto que depende de la hora hasta que el componente se monta, ya que el sitio se prerrenderiza y la hora del servidor no coincide con la del cliente. El estado vacío usa el componente `Empty` de shadcn, con borde punteado y el ícono `ImageOff`.

Las imágenes son WebP con `srcset` de 1x, 2x y 3x y usan `object-contain`. Solo la primera publicación carga de forma inmediata, por lo que las demás usan carga diferida.

Un video muestra una miniatura con un ícono blanco de reproducción al 80 % de opacidad, y el video carga solo después de un clic. Un carrusel muestra una insignia pequeña y redonda en la esquina superior derecha, con el _tooltip_ «Más contenido en Instagram».

## Accesibilidad

El sitio apunta al nivel AA de WCAG 2.2, por lo que todo cambio de interfaz debe respetar estas reglas:

- El texto tiene un contraste mínimo de 4,5:1, y los bordes de foco tienen un contraste mínimo de 3:1.
- Los bordes de foco usan `outline-ring` o `ring-ring` con opacidad completa.
- Los controles que solo tienen un ícono llevan un `aria-label` en español.
- Las imágenes decorativas, o las que repiten un texto visible, usan `alt=""`.
- Los enlaces con `target="_blank"` incluyen el texto `sr-only` «(abre en una pestaña nueva)».
- Las transiciones y animaciones agregan `motion-reduce:transition-none` o `motion-reduce:animate-none`.
- Cada ruta define su propio `<title>` y tiene un único `h1`.
