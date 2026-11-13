import { Button } from "@astryxdesign/core/Button";
import { HStack } from "@astryxdesign/core/HStack";

export default function ButtonVariants() {
  return (
    <HStack gap={3} vAlign="center">
      <Button label="Primary" variant="primary" />
      <Button label="Secondary" variant="secondary" />
      <Button label="Ghost" variant="ghost" />
      <Button label="Destructive" variant="destructive" />
    </HStack>
  );
}
