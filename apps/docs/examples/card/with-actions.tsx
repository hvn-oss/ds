import { Button } from "@astryxdesign/core/Button";
import { Card } from "@astryxdesign/core/Card";
import { Heading } from "@astryxdesign/core/Heading";
import { HStack } from "@astryxdesign/core/HStack";
import { StackItem } from "@astryxdesign/core/Stack";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";

export default function CardWithActions() {
  return (
    <Card maxWidth="24rem">
      <VStack gap={4}>
        <VStack gap={2}>
          <Heading level={3}>Delete project?</Heading>
          <Text color="secondary">Its pages and history are removed for everyone.</Text>
        </VStack>
        <HStack gap={2}>
          <StackItem size="fill" />
          <Button label="Cancel" variant="ghost" />
          <Button label="Delete" variant="destructive" />
        </HStack>
      </VStack>
    </Card>
  );
}
