import type { TocItem } from "./docs-page";

/**
 * The API Reference section that closes every component page. The page frame renders it from
 * `baseDocs`, so the loader adds it to the table of contents after the MDX headings.
 */
export const API_REFERENCE = {
  id: "api-reference",
  title: "API Reference",
} as const;

export const API_REFERENCE_TOC_ITEM: TocItem = {
  title: API_REFERENCE.title,
  url: `#${API_REFERENCE.id}`,
  depth: 2,
};
