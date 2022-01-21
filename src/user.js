import { useState } from "react";

const user_ = {
  name: "John Doe",
  account: 300,
};

export function useUserStore() {
  const [user, setUser] = useState(user_);
  return { user, setUser };
}
