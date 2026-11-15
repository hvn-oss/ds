---
"@hvn-oss/ds": minor
---

Style the nine Action components in the `hvn` theme: Button, ButtonGroup, ContextMenu, DropdownMenu, Link, MoreMenu, SegmentedControl, ToggleButton and Toolbar. Anything not listed here keeps Astryx's default.

- **Button**: a secondary Button hovers and presses with the same overlay as a ghost, so the two differ only by the outline. Secondary triggers on Selector, MultiSelector and ComplexSelector match it.
- **ButtonGroup**: grouped secondaries share one 1px seam, in both orientations.
- **Menus**: DropdownMenu and ContextMenu panels get 8px padding, so the 8px-cornered rows nest inside the 16px panel. Bottom sheets keep Astryx's inset.
- **Link**: the pressed fill and the focus ring get 4px corners and 2px of space around the text. The text doesn't move.
- **SegmentedControl**: the focus ring stays inside the track.
- **Touch sizing**: on coarse pointers below `lg`, controls grow with the type ramp, from 28/32/36 to 32/36/40px (`--size-element-sm|md|lg`).

**Visible changes**: secondary Buttons and secondary selector triggers no longer add a grey fill on hover. On touch screens below `lg`, every control that uses `--size-element-*` is 4px taller.
