let pokemonList = [
    {name: 'Pikachu', height: 0.4, type: ['electric']},
    {name: 'Charizard', height: 1.7, type: ['fire', 'flying']},
    {name: 'Squirtle', height: 0.5, type: ['water']},
];

pokemonList.forEach(pokemon => {
    document.write(pokemon.name + ' (height: ' + pokemon.height + ') ');
    if (pokemon.height > 1.5) {
        document.write(' - Wow, that\'s big! ');
    } 
    document.write('<br>');
});