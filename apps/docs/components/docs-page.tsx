import { Suspense } from "react";
import browserCollections from "#collections/browser";
import { AppShell } from "@astryxdesign/core/AppShell";
import { Breadcrumbs } from "@astryxdesign/core/Breadcrumbs";
import { Heading } from "@astryxdesign/core/Heading";
import { HStack } from "@astryxdesign/core/HStack";
import { Icon } from "@astryxdesign/core/Icon";
import { Layout, LayoutContent, LayoutPanel } from "@astryxdesign/core/Layout";
import { Outline } from "@astryxdesign/core/Outline";
import { StackItem } from "@astryxdesign/core/Stack";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import type { BreadcrumbItem, DocsPageData, NavLink, TocItem } from "#/lib/docs-page.ts";
import { toOutlineItems } from "#/lib/outline.ts";
import { DocsSidebar, SIDEBAR_WIDTH_CLASS } from "./docs-sidebar";
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
      <GuidePage page={page} />
    </AppShell>
  );
}

/**
 * The guide page frame, from the `documentation-technical` template. The page itself scrolls,
 * rather than `LayoutContent`, so the `Outline` beside it can follow the headings as they pass.
 *
 * The table of contents is as wide as the sidebar, so the content between them is centred on the
 * viewport. It keeps that width on pages without headings, so content doesn't shift between pages.
 */
function GuidePage({ page }: { page: DocsPageData }) {
  return (
    <Layout
      height="auto"
      content={
        // The padding is on the column rather than `LayoutContent`, which would hand it to tables
        // and dividers to bleed into. Like Astryx `Markdown`, they stay inside the text column.
        <LayoutContent isScrollable={false} padding={0}>
          <VStack gap={6} padding={6} width="100%" maxWidth="48rem" className="mx-auto">
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
      end={<DocsOutline toc={page.toc} />}
    />
  );
}

const OUTLINE_LABEL = "On this page";

/** The table of contents. It sticks beside the page's content, and narrow screens leave it out. */
function DocsOutline({ toc }: { toc: TocItem[] }) {
  return (
    <LayoutPanel
      isScrollable={false}
      padding={6}
      className={`${SIDEBAR_WIDTH_CLASS} sticky top-0 shrink-0 self-start max-md:hidden`}
    >
      {toc.length > 0 && (
        <VStack gap={2}>
          <Text type="supporting" weight="semibold" color="secondary">
            {OUTLINE_LABEL}
          </Text>
          <Outline items={toOutlineItems(toc)} label={OUTLINE_LABEL} density="compact" />
        </VStack>
      )}
    </LayoutPanel>
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
