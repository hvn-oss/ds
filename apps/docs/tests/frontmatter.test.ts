import { describe, expect, test } from "vite-plus/test";
import { frontmatterSchema } from "#/lib/frontmatter.ts";

describe("frontmatterSchema", () => {
  test("a page without kind is a guide page", () => {
    const result = frontmatterSchema.safeParse({ title: "Introduction" });

    expect(result.success).toBe(true);
    expect(result.data?.kind).toBe("guide");
  });

  test("rejects an unknown kind", () => {
    const result = frontmatterSchema.safeParse({ title: "Introduction", kind: "tutorial" });

    expect(result.success).toBe(false);
  });

  test("rejects a component page without baseDocs", () => {
    const result = frontmatterSchema.safeParse({ title: "Button", kind: "component" });

    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.path).toEqual(["baseDocs"]);
  });

  test("rejects a component page whose baseDocs is not a URL", () => {
    const result = frontmatterSchema.safeParse({
      title: "Button",
      kind: "component",
      baseDocs: "Button",
    });

    expect(result.success).toBe(false);
  });

  test("accepts a component page with baseDocs", () => {
    const result = frontmatterSchema.safeParse({
      title: "Button",
      kind: "component",
      baseDocs: "https://astryx.atmeta.com/components/Button",
    });

    expect(result.success).toBe(true);
  });

  test("accepts a catalog page", () => {
    const result = frontmatterSchema.safeParse({ title: "Components", kind: "catalog" });

    expect(result.success).toBe(true);
  });
});
