import { useState } from "react";
import "./Header.css";
import Menu from "../Menu/Menu";
import SearchInput from "../SearchInput/SearchInput";
import Logo from "../Logo/Logo";
import searchIconWhite from "../../assets/images/search-white.svg";
import menuIconWhite from "../../assets/images/menu-white.svg";

export default function Header() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [busquedaAbierta, setBusquedaAbierta] = useState(false);

  const abrirMenu = () => {
    setMenuAbierto((abierto) => !abierto);
    setBusquedaAbierta(false);
  };

  const abrirBusqueda = () => {
    setBusquedaAbierta((abierta) => !abierta);
    setMenuAbierto(false);
  };

  return (
    <header className="header">
      <div className="header__container">
        <Logo />

        <Menu />

        <SearchInput />

        <div className="header__mobile-actions">
          <button
            className="header__mobile-button"
            type="button"
            onClick={abrirMenu}
            aria-label="Abrir menú"
          >
            <img src={menuIconWhite} alt="" />
          </button>

          <button
            className="header__mobile-button"
            type="button"
            onClick={abrirBusqueda}
            aria-label="Abrir búsqueda"
          >
            <img src={searchIconWhite} alt="" />
          </button>
        </div>

        {menuAbierto && (
          <div className="header__mobile-menu">
            <Menu />
          </div>
        )}

        {busquedaAbierta && (
          <div className="header__mobile-search">
            <SearchInput />
          </div>
        )}
      </div>
    </header>
  );
}
