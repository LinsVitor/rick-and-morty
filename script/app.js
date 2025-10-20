"use strict";
import { Character, Episode, Location } from "./utils/rickdex.js";
import { translate } from "./utils/translate.js";
import { arrayOfNumbers } from "./utils/arrayofnumbers.js";

// Instancia as classes responsável por manipular a API
const character = new Character();
const episode = new Episode();
const location = new Location();

// Função responsável por atualizar as informações da tela na seção dos personagens
async function updateScreenCharacter(ids) {
	const characterGrid = document.getElementById("character-grid");
	const characters = await character.getAll(ids);
	characterGrid.innerHTML = "";
	for (const character of characters) {
		const characterCard = `
      <article class="main__card">
				<img
					src="${character.image}"
						alt="Imagem do ${character.name}"
						/>
				<h3 class="main__character-name">${character.name.slice(0, 20)}</h3>
				<ul class="main__character-info">
					<li><i class="bx-pulse"></i>${translate(character.status)}</li>
					<li><i class="bx-alien"></i>${translate(character.species)}</li>
					<li><i class="bx-planet"></i>${translate(character.origin.name)}</li>
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
		characterGrid.innerHTML += characterCard;
	}
}

async function navigationCharacter() {
	const startArray = [0, 7];
	let page = 1;
	const maxPage = await character.info().then((dados) => dados["pages"] * 2.5);
	const nextChar = document.getElementById("nextChar");
	const prevChar = document.getElementById("prevChar");

	nextChar.addEventListener("click", (event) => {
		if (page >= 1 && page <= maxPage) {
			updateScreenCharacter(
				arrayOfNumbers(startArray[0] + 8, startArray[1] + 8)
			);
			startArray[0] += 8;
			startArray[1] += 8;
			page++;
		}
	});
	prevChar.addEventListener("click", (event) => {
		if (page > 1) {
			updateScreenCharacter(
				arrayOfNumbers(startArray[0] - 8, startArray[1] - 8)
			);
			startArray[0] -= 8;
			startArray[1] -= 8;
			page--;
		}
	});
}

updateScreenCharacter(arrayOfNumbers(0, 7));
navigationCharacter();
