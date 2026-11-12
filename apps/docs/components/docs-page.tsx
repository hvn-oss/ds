import { Suspense } from "react";
import browserCollections from "#collections/browser";
import { Heading } from "@astryxdesign/core/Heading";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import type { DocsPageData } from "#/lib/docs-page.ts";
import { mdxComponents } from "./mdx-components";

// The loader only sends serialisable page data, so the compiled MDX loads here (ADR-0001).
const contentLoader = browserCollections.docs.createClientLoader({
  component: ({ default: MDX }) => <MDX components={mdxComponents} />,
});

export function DocsPage({ page }: { page: DocsPageData }) {
  return (
    <VStack gap={6} padding={8} maxWidth="48rem">
      <VStack gap={2}>
        <Heading level={1}>{page.title}</Heading>
        {page.description && (
          <Text type="large" color="secondary">
            {page.description}
          </Text>
        )}
      </VStack>
      <VStack gap={4}>
        <Suspense>{contentLoader.useContent(page.path)}</Suspense>
      </VStack>
    </VStack>
  );
}
