# Astryx anatomy of Slider and FileInput

Research for [Astryx anatomy of Slider and FileInput](https://github.com/hvn-oss/ds/issues/56), part of the map [hvn visual identity: Data Input components](https://github.com/hvn-oss/ds/issues/51).

The question: for Slider and FileInput, what are the props, sizes and interactive states (including read-only, status, open, and filled versus placeholder where they apply), and which tokens and styles does each read? Which visuals can the hvn theme change with token-based component overrides, and which are fixed? Which parts are shared with other Data Input families? What draft frame key fits each one, and which controls read `--size-element-*` and so belong on the Touch sizing artboard?

## Sources

All claims come from these primary sources, read on 2026-11-19:

- **Core source**: `@astryxdesign/core@0.7.11` as installed in this repo (`node_modules/.pnpm/@astryxdesign+core@0.7.11_…/node_modules/@astryxdesign/core/src/`). Paths below are relative to that `src/`. The main files are `Slider/Slider.tsx`, `motion/uikit/slider.ts`, `FileInput/FileInput.tsx`, `Field/Field.tsx`, `Field/inputStyles.stylex.ts`, `Field/InputClearButton.tsx`, `FieldStatus/FieldStatus.tsx`, `hooks/useInputStatusIcon.tsx`, `Spinner/Spinner.tsx`, `Tooltip/useTooltip.tsx` and `theme/tokens.stylex.ts`.
- **CLI**: `pnpm exec astryx component Slider|FileInput`, run from `apps/docs`, and `vpx astryx theme targets Slider|FileInput`, run from `packages/ds`.
- **hvn theme**: `packages/ds/src/themes/hvn/hvnTheme.ts` and `packages/ds/src/themes/hvn/icons.js`.
- **Structure screenshots**: `docs/reference/astryx-design-system/Data Input/Slider.png` and `FileInput.png`.
- **Precedent**: [Astryx anatomy of the Action components](https://github.com/hvn-oss/ds/issues/35) and [Component frame coverage](https://github.com/hvn-oss/ds/issues/37).

The Astryx docs site documents a newer Core (v0.7.16 at the time of the Action research). Everything below comes from the installed 0.7.11. Re-check it when Core is bumped.

## Summary

- **Neither component has a `size` prop.** Slider's geometry is literal pixels: a 4px rail and a 20px thumb. FileInput's input mode is fixed at `--size-element-md`, and its dropzone is sized by padding.
- **Neither has a read-only state or an `open` state.** Slider's value tooltip appears only on hover, focus and drag. FileInput opens the browser's native file picker, which isn't drawn.
- **Only FileInput's input mode reads `--size-element-*`** (`md` only), so it is the family's one control on the Touch sizing artboard. Slider changes only invisible touch targets under a coarse pointer.
- **Status paints differently.** FileInput's `status` recolours its border and adds an in-box icon. Slider's `status` changes nothing on the control: it only adds a detached FieldStatus message below it.
- **FileInput doesn't use the shared input shell.** Its input-mode box copies the shell's padding, border and radius, but its hover is a 20% **accent** inset, not the shell's grey one, and its focus has no 2px `--color-accent-muted` inset. If the Text fields design changes the shell, FileInput needs its own `file-input` override to follow.
- **There are no file rows and no upload progress.** Selected files render as one line of comma-joined names, and an upload is a spinner. "Selected file rows" and "upload progress" in [Slider and FileInput design](https://github.com/hvn-oss/ds/issues/63) don't exist in Astryx.

## Shared parts

Both components render inside `Field` (`Field/Field.tsx`), the Text fields family's wrapper. They share these parts with the other Data Input families:

| Part | Used by | Source | Theme key |
|---|---|---|---|
| Label, description, required and optional indicator, label tooltip | both | `Field`, `FieldLabel` | `field`, `field-label` |
| Status message box | both (Slider always `detached`; FileInput `attached`\* \| `detached` \| `tooltip`) | `FieldStatus` | `field-status` (hvn overrides it to the categorical pairs), `field-status-icon` |
| In-box status icon (`md`, 20px, `color=<status>`) | FileInput input mode, `attached` or `tooltip` placement | `hooks/useInputStatusIcon.tsx` | `input-status-icon` (props `size`, `status`) |
| Clear button (ghost `sm` Button forced to 20px tall, `close` icon `sm` `secondary`) | FileInput when filled | `Field/InputClearButton.tsx` | `input-clear-button`, `input-clear-icon`, plus `button` `variant:ghost` |
| Tooltip (inverted surface) | Slider value bubble; both components' `disabledMessage` | `Tooltip/useTooltip.tsx` | `tooltip` |
| Spinner | FileInput busy state | `Spinner/Spinner.tsx` | `spinner` |
| `--color-track` rail | Slider (rail and unfilled marks); also ProgressBar, Switch's off track, Spinner's track | `theme/tokens.stylex.ts:106-109` | none; hvn sets the token (neutral 90 / 25) |

Neither component uses the listbox, calendar panel or Menu surface rows.

Field status, from `FieldStatus/FieldStatus.tsx`:

- **Message type**: `--text-supporting-size` / `--text-supporting-leading` (12/20).
- **`attached`**: tucks 6px (`--spacing-1-5`) under the control and pads 8px, with only the bottom corners rounded (`--radius-element`). It has no icon of its own; the control shows the status icon.
- **`detached`**: sits 4px below with 8px padding, all four corners rounded, and a leading status icon.
- **Colours**: hvn's `field-status` override paints success, warning and error with `--color-background-<hue>` / `--color-text-<hue>` (green, yellow, red).

## Slider

### Props that change visuals

- **`value`**: a `number` gives a single thumb, and a `[number, number]` gives a range with two thumbs and a fill between them (`Slider.tsx:156-176`).
- **`orientation`**: `horizontal`\* | `vertical`.
- **`valueDisplay`**: `tooltip`\* | `text` | `none`.
- **`marks`**: `{value, label?}[]`, tick marks with optional labels.
- **`isDisabled`**, **`status`** (`{type: warning | error | success, message?}`).
- **Field props**: `label`, `isLabelHidden`, `description`, `isRequired` / `isOptional`, `labelTooltip`, `width`.
- **Behaviour only**: `min`, `max`, `step`, `formatValue` (changes the text, not the paint), `minStepsBetweenThumbs`, `htmlName`, `disabledMessage` (a tooltip on hover or focus), `onChange` / `onChangeEnd`.

(\* = default.) There is no `size`, no `variant`, no read-only and no loading state.

### Geometry

All literal pixels (`Slider.tsx:182-183`, `styles`). None of them reads a size token.

| Part | Horizontal | Vertical |
|---|---|---|
| Control (the interactive box) | full width × 20px | 20px × 160px |
| Rail | 4px tall, full length, `--radius-full` | 4px wide |
| Fill | 4px, from the start (or the lower thumb) to the thumb's centre, `--radius-full` ends | same, upward |
| Thumb | 20px circle, `--radius-full` | same |
| Thumb travel | inset by half a thumb (10px) at each end, as a native range input | same |
| Mark | 2 × 8px, `--radius-full` | 8 × 2px |
| Mark label | top edge 14px below the rail's centre line (`THUMB_SIZE / 2 + 4`) | 14px beside it |

- The control row has an 8px gap (`--spacing-2`) before the text value when `valueDisplay="text"`.
- **Mark labels don't reserve space.** They are absolutely positioned, with their top 24px below the top of the 20px control. A label therefore overhangs the control by 4px plus one line of 12px text, whose line height it inherits (it sets none). Whatever follows the Slider has to leave room for it.
- Core's own comment says the thumb size is fixed: "Both directions read THUMB_SIZE, so a theme cannot resize the thumb through CSS alone" (`Slider.tsx:615-621`). The fill clip repeats the 4px rail height, so resizing only the rail through `slider-track` would leave the fill at 4px.

### Tokens

- **Rail**: `--color-track`. In hvn this is neutral 90 (light) and 25 (dark), the same rail as ProgressBar and Switch's off track.
- **Fill and thumb**: `--color-accent` (blue 45).
- **Marks**: unfilled marks use `--color-track`, and marks inside the fill use `--color-accent` (`markFilled`).
- **Mark labels**: `--text-supporting-size`, `--color-text-secondary`, `--font-family-body`.
- **Text value**: `--text-label-size`, `--color-text-primary`. No line height is set, so it inherits one.
- **Value tooltip**: the shared Tooltip surface. That is `--color-text-primary` as the fill (an inverted bubble), `--color-background-surface` text, `--radius-container` (16px), body 14/20 and 4px / 8px padding. It sits 4px above the thumb (`start` on a vertical slider).
- **Motion**: `--duration-fast` and `--ease-standard` on the thumb's colour and shadow.

### States

| State | How it's drawn | Tokens |
|---|---|---|
| rest | the accent thumb on the rail, with the fill up to the thumb. The value tooltip is closed | as above |
| hover | the thumb turns `color-mix(in srgb, --color-accent, --color-tint-hover 15%)`, darker blue, only under `(hover: hover)`. The value tooltip opens (delay 0) | `--color-tint-hover` (black in light mode) |
| pressed | while a thumb is dragged, a `--color-overlay-pressed` image covers it. This follows the drag state, not `:active`, so a press on the rail also counts. The tooltip stays open | `--color-overlay-pressed` (black ≈10%) |
| focus | the shared focus outline on the thumb, **keyboard only**: a pointer drag focuses the thumb from script, so Core gates the ring on the last input modality (`Slider.tsx:833-850`). The tooltip opens on focus | `--focus-outline-*` (2px `--color-accent`, 3px offset) |
| disabled | the whole control is at 0.5 opacity, and each thumb's fill becomes `--color-background-muted`. The thumb keeps its Tab stop (`aria-disabled`), and a focused disabled thumb still shows the ring | `--color-background-muted` (hvn neutral 95) |

- **Status** sets `aria-invalid` for `error` and renders a **detached** FieldStatus below the field (`statusVariant="detached"` is hard-coded, `Slider.tsx:1698`). The rail, fill and thumb don't change colour. The Astryx structure screenshot matches this: its status rows differ only by the message box.
- **Range** draws hover, pressed and focus per thumb. When both thumbs sit on the same value, they separate toward the press or the first movement.
- **Disabled thumb contrast is a risk in hvn.** A neutral-95 thumb at 0.5 opacity, on a neutral-90 rail, also at 0.5 opacity, on white, is close to invisible. Astryx's accessibility note asks for a 3:1 thumb against the track and the surface. That rule is for enabled thumbs, but the design ticket should look at the disabled thumb.

### Coarse pointers

The visible geometry doesn't change. Under a coarse pointer:

- the control's short axis gets a 24px minimum, which is invisible and keeps the rail and thumb centred (`trackContainerHorizontal.minBlockSize`);
- each thumb draws an invisible `::before` touch target of 48px (`motion/uikit/slider.ts` `thumbHitTarget`). In a range the two targets stop at half the gap between the thumbs;
- a thumb grows to **1.55×** (`liftScale`) while a finger holds it, with a spring;
- the drag tracks like iOS's UISlider: the value follows the finger's travel, and a release coasts.

So **Slider reads no `--size-element-*` token and doesn't belong on the Touch sizing artboard.** hvn's type ramp still enlarges its mark labels, text value and tooltip text, as it does all text.

### What a theme override can reach

`astryx theme targets Slider`:

| Key | Element | Props | States |
|---|---|---|---|
| `slider` | the row (control + text value) | `orientation` | `disabled` |
| `slider-control` | the interactive box | `orientation` | `disabled` |
| `slider-track` | the rail | `orientation` | none |
| `slider-thumb` | each thumb | `orientation` | `disabled` |

- **Themeable**:
  - the rail's colour and radius (`slider-track`);
  - the thumb's fill, a ring or shadow, and its disabled look (`slider-thumb` `base` and `disabled`). Hover needs a nested `":hover"`, as hvn's Button override does. A ring has to be a `boxShadow`: the thumb has no `box-sizing`, so a `border` would grow it past 20px and move it off centre;
  - padding around the control (`slider-control`); Core keeps every part in place when the control has padding;
  - the colours of the fill, the filled marks and the thumb together, through `--color-accent`, and the rail and unfilled marks through `--color-track`. Those are global tokens.
- **Fixed**:
  - the 20px thumb, the 4px rail and fill, the 2 × 8px marks and the 14px mark-label offset;
  - the 160px vertical length;
  - the fill and the marks have **no theme key**, so they follow `--color-accent` and `--color-track` only;
  - the 15% hover mix and the 0.5 disabled opacity;
  - the value tooltip's surface, which belongs to the Overlay map's `tooltip` key;
  - the touch sizes and the lift.

## FileInput

### Props that change visuals

- **`mode`**: `input`\* | `dropzone`.
- **`status`**: `{type: error | warning | success, message?}`. A file that fails `accept`, `maxSize` or `maxFiles` sets an `error` status by itself (`FileInput.tsx:87-140, 550-554`).
- **`statusVariant`**: `attached`\* | `detached` | `tooltip`. Dropzone mode "does not support `attached`": Core still renders it in 0.7.11, and from the next minor a dropzone resolves `attached` to `detached` (`FileInput.tsx:408-419`).
- **`value`**: `null` shows the placeholder; a file shows its name and a clear button. This is the filled-versus-placeholder axis.
- **`isLoading`**, or a pending `changeAction`: the busy state.
- **`isDisabled`**.
- **`isMultiple`**: changes only the default placeholder ("Choose files") and joins several names with ", ".
- **`placeholder`**, plus the Field props (`label`, `isLabelHidden`, `description`, `isRequired` / `isOptional`, `labelTooltip`, `width`).
- **Behaviour only**: `accept`, `maxSize`, `maxFiles`, `changeAction`, `disabledMessage`, `onChange`.

There is no `size`, no `variant` and no read-only state. The control has no pressed paint: no `:active` style.

### Anatomy and geometry

**Input mode** (`styles.compact`):

- **Box**: `height: --size-element-md` (32px, 36px on hvn's coarse rule), 4px block and 8px inline padding, an 8px gap, a 1px solid border and `--radius-element` (8px). The content row is 22px.
- **Content**, left to right:
  - an `upload` icon, `sm` (16px), `secondary`. hvn maps it to Hugeicons `Upload01Icon`;
  - the placeholder or the file names, which fill the row and truncate with an ellipsis;
  - the status icon (`md`, 20px), only for `attached` or `tooltip` placement;
  - the clear button (20 × 20px), only when filled.
- **Busy**: the upload icon goes away. The text stays, and a `sm` Spinner (14px box) sits after it.

**Dropzone mode** (`styles.dropzone`):

- **Box**: a column with centred content, 24px block and 16px inline padding, an 8px gap, a 1px **dashed** border and `--radius-element`. Its height comes from the content, not a size token.
- **Content**: an `upload` icon at `md` (20px), then the placeholder. While a file is dragged over it, the placeholder reads "Drop files here".
- **Height**: about 98px empty. It is about 98px filled too: the centred names wrap, and the clear button sits below them. It is about **70px while busy**: the content is replaced by a lone `md` Spinner (20px box), so the zone shrinks during an upload.
- **Status icon**: the dropzone shows one only for `tooltip` placement.

### Tokens

- **Box**:
  - `--color-background-surface` fill;
  - `--color-border-emphasized` border, and `--color-accent` on `:focus-within`;
  - `--border-width`, `--radius-element`;
  - `--duration-fast` and `--ease-standard` on the border, the shadow and, for the dropzone, the background.
- **Hover**: `inset 0 0 0 2px color-mix(in srgb, --color-accent 20%, transparent)`, only under `(hover: hover)`. Input mode drops it while focused. **This is a blue tint.** The shared input shell's hover is `--color-border-emphasized` at 30% (`Field/inputStyles.stylex.ts`), which hvn also exposes as `--shadow-inset-hover`.
- **Focus**: only the border colour changes. The shared shell adds a 2px `--color-accent-muted` inset on `:focus-within`, and FileInput doesn't.
- **Drag-over** (dropzone only): `--color-accent` border and `--color-accent-muted` fill (hvn blue 90).
- **Status border**: `--color-border-<status>`, which defaults to `var(--color-text-<status>)` and isn't overridden by hvn (`theme/tokens.stylex.ts:89-91`). The status border also holds while focused, so a focused field with a status has no accent border. Status has no hover shadow of its own: the blue hover stays.
- **Text**:
  - the placeholder is `--text-body-size` / `--text-body-leading` (14/20) in `--color-text-secondary`;
  - file names use the same size in `--color-text-primary`;
  - while busy, the input-mode text uses the file-name style, so a busy placeholder turns primary;
  - on iOS under a coarse pointer, both get a 16px floor (`max(1rem, --text-body-size)`) against Safari's focus zoom.
- **Spinner**: the default shade, a `--color-accent` arc on a `--color-track` ring.
- **Disabled**: 0.5 opacity, the default cursor and no hover. The trigger keeps its Tab stop, and a focused disabled field still shows the accent border. A status border wins over the disabled border, because it is applied later.

### States

| State | Input mode | Dropzone |
|---|---|---|
| rest | grey outline | grey dashed outline |
| hover | 2px accent-20% inset | 2px accent-20% inset |
| focus | accent border (keyboard focus on the hidden trigger shows through `:focus-within`) | accent dashed border |
| drag-over | none | accent border, accent-muted fill, "Drop files here" |
| loading | `sm` spinner after the text, no hover, no clear button | `md` spinner only, no hover |
| disabled | 0.5 opacity, no clear button | 0.5 opacity, no clear button |

- **Pressed and open**: neither is drawn. A click opens the native file picker.
- **Filled versus placeholder** is an axis of its own. When filled, the text turns primary and the clear button appears; in a dropzone the icon is also replaced by the names.

### Coarse pointers

- **Input mode is 32 → 36px**, through hvn's existing `adaptations` rule on `--size-element-md`. It is the family's only `--size-element-*` reader.
- The clear button stays 20px. Astryx grows its invisible hit area toward 44px and stops it short of the status icon and spinner (`InputClearButton.tsx`).
- The dropzone has no size token, so it grows only with hvn's ×1.14 type ramp: 16/24 text adds 4px.

### What a theme override can reach

`astryx theme targets FileInput`:

| Key | Element | Props | States |
|---|---|---|---|
| `file-input` | the box (both modes) | `mode`, `status` | none |
| `file-input-icon` | the upload glyph | `mode` | none |

- **Themeable**:
  - the box's border style, fill, radius and padding per mode (`mode:input`, `mode:dropzone`);
  - the status borders (`status:error` and so on);
  - the hover and focus shadows, through nested `":hover"` and `":focus-within"` keys. For example, `file-input` `base` with `":hover:not(:focus-within)": {boxShadow: "var(--shadow-inset-hover)"}` matches the shell's grey hover, and `":focus-within": {boxShadow: "inset 0 0 0 2px var(--color-accent-muted)"}` matches the shell's focus;
  - the upload icon's colour per mode;
  - the clear button, status icon, status message and spinner through their shared keys.
- **Not targetable per component**:
  - drag-over, busy and disabled have no data attribute on the box, only StyleX classes. Drag-over follows `--color-accent` and `--color-accent-muted`; disabled is a fixed 0.5 opacity;
  - the icon sizes (`sm` in input mode, `md` in the dropzone), the spinner sizes, the 20px clear button, and "Drop files here" replacing the placeholder;
  - the input-mode height is `--size-element-md` for every FileInput, so it can only change globally.

## Draft frame keys

These follow [Component frame coverage](https://github.com/hvn-oss/ds/issues/37):

- every combination is drawn;
- `state` comes last;
- a prop is a key only if it changes the component's own fill, outline, text colour or box size.

[Data Input frame coverage](https://github.com/hvn-oss/ds/issues/58) settles them.

### Slider: `range / orientation / state`

| Key | Values | Why it's a key |
|---|---|---|
| `range` | `no-range`\*, `range` | a second thumb, and the fill moves off the start |
| `orientation` | `horizontal`\*, `vertical` | box size (full width × 20 versus 20 × 160) |
| `state` | `rest`, `hover`, `pressed`, `focus`, `disabled` | for one thumb; `hover`, `pressed` and `focus` frames show the open value tooltip |

**2 · 2 · 5 = 20 frames**, for example `no-range / horizontal / rest`. Drawing vertical only as an example panel would give 10.

**Example panels**:

- **`valueDisplay`**: `text` adds a text column, and `none` hides the bubble.
- **`marks`**: unlabelled and labelled, with filled and unfilled marks.
- **`status`**: the three detached messages; the control doesn't change.
- **Field content**: description, required and label tooltip.
- **`disabledMessage`**: its tooltip.

### FileInput: `mode / status / value / state`

| Key | Values | Why it's a key |
|---|---|---|
| `mode` | `input`\*, `dropzone` | box size, border style |
| `status` | `none`\*, `success`, `warning`, `error` | outline colour, plus the status icon in input mode |
| `value` | `placeholder`\*, `filled` | text colour, the clear button, and the icon swap in a dropzone |
| `state` | input: `rest`, `hover`, `focus`, `loading`, `disabled`; dropzone: those plus `drag-over` | |

- **Frames**: input 4 · 2 · 5 = 40, dropzone 4 · 2 · 6 = 48, so **88 frames**. For example, `input / none / placeholder / rest` or `dropzone / error / filled / focus`.
- **Duplicates**: some frames are identical in Core. A busy dropzone draws only a spinner, whatever the `value`, and drag-over shows the placeholder whatever the `value`. A strict full grid still draws them; the coverage ticket can decide to collapse them.
- **Two choices the coverage grilling has to settle**:
  - `value` isn't an Astryx prop name but a value's presence, so `filled` / `no-filled` would follow the boolean rule more strictly. The grilling settles "filled versus placeholder" for every family, so it should pick one wording.
  - `drag-over` is a new `state` value. It is mutually exclusive in time with the others, so it fits the `state` key, but the roadmap's list doesn't have it yet.
- **Status messages in frames**: input-mode status frames can show the `attached` message, as the reference does. Dropzone status frames should use `detached`, which is where Core is heading.

**Example panels**: `isMultiple` (joined names and "Choose files"), long names truncated or wrapping, the `detached` and `tooltip` status placements, `disabledMessage`, and the Field content.

## Touch sizing artboard

| Control | Reads | Desktop → touch |
|---|---|---|
| FileInput, input mode | `--size-element-md` | 32 → 36px |
| FileInput, dropzone | no size token | grows only with text (≈98 → ≈102px) |
| Slider | no size token | none visible; 24px track floor, 48px thumb target, 1.55× lift while held |

Only **FileInput's input mode** goes on the Touch sizing artboard and the docs page's control sizes table, as a single `md` row: FileInput has no `size` prop. A note that Slider doesn't change size under touch would stop readers from looking for it.
