import json

import requests


def formatear_nombre(nombre: str) -> str:
    return nombre.replace("-", " ").title()


def obtener_pokemon(url_base: str) -> dict:

    respuesta_base = requests.get(url_base)
    datos_base = respuesta_base.json()

    pokemon_id = datos_base["id"]

    sprite = datos_base["sprites"]["front_default"]
    if sprite is None:
        sprite = datos_base["sprites"]["other"]["official-artwork"]["front_default"]

    artwork = datos_base["sprites"]["other"]["official-artwork"]["front_default"]

    pokemon_types = datos_base["types"]
    tipos = []
    for pokemon_type in pokemon_types:
        tipos.append(pokemon_type["type"]["name"])

    url_species = datos_base["species"]["url"]

    species_id = int(url_species.rstrip("/").split("/")[-1])

    if pokemon_id == species_id:
        respuesta_species = requests.get(url_species)
        datos_species = respuesta_species.json()

        nombre = ""

        for nombre_api in datos_species["names"]:
            if nombre_api["language"]["name"] == "es":
                nombre = nombre_api["name"]
                break
    else:
        nombre = formatear_nombre(datos_base["name"])

    return {
        "id": pokemon_id,
        "nombre": nombre,
        "sprite": sprite,
        "artwork": artwork,
        "tipos": tipos,
    }


def obtener_urls_pokemon() -> list[str]:
    url = "https://pokeapi.co/api/v2/pokemon?limit=99999"
    respuesta = requests.get(url)
    datos = respuesta.json()
    urls_pokemon = []

    for resultado in datos["results"]:
        urls_pokemon.append(resultado["url"])

    return urls_pokemon


def obtener_lista_pokemon(urls_pokemon: list[str]) -> list[dict]:
    lista_pokemon = []
    for indice, url_pokemon in enumerate(urls_pokemon, start=1):
        pokemon = obtener_pokemon(url_pokemon)
        lista_pokemon.append(pokemon)
        print(f"{indice}/{len(urls_pokemon)} - {pokemon['nombre']}")

    return lista_pokemon


def guardar_lista_archivo(lista_pokemon: list[dict]) -> None:
    with open("pokemon.json", "w", encoding="utf-8") as archivo:
        json.dump(
            lista_pokemon,
            archivo,
            ensure_ascii=False,
            indent=4,
        )
    print(f"Se han guardado {len(lista_pokemon)} Pokémon.")


urls_pokemon = obtener_urls_pokemon()
lista_pokemon = obtener_lista_pokemon(urls_pokemon)
guardar_lista_archivo(lista_pokemon)
