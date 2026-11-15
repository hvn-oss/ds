import type { Href } from "void/routes";
import type { NavFolder, NavNode, NavPage, NavTree } from "./docs-page";
import { groupBySeparators } from "./nav-groups";

export interface CatalogEntry {
  title: string;
  description?: string;
  url: Href;
}

/** A titled group of cards, such as a component category. */
export interface CatalogGroup {
  /** The separator's name; missing for pages before the section's first separator. */
  title?: string;
  entries: CatalogEntry[];
}

/**
 * The cards on a catalog page: every other page of the section whose index is the page at `url`,
 * grouped by the separators between them, in the sidebar's order. A nested folder appears once,
 * through its index page.
 */
export function toCatalogGroups(tree: NavTree, url: string): CatalogGroup[] {
  const folder = findFolderWithIndex(tree.children, url);
  if (!folder) return [];

  return groupBySeparators(folder.children)
    .map((group) => ({ title: group.name, entries: group.nodes.flatMap(toEntries) }))
    .filter((group) => group.entries.length > 0);
}

function toEntries(node: NavNode): CatalogEntry[] {
  const page = node.type === "folder" ? node.index : node.type === "page" ? node : undefined;
  return page ? [toEntry(page)] : [];
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
