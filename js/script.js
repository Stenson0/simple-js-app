let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=20';

    function add(pokemon) {
        pokemonList.push(pokemon);
    }

    function addListItem(pokemon) {
        let pokemonList = document.querySelector('.pokemon-list');
        let pokemonListItem = document.createElement('li');
        pokemonListItem.classList.add('list-group-item');
        let pokemonButton = document.createElement('button');
        pokemonButton.innerText = pokemon.name;
        pokemonButton.classList.add('pokemon-button', 'btn', 'btn-primary');
        pokemonButton.setAttribute('data-toggle', 'modal');
        pokemonButton.setAttribute('data-target', '#exampleModal');
        pokemonListItem.appendChild(pokemonButton);
        pokemonList.appendChild(pokemonListItem);

        pokemonButton.addEventListener('click', function() {
            showDetails(pokemon);
        });
    }

    function getAll() {
        return pokemonList;
    }

    function getPokemonByName(searchedName) {
        return pokemonList.filter((pokemon) => pokemon.name.toLowerCase() === searchedName.toLowerCase());
      }

    function loadList() {
        return fetch(apiUrl).then(function (response) {
          return response.json();
        }).then(function (json) {
          json.results.forEach(function (item) {
            let pokemon = {
              name: item.name,
              detailsUrl: item.url
            };
            add(pokemon);
          });
        }).catch(function (e) {
          console.error(e);
        })
    }

    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
          return response.json();
        }).then(function (details) {
          item.imageUrl = details.sprites.front_default;
          item.height = details.height;
          item.types = details.types;
        }).catch(function (e) {
          console.error(e);
        });
    }

    function showDetails(pokemon) {
      loadDetails(pokemon).then(() => {
          let pokemonDetails = `Name: ${pokemon.name}, Height: ${pokemon.height}, Types: ${pokemon.types.map(typeInfo => typeInfo.type.name).join(', ')}`;
          let modalBody = document.querySelector('.modal-body');
          modalBody.textContent = pokemonDetails;
          modalBody.innerHTML = '';
          let pokemonImage = document.createElement('img');
          pokemonImage.src = pokemon.imageUrl;
          pokemonImage.alt = `Image of ${pokemon.name}`;
          modalBody.appendChild(pokemonImage);
          modalBody.appendChild(document.createTextNode(pokemonDetails));
      });
  }
  
    return {
        add: add,
        addListItem: addListItem,
        getAll: getAll,
        getPokemonByName: getPokemonByName,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails,
    };
})();

pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(pokemon => {
        pokemonRepository.addListItem(pokemon);
    });
});