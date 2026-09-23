import "./ErrorMessage.css";

export default function ErrorMessage() {
  return (
    <div className="error-message">
      <span className="error-message__icon">!</span>
      <span className="error-message__text">
        No se ha podido cargar el Pokémon.
      </span>
    </div>
  );
}
