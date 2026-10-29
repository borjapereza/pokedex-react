import type { Pokemon } from "../../services/types";

import "./TeamPokemonOption.css";

interface TeamPokemonOptionProps {
  pokemon: Pokemon;
  onSeleccionar: (pokemon: Pokemon) => void;
}

export default function TeamPokemonOption({
  pokemon,
  onSeleccionar,
}: TeamPokemonOptionProps) {
  return (
    <button
      className="team-pokemon-option"
      type="button"
      onClick={() => onSeleccionar(pokemon)}
    >
      <img src={pokemon.artwork} alt="" />
      <span>{pokemon.nombre}</span>
    </button>
  );
}
