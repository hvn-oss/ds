import { globSync } from "node:fs";
import { defineConfig } from "vite-plus";

// Sources live in src/, build outputs in dist/ (gitignored).
//   src/themes/<slug>/icons.js        -> dist/themes/<slug>/icons.js   (vp pack)
//   src/themes/<slug>/<slug>.fonts.css -> dist/themes/<slug>/{<slug>.fonts.css,fonts/}  (scripts/build-fonts.ts)
//   src/themes/<slug>/<slug>Theme.ts  -> dist/themes/<slug>/<slug>.{js,css,d.ts}  (astryx theme build)
const iconEntries = Object.fromEntries(
  globSync("src/themes/*/icons.js").map((file) => [
    file.replace(/^src\//, "").replace(/\.js$/, ""),
    file,
  ]),
);

// Theme slugs to build. Add each new theme here.
const themes = ["hvn"];

const buildTheme = (slug: string) =>
  `astryx theme build src/themes/${slug}/${slug}Theme.ts --out dist/themes/${slug}/${slug}.css`;

// One watcher per theme: `theme build --out` takes a single theme.
const themeWatchTasks = Object.fromEntries(
  themes.map((slug) => [
    `dev:theme:${slug}`,
    { command: `${buildTheme(slug)} --watch`, cache: false },
  ]),
);

export default defineConfig({
  pack: {
    entry: iconEntries,
    outDir: "dist",
    // dist/ also holds `astryx theme build` outputs; don't wipe them.
    clean: false,
    format: "esm",
    platform: "neutral",
    outExtensions: () => ({ js: ".js" }),
    deps: {
      neverBundle: [/^react(\/|$)/, /^lucide-react/, /^@astryxdesign\//],
    },
    dts: false,
    report: false,
  },
  run: {
    tasks: {
      // dist/ is gitignored; apps depending on this package run `build` first.
      // Astryx requires `integration check --strict` in every build.
      build: {
        command: "vp run build:themes",
        dependsOn: ["typecheck"],
      },
      "build:icons": {
        command: "vp pack",
      },
      "build:themes": {
        command: themes.map(buildTheme),
        dependsOn: ["build:icons", "build:fonts"],
      },
      "build:fonts": {
        command: "vpx ./scripts/build-fonts.ts",
      },
      // Watch src/ and rebuild dist/. The watchers are dependencies of `dev`, so they all start
      // together and keep running; `dev`'s own command only runs under `vp run --parallel`.
      dev: {
        command: `node -e "console.log('@hvn-oss/ds: watching src/ -> dist/')"`,
        cache: false,
        dependsOn: ["dev:icons", ...Object.keys(themeWatchTasks)],
      },
      "dev:icons": {
        command: "vp pack --watch",
        cache: false,
      },
      ...themeWatchTasks,
      typecheck: {
        command: "tsc --noEmit && astryx integration check --strict",
      },
      // Packs and installs the package in a temp app; needs dist/ built.
      verify: {
        command: "astryx integration verify",
        dependsOn: ["build"],
        cache: false,
      },
    },
  },
});
