import { DocsPage } from "#/components/docs-page.tsx";
import type { Props } from "./[...slug].server";

export default function DocsSlugPage({ page }: Props) {
  return <DocsPage page={page} />;
}
