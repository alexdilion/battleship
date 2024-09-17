import shipTypes from "./shipTypes";

export default class Ship {
    #type;
    #size;

    constructor(type) {
        this.#type = type;
        this.#size = shipTypes[type].size;
    }

    get type() {
        return this.#type;
    }

    get size() {
        return this.#size;
    }

    set type(value) {
        this.#type = value;
    }

    set size(value) {
        this.#size = value;
    }
}
