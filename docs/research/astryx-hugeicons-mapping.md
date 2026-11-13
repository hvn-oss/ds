# Astryx semantic icons in free Hugeicons

Research for [#16](https://github.com/hvn-oss/ds/issues/16), part of the map [#12](https://github.com/hvn-oss/ds/issues/12) "hvn visual identity: foundations and icons".

**Question.** Which free Hugeicons icon (stroke rounded, `@hugeicons/core-free-icons`) best fits each semantic icon name Astryx expects?

**Answer.** Every semantic name has a clear free stroke-rounded match. The Design file's Icons page is the same free stroke-rounded set, and every pick below is on it. Three things need a decision rather than a lookup:

1. **Status icons and `stop` lose their solid fill.** Astryx's defaults draw `success`, `error`, `warning`, `info`, `moreHorizontal` and `stop` filled. The free set has no solid style, so these become outlines.
2. **Hugeicons' own Lucide aliases are wrong for three names.** The free package exports Lucide-named aliases. `ArrowUp` points to a chevron (`ArrowUp01Icon`), `AlertTriangle` to a triangle with the exclamation mark upside down (`Alert01Icon`), and `EyeOff` to a closed eye with no slash (`ViewOffIcon`). Don't port `icons.js` by swapping the Lucide names for their aliases.
3. **`numberInput:stepperDown` is a 30th, namespaced name.** It is outside the `IconName` union, and `icons.js` doesn't map it today, so NumberInput draws Astryx's built-in fallback chevron.

Versions checked: `@astryxdesign/core` 0.7.11, `@hugeicons/core-free-icons` 4.4.0, `@hugeicons/react` 1.1.10.

## 1. Semantic names Astryx expects

`IconName` in `@astryxdesign/core/src/Icon/globalIconRegistry.tsx` is a union of **29 names**. `IconRegistry` is `Record<IconName, ReactNode>`, so a full registry has to cover all 29. Components can also resolve namespaced keys (`'<namespace>:<name>'`). Core 0.7.11 ships one of them, `numberInput:stepperDown`, which has a fallback in `src/Icon/defaultIcons.tsx`. A theme can override it through `defineTheme({icons})`.

The "Used by" column below comes from grepping `@astryxdesign/core/src` (tests, docs and stories excluded) for each name. A match counts when it is passed as `<Icon icon="…">`, through `useIcon('…')`, or from an `IconName` map (status maps, `ChatMessageMetadata`, PowerSearch operator icons, and so on). The usage hints come from `@astryxdesign/cli/assets/docs/icons.doc.mjs`.

## 2. Mapping

All export names were checked against the published `@hugeicons/core-free-icons@4.4.0` tarball (`dist/types/index.d.ts`). Geometry was read from `dist/esm`. Every icon is a 24×24 viewBox with `strokeWidth: 1.5` and round caps and joins.

| Semantic name | Used by (core 0.7.11) | Hugeicons pick | Alternatives | Notes |
| --- | --- | --- | --- | --- |
| `close` | Token, Thumbnail, DrawerHeader, DialogHeader, Toast, Banner, Lightbox, MobileNav, InputClearButton, PowerSearch (sheet, edit popover), Table sort menu ("clear sort"), CodeBlock (copy failed) | `Cancel01Icon` | `MultiplicationSignIcon`, `Cancel02Icon` | Plain ×. Hugeicons' `X` alias. |
| `chevronDown` | Selector, ComplexSelector, MultiSelector, DropdownMenu, SideNavItem, SideNavHeading, TopNavHeading/Menu/MegaMenu, BreadcrumbItem, TabMenu, Banner, ChatToolCalls, ChatLayoutScrollButton, TouchDateField, TouchDateTimeField | `ArrowDown01Icon` | — | In Hugeicons, "ArrowX01" is the chevron. |
| `chevronLeft` | Pagination, Calendar, SideNavCollapseButton, DropdownMenu, DropdownMenuSubMenu, ContextMenu, Carousel, TabList, Stepper, Lightbox, TouchDateField, TouchDateTimeField | `ArrowLeft01Icon` | — | |
| `chevronRight` | Pagination, Calendar, CodeBlock, DropdownMenuSubMenu, MenuBottomSheetActionList, TreeListItem, Carousel, TabList, Stepper, Lightbox, Table (tree, grouped rows), PowerSearchBottomSheet, TouchDateField, TouchDateTimeField | `ArrowRight01Icon` | — | |
| `chevronsLeft` | Pagination (first page) | `ArrowLeftDoubleIcon` | — | |
| `chevronsRight` | Pagination (last page) | `ArrowRightDoubleIcon` | — | |
| `check` | CheckIndicator, BaseTypeahead, TabMenu, Table context menu, HeadingLinksRenderer (copied), CodeBlock and TimestampHoverCard (copied), ChatMessageMetadata ("sent") | `Tick02Icon` | `Tick01Icon` | `Tick02` is a geometric two-segment tick (`M5 14 L8.5 17.5 L19 6.5`), like Astryx's default and Lucide's `Check`. `Tick01` is Hugeicons' `Check` alias, a hand-drawn curved tick. |
| `success` | Banner, FieldStatus, Selector, MultiSelector, ComplexSelector and text-entry fields (via `useInputStatusIcon`), Stepper Step, ChatToolCalls (complete) | `CheckmarkCircle02Icon` | `CheckmarkCircle01Icon` | **Fill loss**: Astryx's default is solid. `02` contains the `Tick02` geometry, so it pairs with `check`. `01` is Hugeicons' `CheckCircle` alias, with a curved tick. |
| `error` | Same status surfaces as `success`, plus ChatComposer, ChatMessageMetadata ("failed") and ChatToolCalls (error) | `CancelCircleIcon` | `MultiplicationSignCircleIcon` | **Fill loss** (default is solid). Hugeicons' `XCircle` alias. |
| `warning` | Banner, FieldStatus, Selector, MultiSelector, `useInputStatusIcon` fields, TextArea, Stepper Step, ChatComposer | `Alert02Icon` | `AlertDiamondIcon`, `AlertCircleIcon` | **Fill loss** (default is solid). **Alias trap**: Hugeicons maps `AlertTriangle` to `Alert01Icon`, but that one has the dot at the top (an upside-down "!"). `Alert02` is the normal triangle with "!". |
| `info` | InfoTip, Banner, Table row status (docs example) | `InformationCircleIcon` | `InformationSquareIcon`, `InformationDiamondIcon` | **Fill loss** (default is solid). Hugeicons' `Info` alias. |
| `calendar` | DateInput, NativeDateField, TouchDateField, DateRangeInput, DateTimeInput (+ native/touch segments), PowerSearch (date operators) | `Calendar04Icon` | `Calendar03Icon`, `Calendar01Icon` | `04` is a blank calendar (rings, header rule), like Astryx's default and Lucide's `Calendar`. `03` adds a dot grid. `01` (Hugeicons' alias) draws a "1" inside. |
| `clock` | TimeInput, TouchTimeField, DateTimeInput (+ native segment), PowerSearch (time operator), ChatToolCalls (pending), ChatMessageMetadata (sending) | `Clock01Icon` | `Clock02Icon` | `Clock02` has a refresh-style arrow on the rim. |
| `externalLink` | Link (external) | `LinkSquare02Icon` | `ArrowUpRight01Icon`, `SquareArrowUpRightIcon` | A box with an arrow leaving it, like Lucide's `ExternalLink`. Hugeicons' `ExternalLink` alias is the bare arrow `ArrowUpRight01Icon`, which reads less clearly next to link text. |
| `menu` | MobileNavToggle, PowerSearch (enum operators) | `Menu01Icon` | `Menu02Icon` | Three equal lines. `02` is staggered. |
| `moreHorizontal` | MoreMenu | `MoreHorizontalIcon` | `MoreHorizontalCircle01Icon` | Dots are round-capped zero-length strokes, so they render as 1.5-unit dots. Astryx's default draws 3-unit-diameter filled dots, so these look lighter. |
| `search` | TextInput, BaseTypeahead, PanelSearchInput, CommandPaletteInput, TokenizerBottomSheet, ChatComposer, PowerSearch (+ bottom sheet) | `Search01Icon` | `Search02Icon` | |
| `upload` | FileInput | `Upload01Icon` | `Upload04Icon`, `CloudUploadIcon` | Arrow into an open tray. |
| `arrowUp` | ChatSendButton (send), Table sortable (sort ascending) | `ArrowUp02Icon` | `ArrowUp01Icon` | **Alias trap**: Hugeicons maps `ArrowUp` to `ArrowUp01Icon`, a chevron. A sort or send arrow needs the shafted `ArrowUp02`. |
| `arrowDown` | Table sortable (sort descending) | `ArrowDown02Icon` | `ArrowDown01Icon` | Same trap as `arrowUp`. |
| `arrowsUpDown` | Table sortable (unsorted indicator) | `ArrowUpDownIcon` | `ArrowDataTransferVerticalIcon` | Two offset arrows, up and down, like Lucide's `ArrowUpDown` and Astryx's default. |
| `funnel` | Table filtering, PowerSearchBottomSheet | `FilterIcon` | `FilterHorizontalIcon` | `FilterHorizontal` is a sliders icon, so use it only if the funnel reads poorly. |
| `eyeSlash` | *None in core 0.7.11* (registry and docs only) | `ViewOffSlashIcon` | `ViewOffIcon` | **Alias trap**: Hugeicons' `EyeOff` alias is `ViewOffIcon`, a closed eye with lashes and no slash. Choose `ViewOffSlash` for "eye with slash". |
| `viewColumns` | *None in core 0.7.11* (registry and docs only) | `LayoutThreeColumnIcon` | `LayoutTwoColumnIcon` | `Layout3ColumnIcon` is the same artwork (Hugeicons' `Columns` alias). |
| `copy` | CodeBlock, TimestampHoverCard, `useClipboard` docs | `Copy01Icon` | `Copy02Icon` | |
| `checkDouble` | ChatMessageMetadata (delivered/read). Also the `code-block-copy` slot example in `defineTheme` docs | `TickDouble02Icon` | `TickDouble01Icon` | `02` uses the `Tick02` geometry, so it pairs with `check`. `01` is Hugeicons' `CheckCheck` alias. |
| `wrench` | ChatToolCalls | `Wrench01Icon` | `Wrench02Icon` | |
| `stop` | ChatSendButton (stop generation) | `StopIcon` | `StopCircleIcon` | **Fill loss**: Astryx's default is a solid rounded square. `StopIcon` is the same squircle as an outline. |
| `microphone` | ChatDictationButton | `Mic01Icon` | `Mic02Icon` | Hugeicons' `Mic` alias. |
| `numberInput:stepperDown` *(namespaced)* | NumberInput (stepper) | `ArrowDown01Icon` | — | **Not in `IconName`** and not mapped by `icons.js` today. Add it so NumberInput matches `chevronDown`. A literal typed `IconRegistry` (`Record<IconName, ReactNode>`) would reject the extra key. Widen the JSDoc type the way Astryx's own `defaultIcons` does: `IconRegistry & Partial<Record<NamespacedIconName, ReactNode>>`. Verify with `vp run typecheck`. |

### Flagged or ambiguous

- **Fill loss (needs a design decision):** `success`, `error`, `warning`, `info` and `stop` are solid in Astryx's defaults, and `moreHorizontal` uses filled dots. The free set only offers outlines. If the status icons look too light at `xsm` and `sm`, give the registry entry a function of `{size}` (a supported `IconEntry` form) that raises `strokeWidth` at small sizes. The alternative is to accept the outlines, which is what the "free stroke rounded only" decision implies.
- **Alias traps:** `arrowUp`, `arrowDown`, `warning`, `eyeSlash`, plus `externalLink` and `calendar`, where the alias is weaker. The free package's Lucide-named aliases don't give the best match here.
- **Unused in core:** `eyeSlash` and `viewColumns` aren't used by any 0.7.11 component. They are still required by the `IconRegistry` type.
- **Namespaced name:** `numberInput:stepperDown` (see the table).

## 3. Design file "Icons" page

The Paper file is `01M79NRSRNGBZXVDMD3R5DNH0D`, page `p-2-0`. I read it with read-only tools only (`get_basic_info`, `get_tree_summary`, `get_children`, `get_node_info`, `get_jsx`).

- The artboard is **"HugeIcons"** (1280×8744). Its structure is `Light` › `Icons`, with **4,522** children named `HugeIcon / <kebab-name>`. Each child is a 24×24 frame with one flattened `SVG "Vector"`.
- **The set is free stroke rounded.**
  - **Geometry.** Sampled paths match `@hugeicons/core-free-icons` exactly, after offsetting for the trimmed SVG box. `tick-02` is `M14 0 L3.5 11 L0 7.5` inside a 14×11 box at (5, 6.5), which is the free `Tick02Icon` (`M5 14 L8.5 17.5 L19 6.5`). `cancel-01`, `arrow-left-01-round`, `checkmark-circle-02`, `stop` and `more-horizontal` also match.
  - **Style.** Every sampled path has `strokeWidth 1.5`, `strokeLinecap round` and `strokeLinejoin round`, and none has a fill. That is the Stroke Rounded style.
  - **Names.** Of 4,437 names enumerated in one full pass, 4,373 map directly to a free export: kebab → PascalCase + `Icon`, with a trailing `-round` dropped. Arrow icons carry a `-round` suffix in the file, such as `arrow-down-01-round` → `ArrowDown01Icon`. The other 64 are spelling or naming quirks in the Figma-sourced layer names, such as `1st-brecket`, `healt`, `sillence`, `attchment`, `dial-sqare` and `voice-iD`. None of them suggests a Pro-only style.
  - **Size.** The free package has about 4.5k distinct icons. 6,791 `*Icon` identifiers include aliases.
- **Every pick in the table is on the page.**
- **Two differences from code:**
  - Paper strokes use `vector-effect: non-scaling-stroke`, so they stay 1.5 px at any size. In code, the stroke scales with `size`: 1.5/24 of the box, or about 1 px at 16 px.
  - Strokes are hard-coded `#0A0A0A`. Code uses `currentColor`.

## 4. Rendering with `@hugeicons/react` from a plain-JS registry

Free icons are data, not components. Each export is an `IconSvgElement`: a readonly array of `[tag, attrs]` tuples, for example `[["path", {d, stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", …}]]`.

`HugeiconsIcon` from `@hugeicons/react` 1.1.10 (`dist/esm/HugeiconsIcon.js`) is a `forwardRef` component:

- It renders `<svg xmlns viewBox="0 0 24 24" fill="none" width={size} height={size} color={color}>`. The default `size` is 24 and the default `color` is `currentColor`.
- It spreads every remaining prop (`...rest`) onto the `<svg>`, so `aria-hidden`, `className`, `style` and so on pass through.
- It maps each tuple to `createElement(tag, attrs)`. It doesn't use JSX internally.
- `size` is assigned directly to `width` and `height`, so the string `"1em"` works.
- `strokeWidth`, when given, overrides every child's stroke width. With no value, each path keeps its own 1.5.
- **Don't** combine `absoluteStrokeWidth` with `size: "1em"`. It computes `strokeWidth * 24 / Number(size)`, which is `NaN` for `"1em"`.

So the `icons.js` pattern carries over almost unchanged:

```js
import { createElement } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon, ArrowDown01Icon /* … */ } from "@hugeicons/core-free-icons";

/** @param {import("@hugeicons/react").IconSvgElement} icon */
const icon = (icon) => createElement(HugeiconsIcon, { icon, size: "1em", "aria-hidden": true });

/** @type {import("@astryxdesign/core/Icon").IconRegistry & Partial<Record<import("@astryxdesign/core/Icon").NamespacedIconName, import("react").ReactNode>>} */
export const hvnIconRegistry = {
  close: icon(Cancel01Icon),
  chevronDown: icon(ArrowDown01Icon),
  // …
  "numberInput:stepperDown": icon(ArrowDown01Icon),
};
```

This fits Astryx's contract:

- Astryx's `Icon` wraps registry artwork in a span whose `font-size` is the glyph size (`registrySizeStyles` in `src/Icon/Icon.tsx`). That way `1em` fills it.
- `currentColor` inherits the `Icon` colour.
- `aria-hidden` matches the default icons, which are decorative, and `Icon` handles labels on its wrapper.

**Optional size-aware entry.** Astryx accepts `IconEntry` functions, `({size, variant}) => ReactNode`, which must be pure and synchronous. For example:

```js
const icon = (icon) => ({ size }) =>
  createElement(HugeiconsIcon, { icon, size: "1em", "aria-hidden": true, strokeWidth: size === "xsm" ? 2 : undefined });
```

This is only needed if outline status icons look too thin at small sizes. `IconRegistry` is `Record<IconName, ReactNode>`, and a function isn't a `ReactNode`. A registry that mixes functions in needs `Record<IconName, IconEntry>` as its JSDoc type, and has to go through `defineTheme({icons})`, which accepts `IconEntry`.

**Dependencies.** `@hugeicons/react` peer-depends on `react >=16`. `@hugeicons/core-free-icons` is tree-shakeable through named ESM imports, which keeps the theme bundle to the 30 icons it uses. Both go in `packages/ds` dependencies in place of `lucide-react`.

## Sources

- `@astryxdesign/core@0.7.11`:
  - `src/Icon/globalIconRegistry.tsx` (`IconName`, `IconRegistry`, `NamespacedIconName`, `IconEntry`)
  - `src/Icon/defaultIcons.tsx` (fallback artwork, solid status icons)
  - `src/Icon/Icon.tsx` (`registrySizeStyles`)
  - component sources under `src/**` for usage
- `@astryxdesign/cli/assets/docs/icons.doc.mjs`: usage hints.
- `@hugeicons/core-free-icons@4.4.0` tarball from the npm registry, `dist/types/index.d.ts` and `dist/esm/*`. The README says the free package is Stroke Rounded only.
- `@hugeicons/react@1.1.10` tarball, `dist/esm/HugeiconsIcon.js` and `dist/types/HugeiconsIcon.d.ts`.
- Paper file `01M79NRSRNGBZXVDMD3R5DNH0D`, page "Icons" (`p-2-0`), artboard "HugeIcons", read through the Paper MCP.
- `packages/ds/src/themes/hvn/icons.js`: the current Lucide mapping.
