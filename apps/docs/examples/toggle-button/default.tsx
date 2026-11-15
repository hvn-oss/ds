import { useState, type SVGProps } from "react";
import { StarIcon as StarGlyph } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Icon } from "@astryxdesign/core/Icon";
import { ToggleButton } from "@astryxdesign/core/ToggleButton";

// Hugeicons sets the stroke itself, so the wrapper doesn't take one.
function StarIcon(props: Omit<SVGProps<SVGSVGElement>, "strokeWidth">) {
  return <HugeiconsIcon icon={StarGlyph} {...props} />;
}

export default function ToggleButtonDefault() {
  const [isStarred, setIsStarred] = useState(false);

  return (
    <ToggleButton
      label="Star"
      icon={<Icon icon={StarIcon} />}
      isPressed={isStarred}
      onPressedChange={setIsStarred}
    >
      Star
    </ToggleButton>
  );
}
