import Badge from "../Badge/Badge";
import "./PokemonCard.css";

export interface PokemonCardProps {
  id: number;
  nombre: string;
  artwork: string;
  tipos: string[];
  accion?: React.ReactNode;
}

export default function PokemonCard({
  id,
  nombre,
  artwork,
  tipos,
  accion,
}: PokemonCardProps) {
  // Si tiene la prop accion, añadimos la clase modifier pokemon-card--with-action
  const cardClassName = `
  pokemon-card ${accion ? "pokemon-card--with-action" : ""}
  `;

  return (
    <article className={cardClassName}>
      <img className="pokemon-card__image" src={artwork} alt={nombre} />

      <div className="pokemon-card__header">
        <h3 className="pokemon-card__name">{nombre}</h3>

        <span className="pokemon-card__number">
          #{id.toString().padStart(4, "0")}
        </span>
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
