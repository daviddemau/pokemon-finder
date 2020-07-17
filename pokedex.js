// getting data from pokemon API
const baseUrl = 'https://raw.githubusercontent.com/Biuni/PokemonGO-pokedex/master/pokedex.json';
const pokemons = [];

window.fetch(baseUrl)
    .then(blob => blob.json())
    .then(data => pokemons.push(...data.pokemon))

// variables
const input = document.querySelector('input');
const list = document.querySelector('ul');
let playing = false;
const audio = new Audio('sounds/pokemon-opening.mp3');

// display result when typing on search bar
input.addEventListener('keyup', printResults);

// music management
const musicToggle = document.querySelector('button');
musicToggle.addEventListener('click', playMusic);

// filtering results by name and type
function findPokemons(search, pokemons) {
    return pokemons.filter(pokemon => {
        const regex = new RegExp(search, 'gi');
        return pokemon.name.match(regex) || pokemon.type.find(a => a.match(regex));
    });
}

function printResults() {
    list.innerHTML = '';
    const result = findPokemons(this.value, pokemons);
    result.map(function (element) {
        list.innerHTML += '<li class="name">' + '<img src="' + element.img + '"/>' + '<span>' + element.name + '</span>' + '<span>' + element.height + '</span>' + '<span>' + element.type + '</span>' + '</li>' + '<li class="details">'
            + '<span>' + '<p class="detail-title">' + 'spawn chance: ' + '</p>' + element.spawn_chance + '</span>' + '<span>' + '<p class="detail-title">' + 'weight: ' + '</p>' + element.weight + '</span>' + '<span>'
            + '<p class="detail-title">' + 'weaknesses: ' + '</p>' + element.weaknesses + '</span>' + '</li>'
    });

    //toggle more details about specific pokemon
    let pokemonNames = document.querySelectorAll('.name');
    Array.from(pokemonNames).forEach(togglePokemonDetail);
}

function togglePokemonDetail(element) {
    element.addEventListener('click', () => {
        element.nextSibling.style.display === '' ?
            element.nextSibling.style.display = 'block' :
            element.nextSibling.style.display = '';
    })
}

function playMusic() {
    playing = !playing;
    if (playing) {
      audio.play();
      musicToggle.innerHTML = 'Stop Music';
    } else {
      audio.pause();
      musicToggle.innerHTML = 'Play Music';
    }
}
