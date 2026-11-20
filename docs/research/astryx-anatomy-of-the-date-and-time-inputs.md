# Astryx anatomy of the Date and time inputs

Research for [Astryx anatomy of the Date and time inputs](https://github.com/hvn-oss/ds/issues/55), part of the map [hvn visual identity: Data Input components](https://github.com/hvn-oss/ds/issues/51).

The question: for Calendar, DateInput, DateRangeInput, DateTimeInput and TimeInput, what are the props, sizes and interactive states (including read-only, invalid/status, open, and filled versus placeholder), and which tokens and styles do they read? Which visuals can the hvn theme change with token-based component overrides, and which are fixed? Which parts do they share with other Data Input families? What draft frame key fits each one, and which controls read `--size-element-*`? How does Calendar paint today, selected, in-range, outside-month and disabled days?

## Sources

All claims come from these primary sources, read on 2026-11-19:

- **Core source**: `@astryxdesign/core@0.7.11` as installed in this repo (`node_modules/.pnpm/@astryxdesign+core@0.7.11_…/node_modules/@astryxdesign/core/src/`). Paths below are relative to that `src/`.
- **CLI**: `pnpm exec astryx component <Name>` from `apps/docs`, and `vpx astryx theme targets <Name>` from `packages/ds`.
- **hvn theme**: `packages/ds/src/themes/hvn/hvnTheme.ts` and `icons.js`, and the built `packages/ds/dist/themes/hvn/hvn.css`.
- **Structure screenshots**: `docs/reference/astryx-design-system/Data Input/{Calendar,DateInput,DateRangeInput,DateTimeInput,TimeInput}.png`. They show structure only, and in places they don't match the 0.7.11 code (see [Where the screenshots and the code disagree](#where-the-screenshots-and-the-code-disagree)).

Like the Action research, everything here is from 0.7.11. The docs site documents a newer Core, so check again when Core is bumped.

## Summary

- **One field shell.** DateInput, DateRangeInput and TimeInput, and both DateTimeInput segments, paint the same bordered shell as TextInput, from `Field/inputStyles.stylex.ts`. Size only changes the height (28 / 32 / 36). Padding, text, icons and gap are the same at every size. Their visuals are the Text fields shell's, so their designs should wait for it, as the map already says.
- **None of them has a read-only state.** None of the five takes `isReadOnly`. Disabled fields set the native `readOnly` attribute internally, but they paint as disabled.
- **Status has two layers.** The `status` prop recolours the border, adds a status-coloured hover ring and an on-field status icon, and shows the FieldStatus message. A typed value that can't be parsed only turns the text `--color-text-secondary` and sets `aria-invalid`, with no border change.
- **`open` adds nothing to the field.** No field changes its own paint when its panel opens. DateInput looks focused, because focus stays in the input. DateRangeInput looks at rest, because focus moves into the calendar dialog, which sits outside the field's DOM. The toggle icon gets `data-state="expanded"`, which paints nothing by default. So `open` isn't in any draft `state` list; the open compositions go in example panels.
- **The panels are the shared Popover surface,** with each component's own padding inside it. The Calendar panel has 12px padding, and DateTimeInput's time listbox has 4px. hvn's 8px Menu panel padding applies only to `dropdown-menu` and `context-menu`, so neither panel gets it today.
- **Calendar reads `--size-element-*` for its grid.** Day buttons are `--size-element-sm` (28px circles), and cells, columns and the weekday row read `--size-element-md` (32px). hvn's coarse-pointer rule therefore grows the whole calendar, along with every field shell.

## Shared anatomy

### The field shell

The shell is `inputWrapperStyles.base` (`Field/inputStyles.stylex.ts:32-81`). Its header lists TextInput, TextArea, NumberInput, DateInput, TimeInput, Selector, Typeahead and Tokenizer as consumers. DateRangeInput and DateTimeInput use it too.

| Part | Value | Tokens |
|---|---|---|
| Box | flex row, centred; 4px block and 8px inline padding; 8px gap | `--spacing-1`, `--spacing-2` |
| Height | per size: 28 / 32 / 36 | `--size-element-sm|md|lg` (component `sizeStyles`) |
| Min width | DateInput and DateRangeInput 180px, TimeInput 120px, DateTimeInput segments a 196px flex basis | literals |
| Border | 1px solid | `--border-width`, `--color-border-emphasized` |
| Radius | 8px | `--radius-element`, through `--_field-radius` |
| Fill | surface | `--color-background-surface` |
| Text | body 14/20, primary; placeholder in secondary | `--text-body-size`, `--text-body-leading`, `--font-family-body`, `--color-text-primary`, `--color-text-secondary` |
| Motion | border-color and box-shadow transition | `--duration-fast`, `--ease-standard` |

Text and icons are the same at every size, so `sm` is just a shorter `md`. iOS on a coarse pointer gets a 16px font-size floor (`DateInput.tsx:116-121` and the same in each component).

**States of the shell:**

| State | Paint | Source |
|---|---|---|
| rest | the outline above | `inputWrapperStyles.base` |
| hover | `inset 0 0 0 2px` of `--color-border-emphasized` at 30%, only under `(hover: hover)` and when not focused | `:68` |
| focus (`:focus-within`) | border `--color-accent`, plus `inset 0 0 0 2px --color-accent-muted` | `:50-53`, `:70` |
| disabled | `opacity: 0.5`, border back to `--color-border-emphasized`, no shadow, default cursor | `:74-80` |
| disabled + keyboard focus | a disabled field stays focusable (`aria-disabled`), and still shows the accent border and the muted ring | `Field/inputDisabledFocus.ts` (`withinRing`, `inputFocusRing`) |
| loading | normal paint plus a trailing `Spinner size="sm"`. Typing, picking and clearing are blocked | each component, `isBusy && <Spinner …>` |
| status | border `--color-border-<status>`, which Astryx sets to `--color-text-<status>` (`theme/tokens.stylex.ts:89-91`). Hover gets `--shadow-inset-<status>` (30% of the status border). A trailing status icon is drawn at `md` (20px) in the status colour | `inputStatusBorderStyles`, `inputStatusHoverShadowStyles`, `inputStatusFocusWithinStyles`, `hooks/useInputStatusIcon.tsx:133,195-205` |

Two side effects of how StyleX merges per property:

- **A status field loses the focus ring.** The status hover-shadow style redefines `boxShadow` with `default: 'none'`, so a focused field with a status keeps its status border and draws no `--color-accent-muted` ring.
- **A disabled field with a status keeps its status border.** The status border is applied after the disabled border, so a disabled error field shows a red border at 0.5 opacity.

**Parts inside the shell:**

- **Calendar toggle** (DateInput, DateRangeInput, DateTimeInput's date segment) is a bare `<button>` holding the semantic icon `calendar` at `sm` (16px), in `secondary` colour. It comes **first**, before the text. It has 8px corners and the shared focus outline (2px `--color-accent`, 3px offset). In DateRangeInput it has `tabIndex=-1`.
- **Clock icon** (TimeInput, DateTimeInput's time segment) is semantic `clock`, at `sm` and `secondary`. It's leading and not a button on the typed field.
- **Clear button** (`Field/InputClearButton.tsx`) is a ghost icon-only `Button size="sm"` with its height pinned to **20px** (a literal). It holds semantic `close` at `sm` in `secondary`, and its tooltip reads "Clear". It appears only when `hasClear` is set, a value is present and the field isn't disabled. Its theme keys are `input-clear-button` and `input-clear-icon`.
- **Status icon**: semantic `warning`, `error` or `success` at `md`, coloured with the status colour. Its theme key is `input-status-icon` (props `size` and `status`). It's hidden when `statusVariant="detached"` and inside an InputGroup.
- **Field wrapper**: label, description, optional or required marker, label tooltip, and the FieldStatus message (`attached`, `detached` or `tooltip`). This is the `Field` component, which belongs to the Text fields family. hvn already overrides `field-status`.

hvn's icon registry maps `calendar` to `Calendar04Icon` and `clock` to `Clock01Icon` (`icons.js:66-67`). No new semantic names are needed.

### Typed but unparseable text

DateInput, TimeInput and both DateTimeInput segments turn the typed text `--color-text-secondary` when it can't be read. This is the `inputInvalid` style (`DateInput.tsx:134`, `TimeInput.tsx:143`, `DateTimeInput.tsx:224`). They also set `aria-invalid` and announce the rejection in a live region. The border doesn't change. This is separate from the `status` prop, and it's a transient typing state, so it fits an example panel.

### The popover panel

DateInput, DateRangeInput and DateTimeInput open their panels through `usePopover`. The painted surface is the shared **`popover`** key (`Popover/usePopover.tsx:85-88,609`): `--color-background-popover`, a 16px `--radius-container` and `--shadow-low`. None of these components passes `padding`, so the surface has none of its own. The padding comes from what's inside: Calendar has 12px (`--spacing-3`), the preset sidebar 12px, and the time listbox 4px (`--spacing-1`). Every popover also has a visually hidden "Close calendar" button, which appears below the panel only while it has focus.

Compared with the roadmap's **Menu surface**:

- **Surface**: background, radius and shadow match, because they're the same `popover` key.
- **Panel padding**: hvn's 8px `MENU_PANEL` padding is set only on `dropdown-menu` and `context-menu`. The Calendar keeps 12px, which suits a grid. The time listbox keeps 4px, so its 8px-radius rows sit 4px from a 16px corner, not 8px. A `date-time-input-time-listbox` override (`padding: var(--spacing-2)`) would match the Menu surface.
- **Rows**: see the time option and preset rows below. Neither has the menu's pressed overlay or inset focus ring.

### Coarse pointers and presentations

- **The default presentation is native on touch.** For DateInput, TimeInput and DateTimeInput the default `presentation` is `adaptive-native`: the Astryx surfaces on a fine pointer, and the browser or OS picker (`input type=date|time`) on a coarse pointer. The native field still uses the same shell and `--size-element-*` heights (`DateInput/NativeDateField.tsx:247-249,595`).
- **The bottom-sheet presentations are out of scope.** The map leaves them to the Overlay map.
- **DateRangeInput is always a popover.** It has no `presentation` prop, so a touch user sees the Calendar popover. It's the one place the Calendar grid shows on touch by default.

## Per component

### Calendar

**Props that change visuals**: `mode` (`single`\* | `range`), `numberOfMonths` (1\* | 2), `hasOutsideDays` (true\*), `hasWeekNumbers` (false\*), `hasVariableRowCount` (false\*: always six rows), `min`, `max`, `dateConstraints`, `minRangeSpan` and `maxRangeSpan` (these disable days), and `value`. `weekStartsOn` and `calendar` change only the content. There's **no `size` prop** and no disabled prop. (\* = default.)

**Anatomy and sizes** (`Calendar/styles.ts`):

- **Root**: 12px padding (`--spacing-3`) and a 220px minimum width. Two months sit side by side 16px apart (`--spacing-4`), and wrap below about 488px.
- **Header**: a previous and a next nav button, with the "January 2026" label centred between them in label size, `--font-weight-semibold`, `--color-text-primary`. It has 8px margin below and an 8px gap. With two months, one header spans both.
- **Nav buttons**: a ghost, icon-only `Button` with semantic `chevronLeft` or `chevronRight` at `sm`, mirrored in RTL (`Calendar.tsx:749-786`). Calendar doesn't set their size, so they follow `SizeContext` and default to `md`, a 32px square. They're disabled at the `min` and `max` month.
- **Weekday row**: 12px supporting text, normal weight, `--color-text-secondary`. Each cell is `--size-element-md` wide and `--size-element-md + 4px` tall (36px), with 4px padding below.
- **Grid**: 7 columns of `1fr`, with each column at least `--size-element-md` (32px) wide. Each cell is `--size-element-md` (32px) tall. The week-number column is `--size-element-md` wide and uses secondary supporting text.
- **Day button**: `--size-element-sm` (28px) square with a `--radius-full` circle. Body-size text, centred in its 32px cell. A `::before` adds 2px of hit area on every side, so neighbouring days touch. The transition is background-color and color, `--duration-fast`.

At hvn's desktop sizes, a one-month calendar is 7 × 32 + 2 × 12 = **248px wide**. With the default six rows it's 12 + 32 (header) + 8 + 36 (weekdays) + 6 × 32 + 12 = **292px tall**.

**How days paint** (`Calendar/styles.ts:251-313`, `Calendar.tsx:1407-1491`, `dayCellUtils.ts:43-105`):

| Day | Paint | Tokens |
|---|---|---|
| default | transparent circle, primary text | `--color-text-primary` |
| hover | the shared hover overlay as a `background-image` on the circle, only under `(hover: hover)`. It also draws over a selected day's blue | `--color-overlay-hover` |
| pressed | the pressed overlay. A coarse pointer paints it through `data-astryx-press` | `--color-overlay-pressed` |
| focus | the shared 2px outline with a 3px offset, round because the circle is | `--focus-outline-*` (`--color-accent`) |
| today | a 1px inset ring on the circle (`aria-current="date"`) | `--color-border-emphasized` |
| today, in a range | a 1px inset ring in `--color-text-primary`, so it shows on the blue band | `--color-text-primary` |
| selected (single mode, and range start and end) | a filled circle in white text. Under forced colours it uses `Highlight` / `HighlightText` | `--color-accent`, `--color-on-accent` |
| in range (between the endpoints) | a band behind the circles: a separate element inset 2px top and bottom, with `--radius-full` caps at the range ends, at row starts and ends, and wherever the run breaks at a disabled or outside day. The endpoints' band is inset 2px on their outer side. The text stays primary | `--color-accent-muted` |
| range preview (range mode, start picked, hovering) | the same band shape | `--color-overlay-hover` |
| disabled (`min`, `max`, `dateConstraints`, span limits) | `opacity: 0.3`, no hover overlay, default cursor, still focusable through `aria-disabled` | fixed |
| outside month | `--color-text-secondary` at **0.3** opacity. Outside days always count as disabled (`effectivelyDisabled: isDisabled \|\| isOutside`), and the disabled 0.3 wins over the outside style's 0.5. They're never today, selected or in range, and can't be picked | `--color-text-secondary` |
| outside month with `hasOutsideDays={false}` | an empty cell | — |

Two edge cases:

- **A range endpoint that's today** gets both the blue fill and the 1px `--color-text-primary` inset ring, because `isSelected` is true only in single mode (`Calendar.tsx:1363-1371`).
- **A disabled day can be selected**, for example when `value` falls on a constrained date. It paints as the blue circle at 0.3 opacity.

hvn values: `--color-accent` is blue 45 and `--color-accent-muted` is blue 90, so the selected day is solid blue on a light-blue band. `--color-border-emphasized` is neutral 80, so the today ring is as quiet as the input outline.

**Theme keys** (`astryx theme targets Calendar`):

| Key | Element | Props | States |
|---|---|---|---|
| `calendar` | the root | `mode` | — |
| `calendar-nav` | each nav Button | `nav` (`prev`, `next`) | `disabled` |
| `calendar-day` | the day `<button>` | — | `selected`, `today`, `disabled`, `in-range`, `marker` (`today-only`, `today-in-range`) |

- The nav buttons also carry the `button` key with `variant:ghost`, so any hvn ghost-Button override changes them too.
- `calendar-day` reaches the circle: its fill, text, the `boxShadow` ring, `borderRadius` and opacity. `marker` exists so a theme can target exactly the days that show the today ring.

**Fixed (not reachable per component)**:

- **The range and preview bands** are unclassed elements, separate from the day button. Their colours come only from the global `--color-accent-muted` and `--color-overlay-hover` tokens, which the field focus ring and preset rows also use. Their pill caps (`--radius-full`) and the 2px inset (`BAND_INSET`, a literal) are fixed.
- **The month label's semibold weight** is `--font-weight-semibold`. hvn headings are medium, but this label can only change through the global weight token or a nested selector on `calendar`, which hasn't been tried.
- **Geometry**: the cell and day sizes are tied to the size tokens, the 12px root padding is reachable through `calendar` `padding`, and the outside and disabled opacities are fixed.

**Design note**: day buttons are circles and the range band has pill caps, while the roadmap says controls are 8px rectangles and pills are only for chips and badges. A theme can square the day off with `calendar-day` `borderRadius`, but the band's caps would stay pills. The design ticket has to choose between the shapes Astryx gives (circle and band) and a day that doesn't match its band.

### DateInput

**Props that change visuals**: `size` (sm | md\* | lg), `status` (warning | error | success, with an optional message), `statusVariant` (`attached`\* | `detached` | `tooltip`), `isDisabled`, `isLoading`, `hasClear`, `value` (filled versus placeholder), `placeholder` (`'Select a date'`, or a format hint while focused and empty), `format`, `numberOfMonths` (the popover Calendar), `width`, plus the Field props `label`, `isLabelHidden`, `description`, `isOptional`, `isRequired` and `labelTooltip`. There's **no `isReadOnly`**.

**Anatomy, in order**: the calendar toggle, then the text input (`role="combobox"`, `aria-haspopup="dialog"`), the clear button, the spinner and the status icon (`DateInput.tsx:871-1001`). The popover is rendered **inside** the field box, so the field keeps `:focus-within` while focus is in the calendar.

**Sizes**: the field is 28 / 32 / 36px tall, at least 180px wide (`DateInput.tsx:139-152`).

**Open**: clicking the input or pressing ArrowDown opens the panel with focus kept in the input (`skipAutoFocus`). The toggle button moves focus into the grid. Either way the field paints **focus**. The toggle icon's `data-state` changes from `collapsed` to `expanded`.

**Theme keys**: `date-input` (props `size` and `status`; state `disabled`) on the field box, and `date-input-toggle-icon` (state `state`: `expanded` | `collapsed`) on the calendar glyph. The panel is `popover`, and the days use the `calendar*` keys.

### DateRangeInput

**Props that change visuals**: the same as DateInput, except that `hasClear` **defaults to true**, `numberOfMonths` **defaults to 2**, the placeholder is `'Select date range'`, and it adds `presets`, `minRangeSpan` and `maxRangeSpan`. It has no `format`, `calendar` or `presentation`. There's **no `isReadOnly`**.

**Anatomy**: the calendar toggle (not tabbable), then the **trigger `<button>`** showing the range or the placeholder, with no typing. The range text is primary, and the placeholder is `--color-text-secondary` (`DateRangeInput.tsx:148`). Its text is body 14/20 on one line, truncated with an ellipsis. Then the clear button, the spinner and the status icon.

**Sizes**: 28 / 32 / 36px tall, at least 180px wide (`:258-271`).

**Open**: the popover autofocuses into the range calendar, and the popover is rendered **outside** the field box. While it's open, the field paints **rest** (or hover), not focus. Only the toggle icon's `data-state` changes.

**Popover contents** (`:883-971`): an optional **preset sidebar**, then a range Calendar.

- **Preset sidebar** (`:195-222`): a column with 12px padding, a 4px gap and a 140px minimum width. It's separated from the calendar by a 1px `--color-border-emphasized` line on its inline-end and block-end edges, and it wraps above the calendar when space is short.
- **Preset rows** (`:223-256`): `<button>`s with 4px / 8px padding and label text at 14/20, which makes them **28px** tall at every size. They have 8px corners and `--color-text-primary`.
  - **Hover**: a `--color-overlay-hover` *background colour*, not an image.
  - **Pressed**: none.
  - **Focus**: the shared outer 2px ring with a 3px offset, not the menu's inset ring.
  - **Selected** (`aria-current`): `--color-accent-muted` fill with `--color-text-accent`, and it doesn't change on hover.
  - **Disabled**: `--color-text-disabled`, transparent.

**Theme keys**:

- `date-range-input`: props `size` and `status`; state `disabled`.
- `date-range-input-toggle-icon`: state `state`.
- `date-range-input-presets`: base only. It can change the sidebar line, which uses the quiet input-outline colour where hvn's roadmap uses `--color-border` for hairlines.
- `date-range-input-preset`: states `selected` and `disabled`.

### DateTimeInput

**Props that change visuals**: `size`, `status`, `isDisabled`, `isLoading`, `hasClear`, `value`, `placeholder` (date) and `timePlaceholder` (`'Select a time'`), `hasSeconds`, `hourFormat`, `timeIncrement`, `timeOptionInterval` (adds a time-options popover), `numberOfMonths`, `width`, plus the Field props. **It has no `statusVariant`**: the status is always `detached` (`DateTimeInput.tsx:1041,1687`), so there's no on-field status icon, and the message floats below. There's **no `isReadOnly`**.

**Anatomy**:

- **Row**: an unbordered flex row with an 8px gap, which wraps (`:161-166`). This row is the `date-time-input` element.
- **Date segment**: a full shell, with the calendar toggle, the typed date (a combobox), then the clear button, the spinner and the status icon. Because the status is detached, the status icon is never drawn.
- **Time segment**: a full shell, with the clock icon and the typed time. It's a combobox when `timeOptionInterval` is set.
- **Layout**: both segments have `flex: 1` with a 196px basis (`:159`), so they sit side by side from 400px of available width and stack below it.
- **Status**: both segments get the status border. The clear button and spinner sit only in the date segment.

**Sizes**: each segment is 28 / 32 / 36px tall (`:292-302`).

**Open**:

- **Calendar**: rendered outside both segments. Clicking the date input keeps focus there, so the date segment paints focus. The toggle moves focus into the grid, so the segment paints rest.
- **Time options** (only with `timeOptionInterval`): a listbox popover with 4px padding, at most 300px tall and at least as wide as the anchor. Focus stays in the time input, so the time segment paints focus.

**Time option rows** (`:246-271,277-290`):

- **Shape**: 8px inline padding and 4 / 6 / 8px block padding by size, with body 14/20 text, which makes them **28 / 32 / 36px**, the same as menu rows. They have 8px corners and `--color-text-primary`.
- **Highlighted** (hover or arrow keys, through `aria-activedescendant`): a `--color-overlay-hover` fill.
- **Selected**: `--font-weight-medium` only, with no check mark and no colour.
- **Missing states**: no pressed paint and no focus ring.

**Theme keys**:

- `date-time-input`: props `size` and `status`; state `disabled`. It sits on the **unbordered row**.
- `date-time-input-date-segment` and `date-time-input-time-segment`: props `size` and `status`; **no `disabled` state**.
- `date-time-input-toggle-icon`: state `state`.
- `date-time-input-clock-icon`, `date-time-input-time-listbox` and `date-time-input-time-option`: base only.

A disabled segment can therefore be restyled only through the row's `disabled` state with a descendant selector, or through the shared tokens.

### TimeInput

**Props that change visuals**: `size`, `status`, `statusVariant`, `isDisabled`, `isLoading`, `hasClear`, `value`, `placeholder` (`'Select a time'`, replaced by a format hint while focused and empty), `hasSeconds`, `hourFormat`, `increment`, `width`, plus the Field props. There's **no `isReadOnly`**.

**Anatomy**: the clock icon (a leading identifier, not a button), the typed time input, the spinner, the clear button and the status icon (`TimeInput.tsx:836-891`). Unlike DateInput, the spinner comes before the clear button.

**Sizes**: 28 / 32 / 36px tall, at least 120px wide (`:148-161`).

**Open**: there is **no popover**. On a fine pointer TimeInput is a typed field only, with arrow keys stepping by `increment`. A list of time options exists only on DateTimeInput (`timeOptionInterval`). On a coarse pointer it's the OS picker, or bottom-sheet wheels.

**Theme key**: `time-input` (props `size` and `status`; state `disabled`). The clock icon has no theme key here; on DateTimeInput it does.

## What hvn can change, and what's fixed

**Reachable with token-only component overrides**:

- **Field shells**: `date-input`, `date-range-input`, `time-input`, and the two `date-time-input-*-segment` keys, by `size` and `status`. Disabled is reachable on every key except the DateTimeInput segments. `borderRadius` maps to `--_field-radius`.
- **Toggle icons**: by `expanded` or `collapsed`, which is the only hook for an open-state paint on the field. A wrapper-level open paint would need a nested `:has([aria-expanded="true"])` on the field key. That's plausible, since Action showed nested pseudo-classes work, but it hasn't been tried.
- **Calendar day circles**: `calendar-day` by `selected`, `today`, `disabled`, `in-range` and `marker`.
- **Calendar root and nav**: `calendar` (padding), `calendar-nav`, and `button` `variant:ghost`.
- **Preset sidebar and rows**: `date-range-input-presets` and `date-range-input-preset`.
- **Time listbox and options**: `date-time-input-time-listbox` and `date-time-input-time-option`. Base only, so highlighted and selected rows can't be targeted except with `[aria-selected="true"]` as a nested selector.
- **Panel surface**: the `popover` key, which every Popover shares.

**Shared tokens these components read**, where changing one changes others too:

- `--color-accent-muted`: the range band, the preset selection and every field's focus ring.
- `--color-overlay-hover`: day hover, the range preview, preset hover and time option highlight.
- `--color-border-emphasized`: the field outline, the today ring and the preset sidebar line.
- `--size-element-*`: the field heights and the calendar grid.

**Fixed in Core**:

- **Field shell**: the padding is the same at every size (4 / 8px), the icons are `sm` and the status icon is `md`, the clear button is 20px tall, and the disabled opacity is 0.5.
- **Day geometry**: days are `--size-element-sm` inside `--size-element-md` cells.
- **Day opacities**: disabled and outside days are at 0.3.
- **Range band**: its geometry and pill caps.
- **Text colours**: the placeholder and invalid-text colour (`--color-text-secondary`).
- **Statuses and layout**: DateTimeInput is always detached, and its segments stack below 400px.
- **Toggle position**: the calendar toggle is always leading.

**Overrides the review should consider** (proposals, not decisions):

1. `date-time-input-time-listbox` `padding: var(--spacing-2)`, so time options nest like menu rows.
2. `date-range-input-presets` line colour `--color-border`, the hairline, instead of `--color-border-emphasized`.
3. Whether open fields should keep a visible cue, since DateRangeInput looks at rest while its panel is open.
4. The day shape (see the Calendar design note).

## Shared with other Data Input families

| Part | Shared with | Where it's decided |
|---|---|---|
| Field shell (outline, hover, focus, status, disabled, loading) | TextInput, TextArea, NumberInput (Text fields); Selector, Typeahead, Tokenizer (Selectors and search) | [Text fields design](https://github.com/hvn-oss/ds/issues/59) |
| Field wrapper (label, description, FieldStatus, `statusVariant`) | every Field-wrapped input | Text fields (Field) |
| Clear button, status icon, spinner | TextInput and the other shells | Text fields |
| InputGroup membership (`groupStyles.inGroup`) | every input that can join a group | Text fields (InputGroup) |
| Popover surface | DropdownMenu, MoreMenu, Selector listboxes and every Popover | Menu surface (roadmap) |
| Time option rows (28 / 32 / 36, 8px corners, overlay highlight) | the shape of Menu rows and listbox options | Menu surface; [Selectors and search design](https://github.com/hvn-oss/ds/issues/61) for listbox options |
| Ghost icon-only nav Buttons | Button (Action) | already shipped |

The Calendar grid, the range band and the preset rows belong to this family alone.

## Draft frame keys

These follow [Component frame coverage](https://github.com/hvn-oss/ds/issues/37): `state` comes last, each component lists only the states it paints, and content slots go in example panels. Defaults are written out. Multi-value props are written with their value lists.

**Field keys.** The four fields share one key, because they share the shell:

`size{sm, md, lg} / status{no-status, error, warning, success} / value{placeholder, filled} / state{rest, hover, focus, loading, disabled}`

- `value` is a key because placeholder and filled text differ in colour. If the [Data Input frame coverage](https://github.com/hvn-oss/ds/issues/58) grilling moves it to an example panel to match Text fields, every field count halves.
- `open` isn't a state: no field paints it (see [Summary](#summary)).
- `pressed` isn't a state: fields have no press paint.

| Component | Frame key | Frames |
|---|---|---|
| DateInput | `size / status / value / state` | 3·4·2·5 = **120** |
| DateRangeInput | `size / status / value / state` | **120** |
| DateRangeInput preset row | `selected / state{rest, hover, focus, disabled}` (a selected row paints the same on hover) | 2·4 = **8** |
| DateTimeInput | `size / status / value / state`. Each frame draws both segments: `focus` is the date segment focused, and `filled` is both filled | **120** |
| DateTimeInput time option | `size / selected / state{rest, hover}` (`hover` is the highlight, which keyboard navigation shares) | 3·2·2 = **12** |
| TimeInput | `size / status / value / state` | **120** |
| Calendar | `mode{single, range} / months{1, 2}`, with no state; the panel has none | 2·2 = **4** |
| Calendar day | `day{default, today, selected, in-range, today-in-range, preview} / state{rest, hover, pressed, focus, disabled}`, plus `outside / rest` | 6·5 + 1 = **31** |
| Calendar nav | none: it's a ghost icon-only Button | 0 |

**Total**: about **535 frames**, or about **295** if `value` becomes an example panel. Most of it is four copies of the Text fields shell. Two alternatives for the coverage grilling to weigh:

- **Treat the date fields as composed.** Apply the "composed components draw only the states they add" rule to the shell: draw each field once per `size / status`, with its own parts (toggle, clock, segments), and leave the shell's states to TextInput. That gives about 12 frames per field.
- **Collapse the three single-field components.** Draw one shared grid, since only the leading glyph and the minimum width differ.

**Example panels, not keys**:

- **Fields**:
  - Clear button (`hasClear`) and the unparseable-text state.
  - `statusVariant` (attached, detached, tooltip) and the Field slots (description, optional, required, label tooltip, hidden label).
  - InputGroup membership and `width`.
  - The disabled field with keyboard focus.
- **Open compositions**:
  - DateInput with its calendar.
  - DateRangeInput with two months, with and without presets.
  - DateTimeInput with the calendar, and with time options.
- **DateTimeInput**: the stacked layout below 400px.
- **Calendar**:
  - `hasWeekNumbers`, `hasOutsideDays={false}` and `hasVariableRowCount`.
  - A range row: start, middle and end; a one-day range; a range wrapping across rows; and a range cut by a disabled day.
  - The today-endpoint edge case.
  - Disabled nav buttons at `min` and `max`.

## Touch sizing artboard

hvn's coarse-pointer rule sets `--size-element-sm|md|lg` to 32 / 36 / 40 below `lg` (`hvnTheme.ts:230-240`). In this family it changes:

| Control | Reads | Desktop | Touch |
|---|---|---|---|
| DateInput, DateRangeInput, TimeInput fields; DateTimeInput segments | `--size-element-sm|md|lg` | 28 / 32 / 36 | 32 / 36 / 40 |
| Calendar day button | `--size-element-sm` | 28 | 32 |
| Calendar cell and column | `--size-element-md` | 32 | 36 |
| Calendar weekday row | `--size-element-md` + 4px | 36 | 40 |
| Calendar (one month) | all of the above | 248 × 292 | 276 × 324 |
| Calendar nav Buttons | Button `md` → `--size-element-md` | 32 | 36 |

**These grow with the type ramp, not the tokens.** Like menu rows, they're padding plus line height, so 14/20 text becoming 16/24 grows them:

| Control | Desktop | Touch |
|---|---|---|
| Time option rows | 28 / 32 / 36 | 32 / 36 / 40 |
| Preset rows | 28 | 32 |

**These stay fixed**: the 20px clear button, the 16px icons and the 4 / 8px shell padding.

**What touch users actually see:**

- **DateInput, TimeInput and DateTimeInput** default to the OS picker on touch, inside the same grown shell.
- **DateRangeInput** is always the popover, so it's the control that puts the grown Calendar in front of touch users.

The Touch sizing section for this family therefore needs:

- **The field shell at both sizes.** It's the same shell as TextInput's, so it can share Text fields' row if that family adds one.
- **The Calendar grid at both sizes**, which only this family has.

## Where the screenshots and the code disagree

- **Toggle position**: the screenshots draw the calendar toggle as a **trailing** icon. In 0.7.11 code it's **leading**, before the text, in DateInput, DateRangeInput and DateTimeInput. The CLI anatomy calls DateRangeInput's "trailing", but the DOM disagrees.
- **TimeInput options**: the TimeInput screenshot shows an options popover ("Constrained" and "Increment"). In 0.7.11 only DateTimeInput (`timeOptionInterval`) has one.
- **DateTimeInput status icons**: the screenshot draws status icons in both segments. The code always uses the detached status, so it draws none.
- **Master rows**: the screenshot masters for the fields are laid out as 3 sizes × 8 rows (rest, hover, focus, error, warning, success, loading, disabled), with placeholder text only. That matches the draft key without `value`.

Draw what the code paints.
