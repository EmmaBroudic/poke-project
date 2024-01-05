import { getShapes } from '../api/getPokemonsByShape.ts';
import { getPokemonsByShape } from '../api/getPokemonsByShape';

export async function displayShapesFilter(element: HTMLElement) {
    try {
        const shapes = await getShapes();

        const formElement = document.createElement('form');

        const filterShapeTitle = document.createElement('h2');
        filterShapeTitle.innerHTML = "Shape";
        element.appendChild(filterShapeTitle);

        shapes.forEach((shape: string) => {
            const container = document.createElement('div');
            container.style.display = 'flex';

            const checkboxContainer = document.createElement('div');
            checkboxContainer.style.marginRight = '10px';

            const label = document.createElement('label');

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.name = 'shapes';
            checkbox.value = shape;

            label.appendChild(checkbox);
            checkboxContainer.appendChild(label);

            const shapeInfo = document.createElement('div');
            shapeInfo.textContent = shape;

            container.appendChild(checkboxContainer);
            container.appendChild(shapeInfo);

            formElement.appendChild(container);

            checkbox.addEventListener("click", async (e) => {
                e.stopPropagation();
                console.log(shape, 'Le bouton a été cliqué !');

                const pokemonList = await getPokemonsByShape(shape);

                const cartDom = document.querySelector<HTMLDivElement>('.pokemonBloc');

                console.log(pokemonList);

                if (cartDom) {
                    cartDom.innerHTML = "";
                    pokemonList.forEach(pokemon => {
                        console.log(pokemon.name);
                        const pokemonBloc = document.createElement('div');
                        const pokemonTitle = document.createElement('h2');
                        pokemonTitle.textContent = pokemon.name;

                        pokemonBloc.appendChild(pokemonTitle);
                        cartDom.appendChild(pokemonBloc); // Utiliser cartDom pour ajouter le bloc Pokémon
                    });
                }
            });
        });

        element.appendChild(formElement);
    } catch (error) {
        console.error('Error displaying Shapes Filter:', error);
        // Gérer l'erreur de manière appropriée
    }
}