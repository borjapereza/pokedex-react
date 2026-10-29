import type { ReactNode } from "react";

import "./PokemonModal.css";

interface PokemonModalProps {
  children: ReactNode;
  onCerrar: () => void;
}

export default function PokemonModal({
  children,
  onCerrar,
}: PokemonModalProps) {
  return (
    <div className="pokemon-modal" onClick={onCerrar}>
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
}
