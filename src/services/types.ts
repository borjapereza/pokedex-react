// ---------------- APP ----------------
export interface Pokemon {
  id: number;
  nombre: string;
  sprite: string;
  artwork: string;
  tipos: string[];
}

export interface Habilidad {
  nombre: string;
  oculta: boolean;
}

export interface PokemonStats {
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
}

export interface PokemonDetail extends Pokemon {
  genero: string;
  descripcion: string;
  altura: number;
  peso: number;
  habilidades: Habilidad[];
  stats: PokemonStats;
  evolutionChainUrl: string;
}

export type EvolutionBranch = number[];

export type EvolutionBranches = EvolutionBranch[];

export interface EvolutionInfo {
  preevoluciones: number[];
  evoluciones: number[];
}

export interface EvolutionCardProps {
  titulo: string;
  pokemonArbolEvoluciones: Pokemon[];
}

// ---------------- API ----------------
export interface PokemonApi {
  species: {
    url: string;
  };
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
  abilities: {
    ability: {
      url: string;
    };
    is_hidden: boolean;
  }[];
  height: number;
  weight: number;
}

export interface PokemonSpeciesApi {
  genera: {
    genus: string;
    language: {
      name: string;
    };
  }[];
  flavor_text_entries: {
    flavor_text: string;
    language: {
      name: string;
    };
    version: {
      name: string;
    };
  }[];
  evolution_chain: {
    url: string;
  };
}

export interface PokemonAbilityApi {
  names: {
    language: {
      name: string;
    };
    name: string;
  }[];
}

export interface PokemonDetailApi {
  pokemon: PokemonApi;
  species: PokemonSpeciesApi;
  abilities: {
    ability: PokemonAbilityApi;
    is_hidden: boolean;
  }[];
}

export interface EvolutionChainApi {
  chain: EvolutionChainNode;
}

export interface EvolutionChainNode {
  species: {
    name: string;
    url: string;
  };
  evolves_to: EvolutionChainNode[];
}
