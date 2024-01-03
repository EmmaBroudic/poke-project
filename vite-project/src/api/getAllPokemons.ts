import { fetchData } from './utils';

export async function getAllPokemons() {
    const url = "https://pokeapi.co/api/v2/pokemon/";
    const apiData = await fetchData(url);

    const pokeNames = apiData.results.map((pokeName: { name: string }) => pokeName.name);
    const pokemonBloc = document.querySelector<HTMLDivElement>('.pokemonBloc');

    pokeNames.forEach((pokeName: string) => {
        // createElement
        const pokemon = document.createElement('div');
        const pokemonTitle = document.createElement('h2');
        pokemonTitle.textContent = pokeName;

        // Vérifie si l'élément 'pokemonBloc' existe avant d'y attacher les éléments
        if (pokemonBloc) {
            pokemonBloc.appendChild(pokemon);
            pokemon.appendChild(pokemonTitle); // Attache le titre au div du Pokémon
        } else {
            console.error("L'élément avec la classe 'pokemonBloc' n'a pas été trouvé.");
        }
    })
}