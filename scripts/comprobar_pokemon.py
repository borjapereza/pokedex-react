import json

with open("pokemon.json", "r", encoding="utf-8") as archivo:
    lista_pokemon = json.load(archivo)

sin_imagen = []

for pokemon in lista_pokemon:
    if pokemon["sprite"] is None or pokemon["artwork"] is None:
        sin_imagen.append(pokemon)

print(f"Pokémon sin imagen: {len(sin_imagen)}")

for pokemon in sin_imagen:
    print(f"{pokemon['id']} - {pokemon['nombre']}")