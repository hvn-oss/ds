import { describe, expect, test } from "vite-plus/test";
import {
  controlSizes,
  formatColour,
  formatLength,
  iconStroke,
  splitLayers,
  tokenValue,
  toPx,
  touchCondition,
  touchTokens,
  typeStyleValues,
} from "#/lib/foundations.ts";

describe("tokenValue", () => {
  test("resolves a token in each mode", () => {
    expect(formatColour(tokenValue("--color-accent", "light"))).toBe("#2563EB");
    expect(tokenValue("--color-accent", "dark")).not.toBe(tokenValue("--color-accent", "light"));
  });

  test("throws on an unknown token", () => {
    expect(() => tokenValue("--color-nope", "light")).toThrow(/no token "--color-nope"/);
  });
});

describe("lengths", () => {
  test("converts rem at a 16px root", () => {
    expect(toPx("0.875rem")).toBe(14);
    expect(toPx("64px")).toBe(64);
    expect(formatLength("0.5rem")).toBe("8px");
    expect(formatLength("9999px")).toBe("9999px");
  });

  test("scales the icon stroke from 1.5 at 24px", () => {
    expect(iconStroke(24)).toBe("1.50px");
    expect(iconStroke(12)).toBe("0.75px");
  });
});

describe("typeStyleValues", () => {
  test("turns ratio line heights into px", () => {
    expect(typeStyleValues("body")).toEqual({ size: "14", leading: "20", weight: "400" });
    expect(typeStyleValues("heading-1")).toEqual({ size: "24", leading: "32", weight: "500" });
    expect(typeStyleValues("supporting")).toEqual({ size: "12", leading: "20", weight: "400" });
  });

  test("keeps pinned display sizes", () => {
    expect(typeStyleValues("display-1")).toEqual({ size: "64", leading: "72", weight: "400" });
  });
});

describe("control sizes", () => {
  test("reads desktop and touch heights from the theme", () => {
    expect(controlSizes()).toEqual([
      { size: "sm", token: "--size-element-sm", desktop: "28", touch: "32" },
      { size: "md", token: "--size-element-md", desktop: "32", touch: "36" },
      { size: "lg", token: "--size-element-lg", desktop: "36", touch: "40" },
    ]);
  });

  test("states the touch rule's condition", () => {
    expect(touchCondition()).toBe("Coarse pointer, below lg (1024px)");
  });

  test("gives the touch rule's tokens, type scale included", () => {
    const tokens = touchTokens();
    expect(tokens["--size-element-md"]).toBe("36px");
    expect(tokens["--font-size-base"]).toBe("1rem");
    expect(tokens["--text-label-size"]).toBe("var(--font-size-base)");
    expect(Object.keys(tokens).filter((token) => token.endsWith("-weight"))).toEqual([]);
  });
});

describe("splitLayers", () => {
  test("splits on top-level commas only", () => {
    expect(splitLayers("0 0 0 1px light-dark(rgba(0, 0, 0, 0.08), white), 0 2px 8px red")).toEqual([
      "0 0 0 1px light-dark(rgba(0, 0, 0, 0.08), white)",
      "0 2px 8px red",
    ]);
  });
});
