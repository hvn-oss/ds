import { resolveThemeTokens } from "@astryxdesign/core/theme/tokens";
import { themes, defaultThemeSlug } from "../astryx-themes.ts";

// The Foundations pages print values resolved from the theme the site renders with, so the docs
// can't drift from it. Swatches and specimens use the tokens themselves, through CSS variables.

export type Mode = "light" | "dark";

export const MODES: Mode[] = ["light", "dark"];

export const MODE_LABELS: Record<Mode, string> = { light: "Light", dark: "Dark" };

/** The theme the docs site renders with. */
export const docsTheme = themes[defaultThemeSlug];

const resolved: Record<Mode, Record<string, string>> = {
  light: resolveThemeTokens(docsTheme, { mode: "light" }),
  dark: resolveThemeTokens(docsTheme, { mode: "dark" }),
};

/** A token's value in one mode. Throws on an unknown token, so a typo in MDX fails loudly. */
export function tokenValue(token: string, mode: Mode): string {
  const value = resolved[mode][token];
  if (value == null) throw new Error(`The ${docsTheme.name} theme has no token "${token}"`);
  return value;
}

/** Hex colours in upper case, as the Design file shows them; other values as they are. */
export function formatColour(value: string): string {
  return /^#[\da-f]+$/i.test(value) ? value.toUpperCase() : value;
}

const ROOT_FONT_SIZE = 16;

/** `0.875rem` → 14, `64px` → 64. */
export function toPx(value: string): number {
  const match = value.match(/^(-?[\d.]+)(px|rem)?$/);
  if (!match) throw new Error(`Not a px or rem length: ${value}`);
  const number = Number(match[1]);
  return match[2] === "rem" ? number * ROOT_FONT_SIZE : number;
}

/** Rounds to at most two decimals, dropping trailing zeros. */
function round(value: number): string {
  return String(Math.round(value * 100) / 100);
}

export interface TypeStyleValues {
  /** Font size in px. */
  size: string;
  /** Line height in px. Astryx stores it as a ratio of the size, or as a length. */
  leading: string;
  weight: string;
}

/** A type style's desktop size, line height and weight, from its `--text-<style>-*` tokens. */
export function typeStyleValues(style: string): TypeStyleValues {
  const size = toPx(tokenValue(`--text-${style}-size`, "light"));
  const leading = tokenValue(`--text-${style}-leading`, "light");
  const leadingPx = /^[\d.]+$/.test(leading) ? size * Number(leading) : toPx(leading);

  return {
    size: round(size),
    leading: round(leadingPx),
    weight: tokenValue(`--text-${style}-weight`, "light"),
  };
}

/** Lengths in px, as the Design file shows them: `0.5rem` → `8px`. Other values pass through. */
export function formatLength(value: string): string {
  return /^-?[\d.]+rem$/.test(value) ? `${round(toPx(value))}px` : value;
}

/** The comma-separated layers of a value such as a shadow, ignoring commas inside parentheses. */
export function splitLayers(value: string): string[] {
  const layers: string[] = [];
  let depth = 0;
  let start = 0;
  for (let i = 0; i < value.length; i++) {
    if (value[i] === "(") depth++;
    else if (value[i] === ")") depth--;
    else if (value[i] === "," && depth === 0) {
      layers.push(value.slice(start, i).trim());
      start = i + 1;
    }
  }
  layers.push(value.slice(start).trim());
  return layers;
}

/** An icon size's stroke, which scales with the glyph from the stock 1.5 on Hugeicons' 24 grid. */
export function iconStroke(sizePx: number): string {
  return `${((1.5 * sizePx) / 24).toFixed(2)}px`;
}
