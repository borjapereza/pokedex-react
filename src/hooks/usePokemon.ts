import { useContext } from "react";

import { PokemonContext } from "../context/PokemonContext";

export function usePokemon() {
  const contexto = useContext(PokemonContext);

  if (contexto === null) {
    throw new Error(
      "usePokemon debe utilizarse dentro de PokemonProvider",
    );
  }

  return contexto;
}