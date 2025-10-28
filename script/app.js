"use strict";
import { Character, Episode, Location } from "./utils/rickdex.js";
import { arrayOfNumbers, translate, truncate } from "./utils/utils.js";

// Instancia as classes responsável por manipular a API
const character = new Character();
const episode = new Episode();
const location = new Location();

const mainGrid = document.getElementById("mainGrid");
const mainTitle = document.getElementById("mainTitle");

let currentView = {
	type: null,
	ids: [],
	step: 0,
	page: 1,
	maxPage: 1,
};

// Objeto contendo os valores inicias de cada categoria
const category = {
	character: {
		title: "Personagens",
		ids: [0, 7],
		step: 8,
	},
	episode: {
		title: "Episódios",
		ids: [0, 5],
		step: 6,
	},
	location: {
		title: "Localizações",
		ids: [0, 5],
		step: 6,
	},
};

// Função responsável por atualizar as informações da tela
async function updateScreen(type, ids) {
	const elements = await type.getAll(ids);
	let cards = "";
	mainGrid.innerHTML = "";

	switch (type) {
		case character:
			mainTitle.innerText = category["character"].title;
			mainGrid.classList.remove("main__global-grid");
			mainGrid.classList.add("main__character-grid");

			for (const character of elements) {
				const characterCard = `
    		<article class="main__card">
				<img
					src="${character.image}"
						alt="Imagem do ${character.name}"
						/>
				<h3 class="main__character-name">${truncate(character.name, 24)}</h3>
				<ul class="main__character-info">
					<li><i class="bx-pulse"></i>${translate("status", character.status)}</li>
					<li><i class="bx-alien"></i>${translate("species", character.species)}</li>
					<li><i class="bx-planet"></i>${translate("origin", character.origin.name)}</li>
				</ul>
				<div class="main__character-buttons">
				<button class="main__character-info-btn">
					<i class="bx-info-circle"></i>Saiba mais
				</button>
				<button class="main__fav-btn">
					<i class="bx-heart"></i>
				</button>
				</div>
			</article>`;
				cards += characterCard;
			}
			mainGrid.innerHTML += cards;
			break;
		case episode:
			mainTitle.innerText = category["episode"].title;
			mainGrid.classList.remove("main__character-grid");
			mainGrid.classList.add("main__global-grid");

			for (const episode of elements) {
				const episodeCard = `
				<article class="main__card">
					<div class="main__global-icon">
						<i class="bx-movie-play"></i
						><button class="main__fav-btn"><i class="bx-heart"></i></button>
					</div>
					<h3 class="main__global-name">${truncate(episode.name, 36)}</h3>
					<div class="main__global-date">
						<p class="main__global-info">
							<i class="bx-calendar"></i>${episode.air_date}
						</p>
						<p class="main__global-info"><i class="bx-tv"></i>${episode.episode}</p>
					</div>
					<p class="main__global-info">
						<i class="bx-smile"></i>${episode.characters.length} Personagens participaram deste episódio
					</p>
				</article>
				`;
				cards += episodeCard;
			}
			mainGrid.innerHTML = cards;
			break;
		case location:
			mainTitle.innerText = category["location"].title;
			mainGrid.classList.remove("main__character-grid");
			mainGrid.classList.add("main__global-grid");

			for (const location of elements) {
				const locationCard = `
				<article class="main__card">
					<div class="main__global-icon">
						<i class="bx-planet"></i
						><button class="main__fav-btn"><i class="bx-heart"></i></button>
					</div>
					<h3 class="main__global-name">${translate("origin", location.name)}</h3>
					<div class="main__global-date">
						<p class="main__global-info">
							<i class="bx-globe"></i>${location.type}
						</p>
						<p class="main__global-info"><i class="bx-size-freeform"></i>${location.dimension}</p>
					</div>
					<p class="main__global-info">
						<i class="bx-user"></i>${location.residents.length} Personagens moram nesse planeta
					</p>
				</article>
				`;
				cards += locationCard;
			}
			mainGrid.innerHTML = cards;
			break;
	}
}

function goToNextPage() {
	if (currentView.page < currentView.maxPage) {
		currentView.page++;
		currentView.ids[0] += currentView.step;
		currentView.ids[1] += currentView.step;
		updateScreen(currentView.type, arrayOfNumbers(currentView.ids[0], currentView.ids[1]));
	}
}

function goToPreviousPage() {
	if (currentView.page > 1) {
		currentView.page--;
		currentView.ids[0] -= currentView.step;
		currentView.ids[1] -= currentView.step;
		updateScreen(currentView.type, arrayOfNumbers(currentView.ids[0], currentView.ids[1]));
	}
}

// Função responsável por alterar o conteúdo exibido na tela
async function changeCategory(type, ids, step) {
	currentView.type = type;
	currentView.ids = ids;
	currentView.step = step;
	const info = await type.info();
	currentView.maxPage = Math.ceil(info.count / currentView.step);
	updateScreen(currentView.type, arrayOfNumbers(currentView.ids[0], currentView.ids[1]));
}

window.onload = function () {
	changeCategory(character, category["character"].ids, category["character"].step);
	this.document.getElementById("nextPage").addEventListener("click", goToNextPage);
	this.document.getElementById("prevPage").addEventListener("click", goToPreviousPage);
};

document.getElementById("episode").addEventListener("click", (event) => {
	changeCategory(episode, category["episode"].ids, category["episode"].step);
});

document.getElementById("character").addEventListener("click", (event) => {
	changeCategory(character, category["character"].ids, category["character"].step);
});

document.getElementById("location").addEventListener("click", (event) => {
	changeCategory(location, category["location"].ids, category["location"].step);
});
