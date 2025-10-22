"use strict";
// Pequeno banco de palavras para traduções
const translations = {
	status: {
		Alive: "Vivo",
		Dead: "Morto",
		unknown: "desconhecido",
	},
	gender: {
		Male: "Homem",
		Female: "Mulher",
		Genderless: "sem sexo",
		unknown: "desconhecido",
	},
	species: {
		Human: "Humano",
		Alien: "Alienígena",
		Humanoid: "Humanoide",
		Robot: "Robô",
		"Mythological Creature": "Criatura Mitológica",
		unknown: "desconhecido"
	},
	origin: {
		unknown: "desconhecido"
	}
};

// Função para realizar a tradução das palavras
export function translate(category, key) {
	if (key.startsWith("Earth")) {
		return truncate(key.replace("Earth", "Terra"));
	}else {
		return translations[category]?.[key] || truncate(key);
	}
}

// Função para gerar uma array de números ordenados
export function arrayOfNumbers(start, end, step = 1) {
	let array = [];
	let number = start;
	for (let i = start; i <= end; i++) {
		number += step;
		array.push(number);
	}
	return array;
}

// Função para truncar uma string
export function truncate(string) {
	if (string.length > 20) {
		return `${string.slice(0, 20)}...`;
	} else {
		return string;
	}
}
