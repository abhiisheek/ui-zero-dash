import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider } from "antd";
import "@ant-design/v5-patch-for-react-19";

import "@/index.css";
import App from "@/App.tsx";
import queryClient from "@/query/index.ts";
import theme from "@/theme/index.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConfigProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
    </ConfigProvider>
  </StrictMode>,
);
