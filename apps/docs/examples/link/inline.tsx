import { Link } from "@astryxdesign/core/Link";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";

export default function LinkInline() {
  return (
    <VStack gap={3} maxWidth="26rem">
      <Text as="p" display="block">
        Invoices are sent on the first of each month. You can change this in your{" "}
        <Link href="#" hasUnderline>
          billing settings
        </Link>
        .
      </Text>
      <Text as="p" display="block" type="supporting" color="secondary">
        Need a copy for your records?{" "}
        <Link href="#" hasUnderline>
          Download past invoices
        </Link>
        .
      </Text>
    </VStack>
  );
}
