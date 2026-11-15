import type { SVGProps } from "react";
import { RedoIcon as RedoGlyph, UndoIcon as UndoGlyph } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { ButtonGroup } from "@astryxdesign/core/ButtonGroup";
import { Icon } from "@astryxdesign/core/Icon";
import { IconButton } from "@astryxdesign/core/IconButton";

// Hugeicons sets the stroke itself, so the wrappers don't take one.
function UndoIcon(props: Omit<SVGProps<SVGSVGElement>, "strokeWidth">) {
  return <HugeiconsIcon icon={UndoGlyph} {...props} />;
}

function RedoIcon(props: Omit<SVGProps<SVGSVGElement>, "strokeWidth">) {
  return <HugeiconsIcon icon={RedoGlyph} {...props} />;
}

export default function ButtonGroupIconButtons() {
  return (
    <ButtonGroup label="History">
      <IconButton label="Undo" icon={<Icon icon={UndoIcon} />} />
      <IconButton label="Redo" icon={<Icon icon={RedoIcon} />} />
    </ButtonGroup>
  );
}
