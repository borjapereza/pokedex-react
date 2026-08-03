import { createContext } from "react";
import type { Pokemon } from "../services/types";

export interface PokemonContextType {
  listaPokemon: Pokemon[];
}

export const PokemonContext = createContext<PokemonContextType | null>(null);