import { Button } from "@astryxdesign/core/Button";
import { HStack } from "@astryxdesign/core/HStack";

export default function ButtonSizes() {
  return (
    <HStack gap={3} vAlign="center">
      <Button label="Small" size="sm" />
      <Button label="Medium" size="md" />
      <Button label="Large" size="lg" />
    </HStack>
  );
}
