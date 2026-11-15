import type { SVGProps } from "react";
import { PlusSignIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "@astryxdesign/core/Button";
import { HStack } from "@astryxdesign/core/HStack";
import { Icon } from "@astryxdesign/core/Icon";

// Hugeicons sets the stroke itself, so the wrapper doesn't take one.
function PlusIcon(props: Omit<SVGProps<SVGSVGElement>, "strokeWidth">) {
  return <HugeiconsIcon icon={PlusSignIcon} {...props} />;
}

export default function ButtonWithIcon() {
  return (
    <HStack gap={3} vAlign="center">
      <Button label="Add item" icon={<Icon icon={PlusIcon} />} />
      <Button label="Continue" variant="primary" endContent={<Icon icon="chevronRight" />} />
    </HStack>
  );
}
