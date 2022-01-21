import { useState } from "react";

const user_ = {
  name: "John Doe",
  account: 300,
};

export function useStore() {
  const [persona, setPersona] = useState(user_);
  return { persona, setPersona };
}
