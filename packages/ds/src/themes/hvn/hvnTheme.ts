/**
 * HVN Theme
 *
 * Quiet, mostly monochrome and border-led: pure-grey neutrals, flat white
 * surfaces with hairlines, and blue as the one primary colour. Colors reference
 * the palette generated from palette.config.json. Inter for text and headings,
 * JetBrains Mono for code, self-hosted as variable fonts by hvn.fonts.css.
 *
 * Decisions live on the foundations map: https://github.com/hvn-oss/ds/issues/12
 */

import { defineTheme, defineSyntaxTheme, type TokenValue } from "@astryxdesign/core/theme";
import { hvnIconRegistry } from "./icons.js";
import { palette } from "./hvnPalettes.generated";

type Family = Record<"light" | "dark", Record<number, string>>;

const { blue, cyan, green, neutral, orange, pink, purple, red, teal, yellow } = palette;

const withAlpha = (color: string, alpha: string): string => `${color}${alpha}`;

/** A family's light and dark stops as a `[light, dark]` token value. */
const stops = (family: Family, light: number, dark: number): [string, string] => [
  family.light[light],
  family.dark[dark],
];

const black = neutral.light[0];
const white = neutral.light[100];

/**
 * Categorical surfaces pair stop 90 with stop 30 text in light mode, and stop
 * 25 with stop 85 text in dark mode. Gray uses the neutral family.
 */
const CATEGORICAL_FAMILIES = {
  blue,
  cyan,
  gray: neutral,
  green,
  orange,
  pink,
  purple,
  red,
  teal,
  yellow,
};

const categoricalTokens = Object.fromEntries(
  Object.entries(CATEGORICAL_FAMILIES).flatMap(([hue, family]) => [
    [`--color-background-${hue}`, stops(family, 90, 25)],
    [`--color-border-${hue}`, stops(family, 80, 35)],
    [`--color-icon-${hue}`, stops(family, 40, 75)],
    [`--color-text-${hue}`, stops(family, 30, 85)],
  ]),
);

/**
 * Chart colours (https://github.com/hvn-oss/ds/issues/29). Categorical series
 * share one stop per mode, so they differ only by hue. Brown and indigo borrow
 * yellow and blue at another lightness.
 */
const DATA_CATEGORICAL_FAMILIES = { blue, orange, purple, green, pink, cyan, red, teal };

/**
 * Sequential ramps flip in dark mode, so step 1 (the lowest value) sits close
 * to the background in both modes.
 */
const DATA_RAMP_FAMILIES = {
  blue,
  shamrock: green,
  orange,
  pink,
  purple,
  red,
  teal,
  yellow,
  gray: neutral,
};
const DATA_RAMP_LIGHT = [90, 75, 60, 45, 30];
const DATA_RAMP_DARK = [20, 35, 50, 65, 80];

const dataTokens = {
  ...Object.fromEntries(
    Object.entries(DATA_CATEGORICAL_FAMILIES).map(([hue, family]) => [
      `--color-data-categorical-${hue}`,
      stops(family, 55, 60),
    ]),
  ),
  "--color-data-categorical-brown": stops(yellow, 40, 50),
  "--color-data-categorical-indigo": stops(blue, 30, 80),
  "--color-data-neutral": stops(neutral, 60, 50),
  ...Object.fromEntries(
    Object.entries(DATA_RAMP_FAMILIES).flatMap(([ramp, family]) =>
      DATA_RAMP_LIGHT.map((light, i) => [
        `--color-data-${ramp}-${i + 1}`,
        stops(family, light, DATA_RAMP_DARK[i]),
      ]),
    ),
  ),
};

/**
 * Code colours (https://github.com/hvn-oss/ds/issues/29). Each role keeps one
 * hue in both modes, at the same 40 / 75 stops as status text. Plain roles use
 * the primary and secondary text colours.
 */
const hvnSyntax = defineSyntaxTheme({
  name: "astryx-hvn",
  tokens: {
    keyword: stops(purple, 40, 75),
    type: stops(purple, 40, 75),
    string: stops(teal, 40, 75),
    property: stops(teal, 40, 75),
    number: stops(orange, 40, 75),
    constant: stops(orange, 40, 75),
    function: stops(blue, 40, 75),
    tag: stops(red, 40, 75),
    attribute: stops(yellow, 40, 75),
    variable: stops(neutral, 10, 95),
    operator: stops(neutral, 10, 95),
    punctuation: stops(neutral, 10, 95),
    comment: stops(neutral, 40, 70),
    background: stops(neutral, 95, 10),
    // Translucent diff rows reuse the success-muted and error-muted colours;
    // their markers reuse text-success and text-error. Header rows sit on the
    // muted background, as in the Design file.
    "diff-header": stops(neutral, 95, 10),
    added: [withAlpha(green.light[90], "40"), withAlpha(green.dark[25], "33")],
    removed: [withAlpha(red.light[90], "40"), withAlpha(red.dark[25], "33")],
    "added-marker": stops(green, 40, 75),
    "removed-marker": stops(red, 40, 75),
  },
});

/**
 * The secondary Button treatment: a 1px outline that matches the inputs beside
 * it. Selector, MultiSelector, and ComplexSelector reuse it for their
 * `secondary` trigger so every secondary control in this theme matches
 * (AST-079 FR2).
 */
const SECONDARY_BUTTON = {
  backgroundColor: "transparent",
  borderWidth: "var(--border-width)",
  borderStyle: "solid",
  borderColor: "var(--color-border-emphasized)",
  ":hover": {
    backgroundColor: "var(--color-neutral)",
  },
} as const;

/**
 * The secondary Button treatment on Selector and MultiSelector triggers
 * (AST-079 FR2). Inside an InputGroup a trigger keeps the neutral fill and the
 * group's edges instead (FR6). The hover stays off disabled and read-only
 * triggers, which carry `data-disabled` and `data-readonly`.
 */
const { ":hover": SECONDARY_HOVER, ...SECONDARY_SURFACE } = SECONDARY_BUTTON;

const SECONDARY_SELECTOR = {
  ":not(.astryx-input-group *)": SECONDARY_SURFACE,
  ":hover:not([data-disabled], [data-readonly], .astryx-input-group *)": SECONDARY_HOVER,
} as const;

/**
 * The secondary Button treatment on ComplexSelector triggers (AST-079 FR2), with
 * the hover kept off a disabled trigger, whose inner button is disabled
 * (natively or, keeping its tab stop, with `aria-disabled`).
 */
const SECONDARY_COMPLEX_SELECTOR = {
  ...SECONDARY_SURFACE,
  ':hover:not(:has(> :is(:disabled, [aria-disabled="true"])))': SECONDARY_HOVER,
} as const;

/** Display sizes and line heights, pinned off the scale. */
const displayTokens = (
  sizes: [number, number][],
): Partial<Record<`--text-display-${1 | 2 | 3}-${"size" | "leading"}`, TokenValue>> =>
  Object.fromEntries(
    sizes.flatMap(([size, leading], i) => [
      [`--text-display-${i + 1}-size`, `${size}px`],
      [`--text-display-${i + 1}-leading`, `${leading}px`],
    ]),
  );

/** Display tracking. Astryx has no tracking token, so it is set per type. */
const DISPLAY_TRACKING = {
  "type:display-1": { letterSpacing: "-0.03em" },
  "type:display-2": { letterSpacing: "-0.03em" },
  "type:display-3": { letterSpacing: "-0.03em" },
} as const;

const SANS_FALLBACKS =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';

export const hvnTheme = defineTheme({
  name: "hvn",

  // Base 14 at ratio 1.2, with display pinned to 64 / 48 / 36 below.
  // Headings are medium; display stays regular.
  typography: {
    scale: { base: 14, ratio: 1.2 },
    body: {
      family: "Inter Variable",
      fallbacks: SANS_FALLBACKS,
    },
    heading: {
      family: "Inter Variable",
      fallbacks: SANS_FALLBACKS,
      weight: "medium",
    },
    code: {
      family: "JetBrains Mono Variable",
      fallbacks: '"SF Mono", Monaco, Consolas, monospace',
    },
  },

  // Touch and narrow (https://github.com/hvn-oss/ds/issues/30). On coarse
  // pointers below `lg` the base rises to the 16px floor at the same ratio, so
  // the whole ramp grows ×1.14. Pinned display sizes ignore the scale and step
  // down by width only, whatever the pointer.
  adaptations: {
    rules: [
      {
        when: { pointer: "coarse", width: { below: "lg" } },
        value: { typography: { scale: { base: 16, ratio: 1.2 } } },
      },
      {
        when: { width: { from: "md", below: "lg" } },
        value: {
          tokens: displayTokens([
            [48, 56],
            [36, 44],
            [30, 38],
          ]),
        },
      },
      {
        when: { width: { below: "md" } },
        value: {
          tokens: displayTokens([
            [36, 44],
            [32, 40],
            [30, 38],
          ]),
        },
      },
    ],
  },

  syntax: hvnSyntax,

  tokens: {
    // Surfaces are flat: a white page and panels, with hierarchy from hairlines.
    "--color-background-body": stops(neutral, 100, 5),
    "--color-background-surface": stops(neutral, 100, 5),
    "--color-background-card": stops(neutral, 100, 10),
    "--color-background-popover": stops(neutral, 100, 15),
    "--color-background-muted": stops(neutral, 95, 10),
    "--color-background-inverted": stops(neutral, 10, 95),
    // The error Toast surface keeps white text in both modes.
    "--color-background-error-inverted": stops(red, 40, 45),

    // Blue is the primary colour; blue-600 is pinned at stop 45.
    "--color-accent": stops(blue, 45, 60),
    "--color-accent-muted": stops(blue, 90, 25),
    "--color-on-accent": stops(neutral, 100, 5),

    // Black and white tints, as in Astryx's Neutral theme.
    "--color-neutral": [withAlpha(black, "0f"), withAlpha(white, "1a")],
    "--color-overlay": [withAlpha(black, "80"), withAlpha(black, "cc")],
    "--color-overlay-hover": [withAlpha(black, "0d"), withAlpha(white, "0d")],
    "--color-overlay-pressed": [withAlpha(black, "1a"), withAlpha(white, "1a")],
    "--color-on-dark": white,
    "--color-on-light": neutral.light[5],

    // Text
    "--color-text-primary": stops(neutral, 10, 95),
    "--color-text-secondary": stops(neutral, 40, 70),
    "--color-text-disabled": stops(neutral, 70, 35),
    "--color-text-accent": stops(blue, 45, 70),

    // Icon
    "--color-icon-primary": stops(neutral, 10, 95),
    "--color-icon-secondary": stops(neutral, 45, 65),
    "--color-icon-disabled": stops(neutral, 70, 35),
    "--color-icon-accent": stops(blue, 45, 70),

    // Status. Status borders and icons follow text-<status> (Astryx default).
    "--color-info": stops(blue, 45, 60),
    "--color-info-muted": stops(blue, 90, 25),
    "--color-on-info": stops(neutral, 100, 5),
    "--color-on-info-muted": stops(blue, 30, 85),
    "--color-text-info": stops(blue, 40, 75),

    "--color-success": stops(green, 40, 65),
    "--color-success-muted": stops(green, 90, 25),
    "--color-on-success": stops(neutral, 100, 5),
    "--color-on-success-muted": stops(green, 30, 85),
    "--color-text-success": stops(green, 40, 75),

    "--color-warning": stops(yellow, 75, 75),
    "--color-warning-muted": stops(yellow, 90, 25),
    "--color-on-warning": stops(neutral, 5, 5),
    "--color-on-warning-muted": stops(yellow, 30, 85),
    "--color-text-warning": stops(yellow, 40, 75),

    "--color-error": stops(red, 45, 60),
    "--color-error-muted": stops(red, 90, 25),
    "--color-on-error": stops(neutral, 100, 5),
    "--color-on-error-muted": stops(red, 30, 85),
    "--color-text-error": stops(red, 40, 75),

    // Border. The emphasized outline is deliberately quiet, below 3:1, so
    // controls that rely on it need another cue (a label, a fill or focus).
    "--color-border": stops(neutral, 90, 20),
    "--color-border-emphasized": stops(neutral, 80, 35),

    // Effects
    "--color-skeleton": stops(neutral, 95, 20),
    "--color-track": stops(neutral, 90, 25),
    "--color-shadow": [withAlpha(black, "1a"), withAlpha(black, "4d")],
    "--color-tint-hover": [black, white],

    ...categoricalTokens,
    ...dataTokens,

    // Typography: display sizes pinned off the scale.
    ...displayTokens([
      [64, 72],
      [48, 56],
      [36, 44],
    ]),

    // Radius: containers are rounder than controls.
    "--radius-none": "0px",
    "--radius-inner": "0.25rem",
    "--radius-element": "0.5rem",
    "--radius-container": "1rem",
    "--radius-page": "1.5rem",
    "--radius-chat": "1.5rem",
    "--radius-full": "9999px",

    // Shadows: each level is a 1px ring plus one soft shadow, so floating
    // layers keep an edge in dark mode, where a dialog matches the page.
    "--shadow-low":
      "0 0 0 1px light-dark(rgba(0, 0, 0, 0.08), rgba(255, 255, 255, 0.08)), " +
      "0 2px 8px light-dark(rgba(0, 0, 0, 0.06), rgba(0, 0, 0, 0.4))",
    "--shadow-med":
      "0 0 0 1px light-dark(rgba(0, 0, 0, 0.08), rgba(255, 255, 255, 0.08)), " +
      "0 4px 16px light-dark(rgba(0, 0, 0, 0.08), rgba(0, 0, 0, 0.5))",
    "--shadow-high":
      "0 0 0 1px light-dark(rgba(0, 0, 0, 0.08), rgba(255, 255, 255, 0.1)), " +
      "0 16px 40px light-dark(rgba(0, 0, 0, 0.12), rgba(0, 0, 0, 0.6))",
    "--shadow-inset-hover":
      "inset 0 0 0 2px color-mix(in srgb, var(--color-border-emphasized) 30%, transparent)",
    "--shadow-inset-selected":
      "inset 0 0 0 2px color-mix(in srgb, var(--color-accent) 50%, transparent)",
    "--shadow-inset-success":
      "inset 0 0 0 2px color-mix(in srgb, var(--color-border-success) 30%, transparent)",
    "--shadow-inset-warning":
      "inset 0 0 0 2px color-mix(in srgb, var(--color-border-warning) 30%, transparent)",
    "--shadow-inset-error":
      "inset 0 0 0 2px color-mix(in srgb, var(--color-border-error) 30%, transparent)",
  },

  components: {
    text: DISPLAY_TRACKING,
    heading: DISPLAY_TRACKING,

    button: {
      "variant:secondary": SECONDARY_BUTTON,
      "variant:destructive": {
        backgroundColor: "var(--color-background-red)",
        color: "var(--color-text-red)",
      },
    },

    // Badges, banners, and field status messages share the categorical
    // surfaces and foregrounds so each semantic state has one visual source.
    badge: {
      "variant:info": {
        backgroundColor: "var(--color-background-blue)",
        color: "var(--color-text-blue)",
      },
      "variant:neutral": {
        backgroundColor: "var(--color-background-gray)",
        color: "var(--color-text-gray)",
      },
      "variant:success": {
        backgroundColor: "var(--color-background-green)",
        color: "var(--color-text-green)",
      },
      "variant:warning": {
        backgroundColor: "var(--color-background-yellow)",
        color: "var(--color-text-yellow)",
      },
      "variant:error": {
        backgroundColor: "var(--color-background-red)",
        color: "var(--color-text-red)",
      },
    },

    // Banner status surfaces and content use the matching categorical pair.
    banner: {
      "status:info": {
        "--color-info-muted": "var(--color-background-blue)",
        "--color-on-info-muted": "var(--color-text-blue)",
      },
      "status:success": {
        "--color-success-muted": "var(--color-background-green)",
        "--color-on-success-muted": "var(--color-text-green)",
      },
      "status:warning": {
        "--color-warning-muted": "var(--color-background-yellow)",
        "--color-on-warning-muted": "var(--color-text-yellow)",
      },
      "status:error": {
        "--color-error-muted": "var(--color-background-red)",
        "--color-on-error-muted": "var(--color-text-red)",
      },
    },

    // The default muted track is too close to the white page.
    "progress-bar-track": {
      base: {
        backgroundColor: "var(--color-track)",
      },
    },

    // Match the Switch off-state track to the ProgressBar track.
    switch: {
      base: {
        "--color-background-gray": "var(--color-track)",
      },
    },

    // FieldStatus surfaces match the corresponding badge and banner family.
    "field-status": {
      "type:success": {
        backgroundColor: "var(--color-background-green)",
        color: "var(--color-text-green)",
      },
      "type:warning": {
        backgroundColor: "var(--color-background-yellow)",
        color: "var(--color-text-yellow)",
      },
      "type:error": {
        backgroundColor: "var(--color-background-red)",
        color: "var(--color-text-red)",
      },
    },

    selector: { "variant:secondary": SECONDARY_SELECTOR },
    "multi-selector": { "variant:secondary": SECONDARY_SELECTOR },
    "complex-selector": { "variant:secondary": SECONDARY_COMPLEX_SELECTOR },

    card: {
      base: {
        padding: "var(--spacing-3)",
      },
    },

    section: {
      base: {
        padding: "var(--spacing-3)",
      },
    },
  },

  icons: hvnIconRegistry,
});
