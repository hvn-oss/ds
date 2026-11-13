import type { Href } from "void/routes";
import type { NavFolder, NavNode, NavPage, NavTree } from "./docs-page";

export interface CatalogEntry {
  title: string;
  description?: string;
  url: Href;
}

/**
 * The cards on a catalog page: every other page of the section whose index is the page at `url`.
 * A nested folder appears once, through its index page.
 */
export function toCatalogEntries(tree: NavTree, url: string): CatalogEntry[] {
  const folder = findFolderWithIndex(tree.children, url);
  if (!folder) return [];

  return folder.children.flatMap((node): CatalogEntry[] => {
    const page = node.type === "folder" ? node.index : node.type === "page" ? node : undefined;
    return page ? [toEntry(page)] : [];
  });
}

function findFolderWithIndex(nodes: NavNode[], url: string): NavFolder | undefined {
  for (const node of nodes) {
    if (node.type !== "folder") continue;
    if (node.index?.url === url) return node;

    const found = findFolderWithIndex(node.children, url);
    if (found) return found;
  }
}

function toEntry(page: NavPage): CatalogEntry {
  return { title: page.name, description: page.description, url: page.url };
}
