import { defineHandler, type InferProps } from "void";
import type { PageParams } from "void/routes";
import { getDocsPage, getDocsPageSlugs } from "#/lib/docs-page.ts";

export type Props = InferProps<typeof loader>;

export const prerender = true;

export async function getPrerenderPaths(): Promise<PageParams<"/docs/[...slug]">[]> {
  // The root docs page is served by `pages/docs/index`.
  return getDocsPageSlugs()
    .filter((slugs) => slugs.length > 0)
    .map((slugs) => ({ slug: slugs.join("/") }));
}

export const loader = defineHandler((c) => {
  const { slug } = c.req.param() as PageParams<"/docs/[...slug]">;

  return { page: getDocsPage(slug.split("/")) };
});
