import type {
  EvolutionChainApi,
  Pokemon,
  PokemonAbilityApi,
  PokemonApi,
  PokemonDetailApi,
  PokemonSpeciesApi,
} from "./types";

const URL = "https://pokeapi.co/api/v2/pokemon";

export async function getPokemon(id: number): Promise<PokemonApi> {
  const respuesta = await fetch(`${URL}/${id}`, { method: "GET" });
  if (!respuesta.ok) {
    throw new Error("No se ha podido obtener el Pokémon.");
  }
  return respuesta.json() as Promise<PokemonApi>;
}

export async function getPokemonSpecies(
  speciesUrl: string,
): Promise<PokemonSpeciesApi> {
  const respuesta = await fetch(speciesUrl, { method: "GET" });
  if (!respuesta.ok) {
    throw new Error("No se ha podido obtener la especie del Pokémon.");
  }
  return respuesta.json() as Promise<PokemonSpeciesApi>;
}

export async function getPokemonAbility(
  abilityUrl: string,
): Promise<PokemonAbilityApi> {
  const respuesta = await fetch(abilityUrl, { method: "GET" });
  if (!respuesta.ok) {
    throw new Error("No se ha podido obtener la habilidad del Pokémon.");
  }
  return respuesta.json() as Promise<PokemonAbilityApi>;
}

export async function getPokemonDetail(
  pokemonBase: Pokemon,
): Promise<PokemonDetailApi> {
  const pokemon = await getPokemon(pokemonBase.id);

  const species = await getPokemonSpecies(pokemon.species.url);

  const abilities = await Promise.all(
    pokemon.abilities.map(async (habilidad) => {
      const ability = await getPokemonAbility(habilidad.ability.url);

      return {
        ability,
        is_hidden: habilidad.is_hidden,
      };
    }),
  );
  return {
    pokemon,
    species,
    abilities,
  };
}

export async function getEvolutionChain(
  evolutionChainUrl: string,
): Promise<EvolutionChainApi> {
  const respuesta = await fetch(evolutionChainUrl, { method: "GET" });

  if (!respuesta.ok) {
    throw new Error("No se ha podido obtener la cadena de evoluciones.");
  }

  return respuesta.json() as Promise<EvolutionChainApi>;
}
