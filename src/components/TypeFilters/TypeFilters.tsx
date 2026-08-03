import { TIPOS } from "../../services/types";

import Badge from "../Badge/Badge";

import "./TypeFilters.css";

interface TypeFiltersProps {
  titulo: string;
}

export default function TypeFilters({ titulo }: TypeFiltersProps) {
  const tipos = TIPOS;

  return (
    <section className="type-filters">
      <h3 className="type-filters__title">{titulo}</h3>

      <div className="type-filters__badges">
        {tipos.map((tipo) => (
          <Badge key={tipo} tipo={tipo} />
        ))}
      </div>
    </section>
  );
}
