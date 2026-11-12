import { AppShell } from "@astryxdesign/core/AppShell";
import { Button } from "@astryxdesign/core/Button";
import { Heading } from "@astryxdesign/core/Heading";
import { HStack } from "@astryxdesign/core/HStack";
import { Icon } from "@astryxdesign/core/Icon";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import { RouteButton } from "#/components/route-links.tsx";
import { GITHUB_URL, SiteNav } from "#/components/site-nav.tsx";

export default function LandingPage() {
  return (
    <AppShell contentPadding={6} topNav={<SiteNav />}>
      <VStack gap={6} hAlign="center" vAlign="center" minHeight="100%">
        <VStack gap={2} hAlign="center">
          <Heading level={1}>hvn design system</Heading>
          <Text type="large" color="secondary">
            Themes and components for building hvn products, on top of Astryx.
          </Text>
        </VStack>
        <HStack gap={3}>
          <RouteButton label="Get started" variant="primary" href="/docs" />
          <Button
            label="GitHub"
            href={GITHUB_URL}
            target="_blank"
            endContent={<Icon icon="externalLink" />}
          />
        </HStack>
      </VStack>
    </AppShell>
  );
}
