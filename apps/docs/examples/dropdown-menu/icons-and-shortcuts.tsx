import type { SVGProps } from "react";
import {
  Copy01Icon,
  Delete02Icon,
  PencilEdit02Icon,
  Share08Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { DropdownMenu } from "@astryxdesign/core/DropdownMenu";
import { Text } from "@astryxdesign/core/Text";

// Hugeicons sets the stroke itself, so the wrappers don't take one.
type GlyphProps = Omit<SVGProps<SVGSVGElement>, "strokeWidth">;

function EditIcon(props: GlyphProps) {
  return <HugeiconsIcon icon={PencilEdit02Icon} {...props} />;
}

function CopyIcon(props: GlyphProps) {
  return <HugeiconsIcon icon={Copy01Icon} {...props} />;
}

function ShareIcon(props: GlyphProps) {
  return <HugeiconsIcon icon={Share08Icon} {...props} />;
}

function DeleteIcon(props: GlyphProps) {
  return <HugeiconsIcon icon={Delete02Icon} {...props} />;
}

// Shortcut hints are muted supporting text, not Kbd chips.
function Shortcut({ keys }: { keys: string }) {
  return (
    <Text type="supporting" color="secondary">
      {keys}
    </Text>
  );
}

export default function DropdownMenuIconsAndShortcuts() {
  return (
    <DropdownMenu
      button={{ label: "Edit" }}
      menuWidth="13rem"
      items={[
        { label: "Rename", icon: EditIcon, endContent: <Shortcut keys="⌘R" /> },
        { label: "Duplicate", icon: CopyIcon, endContent: <Shortcut keys="⌘D" /> },
        { label: "Share", icon: ShareIcon },
        { type: "divider" },
        { label: "Delete", icon: DeleteIcon, variant: "destructive" },
      ]}
    />
  );
}
