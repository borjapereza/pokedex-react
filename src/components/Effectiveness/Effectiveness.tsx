import { obtenerEfectividades } from "../../services/pokemonUtils";
import EffectivenessCard from "../EffectivenessCard/EffectivenessCard";
import "./Effectiveness.css";

interface EffectivenessProps {
  modo: string;
  tiposSeleccionados: string[];
}

export default function Effectiveness({
  modo,
  tiposSeleccionados,
}: EffectivenessProps) {
  const efectividades = obtenerEfectividades(tiposSeleccionados, modo);
  const efectividadesAgrupadas = Object.entries(efectividades).reduce(
    // entries - Convertimos un objeto en un array de entradas ([tipo, multiplicador])
    // reduce - Agrupamos por valor y acumulamos las claves (multiplicador : [tipo1, tipo2,...])
    (resultado, [tipo, multiplicador]) => {
      if (multiplicador === 1) {
        return resultado;
      }

      if (!resultado[multiplicador]) {
        resultado[multiplicador] = [];
      }

      resultado[multiplicador].push(tipo);

      return resultado;
    },
    {} as Record<number, string[]>,
  );

  return (
    <section className="effectiveness">
      {Object.entries(efectividadesAgrupadas)
        .sort(([a], [b]) => Number(b) - Number(a))
        .map(([multiplicador, tipos]) => (
          <EffectivenessCard
            key={multiplicador}
            modo={modo}
            multiplicador={Number(multiplicador)}
            tipos={tipos}
          />
        ))}
    </section>
  );
}
