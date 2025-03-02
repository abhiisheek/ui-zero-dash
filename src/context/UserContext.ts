import { createContext } from "react";

interface UserContextType {
  name: string;
  email: string;
}

const UserContext = createContext<UserContextType>({
  name: "",
  email: "",
});

export { UserContext };
