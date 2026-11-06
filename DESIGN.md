# DESIGN.md

This file describes the design rules that the SansaNews frontend uses. The tokens are in `src/app.css`.

## Identity

- The look is editorial, like a printed newspaper: serif headings, thin rules, and `/` separators in the navigation.
- The base color is a warm off-white. The accent color is teal (`#03989E`, the `theme-color`).
- The UI text is in Spanish with Title Case labels ("Última Actualización", "Sobre Nosotros").
- Names of projects and works are in italics (*SansaNews*).

## Color

Colors are OKLCH tokens with shadcn names. Always use a token. Do not use `bg-white` or `gray-*` classes.

| Token | Use |
|---|---|
| `background` | Page background, fixed bars, scroll fades |
| `foreground` | Body text |
| `card` | Post cards, tool cards, filter pills, white circles |
| `primary` | Active navigation item, selected filter, buttons, all links |
| `border` | All borders and the card shadow (teal, not gray) |
| `muted-foreground` | Metadata, dates, inactive navigation items |
| `border/50` | Skeleton fill (`bg-muted` is too close to the background) |

- Decorative rules use `bg-primary/40` at `h-0.5`.
- Hover states use `text-primary`. Filter pills also use `bg-primary/10`.
- Overlays on media use `bg-black/20`, `bg-black/50`, and `bg-black/40` (drawer backdrop).
- The `.dark` tokens exist, but nothing sets the `dark` class. Dark mode is not active.

## Typography

- Headings use `font-heading` (Charis SIL, 400 and 700, with italics).
- Body text uses the default Tailwind sans font. `font-body` (Source Serif 4, variable) is defined in `src/app.css`, but no element uses it.
- The scale is a perfect fourth (x1.414): `xl` 1.414rem, `2xl` 1.999rem, `3xl` 2.827rem, `4xl` 3.997rem, `5xl` 5.652rem.
- Use `font-heading text-xl` for section titles. Add `font-bold` for card titles.
- `.prose-page` sets `h1` to `text-2xl` and `h2` to `text-xl`. Its paragraphs are justified.
- Links are `text-primary underline` on prose pages and in the footer.
- Metadata uses `text-xs`. Avatar names and post dates use `text-[10px]`.

## Layout

- The page uses a 12-column grid. On `lg`, content uses 8 columns from column 3.
- `lg` is the only layout breakpoint. A few sizes also change at `sm`.
- Posts use one column. On `lg`, the image takes 1/3 of the card width.
- Tools use one column, and two columns on `lg`.
- Common spacing: `p-4` in cards, `mb-8` between posts, `gap-6` in grids, `gap-8` between prose sections.

## Components

- **Card.** `bg-card rounded-lg border-2` plus `.card-shadow`. The shadow is a hard `4px 4px 0` offset in the border color. On hover, it grows to `6px 6px` in 200 ms.
- **Inner divider.** `border-t-2` separates the card footer. `border-b-2` and `border-r-2` separate the media from the text.
- **Section divider.** A rule, a centered `font-heading text-xl` title, and a second rule. The drawer uses a small, bold, uppercase `text-primary` title.
- **Filter pill.** `ToggleGroup` item with `bg-card rounded-md shadow-xs text-sm font-medium`. The selected state is `bg-primary/80`.
- **Primary button.** `bg-primary text-primary-foreground rounded-md px-4 py-2 text-xs font-bold` with a trailing `ExternalLink` icon.
- **Avatar.** Round, 48 px on mobile and 60 px from `sm`.
- **Icons.** Lucide (`@lucide/svelte`), 16 px. Icons in metadata are 12 to 14 px.

## Navigation and responsive behavior

- Desktop: a large logo (`h-24`), then text links separated by `/`, with a short teal rule on each side.
- Mobile: a fixed bottom tab bar (icon and label) and a fixed top header (logo and filter pills).
- Both mobile bars hide on scroll down and show on scroll up (`hideOnScroll`).
- Horizontal scroll areas hide the scrollbar and show gradient fades (`from-background`).
- On mobile, a bottom drawer (`vaul-svelte`, `rounded-t-2xl`, grab handle) lists all accounts by category.

## States and media

- Skeletons replace any text that depends on the time until the component mounts.
- The empty state uses shadcn `Empty` with a dashed border and the `ImageOff` icon.
- Images are WebP with 1x, 2x, and 3x `srcset`, and `object-contain`. Only the first post loads eagerly.
- A video shows a thumbnail with a white play icon (80 % opacity). The video loads after a click.
- A carousel shows a small round badge in the top-right corner, with the tooltip "Más contenido en Instagram".
