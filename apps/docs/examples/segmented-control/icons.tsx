import { useState, type SVGProps } from "react";
import { GridViewIcon, ListViewIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { HStack } from "@astryxdesign/core/HStack";
import { Icon } from "@astryxdesign/core/Icon";
import { SegmentedControl, SegmentedControlItem } from "@astryxdesign/core/SegmentedControl";

// Hugeicons sets the stroke itself, so the wrappers don't take one.
function ListIcon(props: Omit<SVGProps<SVGSVGElement>, "strokeWidth">) {
  return <HugeiconsIcon icon={ListViewIcon} {...props} />;
}

function GridIcon(props: Omit<SVGProps<SVGSVGElement>, "strokeWidth">) {
  return <HugeiconsIcon icon={GridViewIcon} {...props} />;
}

export default function SegmentedControlIcons() {
  const [labelled, setLabelled] = useState("list");
  const [iconOnly, setIconOnly] = useState("list");

  return (
    <HStack gap={6} vAlign="center">
      <SegmentedControl label="Layout" value={labelled} onChange={setLabelled}>
        <SegmentedControlItem value="list" label="List" icon={<Icon icon={ListIcon} />} />
        <SegmentedControlItem value="grid" label="Grid" icon={<Icon icon={GridIcon} />} />
      </SegmentedControl>
      <SegmentedControl label="Layout" value={iconOnly} onChange={setIconOnly}>
        <SegmentedControlItem
          value="list"
          label="List"
          icon={<Icon icon={ListIcon} />}
          isLabelHidden
        />
        <SegmentedControlItem
          value="grid"
          label="Grid"
          icon={<Icon icon={GridIcon} />}
          isLabelHidden
        />
      </SegmentedControl>
    </HStack>
  );
}
