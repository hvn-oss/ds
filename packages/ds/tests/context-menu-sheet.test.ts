import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { describe, expect, test } from "vite-plus/test";

/**
 * hvnTheme.ts gives ContextMenu panels 8px padding, then restores Astryx's
 * inset on the bottom sheet with `.astryx-context-menu:is([data-autofocus])`
 * (https://github.com/hvn-oss/ds/issues/44). `data-autofocus` is not a
 * documented theming attribute, so this guards the assumption that Astryx sets
 * it on the sheet and never on the popover.
 *
 * If this fails after an Astryx upgrade, check the sheet on a coarse pointer.
 * If ContextMenu now reflects `presentation`, move the override to
 * `presentation:popover`, drop the sheet rule and delete this test
 * (docs/fixes-for-upstream/astryx-context-menu-presentation.md).
 */
const require = createRequire(import.meta.url);
const contextMenuSource = readFileSync(
  join(dirname(require.resolve("@astryxdesign/core/ContextMenu")), "ContextMenu.js"),
  "utf8",
);

describe("ContextMenu bottom sheet marker", () => {
  test("data-autofocus is set only when the menu renders as a bottom sheet", () => {
    const writes = contextMenuSource.match(/"data-autofocus":[^,\n]*/g);

    expect(writes).toEqual([
      // The menu list: popover or sheet.
      `"data-autofocus": usesBottomSheet ? '' : undefined`,
      // The data-driven sheet content, rendered only inside the sheet.
      `"data-autofocus": ""`,
    ]);
  });
});
