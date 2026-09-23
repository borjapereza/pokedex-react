import { Link } from "react-router-dom";

import "./Logo.css";

export default function Logo() {
  return (
    <Link to="/" className="logo">
      <img src="/pokeball.svg" alt="Pokédex" className="logo__icon" />
      <h1 className="logo__text">Pokédex</h1>
    </Link>
  );
}
