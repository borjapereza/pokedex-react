import type { Pokemon } from "../../services/types";

import "./SearchSuggestionItem.css";

interface SearchSuggestionItemProps {
  pokemon: Pokemon;
  seleccionado: boolean;
  onSeleccionar: (pokemon: Pokemon) => void;
}

export default function SearchSuggestionItem({
  pokemon,
  seleccionado,
  onSeleccionar,
}: SearchSuggestionItemProps) {
  return (
    <button
      className={
        seleccionado
          ? "search-suggestion-item search-suggestion-item--selected"
          : "search-suggestion-item"
      }
      type="button"
      onMouseDown={() => onSeleccionar(pokemon)}
    >
      <img
        className="search-suggestion-item__sprite"
        src={pokemon.sprite}
        alt=""
      />

      <span className="search-suggestion-item__name">{pokemon.nombre}</span>

      {pokemon.id < 10000 && (
        <span className="search-suggestion-item__number">
          #{pokemon.id.toString().padStart(3, "0")}
        </span>
      )}
    </button>
  );
}
