import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";
import PokemonProvider from "./context/PokemonProvider";
import TeamProvider from "./context/TeamProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <PokemonProvider>
        <TeamProvider>
          <App />
        </TeamProvider>
      </PokemonProvider>
    </BrowserRouter>
  </StrictMode>,
);
