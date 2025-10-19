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

export function translate(word) {
	if (word in words) {
		return words[word];
	}else {
		return word;
	}
}