import { createContext } from "react";

import { ObjectType } from "@/types";

const AppContext = createContext<ObjectType>({});

export { AppContext };
