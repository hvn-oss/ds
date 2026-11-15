# Visual identity roadmap

The hvn visual identity ships as a series of small releases, each charted as its own wayfinder map. The first map covers foundations and icons. This doc holds what the later maps need until each one is charted; delete a section once its map exists.

This doc depends on decisions made in earlier maps. When a ticket's decision changes something written here, update this doc in the same session, and link the ticket that made the change.

## What every map inherits

- **Done means released.** A map's destination is a published `@hvn-oss/ds` release in which the Design file, the theme and the docs site agree.
- **Astryx is the base library.** Its component set, props and token names are fixed. Every visual value is hvn's to choose.
- **References.** Beside is the marketing reference: landing structure, sections, fonts, whitespace, neutrals, and desktop and mobile product visuals. Attio is the app reference: density, fonts, layout, neutrals with primary accents, and signup and onboarding. ElevenLabs is a close second for the dashboard and home layout. All three are reviewed through Mobbin.
- **Structure reference only.** The Astryx Figma screenshots in `docs/reference/astryx-design-system/` show how to structure the Design file, not how hvn should look.
- **Frame names carry the variant.** Paper has no reusable components, so each component frame is named by its prop values joined with `/`, such as `primary / md / no-icon-only / hover`. The order comes from the component's Astryx props and is specific to each component. A `state` key always comes last and holds everything that is mutually exclusive in time: `rest`, `hover`, `pressed`, `focus`, `disabled`, `loading` and `open`. Each component lists only the values it paints, so disabled and loading are never keys of their own. A true boolean is written as the prop name and a false one as `no-<prop>`. Defaults are always written out. A frame key note at the top-left of the variant grid gives the order. See [Design file structure and frame conventions](https://github.com/hvn-oss/ds/issues/17).
- **Frame coverage.** The variant grid draws every combination of its keys, with no curated subsets. A prop is a key only if it changes the component's own fill, outline, text colour or box size. Content slots, elevation and container-driven values such as `layout: fill` go in example panels. A component built from another, such as ButtonGroup or a menu trigger, draws only the states it adds to its parts. A prop that collides with a `state` value is renamed, as ToggleButton's `isPressed` becomes `toggled`. See [Component frame coverage](https://github.com/hvn-oss/ds/issues/37).
- **Design file layout.** The Design file has one page per category and one artboard per component or template, following the layout in [Design file structure and frame conventions](https://github.com/hvn-oss/ds/issues/17).
- **Light first.** Component frames and template artboards are drawn in light mode only. Dark mode comes after the light set.
- **Dark values follow the theme.** Paper tokens hold light values only, so the foundation artboards draw dark mode with literal values copied from the theme, never typed by hand. When a theme change touches a colour, border or shadow value, resync the foundation artboards in the same map. See [Dark mode on the foundation artboards](https://github.com/hvn-oss/ds/issues/28).
- **Visual direction.** hvn is quiet, precise and mostly monochrome. Neutrals and hairlines carry the structure. Blue is the primary colour, used for primary buttons, focus, links and selection. Semantic colours mark status, and categorical hues are for charts, data and icons whose colour means something. Inline UI icons stay neutral. Neutrals are pure grey everywhere. Controls are ≈8px rounded rectangles, and pills are only for chips, badges and segment tracks. Density follows Astryx's medium defaults, and data-heavy views use `sm` controls and `compact` density. Shadows are only for floating layers. See [hvn visual direction](https://github.com/hvn-oss/ds/issues/18).
- **Colour.** Surfaces are flat: a white page and white panels in light mode, with hierarchy from hairlines. Input and secondary-control outlines (`--color-border-emphasized`) are deliberately quiet and fall below WCAG's 3:1 non-text contrast, so components that rely on an outline must add another cue, such as a label, a fill or the focus ring. The error toast surface (`--color-background-error-inverted`) is red 40 in light mode and red 45 in dark mode, replacing Astryx's off-palette default, so toast text is white in both modes. See [Colour foundation](https://github.com/hvn-oss/ds/issues/19).
- **Typography.** Inter is used for text and headings, and JetBrains Mono for code. The scale is base 14 at ratio 1.2, and body text is 14/20. Headings are medium (500), not semibold, so h4 looks the same as a label; hierarchy comes from position and spacing. Display styles are pinned at 64, 48 and 36px, in regular weight with −0.03em tracking. Supporting text is 12/20. See [Typography foundation](https://github.com/hvn-oss/ds/issues/20). On coarse pointers below `lg`, the base rises to 16 at the same ratio, so the whole ramp grows ×1.14. Display sizes step down by width only: 48/36/30 from `md` to `lg`, and 36/32/30 below `md`. See [Touch and narrow type adaptation](https://github.com/hvn-oss/ds/issues/30).
- **Touch sizing.** The same coarse-pointer rule grows controls ×1.14 with the type: `--size-element-sm|md|lg` go from 28/32/36 to 32/36/40px, rounded to the 4px grid, and Astryx's invisible 44px hit area covers the rest of the tap target. This replaces the "control sizes aren't touched" line in Touch and narrow type adaptation. The tokens are shared, so inputs and every other sized control inherit it. Padding, gaps, radii and Toolbar's 44px minimum height don't change. Component artboards stay at desktop size. A shared **Touch sizing** artboard on the Foundations page shows each category's sized controls next to their touch sizes, and each map adds its own controls to it. The docs Foundations page has a matching table rendered from the theme. See [Touch sizing for controls](https://github.com/hvn-oss/ds/issues/47).
- **Shape and elevation.** Radii are 4 (inner), 8 (element), 16 (container) and 24 (page and chat), so cards, menus and dialogs are rounder than controls. Every border is 1px. Hairlines use `--color-border`, and inputs and secondary controls use a 1px `--color-border-emphasized` outline; secondary buttons and selector triggers are outlined, not tinted. Floating layers get a ring-and-shadow scale: each level adds a 1px ring to a soft shadow, so menus, toasts and dialogs keep an edge in dark mode. The selected SegmentedControl item keeps its `shadow-low` lift, the one in-page exception to "shadows only on floating layers". See [Shape and elevation foundation](https://github.com/hvn-oss/ds/issues/21).
- **Icons.** Icons are free Hugeicons (stroke rounded), drawn through Astryx's semantic icon names. Components never pick a glyph themselves. In component frames, draw each icon at the size its Astryx component uses (status icons are mostly `sm`; Link and chat metadata use `xsm`). Use the stock 1.5 stroke on the 24 grid, which scales with the glyph: 1px at `sm` and 0.75px at `xsm`. Don't thicken strokes at small sizes. Status icons are outlines in `--color-icon-<status>`, so warning is the olive yellow 40, not the bright warning fill. See [Semantic icon mapping](https://github.com/hvn-oss/ds/issues/22) and [Icon and semantic mapping frames](https://github.com/hvn-oss/ds/issues/23).
- **Theme component overrides.** The theme keeps only token-based component overrides. Badges, banners and field status messages use the categorical pairs, the destructive Button uses the red pair, and the ProgressBar and Switch off-state tracks use `--color-track`. Input status borders and icons follow `--color-text-<status>`, as in Astryx. Motion keeps Astryx's defaults. Each component map reviews the overrides for its own components. See [Update the hvn theme to the new foundations and Hugeicons](https://github.com/hvn-oss/ds/issues/25).
- **Tokens in SVGs.** Write icon SVGs with token strokes (`stroke="var(--color-icon-primary)"`) from the start. Paper can't rebind a path's stroke to a token afterwards, so fixing a literal hex means rewriting the SVG. Paper renders `currentColor` as black, so `inherit` glyphs use `var(--color-text-primary)`. Chart colours (`--color-data-*`) appear on the Colour artboard only and are not Design file tokens. See [Build the foundation pages in the Design file](https://github.com/hvn-oss/ds/issues/24).
- **Docs render from the theme.** The docs Foundations pages draw swatches and specimens with the theme's tokens, and print values resolved from the theme, so a theme change updates them without an edit. The semantic icon table is tested against the theme's icon registry. Docs examples that need an icon outside the semantic names use a free Hugeicon wrapped for Astryx `Icon`; the docs site no longer uses `lucide-react`. See [Foundations section on the docs site](https://github.com/hvn-oss/ds/issues/26).

## Components

One map per category, each covering every component in that category of the Astryx reference set. On the docs site, the Components section groups its pages by Astryx's own categories, so Container and Layout are separate groups even though they share a map. Each map adds its pages to its category's group in `components/meta.json`. See [Components catalog by category](https://github.com/hvn-oss/ds/issues/42).

- Data Input
- Content
- Navigation
- Overlay
- Feedback and Status
- Table and List
- Container and Layout
- Chat

## Templates

Only the templates the references inform:

- Landing page (Beside). Marketing shares the app's theme and tokens, and differs only in composition: `display-*` text styles, Beside's section rhythm (80→112px) and framed product visuals. This map decides whether marketing gets any decorative gradient. See [hvn visual direction](https://github.com/hvn-oss/ds/issues/18).
- Auth and onboarding (Attio)
- App shell and dashboard (ElevenLabs, Attio)
- Table views (Attio)

The rest of the Astryx templates are out of scope.

## Landing page and docs shell

The look and feel of the docs site itself, meaning the landing page and the docs frame (navbar, sidebar, page chrome), restyled in the hvn visual identity.
