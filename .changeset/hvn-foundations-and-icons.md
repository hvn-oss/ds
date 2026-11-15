---
"@hvn-oss/ds": minor
---

Rebuild the `hvn` theme on the new foundations, and switch its icons to Hugeicons.

- **Colour**: Astryx's palette at vibrancy 50 with a pure-grey neutral, and blue-600 as the primary colour. Surfaces are flat white with hairlines.
- **Typography**: Inter for text and headings, and JetBrains Mono for code. The base size is 14 at ratio 1.2. On coarse pointers below `lg`, it rises to 16, and display sizes step down on narrow screens.
- **Shape and elevation**: radii are 4/8/16/24, and floating layers get a ring-and-shadow scale.
- **Icons**: all 30 semantic icons map to free Hugeicons (`@hugeicons/core-free-icons`).

**Breaking**: every visual value changes. Figtree and Montserrat are replaced by Inter. `lucide-react` is no longer a dependency, so install it yourself if you import it. `src/themes/hvn/hvnPaletteRefs.generated.ts` no longer ships.
