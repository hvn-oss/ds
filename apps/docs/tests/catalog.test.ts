import { describe, expect, test } from "vite-plus/test";
import { toCatalogEntries } from "#/lib/catalog.ts";
import type { NavTree } from "#/lib/docs-page.ts";

const tree: NavTree = {
  name: "Docs",
  children: [
    { type: "separator", name: "Getting Started" },
    { type: "page", name: "Introduction", url: "/docs" },
    {
      type: "folder",
      name: "Components",
      index: { type: "page", name: "Components", url: "/docs/components" },
      children: [
        {
          type: "page",
          name: "Button",
          description: "Lets people take an action.",
          url: "/docs/components/button",
        },
        { type: "separator", name: "Forms" },
        { type: "page", name: "Card", url: "/docs/components/card" },
      ],
    },
  ],
};

describe("toCatalogEntries", () => {
  test("lists the other pages of the section the catalog page is the index of", () => {
    expect(toCatalogEntries(tree, "/docs/components")).toEqual([
      {
        title: "Button",
        description: "Lets people take an action.",
        url: "/docs/components/button",
      },
      { title: "Card", description: undefined, url: "/docs/components/card" },
    ]);
  });

  test("a nested folder is listed through its index page", () => {
    const nested: NavTree = {
      name: "Docs",
      children: [
        {
          type: "folder",
          name: "Components",
          index: { type: "page", name: "Components", url: "/docs/components" },
          children: [
            {
              type: "folder",
              name: "Forms",
              index: {
                type: "page",
                name: "Forms",
                description: "Inputs and controls.",
                url: "/docs/components/forms",
              },
              children: [
                { type: "page", name: "Text input", url: "/docs/components/forms/text-input" },
              ],
            },
          ],
        },
      ],
    };

    expect(toCatalogEntries(nested, "/docs/components")).toEqual([
      { title: "Forms", description: "Inputs and controls.", url: "/docs/components/forms" },
    ]);
  });

  test("a page that isn't a section's index has no entries", () => {
    expect(toCatalogEntries(tree, "/docs")).toEqual([]);
  });
});
