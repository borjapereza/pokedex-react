export interface Pokemon {
  id: number;
  nombre: string;
  sprite: string;
  artwork: string;
  tipos: string[];
}

export const TIPOS = [
  "normal",
  "fire",
  "water",
  "electric",
  "grass",
  "ice",
  "fighting",
  "poison",
  "ground",
  "flying",
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dragon",
  "dark",
  "steel",
  "fairy",
] as const;
