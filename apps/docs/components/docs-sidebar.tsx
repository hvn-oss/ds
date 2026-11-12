import { SideNav, SideNavSection } from "@astryxdesign/core/SideNav";
import type { NavTree } from "#/lib/docs-page.ts";
import { toSidebarSections, type SidebarItem } from "#/lib/sidebar.ts";
import { RouteSideNavItem } from "./route-links";

export function DocsSidebar({ tree, currentUrl }: { tree: NavTree; currentUrl: string }) {
  return (
    <SideNav
      resizable={{ defaultWidth: 240, minWidth: 180, maxWidth: 400, autoSaveId: "docs-sidebar" }}
    >
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
