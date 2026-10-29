import { useReducer, type ReactNode } from "react";

import { TeamContext, type TeamAction } from "./TeamContext";

interface TeamProviderProps {
  children: ReactNode;
}

const equipoInicial: (number | null)[] = [null, null, null, null, null, null];

function reducer(
  equipo: (number | null)[],
  accion: TeamAction,
): (number | null)[] {
  switch (accion.type) {
    case "establecer": {
      const nuevoEquipo = [...equipo];
      nuevoEquipo[accion.posicion] = accion.pokemonId;
      return nuevoEquipo;
    }

    case "quitar": {
      const nuevoEquipo = [...equipo];
      nuevoEquipo[accion.posicion] = null;
      return nuevoEquipo;
    }

    default:
      return equipo;
  }
}

export default function TeamProvider({ children }: TeamProviderProps) {
  const [equipo, modificarEquipo] = useReducer(reducer, equipoInicial);

  return (
    <TeamContext.Provider value={{ equipo, modificarEquipo }}>
      {children}
    </TeamContext.Provider>
  );
}
