import type {
  Pokemon,
  PokemonAbilityApi,
  PokemonApi,
  PokemonDetail,
  PokemonSpeciesApi,
  PokemonStats,
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

function obtenerDescripcion(species: PokemonSpeciesApi): string {
  return (
    species.flavor_text_entries.find(
      (entrada) => entrada.language.name === "es",
    )?.flavor_text ?? ""
  )
    .replace(/\n/g, " ")
    .replace(/\f/g, " ");
}

function transformarStats(statsApi: PokemonApi["stats"]): PokemonStats {
  const stats: PokemonStats = {
    hp: 0,
    attack: 0,
    defense: 0,
    specialAttack: 0,
    specialDefense: 0,
    speed: 0,
  };

  statsApi.forEach((stat) => {
    switch (stat.stat.name) {
      case "hp":
        stats.hp = stat.base_stat;
        break;

      case "attack":
        stats.attack = stat.base_stat;
        break;

      case "defense":
        stats.defense = stat.base_stat;
        break;

      case "special-attack":
        stats.specialAttack = stat.base_stat;
        break;

      case "special-defense":
        stats.specialDefense = stat.base_stat;
        break;

      case "speed":
        stats.speed = stat.base_stat;
        break;
    }
  });

  return stats;
}

export async function getPokemonDetail(
  pokemonBase: Pokemon,
): Promise<PokemonDetail> {
  const pokemon = await getPokemon(pokemonBase.id);

  const species = await getPokemonSpecies(pokemon.species.url);

  const habilidades = await Promise.all(
    pokemon.abilities.map(async (habilidad) => {
      const ability = await getPokemonAbility(habilidad.ability.url);

      return {
        nombre:
          ability.names.find((name) => name.language.name === "es")?.name ?? "",
        oculta: habilidad.is_hidden,
      };
    }),
  );

  const genero =
    species.genera.find((entrada) => entrada.language.name === "es")?.genus ??
    "";
  const descripcion = obtenerDescripcion(species);

  const altura = pokemon.height / 10;
  const peso = pokemon.weight / 10;
  const evolutionChainUrl = species.evolution_chain.url;
  const stats = transformarStats(pokemon.stats);

  return {
    ...pokemonBase,
    genero,
    descripcion,
    altura,
    peso,
    habilidades,
    stats,
    evolutionChainUrl,
  };
}
