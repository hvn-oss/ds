# Astryx anatomy of the Action components

Research for [Astryx anatomy of the Action components](https://github.com/hvn-oss/ds/issues/35), part of the map [hvn visual identity: Action components](https://github.com/hvn-oss/ds/issues/33).

The question: for each of the nine Action components, what are its props, sizes and interactive states, and which tokens and styles does it read? Which visuals can the hvn theme override with token-based component overrides, and which are fixed? What draft frame key fits each one? Do control heights respond to coarse pointers?

## Sources

All claims come from these primary sources, read on 2026-11-14:

- **Core source**: `@astryxdesign/core@0.7.11` as installed in this repo (`node_modules/.pnpm/@astryxdesign+core@0.7.11_…/node_modules/@astryxdesign/core/src/`). Paths below are relative to that `src/`.
- **CLI**: `vpx astryx component <Name>`, `vpx astryx theme targets <Name>` and `vpx astryx docs author-a-theme`, run from `packages/ds`. The CLI cannot find Core from the repo root.
- **hvn theme**: `packages/ds/src/themes/hvn/hvnTheme.ts`, and the built `packages/ds/dist/themes/hvn/hvn.css`.
- **Docs site**: https://astryx.atmeta.com/components/SegmentedControl. The site documents Core **v0.7.16**, ahead of the installed 0.7.11, and its pages render on the client, so the fetched HTML holds no component content. Everything below therefore comes from the installed 0.7.11. Re-check it when Core is bumped.

## Shared anatomy

### Sizes and pixel heights

Every sized control reads three size tokens (`theme/tokens.stylex.ts:210-214`):

| Token | Default | hvn |
|---|---|---|
| `--size-element-sm` | 28px | 28px (not overridden) |
| `--size-element-md` | 32px | 32px (not overridden) |
| `--size-element-lg` | 36px | 36px (not overridden) |

Button sets `height` straight from these tokens (`Button/Button.tsx` `sizeStyles`). Padding is the same at every size: `paddingInline: --spacing-3` (12px) and `gap: --spacing-2` (8px). Only the height changes. Icon size is `sm` (16px) for `sm` and `md` buttons, and `md` (20px) for `lg` (`iconSizeByButtonSize`; `Icon/IconSize.stylex.ts`).

### Do control heights respond to coarse pointers?

**No. Astryx keeps the control's box the same size under a coarse pointer and grows only an invisible hit area.**

- The `--size-element-*` tokens are static. Core has no `pointer: coarse` rule for them, and the hvn theme doesn't override them.
- Under `@media (pointer: coarse)`, Button, ButtonGroup members, SegmentedControl segments and list rows draw an invisible `::after` band. The band grows the tap target toward **44px** on each axis, centred, and stops halfway to a neighbouring control. The visible control doesn't grow (`utils/touchHitArea.ts`, `utils/hitArea.ts:55` `MIN_TOUCH_TARGET = 44`, `internal/touchHitArea.stylex.ts`). ButtonGroup's docs say so directly: "each button's target grows toward 44 px … without the buttons growing".
- The coarse pointer also changes press feedback. The mouse-press `scale(0.98)` is turned off, and a `data-astryx-press` overlay draws the press instead (`Button.tsx` `pressable`).
- **What hvn's ×1.14 type ramp does to Actions.** On coarse pointers below `lg`, the built CSS sets `--font-size-base: 1rem` and `--text-label-leading: 1.5`, instead of `0.875rem` and `1.4286` (`dist/themes/hvn/hvn.css`). Labels go from 14/20 to 16/24, and the effect depends on whether the control has a fixed height:
  - **Fixed-height controls keep their height.** Button, ToggleButton, MoreMenu's trigger and the DropdownMenu trigger stay at 28/32/36. SegmentedControl segments stay at height − 4. The larger label simply fills more of the same box: a `md` Button has 4px above and below a 24px line, where before it had 6px.
  - **Menu rows grow.** A row's height is its padding plus the label's line height, with no fixed height. Rows go from 28/32/36 to **32/36/40** (`sm`/`md`/`lg`).
  - **Toolbar grows with its children.** Toolbar sets only `min-height`.
- **A theme can grow the controls.** `defineTheme`'s `adaptations` accepts token writes under `pointer: "coarse"`. Astryx's own docs example writes `'--size-element-md': '44px'` (`theme/defineTheme.ts:530-555`). hvn would add such a rule next to the existing type rule.
- **Touch menus become bottom sheets.** With `presentation="adaptive"`, DropdownMenu, MoreMenu and ContextMenu show a BottomSheet of spacious List rows on a compact touch screen: a coarse pointer, and a viewport narrower than `md` or shorter than 500px. The popover is used everywhere else.

### Interactive states and the tokens they read

| State | How it's drawn | Tokens |
|---|---|---|
| rest | the variant's fill | per variant, below |
| hover | an overlay `background-image` over the fill (`utils/interactionOverlay.stylex.ts`), only under `(hover: hover)` | `--color-overlay-hover` |
| pressed | a pressed overlay. A mouse press also scales the control to 0.98; a coarse pointer gets the overlay only | `--color-overlay-pressed` |
| focus | `outline` on `:focus-visible` | `--focus-outline-width` (2px), `--focus-outline-style`, `--focus-outline-color` (`--color-accent`), `--focus-outline-offset` (3px); Button's `--button-focus-offset` |
| disabled | `opacity: 0.5`, default cursor, overlays off | fixed |
| loading | the content goes transparent and a `Spinner size="sm"` in the current colour sits centred over it. The spinner waits `--duration-medium-min` when the loading comes from an action | `--duration-*` |

hvn values that matter here: `--color-overlay-hover` is black at 0x0d alpha (≈5%), `--color-overlay-pressed` is black at 0x1a (≈10%), and `--color-neutral` is black at 0x0f (≈6%), with white equivalents in dark mode. Radii are `--radius-element` 8px and `--radius-container` 16px. The popover background is `--color-background-popover`, neutral 100 in light mode.

### What a theme component override can reach

From `vpx astryx docs author-a-theme` (Component Style Overrides):

- Keys under `components.<key>` are `base`, `prop:value` (for example `variant:secondary`) and bare state names (for example `selected`). Values are standard CSS properties. hvn's Button override also nests pseudo-classes, `":hover"`, which shows they work.
- `borderRadius` and `padding` are routed into the component's private `--_*` vars where the component declares that mapping. Writing a private `--_*` var directly is an error. Only the public vars the component lists may be set.
- A `prop:value` key whose value isn't built in creates a new variant.
- Only the props and states listed by `astryx theme targets` produce selectors. **Anything not listed can't be targeted per component**, for example Button's `isDisabled`, `isLoading` and `isIconOnly`. Those are reachable only through global tokens or a nested pseudo-class.

"Fixed" below means the value is a literal in Core source, with no token behind it and no prop or state key to reach it.

## Per component

### Button

**Props that change visuals**: `variant` (`primary` | `secondary`\* | `ghost` | `destructive`), `size` (`sm` | `md`\* | `lg`), `elevation` (`none`\* | `low` | `med` | `high`), `isIconOnly`, `icon`, `endContent`, `isLoading`, `isDisabled`, `width`. Behaviour only: `type`, `clickAction`, `isInterruptible`, `tooltip`, `href`/`as`/`target`/`rel` (a link looks the same as a button), form props. (\* = default.)

**Sizes**: 28 / 32 / 36px tall. Icon-only buttons are square (`aspect-ratio: var(--button-icon-only-aspect)`, padding 0).

**Tokens**:
- **Fill and text**: `primary` uses `--color-accent` / `--color-on-accent`; `secondary` uses `--color-neutral` / `--color-text-primary`; `ghost` is transparent / `--color-text-primary`; `destructive` uses `--color-error` / `--color-on-error`, with a ring in `--color-error`.
- **Label**: `--text-label-size`, `--text-label-leading`, `--font-weight-medium`.
- **Radius and elevation**: `--radius-element` (through `--_button-radius`); `--shadow-low|med|high`.
- **Motion**: `--duration-fast`, `--ease-standard`.

**Theme key** `button`: props `size`, `variant`, `elevation`; no states. Public vars are `--button-focus-offset` and `--button-icon-only-aspect`; `borderRadius` maps to `--_button-radius`. hvn already overrides `variant:secondary` (a 1px `--color-border-emphasized` outline, a transparent fill, and a `--color-neutral` hover fill) and `variant:destructive` (`--color-background-red` / `--color-text-red`).

**Fixed**: padding is the same at every size (12px inline, 8px gap). The disabled opacity is 0.5, the mouse press scales to 0.98, and the hover and pressed overlays are a `background-image` layer. Icon sizes per button size are fixed (sm/sm/md). Loading always uses the `sm` spinner.

**Visual props**: 8, plus `state`. A full grid of `variant × size × icon-only × loading × disabled × state` is 4·3·2·2·2·4 = 384 frames.

**Draft frame key**: `variant / size / icon-only / loading / disabled / state`, for example `secondary / md / no-icon-only / no-loading / enabled / rest`. Defaults: `secondary*`, `md*`, `no-icon-only*`, `no-loading*`, `enabled*`, `rest*`. `elevation`, leading `icon` and `endContent` fit better as example panels than as grid keys.

### ButtonGroup

**Props that change visuals**: `orientation` (`horizontal`\* | `vertical`), `size` (sm | md\* | lg, the default for its children), `elevation` (none\* | low | med | high), `isDisabled`. The children's `variant` changes the dividers.

**Sizes**: inherits Button's 28 / 32 / 36.

**Tokens**: a member that isn't first gets a 1px leading divider (`--border-width`, `--color-border`). Next to `primary` and `destructive` members the divider is `--color-on-accent` instead. Only the outer corners are rounded, with `--radius-element`; inner corners are 0 (`Button.tsx` `groupStyles`). The group's elevation is `--shadow-*` with `--radius-element`. The members keep Button's variant fills.

**Theme key** `button-group`: props `size`, `orientation`, `elevation`. Member corners and dividers are drawn by the Button inside the group, not by `button-group`.

**Fixed**: the inner corners are square, the divider always uses `--color-border` (or `--color-on-accent` on solid members), and members have no gap. hvn's secondary outline shows up here as touching 1px outlines next to the divider, so the theme review should look at grouped secondary buttons.

**Visual props**: 4, plus member variant and `state`.

**Draft frame key**: `variant / orientation / size / disabled / state`, where `variant` is the members' variant and `state` is for one member. Example: `secondary / horizontal / md / enabled / hover`.

### ToggleButton (and ToggleButtonGroup)

**Props that change visuals**: `isPressed`, `size` (sm | md\* | lg), `isIconOnly` (icon-only also follows from passing `icon` without children), `icon` / `pressedIcon`, `isLoading`, `isDisabled`, `elevation`. ToggleButtonGroup adds `orientation` and `size`; its `type` (single | multiple) only changes behaviour.

**Sizes**: 28 / 32 / 36px. It is always a **ghost** Button (`ToggleButton.tsx:346-349`).

**Tokens**: a pressed toggle has a `--color-overlay-pressed` fill, uses `Highlight` under forced colours, and its label turns `--font-weight-semibold`. A hidden copy of the label at semibold reserves the width, so pressing it doesn't change the width. The group has a gap of `--spacing-1` (4px), so members aren't joined like a ButtonGroup. Everything else comes from Button's ghost variant.

**Theme keys**: `toggle-button` (prop `elevation`, state `isPressed`) and `toggle-button-group` (base only). The rendered Button also carries the `button` key with `variant:ghost`, so **an hvn override of `button` `variant:ghost` also changes ToggleButton**.

**Fixed**: the pressed fill is the pressed-overlay token, not a separate selected token; the theme can replace it through `isPressed`. The semibold weight on press is fixed in Core.

**Visual props**: 6, plus `state`.

**Draft frame key**: `size / pressed / icon-only / loading / disabled / state`, for example `md / no-pressed / no-icon-only / no-loading / enabled / rest`. The group can be an example panel: `orientation / size`.

### Toolbar

**Props that change visuals**: `variant` (Section variant: `transparent`\* | `section` | `muted`), `size` (sm | md\* | lg, passed down to child Buttons, inputs, tabs and selectors through SizeContext), `dividers` (top | bottom | start | end), `gap` (default 1 = 4px), `orientation`, plus the `startContent`, `centerContent` and `endContent` slots.

**Sizes**: the row has `min-height: --size-element-sm` **at every size** (`Toolbar.tsx` `sizeStyles.base`). Section adds `--spacing-2` (8px) of block padding at every size, so an empty toolbar is 44px tall. A toolbar of `md` buttons is 32 + 16 = 48px.

**Tokens**: the background comes from Section (`--color-background-surface`, transparent or `--color-background-muted`). Section draws the dividers, and the gap is a spacing token.

**Theme key** `toolbar`: `size` is listed as a state (`data-size`), not a prop. The Section surface has its own `section` key, shared with every Section.

**Fixed**: the block padding is the same at every size, and the toolbar has no interactive state of its own.

**Visual props**: 3 (variant, size, dividers). There is no `state` key, because state belongs to the controls inside.

**Draft frame key**: `variant / size / dividers`, for example `transparent / md / no-dividers`. `dividers` takes `no-dividers`, `bottom`, `top / bottom` and so on, which breaks the plain boolean rule. A later ticket may limit it to `no-dividers` and `bottom`.

### SegmentedControl (and SegmentedControlItem)

**Props that change visuals**: control `size` (sm | md\* | lg), `layout` (`hug`\* | `fill`), `isDisabled`. Item `icon`, `isLabelHidden` (icon-only), `isDisabled`, and whether it is selected (from `value`).

**Sizes**: the track is the element size, since each segment is `--size-element-* − 4px` tall inside 2px of padding. Segments are 24 / 28 / 32px tall. Inline padding is 8 / 12 / 12px, and the `sm` label drops to `--text-supporting-size`. Icons are 14 / 16 / 18px, which is **off the Icon size scale** (`SegmentedControlItem.tsx` `iconSizeStyles`).

**Tokens**:
- **Track**: `--color-neutral` fill, `--spacing-0-5` padding and gap, `--radius-element` radius.
- **Segments**: the radius is the track radius minus its padding. Labels are `--color-text-secondary` at `--font-weight-medium`.
- **Selected segment**: `--color-background-surface`, `--color-text-primary`, `--font-weight-semibold`, `--shadow-low`.
- **Disabled**: `--color-text-disabled` per segment; a disabled control is 0.5 opacity.

The selected surface is copied into a "lens" pseudo-element that slides between segments.

**Theme keys**: `segmented-control` (prop `size`; `borderRadius` maps to `--_segmented-control-radius` and `padding` to `--_segmented-control-padding`) and `segmented-control-item` (prop `size`; states `selected` and `disabled`).

**Roadmap mismatch**: the roadmap says pills are for segment tracks, but Astryx draws an 8px track. Making it a pill takes `segmented-control: { base: { borderRadius: "var(--radius-full)" } }`, and the segments then follow automatically. hvn's `--shadow-low` is the ring-and-shadow token, so the "selected segment keeps its `shadow-low` lift" decision applies as it stands.

**Fixed**: the segment height is always the track height minus 4px; it is a literal `- 4px`, not derived from the padding var. Icon sizes are fixed, and so is the sliding motion.

**Visual props**: 6 (size, layout, disabled, icon, label-hidden, selected), plus `state`.

**Draft frame key**: `size / layout / icon / label-hidden / disabled / state`, for example `md / hug / no-icon / no-label-hidden / enabled / rest`. `state` is for one unselected segment; the selected one is always drawn.

### Link

**Props that change visuals**: `color` (`accent`\* | `primary` | `secondary` | `placeholder` | `disabled` | `inherit`), `hasUnderline`, `isStandalone` (body size), `isExternalLink` (trailing `externalLink` icon at `xsm`), `isDisabled`, `size` / `weight` (Text overrides), `maxLines`, `display`. Without `href` it renders as a `<button>` that looks the same.

**Sizes**: inherits the surrounding text unless `isStandalone` is set, which uses `--text-body-size` / `--text-body-leading`. It has no control height.

**Tokens**:
- **Colour**: `--color-text-accent|primary|secondary|disabled`.
- **Hover**: the colour becomes `color-mix(in srgb, <color>, --color-tint-hover 15%)` and the underline appears, both only under `(hover: hover)`.
- **Pressed**: the pressed overlay sits behind the text (`interactionOverlayStyles.pressedBackgroundColor`).
- **Other**: the icon gap is `--spacing-0-5`, and the focus ring is the shared outline.

**Theme key** `link`: prop `color`; no states.

**Fixed**: the underline style, the 15% hover mix, the disabled 0.5 opacity, and the `xsm` external icon (matches the roadmap's "Link uses `xsm`").

**Visual props**: 5 (color, underline, standalone, external, disabled), plus `state`.

**Draft frame key**: `color / underline / standalone / external / disabled / state`, for example `accent / no-underline / no-standalone / no-external / enabled / rest`.

### DropdownMenu (and DropdownMenuItem and friends)

**Props that change visuals**:
- **Trigger**: a Button (`button` prop) plus a trailing `chevronDown` `sm` icon when `hasChevron` (default true). An open menu gives the trigger a `--color-overlay-pressed` image.
- **Menu**: `presentation` (popover | bottom-sheet | adaptive), `menuWidth` (defaults to the trigger width), `menuMaxHeight` (default cap 300px), and `header` / `footer` regions.
- **Rows**: DropdownMenuItem `variant` (`default`\* | `destructive`), `isDisabled`, `icon`, `description`, `endContent`. There are also checkbox and radio items, submenus with an indicator chevron, section headings and dividers. Row `size` comes from the menu's size.

**Sizes**: rows have no fixed height; padding plus a 20px label sets it. `sm` is 4px block and 8px inline padding (28px). `md` is 6px block and 8px inline (32px). `lg` is 8px block (36px). Under hvn's coarse ramp, rows grow to 32 / 36 / 40.

**Tokens**:
- **Menu surface** (`Popover/usePopover.tsx`): `--color-background-popover`, `--radius-container`, `--shadow-low`.
- **Menu list**: `--spacing-1` padding and `--spacing-0-5` gap.
- **Row**: radius is the menu radius minus its padding (16 − 4 = **12px** in hvn), with `--text-label-size`, `--color-text-primary` and `--font-family-body`.
  - **Highlight**: a pointer over a row focuses it, so hover and keyboard focus share the `--color-overlay-hover` focus paint. The ring is inset by `-focus-outline-width`. `:active` uses `--color-overlay-pressed`.
  - **Destructive**: `--color-text-error`, and the icon turns `error`.
  - **Disabled**: 0.5 opacity.
  - **Icons**: `sm`, coloured `secondary`.
- **Section heading**: `--text-supporting-*` in `--color-text-secondary`, with 4 / 8px padding.
- **Divider**: `--spacing-1` block margin.

**Theme keys**: `dropdown-menu` (prop `presentation`) sits on the inner list. The painted panel is the shared **`popover`** key (`usePopover.tsx:609`), so a panel override changes every Popover. The other keys are `dropdown-menu-item` (props `size`, `variant`), `dropdown-menu-radio` (prop `size`, states `checked` and `disabled`), `dropdown-menu-section-heading`, `dropdown-menu-divider` and `dropdown-menu-indicator-icon`.

**Fixed**: the panel's background, radius and shadow aren't specific to the menu; they belong to Popover. There is no separate hover colour: hover is focus. The disabled row is 0.5 opacity, and the row icon colour is `secondary`.

**Visual props**: menu 2 (presentation, size); row 6 (variant, disabled, icon, description, endContent, selectable kind); trigger 2 (open, chevron), plus Button's own props.

**Draft frame keys**:
- **Row**: `size / variant / disabled / state`, for example `md / default / enabled / hover`.
- **Menu**: `presentation / size`, for example `popover / md`.
- **Trigger**: `open / state` on a default Button.

Row content (icon, description, endContent, checkbox, radio, submenu) fits better as an anatomy panel than as grid keys.

### ContextMenu

**Props that change visuals**: `size` (sm | md\* | lg, rows), `presentation`, `menuWidth` (**min-width 160px** by default), `items` (the same row model as DropdownMenu, with nested `items` as flyouts), `isDisabled` (falls back to the native menu). It has no trigger to draw; it opens at the cursor.

**Sizes**: rows are the same as DropdownMenu's.

**Tokens**: ContextMenu **paints its own panel** (`ContextMenu.tsx:155-200`): `--color-background-popover`, `--shadow-low`, `--radius-container`, with `--spacing-1` padding and a 300px max height. The rows are DropdownMenu rows. The bottom sheet uses `--color-background-surface`.

**Theme key** `context-menu`: base only; `borderRadius` and `padding` map to `--_dropdown-menu-radius` and `--_dropdown-menu-padding`. The rows use the `dropdown-menu-*` keys.

**Consequence**: the "menu surface" decision has to be applied twice, once on `popover` (DropdownMenu and MoreMenu) and once on `context-menu`, or once in shared tokens (`--color-background-popover`, `--shadow-low`, `--radius-container`) if the menu surface should match every popover. Changing the tokens is the only single-point override.

**Visual props**: 2 (size, presentation), plus the rows.

**Draft frame key**: `presentation / size`, for example `popover / md`. Rows reuse DropdownMenu's row key.

### MoreMenu

**Props that change visuals**: `variant` (Button variant, **`ghost`**\*), `size` (sm | md\* | lg), `icon` (default semantic `moreHorizontal`), `isDisabled`, `presentation`. It is a DropdownMenu with an icon-only Button trigger and no chevron. The trigger's tooltip is its label (`MoreMenu.tsx:160-185`).

**Sizes**: square 28 / 32 / 36px triggers.

**Tokens**: the trigger uses Button's tokens, plus the open-trigger pressed image. The menu uses DropdownMenu's tokens.

**Theme key** `more-menu`: base only. It is a stable class name on the DropdownMenu root, so the trigger itself is styled by `button`.

**Visual props**: 4 (variant, size, disabled, open), plus `state`.

**Draft frame key**: `variant / size / open / disabled / state`, for example `ghost / md / no-open / enabled / rest`.

## Visual-prop counts for the coverage decision

| Component | Visual props (excl. `state`) | Rough full grid with `state` | Suggestion |
|---|---|---|---|
| Button | 8 (5 in the key) | 384 | curated |
| ButtonGroup | 4 + member variant | 4·2·3·2·4 = 192 | curated |
| ToggleButton | 6 (5 in the key) | 3·2·2·2·2·4 = 192 | curated |
| Toolbar | 3 | 3·3·2 = 18 | full |
| SegmentedControl | 6 | 3·2·2·2·2·4 = 192 | curated |
| Link | 5 | 6·2·2·2·2·4 = 384 | curated (accent, primary, secondary) |
| DropdownMenu rows | 6 (3 in the key) | 3·2·2·4 = 48 | full for rows; anatomy panel for content |
| ContextMenu | 2 | 3·3 = 9 | full, reusing rows |
| MoreMenu | 4 | 4·3·2·2·4 = 192 | curated (ghost, secondary) |

A disabled frame only needs `rest`, since hover, pressed and focus are turned off. That alone removes three quarters of every `disabled` block.

## Notes for the frame key convention

- The example in [Design file structure and frame conventions](https://github.com/hvn-oss/ds/issues/17) writes `isDisabled` as `enabled` / `disabled`, not `no-disabled` / `disabled`. The keys above follow that example. A later ticket should confirm it as the one exception to the boolean rule.
- Props with more than two values that aren't variants, such as Toolbar's `dividers`, need a written value list on the frame key note.
- Astryx state names don't match the frame `state` values. Astryx has "Hover" and "Pointer down", and DropdownMenu rows paint hover as focus. Map Pointer down to `pressed`, and draw a menu row's keyboard `focus` frame with the inset ring.

## Answer for "Touch sizing for controls"

Astryx does **not** grow control heights on coarse pointers. It keeps 28 / 32 / 36 and grows an invisible hit area toward 44px. hvn's ×1.14 ramp therefore fits larger labels into the same boxes, while menu rows and toolbars grow. The open question is now precise:

> On coarse pointers below `lg`, should hvn keep `--size-element-sm|md|lg` at 28 / 32 / 36, relying on Astryx's 44px hit area, or add an `adaptations` token rule that grows them (for example ×1.14 → 32 / 36 / 40, or `md` = 44)? SegmentedControl segments, ToggleButton and MoreMenu triggers follow the same tokens.
