import type { ReactNode } from "react";
import listaPokemon from "../data/pokemon.json";
import { PokemonContext } from "./PokemonContext";

interface PokemonProviderProps {
  children: ReactNode;
}

export default function PokemonProvider({ children }: PokemonProviderProps) {
  return (
    <PokemonContext.Provider
      value={{
        listaPokemon,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
}
