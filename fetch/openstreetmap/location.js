const createResultItem = (result) => {
    const itemElement = document.createElement('div');

    itemElement.textContent = result.display_name;

    return itemElement;
};

const findAddress = (criteria) => {
    const query = `https://nominatim.openstreetmap.org/search?q=${criteria}&format=json`;

    fetch(query)
        .then((response) => response.json())
        .then((results) => {
            const searchResultElement = document.getElementById(
                'search-results'
            );

            searchResultElement.innerHTML = '';

            if (results.length === 0) {
                searchResultElement.textContent = 'Nothing found.';

                return;
            }

            for (let result of results) {
                searchResultElement.appendChild(createResultItem(result));
            }
        });
};

const initSearchByQuery = () => {
    const searchFormElement = document.querySelector('#search-form');

    searchFormElement.addEventListener('submit', function (event) {
        event.preventDefault();

        const searchQueryInputElement = document.querySelector('#search-query');
        findAddress(searchQueryInputElement.value);
    });
};

initSearchByQuery();