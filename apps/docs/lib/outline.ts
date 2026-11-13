import type { OutlineItem } from "@astryxdesign/core/Outline";
import type { TocItem } from "./docs-page";

/** Turns a page's table of contents into `Outline` items, which link to headings by id. */
export function toOutlineItems(toc: TocItem[]): OutlineItem[] {
  return toc.map((item) => ({
    id: item.url.replace(/^#/, ""),
    label: item.title,
    level: item.depth,
  }));
}
