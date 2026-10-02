import "./ModeBadge.css";

interface ModeBadgeProps {
  modo: string;
  activo: boolean;
  onClick: () => void;
}

export default function ModeBadge({ modo, activo, onClick }: ModeBadgeProps) {
  return (
    <button
      type="button"
      className={`mode-badge mode-badge--${modo} ${
        activo ? "mode-badge--selected" : ""
      }`}
      onClick={onClick}
    >
      {modo === "attack" ? "Atacante" : "Defensor"}
    </button>
  );
}
