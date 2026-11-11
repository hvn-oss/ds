<!--VITE PLUS START-->

# Using Vite+, the Unified Toolchain for the Web

This project is using Vite+, a unified toolchain built on top of Vite, Rolldown, Vitest, tsdown, Oxlint, Oxfmt, and Vite Task. Vite+ wraps runtime management, package management, and frontend tooling in a single global CLI called `vp`. Vite+ is distinct from Vite, and it invokes Vite through `vp dev` and `vp build`. Run `vp help` to print a list of commands and `vp <command> --help` for information about a specific command.

Docs are local at `node_modules/vite-plus/docs` or online at https://viteplus.dev/guide/.

## Built-in Commands vs Scripts

`vp <name>` runs a built-in command. `vp run <name>` runs a `package.json` script or a `vite.config.ts` task. Scripts cannot overwrite built-ins, so `vp dev` and `vp run dev` may do different things. Check `package.json` and `vite.config.ts` first, and run `vp run <name>` when the project defines a script or task with that name.

## Running Scripts

Run TypeScript and JavaScript files with `vpx <file>`, for example `vpx ./scripts/seed.ts --dry-run`. It handles enums, decorators, JSX, and tsconfig `paths`, so do not add `tsx` or `ts-node` to run scripts. `vpx --watch <file>` reruns the file when a file it uses changes, in place of `tsx watch`. `vp node <file>` runs plain Node.js.

## Tool Versions

Run `vp toolchain` to show versions and relationships in the active Vite+
release. Add a tool name to select part of the graph. For example, run
`vp toolchain vite`. Use `--global` to ignore the local `vite-plus` package. Use
`vp why <package>` to show the package-manager dependency graph.

## Review Checklist

- [ ] Run `vp install` after pulling remote changes and before getting started.
- [ ] Run `vp check` and `vp test` to format, lint, type check and test changes.
- [ ] Check if there are `vite.config.ts` tasks or `package.json` scripts necessary for validation, run via `vp run <script>`.
- [ ] If setup, runtime, or package-manager behavior looks wrong, run `vp env doctor` and include its output when asking for help.

<!--VITE PLUS END-->

<!--injected-by-void-v1.7.0-->

## Void

- This docs project local at `./apps/docs/` uses [Void](https://void.cloud), a full-stack Vite framework for Cloudflare Workers with file-based API routing, server-rendered pages, and typed backend services.
- Use Void's CLI and typed APIs. Before working with Void, read the relevant Markdown docs in `./apps/docs/node_modules/void/docs/`; start with `guide/quickstart.md` for setup and `reference/cli.md` for commands.

<!--/injected-by-void-->

<!-- ASTRYX:START -->

## Astryx

Astryx v0.7.11 · 90+ components. Run every CLI command as `vpx astryx <cmd>` (written `astryx …` below).
`astryx help` lists every command; `astryx search "<query>"` finds any component, hook, doc or template;
`astryx docs` lists every topic.

### Pages in `apps/docs`

Setup: `pages/layout.tsx` imports `pages/style.css` first. That one stylesheet declares the `@layer` order
and imports the Astryx reset, `astryx.css` and the Tailwind bridge; components render unstyled without it.

Workflow — start every page from a template:

1. `astryx build "<idea>"` — names the template to scaffold from and the parts it lacks.
2. `astryx template <name> <path>` — scaffold it; keep its frame, gap and padding; replace the content.
3. `astryx template <Block>` for parts it lacks; `astryx component <Name>` to read props before using one.
   Changing an existing page? Keep it: skip step 2 and add blocks/components inside its sections.
   Before you deliver a build, run `astryx doctor --built <dir>`; deliver only a build that passes.

Rules:

- Components handle all layout and spacing; compose them instead of raw `<div>`/`<span>`.
- Read `astryx docs layout` before changing a template's frame.
- Dense data = rows (Table, List/Item), not Card-wrapped lists. Badge = counts only.
- Style with component props first, then tokens: `var(--color-*|--spacing-*|--radius-*)`, or Tailwind
  bridge utilities on `className` (`bg-surface`, `text-primary`, `rounded-lg`). Every value is a token —
  raw hex/px, Tailwind palette classes and arbitrary values all bypass the theme.
  See `astryx docs styling-libraries/tailwind`.
- Templates that use StyleX need a compiler plugin this app lacks; see `astryx docs styling-overview`
  before adopting one.
- Colours come from the theme, never `:root` overrides. `astryx theme add <slug>` imports a theme;
  `theme eject <slug>` only forks source. See `astryx docs theme`.
- SELF-CHECK: re-read the file; replace any raw `<div>`/`<span>`, new `.css` import or `@apply`, hardcoded
  hex/px, or palette/arbitrary Tailwind class with a component, token or bridge utility.

### Integration package `packages/ds`

`@hvn-oss/ds` is an Astryx integration; author it by `astryx docs authoring`. Theme source
(`src/themes/<slug>/<slug>Theme.ts`) is where raw colours and fonts are defined — apps consume them as
tokens. `vp run typecheck` runs `astryx integration check --strict`, and every build runs it.

### Upgrading Astryx

After a dependency bump, run `astryx upgrade --from <old version> --apply`. It rewrites this block with
the generic version; restore this one from git (`git checkout -p AGENTS.md`).

<!-- ASTRYX:END -->

## Agent skills

### Issue tracker

Issues live in GitHub Issues for `hvn-oss/ds`, managed with the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Triage labels

Default vocabulary: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: one `GLOSSARY.md` and `docs/adr/` at the repo root. See `docs/agents/domain.md`.
