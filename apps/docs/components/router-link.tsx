import type { ComponentProps } from "react";
import { Link as VoidLink } from "@void/react";

/**
 * Void's `Link` for Astryx components' `as` prop, so internal links navigate client-side.
 * Astryx passes router components a `to` prop as well as `href`; Void's `Link` only reads `href`.
 */
export function RouterLink({
  to: _to,
  ...props
}: ComponentProps<typeof VoidLink> & { to?: string }) {
  return <VoidLink {...props} />;
}
