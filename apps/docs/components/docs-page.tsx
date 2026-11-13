import {
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import browserCollections from "#collections/browser";
import { AppShell } from "@astryxdesign/core/AppShell";
import { Breadcrumbs } from "@astryxdesign/core/Breadcrumbs";
import { Card } from "@astryxdesign/core/Card";
import { Divider } from "@astryxdesign/core/Divider";
import { Grid } from "@astryxdesign/core/Grid";
import { Heading } from "@astryxdesign/core/Heading";
import { HStack } from "@astryxdesign/core/HStack";
import { Icon } from "@astryxdesign/core/Icon";
import { Layout, LayoutContent, LayoutPanel } from "@astryxdesign/core/Layout";
import { Link } from "@astryxdesign/core/Link";
import { Outline, type OutlineItem } from "@astryxdesign/core/Outline";
import { Selector, SelectorOption } from "@astryxdesign/core/Selector";
import { StackItem } from "@astryxdesign/core/Stack";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import { API_REFERENCE } from "#/lib/api-reference.ts";
import { toCatalogEntries } from "#/lib/catalog.ts";
import type { BreadcrumbItem, DocsPageData, NavLink } from "#/lib/docs-page.ts";
import { toOutlineItems } from "#/lib/outline.ts";
import { DocsSidebar, SIDEBAR_WIDTH_CLASS } from "./docs-sidebar";
import { AnchorHeading, mdxComponents } from "./mdx-components";
import { RouteBreadcrumbItem, RouteButton, RouteClickableCard } from "./route-links";
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
      <DocsPageFrame page={page} />
    </AppShell>
  );
}

function DocsPageFrame({ page }: { page: DocsPageData }) {
  switch (page.kind) {
    case "guide":
      return <MdxDocsPage page={page} />;
    case "component":
      return <MdxDocsPage page={page} footer={<ApiReference baseDocs={page.baseDocs} />} />;
    case "catalog":
      return <CatalogPage page={page} />;
  }
}

/**
 * The frame of guide pages, from the `documentation-technical` template, and of component pages,
 * from `documentation-design`. A component page's live preview and examples come from its MDX.
 *
 * The page itself scrolls, rather than `LayoutContent`, so the `Outline` beside it can follow the
 * headings as they pass. The table of contents is as wide as the sidebar, so the content between
 * them is centred on the viewport. It keeps that width on pages without headings, so content
 * doesn't shift between pages.
 */
function MdxDocsPage({ page, footer }: { page: DocsPageData; footer?: ReactNode }) {
  const outlineItems = toOutlineItems(page.toc);
  const activeHeading = useActiveHeading(outlineItems);

  return (
    <Layout
      height="auto"
      content={
        // The padding is on the column rather than `LayoutContent`, which would hand it to tables
        // and dividers to bleed into. Like Astryx `Markdown`, they stay inside the text column.
        <LayoutContent isScrollable={false} padding={0}>
          <VStack
            ref={activeHeading.findScrollContainer}
            gap={6}
            padding={6}
            width="100%"
            maxWidth="48rem"
            className="mx-auto"
          >
            <DocsBreadcrumbs items={page.breadcrumbs} />
            <VStack gap={2}>
              <Heading level={1}>{page.title}</Heading>
              {page.description && (
                <Text type="large" color="secondary">
                  {page.description}
                </Text>
              )}
            </VStack>
            <DocsOutlineSelector items={outlineItems} activeHeading={activeHeading} />
            <VStack gap={4}>
              <Suspense>
                {contentLoader.useContent(page.path)}
                <OutlineResync />
              </Suspense>
            </VStack>
            {footer}
            <DocsPagination previous={page.previous} next={page.next} />
          </VStack>
        </LayoutContent>
      }
      end={<DocsOutline items={outlineItems} activeHeading={activeHeading} />}
    />
  );
}

/** Closes a component page by pointing to the component in the base library's docs. */
function ApiReference({ baseDocs }: { baseDocs?: string }) {
  if (!baseDocs) return null;

  return (
    <VStack gap={4}>
      <AnchorHeading level={2} id={API_REFERENCE.id}>
        {API_REFERENCE.title}
      </AnchorHeading>
      <Text as="p" display="block">
        See the{" "}
        <Link href={baseDocs} isExternalLink>
          Astryx documentation
        </Link>{" "}
        for more information.
      </Text>
    </VStack>
  );
}

/**
 * The catalog page frame, from the `documentation` template: a banner, then a card for each other
 * page of the section. It has no MDX body and no table of contents.
 */
function CatalogPage({ page }: { page: DocsPageData }) {
  return (
    <Layout
      height="auto"
      contentWidth="64rem"
      content={
        // With no tables or dividers to bleed, the padding can sit on `LayoutContent`, which
        // centres it within `contentWidth`.
        <LayoutContent isScrollable={false} padding={6}>
          <VStack gap={8}>
            <Card variant="gray" padding={10}>
              <VStack gap={4}>
                <Heading level={1}>{page.title}</Heading>
                {page.description && (
                  <Text type="large" color="secondary">
                    {page.description}
                  </Text>
                )}
              </VStack>
            </Card>
            <Grid columns={{ minWidth: 240, max: 3 }} gap={4}>
              {toCatalogEntries(page.tree, page.url).map((entry) => (
                <RouteClickableCard
                  key={entry.url}
                  label={`Open ${entry.title}`}
                  href={entry.url}
                  height="100%"
                >
                  <VStack gap={1}>
                    <Text weight="bold">{entry.title}</Text>
                    {entry.description && (
                      <Text color="secondary" maxLines={3}>
                        {entry.description}
                      </Text>
                    )}
                  </VStack>
                </RouteClickableCard>
              ))}
            </Grid>
            <DocsPagination previous={page.previous} next={page.next} />
          </VStack>
        </LayoutContent>
      }
    />
  );
}

const OUTLINE_LABEL = "On this page";

/** How long to wait for a smooth scroll to settle when `scrollend` never fires, as in `Outline`. */
const SCROLL_SETTLE_TIMEOUT_MS = 1200;

interface ActiveHeading {
  id: string | undefined;
  /** A ref for an element inside the page, from which the AppShell's scroll container is found. */
  findScrollContainer: (node: HTMLElement | null) => void;
  /** The element the page scrolls in, for the `Outline` to follow. */
  scrollContainerRef: RefObject<HTMLElement | null>;
  /** Follows the `Outline`'s scroll-spy, except while `navigate` is scrolling to a heading. */
  track: (id: string) => void;
  /** Scrolls to a heading and makes it the active one straight away. */
  navigate: (id: string) => void;
}

/**
 * The heading the reader is on, shared by the table of contents and the narrow-screen selector.
 * The `Outline` follows the scroll even when CSS hides it, so it drives both.
 */
function useActiveHeading(items: OutlineItem[]): ActiveHeading {
  const [activeId, setActiveId] = useState(items[0]?.id);
  const isNavigatingRef = useRef(false);
  const scrollContainerRef = useRef<HTMLElement | null>(null);

  // Left to itself, the `Outline` looks for an ancestor that overflows when it mounts, which is
  // before the MDX body loads, so it finds none and follows the window instead. Refs attach before
  // its effect runs, and the AppShell's scroll container can be told apart by its style alone.
  const findScrollContainer = useCallback((node: HTMLElement | null) => {
    let ancestor = node?.parentElement;
    while (ancestor != null && !["auto", "scroll"].includes(getComputedStyle(ancestor).overflowY)) {
      ancestor = ancestor.parentElement;
    }
    scrollContainerRef.current = ancestor ?? null;
  }, []);

  const track = (id: string) => {
    if (!isNavigatingRef.current) setActiveId(id);
  };

  const navigate = (id: string) => {
    const target = document.getElementById(id);
    if (target == null) return;

    // Hold the selected heading while the scroll passes the ones before it.
    setActiveId(id);
    isNavigatingRef.current = true;
    // `scrollend` doesn't bubble, so it is caught on the way down from the scrolling ancestor.
    const settle = () => {
      document.removeEventListener("scrollend", settle, { capture: true });
      window.clearTimeout(timer);
      // The scroll-spy's last frame lands after `scrollend`.
      requestAnimationFrame(() => {
        isNavigatingRef.current = false;
      });
    };
    document.addEventListener("scrollend", settle, { capture: true });
    const timer = window.setTimeout(settle, SCROLL_SETTLE_TIMEOUT_MS);

    // A selector calls this as its popup closes, and a scroll started then doesn't happen.
    requestAnimationFrame(() => target.scrollIntoView({ behavior: "smooth", block: "start" }));
    window.history.pushState(null, "", `#${id}`);
  };

  // A page without the active heading, after navigating from another page, starts at the top.
  const id = items.some((item) => item.id === activeId) ? activeId : items[0]?.id;
  return { id, findScrollContainer, scrollContainerRef, track, navigate };
}

/**
 * Rendered after the MDX body. The `Outline` picks the active heading when it mounts, before the
 * body has loaded and while the page can't scroll, so it reads as scrolled to the end. It checks
 * again on scroll or resize, so a resize has it pick again now that the headings exist.
 */
function OutlineResync() {
  useEffect(() => {
    window.dispatchEvent(new Event("resize"));
  }, []);
  return null;
}

/** The table of contents. It sticks beside the page's content, and narrow screens leave it out. */
function DocsOutline({
  items,
  activeHeading,
}: {
  items: OutlineItem[];
  activeHeading: ActiveHeading;
}) {
  return (
    <LayoutPanel
      isScrollable={false}
      padding={6}
      className={`${SIDEBAR_WIDTH_CLASS} sticky top-0 self-start max-lg:hidden`}
    >
      {items.length > 0 && (
        <VStack gap={2}>
          <Text type="supporting" weight="semibold" color="secondary">
            {OUTLINE_LABEL}
          </Text>
          <Outline
            items={items}
            label={OUTLINE_LABEL}
            density="compact"
            scrollContainerRef={activeHeading.scrollContainerRef}
            onActiveIdChange={activeHeading.track}
          />
        </VStack>
      )}
    </LayoutPanel>
  );
}

/** Indents a heading by how far it nests below the page's top headings, like `Outline`. */
function indentFor(depth: number) {
  return ([0, 4, 8] as const)[Math.min(depth, 2)];
}

/**
 * The table of contents on narrow screens, where `DocsOutline` is hidden: a selector that sticks
 * to the top of the page and shows the section being read.
 */
function DocsOutlineSelector({
  items,
  activeHeading,
}: {
  items: OutlineItem[];
  activeHeading: ActiveHeading;
}) {
  if (items.length === 0) return null;

  const topLevel = Math.min(...items.map((item) => item.level));
  const levels = new Map(items.map((item) => [item.id, item.level]));

  return (
    <VStack
      gap={4}
      paddingBlockStart={6}
      paddingBlockEnd={4}
      className="sticky top-0 z-10 bg-surface lg:hidden"
    >
      <Selector
        label={OUTLINE_LABEL}
        isLabelHidden
        width="100%"
        options={items.map((item) => ({ value: item.id, label: item.label }))}
        value={activeHeading.id}
        onChange={activeHeading.navigate}
        renderOption={(option) => (
          <HStack paddingInlineStart={indentFor((levels.get(option.value) ?? topLevel) - topLevel)}>
            <SelectorOption label={option.label} />
          </HStack>
        )}
      />
      <Divider />
    </VStack>
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
