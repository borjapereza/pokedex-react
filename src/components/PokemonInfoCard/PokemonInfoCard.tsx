import type { PokemonDetail } from "../../services/types";
import Badge from "../Badge/Badge";
import PokemonStats from "../PokemonStats/PokemonStats";
import "./PokemonInfoCard.css";

interface PokemonInfoCardProps {
  pokemon: PokemonDetail;
  mostrarCerrar?: boolean;
  onCerrar?: () => void;
}

export default function PokemonInfoCard({
  pokemon,
  mostrarCerrar = false,
  onCerrar,
}: PokemonInfoCardProps) {
  return (
    <article className="pokemon-info-card">
      <header className="pokemon-info-card__header">
        <h2 className="pokemon-info-card__title">{pokemon.nombre}</h2>

        <span className="pokemon-info-card__number">
          #{pokemon.id.toString().padStart(4, "0")}
        </span>

        {mostrarCerrar && (
          <button
            className="pokemon-info-card__close"
            onClick={onCerrar}
            aria-label="Cerrar detalle del Pokémon"
          >
            ✕
          </button>
        )}
      </header>

      <div className="pokemon-info-card__body">
        <div className="pokemon-info-card__left">
          <img
            className="pokemon-info-card__image"
            src={pokemon.artwork}
            alt={pokemon.nombre}
          />

          <div className="pokemon-info-card__types">
            {pokemon.tipos.map((tipo) => (
              <Badge key={tipo} tipo={tipo} />
            ))}
          </div>
        </div>

        <div className="pokemon-info-card__right">
          <h3 className="pokemon-info-card__genus">{pokemon.genero}</h3>

          <p className="pokemon-info-card__description">
            {pokemon.descripcion}
          </p>

          <PokemonStats stats={pokemon.stats} />

          <div className="pokemon-info-card__abilities">
            <span className="pokemon-info-card__label">Habilidades:</span>

            <ul>
              {pokemon.habilidades.map((habilidad) => (
                <li key={habilidad.nombre}>
                  {habilidad.nombre}
                  {habilidad.oculta && " (Oculta)"}
                </li>
              ))}
            </ul>
          </div>

          <div className="pokemon-info-card__measurements">
            <span>Altura: {pokemon.altura} m</span>

            <span>Peso: {pokemon.peso} kg</span>
          </div>
        </div>
      </div>
    </article>
  );
}
