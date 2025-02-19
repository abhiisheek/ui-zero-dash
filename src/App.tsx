import { FC } from "react";
import { BrowserRouter } from "react-router";

import Router from "@/routes";
import Parent from "@/views/Parent";

const App: FC = () => {
  return (
    <BrowserRouter>
      <Parent>
        <Router />
      </Parent>
    </BrowserRouter>
  );
};

export default App;
