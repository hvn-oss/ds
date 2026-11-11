// Self-hosts each theme's fonts: src/themes/<slug>/<slug>.fonts.css lists @fontsource imports;
// this inlines their @font-face rules into dist/themes/<slug>/<slug>.fonts.css and copies the
// font files and licenses into dist/themes/<slug>/fonts/, so the shipped stylesheet loads
// nothing from outside the package (and `astryx doctor` can prove every family loads).
import { copyFileSync, globSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { basename, dirname, join } from "node:path";

const require = createRequire(import.meta.url);

for (const source of globSync("src/themes/*/*.fonts.css")) {
  const outDir = dirname(source).replace(/^src\//, "dist/");
  const fontsDir = join(outDir, "fonts");
  mkdirSync(fontsDir, { recursive: true });

  const specifiers = [...readFileSync(source, "utf8").matchAll(/@import\s+"([^"]+)";/g)].map(
    ([, specifier]) => specifier,
  );
  const packages = new Set<string>();

  const rules = specifiers.map((specifier) => {
    const cssPath = require.resolve(specifier);
    const packageName = specifier.split("/").slice(0, 2).join("/");
    packages.add(packageName);
    return readFileSync(cssPath, "utf8").replace(
      /url\(\.\/files\/([^)]+)\)/g,
      (_: string, file: string) => {
        copyFileSync(join(dirname(cssPath), "files", file), join(fontsDir, file));
        return `url(./fonts/${file})`;
      },
    );
  });

  for (const packageName of packages) {
    const license = require.resolve(`${packageName}/LICENSE`);
    copyFileSync(license, join(fontsDir, `${basename(packageName)}.LICENSE`));
  }

  const header = `/* Generated from ${source} by scripts/build-fonts.ts. Fonts under the SIL OFL 1.1; see ./fonts/*.LICENSE. */\n`;
  writeFileSync(join(outDir, basename(source)), header + rules.join("\n"));
}
