import type { Pokemon } from "../../services/types";

import SearchSuggestionItem from "../SearchSuggestionItem/SearchSuggestionItem";

import "./SearchSuggestions.css";

interface SearchSuggestionsProps {
  resultados: Pokemon[];
  indiceSeleccionado: number;
  onSeleccionar: (pokemon: Pokemon) => void;
}

export default function SearchSuggestions({
  resultados,
  indiceSeleccionado,
  onSeleccionar,
}: SearchSuggestionsProps) {
  if (resultados.length === 0) {
    return null;
  }

  return (
    <div className="search-suggestions">
      {resultados.map((pokemon, indice) => (
        <SearchSuggestionItem
          key={pokemon.id}
          pokemon={pokemon}
          seleccionado={indice === indiceSeleccionado}
          onSeleccionar={onSeleccionar}
        />
      ))}
    </div>
  );
}
