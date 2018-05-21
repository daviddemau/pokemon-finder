var audio = new Audio('sounds/101-opening.mp3');
audio.play();

var url = 'https://raw.githubusercontent.com/Biuni/PokemonGO-pokedex/master/pokedex.json';
const pokemons = [];

fetch(url)
.then(blob => blob.json())
.then(data => pokemons.push(...data.pokemon))

var input = document.querySelector('input');
var list = document.querySelector('ul');

//input.addEventListener('change', printResults);
input.addEventListener('keyup', printResults);


function findPokemons(search, pokemons) {
  return pokemons.filter(pokemon => {
    var regex = new RegExp(search, 'gi');
    return pokemon.name.match(regex) || pokemon.type.find(a => a.match(regex));
  });
}

function printResults() {
  list.innerHTML = '';
  var result = findPokemons(this.value, pokemons);
  result.map(function(element) {
    list.innerHTML += '<li>' + '<img src="' + element.img + '"/>' + '<span>' + element.name + '</span>' + '<span>' + element.height + '</span>' + '<span>' + element.type + '</span>' + '</li>';
  });
}
