import {
  TEXTOS_EFECTIVIDAD_ATAQUE,
  TEXTOS_EFECTIVIDAD_DEFENSA,
} from "../../services/constants";
import Badge from "../Badge/Badge";
import "./EffectivenessCard.css";

interface EffectivenessCardProps {
  modo: string;
  multiplicador: number;
  tipos: string[];
}

export default function EffectivenessCard({
  modo,
  multiplicador,
  tipos,
}: EffectivenessCardProps) {
  const texto =
    modo === "attack"
      ? TEXTOS_EFECTIVIDAD_ATAQUE[multiplicador]
      : TEXTOS_EFECTIVIDAD_DEFENSA[multiplicador];

  return (
    <article className="effectiveness-card">
      <h3 className="effectiveness-card__title">{texto}</h3>

      <div className="effectiveness-card__types">
        {tipos.map((tipo) => (
          <Badge key={tipo} tipo={tipo} />
        ))}
      </div>
    </article>
  );
}
