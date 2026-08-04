import type { Pokemon } from "./types";

export const traduccionTipo: Record<string, string> = {
  normal: "Normal",
  fire: "Fuego",
  water: "Agua",
  electric: "Eléctrico",
  grass: "Planta",
  ice: "Hielo",
  fighting: "Lucha",
  poison: "Veneno",
  ground: "Tierra",
  flying: "Volador",
  psychic: "Psíquico",
  bug: "Bicho",
  rock: "Roca",
  ghost: "Fantasma",
  dragon: "Dragón",
  dark: "Siniestro",
  steel: "Acero",
  fairy: "Hada",
};

export function traducirTipo(tipo: string): string {
  return traduccionTipo[tipo] ?? tipo;
}

export function obtenerPokemonHome(listaPokemon: Pokemon[]): Pokemon[] {
  return listaPokemon.filter((pokemon) => pokemon.id < 10000);
}

export function filtrarPokemonPorTipos(
  listaPokemon: Pokemon[],
  tiposSeleccionados: string[],
): Pokemon[] {
  if (tiposSeleccionados.length === 0) {
    return listaPokemon;
  }

  return listaPokemon.filter((pokemon) =>
    // "De todos los tipos seleccionados, ¿están todos incluidos en los tipos del Pokémon?"
    tiposSeleccionados.every((tipo) => pokemon.tipos.includes(tipo)),
  );
}
