import { defineHandler, type InferProps } from "void";
import { getDocsPage } from "#/lib/docs-page.ts";

// `[...slug]` doesn't match `/docs` itself, so the root docs page has its own route.

export type Props = InferProps<typeof loader>;

export const prerender = true;

export const loader = defineHandler(() => ({ page: getDocsPage([]) }));
