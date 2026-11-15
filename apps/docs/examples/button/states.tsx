import { Button } from "@astryxdesign/core/Button";
import { HStack } from "@astryxdesign/core/HStack";

// A save that takes a moment, so the spinner shows.
function save() {
  return new Promise<void>((resolve) => setTimeout(resolve, 1500));
}

export default function ButtonStates() {
  return (
    <HStack gap={3} vAlign="center">
      <Button label="Save" variant="primary" clickAction={save} />
      <Button label="Saving" variant="primary" isLoading />
      <Button label="Publish" variant="primary" isDisabled />
    </HStack>
  );
}
