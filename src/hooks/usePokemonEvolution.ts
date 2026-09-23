import { useEffect, useState } from "react";
import { getEvolutionChain } from "../services/pokemonApi";
import type { EvolutionBranches } from "../services/types";
import { transformarEvolutionChain } from "../services/pokemonUtils";

export interface UsePokemonEvolutionResultado {
  evolutionBranches: EvolutionBranches;
  error: boolean;
  esperando: boolean;
}

export function usePokemonEvolution(
  evolutionChainUrl: string | null,
): UsePokemonEvolutionResultado {
  const [evolutionBranches, setEvolutionBranches] = useState<EvolutionBranches>(
    [],
  );

  const [error, setError] = useState(false);
  const [esperando, setEsperando] = useState(false);

  useEffect(() => {
    async function cargarEvoluciones() {
      setEvolutionBranches([]);

      if (evolutionChainUrl === null) return;

      setEsperando(true);
      setError(false);

      try {
        const datos = await getEvolutionChain(evolutionChainUrl);

        const ramas = transformarEvolutionChain(datos);

        setEvolutionBranches(ramas);
      } catch {
        setError(true);
      } finally {
        setEsperando(false);
      }
    }

    cargarEvoluciones();
  }, [evolutionChainUrl]);

  return {
    evolutionBranches,
    error,
    esperando,
  };
}
