let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=20';

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

        pokemonButton.addEventListener('click', function(event) {
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


    function showModal(title, types, text, imageUrl) {
      let modalContainer = document.querySelector('#modal-container');
      modalContainer.innerHTML = '';
  
      let modal = document.createElement('div');
      modal.classList.add('modal');
  
      let closeButtonElement = document.createElement('button');
      closeButtonElement.classList.add('modal-close');
      closeButtonElement.innerText = 'Close';
      closeButtonElement.addEventListener('click', hideModal);
  
      let titleElement = document.createElement('h1');
      titleElement.innerText = title;

      let typesElement = document.createElement('p');
      typesElement.innerText = 'Types: ' + types.map(t => t.type.name).join(', ');
  
      let contentElement = document.createElement('p');
      contentElement.innerText = text;

      let imageElement = document.createElement('img');
      imageElement.src = imageUrl;
      
      modal.appendChild(closeButtonElement);
      modal.appendChild(titleElement);
      modal.appendChild(typesElement);
      modal.appendChild(contentElement);
      modal.appendChild(imageElement);
      modalContainer.appendChild(modal);
  
      modalContainer.classList.add('is-visible');
  }
  
  function hideModal() {
      let modalContainer = document.querySelector('#modal-container');
      modalContainer.classList.remove('is-visible');
  }
  
  window.addEventListener('keydown', (e) => {
      let modalContainer = document.querySelector('#modal-container');
      if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
          hideModal();
      }
  });
  
  function showDetails(pokemon) {
      pokemonRepository.loadDetails(pokemon).then(function () {
          showModal(pokemon.name, pokemon.types, 'Height: ' + pokemon.height, pokemon.imageUrl);
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