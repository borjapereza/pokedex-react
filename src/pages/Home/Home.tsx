import "./Home.css";

import { usePokemon } from "../../hooks/usePokemon";
import PokemonGrid from "../../components/PokemonGrid/PokemonGrid";
import TypeFilters from "../../components/TypeFilters/TypeFilters";
import {
  filtrarPokemonPorTipos,
  obtenerPokemonHome,
} from "../../services/pokemonUtils";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";
import { useState } from "react";
import type { Pokemon } from "../../services/types";
import PokemonInfoCard from "../../components/PokemonInfoCard/PokemonInfoCard";
import { usePokemonDetail } from "../../hooks/usePokemonDetail";
import Loading from "../../components/Loading/Loading";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

export default function Home() {
  const [tiposSeleccionados, setTiposSeleccionados] = useState<string[]>([]);
  const [pokemonSeleccionado, setPokemonSeleccionado] =
    useState<Pokemon | null>(null);

  const cambiarTipo = (tipo: string) => {
    setTiposSeleccionados((tiposActuales) => {
      // Si ya estaba seleccionado, lo quitamos
      if (tiposActuales.includes(tipo)) {
        return tiposActuales.filter((t) => t !== tipo);
      }

      // Si todavía hay menos de dos, lo añadimos
      if (tiposActuales.length < 2) {
        return [...tiposActuales, tipo];
      }

      // Si ya hay dos, sustituimos el primero por el nuevo
      return [tiposActuales[1], tipo];
    });
  };

  const { listaPokemon } = usePokemon();

  const pokemonHome = obtenerPokemonHome(listaPokemon);

  const pokemonMostrar = filtrarPokemonPorTipos(
    pokemonHome,
    tiposSeleccionados,
  );

  const { cantidadMostrar, sentinelRef } = useInfiniteScroll(
    pokemonMostrar.length,
  );

  const pokemonVisibles = pokemonMostrar.slice(0, cantidadMostrar);

  const handlePokemonClick = (pokemon: Pokemon) => {
    setPokemonSeleccionado(pokemon);
  };

  const { pokemonDetail, error, esperando } =
    usePokemonDetail(pokemonSeleccionado);

  return (
    <main className="home">
      <h2 className="home__title">Pokédex completa</h2>
      <TypeFilters
        titulo="Filtrar por tipo"
        tiposSeleccionados={tiposSeleccionados}
        onCambiarTipo={cambiarTipo}
      />
      <PokemonGrid
        listaPokemon={pokemonVisibles}
        sentinelRef={sentinelRef}
        onPokemonClick={handlePokemonClick}
      />
      {pokemonSeleccionado && (
        <div
          className="pokemon-modal"
          onClick={() => setPokemonSeleccionado(null)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            {esperando && <Loading />}

            {error && <ErrorMessage />}

            {!esperando && pokemonDetail && (
              <PokemonInfoCard
                pokemon={pokemonDetail}
                mostrarCerrar
                onCerrar={() => setPokemonSeleccionado(null)}
              />
            )}
          </div>
        </div>
      )}
    </main>
  );
}
