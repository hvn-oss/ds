# Astryx: overlap Button addons with their neighbour in an InputGroup

- **Upstream**: [meta/astryx](https://github.com/meta/astryx/issues), `@astryxdesign/core`
- **Status**: draft, not filed. No matching upstream issue found (searched 2026-11-19).
- **Checked against**: 0.7.11 (installed) and 0.7.16 (latest on npm, 2026-11-19). Neither has the fix.
- **hvn workaround**: none yet. The decision is pending in [Text fields design](https://github.com/hvn-oss/ds/issues/59). The theme could add `':where(.astryx-input-group > :not(:first-child))': {marginInlineStart: 'calc(-1 * var(--border-width))'}` to `button` `variant:secondary`, or drop the leading border there, as `SECONDARY_IN_BUTTON_GROUP` does for ButtonGroup seams.
- **When it lands**: bump `@astryxdesign/core`, check that a secondary Button after a TextInput in an InputGroup draws a 1px seam, remove the nested InputGroup rule from `button`, then delete this file.

---

## Draft issue

**Title:** InputGroup: Button addons don't overlap their neighbour's border, so bordered buttons draw a double seam

### Problem

In an InputGroup, inputs and text addons overlap the member before them by one border width, so adjacent outlines share one line. Button addons don't, so a Button with a border draws a 2px seam where it follows another member.

- Inputs get `marginInlineStart: calc(-1 * --border-width)` from `groupStyles.inGroup` (`InputGroup/groupStyles.ts:79-82`).
- InputGroupText has the same margin (`InputGroup/InputGroupText.tsx:48-51`).
- Button addons get `groupStyles.buttonAddon` (`groupStyles.ts:48-74`, applied at `Button/Button.tsx:857`). It squares the inner corners, fills the height and raises the focused button, but sets no margin.

Core's own Button variants have no border (`Button/Button.tsx:123-124`, `302-336`), so the default theme doesn't show it. Astryx's theme templates do: `chocolate` gives the secondary Button a 1px `--color-border-emphasized` border, `y2k` gives every Button a 1px border, and `butter` and `stone` give the secondary a 1.5px one. Any of these themes draws a doubled seam between an input and a Button addon after it. The templates already exempt secondary Selector triggers inside a group (`:not(.astryx-input-group *)`), but not Buttons.

### Why the workarounds fall short

A theme can add the overlap itself, with a nested `:where(.astryx-input-group > :not(:first-child))` rule under `button`. That rule depends on `.astryx-input-group` and the DOM shape of the group, neither of which is a documented theming hook, and every bordered theme has to write it.

### Proposal

Give `buttonAddon` the same overlap as the other members, on the selector it already uses for square inner corners:

```ts
marginInlineStart: {
  default: null,
  [DIRECT_INPUT_GROUP_ADDON_NOT_FIRST]: `calc(-1 * ${borderVars['--border-width']})`,
},
```

`borderVars` is already imported. Input wrappers sit at `z-index: 1`, so the input's outline stays on top of the shared line, and a focused button already rises to `z-index: 2`. For a borderless button the only change is that 1px of its fill sits under the neighbour's outline.

### Reproduction

```tsx
const theme = defineTheme({
  name: "repro",
  components: {
    button: {
      "variant:secondary": {
        borderWidth: "var(--border-width)",
        borderStyle: "solid",
        borderColor: "var(--color-border-emphasized)",
      },
    },
  },
});

<InputGroup label="Coupon">
  <TextInput label="Code" isLabelHidden value="" onChange={() => {}} />
  <Button label="Apply" variant="secondary" />
</InputGroup>;
```

The seam between the field and the button is 2px: the input's outline and the button's border, side by side. Swap the Button for an `InputGroupText` and the seam is 1px. The `chocolate` theme template reproduces it with no custom theme.
