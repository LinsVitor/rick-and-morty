const BASE_URL = "https://rickandmortyapi.com/api";

class Rickdex {
	constructor(URL) {
		this.url = URL;
	}

	info() {
		return fetch(this.url)
			.then((response) => response.json())
			.then((info) => info["info"]);
	}

	async getAll(ids = null) {
		if (ids == null) {
			const result = [];
			const info = await this.info();
			let page = 1;
			const pages = info.pages;
			while (page <= pages) {
				const results = fetch(`${this.url}/?page=${page}`)
					.then((response) => response.json())
					.then((results) => results.results);
				result.push(await results);
				page++;
			}
			return result;
		} else {
			return fetch(`${this.url}/${ids}`).then((response) => response.json());
		}
	}

	getOne(id) {
		return fetch(`${this.url}/${id}`).then((response) => response.json());
	}

	apiFilter(params = {}) {
		const parameters = ["name", "status", "species", "type", "gender", "dimension", "episode"];
		let query = new URLSearchParams({});
		Object.keys(params).forEach((key) => {
			if (parameters.includes(key)) {
				query.set(key, params[key]);
			}
		});
		return fetch(`${this.url}/?${query}`).then((response) => response.json());
	}

	async itemFilter(ids, ...filter) {
		if (typeof ids === "number") {
			const result = {};
			const element = await this.getOne(ids);
			for (let item of filter) {
				result[item] = element[item];
			}
			return result;
		} else if (Array.isArray(ids)) {
			const result = [];
			const elements = await this.getAll(ids);
			let index = 0;
			while (index <= Object.keys(elements).length - 1) {
				const tempObj = {};
				for (let item of filter) {
					tempObj[item] = elements[index][item];
				}
				result.push(tempObj);
				index++;
			}
			return result;
		}
	}
}

export class Character extends Rickdex {
	constructor() {
		const URL = `${BASE_URL}/character`;
		super(URL);
	}
}

export class Episode extends Rickdex {
	constructor() {
		const URL = `${BASE_URL}/episode`;
		super(URL);
	}
}

export class Location extends Rickdex {
	constructor() {
		const URL = `${BASE_URL}/location`;
		super(URL);
	}
}
