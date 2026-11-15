import { DropdownMenu } from "@astryxdesign/core/DropdownMenu";

export default function DropdownMenuSections() {
  return (
    <DropdownMenu
      button={{ label: "Export" }}
      menuWidth="14rem"
      items={[
        {
          type: "section",
          title: "Download",
          items: [
            { label: "CSV", description: "For spreadsheets" },
            { label: "PDF", description: "For printing and sharing" },
          ],
        },
        {
          type: "section",
          title: "Send to",
          items: [{ label: "Google Sheets" }, { label: "Notion", isDisabled: true }],
        },
      ]}
    />
  );
}
