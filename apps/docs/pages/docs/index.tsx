import { DocsPage } from "#/components/docs-page.tsx";
import type { Props } from "./index.server";

export default function DocsIndexPage({ page }: Props) {
  return <DocsPage page={page} />;
}
