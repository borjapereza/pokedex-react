import "./EvolutionPokemon.css";
import type { Pokemon } from "../../services/types";
import { Link } from "react-router-dom";

export default function EvolutionPokemon({ pokemon }: { pokemon: Pokemon }) {
  return (
    <Link className="evolution-pokemon" to={`/pokemon/${pokemon.id}`}>
      <img src={pokemon.artwork} alt={pokemon.nombre} />
      <span>{pokemon.nombre}</span>
    </Link>
  );
}
