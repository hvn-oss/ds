# Visual identity roadmap

The hvn visual identity ships as a series of small releases, each charted as its own wayfinder map. The first map covers foundations and icons. This doc holds what the later maps need until each one is charted; delete a section once its map exists.

## What every map inherits

- **Done means released.** A map's destination is a published `@hvn-oss/ds` release in which the Design file, the theme and the docs site agree.
- **Astryx is the base library.** Its component set, props and token names are fixed. Every visual value is hvn's to choose.
- **References.** Beside is the marketing reference: landing structure, sections, fonts, whitespace, neutrals, and desktop and mobile product visuals. Attio is the app reference: density, fonts, layout, neutrals with primary accents, and signup and onboarding. ElevenLabs is a close second for the dashboard and home layout. All three are reviewed through Mobbin.
- **Structure reference only.** The Astryx Figma screenshots in `docs/reference/astryx-design-system/` show how to structure the Design file, not how hvn should look.
- **Frame names carry the variant.** Paper has no reusable components, so each component frame is named by its prop values, such as `Primary, SM, Hover, Default, none`. The key is specific to each component, comes from its Astryx props in a fixed order, and sits as a note beside its section. Defaults are written out (`Default`, `none`), never omitted.
- **Light first.** Component and template frames are drawn in light mode only. Dark-mode frames come after the light set.

## Components

One map per category, each covering every component in that category of the Astryx reference set:

- Action
- Data Input
- Content
- Overlay
- Feedback and Status
- Table and List
- Container and Layout
- Chat

## Templates

Only the templates the references inform:

- Landing page (Beside)
- Auth and onboarding (Attio)
- App shell and dashboard (ElevenLabs, Attio)
- Table views (Attio)

The rest of the Astryx templates are out of scope.

## Landing page and docs shell

The look and feel of the docs site itself, meaning the landing page and the docs frame (navbar, sidebar, page chrome), restyled in the hvn visual identity.
