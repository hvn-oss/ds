# Astryx anatomy of the Choice controls

Research for [Astryx anatomy of the Choice controls](https://github.com/hvn-oss/ds/issues/53), part of the map [hvn visual identity: Data Input components](https://github.com/hvn-oss/ds/issues/51).

The question: for CheckboxInput, CheckboxList (with CheckboxListItem), RadioList (with RadioListItem) and Switch, what are the props, sizes and interactive states, and which tokens and styles does each read? Which visuals can the hvn theme change with token-based component overrides, and which are fixed? Which parts are shared with other Data Input families? What draft frame key fits each one, and which controls read `--size-element-*`? How does the existing Switch track override render?

## Sources

All claims come from these primary sources, read on 2026-11-19:

- **Core source**: `@astryxdesign/core@0.7.11` as installed in this repo (`node_modules/.pnpm/@astryxdesign+core@0.7.11_…/node_modules/@astryxdesign/core/src/`). Paths below are relative to that `src/`.
- **CLI**: `@astryxdesign/cli@0.7.11`, run from `apps/docs` as `pnpm exec astryx component <Name>` and `pnpm exec astryx theme targets <Name>`.
- **hvn theme**: `packages/ds/src/themes/hvn/hvnTheme.ts` and the built `packages/ds/dist/themes/hvn/hvn.css`. Light hex values below are read from the built CSS.
- **Structure screenshots**: `docs/reference/astryx-design-system/Data Input/{CheckboxInput,CheckboxList,RadioList,Switch}.png`. These show how to structure an artboard, not how hvn looks.

Nothing here was checked in a running browser. Where a claim depends on how two styles combine at runtime, it says so.

## Summary

- **None of the four reads `--size-element-*`.** Boxes, circles and tracks are fixed px sizes, only `sm` and `md`. Under a coarse pointer the controls keep their size and grow an invisible hit area toward 44px. hvn's touch rule doesn't change them, so the family adds no controls to the Touch sizing artboard.
- **The checkbox and radio visuals are shared indicators.** `CheckboxIndicator` and `RadioIndicator` also draw DropdownMenu's checkbox and radio rows, MultiSelector's options, Table's selection column and List's task markers. An override of `checkbox-indicator` or `radio-indicator` changes all of them.
- **Selection is already blue.** The checked box, the selected radio and the on track all fill with `--color-accent`. A checked CheckboxList row also gets a `--color-accent-muted` row fill. A selected RadioList row gets no fill.
- **Status doesn't paint the control.** `status` adds a detached FieldStatus box below the control or group and sets `aria-invalid`. The box, circle and track stay the same, even for `error`.
- **Read-only is drawn only on CheckboxList.** A read-only CheckboxInput looks and reacts exactly like an editable one. A read-only CheckboxList drops its row hover and its checked-row fill. RadioList and Switch have no read-only prop.
- **The Switch track override is a no-op in value.** It sets `--color-background-gray: var(--color-track)` on the track, but in hvn both tokens are neutral 90 / 25 (`#e2e2e2` / `#3b3b3b`). The off track renders the same with or without it.
- **The unchecked edges and the off track fall below 3:1.** Astryx's own docs ask for 3:1 against the surface. hvn's unchecked box and radio edge is 1.71:1 and the off track is 1.30:1.

## Shared anatomy

### Sizes

| Part | `sm` | `md` (default) | Source |
|---|---|---|---|
| Checkbox box | 20 × 20 | 24 × 24 | `Indicator/CheckboxIndicator.tsx` `boxSizeStyles` |
| Check mark (SVG, 10-unit viewBox, 1.5 stroke) | 12 × 12, ≈1.8px stroke | 14 × 14, ≈2.1px stroke | `checkmarkSizeStyles` |
| Indeterminate dash | 10 × 2, pill | 12 × 2, pill | `indeterminateSizeStyles` |
| Radio circle | 20 × 20 | 24 × 24 | `Indicator/RadioIndicator.tsx` `circleSizeStyles` |
| Radio dot | 8 × 8 | 10 × 10 | `dotSizeStyles` |
| Switch track | 32 × 20, 2px padding | 40 × 24, 4px padding | `Switch/Switch.tsx` `trackSizeStyles` |
| Switch thumb, off → on | 14 → 16, travels 12px | 16 → 20, travels 14px | `thumbOffSizeStyles`, `thumbOnSizeStyles` |

- **The thumb grows when the switch is on**, and an `md` on thumb (20px) overflows the 4px padding to sit 2px from the track's edge.
- **The box-to-label gap is 8px** (`--spacing-2`) for CheckboxInput and Switch, and Item's 8px gap in list rows.
- **The box and radio edges are 1px** (`--border-width`). The box radius is `--radius-inner` (4px in hvn). The radio, track and thumb use `--radius-full`.
- **The Switch docs pair the sizes**: the `sm` track matches the `sm` checkbox and radio rhythm (20px), and `md` matches `md` (24px).

### Coarse pointers and touch sizing

- **No control in the family reads `--size-element-*`.** A grep of `CheckboxInput`, `CheckboxList`, `RadioList`, `Switch`, `Indicator`, `Item` and `List` finds no reference. The only use in the field shell is `Field/Field.tsx:72-74`, which sizes the attached status overlap of text inputs and doesn't apply here: every Choice control uses the detached status. None of the four reads SizeContext either, so a Toolbar's `size` doesn't reach them.
- **What a coarse pointer does instead.** The hidden native input gets a 24 × 24 minimum (`inputCoarse`). A labelled CheckboxInput row, every RadioListItem row and the Switch input grow an invisible band toward 44px, stopping halfway to a neighbour (`utils/touchHitArea.ts`, `utils/hitArea.ts`). The visible control doesn't grow. A label-hidden checkbox gets no band: it is a marker in another component's row.
- **The Switch has its own touch presentation.** Under `pointer: coarse` the thumb lifts with `--shadow-low` on press, can be dragged, and the colour change crossfades (`Switch/useSwitchTouch.ts`, `switchFill.ts`). This is motion, not a size change.
- **What hvn's ×1.14 rule changes.** Labels go from 14/20 to 16/24. A `md` CheckboxInput or Switch row stays 24px, because its 24px box already matches the new line. A `sm` row grows from 20 to 24. CheckboxList rows grow only where the label is taller than the box: `compact` rows go from 28 to 32.

**Answer for the Touch sizing artboard**: the Choice controls have no `--size-element-*` controls to add. The ship ticket can skip the Touch sizing section, or add one line saying these controls stay fixed and rely on the 44px hit area.

### Interactive states and the tokens they read

The checkbox and radio indicators paint the same way (`Indicator/CheckboxIndicator.tsx`, `Indicator/RadioIndicator.tsx`). Hover reaches them through an ancestor marker (`indicatorScope`) on the row, so hovering the label tints the box too.

| State | Checkbox and radio | Switch track and thumb |
|---|---|---|
| rest, unchecked or off | 1px `--color-border-emphasized` edge, `--color-background-surface` fill | track `--color-background-gray`, thumb `--color-background-surface` |
| rest, checked or on | `--color-accent` edge and fill; check, dash and dot in `--color-on-accent` | track `--color-accent`, thumb `--color-background-surface` |
| hover (`hover: hover` only) | unchecked: edge mixed 20% toward `--color-tint-hover`, fill 5%. Checked: 15% | off track mixed 5% toward `--color-tint-hover`; on track 15% |
| pressed (mouse `:active`) | a `--color-overlay-pressed` layer over the box or circle, in its own radius | a `--color-overlay-pressed` gradient over the track and the thumb |
| focus (`:focus-visible`) | the shared ring drawn on the indicator itself (`hooks/useIndicatorFocusRing.tsx`): 2px `--color-accent`, 3px offset, following the box or circle radius | the shared ring on the track (`trackFocus`), pill-shaped. It is the one ring in Core not drawn by `focusOutline.stylex.ts` |
| disabled | 0.5 opacity, `--color-border` edge; unchecked fill becomes `--color-background-muted`. Label in `--color-text-disabled` | track 0.5 opacity; the off track keeps `--color-background-gray`. Label in `--color-text-disabled` |
| loading | the check is replaced by a `sm` Spinner (10px, 2px stroke) in `currentColor`: accent on an unchecked box, on-accent on a checked one | a `sm` Spinner in the thumb, default shade (`--color-accent` arc on `--color-track`) |

hvn light values: the edge `#c6c6c6` (1.71:1 on white) hovers to `#9e9e9e` (2.68:1). Accent is `#2563eb` (5.17:1) and hovers to `#1f54c8`. The off track is `#e2e2e2` (1.30:1), hovering to `#d7d7d7` and pressed to `#cbcbcb`. The thumb is white, so an off thumb sits on its track at 1.30:1. Motion is `--duration-fast` with `--ease-standard` for every colour and thumb change.

**Disabled stays focusable.** CheckboxInput, Switch and the lists use `aria-disabled`, not `disabled`, so a disabled control can still take keyboard focus. CheckboxInput and Switch still draw the ring on a disabled control. RadioListItem doesn't (it passes `isDisabled` to the ring hook). Disabled frames can stay `rest`-only.

### Labels and descriptions

There are two label styles in the family, and they don't match:

- **Field labels** (CheckboxInput, Switch, and the group label of CheckboxList and RadioList) come from `Field/FieldLabel.tsx`: `--text-label-size` / `--text-label-leading` (14/20), `--font-weight-medium`, `--color-text-secondary` (`#5e5e5e`). Descriptions are `--text-supporting-*` (12/20) in `--color-text-secondary`. Optional and required markers are 12/20 regular.
- **List row labels** (CheckboxListItem, RadioListItem) come from `Item/Item.tsx`: `--text-body-size` / `--text-body-leading` (14/20), regular weight, `--color-text-primary`. Row descriptions are 12/20 `--color-text-secondary`.

So a standalone checkbox has a grey medium label, while a checkbox in a list has a black regular one. The design ticket should decide whether that difference stays. The `checkbox-label` and `switch-label` keys can restyle the field label for these two components only.

### Status

`status` is `{type: 'error' | 'warning' | 'success', message?}`. On every Choice control it:

- adds a **detached FieldStatus** below the control or group when there is a message (`FieldStatus/FieldStatus.tsx` `detached`): 4px top margin (8px under a Switch, whose `statusGap` replaces it), 8px padding, `--radius-element`, 12/20 text and a `sm` status icon. hvn's `field-status` override paints it with the categorical pairs (`--color-background-red` / `--color-text-red` and so on), the same as badges.
- sets `aria-invalid` for `error`. RadioList sets it on the radiogroup, and on each radio only when `isRequired`.
- **doesn't change the indicator or track.** The indicators don't receive the status. An error checkbox has the same grey edge as a valid one.

## Per component

### CheckboxInput

**Props that change visuals**: `value` (`false` | `true` | `'indeterminate'`), `size` (`sm` | `md`\*), `isDisabled`, `isLoading` (also on while a `changeAction` is pending), `isReadOnly`, `status`, `isLabelHidden`, `description`, `labelIcon`, `isOptional` / `isRequired` (label markers), `width`. Behaviour only: `onChange`, `changeAction`, `htmlName`, `disabledMessage` (a tooltip), focus handlers. (\* = default.)

**Sizes**: the row is as tall as the taller of the box and the 20px label: 20px (`sm`) and 24px (`md`). The prop doc says "28px row height" and "36px row height"; the code has no such height.

**States**: unchecked, checked and indeterminate, each through rest, hover, pressed, focus, disabled and loading, as in the shared table.

**Read-only**: not drawn. A read-only checkbox keeps full opacity, the hover tint and the pressed overlay, and only ignores the change (`CheckboxInput.tsx:453-460`, `:609-615`). It loses its touch hit band, which isn't visible.

**Theme keys**: `checkbox-input` (prop `size`; the field wrapper), `checkbox-label` (the FieldLabel), `checkbox-indicator` (prop `size`; states `checked` and `disabled`), `checkbox-indicator-check` and `checkbox-indicator-dash` (prop `size`). The `checked` state is written to `data-checked` as `checked` or `indeterminate`, so the key `checked` matches only a checked box, and `checked:indeterminate` reaches the dash state (`utils/parseStyleKey.ts`).

**Fixed**: box, check and dash sizes; the check's path and stroke; the hover mix percentages (20%, 5%, 15%); the disabled 0.5 opacity; the 8px gap. The mouse-press layer is drawn by the box's wrapper with its own `--radius-inner` corners, so a `checkbox-indicator` `borderRadius` override changes the box and its focus ring but not the press layer; changing `--radius-inner` moves both. A theme can replace the whole indicator with `defineTheme({indicators: {checkbox}})`, but that is a component, not a token-only override.

**Draft frame key**: `value / size / state`, with `value` as `unchecked`, `checked` or `indeterminate` and `state` as `rest`, `hover`, `pressed`, `focus`, `disabled` or `loading`. Example: `checked / md / hover`. **36 frames** (3 · 2 · 6).

**Example panels**: description, label-hidden, label icon, optional and required markers, status (three detached FieldStatus boxes, as in Astryx's own artboard), and a read-only note.

### CheckboxListItem

A ListItem (`List/ListItem.tsx`) whose start content is a label-hidden CheckboxInput (`CheckboxList/CheckboxListItem.tsx`). It works inside CheckboxList or a plain List.

**Props that change visuals**: the checked state (`isChecked` alone, or from the list's `value`), `isDisabled`, `isLoading`, `description`, `endContent`, `align`, and the list's `density`, `hasDividers` and `isReadOnly`.

**Sizes**: rows have 8px inline padding, an 8px gap and `--radius-element` corners (`Item/Item.tsx` `root`). Density sets the block padding and the box size:

| Density | Block padding | Box | Row height, label only |
|---|---|---|---|
| `compact` | 4px | `sm` 20px | 28px |
| `balanced` (default) | 8px | `md` 24px | 40px |
| `spacious` | 12px, and 12px inline | `md` 24px | 48px |

**States**:
- **hover and pressed**: the row gets `--color-overlay-hover` and `--color-overlay-pressed` (`utils/interactionOverlay.stylex.ts`). The box only tints when the pointer is on the box itself, because the hover marker sits on CheckboxInput's own row, not on the list row.
- **checked**: the row fill is `--color-accent-muted` (`#d4e3ff`), unless the row is disabled or read-only. That style replaces the whole `background-color`, so a checked row shows no hover or mouse-press overlay; only the touch press (an image layer) still shows.
- **focus**: Item draws the shared ring on the row with `:has(:focus-visible)` (`utils/focusOutline.stylex.ts` `focusWithin`), and the checkbox draws its own ring on the box. Read from the source, a keyboard-focused row shows **both rings**. The design ticket should confirm this in a browser.
- **disabled**: the label and description go to 0.5 opacity (`Item` `disabledContent`), beside the disabled box.
- **loading**: the box shows the spinner, and the row is `aria-busy`.

**Theme keys**: no key of its own. The row carries `item` (props `density` and `align`; states `highlighted`, `selected` and `disabled`) and `list-item`. CheckboxListItem writes `data-selected="selected"` on a checked row, so `item: {selected: …}` reaches the checked-row fill. It also reaches every other selected Item, which uses the same `--color-accent-muted` today. The box uses the `checkbox-indicator` keys.

**Fixed**: the box size per density (`compact` → `sm`, else `md`), the checked-row fill being the only selected style, and the hover overlay being replaced on checked rows.

**Draft frame key**: `value / density / state`, with `value` as `unchecked`, `checked` or `indeterminate`, `density` as `compact`, `balanced` or `spacious`, and `state` as `rest`, `hover`, `pressed`, `focus`, `disabled` or `loading`. Example: `checked / balanced / rest`. **54 frames** (3 · 3 · 6).

**Example panels**: description, end content (badges or prices, as in Astryx's artboard), `align: first-line` with a wrapped label, and a select-all row with indeterminate.

### CheckboxList

A Field (group label, description, status) around a `role="group"` List of CheckboxListItems (`CheckboxList/CheckboxList.tsx`).

**Props that change visuals**: `density`, `hasDividers`, `isDisabled` (all rows), `isReadOnly` (all rows), `status`, `label` / `isLabelHidden` / `description`, `isOptional` / `isRequired`, `width`. It has **no `size` prop**: density sets the row and box size.

**States the group adds**:
- **disabled**: every row disabled, and the group label in `--color-text-disabled`.
- **read-only**: rows aren't interactive, so there is no row hover or press, and checked rows lose the `--color-accent-muted` fill. The boxes stay at full opacity.
- **status**: the detached FieldStatus below the list. `error` also passes an error status to every row's checkbox, for `aria-invalid` only.

**Dividers**: a 1px `--color-border` line under each row but the last, and rows lose their 8px corners (`List/ListItem.tsx` `withDivider`, `noRadius`).

**Theme keys**: `checkbox-list` (base only; it is the Field), `list` (props `density` and `listStyle`), plus the row and indicator keys above, and the shared `field`, `field-label`, `field-status` and `field-status-icon`.

**Draft frame key**: `density / dividers / state`, with `dividers` as `dividers` or `no-dividers` and `state` as `rest`, `read-only` or `disabled`. Each frame is a short list with a group label and one checked row. Example: `balanced / no-dividers / read-only`. **18 frames** (3 · 2 · 3). Row states stay on CheckboxListItem's grid.

### RadioListItem

An Item whose start content is a radio and an optional `startContent` (`RadioList/RadioListItem.tsx`). It only works inside RadioList.

**Props that change visuals**: selected (from the list's `value`), `isDisabled`, `description`, `startContent`, `endContent`, `align`, and the list's `size`.

**Sizes**: unlike CheckboxList rows, a RadioListItem row has **no padding, no corners and no fill** (`rowStyles.root`: padding 0, radius 0, transparent). The row is as tall as the radio or the label: 20px (`sm`) and 24px (`md`), or 40px with a description. The list's gap spaces the rows.

**States**:
- **hover**: the whole row is the hover marker, so hovering anywhere on the row tints the circle. The row itself doesn't change.
- **pressed**: a mouse press on the row paints `--color-overlay-pressed` on the circle only (`ROW_PRESS`), not on the row.
- **selected**: the filled circle with its dot. The row gets **no fill**, unlike a checked CheckboxList row.
- **focus**: the ring on the circle, plus Item's `focusWithin` ring on the row. The row has 0 radius, so that second ring would be square. As for CheckboxListItem, the design ticket should confirm in a browser.
- **disabled**: the circle, label and description at 0.5 opacity. No focus ring.
- No loading state.

**Theme keys**: `radio-list-item` (prop `size`; states `selected` and `disabled`) on the row, `radio-indicator` (prop `size`; states `checked` and `disabled`) and `radio-indicator-dot` (prop `size`). The row also carries `item`. Because theme overrides sit in `@layer astryx-theme`, above StyleX (`theme/generateThemeRules.ts`), `radio-list-item` can give the rows padding, corners or a selected fill.

**Draft frame key**: `selected / size / state`, with `selected` as `selected` or `no-selected` and `state` as `rest`, `hover`, `pressed`, `focus` or `disabled`. Example: `selected / md / focus`. **20 frames** (2 · 2 · 5).

**Example panels**: description, start content, end content (prices, as in Astryx's artboard).

### RadioList

A Field around a `role="radiogroup"` flex container (`RadioList/RadioList.tsx`).

**Props that change visuals**: `orientation` (`vertical`\* | `horizontal`), `size` (`sm` | `md`\*), `isDisabled`, `status`, `label` / `isLabelHidden` / `description`, `labelTooltip`, `isOptional` / `isRequired`, `width`. It has no `density`, `hasDividers` or read-only.

**Spacing**: vertical lists have an 8px gap (`--spacing-2`); horizontal lists have 20px (`--spacing-5`).

**Theme keys**: `radio-list` (props `orientation` and `size`), plus the row, indicator and shared field keys.

**Draft frame key**: `orientation / size / state`, with `state` as `rest` or `disabled`. Example: `horizontal / md / rest`. **8 frames** (2 · 2 · 2).

### Switch

**Props that change visuals**: `value` (`false` | `true`), `size` (`sm` | `md`\*), `isDisabled`, `isLoading` (also during a `changeAction`), `status`, `labelPosition` (`start` | `end`\*), `labelSpacing` (`hug`\* | `spread`, which pushes the label and switch to opposite ends of a full-width row), `isLabelHidden`, `description`, `labelIcon`, `labelTooltip`, `isOptional` / `isRequired`, `width`. It has no read-only.

**Sizes**: as in the shared table. The label wrapper has a minimum height of 20 / 24px to match the track.

**States**: off and on, each through rest, hover, pressed, focus, disabled and loading, as in the shared table. Under a forced-colours mode the track gets a 1px system-colour border.

**Theme keys**: `switch` on the track (prop `size`; states `checked` and `disabled`), `switch-thumb` (prop `size`; state `checked`), `switch-field` (props `labelPosition` and `labelSpacing`, written only when not the default) and `switch-label`.

**Fixed**: track and thumb sizes, the thumb's growth and travel, the 0.5 disabled opacity, the hover mix percentages (5% off, 15% on) and the touch lift.

**Draft frame key**: `value / size / state`, with `value` as `off` or `on` and `state` as `rest`, `hover`, `pressed`, `focus`, `disabled` or `loading`. Example: `on / md / focus`. **24 frames** (2 · 2 · 6).

**Example panels**: label at the start, `spread` spacing in a settings row, description, label-hidden, status.

## The existing Switch track override

`hvnTheme.ts:446-451`:

```ts
switch: {
  base: {
    "--color-background-gray": "var(--color-track)",
  },
},
```

It builds to `.astryx-switch { --color-background-gray: var(--color-track); }` in `@layer astryx-theme`. The `switch` key is on the **track** element (`Switch.tsx:948`), and the track reads `--color-background-gray` for its off fill (`trackOff`), its off hover mix and its disabled-off fill (`trackDisabledOff`). The variable is redefined on the element that reads it, so every off-state paint follows `--color-track`. It doesn't reach the thumb or anything outside the track.

**It renders the same as no override.** hvn's categorical tokens set `--color-background-gray` to neutral 90 / 25, and `--color-track` is also neutral 90 / 25. Both resolve to `#e2e2e2` in light mode and `#3b3b3b` in dark mode. The override only ties the Switch to the ProgressBar track by name, so the two stay matched if either token moves. Astryx's own default for `--color-background-gray` is a translucent `#0A131733`, which hvn's categorical tokens already replace.

**Contrast.** The off track is 1.30:1 against white, and the white off thumb is 1.30:1 against the track. Astryx's Switch docs ask for 3:1 for each track against the surface and for the thumb against its track (`Switch/Switch.doc.mjs:216-221`). The on track passes (5.17:1). The roadmap's Colour rule accepts a quiet outline with a second cue such as a label, so whether the off track needs more contrast is a question for the Choice controls design.

## Override reach for the theme review

| What | Token-only reach | Key |
|---|---|---|
| Selected fill (box, radio, on track, focus ring) | `--color-accent`, `--color-on-accent` | `checkbox-indicator` / `radio-indicator` `checked`, `switch` `checked` |
| Unchecked edge and fill | `--color-border-emphasized`, `--color-background-surface` | `checkbox-indicator`, `radio-indicator` (base) |
| Off track | `--color-background-gray` (today, through the `switch` override), `--color-track` | `switch` (base) |
| Thumb | `--color-background-surface`; `--shadow-low` for the touch lift | `switch-thumb` |
| Box radius | `--radius-inner` (4px; shared with every inner radius) | `checkbox-indicator` `borderRadius` |
| Disabled | `--color-border`, `--color-background-muted`, `--color-text-disabled` | `disabled` states |
| Checked CheckboxList row | `--color-accent-muted` (shared with every selected Item) | `item` `selected` |
| Row hover and press | `--color-overlay-hover`, `--color-overlay-pressed` | `item` |
| Field labels | `--text-label-*`, `--color-text-secondary` | `checkbox-label`, `switch-label`, `field-label` |
| Status message | categorical pairs, through the existing `field-status` override | `field-status` |

## Parts shared with other families

- **The field shell (Text fields).** CheckboxList and RadioList wrap their group in `Field` (group label, description, optional and required markers, detached status). CheckboxInput and Switch use `FieldLabel` and `FieldStatus` directly. All four use the **detached** FieldStatus; none uses the attached one that text inputs draw. The `field-label` and `field-status` decisions from the Text fields family apply here.
- **The Menu surface.** The `checkbox` and `radio` indicators also draw DropdownMenu's checkbox and radio rows (`DropdownMenu/DropdownMenuCheckboxItem.tsx:182`, `DropdownMenuRadioItem.tsx:168`), at `sm` in `sm` menus and `md` otherwise. The roadmap's "Checked rows use the blue checkbox and radio indicators" is this same component.
- **Selectors and search.** MultiSelector draws a label-hidden CheckboxInput beside each option (`MultiSelector/MultiSelector.tsx:2123`), at `sm` or `md`. Selector uses the separate `check` indicator, not this family's.
- **Outside Data Input.** Table's selection column uses label-hidden `sm` CheckboxInputs, with indeterminate for the header (`Table/plugins/selection/useTableSelection.tsx`). List task markers use a read-only `sm` CheckboxInput. CheckboxListItem rows are List rows, so the Table and List map's `item` decisions reach them.
- **No listbox or calendar panel.** Nothing in this family opens a popover, so it has no `open` state.

## Frame count for the coverage decision

| Component | Draft frame key | Frames |
|---|---|---|
| CheckboxInput | `value{unchecked, checked, indeterminate} / size / state{rest, hover, pressed, focus, disabled, loading}` | 36 |
| CheckboxListItem | `value / density{compact, balanced, spacious} / state{rest, hover, pressed, focus, disabled, loading}` | 54 |
| CheckboxList | `density / dividers / state{rest, read-only, disabled}` | 18 |
| RadioListItem | `selected / size / state{rest, hover, pressed, focus, disabled}` | 20 |
| RadioList | `orientation / size / state{rest, disabled}` | 8 |
| Switch | `value{off, on} / size / state{rest, hover, pressed, focus, disabled, loading}` | 24 |
| **Total** | | **160** |

These numbers fit one ship ticket, compared with the Action page's 468.

Open points for [Data Input frame coverage](https://github.com/hvn-oss/ds/issues/58):

- **Status as a key or a panel.** Status doesn't change the control, only adds the detached message, so the table treats it as an example panel. As a key on CheckboxInput and Switch with `rest` only, it adds 30 frames (3 statuses × 3 values × 2 sizes, plus 3 × 2 × 2).
- **Read-only as a `state` value.** The roadmap's state list has no `read-only`. It is drawn only on CheckboxList, the one place it changes the look.
- **The `value` key name.** The checked state has three values on checkboxes, two on switches and a boolean `selected` on radio rows. The table uses Astryx's own words. Another option is one name for the family, such as `checked`.
- **Disabled with focus.** CheckboxInput and Switch draw a ring on a disabled control, because `disabledMessage` keeps it focusable. The table keeps disabled frames `rest`-only.
