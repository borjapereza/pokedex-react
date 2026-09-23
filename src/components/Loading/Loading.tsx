import "./Loading.css";

export default function Loading() {
  return (
    <div className="loading">
      <span className="loading__spinner"></span>
      <span className="loading__text">Cargando Pokémon...</span>
    </div>
  );
}
