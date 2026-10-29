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
import NotFound from "../NotFound/NotFound";

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
    ? evolutionInfo.evoluciones
        .map((id) => listaPokemon.find((pokemon) => pokemon.id === id))
        .filter((pokemon) => pokemon !== undefined)
    : [];

  const pokemonPreevoluciones = evolutionInfo
    ? evolutionInfo.preevoluciones
        .map((id) => listaPokemon.find((pokemon) => pokemon.id === id))
        .filter((pokemon) => pokemon !== undefined)
    : [];

  if (!pokemonBase) {
    return <NotFound />;
  }

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
