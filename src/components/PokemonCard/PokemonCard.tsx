import Badge from "../Badge/Badge";
import "./PokemonCard.css";

export interface PokemonCardProps {
  id: number | null;
  nombre: string;
  artwork: string;
  tipos: string[];
  accion?: React.ReactNode;
  onClick?: () => void;
}

export default function PokemonCard({
  id,
  nombre,
  artwork,
  tipos,
  accion,
  onClick,
}: PokemonCardProps) {
  // Si tiene la prop acción, añadimos la clase modifier Pokémon-card--with-action
  // Null para mi equipo hueco vacío
  const cardClassName = `
  pokemon-card
  ${accion ? "pokemon-card--with-action" : ""}
  ${id === null ? "pokemon-card--empty" : ""}
`;

  return (
    <article className={cardClassName} onClick={onClick}>
      <img className="pokemon-card__image" src={artwork} alt={nombre} />

      <div className="pokemon-card__header">
        <h3 className="pokemon-card__name">{nombre}</h3>

        {id !== null && (
          <span className="pokemon-card__number">
            #{id.toString().padStart(4, "0")}
          </span>
        )}
      </div>

      <div className="pokemon-card__types">
        {tipos.map((tipo) => (
          <Badge key={tipo} tipo={tipo} />
        ))}
      </div>

      {accion}
    </article>
  );
}
