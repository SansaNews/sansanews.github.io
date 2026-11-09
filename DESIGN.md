# DESIGN.md

Este archivo describe las reglas de diseño del _frontend_ de SansaNews. Los _tokens_ están en `src/app.css`.

## Identidad

- El estilo es editorial, como un diario impreso: títulos _serif_, líneas delgadas y separadores `/` en la navegación.
- El color base es un blanco cálido. El color de marca es verde azulado (`#03989E`, el `theme-color`). El _token_ `primary` es una versión más oscura (`#006b72`) para cumplir el contraste AA de WCAG.
- El texto de la interfaz está en español, con etiquetas en mayúscula inicial en cada palabra ("Última Actualización", "Sobre Nosotros").
- Los nombres de proyectos y obras van en cursiva (_SansaNews_).

## Color

Los colores son _tokens_ OKLCH con nombres de shadcn. Usa siempre un _token_. No uses clases `bg-white` ni `gray-*`.

| _Token_            | Uso                                                                   |
| ------------------ | --------------------------------------------------------------------- |
| `background`       | Fondo de la página, barras fijas, degradados de desplazamiento        |
| `foreground`       | Texto del cuerpo                                                      |
| `card`             | Tarjetas de publicaciones y herramientas, filtros, círculos blancos   |
| `primary`          | Elemento activo de navegación, filtro seleccionado, botones, enlaces  |
| `border`           | Todos los bordes y la sombra de las tarjetas (verde azulado, no gris) |
| `muted-foreground` | Metadatos, fechas, elementos inactivos de navegación                  |
| `border/50`        | Relleno de los _skeletons_ (`bg-muted` se parece demasiado al fondo)  |

- Las líneas decorativas usan `bg-primary/40` con `h-0.5`.
- Los estados _hover_ usan `text-primary`. Los filtros también usan `bg-primary/10`.
- Las capas sobre imágenes y videos usan `bg-black/20`, `bg-black/50` y `bg-black/40` (fondo del _drawer_).
- Los _tokens_ `.dark` existen, pero nada activa la clase `dark`. El modo oscuro no está activo.

## Tipografía

- Los títulos usan `font-heading` (Charis SIL, pesos 400 y 700, con cursivas).
- El texto del cuerpo usa la fuente _sans_ por defecto de Tailwind.
- La escala es una cuarta justa (x1.414): `xl` 1.414rem, `2xl` 1.999rem, `3xl` 2.827rem, `4xl` 3.997rem, `5xl` 5.652rem.
- Usa `font-heading text-xl` para los títulos de sección. Agrega `font-bold` para los títulos de tarjeta.
- `.prose-page` define `h1` como `text-2xl` y `h2` como `text-xl`. Sus párrafos están justificados.
- Los enlaces son `text-primary underline` en las páginas de texto y en el pie de página.
- Los metadatos usan `text-xs`. Los nombres de los avatares y las fechas de las publicaciones usan `text-[10px]`.

## Diseño de página

- La página usa una cuadrícula de 12 columnas. En `lg`, el contenido ocupa 8 columnas desde la columna 3.
- `lg` es el único punto de quiebre del diseño. Algunos tamaños también cambian en `sm`.
- Las publicaciones usan una columna. En `lg`, la imagen ocupa 1/3 del ancho de la tarjeta.
- Las herramientas usan una columna, y dos columnas en `lg`.
- Espaciado habitual: `p-4` en tarjetas, `mb-8` entre publicaciones, `gap-6` en cuadrículas y `gap-8` entre secciones de texto.

## Componentes

- **Tarjeta.** `bg-card rounded-lg border-2` más `.card-shadow`. La sombra es un desplazamiento sólido de `4px 4px 0` en el color del borde. Con _hover_, crece a `6px 6px` en 200 ms.
- **Divisor interno.** `border-t-2` separa el pie de la tarjeta. `border-b-2` y `border-r-2` separan la imagen del texto.
- **Divisor de sección.** Una línea, un título centrado `font-heading text-xl` y una segunda línea. El _drawer_ usa un título pequeño, en negrita, en mayúsculas y `text-primary`.
- **Filtro.** Elemento de `ToggleGroup` con `bg-card rounded-md shadow-xs text-sm font-medium`. El estado seleccionado es `bg-primary` con `text-primary-foreground`.
- **Botón principal.** `bg-primary text-primary-foreground rounded-md px-4 py-2 text-xs font-bold` con un ícono `ExternalLink` al final.
- **Avatar.** Redondo, de 48 px en móvil y de 60 px desde `sm`.
- **Íconos.** Lucide (`@lucide/svelte`), de 16 px. Los íconos de los metadatos miden de 12 a 14 px.

## Navegación y comportamiento adaptable

- Escritorio: un logo grande (`h-24`) y luego enlaces de texto separados por `/`, con una línea corta verde azulada a cada lado.
- Móvil: una barra de pestañas fija abajo (ícono y etiqueta) y un encabezado fijo arriba (logo y filtros).
- Las dos barras móviles se ocultan al desplazar hacia abajo y aparecen al desplazar hacia arriba (`hideOnScroll`).
- Las áreas de desplazamiento horizontal ocultan la barra de desplazamiento y muestran degradados en los bordes (`from-background`).
- En móvil, un _drawer_ inferior (`vaul-svelte`, `rounded-t-2xl`, con asa) lista todas las cuentas por categoría.

## Estados e imágenes

- Los _skeletons_ reemplazan todo texto que depende de la hora hasta que el componente se monta.
- El estado vacío usa el componente `Empty` de shadcn, con borde punteado y el ícono `ImageOff`.
- Las imágenes son WebP con `srcset` de 1x, 2x y 3x, y `object-contain`. Solo la primera publicación carga de forma inmediata.
- Un video muestra una miniatura con un ícono blanco de reproducción (opacidad de 80 %). El video carga después de un clic.
- Un carrusel muestra una pequeña insignia redonda en la esquina superior derecha, con el _tooltip_ "Más contenido en Instagram".
