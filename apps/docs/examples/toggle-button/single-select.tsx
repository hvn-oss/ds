import { useState } from "react";
import { ToggleButton, ToggleButtonGroup } from "@astryxdesign/core/ToggleButton";

export default function ToggleButtonSingleSelect() {
  const [filter, setFilter] = useState<string | null>("open");

  return (
    <ToggleButtonGroup
      label="Status filter"
      type="single"
      value={filter}
      onChange={(value) => setFilter(value as string | null)}
    >
      <ToggleButton value="open" label="Open" />
      <ToggleButton value="closed" label="Closed" />
      <ToggleButton value="all" label="All" />
    </ToggleButtonGroup>
  );
}
