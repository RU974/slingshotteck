// Browser entry: hydrates the pre-rendered page into a full React app.
// After this, links navigate client-side (React Router) without full page reloads.
import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "@/App";

// Enables JS-only styles (e.g. scroll-reveal start states); content stays visible without JS.
document.documentElement.classList.add("js");

hydrateRoot(
  document.getElementById("root")!,
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
