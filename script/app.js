"use strict";
import { Character, Episode, Location } from "./utils/rickdex.js";
import { arrayOfNumbers, translate, truncate } from "./utils/utils.js";

// Instancia as classes responsável por manipular a API
const character = new Character();
const episode = new Episode();
const location = new Location();

// Função responsável por atualizar as informações da tela
async function updateScreen(type, ids) {
	const mainGrid = document.getElementById("mainGrid");
	const mainTitle = document.getElementById("mainTitle");
	const elements = await type.getAll(ids);

	switch (type) {
		case character:
			mainTitle.innerText = "Personagens";
			mainGrid.classList.add("main__character-grid");
			mainGrid.innerHTML = "";
			for (const character of elements) {
				console.log(character);
				const characterCard = `
    		<article class="main__card">
				<img
					src="${character.image}"
						alt="Imagem do ${character.name}"
						/>
				<h3 class="main__character-name">${truncate(character.name)}</h3>
				<ul class="main__character-info">
					<li><i class="bx-pulse"></i>${translate("status", character.status)}</li>
					<li><i class="bx-alien"></i>${translate("species", character.species)}</li>
					<li><i class="bx-planet"></i>${translate("origin", character.origin.name)}</li>
				</ul>
				<div class="main__character-buttons">
				<button class="main__character-info-btn">
					<i class="bx-info-circle"></i>Saiba mais
				</button>
				<button class="main__character-fav-btn">
					<i class="bx-heart"></i>
				</button>
				</div>
			</article>`;
				mainGrid.innerHTML += characterCard;
			}
			break;
		case episode:
			break;
		case location:
			break;
	}
}

// Função com a lógica de paginação
async function navigation(type, ids, step) {
	let startArray = ids;
	let page = 1;
	const maxPage = await type.info().then((dados) => dados["count"] / step);
	const nextPage = document.getElementById("nextPage");
	const prevPage = document.getElementById("prevPage");
	nextPage.addEventListener("click", nextCharacter);
	prevPage.addEventListener("click", previousCharacter);

	function nextCharacter() {
		if (page >= 1 && page <= maxPage) {
			updateScreen(
				type,
				arrayOfNumbers(startArray[0] + step, startArray[1] + step)
			);
			startArray[0] += step;
			startArray[1] += step;
			page++;
		}
	}

	function previousCharacter() {
		if (page > 1) {
			updateScreen(
				type,
				arrayOfNumbers(startArray[0] - step, startArray[1] - step)
			);
			startArray[0] -= step;
			startArray[1] -= step;
			page--;
		}
	}
}

window.onload = function () {
	updateScreen(character, arrayOfNumbers(0, 7));
};

navigation(character, [0, 7], 8);
