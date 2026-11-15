import { Card } from "@astryxdesign/core/Card";
import { Center } from "@astryxdesign/core/Center";
import { ContextMenu } from "@astryxdesign/core/ContextMenu";
import { Text } from "@astryxdesign/core/Text";

export default function ContextMenuDefault() {
  return (
    <ContextMenu
      label="File actions"
      items={[
        { label: "Rename" },
        { label: "Duplicate" },
        { type: "divider" },
        { label: "Delete", variant: "destructive" },
      ]}
    >
      <Card variant="muted" padding={0}>
        <Center width="18rem" minHeight="9rem" padding={4}>
          <Text color="secondary">Right-click here</Text>
        </Center>
      </Card>
    </ContextMenu>
  );
}
