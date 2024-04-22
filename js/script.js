let pokemonRepository = (function () {
    let pokemonList = [
        {name: 'Pikachu', height: 0.4, type: ['electric']},
        {name: 'Charizard', height: 1.7, type: ['fire', 'flying']},
        {name: 'Squirtle', height: 0.5, type: ['water']},
    ];

    function add(pokemon) {
        pokemonList.push(pokemon);
    }

    function addListItem(pokemon) {
        let pokemonList = document.querySelector('.pokemon-list');
        let pokemonListItem = document.createElement('li');
        let pokemonButton = document.createElement('button');
        pokemonButton.innerText = pokemon.name;
        pokemonButton.classList.add('pokemon-button');
        pokemonListItem.appendChild(pokemonButton);
        pokemonList.appendChild(pokemonListItem);
    }
    
    function getAll() {
        return pokemonList;
    }

    function getPokemonByName(searchedName) {
        return pokemonList.filter((pokemon) => pokemon.name.toLowerCase() === searchedName.toLowerCase());
      }

    return {
        add: add,
        addListItem: addListItem,
        getAll: getAll,
        getPokemonByName: getPokemonByName
    };
})();

pokemonRepository.getAll().forEach(pokemon => {
    pokemonRepository.addListItem(pokemon);
});