// PROTOTYPE — throwaway. Colour foundation candidates for https://github.com/hvn-oss/ds/issues/19
// Generates palette variants (vibrancy × blue anchor), maps semantic tokens to stops,
// and checks contrast for every text/surface pair. Run: vpx ./generate.ts
import { generateTonalPalette } from "@astryxdesign/cli/api";
import { writeFileSync } from "node:fs";
import { colors as tw } from "./tailwind.json.ts";

type Mode = "light" | "dark";
const twHex = (fam: string, scale: number) =>
  (tw as any)[fam].find((s: any) => s.scale === scale).hex as string;

// Astryx family id -> Tailwind family. Seeds are each family's Tailwind 500.
const FAMILIES = ["red", "orange", "yellow", "green", "teal", "cyan", "blue", "purple", "pink"];

export const VIBRANCY = [35, 50, 70];
export const ANCHORS = [
  { id: "600@45", label: "blue-600 at stop 45", color: twHex("blue", 600), stop: 45 },
  { id: "600@50", label: "blue-600 at stop 50", color: twHex("blue", 600), stop: 50 },
  { id: "500@55", label: "blue-500 at stop 55", color: twHex("blue", 500), stop: 55 },
];

export function palette(vibrancy: number, anchor: (typeof ANCHORS)[number]) {
  return generateTonalPalette({
    vibrancy,
    neutralProfile: "neutral-v1",
    families: [
      { id: "neutral", seed: twHex("neutral", 500), kind: "neutral" },
      ...FAMILIES.map((id) =>
        id === "blue"
          ? {
              id,
              seed: anchor.color,
              anchors: (["light", "dark"] as Mode[]).map((mode) => ({
                mode,
                stop: anchor.stop,
                color: anchor.color,
                policy: "exact",
              })),
            }
          : { id, seed: twHex(id, 500) },
      ),
    ],
  } as any).palette as Record<string, Record<Mode, Record<string, string>>>;
}

// ---- contrast -------------------------------------------------------------
const lin = (c: number) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const rgb = (hex: string) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
// Composite an 8-digit hex over an opaque backdrop.
const flatten = (hex: string, over: string) => {
  if (hex.length === 7) return hex;
  const a = parseInt(hex.slice(7, 9), 16) / 255;
  const [f, b] = [rgb(hex.slice(0, 7)), rgb(over)];
  return (
    "#" +
    f
      .map((c, i) =>
        Math.round((c * a + b[i] * (1 - a)) * 255)
          .toString(16)
          .padStart(2, "0"),
      )
      .join("")
  );
};
const lum = (hex: string) => {
  const [r, g, b] = rgb(hex).map(lin);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
export const contrast = (fg: string, bg: string) => {
  const f = lum(flatten(fg, bg)),
    b = lum(bg);
  return (Math.max(f, b) + 0.05) / (Math.min(f, b) + 0.05);
};

// ---- semantic mapping -----------------------------------------------------
// [family, light stop, dark stop] or literal values. `A` is the blue anchor stop.
type Ref = [string, number, number] | { light: string; dark: string };

export const SURFACES = {
  // Tone-led: Astryx default, grey page with white panels.
  tone: {
    "--color-background-body": ["neutral", 95, 5],
    "--color-background-surface": ["neutral", 100, 10],
    "--color-background-card": ["neutral", 100, 10],
    "--color-background-popover": ["neutral", 100, 15],
    "--color-background-muted": ["neutral", 95, 15],
  },
  // Flat: white page and panels, hierarchy from hairlines only (Attio / ElevenLabs).
  flat: {
    "--color-background-body": ["neutral", 100, 5],
    "--color-background-surface": ["neutral", 100, 5],
    "--color-background-card": ["neutral", 100, 10],
    "--color-background-popover": ["neutral", 100, 15],
    "--color-background-muted": ["neutral", 95, 10],
  },
} satisfies Record<string, Record<string, Ref>>;

export function mapping(A: number): Record<string, Ref> {
  return {
    "--color-accent": ["blue", A, 60],
    "--color-accent-muted": ["blue", 90, 25],
    "--color-text-primary": ["neutral", 10, 95],
    "--color-text-secondary": ["neutral", 40, 70],
    "--color-text-disabled": ["neutral", 70, 35],
    "--color-text-accent": ["blue", A, 70],
    "--color-on-accent": ["neutral", 100, 5],
    "--color-on-dark": ["neutral", 100, 100],
    "--color-on-light": ["neutral", 5, 5],
    "--color-icon-primary": ["neutral", 10, 95],
    "--color-icon-secondary": ["neutral", 45, 65],
    "--color-icon-disabled": ["neutral", 70, 35],
    "--color-icon-accent": ["blue", A, 70],
    "--color-background-inverted": ["neutral", 10, 95],
    "--color-border": ["neutral", 90, 20],
    "--color-border-emphasized": ["neutral", 80, 35],
    "--color-skeleton": ["neutral", 95, 20],
    "--color-track": ["neutral", 90, 25],
    // Status
    "--color-info": ["blue", A, 60],
    "--color-on-info": ["neutral", 100, 5],
    "--color-info-muted": ["blue", 90, 25],
    "--color-on-info-muted": ["blue", 30, 85],
    "--color-text-info": ["blue", 40, 75],
    "--color-success": ["green", 40, 65],
    "--color-on-success": ["neutral", 100, 5],
    "--color-success-muted": ["green", 90, 25],
    "--color-on-success-muted": ["green", 30, 85],
    "--color-text-success": ["green", 40, 75],
    "--color-error": ["red", 45, 60],
    "--color-on-error": ["neutral", 100, 5],
    "--color-error-muted": ["red", 90, 25],
    "--color-on-error-muted": ["red", 30, 85],
    "--color-text-error": ["red", 40, 75],
    "--color-warning": ["yellow", 75, 75],
    "--color-on-warning": ["neutral", 5, 5],
    "--color-warning-muted": ["yellow", 90, 25],
    "--color-on-warning-muted": ["yellow", 30, 85],
    "--color-text-warning": ["yellow", 40, 75],
    // Categorical (gray uses neutral)
    ...Object.fromEntries(
      [...FAMILIES, "gray"].flatMap((h) => {
        const f = h === "gray" ? "neutral" : h;
        return [
          [`--color-background-${h}`, [f, 90, 25]],
          [`--color-border-${h}`, [f, 80, 35]],
          [`--color-icon-${h}`, [f, 40, 75]],
          [`--color-text-${h}`, [f, 30, 85]],
        ];
      }),
    ),
  };
}

// Pairs to check: [fg, bg, minimum]. 4.5 = text, 3 = non-text / large.
export function pairs(): [string, string, number][] {
  const out: [string, string, number][] = [];
  const surf = ["body", "surface", "card", "popover", "muted"].map(
    (s) => `--color-background-${s}`,
  );
  for (const t of ["primary", "secondary", "accent", "info", "success", "error", "warning"])
    for (const s of surf) out.push([`--color-text-${t}`, s, 4.5]);
  for (const s of surf) {
    out.push(["--color-icon-secondary", s, 3]);
    out.push(["--color-border-emphasized", s, 3]);
    out.push(["--color-accent", s, 3]);
  }
  for (const s of ["accent", "info", "success", "error", "warning"])
    out.push([`--color-on-${s}`, `--color-${s}`, 4.5]);
  for (const s of ["info", "success", "error", "warning"])
    out.push([`--color-on-${s}-muted`, `--color-${s}-muted`, 4.5]);
  for (const h of [...FAMILIES, "gray"]) {
    out.push([`--color-text-${h}`, `--color-background-${h}`, 4.5]);
    out.push([`--color-icon-${h}`, `--color-background-${h}`, 3]);
  }
  // on-dark is the inverse text in light mode, on-light in dark mode.
  out.push(["--color-inverse-text", "--color-background-inverted", 4.5]);
  return out;
}

const resolve = (p: ReturnType<typeof palette>, ref: Ref, mode: Mode) =>
  Array.isArray(ref) ? p[ref[0]][mode][String(mode === "light" ? ref[1] : ref[2])] : ref[mode];

// ---- run ------------------------------------------------------------------
const out: any = { palettes: {}, mappings: {} };
for (const v of VIBRANCY) for (const a of ANCHORS) out.palettes[`v${v}/${a.id}`] = palette(v, a);

const EMPHASIZED: Record<string, Ref> = {
  quiet: ["neutral", 80, 35],
  accessible: ["neutral", 55, 50],
};
for (const v of VIBRANCY)
  for (const a of ANCHORS)
    for (const [sid, surfaces] of Object.entries(SURFACES))
      for (const [eid, emph] of Object.entries(EMPHASIZED)) {
        const p = out.palettes[`v${v}/${a.id}`];
        const map = {
          ...surfaces,
          ...mapping(a.stop),
          "--color-border-emphasized": emph,
          "--color-inverse-text": { light: "#ffffff", dark: p.neutral.dark["5"] },
        } as Record<string, Ref>;
        const tokens: Record<string, any> = {};
        for (const [k, ref] of Object.entries(map))
          tokens[k] = { ref, light: resolve(p, ref, "light"), dark: resolve(p, ref, "dark") };
        const checks = pairs().map(([fg, bg, min]) => {
          const r = (m: Mode) => +contrast(tokens[fg][m], tokens[bg][m]).toFixed(2);
          return { fg, bg, min, light: r("light"), dark: r("dark") };
        });
        out.mappings[`v${v}/${a.id}/${sid}/${eid}`] = { tokens, checks };
      }

writeFileSync(new URL("./candidates.json", import.meta.url), JSON.stringify(out, null, 1));
for (const [id, m] of Object.entries<any>(out.mappings)) {
  const fails = m.checks.filter((c: any) => c.light < c.min || c.dark < c.min);
  console.log(`\n${id}: ${m.checks.length - fails.length}/${m.checks.length} pass`);
  if (!id.startsWith("v50/600@45")) continue;
  for (const f of fails)
    console.log(`  ✗ ${f.fg} on ${f.bg} (min ${f.min}): light ${f.light} dark ${f.dark}`);
}
