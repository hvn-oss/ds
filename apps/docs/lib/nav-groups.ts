import type { NavNode } from "./docs-page";

/** The nodes of a folder, split at its separators, such as the component categories. */
export interface NavGroup {
  /** The separator's name; missing for nodes before the first separator. */
  name?: string;
  nodes: NavNode[];
}

/**
 * Splits nodes into the groups their separators start. Nodes before the first separator form an
 * unnamed group, and a group with no nodes is dropped.
 */
export function groupBySeparators(nodes: NavNode[]): NavGroup[] {
  const groups: NavGroup[] = [{ nodes: [] }];

  for (const node of nodes) {
    if (node.type === "separator") groups.push({ name: node.name, nodes: [] });
    else groups[groups.length - 1].nodes.push(node);
  }

  return groups.filter((group) => group.nodes.length > 0);
}
