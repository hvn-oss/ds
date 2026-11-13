import { useState } from "react";
import { TextInput } from "@astryxdesign/core/TextInput";

export default function TextInputDefault() {
  const [name, setName] = useState("");

  return (
    <TextInput
      label="Name"
      placeholder="Ada Lovelace"
      value={name}
      onChange={setName}
      width="20rem"
    />
  );
}
