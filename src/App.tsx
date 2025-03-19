import { FC, useMemo } from "react";
import { BrowserRouter } from "react-router";
import { jwtDecode } from "jwt-decode";

import Router from "@/routes";
import Parent from "@/views/Parent";
import { UserContext } from "@/context/UserContext";

const App: FC = () => {
  const token = localStorage.getItem("token");

  const userDetails = useMemo(() => {
    if (token) {
      const decodedToken: any = jwtDecode(token);
      return {
        name: decodedToken?.data?.name,
        email: decodedToken?.data?.email,
      };
    }

    return { name: "", email: "" };
  }, [token]);

  return (
    <UserContext.Provider value={userDetails}>
      <BrowserRouter>
        <Parent>
          <Router />
        </Parent>
      </BrowserRouter>
    </UserContext.Provider>
  );
};

export default App;
