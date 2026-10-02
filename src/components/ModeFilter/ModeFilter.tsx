import ModeBadge from "../ModeBadge/ModeBadge";
import "./ModeFilter.css";

interface ModeFilterProps {
  titulo: string;
  modoSeleccionado: string;
  onCambiarModo: (modo: string) => void;
}

export default function ModeFilter({
  titulo,
  modoSeleccionado,
  onCambiarModo,
}: ModeFilterProps) {
  const modos = ["attack", "defend"];

  return (
    <section className="mode-filter">
      <h3 className="mode-filter__title">{titulo}</h3>

      <div className="mode-filter__badges">
        {modos.map((modo) => (
          <ModeBadge
            key={modo}
            modo={modo}
            activo={modoSeleccionado === modo}
            onClick={() => onCambiarModo(modo)}
          />
        ))}
      </div>
    </section>
  );
}
