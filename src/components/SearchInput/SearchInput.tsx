import { useMemo, useState, type SubmitEventHandler } from "react";

import searchIcon from "../../assets/images/search.svg";

import SearchSuggestions from "../SearchSuggestions/SearchSuggestions";

import "./SearchInput.css";
import { usePokemon } from "../../hooks/usePokemon";
import { useNavigate } from "react-router-dom";
import type { Pokemon } from "../../services/types";

export default function SearchInput() {
  const [textoBusqueda, setTextoBusqueda] = useState("");
  const [tieneFoco, setTieneFoco] = useState(false);
  const navigate = useNavigate();
  const [indiceSeleccionado, setIndiceSeleccionado] = useState(-1);
  const { listaPokemon } = usePokemon();

  const resultadosBusqueda = useMemo(() => {
    if (textoBusqueda.trim() === "") {
      return [];
    }

    const texto = textoBusqueda.toLowerCase();

    return listaPokemon
      .filter((pokemon) => {
        const coincideNombre = pokemon.nombre.toLowerCase().includes(texto);

        const idTexto = pokemon.id.toString();

        const coincideId =
          idTexto === texto || idTexto.padStart(3, "0") === texto;

        return coincideNombre || coincideId;
      })
      .slice(0, 6);
  }, [textoBusqueda, listaPokemon]);

  const seleccionarPokemon = (pokemon: Pokemon) => {
    setTextoBusqueda("");
    navigate(`/pokemon/${pokemon.id}`);
  };

  const procesarEnvio: SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const pokemonSeleccionado = resultadosBusqueda[indiceSeleccionado];
    if (!pokemonSeleccionado) {
      return;
    }
    seleccionarPokemon(pokemonSeleccionado);
  };

  const manejarTeclas = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setIndiceSeleccionado((indiceActual) => {
        if (indiceActual >= resultadosBusqueda.length - 1) {
          return indiceActual;
        }

        return indiceActual + 1;
      });
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setIndiceSeleccionado((indiceActual) => {
        if (indiceActual <= 0) {
          return indiceActual;
        }

        return indiceActual - 1;
      });
    }
  };

  const mostrarSugerencias = tieneFoco && resultadosBusqueda.length > 0;

  return (
    <div className="search">
      <form
        className="search-input search-input--header"
        onSubmit={procesarEnvio}
      >
        <img className="search-input__icon" src={searchIcon} alt="" />

        <input
          className="search-input__field"
          type="text"
          placeholder="Buscar Pokémon..."
          value={textoBusqueda}
          onChange={(e) => {
            const texto = e.target.value;
            setTextoBusqueda(texto);
            if (texto.trim() === "") {
              setIndiceSeleccionado(-1);
            } else {
              setIndiceSeleccionado(0);
            }
          }}
          onFocus={() => setTieneFoco(true)}
          onBlur={() => setTieneFoco(false)}
          onKeyDown={manejarTeclas}
        />
      </form>

      {mostrarSugerencias && (
        <SearchSuggestions
          resultados={resultadosBusqueda}
          indiceSeleccionado={indiceSeleccionado}
          onSeleccionar={seleccionarPokemon}
        />
      )}
    </div>
  );
}
