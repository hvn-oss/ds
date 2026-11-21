# Astryx: keep the focus ring on a field with a status

- **Upstream**: [meta/astryx](https://github.com/meta/astryx/issues), `@astryxdesign/core`
- **Status**: draft, not filed. No matching upstream issue found (searched 2026-11-19).
- **Checked against**: 0.7.11 (installed) and 0.7.16 (latest on npm, 2026-11-19). Neither has the fix.
- **hvn workaround**: none yet. The decision is pending in [Text fields design](https://github.com/hvn-oss/ds/issues/59). The theme could add `":focus-within": {boxShadow: "inset 0 0 0 2px var(--color-accent-muted)"}` under `status:success`, `status:warning` and `status:error` on every field key (`text-input`, `text-area`, `number-input` and the other bordered fields).
- **When it lands**: bump `@astryxdesign/core`, check that a focused error field shows the inner ring, remove the nested `:focus-within` rules from each field key, then delete this file.

---

## Draft issue

**Title:** Inputs: a focused field with a status shows no focus change

### Problem

A TextInput, TextArea or NumberInput with a `status` (success, warning or error) looks the same focused as unfocused. The caret is the only cue, so keyboard focus isn't visible (WCAG 2.2 2.4.7).

The base wrapper draws focus as an accent border plus a 2px inset `--color-accent-muted` ring (`Field/inputStyles.stylex.ts:48-54` and `64-71`). A status field loses both:

- **The ring.** `inputStatusHoverShadowStyles` (lines 123-151) sets `boxShadow: {default: 'none', ':hover:not(:focus-within)…': …}`. StyleX resolves each property from the last style that sets it, conditions included, so this object replaces the base `boxShadow` and its `:focus-within` entry. TextInput applies it after the base (`TextInput/TextInput.tsx:503-509`), as do TextArea (`TextArea/TextArea.tsx:628-634`) and NumberInput (`NumberInput/NumberInput.tsx:1196-1204`). The same pair is composed in DateInput, TimeInput, DateRangeInput, DateTimeInput, Typeahead, Tokenizer and PowerSearch.
- **The border.** `inputStatusBorderStyles` and `inputStatusFocusWithinStyles` (lines 89-117, 159-187) keep the status colour under `:focus-within`. This looks deliberate, since the status should stay readable, and forced colors already switch it to `Highlight`.

The hover style is applied only when the field isn't disabled. A disabled status field therefore keeps `inputDisabledFocusStyles.ring` (`Field/inputDisabledFocus.ts:28-31`) and shows the inner ring on keyboard focus, while an enabled one shows nothing.

### Why the workarounds fall short

A theme can add a nested `:focus-within` box-shadow under `status:<type>` on each field key. That is three statuses times every bordered field key (`text-input`, `text-area`, `number-input`, `date-input`, `time-input`, `typeahead`, `tokenizer` and the rest), and it has to restate a ring that Core already defines. A theme that misses a key leaves that field without focus.

### Proposal

Keep the base focus ring in each status hover style:

```ts
error: {
  boxShadow: {
    default: 'none',
    ':hover:not(:focus-within):where(:not(:disabled,[aria-disabled="true"]))': {
      '@media (hover: hover)': shadowVars['--shadow-inset-error'],
    },
    ':focus-within': `inset 0px 0px 0px 2px ${colorVars['--color-accent-muted']}`,
  },
},
```

The same for `warning` and `success`. The border keeps its status colour, and the inner ring marks focus as it does on a field without a status. If the ring should take the status hue instead, that's a token choice, but the ring shouldn't disappear.

### Reproduction

```tsx
<TextInput label="Email" value="ana@" onChange={() => {}} />
<TextInput
  label="Email"
  value="ana@"
  onChange={() => {}}
  status={{type: 'error', message: 'Enter a full email address.'}}
/>
```

Tab into the first field: its border turns accent and a 2px inner ring appears. Tab into the second: its border stays error red, no ring appears, and the field looks the same as before focus.
