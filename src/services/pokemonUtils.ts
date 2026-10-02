import { EFECTIVIDADES, TIPOS, traduccionTipo } from "./constants";
import type {
  EvolutionBranch,
  EvolutionBranches,
  EvolutionChainApi,
  EvolutionChainNode,
  EvolutionInfo,
  Pokemon,
  PokemonApi,
  PokemonDetail,
  PokemonDetailApi,
  PokemonSpeciesApi,
  PokemonStats,
} from "./types";

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

function transformarHabilidades(
  abilitiesApi: PokemonDetailApi["abilities"],
): PokemonDetail["habilidades"] {
  return abilitiesApi.map(({ ability, is_hidden }) => ({
    nombre:
      ability.names.find((name) => name.language.name === "es")?.name ?? "",
    oculta: is_hidden,
  }));
}

export function transformarPokemonDetail(
  datos: PokemonDetailApi,
  pokemonBase: Pokemon,
): PokemonDetail {
  const { pokemon, species, abilities } = datos;

  const genero =
    species.genera.find((entrada) => entrada.language.name === "es")?.genus ??
    "";

  const descripcion = obtenerDescripcion(species);

  const altura = pokemon.height / 10;
  const peso = pokemon.weight / 10;

  const evolutionChainUrl = species.evolution_chain.url;

  const stats = transformarStats(pokemon.stats);

  const habilidades = transformarHabilidades(abilities);

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

function obtenerIdDesdeUrl(url: string): number {
  const partes = url.split("/");
  return Number(partes[partes.length - 2]);
}

export function transformarEvolutionChain(
  evolutionChain: EvolutionChainApi,
): EvolutionBranches {
  const ramas: EvolutionBranches = [];

  function recorrerNodo(
    nodo: EvolutionChainNode,
    ramaActual: EvolutionBranch,
  ): void {
    const id = obtenerIdDesdeUrl(nodo.species.url);
    const nuevaRama = [...ramaActual, id];

    if (nodo.evolves_to.length === 0) {
      ramas.push(nuevaRama);
      return;
    }

    nodo.evolves_to.forEach((evolucion) => {
      recorrerNodo(evolucion, nuevaRama);
    });
  }

  recorrerNodo(evolutionChain.chain, []);

  return ramas;
}

export function obtenerEvolucionesPokemon(
  pokemon: Pokemon,
  evolutionBranches: EvolutionBranches,
): EvolutionInfo {
  const preevoluciones = new Set<number>();
  const evoluciones = new Set<number>();

  evolutionBranches.forEach((rama) => {
    // Calculamos la posición donde se encuentra
    const posicion = rama.indexOf(pokemon.id);

    // No existe elemento
    if (posicion === -1) {
      return;
    }

    const anteriores = rama.slice(0, posicion);
    const posteriores = rama.slice(posicion + 1);

    anteriores.forEach((id) => {
      preevoluciones.add(id);
    });

    posteriores.forEach((id) => {
      evoluciones.add(id);
    });
  });

  return {
    preevoluciones: [...preevoluciones],
    evoluciones: [...evoluciones],
  };
}

export function obtenerEfectividades(
  tiposSeleccionados: string[],
  modo: string,
): Record<string, number> {
  // Construimos una tabla interna con todos los tipos asignando valor 1
  const resultado: Record<string, number> = TIPOS.reduce(
    (resultado, tipo) => {
      resultado[tipo] = 1;
      return resultado;
    },
    {} as Record<string, number>,
  );

  if (modo === "attack") {
    const efectividades = EFECTIVIDADES[tiposSeleccionados[0]];

    Object.entries(efectividades ?? {}).forEach(
      ([tipoDefensor, multiplicador]) => {
        resultado[tipoDefensor] *= multiplicador;
      },
    );
  }

  if (modo === "defend") {
    TIPOS.forEach((tipoAtacante) => {
      const efectividades = EFECTIVIDADES[tipoAtacante];

      tiposSeleccionados.forEach((tipoDefensor) => {
        const multiplicador = efectividades?.[tipoDefensor];

        if (multiplicador !== undefined) {
          resultado[tipoAtacante] *= multiplicador;
        }
      });
    });
  }

  return resultado;
}
