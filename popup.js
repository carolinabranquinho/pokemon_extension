const pokeName = document.querySelector("#pokemon_name");
const img = document.querySelector(".pokemon_image")
const level = document.querySelector("span")

chrome.runtime.sendMessage({text: "Poke, please"}, showPokemon)

function showPokemon(response){
    pokeName.innerText = `A wild ${response.pokeName} appeared!`;
    img.src = response.image;
    level.innerText = `level ${response.level}`
    cactchPokemon(response);
}

const catchButton = document.querySelector(".catch");

function cactchPokemon(response){
    catchButton.addEventListener("click", () => {
        localStorage.setItem('pokemon', response.pokeName)
        localStorage.setItem('pokemon_image', response.image)
        localStorage.setItem('level', response.level)
        pokeName.innerText = `You caught ${response.pokeName}!`
    })
}

const myPokemon = document.querySelector('#pokeball');
const myPokemonButton = document.querySelector('#my_pokemon_button');

myPokemonButton.addEventListener('click', displayMyPoke);

function displayMyPoke(){
    if(!!localStorage.pokemon){
        myPokemon.classList.toggle('show');
        myPokemon.querySelector('h3').innerText = `${localStorage.pokemon}, lvl ${localStorage.level}`
        myPokemon.querySelector('img').src = localStorage.pokemon_image
    }
}