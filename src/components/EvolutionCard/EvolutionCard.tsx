import "./EvolutionCard.css";
import type { EvolutionCardProps } from "../../services/types";
import EvolutionPokemon from "../EvolutionPokemon/EvolutionPokemon";

export default function EvolutionCard({
  titulo,
  pokemonArbolEvoluciones,
}: EvolutionCardProps) {
  return (
    <section className="evolution-card">
      <h2>{titulo}</h2>

      <div className="evolution-card__pokemon">
        {pokemonArbolEvoluciones.map((pokemon) => (
          <EvolutionPokemon key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </section>
  );
}
