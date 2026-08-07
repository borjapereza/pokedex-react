import { TIPOS } from "../../services/constants";

import FilterBadge from "../FilterBadge/FilterBadge";

import "./TypeFilters.css";

interface TypeFiltersProps {
  titulo: string;
  tiposSeleccionados: string[];
  onCambiarTipo: (tipo: string) => void;
}

export default function TypeFilters({
  titulo,
  tiposSeleccionados,
  onCambiarTipo,
}: TypeFiltersProps) {
  const tipos = TIPOS;
  const hayTiposSeleccionados = tiposSeleccionados.length > 0;

  return (
    <section className="type-filters">
      <h3 className="type-filters__title">{titulo}</h3>

      <div className="type-filters__badges">
        {tipos.map((tipo) => (
          <FilterBadge
            key={tipo}
            tipo={tipo}
            activo={tiposSeleccionados.includes(tipo)}
            deshabilitado={hayTiposSeleccionados && !tiposSeleccionados.includes(tipo)}
            onClick={() => onCambiarTipo(tipo)}
          />
        ))}
      </div>
    </section>
  );
}
