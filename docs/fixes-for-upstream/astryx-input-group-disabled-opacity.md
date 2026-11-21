# Astryx: dim a disabled InputGroup's members once, not twice

- **Upstream**: [meta/astryx](https://github.com/meta/astryx/issues), `@astryxdesign/core`
- **Status**: draft, not filed. No matching upstream issue found (searched 2026-11-19).
- **Checked against**: 0.7.11 (installed) and 0.7.16 (latest on npm, 2026-11-19). Neither has the fix.
- **hvn workaround**: none yet. The decision is pending in [Text fields design](https://github.com/hvn-oss/ds/issues/59). The theme could set `opacity: 1` on `input-group` under `:is([aria-disabled="true"])`, and `opacity: 0.5` on `input-group-text` inside a disabled group, so each member dims once. Untested.
- **When it lands**: bump `@astryxdesign/core`, check that a disabled InputGroup renders its inputs, Buttons and InputGroupText at 0.5, remove any opacity override the Text fields design added for it, then delete this file.

---

## Draft issue

**Title:** InputGroup: a disabled group dims its inputs and Button addons twice (0.25 opacity)

### Problem

A disabled InputGroup renders its inputs and Button addons at 0.25 opacity, half as visible as a disabled input on its own. Its InputGroupText stays at 0.5, so the row is dimmed unevenly.

The group dims itself and disables its members, and each member dims itself too:

- `InputGroup/InputGroup.tsx:41-44` defines `styles.disabled` with `opacity: 0.5`, applied to the group at line 222.
- The same component passes `isDisabled` to its members through `InputGroupInternalContext` (lines 159 and 178).
- TextInput reads it (`TextInput/TextInput.tsx:368`) and applies `inputWrapperStyles.disabled` (line 505), which is `opacity: 0.5` (`Field/inputStyles.stylex.ts:74-80`). NumberInput does the same (`NumberInput/NumberInput.tsx:656`, `1200`).
- Button reads it (`Button/Button.tsx:740-742`) and applies `styles.disabled` (line 848), also `opacity: 0.5` (lines 203-205).
- InputGroupText (`InputGroup/InputGroupText.tsx`) has no disabled state, so it only gets the group's 0.5.

Opacity multiplies, so inputs and Buttons end up at 0.5 × 0.5 = 0.25. ButtonGroup avoids this: it passes `isDisabled` to its buttons and sets only `aria-disabled` on itself (`ButtonGroup/ButtonGroup.tsx:209`, `243`), so each button dims once.

The double dim dates from 0.7.5 ("Disabling an InputGroup now disables the inputs and Button addons inside it"), which added the member state without removing the group's opacity.

### Why the workarounds fall short

A theme can reset the group's opacity with a nested `:is([aria-disabled="true"])` rule on `input-group`, then dim `input-group-text` itself inside a disabled group. That depends on `aria-disabled`, which isn't a documented theming hook, and every theme has to rediscover it. The `input-group` target has no `disabled` state to key off.

### Proposal

Follow ButtonGroup: let the members own the disabled look.

1. Drop `opacity` from `styles.disabled` in `InputGroup.tsx` (keep `cursor: 'default'`).
2. Have InputGroupText read `InputGroupInternalContext` and apply `opacity: 0.5` when the group is disabled, reflecting it as a `disabled` state on its `input-group-text` theme target.

Every member then dims once, to the same 0.5 as a standalone disabled field.

### Reproduction

```tsx
<InputGroup label="Website" isDisabled>
  <InputGroupText>https://</InputGroupText>
  <TextInput label="Domain" isLabelHidden value="example" onChange={() => {}} />
  <Button label="Check" />
</InputGroup>
```

The group's computed opacity is 0.5, and so are the TextInput wrapper's and the Button's, so both render at 0.25. `https://` renders at 0.5. A standalone `<TextInput isDisabled />` renders at 0.5.
