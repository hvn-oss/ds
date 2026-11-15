import { DropdownMenu } from "@astryxdesign/core/DropdownMenu";

export default function DropdownMenuDefault() {
  return (
    <DropdownMenu
      button={{ label: "Sort by" }}
      menuWidth="10rem"
      items={[{ label: "Name" }, { label: "Date created" }, { label: "Last updated" }]}
    />
  );
}
