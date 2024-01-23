const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
const modalOverlay = document.getElementById('modalOverlay');
const pokemonModal = document.getElementById('pokemonModal');
const closeModal = document.getElementById('closeModal');
const modalContent = document.getElementById('modalContent');

const maxRecords = 151;
const limit = 10;
let offset = 0;

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) =>
            `<li class="pokemon ${pokemon.type}">
                <button class="openModalBtn" data-modal-target="${pokemon.number}">
                    <div class="head">
                        <span class="name">${pokemon.name}</span>
                        <span class="number">#${pokemon.number}</span>
                    </div>
                    <div class="detail">
                        <ol class="types">
                            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                        </ol>
                        <img src="${pokemon.photo}" alt="${pokemon.name}">
                    </div>
                </button>
            </li>`
        ).join('');

        pokemonList.innerHTML += newHtml;

        pokemons.forEach((pokemon) => {
            let openModalBtn = document.querySelector(`[data-modal-target="${pokemon.number}"]`);

            openModalBtn.addEventListener('click', () => showModal(pokemon))
        });
    });
}

function showModal(pokemon) {
    modalContent.innerHTML = `
    <div class="modalBack ${pokemon.type}"
        <span id="nameModal">${pokemon.name}</span>
        <img class="imgModal" src="${pokemon.photo}" alt="${pokemon.name}">
    </div>
    <div class="attribute-bar">
            <p class="attribute-name">XP: ${pokemon.xp} </p>
            <div class="attribute-progress" style="background: linear-gradient(to right, #ff1a1a ${pokemon.xp}%, #6e0f0f ${pokemon.xp}%);"></div>
        </div>
        <div class="attribute-bar">
            <p class="attribute-name">Weight: ${pokemon.weight} </p>
            <div class="attribute-progress" style="background: linear-gradient(to right, #ff1a1a ${pokemon.weight}%, #6e0f0f ${pokemon.weight}%);"></div>
        </div>
        <div class="attribute-bar">
            <p class="attribute-name">HP: ${pokemon.hp} </p>
            <div class="attribute-progress" style="background: linear-gradient(to right, #ff1a1a ${pokemon.hp}%, #6e0f0f ${pokemon.hp}%);"></div>
        </div>
        <div class="attribute-bar">
            <p class="attribute-name">Attack: ${pokemon.attack} </p>
            <div class="attribute-progress" style="background: linear-gradient(to right, #ff1a1a ${pokemon.attack}%, #6e0f0f ${pokemon.attack}%);"></div>
        </div>
        <div class="attribute-bar">
            <p class="attribute-name">Defense: ${pokemon.defense} </p>
            <div class="attribute-progress" style="background: linear-gradient(to right, #ff1a1a ${pokemon.defense}%, #6e0f0f ${pokemon.defense}%);"></div>
        </div>
        <div class="attribute-bar">
            <p class="attribute-name">Special Attack: ${pokemon.specialAttack} </p>
            <div class="attribute-progress" style="background: linear-gradient(to right, #ff1a1a ${pokemon.specialAttack}%, #6e0f0f ${pokemon.specialAttack}%);"></div>
        </div>
        <div class="attribute-bar">
            <p class="attribute-name">Special Defense: ${pokemon.specialDefense} </p>
            <div class="attribute-progress" style="background: linear-gradient(to right, #ff1a1a ${pokemon.specialDefense}%, #6e0f0f ${pokemon.specialDefense}%);"></div>
        </div>
        <div class="attribute-bar">
            <p class="attribute-name">Speed: ${pokemon.speed} </p>
            <div class="attribute-progress" style="background: linear-gradient(to right, #ff1a1a ${pokemon.speed}%, #6e0f0f ${pokemon.speed}%);"></div>
            <img class="imgGif" src="${pokemon.gif}" alt="${pokemon.name}">
        </div>
    </div>
    `
    modalOverlay.style.display = 'block';
    pokemonModal.style.display = 'block';
}

closeModal.addEventListener('click', function () {
    closeModalAction();
});

window.addEventListener('click', function (event) {
    if (event.target === modalOverlay) {
        closeModalAction();
    }
});

function closeModalAction() {
    modalOverlay.style.display = 'none';
    pokemonModal.style.display = 'none';
    modalContent.innerHTML = '';
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener('click', () => {
    offset += limit;
    const qtdRecordsWithNextPage = offset + limit;

    if (qtdRecordsWithNextPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemonItens(offset, newLimit);
        loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
        loadPokemonItens(offset, limit);
    }
});
