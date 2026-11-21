# Astryx: theme reach for Calendar's range band, month label and outside days

- **Upstream**: [meta/astryx](https://github.com/meta/astryx/issues), `@astryxdesign/core`
- **Status**: draft, not filed
- **Checked against**: 0.7.11 (installed) and 0.7.16 (latest on npm, 2026-11-19). Neither has the fix. 0.7.16 turned the cell and day sizes into minimums, but the band caps, the label weight and the outside-day paint are unchanged (`Calendar/styles.ts:48,158-202,244,312`, `Calendar/Calendar.tsx:779,1418-1451,1470`). No upstream issue covers these elements. [#5417](https://github.com/meta/astryx/issues/5417) (open) asks for targets on other internal elements and could take this as a comment instead.
- **hvn workaround**: none yet. The decision is pending in [Date and time design](https://github.com/hvn-oss/ds/issues/62). The theme has no clean workaround. The only options are changing global tokens (`--radius-full`, `--font-weight-semibold`), which restyles other components, or setting the `calendar-day` `disabled` opacity, which changes outside and constrained days together.
- **When it lands**: bump `@astryxdesign/core`. Set whatever Date and time design chose for the band caps, the month label and outside days on the new targets in `packages/ds/src/themes/hvn/hvnTheme.ts`, and remove any token or `disabled` override added as a stopgap. Then delete this file.

---

## Draft issue

**Title:** Calendar: theme targets for the range band and the month label, and an `outside` state on `calendar-day`

### Problem

A theme can restyle Calendar's day buttons through `calendar-day`, but three parts of Calendar have no theme reach. Paths are in `@astryxdesign/core/src/` at 0.7.11.

1. **The range band's pill caps.** The band behind in-range days, and the hover preview band, are unclassed `<div>`s beside the day button (`Calendar/Calendar.tsx:1408-1441`). Their caps are `--radius-full` (`Calendar/styles.ts:153-162,178-197`), and their colours are `--color-accent-muted` and `--color-overlay-hover` (`:253-260`). A theme that squares the days with `calendar-day: {base: {borderRadius: 'var(--radius-element)'}}` gets square days on a band with round ends.
2. **The month label's weight.** The "November 2026" label is a `<span>` with only StyleX classes (`Calendar.tsx:769-771`), fixed at `--font-weight-semibold` (`styles.ts:48`). A theme whose headings are medium can't match it.
3. **The outside-month day opacity.** Outside days always count as disabled (`effectivelyDisabled: isDisabled || isOutside`, `Calendar/dayCellUtils.ts:59`). They get `dayDisabled`'s 0.3 opacity, which is applied after `dayOutside`'s 0.5 and wins (`styles.ts:236-238,304-305`, `Calendar.tsx:1481-1490`), so the 0.5 never shows. `calendar-day` reflects `disabled` but no outside state (`Calendar.tsx:1460-1476`, `Calendar.doc.mjs:247-248`), so a theme can't tell an outside day from a constrained one.

### Why the workarounds fall short

1. **Global tokens restyle other components.** `--radius-full` also rounds pills, avatars and chips. `--font-weight-semibold` is every semibold. `--color-accent-muted` is also every field's focus ring.
2. **Pseudo-class keys can't reach these elements.** `defineTheme` appends a nested key to the target's own selector (`theme/generateThemeRules.ts:109-130,1331`). From `calendar` it can only style the root. From `calendar-day` it can't reach the band, which comes before the button in the cell.
3. **`calendar-day` `disabled` is one opacity for two kinds of day.** It sets outside days and days ruled out by `min`, `max` or `dateConstraints` together.
4. **Structural CSS works, but outside the theme.** A selector such as `.astryx-calendar [role="gridcell"] > div` depends on the cell's DOM and breaks silently when it changes, as #5417 describes.

### Proposal

One additive change to Calendar. Default rendering stays the same.

- **Band**: put `themeProps('calendar-range', {preview: isInPreview ? 'preview' : null})` on the range and preview bands. Have the cap corners read a private var that defaults to `--radius-full`, and register `borderRadius` on `calendar-range` in the derived-var registry, as `--_field-radius` is for fields. Then `calendar-range: {base: {borderRadius: 'var(--radius-element)'}}` changes only the caps, and a theme can colour the band without changing `--color-accent-muted`.
- **Month label**: put `themeProps('calendar-month-label')` on the label `<span>`.
- **Outside days**: add `outside: isOutside ? 'outside' : null` to the `calendar-day` theme props. With it, a theme can write `calendar-day: {'disabled+outside': {opacity: '0.5'}}`. It's also worth deciding whether `dayOutside`'s 0.5 is meant to show.

Add the new targets and the `outside` state to `Calendar.doc.mjs`. Precedent: [#4286](https://github.com/meta/astryx/issues/4286) added `marker` to `calendar-day`, and [#6224](https://github.com/meta/astryx/issues/6224) added `slider-control` for a fixed opacity.

### Reproduction

```tsx
const theme = defineTheme({
  name: "repro",
  components: {
    "calendar-day": { base: { borderRadius: "var(--radius-element)" } },
  },
});

<Calendar mode="range" defaultValue={{ start: "2026-11-09", end: "2026-11-13" }} />;
```

The range endpoints are square, but the band behind November 9–13 still has round ends. The month label is semibold, and the outside-month days are at 0.3 opacity. None of these can change from the theme without also changing other components or constrained days.
