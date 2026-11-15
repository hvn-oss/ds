import { useState, type SVGProps } from "react";
import { TextBoldIcon, TextItalicIcon, TextUnderlineIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Icon } from "@astryxdesign/core/Icon";
import { ToggleButton, ToggleButtonGroup } from "@astryxdesign/core/ToggleButton";

// Hugeicons sets the stroke itself, so the wrappers don't take one.
type GlyphProps = Omit<SVGProps<SVGSVGElement>, "strokeWidth">;

function BoldIcon(props: GlyphProps) {
  return <HugeiconsIcon icon={TextBoldIcon} {...props} />;
}

function ItalicIcon(props: GlyphProps) {
  return <HugeiconsIcon icon={TextItalicIcon} {...props} />;
}

function UnderlineIcon(props: GlyphProps) {
  return <HugeiconsIcon icon={TextUnderlineIcon} {...props} />;
}

export default function ToggleButtonGroupExample() {
  const [styles, setStyles] = useState<string[]>(["bold"]);

  return (
    <ToggleButtonGroup
      label="Text style"
      type="multiple"
      value={styles}
      onChange={(value) => setStyles(value as string[])}
    >
      <ToggleButton value="bold" label="Bold" icon={<Icon icon={BoldIcon} />} />
      <ToggleButton value="italic" label="Italic" icon={<Icon icon={ItalicIcon} />} />
      <ToggleButton value="underline" label="Underline" icon={<Icon icon={UnderlineIcon} />} />
    </ToggleButtonGroup>
  );
}
