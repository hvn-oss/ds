import { Card } from "@astryxdesign/core/Card";
import { Center } from "@astryxdesign/core/Center";
import { ContextMenu } from "@astryxdesign/core/ContextMenu";
import { Text } from "@astryxdesign/core/Text";

export default function ContextMenuSections() {
  return (
    <ContextMenu
      label="Contact actions"
      menuWidth="12rem"
      items={[
        {
          type: "section",
          title: "Contact",
          items: [{ label: "Send email" }, { label: "Copy email address" }],
        },
        {
          type: "section",
          title: "Organise",
          items: [
            { label: "Add to list", items: [{ label: "Customers" }, { label: "Leads" }] },
            { label: "Archive" },
          ],
        },
      ]}
    >
      <Card variant="muted" padding={0}>
        <Center width="18rem" minHeight="9rem" padding={4}>
          <Text color="secondary">Right-click Ada Lovelace</Text>
        </Center>
      </Card>
    </ContextMenu>
  );
}
