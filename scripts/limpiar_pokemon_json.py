import json

with open("pokemon.json", "r", encoding="utf-8") as archivo:
    lista_pokemon = json.load(archivo)

lista_filtrada = []

for pokemon in lista_pokemon:
    if pokemon["sprite"] is not None and pokemon["artwork"] is not None:
        lista_filtrada.append(pokemon)
    else:
        print(f"Eliminando {pokemon['id']} - {pokemon['nombre']}")

eliminados = len(lista_pokemon) - len(lista_filtrada)

with open("pokemon.json", "w", encoding="utf-8") as archivo:
    json.dump(
        lista_filtrada,
        archivo,
        ensure_ascii=False,
        indent=4,
    )

print(f"Se han eliminado {eliminados} Pokémon.")