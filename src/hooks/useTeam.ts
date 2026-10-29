import { useContext } from "react";

import { TeamContext } from "../context/TeamContext";

export function useTeam() {
  const contexto = useContext(TeamContext);

  if (contexto === null) {
    throw new Error("useTeam debe utilizarse dentro de TeamProvider");
  }

  return contexto;
}
