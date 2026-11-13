import { useState } from "react";
import { TextInput } from "@astryxdesign/core/TextInput";

export default function TextInputValidation() {
  const [username, setUsername] = useState("ada lovelace");
  const hasSpaces = username.includes(" ");

  return (
    <TextInput
      label="Username"
      value={username}
      onChange={setUsername}
      status={hasSpaces ? { type: "error", message: "Usernames can't contain spaces." } : undefined}
      width="20rem"
    />
  );
}
