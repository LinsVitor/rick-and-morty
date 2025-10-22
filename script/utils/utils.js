"use strict";
// Pequeno banco de palavras para traduções
const words = {
	Alive: "Vivo",
	Dead: "Morto",
	unknown: "desconhecido",
	Female: "Mulher",
	Male: "Homem",
	Genderless: "Sem sexo",
	Human: "Humano",
	Alien: "Alienígena",
	Earth: "Terra",
	"Earth (Replacement Dimension)": "Terra Alternativa",
	"Earth (C-137)": "Terra (C-137)",
};

// Função para realizar a tradução das palavras
export function translate(word) {
	if (word in words) {
		return words[word];
	} else {
		return truncate(word);
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
