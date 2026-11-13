import { Plus } from "lucide-react";
import { Button } from "@astryxdesign/core/Button";
import { HStack } from "@astryxdesign/core/HStack";
import { Icon } from "@astryxdesign/core/Icon";

export default function ButtonWithIcon() {
  return (
    <HStack gap={3} vAlign="center">
      <Button label="Add item" icon={<Icon icon={Plus} />} />
      <Button label="Continue" variant="primary" endContent={<Icon icon="chevronRight" />} />
    </HStack>
  );
}
