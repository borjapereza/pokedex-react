import type { PokemonStats } from "../../services/types";
import { MAX_STATS } from "../../services/constants";

import "./PokemonStats.css";

interface PokemonStatsProps {
  stats: PokemonStats;
}

export default function PokemonStats({ stats }: PokemonStatsProps) {
  const listaStats = [
    {
      nombre: "HP",
      valor: stats.hp,
      max: MAX_STATS.hp,
    },
    {
      nombre: "Ataque",
      valor: stats.attack,
      max: MAX_STATS.attack,
    },
    {
      nombre: "Defensa",
      valor: stats.defense,
      max: MAX_STATS.defense,
    },
    {
      nombre: "At. Especial",
      valor: stats.specialAttack,
      max: MAX_STATS.specialAttack,
    },
    {
      nombre: "Def. Especial",
      valor: stats.specialDefense,
      max: MAX_STATS.specialDefense,
    },
    {
      nombre: "Velocidad",
      valor: stats.speed,
      max: MAX_STATS.speed,
    },
  ];

  return (
    <div className="pokemon-stats">
      {listaStats.map((stat) => {
        const porcentaje = Math.min((stat.valor / stat.max) * 100, 100);

        return (
          <div className="pokemon-stats__row" key={stat.nombre}>
            <span className="pokemon-stats__name">{stat.nombre}</span>

            <div className="pokemon-stats__bar">
              <div
                className="pokemon-stats__progress"
                style={{ width: `${porcentaje}%` }}
              />
            </div>

            <span className="pokemon-stats__value">{stat.valor}</span>
          </div>
        );
      })}
    </div>
  );
}
