import { SideNav, SideNavSection } from "@astryxdesign/core/SideNav";
import type { NavTree } from "#/lib/docs-page.ts";
import { toSidebarSections, type SidebarItem } from "#/lib/sidebar.ts";
import { RouteSideNavItem } from "./route-links";

/** The sidebar's width. The guide page's table of contents matches it, to centre the content. */
export const SIDEBAR_WIDTH_CLASS = "w-60";

export function DocsSidebar({ tree, currentUrl }: { tree: NavTree; currentUrl: string }) {
  return (
    <SideNav className={SIDEBAR_WIDTH_CLASS}>
      {toSidebarSections(tree, currentUrl).map((section, index) => (
        <SideNavSection
          key={`${index}-${section.title}`}
          title={section.title}
          isHeaderHidden={section.isHeaderHidden}
        >
          {section.items.map((item) => (
            <DocsSidebarItem key={item.url ?? item.label} item={item} />
          ))}
        </SideNavSection>
      ))}
    </SideNav>
  );
}

function DocsSidebarItem({ item }: { item: SidebarItem }) {
  return (
    <RouteSideNavItem label={item.label} href={item.url} isSelected={item.isSelected}>
      {/* `SideNavItem` treats any truthy children, even `[]`, as nested items. */}
      {item.children.length > 0 &&
        item.children.map((child) => (
          <DocsSidebarItem key={child.url ?? child.label} item={child} />
        ))}
    </RouteSideNavItem>
  );
}
