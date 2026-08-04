import { traducirTipo } from "../../services/pokemonUtils";
import "./FilterBadge.css";

interface FilterBadgeProps {
  tipo: string;
  activo: boolean;
  deshabilitado: boolean;
  onClick: () => void;
}

export default function FilterBadge({
  tipo,
  activo,
  deshabilitado,
  onClick,
}: FilterBadgeProps) {
  return (
    <button
      type="button"
      className={`filter-badge filter-badge--${tipo} ${activo ? "filter-badge--selected" : ""} ${deshabilitado ? "filter-badge--disabled" : ""}`}
      onClick={onClick}
    >
      {traducirTipo(tipo)}
    </button>
  );
}
