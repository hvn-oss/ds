# Action components in the references

Research for [Action components in the references](https://github.com/hvn-oss/ds/issues/34), under the map [hvn visual identity: Action components](https://github.com/hvn-oss/ds/issues/33). It covers how Attio (app reference) and ElevenLabs (close second) draw the nine Action components, and how Beside (marketing reference) draws call-to-action buttons.

**Gist:** Both apps draw actions as small, quiet, 8px-ish rounded rectangles about 28–30px tall. The primary is the only filled button: Attio's is blue, ElevenLabs' is near-black. Secondary buttons are white with a hairline. Menus are white 8–12px panels with a ring and a soft shadow, about 30px rows, full-bleed hairline separators, a rounded inset hover fill, muted text shortcuts and trailing chevrons for submenus. Segmented controls in both apps sit on a grey **rounded-rectangle** track, not a pill, with a white raised thumb. Split buttons (primary + chevron) are the only ButtonGroup pattern. Attio's bulk-action bar is a floating tray of white buttons. Beside's marketing CTAs are near-black and white **pills** about 44px tall. The main divergences from the roadmap are the near-black primaries (ElevenLabs, Beside), the rectangle segment tracks, Attio's raised (shadowed) secondary buttons, neutral destructive items in ElevenLabs menus, and Beside's pill CTAs.

## Sources and method

- **Mobbin** (web screens and website sections, fetched 2026-11-14). The full-resolution images were downloaded and examined, not just the metadata. App captures are 1920px wide from a 1440px viewport, so image px ÷ 1.333 gives CSS px. Values marked **≈** come from pixel runs and colour histograms on those images (ImageMagick) and are accurate to about ±1–2px and ±2 per colour channel. JPEG edges blur, so heights may read 1px short.
- **Earlier audits**, for exact CSS values already gathered: [Attio visual reference audit](https://github.com/hvn-oss/ds/blob/research/attio-visual-audit/docs/research/attio-visual-audit.md) (Attio's production CSS: shadows, fills, primary blue), [ElevenLabs visual reference audit](https://github.com/hvn-oss/ds/blob/research/elevenlabs-visual-audit/docs/research/elevenlabs-visual-audit.md) and [Beside visual audit](https://github.com/hvn-oss/ds/blob/research/beside-visual-audit/docs/research/beside-visual-audit.md) (Beside's production CSS). Values quoted from them are cited as such.
- Static screenshots cannot show hover, pressed or focus transitions. Where a state is not visible in a capture, this brief says so instead of guessing.

### Mobbin items cited

| Ref | Item |
|---|---|
| A1 | [Attio: views dropdown with a row's more menu as a submenu](https://mobbin.com/screens/a1cca18c-6359-46c4-a986-a46332943a05) |
| A2 | [Attio: list more menu (submenu, destructive)](https://mobbin.com/screens/9c75335a-0dff-41a5-9b00-f5aa76333616) |
| A3 | [Attio: note more menu, list/grid view toggle, "New note"](https://mobbin.com/screens/d540b3e0-e79c-4e09-afb2-c6b19d117ebe) |
| A4 | [Attio: bulk-action bar, 3 selected](https://mobbin.com/screens/5bb2a956-b937-497e-bd31-afc2616bb111) |
| A5 | [Attio: bulk-action bar with "More" open](https://mobbin.com/screens/1a0a43ec-94de-408f-b53a-338c4674a124) |
| A6 | [Attio: bulk remove confirmation dialog](https://mobbin.com/screens/f6aa5c36-a41b-432f-a620-5248fb8bc7b0) |
| A7 | [Attio: attribute row more menu](https://mobbin.com/screens/0e7546c9-38dc-4345-a173-b3f48422bb76) |
| A8 | [Attio: filter popover, focused "Reset filters"](https://mobbin.com/screens/8e8972d6-e28e-4456-9908-c6b87b6f610f) |
| A9 | [Attio: "Delete Object" destructive button](https://mobbin.com/screens/db0ba54b-3c24-4b83-adfd-ebfff84a5ec3) |
| A10 | [Attio: select menu with checked item](https://mobbin.com/screens/b1c2a264-b716-47ee-bf76-e701808b1fa9) |
| A11 | [Attio: keyboard shortcuts panel](https://mobbin.com/screens/fa567c5a-616d-4991-88fc-e2a047b5fcfd) |
| A12 | [Attio: sort attribute menu with submenu chevrons](https://mobbin.com/screens/917f8392-3138-467f-be27-3968934828a8) |
| A13 | [Attio: unsaved view toolbar, "Save" split button, focused "Add sort"](https://mobbin.com/screens/bbbc21cd-7563-4ef7-90f0-02e3f8452941) |
| A14 | [Attio: sign in](https://mobbin.com/screens/0c8aa309-0bf7-4c21-9095-d6f5d0db7ba9) |
| A15 | [Attio: create view modal ("Cancel ESC", "Create view ↵")](https://mobbin.com/screens/3c45e6aa-ec62-4872-8420-cb1ac3d6ec1f) |
| A16 | [Attio: billing settings, secondary buttons](https://mobbin.com/screens/62a2bde9-8813-4f4c-bab4-db13d1b3528e) |
| A17 | [Attio: workflow settings, favourite star and "Trigger workflow"](https://mobbin.com/screens/4bade38d-4fff-4d72-adc9-cd22dfbeec16) |
| A18 | [Attio: home prompt menu with search and separator](https://mobbin.com/screens/2ab4f50b-1f84-449f-a009-4fae85f72755) |
| E1 | [ElevenLabs: voice row more menu](https://mobbin.com/screens/315e176f-d647-4d04-9768-37c879777010) |
| E2 | [ElevenLabs: explore row more menu](https://mobbin.com/screens/0de319bf-d4e5-444a-a592-072f42905c7f) |
| E3 | [ElevenLabs: Studio timeline context menu](https://mobbin.com/screens/77014e3b-75e0-463e-a760-9769293d909e) |
| E4 | [ElevenLabs: agent widget settings, segmented control, "Publish" split button](https://mobbin.com/screens/3233daf0-a4c9-435e-b09a-81489a89cc94) |
| E5 | [ElevenLabs: avatar type segmented control](https://mobbin.com/screens/8d17a283-a52c-4d71-8262-38b0157794a5) |
| E6 | [ElevenLabs: "Add URL" modal with segmented control](https://mobbin.com/screens/fc9580c2-dc97-44b6-8065-727c69056018) |
| E7 | [ElevenLabs: account menu with workspace check](https://mobbin.com/screens/31b665b9-7bea-40a1-95f5-8abcef805360) |
| E8 | [ElevenLabs: account menu with "Upgrade"](https://mobbin.com/screens/c7e29895-60f2-4780-9c4d-05988e1eadf6) |
| E9 | [ElevenLabs: Voice Design, "Generating voice…" loading](https://mobbin.com/screens/42681327-edca-46f3-9ca9-de14471ad205) |
| E10 | [ElevenLabs: Voice Changer, disabled "Generate speech"](https://mobbin.com/screens/d4db0e35-bb2f-4f6a-8274-500db669dfad) |
| E11 | [ElevenLabs: Text to Speech, "Generate speech"](https://mobbin.com/screens/bdc2bd46-9875-428a-8e4b-7a407302e03c) |
| E12 | [ElevenLabs: disabled "Share Selected (0)"](https://mobbin.com/screens/f2c44d82-46ba-45e2-833e-87583f5aa68b) |
| E13 | [ElevenLabs: integration modal ("Select All", "Create 3 Tools")](https://mobbin.com/screens/507df2c4-a761-4d7b-9d6e-facec967e85d) |
| E14 | [ElevenLabs: Audio Native pages, outlined button and row kebabs](https://mobbin.com/screens/d479d3e8-5ebf-4ded-8d0f-d76f5f1bae62) |
| B1 | [Beside: "Start using Beside" closing CTA](https://mobbin.com/sites/sections/b8d3bd7a-1740-4c90-9299-6e93280dc6df) |

## Button

| | Attio | ElevenLabs |
|---|---|---|
| Height | **≈ 28px** in toolbars and headers ("Save", "New note", "View settings"; A13, A3). **≈ 30px** in settings, bulk bar and auth ("Delete Object", "Add to List", "Continue"; A9, A4, A14). | **≈ 30px** in headers ("Publish", "Preview", "Feedback"; E4). **≈ 34px** for the main page action ("Generate speech"; E11). |
| Radius | 6–8px ([Attio audit](https://github.com/hvn-oss/ds/blob/research/attio-visual-audit/docs/research/attio-visual-audit.md)). | ≈ 8px. |
| Label | ≈ 13px, weight 500, often with a leading 16px icon ("New note", "View settings", "Import / Export ⌄"). | ≈ 13–14px, weight 500, leading icon optional ("+ Create Voice", "Share"). |
| Primary | **Blue fill**, `#266df0` (CSS; sampled ≈ `#3b6be9`), white label, plus a faint blue drop shadow (CSS). Hover `#215bc4` (CSS). | **Near-black fill**, sampled ≈ `#121212`, white label. No colour anywhere. |
| Secondary | White with a hairline drawn as `inset 0 0 0 1px` and a barely visible "raised" shadow (CSS `0 0 2px #1c28402e, 0 1px 3px #0000000a`). | White with a 1px hairline (≈ `#e5e5e5`), no shadow ("Preview", "Go to settings"; E4, E14). |
| Ghost / text | "Discard changes", "Cancel" are text-only, muted grey (A13, A15). | "Select All" / "Deselect All" are text-only, small (E13). |
| Destructive | **Light red fill**, sampled ≈ `#e76863`, white label ("Delete Object", A9; "Remove from list", A6). Red is used as a fill, not just text. | Not seen as a button in the captures. Menu delete items are neutral (see Menus). |
| Disabled | Primary at a 40% blue tint (CSS, per the Attio audit). | Fill drops to mid-grey with white label ("Generate speech", E10). Outlined buttons keep the hairline and mute label and icon to ≈ 40% (E12). |
| Loading | Not seen. | **No spinner.** The button disables and shows a grey progress fill growing from the left behind a muted "Generating voice…" label (E9). A small ring spinner appears beside "credits remaining", not inside the button (E10, E11). |
| Keyboard hint | Modal footers put the shortcut **inside** the button: "Cancel `ESC`" and "Create view `↵`", where the glyph sits in a slightly lighter chip on the blue fill (A15). | Not seen. |
| Full width | Auth and onboarding: full-width, ≈ 30–32px ("Continue", "Sign in with Google" as secondary; A14). | Not seen outside forms. |

**Icon-only buttons.** Both apps use ghost squares the height of the adjacent buttons. ElevenLabs' row kebab "⋯" is ≈ 30 × 30px; when its menu is open it gets a grey fill ≈ `#dbdbdd`, the only pressed or open state visible in any capture (E1). Attio's kebabs are smaller (≈ 20–24px) inside rows and menus (A1, A7), and its top-bar icons are ≈ 28px ghost squares (A3). Icons are neutral, 16px, stroke style in both.

**Hover, pressed, focus.**
- Hover and pressed fills for buttons cannot be seen in static captures. Attio's CSS defines the neutral overlay steps `#00000005`, `#0000000a` and `#0000001a` and a darker blue `#215bc4` for the primary (Attio audit).
- **Focus (Attio):** a 1px blue border replaces the hairline, plus a soft blue outer ring ("Reset filters", A8; "Add sort", A13). The CSS ring is `#266df0` at 40% (Attio audit). Focus is the only state where a secondary button turns blue.
- **Focus (ElevenLabs):** not seen in any capture.

## ButtonGroup

- **Split button is the only grouped-button pattern in both apps.** Attio's "Save ⌄" is a blue primary with a chevron segment divided by a slightly darker 1px line (A13). ElevenLabs' "Publish ⌄" is the same shape in near-black, with a light divider (E4). The chevron segment is ≈ 28–30px wide (square).
- **Adjacent buttons are spaced, not joined.** Header and modal action rows sit 6–8px apart ("View settings" / "Import / Export", A13; "Cancel" / "Create view", A15; "Preview" / "Publish", E4). Neither app draws attached outlined groups (shared borders).

## ToggleButton

- **Attio:** the list/grid view switch above Notes is two icon-only buttons in a grey track; the selected one is a white raised square (A3). It reads as a small icon SegmentedControl, ≈ 26px track (`#f3f4f6`) with ≈ 20px thumbs. The favourite star beside a page's breadcrumb is a ghost icon toggle, neutral when off (A17).
- **"Filter" chip with a dashed outline** when no filter is set, turning into a solid filled chip ("Sorted by Record ID +1") when active (A13). This is the closest Attio has to an on/off toggle button. On state is a light grey fill plus hairline, not blue.
- **ElevenLabs:** "Explore / My Voices" (E1, E2) are two buttons where the selected one has a light grey fill (≈ `#f4f4f4`) and the other is ghost. Thumbs up/down in the player are ghost icon toggles (E11). Selection is always neutral.

## Toolbar and bulk-action bar

- **View toolbar (Attio):** a ≈ 46–48px row with a 1px bottom hairline. The left holds the view picker ("All Companies ⌄"), the sort chip, and the filter chip, separated by a short vertical divider. The right holds "View settings" and "Import / Export ⌄" as raised secondary buttons, or "Discard changes" (ghost) and "Save ⌄" (split primary) when the view is dirty (A13). Toolbar buttons are ≈ 28px; filter chips ≈ 24px.
- **Bulk-action bar (Attio):** when rows are checked, a **floating tray** appears at the bottom centre over the table (A4, A5). Measured on A5:
  - The tray is ≈ 42px tall, a very light cool grey (≈ `#f4f6f9`) with a soft shadow and ≈ 10–12px radius.
  - It starts with a count: a small blue square badge ("3") and "selected" in muted text.
  - Then white raised buttons, ≈ 30px tall, each with an icon: "Add to List", "Send email", "Run workflow", then "More ⌄", then a ghost "×" to clear the selection.
  - "More" opens a menu **upwards** whose single item, "Remove from List", is red text with a red icon (A5). Choosing it opens a confirmation dialog with a red "Remove from list" button (A6).
  - Selected rows get a pale blue row fill and blue checkboxes (A4).
- **ElevenLabs:** no floating bulk bar in the captures. Selection drives a disabled-until-selected header button instead ("Share Selected (0)", E12), and modal headers carry text actions "Select All / Deselect All" (E13). The editor top bar is a plain row of ghost icon buttons and a primary "Export" (E3).

## Menus (DropdownMenu, ContextMenu, MoreMenu)

The two apps draw one menu surface for every trigger: dropdowns, right-click and "⋯" menus look the same.

| | Attio | ElevenLabs |
|---|---|---|
| Panel | White, 8–10px radius, a 1px ring and a soft cool shadow: `0 0 0 1px #1c28400a, 0 4px 8px -4px #1c28401f, 0 4px 12px -2px #18294b29` (CSS, Attio audit). ≈ 4px inner padding. Width fits content, ≈ 180–260px. | White, ≈ 12px radius, hairline ring, soft diffuse shadow. ≈ 4–6px inner padding. ≈ 200–300px wide. |
| Row | **≈ 29–30px pitch**, ≈ 13px text, 16px leading icon in neutral grey (A1, A7). | **≈ 30–31px pitch**, ≈ 14px text, 16px leading icon (E1, E3). Account menu rows have no icons (E7). |
| Hover / highlight | Rounded inset fill (≈ 6px radius, inset ≈ 4px from the panel edge), neutral light grey ≈ `#f0f2f4` (A1). | Not visible on a menu row; list-row hover is `#f4f4f4` (E1). |
| Separators | Full-bleed 1px hairline, ≈ 4px margin above and below (A1, A2, A7). | Full-bleed 1px hairline (E3, E7). The account menu also nests grouped "cards" inside the panel (E7, E8). |
| Section label | Small muted text ("Company attributes", "Records", "Filter by"; A12, A8). | Small muted text ("Switch workspace"; E7). |
| Shortcuts | Not shown in menu rows. The shortcuts panel uses **key chips** (light grey rounded boxes, `G` then `T`; A11), and modal buttons show `ESC` / `↵` (A15). | **Muted text glyphs, right-aligned, no chips**: "⌘ C", "⌘ ⌥ Click" (E3). |
| Destructive | **Red text and red icon**, always last, after a separator ("Delete", "Delete list", "Archive attribute", "Delete note"; A1, A2, A3, A7). | **Neutral.** "Delete" and "Delete voice" look like any other item; "Delete" is last after a separator in the context menu (E3) but not in the more menu (E1). |
| Disabled | Not seen. | Muted to ≈ 40% (icon and text), shortcut muted too ("Paste", E3). |
| Checked / selected | **Blue**: the current view's label turns blue (A1); select menus show a blue filled check at the trailing edge (A10). | **Neutral**: a black check at the trailing edge ("My Workspace", E7). |
| Submenu | Trailing chevron `›` with an optional count ("2 ›"; A12, "Add integration ›"; A2). Opens to the side. Rows can also carry a trailing kebab that opens a second menu beside the first (A1). | Trailing chevron `›` ("Theme", "Docs and resources"; E7). |
| Search | Many dropdowns start with a borderless search input and a hairline under it (A1, A12, A18). | Not in menus; search lives in popovers. |
| MoreMenu trigger | Ghost kebab "⋮" (vertical) in rows and record headers, ≈ 20–28px (A1, A7, A3). | Ghost "⋯" (horizontal) in rows, ≈ 30px square, grey fill while open (E1, E14). |

## Link

- **Attio:** two kinds. **Neutral inline links** are underlined body-coloured text ("contact our support", A9; "Terms and Conditions" on sign in, A14). **Data links** in table cells (domains, LinkedIn) are blue text with an underline or a pill ([Attio audit](https://github.com/hvn-oss/ds/blob/research/attio-visual-audit/docs/research/attio-visual-audit.md)). Help links are muted text with a leading icon ("Learn about sorting", A13).
- **ElevenLabs:** links are **neutral**, dark text with an underline and a trailing `↗` for external targets ("Best practices ↗", E9). Text actions ("Show all models", E11) are plain medium-weight text with no underline.

## SegmentedControl

- **ElevenLabs** (E4, E5, E6), measured on E4:
  - The track is ≈ **38px** tall, `#f4f4f4`, with a **≈ 8–10px radius**: a rounded rectangle, not a pill.
  - The thumb is ≈ **30px** tall, white, with a 1px ≈ `#e3e3e3` hairline and a faint shadow, inset ≈ 4px from the track. Its radius is ≈ 6–8px.
  - Items stretch to equal widths across the full field ("Tiny / Compact / Full", "Orb / Link / Image"). Labels are ≈ 14px; the selected label is black and the others are muted grey.
  - In a modal it sits at a smaller ≈ 32px track ("Single URL / Sitemap / Whole Website", E6).
- **Attio:** only the icon-only view switch (A3): ≈ 26px track, `#f3f4f6`, ≈ 6px radius, white raised ≈ 20px thumbs. The "Table / Kanban" picker in the create-view modal (A15) is a pair of large selectable cards, blue border and pale blue fill when selected, so it is a radio-card, not a SegmentedControl.
- Neither app uses blue in a segmented control. The selected segment is marked by the white thumb and its lift.

## Beside: marketing call-to-action buttons

- **Primary CTA:** a **near-black pill**, `#1e1d1c` (sampled; CSS `--color-text-ink #0e0e10` / `stone-900` per the Beside audit), white label at ≈ 15px weight 500, ≈ **44px** tall with ≈ 20–24px horizontal padding ("Get started", B1).
- **Secondary CTA:** a **white pill** with a hairline border and a leading icon ("Try it live" with a phone icon, B1), same height. The CSS also has `stone-100` filled pills (Beside audit).
- They sit side by side, ≈ 8px apart, centred under the heading. The nav repeats the pair smaller: "Log in" as plain text and "Get started" as a black pill (Beside audit).
- No colour, gradient or shadow on any CTA. Colour on the site only appears in the text shimmer.

## Where the references diverge from the roadmap's visual direction

The roadmap ("What every map inherits" in `docs/roadmap.md`) says blue is the primary colour for primary buttons, focus, links and selection; controls are ≈ 8px rounded rectangles; pills are only for chips, badges and segment tracks; secondary buttons are outlined with `--color-border-emphasized`; shadows are only for floating layers (plus the selected SegmentedControl item); and the destructive Button uses the red pair.

1. **Primary fill.** Attio matches (blue). ElevenLabs and Beside use near-black primaries, and ElevenLabs keeps every selected state neutral. hvn follows Attio here; ElevenLabs only informs shape and density.
2. **Segment tracks are not pills in the apps.** Both Attio and ElevenLabs draw the track and thumb as rounded rectangles (≈ 6–10px). The roadmap reserves pills for segment tracks. The SegmentedControl family should decide between keeping the pill (roadmap) or following the references.
3. **Raised secondary buttons.** Attio gives secondary buttons and toolbar chips a faint "raised" shadow, and the primary a coloured shadow. The roadmap allows shadows only on floating layers and the selected segment, and outlines secondary buttons with a hairline. ElevenLabs (hairline, no shadow) matches the roadmap.
4. **Destructive actions.** Attio uses red for destructive buttons (as a light red fill) and for destructive menu items (red text and icon). ElevenLabs keeps destructive menu items neutral. The roadmap specifies the red pair for the destructive Button but says nothing about menu items; the Menus family should choose.
5. **Checked menu items.** Attio marks the checked item in blue (text or check); ElevenLabs uses a neutral check. Blue matches the roadmap's "blue for selection".
6. **Marketing CTAs are pills.** Beside's CTAs are ≈ 44px near-black pills. The roadmap says marketing shares the app's theme and that controls are 8px rectangles, so following it means hvn's marketing CTAs are blue 8px rectangles in a larger size. The Button family should confirm this or carve out a marketing exception.
7. **Shortcut display.** Attio shows shortcuts as key chips (and inside modal buttons), ElevenLabs as muted text glyphs. The roadmap is silent.
8. **Loading.** Neither app shows a spinner inside a button; ElevenLabs uses a progress fill on a disabled button. The references don't inform a loading style, so Astryx's default should stand unless the Button family decides otherwise.
9. **Density.** Both apps run buttons and menu rows at ≈ 28–30px. Whether that matches Astryx's `md` or `sm` is for the anatomy research to confirm against the roadmap's "Astryx medium defaults".

## What this means for hvn (inputs to the design families)

- **Button:** blue primary, white hairline secondary, quiet ghost, red destructive, all ≈ 8px rectangles. Focus is a 1px blue border plus a soft blue ring (Attio). Icon-only buttons are ghost squares the height of their size, with a neutral fill while their menu is open.
- **Grouped actions:** split button (primary + chevron segment with an inner divider) is the pattern to draw for ButtonGroup. Toolbars are flat rows divided by hairlines. The bulk-action bar is a floating tray (a floating layer, so a shadow is allowed) with a count, buttons and a clear action.
- **Menus:** one panel for dropdown, context and more menus: white, container radius, ring-and-shadow, ≈ 30px rows with a rounded inset hover fill, full-bleed separators, section labels, trailing shortcuts, chevrons for submenus and a trailing check for checked items. Destructive items go last after a separator.
- **Link:** neutral underlined inline links and blue links both exist in the references; the roadmap's blue links follow Attio's data links.
- **SegmentedControl:** grey track with an inset white thumb, hairline and lift; equal-width items, muted unselected labels. Track shape (pill vs rectangle) is the open question.
