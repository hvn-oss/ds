import { Button } from "@astryxdesign/core/Button";
import { Icon } from "@astryxdesign/core/Icon";
import { TopNav } from "@astryxdesign/core/TopNav";
import { RouteTopNavHeading, RouteTopNavItem } from "./route-links";

export const GITHUB_URL = "https://github.com/hvn-oss/ds";

/** The navbar shared by the landing page and the docs. */
export function SiteNav({ isInDocs = false }: { isInDocs?: boolean }) {
  return (
    <TopNav
      label="Main navigation"
      heading={<RouteTopNavHeading heading="hvn" headingHref="/" />}
      startContent={<RouteTopNavItem label="Docs" href="/docs" isSelected={isInDocs} />}
      endContent={
        <Button
          label="GitHub"
          variant="ghost"
          size="sm"
          href={GITHUB_URL}
          target="_blank"
          endContent={<Icon icon="externalLink" />}
        />
      }
    />
  );
}
