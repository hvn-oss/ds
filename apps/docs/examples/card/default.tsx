import { Card } from "@astryxdesign/core/Card";
import { Heading } from "@astryxdesign/core/Heading";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";

export default function CardDefault() {
  return (
    <Card maxWidth="20rem">
      <VStack gap={2}>
        <Heading level={3}>Weekly report</Heading>
        <Text color="secondary">Sign-ups grew 12% this week, led by the new onboarding flow.</Text>
      </VStack>
    </Card>
  );
}
