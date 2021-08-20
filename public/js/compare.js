const selectbox = document.querySelectorAll('.selectpicker');

const fetchPokemonData = () => {
  const promises = [];
  for (let i = 1; i <= 898; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    promises.push(fetch(url).then((res) => {
      return res.json()
    }))
  }
  Promise.all(promises).then((results) => {
    const pokemon = results.map(data => ({
      name: data.name,
      id: data.id,
    }));
   insertPokemonData(pokemon);
  })
}

const insertPokemonData = (pokemon) => {
  let optionString = `<option >select an option</option>`;
  for (let i = 0; i < pokemon.length; i++) {
    optionString += `<option>${pokemon[i].name}-${pokemon[i].id}</option>`;
  }
  selectbox.forEach((item) => item.innerHTML = optionString);
  $('.selectpicker').selectpicker('refresh');
}

fetchPokemonData();

let pokecache = {};
const comparePokemonData  = async () => {
  let pokemon1_name = document.querySelector("body > div.searchBoxes > div:nth-child(1) > button > div > div > div").innerText;
  let pokemon2_name = document.querySelector("body > div.searchBoxes > div:nth-child(2) > button > div > div > div").innerText;
  let pokemon1_id = pokemon1_name.split("-");
  let pokemon2_id = pokemon2_name.split("-");

  pokemon1_id = pokemon1_id[pokemon1_id.length - 1];
  pokemon2_id = pokemon2_id[pokemon2_id.length - 1];
  let pokemon1_data = await getPokemonData(pokemon1_id);
  let pokemon2_data = await getPokemonData(pokemon2_id);

  const comparecards = document.querySelector(".compareCards");
  let statspoke1Html = ``;
  let statspoke2Html = ``;
  for(let i=0;i<pokemon1_data.stats.length;i++){
    statspoke1Html += `<li class="list-group-item">${pokemon1_data.stats[i].stat.name}-${pokemon1_data.stats[i].base_stat}</li>`
  }
  for(let i=0;i<pokemon2_data.stats.length;i++){
    statspoke2Html += `<li class="list-group-item">${pokemon2_data.stats[i].stat.name}-${pokemon2_data.stats[i].base_stat}</li>`
  }
  const compareCardsHtml = `<div class="card">
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon1_data.id}.png" height="200px" width="200px" alt="">
          <div class="card-body">
            <ul class="list-group list-group-flush">
              <li class="list-group-item"> <h2>${pokemon1_data.name}</h2></li>
              ${statspoke1Html}
            </ul>
          </div>
        </div>
        <div class="card">
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon2_data.id}.png" height="200px" width="200px" alt="">
          <div class="card-body">
            <ul class="list-group list-group-flush">
              <li class="list-group-item"> <h2>${pokemon2_data.name}</h2></li>
              ${statspoke2Html}
            </ul>
          </div>
        </div>`;

  comparecards.innerHTML = compareCardsHtml;

}

const getPokemonData = async  (id) => {
  if(pokecache[id]){
      return pokecache[id];
  }
  else{
    let url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    pokecache[id] = await fetch(url).then((res) => {return res.json()});
    console.log(pokecache[id]);
    return pokecache[id];
  }
}
