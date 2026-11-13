import { describe, expect, test } from "vite-plus/test";
import type { NavTree } from "#/lib/docs-page.ts";
import { toSidebarSections } from "#/lib/sidebar.ts";

describe("toSidebarSections", () => {
  test("a separator starts a section holding the pages after it", () => {
    const tree: NavTree = {
      name: "Docs",
      children: [
        { type: "separator", name: "Getting Started" },
        { type: "page", name: "Introduction", url: "/docs" },
        { type: "page", name: "Installation", url: "/docs/installation" },
      ],
    };

    expect(toSidebarSections(tree, "/docs/installation")).toEqual([
      {
        title: "Getting Started",
        items: [
          { label: "Introduction", url: "/docs", isSelected: false, children: [] },
          { label: "Installation", url: "/docs/installation", isSelected: true, children: [] },
        ],
      },
    ]);
  });

  test("pages before any separator go in an untitled section", () => {
    const tree: NavTree = {
      name: "Docs",
      children: [{ type: "page", name: "Introduction", url: "/docs" }],
    };

    expect(toSidebarSections(tree, "/docs")).toEqual([
      {
        title: "Docs",
        isHeaderHidden: true,
        items: [{ label: "Introduction", url: "/docs", isSelected: true, children: [] }],
      },
    ]);
  });

  test("a top-level folder is a section that starts with its index page, labelled Overview", () => {
    const tree: NavTree = {
      name: "Docs",
      children: [
        {
          type: "folder",
          name: "Components",
          index: { type: "page", name: "Components", url: "/docs/components" },
          children: [{ type: "page", name: "Button", url: "/docs/components/button" }],
        },
      ],
    };

    expect(toSidebarSections(tree, "/docs/components")).toEqual([
      {
        title: "Components",
        items: [
          { label: "Overview", url: "/docs/components", isSelected: true, children: [] },
          { label: "Button", url: "/docs/components/button", isSelected: false, children: [] },
        ],
      },
    ]);
  });

  test("a folder inside a section is an item nesting its pages", () => {
    const tree: NavTree = {
      name: "Docs",
      children: [
        {
          type: "folder",
          name: "Components",
          children: [
            {
              type: "folder",
              name: "Forms",
              index: { type: "page", name: "Forms", url: "/docs/components/forms" },
              children: [
                { type: "page", name: "Text input", url: "/docs/components/forms/text-input" },
              ],
            },
          ],
        },
      ],
    };

    expect(toSidebarSections(tree, "/docs/components/forms/text-input")).toEqual([
      {
        title: "Components",
        items: [
          {
            label: "Forms",
            url: "/docs/components/forms",
            isSelected: false,
            children: [
              {
                label: "Text input",
                url: "/docs/components/forms/text-input",
                isSelected: true,
                children: [],
              },
            ],
          },
        ],
      },
    ]);
  });
});
