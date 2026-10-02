import { useState } from "react";
import TypeFilters from "../../components/TypeFilters/TypeFilters";
import "./TypesPage.css";
import ModeFilter from "../../components/ModeFilter/ModeFilter";
import Effectiveness from "../../components/Effectiveness/Effectiveness";

export default function TypesPage() {
  const [modoSeleccionado, setModoSeleccionado] = useState("attack");
  const [tiposSeleccionados, setTiposSeleccionados] = useState<string[]>([]);

  const cambiarModo = (modo: string) => {
    setModoSeleccionado(modo);
  };

  const cambiarTipo = (tipo: string) => {
    setTiposSeleccionados((tiposActuales) => {
      if (tiposActuales.includes(tipo)) {
        return tiposActuales.filter((t) => t !== tipo);
      }

      if (modoSeleccionado === "attack") {
        return [tipo];
      }

      if (tiposActuales.length < 2) {
        return [...tiposActuales, tipo];
      }

      return [tiposActuales[1], tipo];
    });
  };

  const tituloTipos =
    modoSeleccionado === "attack"
      ? "Seleccione el tipo de ataque"
      : "Seleccione el tipo del Pokémon defensor";

  return (
    <section className="types-page">
      <h2 className="types__title">Efectividad de los tipos de Pokémon</h2>
      <ModeFilter
        titulo="Modo"
        modoSeleccionado={modoSeleccionado}
        onCambiarModo={cambiarModo}
      />
      <TypeFilters
        titulo={tituloTipos}
        tiposSeleccionados={tiposSeleccionados}
        onCambiarTipo={cambiarTipo}
      />
      {tiposSeleccionados.length > 0 && (
        <Effectiveness
          modo={modoSeleccionado}
          tiposSeleccionados={tiposSeleccionados}
        />
      )}
    </section>
  );
}
