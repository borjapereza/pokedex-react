import "./Home.css";

import { usePokemon } from "../../hooks/usePokemon";
import PokemonGrid from "../../components/PokemonGrid/PokemonGrid";
import TypeFilters from "../../components/TypeFilters/TypeFilters";
import { obtenerPokemonHome } from "../../services/pokemonUtils";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";

export default function Home() {
  const { listaPokemon } = usePokemon();
  
  const pokemonMostrar = obtenerPokemonHome(listaPokemon);

  const {
    cantidadMostrar,
    sentinelRef,
  } = useInfiniteScroll(pokemonMostrar.length);

  const pokemonVisibles = pokemonMostrar.slice(
    0,
    cantidadMostrar,
  );
  
  return (
    <main className="home">
      <h2 className="home__title">Pokédex completa</h2>
      <TypeFilters titulo="Filtrar por tipo" />
      <PokemonGrid
        listaPokemon={pokemonVisibles}
        sentinelRef={sentinelRef}
      />
    </main>
  );
}
