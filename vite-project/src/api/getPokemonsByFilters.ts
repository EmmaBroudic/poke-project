import { fetchData } from './utils';

export async function getPokemonsByColor(element: HTMLButtonElement) {
    const url = "https://pokeapi.co/api/v2/pokemon-color/";
    const apiData = await fetchData(url);

    const colors = apiData.results.map((color: { name: string }) => color.name);

    const formElement = document.createElement('form');

    const filterColorTitle = document.createElement('h2');
    filterColorTitle.innerHTML = "Couleur";
    element.appendChild(filterColorTitle);

    colors.forEach((color: string) => {
        const container = document.createElement('div');
        container.style.display = 'flex';

        const checkboxContainer = document.createElement('div');
        checkboxContainer.style.marginRight = '10px';

        const label = document.createElement('label');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.name = 'colors';
        checkbox.value = color;

        label.appendChild(checkbox);
        checkboxContainer.appendChild(label);

        const colorInfo = document.createElement('div');
        colorInfo.textContent = color;

        container.appendChild(checkboxContainer);
        container.appendChild(colorInfo);

        formElement.appendChild(container);
    });

    element.appendChild(formElement);

    console.log(apiData);
}