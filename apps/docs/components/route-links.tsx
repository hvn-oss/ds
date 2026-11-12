import type { Href } from "void/routes";
import { BreadcrumbItem, type BreadcrumbItemProps } from "@astryxdesign/core/Breadcrumbs";
import { Button, type ButtonProps } from "@astryxdesign/core/Button";
import { SideNavItem, type SideNavItemProps } from "@astryxdesign/core/SideNav";
import {
  TopNavHeading,
  TopNavItem,
  type TopNavHeadingProps,
  type TopNavItemProps,
} from "@astryxdesign/core/TopNav";
import { RouterLink } from "./router-link";

// Astryx types every href as `string`, so these wrappers narrow it to Void's `Href`: with
// `typedRoutes` on, an internal link to a route that doesn't exist fails to type-check.
// They also render through `RouterLink` for client-side navigation.

export function RouteButton({ href, ...props }: Omit<ButtonProps, "href" | "as"> & { href: Href }) {
  return <Button {...props} href={href} as={RouterLink} />;
}

export function RouteTopNavHeading({
  headingHref,
  ...props
}: Omit<TopNavHeadingProps, "headingHref" | "as"> & { headingHref: Href }) {
  return <TopNavHeading {...props} headingHref={headingHref} as={RouterLink} />;
}

export function RouteTopNavItem({
  href,
  ...props
}: Omit<TopNavItemProps, "href" | "as"> & { href: Href }) {
  return <TopNavItem {...props} href={href} as={RouterLink} />;
}

/** A sidebar item; without `href` it's a plain row, such as a folder with no index page. */
export function RouteSideNavItem({
  href,
  ...props
}: Omit<SideNavItemProps, "href" | "as"> & { href?: Href }) {
  return <SideNavItem {...props} href={href} as={href ? RouterLink : undefined} />;
}

/** A breadcrumb; without `href` it's plain text, such as a section with no page of its own. */
export function RouteBreadcrumbItem({
  href,
  ...props
}: Omit<BreadcrumbItemProps, "href" | "as"> & { href?: Href }) {
  return <BreadcrumbItem {...props} href={href} as={RouterLink} />;
}
