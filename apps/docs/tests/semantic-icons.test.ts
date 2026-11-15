import { isValidElement } from "react";
import * as hugeicons from "@hugeicons/core-free-icons";
import { describe, expect, test } from "vite-plus/test";
import { docsTheme } from "#/lib/foundations.ts";
import { SEMANTIC_ICON_GROUPS } from "#/lib/semantic-icons.ts";

const listed = SEMANTIC_ICON_GROUPS.flatMap((group) => group.icons);
const registry = docsTheme.icons ?? {};

/** The Hugeicon a registry entry draws: the `icon` prop of its `HugeiconsIcon` element. */
function drawnIcon(entry: unknown): unknown {
  return isValidElement<{ icon?: unknown }>(entry) ? entry.props.icon : undefined;
}

describe("semantic icon mapping", () => {
  test("lists every name in the theme's icon registry, once", () => {
    const names = listed.map((icon) => icon.name);
    expect(new Set(names).size).toBe(names.length);
    expect([...names].sort()).toEqual(Object.keys(registry).sort());
  });

  test.each(listed)("$name draws $hugeicon", ({ name, hugeicon }) => {
    const glyph = hugeicons[hugeicon as keyof typeof hugeicons];
    expect(glyph, `${hugeicon} is not a free Hugeicon`).toBeDefined();
    expect(drawnIcon((registry as Record<string, unknown>)[name])).toBe(glyph);
  });
});
