import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import EthProvider from "./contexts/EthContext/EthProvider";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <EthProvider>
    <App />
  </EthProvider>
);
