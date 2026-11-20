# Astryx anatomy of the Text fields

Research for [Astryx anatomy of the Text fields](https://github.com/hvn-oss/ds/issues/52), part of the map [hvn visual identity: Data Input components](https://github.com/hvn-oss/ds/issues/51).

The question: for TextInput, TextArea, NumberInput, InputGroup (with InputGroupText) and Field (with FieldLabel and FieldStatus), what are the props, sizes and interactive states, and which tokens and styles does each one read? Which visuals can the hvn theme change with token-based component overrides, and which are fixed? Which parts are shared with the other Data Input families? What draft frame key and frame count fit each one, under [Component frame coverage](https://github.com/hvn-oss/ds/issues/37)? Which controls read `--size-element-*`? How does the existing FieldStatus override render?

## Sources

All claims come from these primary sources, read on 2026-11-19:

- **Core source**: `@astryxdesign/core@0.7.11` as installed in this repo (`node_modules/.pnpm/@astryxdesign+core@0.7.11_…/node_modules/@astryxdesign/core/src/`). Paths below are relative to that `src/`.
- **CLI**: `pnpm exec astryx theme targets <Name>` and `pnpm exec astryx component <Name>`, run from `apps/docs` (CLI 0.7.11).
- **hvn theme**: `packages/ds/src/themes/hvn/hvnTheme.ts` at `20dcf87` (`@hvn-oss/ds@0.3.0`).
- **Rendered check**: a throwaway example on the local docs site (light mode, Chrome headless), with computed styles read from the page. The example was not committed. Values marked _(rendered)_ come from it.
- **Structure reference**: `docs/reference/astryx-design-system/Data Input/{TextInput,TextArea,NumberInput,InputGroup,Field}.png`.

## The field shell

The five components don't share one component. They share a set of style modules and helpers in `Field/`, which the other Data Input families use too. This set is what the map calls the **field shell**.

| Part                                                                                 | Source                                                                     | Used by                                                                                                                                                                                                 |
| ------------------------------------------------------------------------------------ | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Wrapper look: outline, fill, radius, padding, hover, focus, disabled, status borders | `Field/inputStyles.stylex.ts` (`inputWrapperStyles`, `inputStatus*Styles`) | TextInput, TextArea, NumberInput, DateInput, DateRangeInput, DateTimeInput, TimeInput, Selector, MultiSelector, ComplexSelector, Typeahead, Tokenizer, PowerSearch, and ChatComposer (outside this map) |
| Focus ring on a disabled field                                                       | `Field/inputDisabledFocus.ts`                                              | the same text-entry fields                                                                                                                                                                              |
| Label, description, optional/required indicator, status message layout               | `Field/Field.tsx`, `Field/FieldLabel.tsx`, `FieldStatus/FieldStatus.tsx`   | every Data Input component except Calendar. CheckboxInput and Switch use FieldLabel and FieldStatus directly, without Field                                                                             |
| Status icon inside the field                                                         | `hooks/useInputStatusIcon.tsx`                                             | the bordered inputs                                                                                                                                                                                     |
| Clear button                                                                         | `Field/InputClearButton.tsx`                                               | TextInput, NumberInput, and the Selectors and search family                                                                                                                                             |
| Joined members in a group                                                            | `InputGroup/groupStyles.ts`                                                | TextInput, NumberInput, DateInput, TimeInput, Typeahead, Selector, MultiSelector, Button                                                                                                                |
| Search field inside a listbox panel                                                  | `Field/PanelSearchInput.tsx`                                               | Selector, MultiSelector, the Tokenizer bottom sheet                                                                                                                                                     |

**Consequence for the theme.** No single theme key paints the shell. Each component has its own key (`text-input`, `text-area`, `number-input`, `selector`, `typeahead` and so on), and each key applies the same shared StyleX styles. A shell change has two possible routes:

- **Tokens**: `--color-border-emphasized`, `--color-accent`, `--color-accent-muted`, `--color-background-surface`, `--radius-element`, `--shadow-inset-<status>` and `--color-border-<status>` (or `--color-text-<status>`). A token change also reaches ChatComposer and every non-input use of the same tokens.
- **The same override on every field key.** This is the same trap as the menu surface in [Astryx anatomy of the Action components](https://github.com/hvn-oss/ds/issues/35).

The Text fields own no listbox, calendar or Menu surface rows. PanelSearchInput is the only piece of the shell that sits inside a panel, and the Selectors and search family owns it.

### Wrapper anatomy (TextInput, NumberInput; TextArea differs below)

From `inputWrapperStyles.base`. The hvn values were rendered in light mode.

| Property                              | Source                                                                                   | hvn value                             |
| ------------------------------------- | ---------------------------------------------------------------------------------------- | ------------------------------------- |
| Height                                | `--size-element-sm                                                                       | md                                    | lg` (set per component) | 28 / 32 / 36px _(rendered)_ |
| Padding                               | `--spacing-1` block, `--spacing-2` inline                                                | 4px / 8px                             |
| Gap between icon, input and end slots | `--spacing-2`                                                                            | 8px                                   |
| Outline                               | `--border-width` solid `--color-border-emphasized`                                       | 1px `#c6c6c6` (neutral 80)            |
| Radius                                | `--_field-radius` = `--radius-element`                                                   | 8px                                   |
| Fill                                  | `--color-background-surface`                                                             | white                                 |
| Value text                            | `--text-body-size` / `--text-body-leading`, `--color-text-primary`, `--font-family-body` | 14/20, `#1b1b1b`                      |
| Placeholder                           | `--color-text-secondary`                                                                 | `#5e5e5e`, the same grey as the label |
| Start icon                            | `startIcon`, `sm` (16px), `secondary`                                                    |                                       |

### Interactive states and what they paint

| State                   | How it's drawn                                                                                                                                                                                                                 | Tokens                                                                                                                             |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| rest                    | the outline above                                                                                                                                                                                                              |                                                                                                                                    |
| hover                   | `inset 0 0 0 2px color-mix(--color-border-emphasized 30%, transparent)`, only under `(hover: hover)` and not while focused or disabled                                                                                         | a literal mix in Core. hvn's `--shadow-inset-hover` has the same value, but inputs don't read the token                            |
| focus (`:focus-within`) | the outline turns `--color-accent`, plus `inset 0 0 0 2px --color-accent-muted`. There is **no** offset outline: inputs don't use the shared 2px/3px focus ring that buttons use                                               | hvn: blue 45 outline, solid blue 90 (`#d4e3ff`) inner ring. Astryx's default `--color-accent-muted` is translucent; hvn's is solid |
| disabled                | wrapper `opacity: 0.5`, no hover ring. The label turns `--color-text-disabled`. The field stays in the tab order (`aria-disabled`), and keyboard focus restores the focus ring under the 0.5 opacity (`inputDisabledFocus.ts`) |                                                                                                                                    |
| read-only               | **nothing**. A read-only field looks exactly like an editable one, with the same hover ring and focus ring. The only difference is that the clear button is hidden _(rendered)_                                                |                                                                                                                                    |
| loading                 | `Spinner size="sm"` (16px) at the end, before the clear button and the status icon. TextInput and TextArea only: NumberInput has no `isLoading`                                                                                |                                                                                                                                    |
| placeholder vs filled   | value text `--color-text-primary`, placeholder `--color-text-secondary`                                                                                                                                                        |                                                                                                                                    |

### Status (error, warning, success)

`status: {type, message?}` and `statusVariant: 'attached'* | 'detached' | 'tooltip'`.

- **Outline**: `--color-border-<status>`, which defaults to `--color-text-<status>`. In hvn that is stop 40: error `#af131f`, warning `#775900`, success `#007230` _(rendered)_. The outline keeps this colour while focused.
- **Hover**: `--shadow-inset-<status>`. hvn redefines these as a 2px 30% mix of `--color-border-<status>`.
- **Focus on a status field paints nothing.** The status hover style replaces the whole `boxShadow` property, including the base `:focus-within` inner ring, and the status border wins over the accent border. A focused error field looks identical to an unfocused one apart from the caret _(rendered)_. The design ticket should decide whether hvn adds a focus cue here. A nested `":focus-within"` under `status:<type>` on each field key can reach it.
- **Icon in the field**: `success`, `warning` or `error` semantic icon at **`md` (20px)**, in `--color-icon-<status>`, which follows `--color-text-<status>`. It is drawn for `attached` and `tooltip`. Under `tooltip` it becomes a focusable button with a 2px-offset ring that opens the message in a tooltip. `detached` draws no icon in the field.
- **`error` sets `aria-invalid`.** NumberInput also sets it while the typed text isn't a number, and greys the text to `--color-text-secondary` until blur.

### Read-only, disabled and status together

`isDisabled` wins over `isReadOnly`. A disabled field with a status keeps its status outline at 0.5 opacity, since `inputStatusBorderStyles` applies whatever the disabled state.

## Per component

### TextInput

**Props that change visuals**: `size` (`sm` | `md`\* | `lg`), `status`, `statusVariant`, `isDisabled`, `isReadOnly` (only the hidden clear button), `isLoading`, `value` (placeholder vs filled), `startIcon`, `hasClear` (shown only with a value, and not when disabled or read-only), and the label slots: `label`, `isLabelHidden`, `description`, `isOptional`, `isRequired`, `labelTooltip`. `width` sizes the whole field. Behaviour only: `type`, `onEnter`, `changeAction`, `disabledMessage` (a tooltip), and the touch-keyboard traits. \* = default.

**Sizes**: 28 / 32 / 36px tall. Padding is the same at every size; only the height changes. The value text is 14/20 at every size.

**Clear button**: a ghost `Button size="sm"`, icon-only, fixed at **20 × 20px** (a literal in `InputClearButton.tsx`), with the `close` icon at `sm` in `secondary` and its own hover and pressed overlays. Its hit area grows on touch. Theme keys `input-clear-button` and `input-clear-icon`, base only.

**Theme key** `text-input`: props `size`, `status`; states `disabled`, `readonly`.

### TextArea

**Props that change visuals**: the same as TextInput, minus `hasClear` and `type`, plus `rows` (default 3), `maxLength` (a counter) and `size`.

**Sizes**: `size` changes padding only, not height, and TextArea **doesn't read `--size-element-*`**. `sm` and `md` are identical: 4px block padding, so 3 rows are 70px tall _(rendered)_. `lg` adds 4px of block padding at each end, so 3 rows are 78px tall. The height comes from `rows`, and the native resize grip allows vertical resizing.

**Differences from the shell**: the wrapper has no padding. The `<textarea>` carries 4px / 8px itself, and the start icon, status icon and spinner are overlays pinned 8px from the top. The counter (`maxLength`) is 12/20 `--color-text-secondary`, pinned bottom-right. Past the limit it turns `--color-text-error`, adds a `warning` icon at `sm`, and sets `aria-invalid`.

**Theme keys**: `text-area` (props `size`, `status`; states `disabled`, `readonly`; `paddingInline` maps to the private `--_textarea-inline-padding`), `text-area-control` and `text-area-counter` (base only; the over-limit colour can't be targeted).

TextArea isn't an InputGroup member.

### NumberInput

**Props that change visuals**: `size`, `status`, `statusVariant`, `isDisabled`, `isReadOnly`, `value`, `startIcon`, `labelIcon`, `units` (trailing text, 14/20 `--color-text-secondary`), `hasNumberSteppers`, `hasClear`, and the label slots. There is **no `isLoading`**. Behaviour only: `min`, `max`, `step`, `formatValue`, `isIntegerOnly`, `isWheelEnabled`.

**Sizes**: 28 / 32 / 36px tall, like TextInput.

**Steppers** (`hasNumberSteppers`):

- **Column**: a 16px column at the end (`--spacing-4`, including its 1px `--color-border-emphasized` leading divider), the full height of the field. It cancels the wrapper's block padding, and its outer corners follow `--_field-radius`. The wrapper's end padding drops to 0.
- **Buttons**: two stacked buttons with a 1px emphasized divider between them, each about 14.5px tall at `md` _(rendered)_. The fill is `--color-background-surface`, with the hover and pressed overlays.
- **Glyphs**: `numberInput:stepperDown` at **`xsm` (12px)** in `--color-icon-secondary`. The up stepper is the same glyph rotated 180°. hvn maps it to Hugeicons ArrowDown01.
- **At a limit, read-only or disabled**: a stepper turns `--color-icon-disabled` and loses its overlay.
- **Coarse pointers**: the steppers are `display: none`, and the end padding comes back. On touch, NumberInput is a plain field.
- **Not focusable** (`tabIndex=-1`): there is no stepper focus ring. Keyboard stepping happens in the input.

**Theme key** `number-input`: props `size`, `status`; states `disabled`, `readonly`. `padding` in any spelling expands to per-side `--astryx-number-input-padding-*` vars that the stepper column also reads. `borderRadius` maps to `--_field-radius`, so the column's corners follow. The stepper column and buttons have **no target of their own**; they can only be reached through nested selectors under `number-input`.

### InputGroup and InputGroupText

**Props that change visuals**: `size` (sm | md\* | lg; the group's height, passed to members through SizeContext), `isDisabled`, `status`, and the label slots. The children are InputGroupText, Button addons, and TextInput, NumberInput, TimeInput, DateInput, Typeahead, Selector or MultiSelector.

**Anatomy**:

- **Group**: `inline-flex` at `--size-element-*` height, transparent.
- **Members**: each member fills the height. Adjacent members overlap by `-1px`, so their outlines share one line. Only the outer corners are rounded (`--radius-element`); inner corners are 0. A focused member is raised (`z-index: 2`), so its accent outline and inner ring show in full.
- **InputGroupText**: `--color-background-muted` fill (`#f1f1f1`), 1px emphasized outline, 8px inline padding, 14/20 `--color-text-secondary`, no wrapping.
- **Button addon**: keeps its own variant. It fills the height and gets square inner corners, but it **doesn't** get the `-1px` overlap.

**Status**: the group passes its status to its Field with `statusVariant="detached"`. The status draws **only a detached message box below the group**. The members' outlines don't change, and no status icon is drawn _(rendered)_. A member given its own `status` gets the status outline, but no icon and no message, since `useInputStatusIcon` draws nothing inside a group. The Astryx Figma master shows a red member with an icon; the code doesn't render that.

**Disabled**: the group sets `opacity: 0.5` **and** passes `isDisabled` to every member, which applies its own 0.5. Inputs and Buttons in a disabled group therefore render at **0.25** effective opacity, while InputGroupText stays at 0.5 _(rendered)_. This looks like an Astryx bug (see the end).

**hvn interaction**: hvn's outlined secondary Button keeps its outline inside an InputGroup. A secondary Button addon next to an input therefore draws a **2px seam**: the input's 1px outline plus the button's 1px outline, with no overlap _(rendered)_. Astryx's own secondary has no outline, so the seam is 1px there. hvn already excludes Selector triggers inside a group (`SECONDARY_SELECTOR`), but not Buttons.

**Theme keys**: `input-group` (props `size`, `status`; no states), `input-group-text` (base only).

### Field (with FieldLabel and FieldStatus)

Field is the wrapper every field control renders. It is also exported for custom controls.

**Field** (`Field.tsx`): a column with a `--spacing-1` (4px) gap between the label group and the control. There is no gap when the label is hidden. `width` sets the whole field. In a `horizontal-labels` FormLayout it uses `display: contents`, and the label sits in a grid column with `1px + 4px` of top padding. Theme key `field` (prop `layout`).

**FieldLabel**:

- **Label**: 14/20, `--font-weight-medium`, **`--color-text-secondary`** (`#5e5e5e`), not primary. A disabled label is `--color-text-disabled`. An optional `labelIcon` sits at `sm`.
- **Indicator**: ` ∙ Optional` or ` ∙ Required`, at 12/20 normal weight in `--color-text-secondary`. A form-level `defaultOptionality` hides the indicator that matches the default.
- **`labelTooltip`**: an InfoTip button beside the label.
- **Description**: below the label with **no gap**, at 12/20 `--color-text-secondary`. It doesn't dim when the field is disabled.
- **Theme key**: `field-label`, base only. Neither the disabled colour, the indicator nor the description has a target.

**FieldStatus** (`FieldStatus.tsx`): 12/20 text, wrapping anywhere.

- **`attached`** (default): the box sits **behind** the control (`z-index: -1`). It is pulled up by half the control height through `--_field-status-overlap`: 14 / 16 / 18px at sm / md / lg _(rendered)_. Its top padding is that overlap plus 8px, so the text sits 8px below the control. It has 8px bottom and inline padding, square top corners and 8px bottom corners. There is no icon; the icon is in the field.
- **`detached`**: the box sits 4px below the control, with 8px padding and 8px corners on all sides, and a leading status icon at **`sm` (16px)** in the message colour (`color="inherit"`).
- **Colours**: `--color-<status>-muted` fill with `--color-on-<status>-muted` text.
- **Theme keys**: `field-status` (props `type`, `variant`), `field-status-icon` (prop `type`) and `input-status-icon` (props `size`, `status`).

## How the existing FieldStatus override renders

hvn overrides `field-status` `type:success|warning|error` with `--color-background-<hue>` / `--color-text-<hue>` (green, yellow, red). Under the hvn tokens **this resolves to exactly the colours Astryx already uses**. hvn defines `--color-<status>-muted` as stop 90 / 25 and `--color-on-<status>-muted` as stop 30 / 85, which are the same stops as the categorical `--color-background-*` (90 / 25) and `--color-text-*` (30 / 85). The rendered page confirms it: `--color-error-muted` and `--color-background-red` are both `light-dark(#ffd8d4, #74040f)`, and the same holds for every pair.

So the override is a **no-op today** in both modes. It renders:

| Status  | Fill (light)        | Message text        | Field outline and icon |
| ------- | ------------------- | ------------------- | ---------------------- |
| error   | red 90 `#ffd8d4`    | red 30 `#8a0010`    | red 40 `#af131f`       |
| warning | yellow 90 `#ffdf97` | yellow 30 `#5a4300` | yellow 40 `#775900`    |
| success | green 90 `#c4f0cb`  | green 30 `#005622`  | green 40 `#007230`     |

The message text is one stop darker than the field outline and icon above it. The override only matters if the status-muted tokens and the categorical pairs ever diverge. The "Ship the Text fields" ticket can delete it as redundant, or keep it as a statement of intent: "status messages match badges and banners".

## What a theme can and can't change

**Reachable with token-only overrides** (on `text-input`, `text-area` and `number-input` together, or through shared tokens):

- Outline colour, fill, radius and padding per `size` and `status`.
- A read-only look, through the `readonly` state. Astryx draws none today.
- The disabled look, through the `disabled` state, for example `opacity`.
- The hover and focus paint, through nested `":hover"` / `":focus-within"` keys, which hvn already uses on `button`.
- The status icon's size and colour (`input-status-icon`).
- The status message box (`field-status`, `field-status-icon`).
- The addon fill (`input-group-text`).
- The clear button (`input-clear-button`, `input-clear-icon`).
- The counter colour (`text-area-counter`, base only).

**Fixed in Core** (literal values, or no target):

- The 2px inset width of the hover and focus rings, and the 30% hover mix.
- The status-field focus that paints nothing (it can only be added through nested selectors per key).
- The 20px clear button.
- The 16px stepper column and the 12px stepper glyph.
- Steppers hidden on coarse pointers.
- The md status icon in the field and the sm icon in the detached message.
- The attached overlap (half the control height).
- The label's secondary colour (only through `field-label` base or the token).
- The description and indicator styles.
- The disabled group's double 0.5 opacity.
- TextArea's `sm` = `md`.

## Draft frame keys

These follow [Component frame coverage](https://github.com/hvn-oss/ds/issues/37). `state` comes last, and each component lists only the values it paints. "Data Input frame coverage" settles them.

| Component          | Draft frame key                                                                                                                                                                         | Frames            |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| TextInput          | `size / status{none, error, warning, success} / value{placeholder, filled} / state{rest, hover, focus, disabled, loading}`                                                              | 3·4·2·5 = **120** |
| TextArea           | `size / status / value / state{rest, hover, focus, disabled, loading}`. `sm` renders the same as `md`                                                                                   | **120**           |
| NumberInput        | draws only what it adds to the shell: `size / state{rest, hover, pressed, focus, disabled}`, with steppers, units and a value drawn. `hover` and `pressed` are on the increment stepper | 3·5 = **15**      |
| InputGroup         | `size / state{rest, focus, disabled}`, drawn as `https:// │ input │ .com`. `focus` is the input member focused                                                                          | 3·3 = **9**       |
| Field: FieldLabel  | `indicator{none, optional, required} / state{rest, disabled}`                                                                                                                           | **6**             |
| Field: FieldStatus | `type{error, warning, success} / variant{attached, detached}`                                                                                                                           | **6**             |

That is **276 frames** for the family. If `value` moves to an example panel (placeholder in the grid, filled in a panel), TextInput and TextArea drop to 60 each, and the family to **156**. The full NumberInput grid would be `size / steppers / status / value / state` at 3·2·4·2·5 = 240, nearly all of it repeating TextInput.

Notes for the coverage grilling:

- **Status frames** draw the attached message, as the Astryx masters do.
- **`read-only` is not proposed as a key or a state value**, because Astryx paints nothing for it (rule 2). If the Text fields design gives read-only a look, add `read-only` to `state`. It is mutually exclusive with editing, like `disabled`.
- **Disabled frames** only need the value columns. A disabled field can take keyboard focus (the ring at 0.5 opacity), but that doesn't need its own frame.
- **`loading`** only applies to TextInput and TextArea.
- **Example panels**: `startIcon`, `hasClear`, `labelTooltip`, `description`, a hidden label, `units`, the TextArea counter and its over-limit state, the NumberInput not-a-number text, `statusVariant` (detached and tooltip), status without a message, `horizontal-labels`, and InputGroup with a Button addon, a Selector member or a group status.
- **The Astryx Figma masters** use sizes as columns and states as rows: rest, hover, focus, error, warning, success, loading and disabled for TextInput, TextArea and NumberInput. InputGroup has rest, focus, error and disabled. Field has a none/error/warning/success row and the plain, Optional and Required labels.

## Touch sizing

These controls read `--size-element-*` and belong on the Touch sizing artboard. Each goes from 28/32/36 to 32/36/40 on coarse pointers below `lg`:

- **TextInput**: its height.
- **NumberInput**: its height. Its steppers also disappear on coarse pointers, so the touch column draws it without steppers.
- **InputGroup**: the group's height. InputGroupText and Button addons fill it.
- **Field's attached FieldStatus**: the overlap is half the control height, so it grows to 16/18/20px. This follows from the above and isn't a control of its own.

These don't read `--size-element-*`:

- **TextArea**: its height comes from `rows` and padding. Under the ×1.14 type ramp its line height goes from 20 to 24px, so 3 rows grow from 70 to 82px through the type alone.
- **The clear button**: fixed at 20px, with a hit area that grows.
- **The status and stepper icons**.

The value text follows `--text-body-size`, so it is 16/24 on touch. Core also has an iOS-only 16px floor (`max(1rem, …)`) to stop Safari zooming on focus.

## Possible upstream fixes

These might be worth a request to Astryx. Ask the user before drafting one in `docs/fixes-for-upstream/`.

- **A disabled InputGroup dims its members twice**: the group's 0.5 times the member's 0.5 gives 0.25 effective opacity, while InputGroupText stays at 0.5.
- **A focused field with a status shows no focus change**, because the status hover style drops the base `:focus-within` inner ring.
- **Button addons in an InputGroup don't get the `-1px` overlap** that input and text members get. This is only visible with an outlined button, such as hvn's secondary.
