import { useParams } from "react-router-dom";

export default function PokemonDetail() {
  const { id } = useParams();

  return (
    <>
      <h1>Detalle del Pokémon</h1>

      <p>ID: {id}</p>
    </>
  );
}