const pokedex = document.getElementById('pokedex');
const body = document.querySelector('body');

const fetchPokemonData = async () => {
  const url = `https://pokeapi.co/api/v2/pokemon?limit=898`;
  const res = await fetch(url);
  const data = await res.json();
  const pokemon = data.results.map((poke, index) => ({
    ...poke,
    id: index + 1,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index+1}.png`,
  }))
  console.log(data);
  showPokemonData(pokemon);
}

const showPokemonData = (pokemon) => {
  console.log(pokemon);
  const pokemonHTMLString = pokemon
    .map(
      (pokeman) => `
    <li class="card" onclick="openPopUp(${pokeman.id})">
        <img class="card-image" src="${pokeman.img}"/>
        <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>
    </li>
`
    )
    .join('');
  pokedex.innerHTML = pokemonHTMLString;
}

const openPopUp = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  showPopUp(data);
  console.log(id)
}

const showPopUp = (poke) => {
  body.style.overflow = "hidden";
  console.log(poke.types)
  const type = poke.types.map((type) => type.type.name).join(',');
  const ability = poke.abilities.map((ability)=>ability.ability.name).join(',');
  const stats = poke.stats.map((stat)=>stat.stat.name+"-"+stat.base_stat);
  const sprites = poke.sprites;
  let spriteHtml = ``;
  for(key in sprites){
    if(sprites[key]!=null)spriteHtml += `<img alt="" src="${sprites[key]}"/>`
  }
  console.log(sprites)
  let stathtml = ``;
  for(let i=0;i<stats.length;i++){
    stathtml += `${stats[i]}<br>`;
  }

  const htmlString = `
  <div class="popup">
    <button type="button" name="button" class="closeBtn" onclick="closePopUp()" style="z-index:100">X-Close</button>
    <div class="card">
        <img class="card-image" src="${poke.sprites['front_default']}"/>
        <h2 class="card-title"> ${poke.name}</h2>
        <p> Height : ${poke.height}</p>
        <p> weight : ${poke.weight}</p>
        <p> type : ${type}</p>
        <p> ability : ${ability}</p>
    </div>
    <div class="card">
      <h2>Stats</h2>
      ${stathtml}
      <h2>Images</h2>
      ${spriteHtml}
    </div>
  </div>
  `;
  pokedex.innerHTML = htmlString + pokedex.innerHTML;
  console.log(poke);
};

const closePopUp = () => {
  body.style.overflow = "scroll";
  popup = document.querySelector('.popup');
  popup.parentElement.removeChild(popup);
}
fetchPokemonData();
