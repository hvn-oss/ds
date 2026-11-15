import { Button } from "@astryxdesign/core/Button";
import { ButtonGroup } from "@astryxdesign/core/ButtonGroup";

export default function ButtonGroupDefault() {
  return (
    <ButtonGroup label="Zoom">
      <Button label="Zoom out" />
      <Button label="100%" />
      <Button label="Zoom in" />
    </ButtonGroup>
  );
}
