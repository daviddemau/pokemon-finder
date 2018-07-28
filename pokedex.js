//getting data from Github repository
var url = 'https://raw.githubusercontent.com/Biuni/PokemonGO-pokedex/master/pokedex.json';
const pokemons = [];

window.fetch(url)
.then(blob => blob.json())
.then(data => pokemons.push(...data.pokemon))

//variables
var input = document.querySelector('input');
var list = document.querySelector('ul');
var playing = false;
var audio = new Audio('sounds/101-opening.mp3');

//input.addEventListener('change', printResults);
input.addEventListener('keyup', printResults);

//play music button
var musicToggle = document.querySelector('button');
musicToggle.addEventListener('click', playMusic);

//functions
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
    list.innerHTML += '<li class="name">' + '<img src="' + element.img + '"/>' + '<span>' + element.name + '</span>' + '<span>' + element.height + '</span>' + '<span>' + element.type + '</span>' + '</li>' + '<li class="details">'
    + '<span>' + '<p class="detail-title">' + 'spawn chance: ' + '</p>' + element.spawn_chance  + '</span>' + '<span>' + '<p class="detail-title">' + 'weight: ' + '</p>' + element.weight +'</span>' + '<span>'
    + '<p class="detail-title">' + 'weaknesses: ' + '</p>' + element.weaknesses +'</span>' + '</li>'
  });

  //toggle more details about specific pokemon
  let pokemonNames = document.querySelectorAll('.name');
  Array.from(pokemonNames).forEach(toggleShow);
}

function toggleShow(element) {
  element.addEventListener('click', () => {
    if(element.nextSibling.style.display == '') {
      element.nextSibling.style.display = 'block';
    } else {
      element.nextSibling.style.display = '';
    }
  })
}

function playMusic() {
  if(!playing) {
    audio.play();
    musicToggle.innerHTML = 'Stop Music';
    playing = true;
  } else {
    audio.pause();
    audio.currentTime = 0;
    musicToggle.innerHTML = 'Play Music';
    playing = false;
  }
}
