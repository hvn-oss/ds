import { describe, expect, test } from "vite-plus/test";
import { toOutlineItems } from "#/lib/outline.ts";

describe("toOutlineItems", () => {
  test("links each heading to its anchor at its level, in page order", () => {
    const toc = [
      { title: "Prerequisites", url: "#prerequisites", depth: 2 },
      { title: "Install the package", url: "#install-the-package", depth: 2 },
      { title: "With pnpm", url: "#with-pnpm", depth: 3 },
    ];

    expect(toOutlineItems(toc)).toEqual([
      { id: "prerequisites", label: "Prerequisites", level: 2 },
      { id: "install-the-package", label: "Install the package", level: 2 },
      { id: "with-pnpm", label: "With pnpm", level: 3 },
    ]);
  });
});
