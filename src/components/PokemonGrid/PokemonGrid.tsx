import type { RefObject } from "react";

import type { Pokemon } from "../../services/types";

import PokemonCard from "../PokemonCard/PokemonCard";

import "./PokemonGrid.css";

export interface PokemonGridProps {
  listaPokemon: Pokemon[];
  sentinelRef: RefObject<HTMLDivElement | null>;
}

export default function PokemonGrid({
  listaPokemon,
  sentinelRef,
}: PokemonGridProps) {
  return (
    <>
      <div className="pokemon-grid">
        {listaPokemon.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            id={pokemon.id}
            nombre={pokemon.nombre}
            artwork={pokemon.artwork}
            tipos={pokemon.tipos}
          />
        ))}
      </div>

      <div
        ref={sentinelRef}
        className="pokemon-grid__sentinel"
      />
    </>
  );
}