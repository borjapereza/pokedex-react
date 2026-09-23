import "./PokemonDetail.css";
import { useParams } from "react-router-dom";

import { usePokemon } from "../../hooks/usePokemon";

import PokemonInfoCard from "../../components/PokemonInfoCard/PokemonInfoCard";
import { usePokemonDetail } from "../../hooks/usePokemonDetail";
import Loading from "../../components/Loading/Loading";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { usePokemonEvolution } from "../../hooks/usePokemonEvolution";
import { obtenerEvolucionesPokemon } from "../../services/pokemonUtils";
import EvolutionCard from "../../components/EvolutionCard/EvolutionCard";

export default function PokemonDetail() {
  const { id } = useParams();

  const { listaPokemon } = usePokemon();

  const pokemonBase =
    listaPokemon.find((pokemon) => pokemon.id === Number(id)) ?? null;

  const { pokemonDetail, error, esperando } = usePokemonDetail(pokemonBase);

  const {
    evolutionBranches,
    error: errorEvolution,
    esperando: esperandoEvolution,
  } = usePokemonEvolution(pokemonDetail?.evolutionChainUrl ?? null);

  const evolutionInfo =
    pokemonDetail && !esperandoEvolution && !errorEvolution
      ? obtenerEvolucionesPokemon(pokemonDetail, evolutionBranches)
      : null;

  const pokemonEvoluciones = evolutionInfo
    ? listaPokemon.filter((pokemon) =>
        evolutionInfo.evoluciones.includes(pokemon.id),
      )
    : [];

  const pokemonPreevoluciones = evolutionInfo
    ? listaPokemon.filter((pokemon) =>
        evolutionInfo.preevoluciones.includes(pokemon.id),
      )
    : [];

  return (
    <main className="pokemon-detail">
      {esperando && <Loading />}

      {error && <ErrorMessage />}

      {!esperando && !error && pokemonDetail && (
        <div className="pokemon-detail-content">
          <PokemonInfoCard pokemon={pokemonDetail} />

          <div className="pokemon-evolutions">
            {!esperandoEvolution && !errorEvolution && (
              <>
                {pokemonPreevoluciones.length > 0 && (
                  <EvolutionCard
                    titulo="Preevoluciones"
                    pokemonArbolEvoluciones={pokemonPreevoluciones}
                  />
                )}

                {pokemonEvoluciones.length > 0 && (
                  <EvolutionCard
                    titulo="Evoluciones"
                    pokemonArbolEvoluciones={pokemonEvoluciones}
                  />
                )}
              </>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
