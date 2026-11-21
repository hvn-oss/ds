# Astryx: give Typeahead's result rows a theming target, as Selector's rows have

- **Upstream**: [meta/astryx](https://github.com/meta/astryx/issues), `@astryxdesign/core`. Extends the open [meta/astryx#10116](https://github.com/meta/astryx/issues/10116), which asks for the same target with `size` only. File this as a comment on #10116 if upstream prefers one thread.
- **Status**: draft, not filed
- **Checked against**: 0.7.11 (installed) and 0.7.16 (latest on npm, 2026-11-19). Neither has the fix.
- **hvn workaround**: none yet. The decision is pending in [Selectors and search design](https://github.com/hvn-oss/ds/issues/61). The theme has no workaround: an override can't reach descendants, so `typeahead-dropdown` can't style its rows. The only option would be a plain CSS rule outside the theme, keyed on the DOM (`.astryx-typeahead-dropdown [role="option"][aria-selected="true"]`). That could recolour the check and reshape rows, but it relies on undocumented structure. It can't add the keyboard ring, because nothing on the DOM marks the highlighted row, and it can't tell sizes apart. Found in [Astryx anatomy of the Selectors and search](https://github.com/hvn-oss/ds/issues/54).
- **When it lands**: upgrade `@astryxdesign/core`, then style the rows on the new target in `packages/ds/src/themes/hvn/hvnTheme.ts` as the Selectors and search design decided. Delete any stopgap CSS that design added, then delete this file.

---

## Draft issue

**Title:** BaseTypeahead: a theming target on result rows, a `check` indicator mark and a keyboard ring, as Selector's rows have

### Problem

A theme can't make Typeahead's, Tokenizer's or PowerSearch's result rows match Selector's option rows.

Selector's row carries `themeProps('selector-option-row', {size, selected, disabled})` (`Selector/Selector.tsx:1040-1044`). Its mark is the theme's `check` indicator with a `selector-check` target (`Selector.tsx:1006-1013`), drawn in `accent` (`Indicator/CheckIndicator.tsx:160`). After keyboard input, the active row also draws the focus ring, because "the fill alone does not reach 3:1 against the listbox" (`Selector.tsx:523-531`).

BaseTypeahead's row has none of these (`Typeahead/BaseTypeahead.tsx:1821-1853` in 0.7.11, `:2311-2339` in 0.7.16):

- **No target.** The row is plain StyleX, so its padding per size, corners, highlight fill and selected weight are fixed. The only targets in the popup are `typeahead-dropdown` (the list) and `typeahead-empty-state`, and `typeahead-item` is the content inside the row (`Typeahead/Typeahead.doc.mjs:312-315`). Tokenizer renders the same list, and PowerSearch renders it through Tokenizer, so all three are affected.
- **A hard-coded mark.** The selected row draws `<Icon icon="check" size="sm" color="primary" />`, which is `--color-icon-primary` (black by default). A Selector next to it shows a blue check, and a theme's `indicators.check` doesn't reach this one.
- **No keyboard ring.** `itemHighlighted` paints only the hover fill. Its outline applies only under forced colours (`BaseTypeahead.tsx:374-388`).

#10116 covers the `size` part of this.

### Why the workarounds fall short

1. **The theme can't reach the rows.** A nested key on `typeahead-dropdown` can only add a pseudo-class or `:where()` to the list itself, not to its children.
2. **`renderItem` replaces only the content.** The row's padding, corners, highlight and check stay outside it.
3. **Plain CSS on the DOM is fragile and incomplete.** `[role="option"][aria-selected="true"] > svg` can recolour the check, but it depends on undocumented markup. It can't add the ring, because the highlighted row has no attribute (only StyleX classes and the input's `aria-activedescendant`), and it can't tell sizes apart.

### Proposal

Bring BaseTypeahead's row in line with Selector's:

1. Add a target on the row, for example `typeahead-option-row` (named like `selector-option-row`, since `typeahead-item` is already the content):

   ```ts
   themeProps("typeahead-option-row", {
     size,
     selected: isSelected ? "selected" : null,
   });
   ```

   Then list it in `Typeahead.doc.mjs` with `visualProps: ['size']` and `states: ['selected']`. That closes #10116. If unavailable results land (#8933), `disabled` can join the states.

2. Draw the mark with the `check` indicator (`SelectionMark`), as Selector does, with a stable target such as `typeahead-check`. The default becomes the `accent` check, which matches Selector.
3. Draw Selector's keyboard ring (`itemKeyboardHighlighted`) on the row highlighted by keyboard input, not on a pointer highlight.

Points 2 and 3 change the default look (the colour of the check and a new ring), so they may want their own note in the changelog. Point 1 is additive.

### Reproduction

```tsx
const theme = defineTheme({
  name: "repro",
  components: {
    "selector-option-row": { selected: { backgroundColor: "var(--color-accent-muted)" } },
  },
});

const options = [
  { value: "a", label: "Apple" },
  { value: "b", label: "Banana" },
];

<>
  <Selector label="Selector" options={options} value="a" onChange={() => {}} />
  <Typeahead
    label="Typeahead"
    searchSource={createStaticSource([
      { id: "a", label: "Apple" },
      { id: "b", label: "Banana" },
    ])}
    value={{ id: "a", label: "Apple" }}
    onChange={() => {}}
  />
</>;
```

Open the Selector and press ArrowDown. In the Typeahead, click the value to edit it, type `a` and press ArrowDown. Selector's selected row takes the theme fill, has a blue check, and the active row has a focus ring. Typeahead's selected row has a black check, no theme fill and no ring. No component key in the theme reaches it.
