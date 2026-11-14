# PROTOTYPE: Colour foundation (throwaway)

Answers [Colour foundation](https://github.com/hvn-oss/ds/issues/19). Never merged.

- `generate.ts`: builds palette candidates (vibrancy 35/50/70 × blue anchor 600@45, 600@50, 500@55), resolves Astryx semantic tokens for two surface models (tone, flat) and two border-emphasized options (quiet, accessible), and checks contrast for every text and surface pair. Run with `vpx ./generate.ts`.
- `candidates.json`: the generated output.
- `tailwind.json.ts`: shadcn's legacy Tailwind colour table, used for the seeds.
- Comparison boards: the "PROTOTYPE · Colour foundation" page in the Design file.
