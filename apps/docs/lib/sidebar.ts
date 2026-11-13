import type { Href } from "void/routes";
import type { NavNode, NavTree } from "./docs-page";

// The sidebar's shape, kept apart from the Astryx components that render it.

export interface SidebarItem {
  label: string;
  url?: Href;
  isSelected: boolean;
  children: SidebarItem[];
}

export interface SidebarSection {
  title: string;
  /** Set for loose pages outside any named section; the title stays for screen readers. */
  isHeaderHidden?: boolean;
  items: SidebarItem[];
}

/** Groups the page tree into sidebar sections, marking the page at `currentUrl` as selected. */
export function toSidebarSections(tree: NavTree, currentUrl: string): SidebarSection[] {
  const sections: SidebarSection[] = [];
  // The section that loose top-level pages join; a folder's section only holds the folder.
  let current: SidebarSection | undefined;

  for (const node of tree.children) {
    if (node.type === "separator") {
      current = { title: node.name ?? "", items: [] };
      sections.push(current);
    } else if (node.type === "folder") {
      const overview = node.index ? toItems([node.index], currentUrl).map(asOverview) : [];
      sections.push({
        title: node.name,
        items: [...overview, ...toItems(node.children, currentUrl)],
      });
      current = undefined;
    } else {
      if (!current) {
        current = { title: tree.name, isHeaderHidden: true, items: [] };
        sections.push(current);
      }
      current.items.push(...toItems([node], currentUrl));
    }
  }

  return sections;
}

/** A section's index page, such as its catalog page, is listed first as the section's overview. */
function asOverview(item: SidebarItem): SidebarItem {
  return { ...item, label: "Overview" };
}

function toItems(nodes: NavNode[], currentUrl: string): SidebarItem[] {
  return nodes.flatMap((node): SidebarItem[] => {
    switch (node.type) {
      case "separator":
        return [];
      case "page":
        return [
          { label: node.name, url: node.url, isSelected: node.url === currentUrl, children: [] },
        ];
      case "folder":
        return [
          {
            label: node.name,
            url: node.index?.url,
            isSelected: node.index?.url === currentUrl,
            children: toItems(node.children, currentUrl),
          },
        ];
    }
  });
}
