import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// root 문제 => as HTMLElement 추가
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
