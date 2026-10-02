import { NavLink } from "react-router-dom";

import "./Menu.css";

export default function Menu() {
  function getLinkClass({ isActive }: { isActive: boolean }) {
    return `menu__link ${isActive ? "active" : ""}`;
  }

  return (
    <nav className="menu">
      <ul>
        <li>
          <NavLink to="/" className={getLinkClass}>
            Inicio
          </NavLink>
        </li>
        {/*
        <li>
          <NavLink to="/equipo" className={getLinkClass}>
            Mi equipo
          </NavLink>
        </li>
        */}
        <li>
          <NavLink to="/tipos" className={getLinkClass}>
            Tipos
          </NavLink>
        </li>
        {/* Si se añaden elementos cambiar @media del header.css para que se adapte
         */}
      </ul>
    </nav>
  );
}
