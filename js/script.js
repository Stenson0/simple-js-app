let pokemonList = [
    {name: 'Pikachu', height: 0.4, type: ['electric']},
    {name: 'Charizard', height: 1.7, type: ['fire', 'flying']},
    {name: 'Squirtle', height: 0.5, type: ['water']},
];

for (let i = 0; i < pokemonList.length; i++) {
    document.write(pokemonList[i].name + ' (height: ' + pokemonList[i].height + ') ');
}