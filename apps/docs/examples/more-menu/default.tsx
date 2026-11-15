import { MoreMenu } from "@astryxdesign/core/MoreMenu";

export default function MoreMenuDefault() {
  return (
    <MoreMenu
      alignment="end"
      items={[
        { label: "Rename" },
        { label: "Move to folder" },
        { type: "divider" },
        { label: "Delete", variant: "destructive" },
      ]}
    />
  );
}
