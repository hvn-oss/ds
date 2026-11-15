import { Button } from "@astryxdesign/core/Button";
import { ButtonGroup } from "@astryxdesign/core/ButtonGroup";
import { DropdownMenu } from "@astryxdesign/core/DropdownMenu";
import { Icon } from "@astryxdesign/core/Icon";
import { IconButton } from "@astryxdesign/core/IconButton";

export default function ButtonGroupSplitButton() {
  return (
    <ButtonGroup label="Save">
      <Button label="Save" variant="primary" />
      <DropdownMenu
        items={[{ label: "Save as draft" }, { label: "Save as template" }]}
        alignment="end"
        renderTrigger={(props) => (
          <IconButton
            {...props}
            label="More ways to save"
            variant="primary"
            icon={<Icon icon="chevronDown" />}
          />
        )}
      />
    </ButtonGroup>
  );
}
