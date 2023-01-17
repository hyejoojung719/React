import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "styled-components";
import App from "./App";

import { theme } from "./theme";

const queryClient = new QueryClient();

// React 18 버전은 ReactDom지원 X
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  // queryClient안에 있는 모든 것은 queryClient에 접근 가능
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </QueryClientProvider>
);
