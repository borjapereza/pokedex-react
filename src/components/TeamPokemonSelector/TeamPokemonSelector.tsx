import { useMemo, useState } from "react";

import { usePokemon } from "../../hooks/usePokemon";
import type { Pokemon } from "../../services/types";
import TeamPokemonOption from "../TeamPokemonOption/TeamPokemonOption";

import "./TeamPokemonSelector.css";

interface TeamPokemonSelectorProps {
  titulo: string;
  puedeQuitar: boolean;
  onSeleccionar: (pokemon: Pokemon) => void;
  onQuitar: () => void;
}

export default function TeamPokemonSelector({
  titulo,
  puedeQuitar,
  onSeleccionar,
  onQuitar,
}: TeamPokemonSelectorProps) {
  const [textoBusqueda, setTextoBusqueda] = useState("");
  const { listaPokemon } = usePokemon();

  const resultados = useMemo(() => {
    const texto = textoBusqueda.trim().toLowerCase();

    if (!texto) {
      return [];
    }

    return listaPokemon
      .filter((pokemon) => {
        const coincideNombre = pokemon.nombre.toLowerCase().includes(texto);
        const coincideId =
          pokemon.id.toString() === texto ||
          pokemon.id.toString().padStart(3, "0") === texto;

        return coincideNombre || coincideId;
      })
      .slice(0, 4);
  }, [textoBusqueda, listaPokemon]);

  return (
    <div className="team-pokemon-selector">
      <h2>{titulo}</h2>

      <input
        className="team-pokemon-selector__input"
        type="text"
        placeholder="Buscar Pokémon..."
        value={textoBusqueda}
        onChange={(e) => setTextoBusqueda(e.target.value)}
        autoFocus
      />

      {!textoBusqueda.trim() && puedeQuitar && (
        <button
          className="team-pokemon-selector__remove"
          type="button"
          onClick={onQuitar}
        >
          <img src="/pokeball.svg" alt="" />
          <span>Dejar hueco libre</span>
        </button>
      )}

      <div className="team-pokemon-selector__results">
        {resultados.map((pokemon) => (
          <TeamPokemonOption
            key={pokemon.id}
            pokemon={pokemon}
            onSeleccionar={onSeleccionar}
          />
        ))}
      </div>

      {textoBusqueda.trim() !== "" && resultados.length === 0 && (
        <p className="team-pokemon-selector__empty">
          No se han encontrado Pokémon.
        </p>
      )}
    </div>
  );
}
