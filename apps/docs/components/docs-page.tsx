import { Suspense } from "react";
import browserCollections from "#collections/browser";
import { AppShell } from "@astryxdesign/core/AppShell";
import { Breadcrumbs } from "@astryxdesign/core/Breadcrumbs";
import { Heading } from "@astryxdesign/core/Heading";
import { HStack } from "@astryxdesign/core/HStack";
import { Icon } from "@astryxdesign/core/Icon";
import { Layout, LayoutContent } from "@astryxdesign/core/Layout";
import { StackItem } from "@astryxdesign/core/Stack";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import type { BreadcrumbItem, DocsPageData, NavLink } from "#/lib/docs-page.ts";
import { DocsSidebar } from "./docs-sidebar";
import { mdxComponents } from "./mdx-components";
import { RouteBreadcrumbItem, RouteButton } from "./route-links";
import { SiteNav } from "./site-nav";

// The loader only sends serialisable page data, so the compiled MDX loads here (ADR-0001).
const contentLoader = browserCollections.docs.createClientLoader({
  component: ({ default: MDX }) => <MDX components={mdxComponents} />,
});

export function DocsPage({ page }: { page: DocsPageData }) {
  return (
    <AppShell
      topNav={<SiteNav isInDocs />}
      sideNav={<DocsSidebar tree={page.tree} currentUrl={page.url} />}
    >
      <Layout
        content={
          <LayoutContent padding={6}>
            <VStack gap={6} maxWidth="48rem">
              <DocsBreadcrumbs items={page.breadcrumbs} />
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
              <DocsPagination previous={page.previous} next={page.next} />
            </VStack>
          </LayoutContent>
        }
      />
    </AppShell>
  );
}

function DocsBreadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <Breadcrumbs variant="supporting">
      {items.map((item, index) => (
        <RouteBreadcrumbItem
          key={`${index}-${item.name}`}
          href={item.url}
          isCurrent={index === items.length - 1}
        >
          {item.name}
        </RouteBreadcrumbItem>
      ))}
    </Breadcrumbs>
  );
}

function DocsPagination({ previous, next }: { previous?: NavLink; next?: NavLink }) {
  return (
    <HStack gap={4} vAlign="center">
      {previous && (
        <RouteButton
          label={`Previous: ${previous.name}`}
          href={previous.url}
          icon={<Icon icon="chevronLeft" />}
        >
          {previous.name}
        </RouteButton>
      )}
      <StackItem size="fill" />
      {next && (
        <RouteButton
          label={`Next: ${next.name}`}
          href={next.url}
          endContent={<Icon icon="chevronRight" />}
        >
          {next.name}
        </RouteButton>
      )}
    </HStack>
  );
}
