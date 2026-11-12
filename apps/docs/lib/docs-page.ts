import { isValidElement, type ReactNode } from "react";
import { HTTPException } from "hono/http-exception";
import { getBreadcrumbItems } from "fumadocs-core/breadcrumb";
import { findNeighbour, type Node, type Root } from "fumadocs-core/page-tree";
import type { DocsPageKind } from "./frontmatter";
import { source } from "./source";

// Fumadocs names, TOC titles and icons are React nodes, which can't cross the loader boundary.
// These shapes keep the page tree's structure with every label flattened to a string.

export interface NavPage {
  type: "page";
  name: string;
  url: string;
  external?: boolean;
}

export interface NavSeparator {
  type: "separator";
  name?: string;
}

export interface NavFolder {
  type: "folder";
  name: string;
  defaultOpen?: boolean;
  index?: NavPage;
  children: NavNode[];
}

export type NavNode = NavPage | NavSeparator | NavFolder;

export interface NavTree {
  name: string;
  children: NavNode[];
}

export interface TocItem {
  title: string;
  url: string;
  depth: number;
}

export interface NavLink {
  name: string;
  url: string;
}

export interface BreadcrumbItem {
  name: string;
  /** Missing for a section, which has no page of its own. */
  url?: string;
}

export interface DocsPageData {
  /** Path of the MDX file within the docs collection, used to load its content on the client. */
  path: string;
  url: string;
  title: string;
  description?: string;
  kind: DocsPageKind;
  baseDocs?: string;
  toc: TocItem[];
  tree: NavTree;
  breadcrumbs: BreadcrumbItem[];
  previous?: NavLink;
  next?: NavLink;
}

/** Everything a docs page needs from the server. Throws a 404 when no page has these slugs. */
export function getDocsPage(slugs: string[]): DocsPageData {
  const page = source.getPage(slugs);
  if (!page) throw new HTTPException(404, { message: "Docs page not found" });

  const neighbours = findNeighbour(source.pageTree, page.url);

  return {
    path: page.path,
    url: page.url,
    title: page.data.title,
    description: page.data.description,
    kind: page.data.kind,
    baseDocs: page.data.baseDocs,
    toc: page.data.toc.map((item) => ({
      title: toText(item.title),
      url: item.url,
      depth: item.depth,
    })),
    tree: toNavTree(source.pageTree),
    breadcrumbs: getBreadcrumbItems(page.url, source.pageTree, { includePage: true }).map(
      (item) => ({ name: toText(item.name), url: item.url }),
    ),
    previous: neighbours.previous && toNavLink(neighbours.previous),
    next: neighbours.next && toNavLink(neighbours.next),
  };
}

/** Slugs of every docs page, for prerendering. */
export function getDocsPageSlugs(): string[][] {
  return source.generateParams().map((params) => params.slug);
}

function toNavTree(root: Root): NavTree {
  return { name: toText(root.name), children: root.children.map(toNavNode) };
}

function toNavNode(node: Node): NavNode {
  switch (node.type) {
    case "page":
      return toNavPage(node);
    case "separator":
      return { type: "separator", name: node.name == null ? undefined : toText(node.name) };
    case "folder":
      return {
        type: "folder",
        name: toText(node.name),
        defaultOpen: node.defaultOpen,
        index: node.index && toNavPage(node.index),
        children: node.children.map(toNavNode),
      };
  }
}

function toNavPage(node: { name: ReactNode; url: string; external?: boolean }): NavPage {
  return { type: "page", name: toText(node.name), url: node.url, external: node.external };
}

function toNavLink(node: { name: ReactNode; url: string }): NavLink {
  return { name: toText(node.name), url: node.url };
}

function toText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(toText).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) return toText(node.props.children);
  return "";
}
