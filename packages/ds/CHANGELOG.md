# @hvn-oss/ds

## 0.3.0

### Minor Changes

- [#49](https://github.com/hvn-oss/ds/pull/49) [`3143d5d`](https://github.com/hvn-oss/ds/commit/3143d5d6ec3b64e8eaa63b65406691ab09f4a47a) Thanks [@danielfakunle](https://github.com/danielfakunle)! - Style the nine Action components in the `hvn` theme: Button, ButtonGroup, ContextMenu, DropdownMenu, Link, MoreMenu, SegmentedControl, ToggleButton and Toolbar. Anything not listed here keeps Astryx's default.
  
  - **Button**: a secondary Button hovers and presses with the same overlay as a ghost, so the two differ only by the outline. Secondary triggers on Selector, MultiSelector and ComplexSelector match it.
  - **ButtonGroup**: grouped secondaries share one 1px seam, in both orientations.
  - **Menus**: DropdownMenu and ContextMenu panels get 8px padding, so the 8px-cornered rows nest inside the 16px panel. Bottom sheets keep Astryx's inset.
  - **Link**: the pressed fill and the focus ring get 4px corners and 2px of space around the text. The text doesn't move.
  - **SegmentedControl**: the focus ring stays inside the track.
  - **Touch sizing**: on coarse pointers below `lg`, controls grow with the type ramp, from 28/32/36 to 32/36/40px (`--size-element-sm|md|lg`).
  
  **Visible changes**: secondary Buttons and secondary selector triggers no longer add a grey fill on hover. On touch screens below `lg`, every control that uses `--size-element-*` is 4px taller.

## 0.2.0

### Minor Changes

- [#31](https://github.com/hvn-oss/ds/pull/31) [`73b8c7c`](https://github.com/hvn-oss/ds/commit/73b8c7c9f3902455a52b4b21f6ecc4f8bfc080ad) Thanks [@danielfakunle](https://github.com/danielfakunle)! - Rebuild the `hvn` theme on the new foundations, and switch its icons to Hugeicons.
  
  - **Colour**: Astryx's palette at vibrancy 50 with a pure-grey neutral, and blue-600 as the primary colour. Surfaces are flat white with hairlines.
  - **Typography**: Inter for text and headings, and JetBrains Mono for code. The base size is 14 at ratio 1.2. On coarse pointers below `lg`, it rises to 16, and display sizes step down on narrow screens.
  - **Shape and elevation**: radii are 4/8/16/24, and floating layers get a ring-and-shadow scale.
  - **Icons**: all 30 semantic icons map to free Hugeicons (`@hugeicons/core-free-icons`).
  
  **Breaking**: every visual value changes. Figtree and Montserrat are replaced by Inter. `lucide-react` is no longer a dependency, so install it yourself if you import it. `src/themes/hvn/hvnPaletteRefs.generated.ts` no longer ships.

## 0.1.1

### Patch Changes

- [#2](https://github.com/hvn-oss/ds/pull/2) [`6b64f1c`](https://github.com/hvn-oss/ds/commit/6b64f1c82e1b80d36d46bd5c5ef644587157d693) Thanks [@danielfakunle](https://github.com/danielfakunle)! - Publish from GitHub Actions with npm trusted publishing

## 0.1.0

### Minor Changes

- Initial release
