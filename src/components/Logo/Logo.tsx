import { Link } from "react-router-dom";
import pokeball from "../../assets/images/pokeball.svg";

import "./Logo.css";

export default function Logo() {
  return (
    <Link to="/" className="logo">
      <img src={pokeball} alt="Pokédex" className="logo__icon" />
      <h1 className="logo__text">Pokédex</h1>
    </Link>
  );
}
