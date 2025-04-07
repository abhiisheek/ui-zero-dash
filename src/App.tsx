import { FC, useEffect, useMemo, useState } from "react";
import { BrowserRouter } from "react-router";
import { jwtDecode } from "jwt-decode";
import { notification } from "antd";

import Router from "@/routes";
import Parent from "@/views/Parent";
import { UserContext } from "@/context/UserContext";
import { AppContext } from "@/context/AppContext";
import constants from "@/constants/constants";
import { NotifierType } from "@/types";
import { on } from "@/utils/emitter";

const App: FC = () => {
  const token = localStorage.getItem("token");
  const [appState, setAppState] = useState<Object>({});
  const [notifierApi, notifierContextHolder] = notification.useNotification();
  const [notifier, setNotifier] = useState<any>(null);

  useEffect(() => {
    if (notifier) {
      const type = (notifier.type || constants.NOTIFIER_TYPES.INFO) as NotifierType["type"];

      notifierApi[type]({ message: notifier.message, key: notifier.id });
    }
  }, [notifier]);

  on(constants.EVENTS.SHOW_NOTIFIER, (data: any) => setNotifier(data));

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
    <AppContext.Provider value={{ state: appState, setState: setAppState }}>
      <UserContext.Provider value={userDetails}>
        <BrowserRouter>
          <Parent>
            <Router />
          </Parent>
        </BrowserRouter>
        {notifierContextHolder}
      </UserContext.Provider>
    </AppContext.Provider>
  );
};

export default App;
