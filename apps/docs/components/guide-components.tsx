import { Children, createContext, isValidElement, use, type ReactNode } from "react";
import { Banner } from "@astryxdesign/core/Banner";
import { Card } from "@astryxdesign/core/Card";
import { Center } from "@astryxdesign/core/Center";
import { Heading } from "@astryxdesign/core/Heading";
import { HStack } from "@astryxdesign/core/HStack";
import { StackItem } from "@astryxdesign/core/Stack";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";

// MDX components for guide pages.

/** Each `<Step>` reads its number from the `<Steps>` around it. */
const StepNumberContext = createContext(0);

/**
 * Numbered steps. Each child is a `<Step>`. Astryx `Stepper` isn't used: it tracks progress through
 * a flow and tells screen readers which steps are completed, which a guide doesn't have.
 */
export function Steps({ children }: { children: ReactNode }) {
  const steps = Children.toArray(children).filter(isValidElement);

  return (
    <VStack as="ol" gap={6}>
      {steps.map((step, index) => (
        <StepNumberContext key={step.key} value={index + 1}>
          {step}
        </StepNumberContext>
      ))}
    </VStack>
  );
}

export function Step({ title, children }: { title: string; children?: ReactNode }) {
  const number = use(StepNumberContext);

  return (
    <HStack as="li" gap={4} vAlign="start">
      <StackItem>
        <Center
          width="var(--spacing-8)"
          height="var(--spacing-8)"
          className="rounded-full bg-muted"
        >
          <Text weight="semibold" hasTabularNumbers>
            {number}
          </Text>
        </Center>
      </StackItem>
      <StackItem size="fill">
        <VStack gap={3}>
          <Heading level={3}>{title}</Heading>
          {children}
        </VStack>
      </StackItem>
    </HStack>
  );
}

/** A note set apart from the text, such as a page's prerequisites. */
export function Callout({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <Banner status="info" title={title} collapsible={false}>
      {children && <VStack gap={2}>{children}</VStack>}
    </Banner>
  );
}

/** Closes a guide with links on what to read next, usually a list. */
export function NextSteps({ children }: { children: ReactNode }) {
  return (
    <Card variant="muted">
      <VStack gap={2}>
        <Text weight="semibold">Next steps</Text>
        {children}
      </VStack>
    </Card>
  );
}
