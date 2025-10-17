const base_url = "https://rickandmortyapi.com/api";

class Rickdex {
    constructor(url) {
        this.url = url;
    }

    async info() {
        const response = await fetch(this.url);
        return await response.json();
    }

    async getAll(ids=null) {
        if (ids == null) {
            const result = [];
            const info = await this.info();
            let page = 1;
            const pages = info["info"]["pages"];
            while (page <= pages) {
                const resp = await fetch(`${this.url}/?page=${page}`);
                const results = await resp.json();
                result.push(results["results"]);
                page++;
            }
            return result;
        }
        else {
            const response = await fetch(`${this.url}/${ids}`);
            return await response.json();
        }
    }

    async getOne(id) {
        return await fetch(`${this.url}/${id}`).then(response => response.json());
    }

    async apiFilter(params={}) {
        const parameters = ["name", "status", "species", "type", "gender", "dimension", "episode"];
        let query = new URLSearchParams({});
        Object.keys(params).forEach(key => {
            if (parameters.includes(key)) {
                query.set(key, params[key]);
            }
        });
        return await fetch(`${this.url}/?${query}`).then(response => response.json());
    }

    async itemFilter(ids, ...filter) {
        if (typeof ids === "number") {
            const result = {};
            const element = await this.getOne(ids);
            for (let item of filter) {
                console.log(item)
                result[item] = element[item];
            }
            return result;
        }
        else if (Array.isArray(ids)) {
            const result = [];
            const elements = await this.getAll(ids);
            let index = 0;
            while (index <= Object.keys(elements).length -1) {
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
        const url = `${base_url}/character`;
        super(url);
    }
}

export class Episode extends Rickdex {
    constructor() {
        const url = `${base_url}/episode`;
        super(url);
    }
}

export class Location extends Rickdex {
    constructor() {
        const url = `${base_url}/location`;
        super(url);
    }
}