import { Button } from "@astryxdesign/core/Button";
import { Card } from "@astryxdesign/core/Card";
import { Heading } from "@astryxdesign/core/Heading";
import { HStack } from "@astryxdesign/core/HStack";
import { MoreMenu } from "@astryxdesign/core/MoreMenu";
import { StackItem } from "@astryxdesign/core/Stack";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";

export default function MoreMenuInACard() {
  return (
    <Card width="22rem">
      <VStack gap={3}>
        <HStack gap={2} vAlign="center">
          <Heading level={3}>Q3 planning</Heading>
          <StackItem size="fill" />
          <MoreMenu
            label="Document options"
            alignment="end"
            items={[
              { label: "Duplicate" },
              { label: "Export as PDF" },
              { type: "divider" },
              { label: "Delete", variant: "destructive" },
            ]}
          />
        </HStack>
        <Text color="secondary">Goals, owners and dates for the next quarter.</Text>
        <HStack>
          <Button label="Open" />
        </HStack>
      </VStack>
    </Card>
  );
}
