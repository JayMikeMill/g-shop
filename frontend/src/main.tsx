import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AppProviders } from "./AppProviders";

// Import component-specific CSS
import "@styles/globals.css";

import App from "./App";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AppProviders>
      <StrictMode>
        <App />
      </StrictMode>
    </AppProviders>
  </BrowserRouter>
);
