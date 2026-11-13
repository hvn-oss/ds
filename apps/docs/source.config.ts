import { defineConfig, defineDocs } from "fumadocs-mdx/config";
import { frontmatterSchema } from "#/lib/frontmatter.ts";

export const docs = defineDocs({
  dir: "content/docs",
  docs: {
    schema: frontmatterSchema,
  },
});

export default defineConfig({
  mdxOptions: {
    // Code blocks render through Astryx `CodeBlock`, so syntax colours come from the theme (ADR-0001).
    rehypeCodeOptions: false,
  },
});
