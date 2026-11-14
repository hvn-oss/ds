# Visual identity roadmap

The hvn visual identity ships as a series of small releases, each charted as its own wayfinder map. The first map covers foundations and icons. This doc holds what the later maps need until each one is charted; delete a section once its map exists.

This doc depends on decisions made in earlier maps. When a ticket's decision changes something written here, update this doc in the same session, and link the ticket that made the change.

## What every map inherits

- **Done means released.** A map's destination is a published `@hvn-oss/ds` release in which the Design file, the theme and the docs site agree.
- **Astryx is the base library.** Its component set, props and token names are fixed. Every visual value is hvn's to choose.
- **References.** Beside is the marketing reference: landing structure, sections, fonts, whitespace, neutrals, and desktop and mobile product visuals. Attio is the app reference: density, fonts, layout, neutrals with primary accents, and signup and onboarding. ElevenLabs is a close second for the dashboard and home layout. All three are reviewed through Mobbin.
- **Structure reference only.** The Astryx Figma screenshots in `docs/reference/astryx-design-system/` show how to structure the Design file, not how hvn should look.
- **Frame names carry the variant.** Paper has no reusable components, so each component frame is named by its prop values joined with `/`, such as `primary / md / no-loading / enabled / hover`. The order comes from the component's Astryx props and is specific to each component. A `state` key (`rest`, `hover`, `pressed`, `focus`) always comes last. A true boolean is written as the prop name and a false one as `no-<prop>`. Defaults are always written out. A frame key note at the top-left of the variant grid gives the order. See [Design file structure and frame conventions](https://github.com/hvn-oss/ds/issues/17).
- **Design file layout.** The Design file has one page per category and one artboard per component or template, following the layout in [Design file structure and frame conventions](https://github.com/hvn-oss/ds/issues/17).
- **Light first.** Component frames and template artboards are drawn in light mode only. Dark mode comes after the light set.
- **Visual direction.** hvn is quiet, precise and mostly monochrome. Neutrals and hairlines carry the structure. Blue is the primary colour, used for primary buttons, focus, links and selection. Semantic colours mark status, and categorical hues are for charts, data and icons whose colour means something. Inline UI icons stay neutral. Neutrals are pure grey everywhere. Controls are ≈8px rounded rectangles, and pills are only for chips, badges and segment tracks. Density follows Astryx's medium defaults, and data-heavy views use `sm` controls and `compact` density. Shadows are only for floating layers. See [hvn visual direction](https://github.com/hvn-oss/ds/issues/18).
- **Colour.** Surfaces are flat: a white page and white panels in light mode, with hierarchy from hairlines. Input and secondary-control outlines (`--color-border-emphasized`) are deliberately quiet and fall below WCAG's 3:1 non-text contrast, so components that rely on an outline must add another cue, such as a label, a fill or the focus ring. See [Colour foundation](https://github.com/hvn-oss/ds/issues/19).

## Components

One map per category, each covering every component in that category of the Astryx reference set:

- Action
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
