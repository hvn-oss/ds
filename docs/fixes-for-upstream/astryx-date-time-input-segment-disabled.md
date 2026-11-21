# Astryx: reflect `disabled` on the DateTimeInput segment targets

- **Upstream**: [meta/astryx](https://github.com/meta/astryx/issues), `@astryxdesign/core`
- **Status**: draft, not filed
- **Checked against**: 0.7.11 (installed) and 0.7.16 (latest on npm, 2026-11-19). Neither has the fix (0.7.16: `DateTimeInput/DateTimeInput.tsx:1802-1811,1967-1976`, `DateTimeInput/TouchDateTimeField.tsx:1318-1327,1410-1419`, `DateTimeInput.doc.mjs:254-260`). No upstream issue found. [#4075](https://github.com/meta/astryx/issues/4075) (closed) added the segment targets without states.
- **hvn workaround**: none yet. The decision is pending in [Date and time design](https://github.com/hvn-oss/ds/issues/62). If the design restyles disabled fields, the theme could add a pseudo-class key to both segment keys, `":is(.astryx-date-time-input[data-disabled=\"disabled\"] *)"`, which reads the row's `disabled` state. It's untried in hvn and keyed on another target's attribute.
- **When it lands**: bump `@astryxdesign/core`. If the theme uses the `:is(…)` key, move its styles to `disabled` on `date-time-input-date-segment` and `date-time-input-time-segment` in `packages/ds/src/themes/hvn/hvnTheme.ts`. Then delete this file.

---

## Draft issue

**Title:** DateTimeInput: reflect `disabled` on `date-time-input-date-segment` and `date-time-input-time-segment`

### Problem

A theme can restyle a disabled DateInput or TimeInput, but not DateTimeInput's segments. Paths are in `@astryxdesign/core/src/` at 0.7.11.

The two segments are DateTimeInput's bordered field shells. They paint the field's disabled look (`inputWrapperStyles.disabled`: 0.5 opacity, the emphasized border and no shadow, `Field/inputStyles.stylex.ts:74-80`) at `DateTimeInput/DateTimeInput.tsx:1717,1871`. Their theme props reflect only `size` and `status` (`:1709-1712,1863-1866`), and `DateTimeInput.doc.mjs:239-246` lists no states for them. The touch field is the same (`DateTimeInput/TouchDateTimeField.tsx:1263-1271,1354-1362`).

The `disabled` state is reflected only on `date-time-input` (`DateTimeInput.tsx:1692-1696`), which is the unbordered row holding the segments. DateInput and TimeInput reflect it on their bordered shells (`DateInput/DateInput.tsx:876-880`, `TimeInput/TimeInput.tsx:777-781`). A theme that writes `date-input: {disabled: {...}}` has no matching key for DateTimeInput, so a disabled DateTimeInput doesn't match a disabled DateInput beside it.

### Why the workarounds fall short

1. **The row's `disabled` state paints the row.** The row has no border to restyle. An opacity on it multiplies with the segments' 0.5 and can't undo it.
2. **A pseudo-class key on each segment reaches across targets.** `":is(.astryx-date-time-input[data-disabled=\"disabled\"] *)"` on both segment keys should match. But it's keyed on another target's attribute, isn't documented, and the theming-targets guard can't see it.
3. **Shared tokens change every field.** `--color-border-emphasized` is the outline of every input.

### Proposal

Pass `disabled: isDisabled ? 'disabled' : null` to both segment `themeProps` calls in `DateTimeInput.tsx` and `TouchDateTimeField.tsx`. Add `states: ['disabled']` to both segment targets in `DateTimeInput.doc.mjs`. The change is additive, and it matches `date-input` and `time-input`, which reflect `isDisabled`.

One thing to decide alongside it: the segments paint disabled under `isEffectivelyDisabled`, which also covers `isLoading` and a pending change (`DateTimeInput.tsx:748-749`). DateInput and TimeInput paint disabled only for `isDisabled` (`DateInput.tsx:887`, `TimeInput.tsx:785`). So a loading DateTimeInput fades to 0.5 while a loading DateInput doesn't. The reflected state should follow whichever condition the paint settles on.

### Reproduction

```tsx
const theme = defineTheme({
  name: "repro",
  components: {
    "date-input": { disabled: { opacity: "1", backgroundColor: "var(--color-background-muted)" } },
  },
});

<>
  <DateInput label="Date" isDisabled />
  <DateTimeInput label="Date and time" isDisabled />
</>;
```

The DateInput gets the theme's disabled look. The DateTimeInput's segments stay at Core's 0.5 opacity, and there's no `disabled` key on the segment targets to give them the same look.
