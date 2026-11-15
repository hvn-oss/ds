import { describe, expect, test } from "vite-plus/test";
import { toCatalogGroups } from "#/lib/catalog.ts";
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

describe("toCatalogGroups", () => {
  test("groups the other pages of the section by the separators between them", () => {
    expect(toCatalogGroups(tree, "/docs/components")).toEqual([
      {
        title: undefined,
        entries: [
          {
            title: "Button",
            description: "Lets people take an action.",
            url: "/docs/components/button",
          },
        ],
      },
      {
        title: "Forms",
        entries: [{ title: "Card", description: undefined, url: "/docs/components/card" }],
      },
    ]);
  });

  test("a separator with no pages after it has no group", () => {
    const empty: NavTree = {
      name: "Docs",
      children: [
        {
          type: "folder",
          name: "Components",
          index: { type: "page", name: "Components", url: "/docs/components" },
          children: [
            { type: "separator", name: "Action" },
            { type: "page", name: "Button", url: "/docs/components/button" },
            { type: "separator", name: "Content" },
          ],
        },
      ],
    };

    expect(toCatalogGroups(empty, "/docs/components")).toEqual([
      {
        title: "Action",
        entries: [{ title: "Button", description: undefined, url: "/docs/components/button" }],
      },
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

    expect(toCatalogGroups(nested, "/docs/components")).toEqual([
      {
        title: undefined,
        entries: [
          { title: "Forms", description: "Inputs and controls.", url: "/docs/components/forms" },
        ],
      },
    ]);
  });

  test("a page that isn't a section's index has no entries", () => {
    expect(toCatalogGroups(tree, "/docs")).toEqual([]);
  });
});
