import { fetchData } from './utils.ts';
import { getPokemonById, Pokemon } from './getPokemonById.ts';

export async function getPokemonsByFilter(filter: string, filterElements: string[]): Promise<Pokemon[]> {
    const pokemonList: Pokemon[] = [];

    const promises = filterElements.map(async (filterElement: string) => {
        const url = `https://pokeapi.co/api/v2/pokemon-${filter}/${filterElement}`;
        const data = await fetchData(url);

        for (const pokemon of data.pokemon_species) {
            const pokemonData = await getPokemonById(pokemon.url.split('/').slice(-2, -1)[0]);
            pokemonList.push(pokemonData);
        }
    });

    await Promise.all(promises);

    return pokemonList;
}
/*
import { fetchData } from './utils.ts';
import { getPokemonById, Pokemon } from './getPokemonById.ts';

export async function getPokemonsByFilter(filter: string, filterElements: string[]): Promise<Pokemon[]> {
    let pokemonList: Pokemon[] = [];

    const promises = filterElements.map(async (filterElement: string) => {
        let url = `https://pokeapi.co/api/v2/pokemon-${filter}/${filterElement}`;
        const data = await fetchData(url);

        const pokemonIds = data.pokemon_species.map(pokemon => pokemon.url.split('/').slice(-2, -1)[0]);
        const pokemonDataPromises = pokemonIds.map(id => getPokemonById(id));

        pokemonList = await Promise.all(pokemonDataPromises);
    });

    await Promise.all(promises);
    
    return pokemonList.flat();
}*/