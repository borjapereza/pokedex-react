import { useEffect, useState } from "react";
import { getPokemonDetail } from "../services/pokemonApi";
import type { Pokemon, PokemonDetail } from "../services/types";
import { transformarPokemonDetail } from "../services/pokemonUtils";

export interface UsePokemonDetailResultado {
  pokemonDetail: PokemonDetail | null;
  error: boolean;
  esperando: boolean;
}

export function usePokemonDetail(
  pokemonBase: Pokemon | null,
): UsePokemonDetailResultado {
  const [pokemonDetail, setPokemonDetail] = useState<PokemonDetail | null>(
    null,
  );

  const [error, setError] = useState(false);
  const [esperando, setEsperando] = useState(false);

  useEffect(() => {
    async function cargarPokemon() {
      setPokemonDetail(null);
      if (pokemonBase === null) return;

      setEsperando(true);
      setError(false);

      try {
        const datos = await getPokemonDetail(pokemonBase);
        const detalle = transformarPokemonDetail(datos, pokemonBase);

        setPokemonDetail(detalle);
      } catch {
        setError(true);
      } finally {
        setEsperando(false);
      }
    }

    cargarPokemon();
  }, [pokemonBase]);

  return { pokemonDetail, error, esperando };
}
