import { traducirTipo } from "../../services/pokemonUtils";
import "./Badge.css";

interface BadgeProps {
  tipo: string;
}

export default function Badge({ tipo }: BadgeProps) {
  return <span className={`badge badge--${tipo}`}>{traducirTipo(tipo)}</span>;
}
