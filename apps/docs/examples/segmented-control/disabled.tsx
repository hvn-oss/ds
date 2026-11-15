import { useState } from "react";
import { SegmentedControl, SegmentedControlItem } from "@astryxdesign/core/SegmentedControl";

export default function SegmentedControlDisabled() {
  const [range, setRange] = useState("week");

  return (
    <SegmentedControl
      label="Date range"
      value={range}
      onChange={setRange}
      isDisabled
      disabledMessage="Pick a report first"
    >
      <SegmentedControlItem value="day" label="Day" />
      <SegmentedControlItem value="week" label="Week" />
      <SegmentedControlItem value="month" label="Month" />
    </SegmentedControl>
  );
}
