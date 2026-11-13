import { Card } from "@astryxdesign/core/Card";
import { HStack } from "@astryxdesign/core/HStack";
import { Text } from "@astryxdesign/core/Text";

export default function CardVariants() {
  return (
    <HStack gap={3}>
      <Card>
        <Text>Default</Text>
      </Card>
      <Card variant="muted">
        <Text>Muted</Text>
      </Card>
      <Card variant="purple">
        <Text>Purple</Text>
      </Card>
    </HStack>
  );
}
