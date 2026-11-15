import { useState } from "react";
import { SegmentedControl, SegmentedControlItem } from "@astryxdesign/core/SegmentedControl";
import { VStack } from "@astryxdesign/core/VStack";

export default function SegmentedControlFill() {
  const [plan, setPlan] = useState("monthly");

  return (
    <VStack width="100%" maxWidth="22rem">
      <SegmentedControl label="Billing period" value={plan} onChange={setPlan} layout="fill">
        <SegmentedControlItem value="monthly" label="Monthly" />
        <SegmentedControlItem value="yearly" label="Yearly" />
      </SegmentedControl>
    </VStack>
  );
}
