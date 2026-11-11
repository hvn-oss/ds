# @hvn-oss/ds

HVN design system, shipped as an [Astryx](https://astryx.design) integration: themes, and later components, templates, and docs.

## Layout

- `src/` — sources (committed).
  - `src/themes/hvn/` — the `hvn` theme: `hvnTheme.ts` (forked from Stone, violet primary buttons),
    its descriptor, palette, `icons.js`, and `hvn.fonts.css` (the `@fontsource-variable` faces it loads).
- `docs/` — doc topics; `hvn-theme.doc.mjs` extends the core `theme` topic (`astryx docs theme`).
- `scripts/build-fonts.ts` — self-hosts each theme's fonts into `dist/`.
- `dist/` — build outputs (gitignored).
  - `dist/themes/hvn/` — `hvn.js`, `hvn.css`, `hvn.d.ts` from `astryx theme build`; `icons.js` from `vp pack`;
    `hvn.fonts.css` plus `fonts/` (woff2 files and their OFL licenses) from `scripts/build-fonts.ts`.
- `astryx.integration.mjs` — tells the Astryx CLI where each kind of item lives (`./src/themes`, `./docs`).

## Development

From the repo root, `vp run dev` builds this package once, then runs every package's `dev` task in
parallel (`vp run -r --parallel dev`): the watchers below plus the docs dev server. Edit anything in
`src/themes/` and the docs app hot-updates from the rebuilt `dist/`.

`dev` here depends on one watcher per output, so they all start together:

- `dev:icons` — `vp pack --watch`: `src/themes/*/icons.js` -> `dist/themes/*/icons.js`
- `dev:theme:<slug>` — `astryx theme build --watch`, one per theme (`--out` takes a single theme)

Run `vp run @hvn-oss/ds#dev` on its own to watch without the docs app.

Other tasks (in `vite.config.ts`):

```bash
vp run build        # typecheck, build:icons and build:fonts, then build:themes
vp run build:icons  # src/themes/*/icons.js -> dist/themes/*/icons.js (vp pack)
vp run build:fonts  # src/themes/<slug>/<slug>.fonts.css -> dist/themes/<slug>/{<slug>.fonts.css,fonts/}
vp run build:themes # src/themes/<slug>/<slug>Theme.ts -> dist/themes/<slug>/<slug>.{js,css,d.ts}
vp run typecheck    # tsc --noEmit && astryx integration check --strict (required in every build)
vp run verify       # build, then pack + install in a temp app (astryx integration verify)
```

`dist/` is rebuilt by the root `prepare` script on install, before `docs#dev` / `docs#build` (via
`dependsOn`), and by the release workflow before packing.

Icon registries are plain JS (`createElement`, no JSX). The theme source imports `./icons.js`, and
`astryx theme build` copies that import into the built module unchanged, so `dist/themes/<slug>/`
needs its own `icons.js`. `integration verify` rebuilds themes without `--icons-specifier`, so this is
the only layout that keeps sources and outputs apart and passes verify.

When adding a theme, add its slug to `themes` in `vite.config.ts`. Its `<slug>.fonts.css` may only
contain `@fontsource` `@import` lines; `build:fonts` inlines them. `astryx theme build` always notes
that the theme's fonts aren't loaded, because it never sees the font stylesheet; `astryx doctor` in an
app that ran `theme add` is the real check.

Add more items with `vpx astryx integration add <component|template|theme|doc> <Name>`.
See `vpx astryx docs authoring`.

## Use in an app

```bash
vp add @hvn-oss/ds
vpx astryx theme add hvn --package @hvn-oss/ds
vpx astryx theme use hvn
```
