import { createContext, type Dispatch } from "react";

export type TeamAction =
  | {
      type: "establecer";
      posicion: number;
      pokemonId: number;
    }
  | {
      type: "quitar";
      posicion: number;
    };

export interface TeamContextType {
  equipo: (number | null)[];
  modificarEquipo: Dispatch<TeamAction>;
}

export const TeamContext = createContext<TeamContextType | null>(null);
