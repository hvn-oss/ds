# ElevenLabs visual reference audit

Research for [#15](https://github.com/hvn-oss/ds/issues/15), part of the map [#12](https://github.com/hvn-oss/ds/issues/12) "hvn visual identity: foundations and icons". ElevenLabs is the second reference for the **dashboard and home** layout. Beside is the marketing reference and Attio is the app reference.

## Answer in one line

The ElevenLabs app is near-monochrome. It uses neutral greys with no colour cast: a `#fafafa` sidebar, a `#ffffff` canvas and `#f3f3f3` tiles. Buttons are near-black (`#111`). The type pairs Inter for the UI with a tight, bold grotesk (Waldenburg) for page titles. Radius is 8 to 16px, with hairline borders and almost no shadow. Colour appears only in illustrations, status and data, so hvn can take this structure and add blue as its single brand accent.

## Method and sources

- I reviewed about 50 ElevenLabs web screens on Mobbin (`search_screens`, web platform) and looked at the images, not just the metadata. The coverage was home, the Agents dashboard, the API analytics, voice library, files, dubbing, settings, workspace settings, the text-to-speech editor, Studio, the account menu, modals and one dark-mode screen.
- I sampled colours from the 1920px Mobbin images, taking the most common colour in each region with Pillow. JPEG compression adds ±1–2 to each channel, so these hex values are close estimates, not tokens.
- **Sizes are estimates.** Mobbin's 1920px images look like downscaled 2× captures. The CSS px values below assume a viewport of about 1440px (1 CSS px ≈ 1.33 image px). Treat them as ±2px.
- I read the type scale, font files and palette hints directly from the ElevenLabs marketing site CSS (`elevenlabs.io`, `/_next/static/css/*.css`, fetched 2026-11-12). The app is behind a login, so its CSS was not available. Where the two disagree, the screenshots of the app are the evidence.

### Screens cited

| Ref | Screen |
| --- | --- |
| [H1] | [Home, light, sidebar expanded](https://mobbin.com/screens/fea6cda5-accc-49ce-a810-efcfce77e208) |
| [H2] | [Home with the "More tools" flyout](https://mobbin.com/screens/ffd32fad-46fd-42c1-b38c-fc27ab260b8f) |
| [H3] | [Home with the sidebar collapsed to an icon rail and the Files panel open](https://mobbin.com/screens/ecdfd399-91f3-4c71-b33d-8d7015840fb1) |
| [H4] | [Home with the account menu (Upgrade CTA)](https://mobbin.com/screens/c7e29895-60f2-4780-9c4d-05988e1eadf6) |
| [H5] | [Home with the account menu and workspace switcher](https://mobbin.com/screens/c64a1c4f-89dc-4e6a-8a57-c76e0707b25e) |
| [A1] | [Agents dashboard with KPI strip and chart](https://mobbin.com/screens/fb751167-58a4-4dd1-8713-23d266015a3e) |
| [A2] | [Agents dashboard with date-range picker](https://mobbin.com/screens/dca603f3-4beb-4a71-8e63-42baaef3584d) |
| [A3] | [API analytics: usage](https://mobbin.com/screens/e7f2ccad-19e6-422a-aecc-a2f2b5608d87) |
| [A4] | [Agent editor](https://mobbin.com/screens/ed66c02b-8a0c-404c-b1bb-53af89f87dda) |
| [A5] | [Users with side sheet](https://mobbin.com/screens/e5619492-dfcd-4ad4-9fc9-d4c0cdd58c6d) |
| [A6] | [Conversation history with search popover](https://mobbin.com/screens/ff8a9252-a7ca-400c-9161-915aa868a91f) |
| [V1] | [Voice library results](https://mobbin.com/screens/cbab6b0b-183b-464b-9d0d-9799547837c7) |
| [V2] | [Voice library with filters popover and featured cards](https://mobbin.com/screens/c1f080fb-48aa-4302-a32c-e115af8dfdfd) |
| [V3] | [Voice library skeleton loading](https://mobbin.com/screens/c219ef4e-70f6-4fe7-81f3-c761e34884cd) |
| [V4] | [Copy voice modal](https://mobbin.com/screens/d60f2063-b563-4375-8542-ff6e97d1c53e) |
| [V5] | [Manage collections modal](https://mobbin.com/screens/cc29f86d-72a2-458b-916d-b3f79bfb0862) |
| [F1] | [Files table with upload toast](https://mobbin.com/screens/dd75bcbc-6cee-4cd1-b9ca-46b600ef692f) |
| [D1] | [Dubbing list](https://mobbin.com/screens/d12526fc-0e22-4b65-8f12-d717a600f90a) |
| [T1] | [Templates history (image cards)](https://mobbin.com/screens/e66a2ed3-486c-42b4-8b02-47d22ec58f64) |
| [S1] | [Settings profile with toast](https://mobbin.com/screens/d75e8dc5-3620-485f-a7e1-1880adb4aeb6) |
| [S2] | [Settings with destructive row](https://mobbin.com/screens/fa6fce5c-2cb1-487a-90a1-ef0800ad72eb) |
| [S3] | [Workspace settings: notifications card](https://mobbin.com/screens/f131d4c8-7e83-4b01-bd47-39250062dd9c) |
| [S4] | [Workspace settings: members](https://mobbin.com/screens/cfafeb9d-dc83-4a91-888e-32824c1c755f) |
| [S5] | [Audio Native settings (nested cards, code block)](https://mobbin.com/screens/f1105023-7f02-47d7-b414-b9cd9ac31342) |
| [E1] | [Text to speech, Eleven v3](https://mobbin.com/screens/fe8dcb43-f770-4ade-894d-0e187d80b874) |
| [E2] | [Text to speech, sliders](https://mobbin.com/screens/fab28130-f253-4610-883d-370b7eb93121) |
| [E3] | [Text to speech, **dark mode**](https://mobbin.com/screens/e496c9a6-19e9-4f40-9153-eaf40b5636b7) |
| [E4] | [Studio editor](https://mobbin.com/screens/e60fb507-0ca0-4355-b013-03a5763ae962) |
| [E5] | ["What's new in Eleven v3" modal](https://mobbin.com/screens/c74798b6-219f-4022-aafe-fbb79a748bb9) |

## Layout: home and dashboard

- **App shell.** The left sidebar is about 244px wide [H1]. To its right sits a full-height white canvas with a 1px hairline divider (`~#e1e1e1`) between them. A slim top bar (about 46px) shows the breadcrumb or page title on the left. Its right side holds small outlined utility buttons ("Feedback", "Docs", "Ask"), icon buttons and the avatar [H1][A1][F1]. The top bar has no fill and no heavy border; it reads as part of the canvas.
- **Sidebar collapse.** The sidebar can collapse to a roughly 40px icon rail [H3]. A right-hand utility panel (Files) can open as a third column inside a rounded inset surface [H3].
- **Home** [H1][H2]:
  1. a pill announcement ("New · Introducing Flows ›")
  2. a muted eyebrow ("My Workspace") above a large bold greeting ("Good morning, Sam lee")
  3. a row of six **square illustrated tool tiles**, each a grey `#f4f4f4` rounded tile with an illustration and a label below it
  4. two columns, "Latest from the library" (a dense avatar list) and "Create or clone a voice" (tile and text rows), with a small outlined "Explore Library" button
- **Dashboard** [A1][A2][A3]: the page title (or greeting) comes first, then underline tabs and a filter bar of small chips ("+ Create view", "Date Range", "Granularity"). Below that is one bordered card. Its top is a **KPI strip** that doubles as the chart selector: the selected KPI cell is white with a dark underline, and the others sit on `#f7f7f7`. The line chart fills the rest of the card. Secondary metric cards sit in a two-column grid below.
- **Content width.** Content is left-aligned with generous gutters of about 40px from the sidebar. List and table pages run full-width [V1][F1][D1]. Settings content runs in a single column with row dividers [S1]. Form-style settings sit in a narrow centred card of about 460px [S3].
- **Lists over cards.** Dense data is shown as rows, not cards: voices [V1], files [F1], dubs [D1], members [S4]. Cards are kept for grouped settings [S3][S5], KPI and chart containers [A1] and media [T1][V2].

## Navigation

- **Sidebar order** [H1][A1][A3]:
  1. a workspace or product switcher at the top (a bordered pill with an avatar dot and a chevron)
  2. primary items (Home, Voices, Studio, Flows, Files)
  3. a muted group label ("Pinned", "Configure", "Monitor", "Deploy", "Build")
  4. more items
  5. at the bottom, an "Invite team members" promo card, "Developers" and an "Upgrade" button
- **Item metrics.** Items are about 30px tall, with a 16px stroke icon, 14px Inter in near-black, about 8px horizontal padding and an 8px radius [H1].
- **Active state.** The active item is a **neutral fill** (`#efefef` on the `#fafafa` sidebar), with no accent colour, left bar or bold [H1][A3][V1]. Hover uses the same treatment.
- **Group labels.** Labels such as "Pinned" are about 12–13px, sentence case, mid-grey (`~#6b6b70`) and not uppercase [H1].
- **Trailing elements.** Items can end in a small grey "New" or "Alpha" pill, a bordered "+" square or a chevron that opens a flyout menu [H1][H2][A1].
- **Breadcrumbs.** The top bar shows a breadcrumb such as "Voices › Explore" or "Settings › Profile" with a sidebar-toggle icon [V1][S1].
- **Tabs.** Page tabs are text with a 2px near-black underline on the active tab [A1][S4]. A segmented "pill" variant uses a grey fill (`#f4f4f4`) on the active segment [V1].

## Surfaces, cards, borders and elevation

| Surface | Light | Dark [E3] | Evidence |
| --- | --- | --- | --- |
| App canvas | `#ffffff` | `#111111` | [H1][E3] |
| Sidebar | `#fafafa` | `#1d1d1d` | [H1][E3] |
| Nav active and hover fill | `#efefef` | `#303030` | [H1][E3] |
| Tile and muted fill (tool tiles, segment active) | `#f3f3f3`–`#f4f4f4` | — | [H1][V1] |
| Inactive KPI cell | `#f7f7f7` | — | [A1] |
| Hairline border and divider | `~#e6e6e6`–`#ececec` | `~#393939` | [H4][E3] |
| Sidebar divider | `~#e1e1e1` | `~#393939` | [H1][E3] |

- **Hierarchy comes from tone and hairlines, not shadow.** Sidebar and canvas differ by one step (`#fafafa` against `#fff`). Cards on the canvas are white with a 1px light border and little or no shadow [A1][S3][S5].
- **Nested cards** are common. An outer card has a `#fafafa`-ish fill, holds inner white bordered cards and has a radius of about 16px [S5][E2].
- **Radius.**
  - About 6–8px for buttons, inputs, chips and nav items [H1][V1].
  - About 12px for cards and popovers [A1][S3].
  - About 16px for tool tiles and large cards [H1][S5].
  - Full pill for announcements, badges and segmented controls [H1][V1].
  - In the marketing CSS, `border-radius` values cluster at `9999px`, `1rem`, `1.5rem`, `.5rem` and `.75rem`.
- **Shadow** is kept for floating layers: menus [H4], popovers [V2][A2], modals [V4][V5] and toasts [S1]. It is soft and diffuse (estimated `0 4px 24px rgb(0 0 0 / .08–.12)`) and paired with a 1px border. The marketing CSS has a `0 4px 28px 0 rgba(0,0,0,.1)` shadow and a `0 0 1px rgba(0,0,0,.4), 0 1px 1px rgba(0,0,0,.04)` hairline shadow, which look the same.
- **Modal scrim** is a light white wash with a strong **background blur**, not a dark overlay [V4][V5]. The side sheet [A5] uses a light grey scrim with no blur.
- **Toasts** are dark (`~#1a1a1a`), with white text and a check icon, and sit bottom-right [S1][S4].

## Neutrals

- The app uses **pure greys with no colour cast** (R = G = B within JPEG noise): `#fafafa`, `#f4f4f4`, `#efefef`, `#ececec`, `#e1e1e1`; dark `#111111`, `#1d1d1d`, `#303030`, `#393939` [H1][E3]. These match Tailwind `neutral` (`neutral-50 #fafafa`, `neutral-100 #f5f5f5`, `neutral-200 #e5e5e5`, `neutral-900 #171717`, `neutral-950 #0a0a0a`) to within a step. **This supports the map's decision to seed neutrals from Tailwind `neutral`.**
- **Text steps.**
  - Primary text is near-black (`~#111`), for titles, nav and list titles [H1][V1].
  - Secondary text is mid-grey (`~#5f5f63`–`#6b6b70`), for subtitles, the eyebrow and group labels [H1][V1].
  - Tertiary text is `~#9b9b9b`, for disabled chips and placeholders [V1].
- The **marketing site** uses a **warm stone** palette instead: `#FDFCFC`, `#F5F3F1`, `#EBE8E4`, `#D7D2CC`, `#A59F97`, `#777169` and `#44403B` all appear in the CSS. The app does not use it. Only the app is relevant to hvn's dashboard foundations.

## Accent use

- **No brand accent in the chrome.**
  - Primary buttons are **near-black** (`#111111`) with white text and an about 8px radius: "Create Voice", "Create a Dub", "Upload", "Generate speech", "Publish" [V1][D1][F1][E1][A4].
  - Secondary buttons are white with a 1px border [H1][S1].
  - Selected states (nav, segments, tabs, KPI cells, toggles) are all neutral or black [H1][V1][A1][S3].
  - In dark mode the primary inverts to a white fill [E3].
- **Where colour appears:**
  - **Data.** The chart line is blue (`~#2b5fd0`, near Tailwind `blue-600`) with a very pale blue area fill (`#f3f6ff`) [A1]. Multi-series charts use a bright categorical palette [A3].
  - **Status.** Success uses a green-tinted pill and failure a red-tinted pill [A5]. Destructive actions use a red title and a red-outlined button [S2].
  - **Content.** Illustrations on tool tiles [H1], voice avatar gradients [V1] and v3 audio tags in purple [E1].
  - **Feature promotion.** A rainbow gradient edge appears on the "Eleven v3" model selector and the v3 modal [E1][E2][E5].
- The marketing CSS's interactive accent is `#2B7FFF` (`rgb(43 127 255)`, Tailwind v4 `blue-500`), used for focus rings and gradients. `#8EC5FF` (`blue-300`) and `#FB2C36` (`red-500`) also appear. In other words, ElevenLabs already uses Tailwind's v4 palette directly.
- **Takeaway for hvn.** This model maps cleanly onto "blue is the primary". Keep the chrome neutral as ElevenLabs does, and let blue replace ElevenLabs' near-black on primary buttons, focus rings, links, selected states and the first chart series. The rest of the UI keeps its neutral weight, so blue stays the only brand signal.

## Typography

| Role | ElevenLabs | Observed size (est.) | Evidence |
| --- | --- | --- | --- |
| UI and body | **Inter** (variable, 100–900) | 14px rows and nav; 12–13px subtitles and meta | [H1][V1]; CSS `@font-face Inter 100 900` |
| Page title and greeting | **Waldenburg** (KMR / Kometa Type, commercial). A bold, tightly tracked grotesk | about 24–26px, bold, negative tracking | [H1][A1][D1]; CSS `KMR-Waldenburg-{Normal,Buch,Fett,FettHalbschmal}` |
| Section heading ("Latest from the library", "Trending voices") | Inter or Waldenburg, semibold | about 16px | [H1][V2] |
| Code and numerics | **Geist Mono** | — | [S5]; CSS `font-family: Geist Mono` |

- **Marketing type scale** (CSS custom properties `--f-*`, read directly):
  - `heading-01..04` use Waldenburg at weight 300–400, with tracking from `-0.03em` (large) to `-0.01em` (small).
  - `display-01/02` use Waldenburg FH (Halbschmal, semi-condensed) at 700, with line-height 95–100%.
  - `paragraph-01..04` use Inter at 18, 16, 14 and 12px, all with line-height 140% and 0 tracking.
  - `subhead-*` use Waldenburg 700 at 14–22px with `+0.01em`.
- The app uses a **heavier** Waldenburg for page titles than the light 300 weight on the marketing site [H1].
- **Closest OFL variable fonts on Fontsource:**
  - Inter → **Inter** (`@fontsource-variable/inter`) itself. It is OFL and variable.
  - Waldenburg (commercial) → **Inter Tight** (`@fontsource-variable/inter-tight`). It is the closest match to the bold, tight titles, and it pairs natively with Inter. An option with more character is **Schibsted Grotesk** (`@fontsource-variable/schibsted-grotesk`), whose heavier weights look similar. Both are OFL variable fonts.
  - Geist Mono → **Geist Mono** (`@fontsource-variable/geist-mono`). It is OFL and variable.

## Density and spacing rhythm

- **Medium-dense, about a 4px base, mostly 8, 12, 16 and 24px steps.**
  - Nav items are about 30px tall with about 2px between them [H1].
  - Two-line list rows (voices, library) are about 36–40px tall, with an avatar of about 24px [V1][H1].
  - Table rows (files, dubs) are about 44px tall [F1][D1].
  - Settings rows are about 52px tall, with a title over a subtitle and the action button right-aligned [S1].
  - Buttons are about 28–32px tall, with 13–14px medium-weight labels [H1][V1].
  - Filter chips are about 26–28px tall [V1][A1].
- **Section spacing.** About 32–40px between the greeting, tiles and lower sections on home. About 16–24px between the title, tabs and the filter bar on list pages [H1][V1].
- **Icons** are 16px line icons with rounded strokes and joins, in 1.5px-ish strokes [H1][V1]. Visually they are close to Hugeicons stroke-rounded, which hvn has already chosen.
- **Loading** uses shimmering pale-grey skeleton bars that mirror the row layout [V3].

## Implications for hvn foundations

1. **Neutrals.** Seed from Tailwind `neutral`, as the map already says. ElevenLabs' app chrome shows that a pure grey ramp, with no warm stone cast, reads well for a dashboard. Sidebar, canvas and muted fill sit one step apart (about `neutral-50`, white and `neutral-100`).
2. **Primary.** Blue takes the role that ElevenLabs gives near-black: primary buttons, focus ring, selected states and the first chart series. Everything else stays neutral. ElevenLabs' own accent is Tailwind v4 `blue-500` `#2b7fff`, which shows a Tailwind anchor fits.
3. **Shape.** Use about 8px for controls, 12px for cards and popovers, 16px for large tiles and nested containers, plus full pill. This maps onto the current theme's radius tokens (`--radius-element` 0.5rem, `--radius-container` 0.75rem, `--radius-full`). The only gap is the 16px tile and nested-card radius, which sits between `--radius-container` and `--radius-page` (1.5rem). Those values are still placeholders.
4. **Elevation.** Use borders and tonal steps for in-page surfaces, and keep shadow for floating layers (menus, popovers, modals and toasts). Use a blurred light scrim for modals.
5. **Type.** Inter for the UI and Inter Tight (or Schibsted Grotesk) for titles reproduces the ElevenLabs pairing. Body is 14px, meta 12–13px, page title about 24px bold with negative tracking.
6. **Density.** The density is close to Astryx's medium default (30px nav rows, 28–32px controls), which supports keeping Astryx spacing defaults.
7. **Layout.** The home pattern (greeting, a tile grid of primary actions, then two columns of recent items and quick-create) is a strong template for hvn's home. The dashboard pattern (a KPI strip that selects the chart inside one bordered card) is worth recording for a later component slice.
