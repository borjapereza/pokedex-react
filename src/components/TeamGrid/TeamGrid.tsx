import { useState } from "react";

import { usePokemon } from "../../hooks/usePokemon";
import { usePokemonDetail } from "../../hooks/usePokemonDetail";
import { useTeam } from "../../hooks/useTeam";
import type { Pokemon } from "../../services/types";

import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loading from "../Loading/Loading";
import PokemonCard from "../PokemonCard/PokemonCard";
import PokemonInfoCard from "../PokemonInfoCard/PokemonInfoCard";
import PokemonModal from "../PokemonModal/PokemonModal";
import TeamPokemonSelector from "../TeamPokemonSelector/TeamPokemonSelector";

import "./TeamGrid.css";

export default function TeamGrid() {
  const { equipo, modificarEquipo } = useTeam();
  const { listaPokemon } = usePokemon();

  const [pokemonSeleccionado, setPokemonSeleccionado] =
    useState<Pokemon | null>(null);

  const [posicionSeleccionada, setPosicionSeleccionada] = useState<
    number | null
  >(null);

  const handlePokemonClick = (pokemon: Pokemon) => {
    setPosicionSeleccionada(null);
    setPokemonSeleccionado(pokemon);
  };

  const abrirSelector = (posicion: number) => {
    setPokemonSeleccionado(null);
    setPosicionSeleccionada(posicion);
  };

  const seleccionarPokemon = (pokemon: Pokemon) => {
    if (posicionSeleccionada === null) {
      return;
    }

    modificarEquipo({
      type: "establecer",
      posicion: posicionSeleccionada,
      pokemonId: pokemon.id,
    });

    setPosicionSeleccionada(null);
  };

  const quitarPokemon = () => {
    if (posicionSeleccionada === null) {
      return;
    }

    modificarEquipo({
      type: "quitar",
      posicion: posicionSeleccionada,
    });

    setPosicionSeleccionada(null);
  };

  const { pokemonDetail, error, esperando } =
    usePokemonDetail(pokemonSeleccionado);

  return (
    <>
      <div className="team-grid">
        {equipo.map((pokemonId, posicion) => {
          const pokemon = listaPokemon.find(
            (pokemon) => pokemon.id === pokemonId,
          );

          if (pokemonId === null || !pokemon) {
            return (
              <PokemonCard
                key={posicion}
                id={null}
                nombre="Sin asignar"
                artwork="/pokeball.svg"
                tipos={[]}
                accion={
                  <button
                    className="pokemon-card__button"
                    type="button"
                    onClick={() => abrirSelector(posicion)}
                  >
                    Añadir
                  </button>
                }
              />
            );
          }

          return (
            <PokemonCard
              key={pokemon.id}
              id={pokemon.id}
              nombre={pokemon.nombre}
              artwork={pokemon.artwork}
              tipos={pokemon.tipos}
              onClick={() => handlePokemonClick(pokemon)}
              accion={
                <button
                  className="pokemon-card__button"
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    abrirSelector(posicion);
                  }}
                >
                  Gestionar
                </button>
              }
            />
          );
        })}
      </div>

      {posicionSeleccionada !== null && (
        <PokemonModal onCerrar={() => setPosicionSeleccionada(null)}>
          <TeamPokemonSelector
            titulo={
              equipo[posicionSeleccionada] === null
                ? "Añadir Pokémon"
                : "Gestionar Pokémon"
            }
            puedeQuitar={equipo[posicionSeleccionada] !== null}
            onSeleccionar={seleccionarPokemon}
            onQuitar={quitarPokemon}
          />
        </PokemonModal>
      )}

      {pokemonSeleccionado && (
        <PokemonModal onCerrar={() => setPokemonSeleccionado(null)}>
          {esperando && <Loading />}

          {error && <ErrorMessage />}

          {!esperando && pokemonDetail && (
            <PokemonInfoCard
              pokemon={pokemonDetail}
              esModal
              onCerrar={() => setPokemonSeleccionado(null)}
            />
          )}
        </PokemonModal>
      )}
    </>
  );
}
