import { pageSchema } from "fumadocs-core/source/schema";
import { z } from "zod";

export const docsPageKinds = ["guide", "component", "catalog"] as const;

export type DocsPageKind = (typeof docsPageKinds)[number];

/** Frontmatter of a docs page. A component page must link to its base library docs. */
export const frontmatterSchema = pageSchema
  .extend({
    kind: z.enum(docsPageKinds).default("guide"),
    baseDocs: z.url().optional(),
  })
  .refine((frontmatter) => frontmatter.kind !== "component" || frontmatter.baseDocs, {
    message: "Component pages need `baseDocs`, a URL to the component in the Astryx docs",
    path: ["baseDocs"],
  });
