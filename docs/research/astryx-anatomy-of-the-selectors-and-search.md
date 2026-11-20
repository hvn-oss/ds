# Astryx anatomy of the Selectors and search

Research for [Astryx anatomy of the Selectors and search](https://github.com/hvn-oss/ds/issues/54), part of the map [hvn visual identity: Data Input components](https://github.com/hvn-oss/ds/issues/51).

The question: for Selector (with SelectorOption), MultiSelector, Typeahead (with TypeaheadItem), Tokenizer and PowerSearch, plus ComplexSelector by inheritance, what are the props, sizes and interactive states, and which tokens and styles does each read? Which visuals can the hvn theme change with token-based component overrides, and which are fixed? What does the family share with the other Data Input families? What draft frame key and frame count fit each one, following [Component frame coverage](https://github.com/hvn-oss/ds/issues/37)? Which controls read `--size-element-*`? How do the existing secondary Selector, MultiSelector and ComplexSelector overrides render, inside and outside an InputGroup? How do Tokenizer and PowerSearch tokens relate to the Content category's Token?

## Sources

All claims come from these primary sources, read on 2026-11-19:

- **Core source**: `@astryxdesign/core@0.7.11` as installed in this repo (`node_modules/.pnpm/@astryxdesign+core@0.7.11_…/node_modules/@astryxdesign/core/src/`). Paths below are relative to that `src/`.
- **CLI**: `@astryxdesign/cli@0.7.11`. `vpx astryx component <Name>` for Selector, SelectorOption, MultiSelector, Typeahead, TypeaheadItem, Tokenizer, PowerSearch, ComplexSelector and Token, and `vpx astryx theme targets <Name>` for the six components, run from `packages/ds`.
- **hvn theme**: `packages/ds/src/themes/hvn/hvnTheme.ts`, and the built `packages/ds/dist/themes/hvn/hvn.css` (component overrides land in `@layer astryx-theme`; Core's own styles are in `@layer astryx-base` in `dist/astryx.css`, so a theme override beats Core whatever its specificity).
- **Structure screenshots**: `docs/reference/astryx-design-system/Data Input/{Selector,MultiSelector,Typeahead,Tokenizer,PowerSearch}.png`.

Nothing here was rendered in a browser. Where a rendering is described (the InputGroup cases in particular), it is read from the styles, and the design ticket should confirm it on the canvas.

## Shared anatomy

### The field shell (shared with Text fields)

Every trigger and field in this family paints its control box with the same shared styles as TextInput: `inputWrapperStyles` in `Field/inputStyles.stylex.ts`. Its header names its users: "TextInput, TextArea, NumberInput, DateInput, TimeInput, Selector, Typeahead, and Tokenizer". MultiSelector and ComplexSelector use it too. So the family inherits whatever the Text fields design decides for the shell.

| Part | Value | Tokens |
|---|---|---|
| Outline | 1px solid | `--border-width`, `--color-border-emphasized` |
| Corners | 8px, through the private `--_field-radius` | `--radius-element` |
| Fill | page surface | `--color-background-surface` |
| Hover | a 2px inset ring of `color-mix(--color-border-emphasized 30%, transparent)`, only under `(hover: hover)` and not while focused or disabled | the mix is a literal in Core; it does **not** read hvn's `--shadow-inset-hover` |
| Focus (`:focus-within`) | accent outline colour plus a 2px inset ring | `--color-accent`, `--color-accent-muted` |
| Disabled | 0.5 opacity, emphasized outline, no hover ring. Keyboard focus on a disabled field still turns the outline accent (`Field/inputDisabledFocus.ts`) | fixed 0.5 |
| Status | outline in `--color-border-<status>`, hover ring `--shadow-inset-<status>`, focus keeps the status outline | `inputStatusBorderStyles`, `inputStatusHoverShadowStyles` |

The label, description and status message come from `Field` (with `FieldStatus`, which hvn already overrides to the categorical pairs). `statusVariant` is `attached` (the message box sits under the input), `detached` or `tooltip` (the status icon becomes an info-tip button). The clear button is the shared `Field/InputClearButton`, and loading is `Spinner size="sm"`.

### The panel (shared with the Menu surface)

Every listbox in the family is a Popover (`Popover/usePopover.tsx:84-89`): `--color-background-popover`, a 16px `--radius-container` and `--shadow-low`. These are the same tokens as the roadmap's Menu surface. **What differs is the padding.** hvn's 8px Menu panel padding is an override on `dropdown-menu` and `context-menu` only, so it doesn't reach these panels:

| Panel | Surface theme keys | List padding | List theme key |
|---|---|---|---|
| Selector | `popover` + `selector-popup` | 4px; 5px inline for the `input` variant, which mirrors the trigger's border (`Selector.tsx:388-411`) | none |
| MultiSelector | `popover` + `multi-selector-popup` | 4px | none |
| Typeahead, Tokenizer, PowerSearch results | `popover` only | 4px | `typeahead-dropdown` |
| ComplexSelector | `popover` + `complex-selector-popup` | 12px content padding | none |
| PowerSearch filter editor | `popover` only | 16px content, 12px footer | none |

Every list is at most 300px tall, at least as wide as its trigger, and opens 4px (`--spacing-1`) below it. A row's 8px corners inside a 4px list leave 16 − 4 = 12px of panel corner, where the Menu panel has 8 + 8. To match the Menu surface:

- **Selector and MultiSelector** can take an extra 4px of `padding` on `selector-popup` and `multi-selector-popup`. That totals 8px (9px inline for the `input` Selector). In a searchable panel, that padding also insets the search row and stops the divider under it from running edge to edge.
- **Typeahead's results** can take `padding: var(--spacing-2)` on `typeahead-dropdown`, because that key is the list itself.

**Search row** (Selector and MultiSelector `hasSearch`, `Field/PanelSearchInput.tsx`): a 4px gutter around a borderless field with 6/8px padding and 8px corners, a leading magnifier and a trailing clear button. Keyboard focus draws a 2px inset `--color-accent` ring, not the outset outline. A full-width `Divider` sits under it.

**Section headings** are 12/20 `--text-supporting-*` in `--color-text-secondary`, with 4/8px padding (Typeahead: 8px top, 4px bottom). **Dividers** have 4px block margin. **Empty state**: 12px padding, centred, `--color-text-secondary`. Selector and MultiSelector set it at the label size (14px); Typeahead sets it at the supporting size (12px). **Loading**: Selector's and MultiSelector's panels show nothing while `isLoading`; the spinner is in the trigger.

### Rows compared with the Menu rows

| | Menu row (hvn) | Selector | MultiSelector | Typeahead results |
|---|---|---|---|---|
| Height sm / md / lg | 28 / 32 / 36 | 28 / 32 / 36 (padding 4/8, 6/8, 8/8 + 20px line) | same blocks, but `sm` is 4px inline | same as Selector |
| Corners | 8px | 8px `--radius-element` | 8px | 8px |
| Label | 14/20 regular | 14/20 regular, **medium when selected** | 14/20 **medium on every row** | 14/20 regular (TypeaheadItem), medium when selected |
| Hover = pointer highlight | `--color-overlay-hover` | same | same | same |
| Keyboard highlight | hover fill + inset 2px ring | hover fill + inset 2px ring (`Selector.tsx:526-531`) | hover fill only; the ring is drawn only on an option's action cell | hover fill only; an outline only under forced colours |
| Pressed | `--color-overlay-pressed` | none | none | none |
| Selected mark | blue checkbox or radio | the `check` indicator at the end, coloured `accent` (blue) (`Indicator/CheckIndicator.tsx:160-162`) | a `CheckboxInput` at the start (`sm` for `sm`, `md` for `md` and `lg`) | a black `check` icon (`color="primary"`, `BaseTypeahead.tsx:1851`) |
| Disabled | 0.5 opacity | 0.5 | 0.5 plus `--color-text-disabled` | 0.5 (TypeaheadItem) |
| Theme key | `dropdown-menu-item` | `selector-option-row` (size; selected, disabled) | `multi-selector-option` (size; select-all, selected, disabled) | **none**: `typeahead-item` is the content inside the row, not the row |

Three things in this table are worth a decision on the design ticket. Typeahead's black check disagrees with Selector's blue one. Keyboard focus is ringed on Selector rows but not on MultiSelector or Typeahead rows. And MultiSelector labels are medium where every other list is regular.

MultiSelector's **select-all row** has its own, tighter padding: 2/4px at `sm` and 4/8px at `md` and `lg` (`MultiSelector.tsx:525-538`). Its checkbox shows `indeterminate` when only part of the list is selected.

### Interactive states and what paints them

| State | `input` triggers and fields | `secondary` and `ghost` triggers |
|---|---|---|
| rest | the shell | `secondary`: `--color-neutral` fill and no outline. `ghost`: transparent. Both have a medium label |
| hover | the shell's inset ring | `--color-overlay-hover` image (`utils/interactionOverlay.stylex.ts`) |
| pressed | **nothing**: no overlay and no scale | `--color-overlay-pressed`; a mouse press also scales to 0.98 |
| focus | the shell's accent outline and inset | the shared 2px `--color-accent` outline, shown only for keyboard focus (`privateAttributes/focusOwner.stylex.ts`) |
| open | the chevron turns 180° (`--duration-fast`, `--ease-standard`). The trigger keeps focus without `hasSearch`, so it shows the focus paint; with `hasSearch`, focus moves into the panel | the chevron turns. Unlike the DropdownMenu trigger, no pressed fill is added |
| loading | `Spinner sm` before the clear button and chevron | same |
| read-only | the chevron and clear button go, nothing is dimmed, and the cursor is the default. The hover ring still paints | the hover and press overlays are turned off |
| disabled | the shell's disabled paint | 0.5 opacity; overlays and the press scale are off |

Placeholder text is `--color-text-secondary` and a value is `--color-text-primary`, in every component.

### What a theme component override can reach

The rules are the same as in the [Action findings](https://github.com/hvn-oss/ds/blob/research/astryx-anatomy-of-the-action-components/docs/research/astryx-anatomy-of-the-action-components.md#what-a-theme-component-override-can-reach). Keys are `base`, `prop:value` and bare state names, and a nested key can only add a pseudo-class or a `:where()` to the same element. **An override can't reach descendants**, so a part with no key of its own is fixed.

| Key | Props | States | Paints |
|---|---|---|---|
| `selector` | variant, size, status | disabled, readonly | trigger control box |
| `selector-option-row` | size | selected, disabled | option row |
| `selector-option` | – | – | SelectorOption content (an `Item`) |
| `selector-check` | – | – | the mark's position; the mark itself comes from the theme's `indicators.check` |
| `selector-indicator-icon` | – | state (`expanded`, `collapsed`) | chevron |
| `selector-popup`, `selector-search`, `selector-section-heading`, `selector-empty-state` | – | – | panel parts |
| `multi-selector` | variant, size, status | disabled, readonly | trigger control box |
| `multi-selector-option` | size | select-all, selected, disabled | option row |
| `multi-selector-indicator-icon` | – | state | chevron |
| `multi-selector-popup`, `-search`, `-section-heading`, `-empty-state` | – | – | panel parts |
| `typeahead` | status, size | – | field box. Disabled can't be targeted |
| `typeahead-dropdown` | – | – | results list (not the surface) |
| `typeahead-item`, `typeahead-empty-state` | – | – | default row content, empty state |
| `tokenizer` | size, status | disabled | field box |
| `power-search` | – | – | outer container only |
| `complex-selector` | variant, size, status | – | trigger control box |
| `complex-selector-indicator-icon`, `complex-selector-popup` | – | state / – | chevron, panel |
| `token` | color, size | disabled | every Token, wherever it renders |
| `badge` | variant | – | MultiSelector's trigger badges |

**Fixed** in this family, with no token or key behind it:

- **Shell**: the 0.5 disabled opacity, the hover ring's 30% mix, the 0.98 press scale, the chevron's 180° turn, `sm` icons (16px) everywhere and the `sm` spinner.
- **Panels**: the 4px list padding of Selector and MultiSelector, and the 300px list cap. The highlight is `--color-overlay-hover` and can only change globally.
- **Typeahead, Tokenizer and PowerSearch result rows** have no theme key, so their padding, corners, highlight and black check are fixed.
- **PowerSearch tokens**: the bold (`--font-weight-bold`) value text (`PowerSearch/PowerSearchToken.tsx:24-28`).
- **Typeahead and Tokenizer** have no `variant` and no `isReadOnly`. Tokenizer, PowerSearch and ComplexSelector can't sit inside an InputGroup (none of them reads the InputGroup context).

## Per component

### Selector (and SelectorOption)

**Props that change visuals**: `variant` (`input`\* | `secondary` | `ghost`), `size` (sm | md\* | lg), `status` (error | warning | success), `statusVariant` (attached\* for input; detached\* for secondary and ghost; tooltip), `isDisabled`, `isReadOnly`, `isLoading`, `hasClear`, `hasSearch`, `startIcon`, `placeholder` versus a value, `renderValue`, `indicatorPosition` (end\* | start), `presentation` (popover\* | bottom-sheet | adaptive), `width`, `isLabelHidden`, `description`, `isRequired`/`isOptional`. The options can have an icon, a description, `disabled`, dividers and sections. SelectorOption adds `icon`, `label`, `description`, `layout` (stacked\* | inline) and `endContent`. (\* = default.)

**Sizes**: the trigger's `min-height` is `--size-element-*` (28 / 32 / 36). Its block padding is worked out so that a one-line value lands exactly on the token, with a 20px line box (`Selector.tsx:562-578`). Inline padding is 12px, with an 8px gap. A two-line `renderValue` grows the trigger by one line: 48 / 52 / 56. `secondary` and `ghost` are content-width (`width: auto`); `input` fills its field.

**Tokens**: the shell, as above (only `input` keeps the outline). The label is `--text-label-size`; `secondary` and `ghost` use `--font-weight-medium`, and `input` is regular. On iOS the font is floored at 16px, so focusing doesn't zoom the page. The start icon and chevron are `sm` in `secondary`. Status icons replace the chevron for `attached` and `tooltip` status, coloured by status.

**Status on secondary and ghost**: they detach the message by default, and the outline never takes the status colour (the status border styles apply only to `input`). With `statusVariant="tooltip"`, the status icon replaces the chevron.

**hvn override**: `selector: { "variant:secondary": { ":not(.astryx-input-group *)": SECONDARY_BUTTON } }`. See [How the existing overrides render](#how-the-existing-secondary-overrides-render).

**Visual props**: 6 plus `state`: variant, size, status, value (placeholder or filled), clear and start icon.

### MultiSelector

**Props that change visuals**: the same trigger props as Selector (`variant`, `size`, `status`, `statusVariant`, `isDisabled`, `isReadOnly`, `isLoading`, `hasClear`, `hasSearch`, `startIcon`, `width`), plus:

- `triggerDisplay`: `count`\* ("3 selected"), `labels` ("Name, Email, +1") or `badges`.
- `maxBadges`, which defaults to 3, then "+N".
- `hasSelectAll` and `hasCreate`.
- `indicatorPosition`: `start`\*, the opposite of Selector.
- Per-option `action`, which turns the list into a grid with an action cell.
- `renderTrigger`, which replaces the field with any control.

**Sizes**: the trigger has a fixed `height` of `--size-element-*`, not a minimum (`MultiSelector.tsx:500-510`), with a `--text-label-leading` line box. Badges and labels never make it taller.

**Differences from Selector's trigger**:
- `secondary` keeps the field's full width instead of `width: auto`.
- The **badges** are `Badge variant="neutral"`: 20px pills (`--spacing-5` high, `--radius-full`, 12px text), so they don't follow the size tokens. hvn's `badge` override paints the neutral badge in the gray categorical pair (neutral 90 / neutral 30).
- The "+N" overflow is medium, label-sized `--color-text-secondary` text.

**Rows**: described in the rows table above. The checkbox is Choice controls' `CheckboxInput`, so its checked and indeterminate paint (blue) comes from that family.

**hvn override**: the same `SECONDARY_SELECTOR` as Selector.

**Visual props**: 7 plus `state` (Selector's six plus `triggerDisplay`), and the rows' checked state.

### Typeahead (and TypeaheadItem)

**Props that change visuals**: `size`, `status`, `statusVariant` (attached\* | detached | tooltip), `isDisabled`, `hasClear` (**default true**), `startIcon`, `placeholder`, the query versus the selected value, `renderItem`, `maxMenuItems`, `width`, and the Field props. There is **no `variant` and no `isReadOnly`**. TypeaheadItem adds `icon`, `description` and `isDisabled`.

**Sizes**: the field's `min-height` is `--size-element-*`, with 3px block padding (`--spacing-1` − 1px) and a 4px gap (`Typeahead.tsx:228-330`). The input text is `--text-body-size` / `--text-body-leading`, not the label tokens; both are 14/20 in hvn.

**Filled state**: a selected value shows as a **Token** (see [Tokens](#tokens-and-the-content-categorys-token)) at the Typeahead's size. Clicking it enters edit mode: the token is removed, and its label fills the input, selected. So the field has three looks: placeholder, a typed query (primary text), and a token.

**States**: rest, hover, focus, loading (spinner in the end lane, next to the clear button) and disabled. Opening adds nothing to the field beyond focus. It has no pressed or read-only state.

**Panel and rows**: Popover surface; the `typeahead-dropdown` list has 4px padding. For the rows, see the table above. Group headings are supported through `item.auxiliaryData.group`.

**Visual props**: 4 plus `state`: size, status, value (placeholder, query or token), clear and start icon.

### Tokenizer

**Props that change visuals**:
- **Field**: `size`, `status`, `statusVariant`, `isDisabled`, `hasClear` (clear all), `startIcon`, `endContent`, `placeholder` (only while empty), and the Field props.
- **Tokens**: `maxEntries`, which hides the input at the limit. `tokenOverflowBehavior` is `none`\*, `unfocusedInline` or `unfocusedLayer`; the last two collapse to one row with "+N" while unfocused. `renderToken` replaces the default token.
- **Results**: `hasCreate` adds a "Create …" row. `presentation` defaults to `adaptive`.

There is no `variant`, no `isReadOnly`, and no InputGroup support.

**Sizes**:
- **Empty**: the field is a shell with a `min-height` of `--size-element-*`.
- **With tokens**: the padding becomes 3px on every side, with a 3px row gap and 4px column gap, so one row of `size − 8` tokens lands exactly on the size token (3 + 24 + 3 + 2 = 32 at `md`). More rows wrap and grow the field.
- **End lane** (spinner, clear-all, `endContent`): sits 8px from the end, centred on the first row (`Tokenizer.tsx:372-620`).
- **Input**: keeps at least 40px.

**States**: rest, hover, focus, loading and disabled, as Typeahead. Disabled tokens lose their remove buttons and dim.

**Results**: the same `BaseTypeahead` list and rows as Typeahead. The create row is a TypeaheadItem.

**Visual props**: 4 plus `state`: size, status, value (placeholder or tokens), clear and endContent. The overflow mode and max entries can go in example panels.

### PowerSearch

**Props that change visuals**: `size`, `status`, `statusVariant` (attached\* | detached), `isDisabled`, `isReadOnly`, `hasClear` (default true), `startIcon`, `placeholder` (default "Search..."), `endContent`, `resultCount`, `tokenOverflowBehavior`, `maxTokenLength`, `menuWidth`, and `config` (the field types and their icons). **`isLabelHidden` defaults to true.**

**Structure**: PowerSearch is a Tokenizer (`PowerSearch.tsx:1620-1650`, with `presentation="popover"` forced on the inner field) plus three parts:

1. **Filter tokens** (`PowerSearchToken.tsx`): a Token whose label is "Field: operator" and whose value is bold `endContent`. It is clickable (opens the editor) and removable. Read-only filters and `isReadOnly` drop the remove button.
2. **Field menu**: the Tokenizer's result list, with the field icons from `config`.
3. **Filter editor** (`PowerSearchEditPopover.tsx`): a Popover at least 400px wide (clamped to the viewport), 16px content padding and a 12px footer.
   - **Pickers**: field and operator are `md` input Selectors, whatever the PowerSearch size.
   - **Value editors**: TextInput, NumberInput, DateInput, Selector, Typeahead or Tokenizer, depending on the field type.
   - **Footer**: an `sm` ghost Delete (when editing), an `sm` ghost Cancel and an `sm` primary Apply.

The result count is 12/20 `--color-text-secondary` text in the end lane.

**Theme key** `power-search` reaches only the outer container. Everything visible is painted by the `tokenizer`, `token`, `popover`, `selector`, `button` and value-editor keys.

**Visual props**: what it adds over Tokenizer is the filter token, the editor and the result count.

### ComplexSelector (no artboard; inherits Selector)

**Props that change visuals**: `variant` (`input`\* | `secondary` | `ghost`), `size`, `status`, `statusVariant`, `isDisabled`, `isLoading`, `startIcon`, `triggerLabel` versus `placeholder`, `placement` and `alignment`, `width`, and `renderTrigger`.

**Sizes**: the trigger has a fixed `height` of `--size-element-*` (`ComplexSelector.tsx:250-258`), "Exact trigger height: sm 28px, md 32px, or lg 36px".

**Differences from Selector**:
- **Status**: the `input` outline **never takes the status colour**; there is no status border style, only the status icon and message.
- **Focus**: every variant gets the shared keyboard outline (`focusOutlineStyles.focusWithinCombobox`).
- **Missing states**: no read-only and no InputGroup support.
- **Popup**: Popover + `complex-selector-popup`, with 12px content padding.

**hvn override**: `complex-selector: { "variant:secondary": SECONDARY_BUTTON }`, with no InputGroup guard; it doesn't need one.

## How the existing secondary overrides render

The overrides come from `hvnTheme.ts` (`SECONDARY_BUTTON`, `SECONDARY_SELECTOR`). They are emitted as:

```css
.astryx-selector[data-variant="secondary"]:not(.astryx-input-group *) { background-color: transparent; border-width: var(--border-width); border-style: solid; border-color: var(--color-border-emphasized); }
.astryx-multi-selector[data-variant="secondary"]:not(.astryx-input-group *) { … same … }
.astryx-complex-selector[data-variant="secondary"] { … same … }
```

**Outside an InputGroup**, all three render as hvn's secondary Button with a chevron:

- **Outline and fill**: a 1px `--color-border-emphasized` outline on a transparent fill, replacing Astryx's borderless 6% `--color-neutral` fill.
- **Box**: 8px corners and a medium label. Height is 1 + 5 + 20 + 5 + 1 = 32 at `md`, because Selector's padding already allows for a border.
- **States**: hover and pressed are Astryx's 5% / 10% overlay with the 0.98 press scale. Keyboard focus is the 2px accent outline.
- **Focus outline colour**: the outline stays emphasized on focus. The theme layer's `border-color` beats the shell's `:focus-within` accent colour, so a secondary trigger never shows the input's accent border. Only the outer ring changes.
- **Disabled**: 0.5 opacity with the same outline.
- **Width**: Selector and ComplexSelector size to their content; MultiSelector fills its field.

This matches the decision in [Button design](https://github.com/hvn-oss/ds/issues/36): no extra hover fill. The override never had one.

**Inside an InputGroup**, the guard turns the override off, so Selector and MultiSelector fall back to Astryx's grouped secondary: "Grouped secondary triggers keep their neutral fill but take the group's row height, connected edge radii, and focus stacking" (`Selector.tsx:2215-2217`).

- **What the group draws**: InputGroup itself paints no outline (`InputGroup.tsx:35-57`); each member draws its own. So a secondary trigger in a group is a **borderless 6% grey segment**, while its TextInput or InputGroupText neighbours keep their 1px outlines.
- **Seam**: the trigger's −1px inline-start margin lays its fill over the previous member's trailing outline.
- **What it reads as**: the group's outline is therefore broken along the top and bottom of the trigger (and its end, if it is last). It reads as a grey tab inside an outlined field, not as one outlined field.
- **Ghost** triggers don't take the group styles at all.

This is from the styles only. The Selectors and search design should draw it and decide whether the guard stays, or whether grouped secondary triggers should be outlined too.

ComplexSelector can't be grouped, so its override applies everywhere.

## Tokens and the Content category's Token

Three of the five components show selected values with **Content's `Token`** (`Token/Token.tsx`), so a `token` override from the Content map changes them:

| Where | Token use |
|---|---|
| Tokenizer | default Token per item, with `onRemove`, at the Tokenizer's size |
| PowerSearch | Token with "Field: operator" label, bold value `endContent`, `onClick` (edit) and `onRemove` |
| Typeahead | one Token for the selected value, with `onClick` (enter edit mode) and no remove |

**Token's default look**:

| Part | Value |
|---|---|
| Fill and text | `--color-neutral` (6% black) fill, `--color-text-primary` text |
| Text | 12/20 `--text-supporting-*`, medium |
| Corners | 4px `--radius-inner`, so **a rectangle, not a pill** |
| Height | `--size-element-*` − 8px: 20 / 24 / 28 |
| Padding | 8px inline, 4px gap |
| Remove button | a 16px round button with a −4px end margin and a 4px invisible hit band |
| Disabled | 0.5 opacity |

Token's `color` prop also offers the ten categorical pairs.

MultiSelector's trigger badges are **Badge, not Token**: pills with a fixed 20px height. So the family has two selected-value chips with different shapes and fills: Token rectangles in Tokenizer, PowerSearch and Typeahead, and Badge pills in MultiSelector. The roadmap says "pills are only for chips and badges". Whether a Token counts as a chip (and becomes a pill) is the Content map's call to make, but it changes this family's fields. Because a Token's height follows the size tokens, Tokens grow on touch too: 24 / 28 / 32.

## Touch sizing

These read `--size-element-*`, so they grow to 32 / 36 / 40 on coarse pointers below `lg` with the hvn adaptation rule:

| Control | How it reads the token |
|---|---|
| Selector trigger | `min-height`, and the padding is derived from the token |
| MultiSelector trigger | fixed `height` |
| Typeahead field | `min-height` |
| Tokenizer field | `min-height` (fixed `height` while truncated); the end lane is centred on the token |
| PowerSearch field | through Tokenizer; its bottom-sheet trigger also uses `min-height` |
| Token (inside Typeahead, Tokenizer, PowerSearch) | `height: token − 8px`, so 20/24/28 becomes 24/28/32 |
| ComplexSelector trigger | fixed `height` (no artboard, so no Touch sizing entry) |

**Not sized by the token**:
- **Option and result rows** are padding plus the line box. Like menu rows, they grow with the ×1.14 type ramp, from 28 / 32 / 36 to 32 / 36 / 40.
- **MultiSelector badges** stay 20px.
- **The listbox** keeps its 300px cap.

**Suggested Touch sizing section**: Selector, MultiSelector, Typeahead, Tokenizer (with tokens, so the Token growth shows) and PowerSearch, at sm / md / lg. MultiSelector and PowerSearch have the same heights as Selector and Tokenizer. If the section should stay short, they can be a note instead of a row.

## Parts shared with the other Data Input families

- **Text fields**: the whole field shell (`inputWrapperStyles`), `Field` with its label, description and status placement, the `FieldStatus` override, `InputClearButton`, the spinner, and InputGroup's `groupStyles`. Selector, MultiSelector and Typeahead are InputGroup members, like TextInput, NumberInput, DateInput and TimeInput. The Selectors and search design waits for the Text fields shell, as the map already says.
- **Choice controls**: MultiSelector's rows draw `CheckboxInput`. Selector's mark is the `check` indicator from the same indicator registry, which a theme can swap for a radio through `indicators`.
- **Menu surface (Action)**: the same Popover tokens and the same 28 / 32 / 36 rows with 8px corners. The differences are the panel padding, pressed paint and keyboard ring listed above.
- **Date and time**: PowerSearch's filter editor uses DateInput for date fields. So the Date and time design shows up inside PowerSearch, but PowerSearch draws only its own parts.
- **Content**: Token, and Badge for MultiSelector.
- **Overlay**: `presentation="bottom-sheet" | "adaptive"` uses BottomSheet. Tokenizer and PowerSearch default to `adaptive`. That is out of this map's scope.

## Draft frame keys

These follow [Component frame coverage](https://github.com/hvn-oss/ds/issues/37):

- **Full grids**: every combination of a component's keys is drawn.
- **`state` last**: each component lists only the state values it paints.
- **Grid keys**: a prop is a key only if it changes the component's own fill, outline, text colour or box size. `value` counts, because placeholder and filled differ in text colour.
- **Example panels**: content slots (start icon, clear button, option icon and description, sections, `renderValue`, `triggerDisplay` content, end content, overflow modes) go in example panels.
- **Read-only**: written here as a `read-only` state value. It removes the chevron and the panel, and it can't be combined with disabled (`isDisabled` wins). Whether it is a state or a key is for Data Input frame coverage to settle.

| Component | Frame key | Frames |
|---|---|---|
| Selector trigger, `input` | `input / size / status{none, error, warning, success} / value{placeholder, filled} / state{rest, hover, focus, open, loading, read-only, disabled}` | 3·4·2·7 = 168 |
| Selector trigger, `secondary` and `ghost` | `variant{secondary, ghost} / size / none / value / state{rest, hover, pressed, focus, open, loading, read-only, disabled}`. Status is an example panel (tooltip status) | 2·3·2·8 = 96 |
| Selector option row | `size / selected / state{rest, hover, focus, disabled}`. Focus is the keyboard highlight with the inset ring | 24 |
| Selector panel | `search{no-search, search}` at `md`. Sections, dividers, empty, option icon and description, and start mark go in example panels | 2 |
| MultiSelector trigger | the same key as Selector's trigger: 264 frames, the same as Selector. **Or**, if it counts as built on Selector's trigger and draws only what it adds, `variant / size / display{count, labels, badges}` at rest | 264, or 27 |
| MultiSelector option row | `size / checked{unchecked, checked} / state{rest, hover, focus, disabled}` | 24 |
| MultiSelector select-all row | `size / checked{unchecked, indeterminate, checked}`, rest | 9 |
| MultiSelector panel | `search / select-all` at `md` | 4 |
| Typeahead field | `size / status / value{placeholder, query, token} / state{rest, hover, focus, loading, disabled}` | 3·4·3·5 = 180 |
| Typeahead result row (shared by Tokenizer and PowerSearch) | `size / selected / state{rest, hover, disabled}` | 18 |
| Typeahead panel | `content{results, empty}` at `md` | 2 |
| Tokenizer field | `size / status / value{placeholder, tokens} / state{rest, hover, focus, loading, disabled}` | 3·4·2·5 = 120 |
| PowerSearch (built on Tokenizer; draws only what it adds) | field `size / value{placeholder, filters}` at rest (6), plus the field menu (1), the editor `mode{create, edit}` (2), results with a count (1) and empty results (1) | 11 |

**Total with full grids: about 920 frames** (Selector 290, MultiSelector 301, Typeahead 200, Tokenizer 120, PowerSearch 11). The Action page has about 470. That is the number for Data Input frame coverage and for the map's "Ship ticket sizing" question.

**Three ways to bring it down**, each a coverage decision rather than a curated subset:

1. **MultiSelector reuses Selector's trigger grid.** It is the same shell, the same variant styles and the same states, so it draws only the `display` variants: −237.
2. **`status` leaves the selector keys.** Its paint (outline, hover ring, message) belongs to the shared Text fields shell, so it would be drawn once per component, in an example panel: Selector −126, MultiSelector −126 (if not reused), Typeahead −135, Tokenizer −90.
3. **`value` leaves the keys too.** Placeholder versus filled is only the secondary versus primary text colour: about −100 across the family. Typeahead keeps `query` and `token`, because the token is a different shape.

With all three, the family is about 230 frames: the state rows per size and variant, plus the rows, panels and example panels.

**Notes for the coverage ticket**:
- `input` triggers have **no `pressed`**; `secondary` and `ghost` do.
- Typeahead and Tokenizer have **no `open`**, because opening is the focus state plus the panel, and no `read-only`.
- Per the Action convention, disabled frames need only one value.

## Things the map needs to know

- **The selector panels don't have the Menu panel's 8px padding.** A 4px addition on `selector-popup` and `multi-selector-popup`, and an 8px padding on `typeahead-dropdown`, would match it. Typeahead rows (also used by Tokenizer and PowerSearch) can't be restyled at all, because they have no theme key.
- **Selection marks disagree.** Selector's check is blue, Typeahead's is black, and MultiSelector uses the blue checkbox. Keyboard focus is ringed only on Selector rows. MultiSelector labels are medium.
- **The secondary override has an InputGroup gap.** Inside an InputGroup, a secondary Selector or MultiSelector is Astryx's borderless grey segment, which breaks the group's outline. The design ticket should draw it.
- **ComplexSelector's `input` outline ignores `status`.** That is Astryx's behaviour, and the theme could add it with `complex-selector` `status:*` border colours.
- **Two kinds of selected-value chip.** Token is a 4px rectangle with a 6% grey fill, and depends on the Content map. MultiSelector's Badge is a gray-pair pill.
- **PowerSearch hides its label by default** and relies on the placeholder and an optional `startIcon`. That puts it squarely in the map's "Unlabelled inputs" question.
- **The shell's hover ring is a literal mix.** It is a literal `color-mix` and doesn't read `--shadow-inset-hover`, so hvn can't retune it with that token. The status hover rings do read `--shadow-inset-<status>`.
