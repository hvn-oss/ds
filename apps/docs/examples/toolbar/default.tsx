import type { SVGProps } from "react";
import { FilterHorizontalIcon, PlusSignIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "@astryxdesign/core/Button";
import { Card } from "@astryxdesign/core/Card";
import { Icon } from "@astryxdesign/core/Icon";
import { Text } from "@astryxdesign/core/Text";
import { Toolbar } from "@astryxdesign/core/Toolbar";
import { VStack } from "@astryxdesign/core/VStack";

// Hugeicons sets the stroke itself, so the wrappers don't take one.
function FilterIcon(props: Omit<SVGProps<SVGSVGElement>, "strokeWidth">) {
  return <HugeiconsIcon icon={FilterHorizontalIcon} {...props} />;
}

function PlusIcon(props: Omit<SVGProps<SVGSVGElement>, "strokeWidth">) {
  return <HugeiconsIcon icon={PlusSignIcon} {...props} />;
}

export default function ToolbarDefault() {
  return (
    <Card width="32rem" padding={0}>
      <Toolbar
        label="Contacts"
        dividers={["bottom"]}
        startContent={<Text weight="semibold">Contacts</Text>}
        endContent={
          <>
            <Button label="Filter" variant="ghost" icon={<Icon icon={FilterIcon} />} />
            <Button label="Add contact" variant="primary" icon={<Icon icon={PlusIcon} />} />
          </>
        }
      />
      <VStack padding={4}>
        <Text color="secondary">128 contacts</Text>
      </VStack>
    </Card>
  );
}
