import "./PokemonDetail.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { usePokemon } from "../../hooks/usePokemon";
import { getPokemonDetail } from "../../services/pokemonApi";
import type { PokemonDetail } from "../../services/types";

import PokemonInfoCard from "../../components/PokemonInfoCard/PokemonInfoCard";

export default function PokemonDetail() {
  const { id } = useParams();

  const { listaPokemon } = usePokemon();

  const [pokemonDetalle, setPokemonDetalle] = useState<PokemonDetail | null>(
    null,
  );

  useEffect(() => {
    async function cargarPokemon() {
      const pokemonBase = listaPokemon.find(
        (pokemon) => pokemon.id === Number(id),
      );

      if (!pokemonBase) return;

      const detalle = await getPokemonDetail(pokemonBase);

      setPokemonDetalle(detalle);
    }

    cargarPokemon();
  }, [id, listaPokemon]);

  if (!pokemonDetalle) {
    return <p>Pokemon no encontrado</p>;
  }

  return (
    <main className="pokemon-detail">
      <PokemonInfoCard pokemon={pokemonDetalle} />
    </main>
  );
}
