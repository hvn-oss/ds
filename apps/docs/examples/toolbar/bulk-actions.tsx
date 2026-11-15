import { Button } from "@astryxdesign/core/Button";
import { Card } from "@astryxdesign/core/Card";
import { MoreMenu } from "@astryxdesign/core/MoreMenu";
import { Text } from "@astryxdesign/core/Text";
import { Toolbar } from "@astryxdesign/core/Toolbar";
import { VStack } from "@astryxdesign/core/VStack";

export default function ToolbarBulkActions() {
  return (
    <Card width="32rem" padding={0}>
      <Toolbar
        label="Bulk actions"
        size="sm"
        variant="muted"
        dividers={["bottom"]}
        startContent={<Text weight="medium">3 selected</Text>}
        endContent={
          <>
            <Button label="Archive" />
            <Button label="Delete" variant="destructive" />
            <MoreMenu
              label="More bulk actions"
              alignment="end"
              items={[{ label: "Export" }, { label: "Add to list" }]}
            />
          </>
        }
      />
      <VStack padding={4}>
        <Text color="secondary">128 contacts</Text>
      </VStack>
    </Card>
  );
}
