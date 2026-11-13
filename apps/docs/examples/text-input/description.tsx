import { useState } from "react";
import { TextInput } from "@astryxdesign/core/TextInput";

export default function TextInputDescription() {
  const [email, setEmail] = useState("");

  return (
    <TextInput
      label="Email"
      type="email"
      description="We'll only use it to send you receipts."
      isRequired
      value={email}
      onChange={setEmail}
      width="20rem"
    />
  );
}
