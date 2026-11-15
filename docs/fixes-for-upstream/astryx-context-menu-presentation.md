# Astryx: reflect `presentation` on the ContextMenu theming target

- **Upstream**: [meta/astryx](https://github.com/meta/astryx/issues), `@astryxdesign/core`
- **Status**: draft, not filed
- **Checked against**: 0.7.11 (installed) and 0.7.16 (latest on npm, 2026-11-14). Neither has the fix.
- **hvn workaround**: `context-menu` in `packages/ds/src/themes/hvn/hvnTheme.ts`, guarded by `packages/ds/tests/context-menu-sheet.test.ts`. Decided in [Update the theme's Action overrides](https://github.com/hvn-oss/ds/issues/44).
- **When it lands**: move the `context-menu` override to `presentation:popover`, delete the `:is([data-autofocus])` rule and the guard test, then delete this file.

---

## Draft issue

**Title:** ContextMenu: reflect `presentation` on `astryx-context-menu`, as DropdownMenu does

### Problem

A theme can't style ContextMenu's popover panel without also styling its bottom sheet.

DropdownMenu passes its presentation to the theming target, `themeProps('dropdown-menu', {presentation: 'popover' | 'bottom-sheet'})`, so a theme can write:

```ts
components: {
  'dropdown-menu': {'presentation:popover': {padding: 'var(--spacing-2)'}},
}
```

ContextMenu calls `themeProps('context-menu')` with no props, on the popover list and on both bottom-sheet lists. Its doc lists `targets: [{className: 'astryx-context-menu'}]` with no `visualProps`. Any `context-menu` override therefore reaches the sheet too.

### Why the workarounds fall short

Suppose a theme sets `context-menu: {base: {padding: 'var(--spacing-2)'}}` to match its DropdownMenu popover:

1. **The sheet loses its inset.** The theme layer beats the sheet's StyleX padding (`sheetMenuInset`: 20px block start, 4px block end, 8px inline), so the sheet gets 8px on every side. Restoring it needs a selector for the sheet. The only marker is `data-autofocus`, which isn't a documented theming attribute.
2. **The sheet's row corners change, and there's no way to restore them.** `padding` derives `--_dropdown-menu-padding`, and rows draw `radius-container − padding`. A theme can't set a private var inside a nested selector, and nested selectors get no derived-var expansion. So the sheet's rows take the popover's corners (8px), while DropdownMenu's sheet keeps 12px.

### Proposal

Reflect the resolved presentation on the target, as DropdownMenu does:

```ts
themeProps("context-menu", { presentation: usesBottomSheet ? "bottom-sheet" : "popover" });
```

Apply it on the popover list and on both sheet lists (`menuContent` and data-driven `items`). Then add `visualProps: ['presentation']` to the `astryx-context-menu` target in `ContextMenu.doc.mjs`, and add the derived-var registry entries if needed. The change is additive: existing `base` overrides behave as before.

### Reproduction

```tsx
const theme = defineTheme({
  name: "repro",
  components: { "context-menu": { base: { padding: "var(--spacing-2)" } } },
});

<ContextMenu presentation="bottom-sheet" items={[{ label: "Rename" }, { label: "Delete" }]}>
  <div>Right-click me</div>
</ContextMenu>;
```

Open the sheet. Its padding is 8px on every side, not the inset Astryx draws by default, and its rows have 8px corners where DropdownMenu's sheet has 12px. Nothing in the theme API can scope the override to the popover.
