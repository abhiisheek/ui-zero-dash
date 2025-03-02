import { FC } from "react";
import { BrowserRouter } from "react-router";

import Router from "@/routes";
import Parent from "@/views/Parent";
import { UserContext } from "./context/UserContext";

const App: FC = () => {
  return (
    <UserContext.Provider value={{ name: "User 1", email: "user1@zerodash.com" }}>
      <BrowserRouter>
        <Parent>
          <Router />
        </Parent>
      </BrowserRouter>
    </UserContext.Provider>
  );
};

export default App;
