import { useId, useState, type ComponentType, type ReactNode } from "react";
import { Card } from "@astryxdesign/core/Card";
import { Center } from "@astryxdesign/core/Center";
import { CodeBlock } from "@astryxdesign/core/CodeBlock";
import { Section } from "@astryxdesign/core/Section";
import { Tab, TabList } from "@astryxdesign/core/TabList";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import { createExampleRegistry } from "#/lib/examples.ts";

// MDX components for component pages, from the `documentation-design` template.

const getExample = createExampleRegistry(
  import.meta.glob<{ default: ComponentType }>("../examples/*/*.tsx", { eager: true }),
  import.meta.glob<string>("../examples/*/*.tsx", {
    query: "?raw",
    import: "default",
    eager: true,
  }),
);

/** The live preview at the top of a component page: a large muted card rendering the component. */
export function Preview({ name }: { name: string }) {
  const { Component } = getExample(name);

  return (
    <Card variant="muted" padding={0}>
      <Center minHeight="22.5rem" padding={6}>
        <Component />
      </Center>
    </Card>
  );
}

type ExampleTab = "description" | "code";

/** A titled example: the rendered file, then tabs for its description (the children) and code. */
export function Example({
  name,
  title,
  children,
}: {
  name: string;
  title: string;
  children?: ReactNode;
}) {
  const { Component, code } = getExample(name);
  const [tab, setTab] = useState<ExampleTab>("description");
  const id = useId();
  const panelIds = { description: `${id}-description`, code: `${id}-code` };

  return (
    <Card padding={0}>
      <Section padding={3} variant="transparent">
        <Text weight="medium">{title}</Text>
      </Section>
      <Center minHeight="17.5rem" padding={6}>
        <Component />
      </Center>
      <Section variant="muted" padding={3} dividers={["top"]}>
        <VStack gap={3}>
          <TabList
            value={tab}
            onChange={(value) => setTab(value as ExampleTab)}
            size="sm"
            role="tablist"
          >
            <Tab value="description" label="Description" panelId={panelIds.description} />
            <Tab value="code" label="Code" panelId={panelIds.code} />
          </TabList>
          {/* Both panels stay mounted, so each tab's `aria-controls` points at a real element. */}
          <VStack
            id={panelIds.description}
            role="tabpanel"
            aria-label="Description"
            hidden={tab !== "description"}
            gap={2}
          >
            {children}
          </VStack>
          <VStack id={panelIds.code} role="tabpanel" aria-label="Code" hidden={tab !== "code"}>
            <CodeBlock code={code} language="tsx" width="100%" />
          </VStack>
        </VStack>
      </Section>
    </Card>
  );
}
