let currentPokemon = {
    pokeName: "",
    image: "",
    level: 0
}

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
    const pokemonId = Math.ceil(Math.random() * 151)

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
    .then(response => response.json())
    .then(json => setAtributtes(json))
})


function setAtributtes(json){
    currentPokemon.pokeName = json.forms[0].name;
    currentPokemon.image = json.sprites.front_default;
    currentPokemon.level = Math.ceil(Math.random() * 100);
}

chrome.runtime.onMessage.addListener(sendPokeBack)

function sendPokeBack(request, sender, sendResponse){
    if(request.text === "Poke, please"){
        sendResponse(currentPokemon)
    }
}