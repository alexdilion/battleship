import shipTypes from "./shipTypes";

export default class Ship {
    #type;
    #size;
    #hits = 0;

    constructor(type) {
        this.#type = type;
        this.#size = shipTypes[type].size;
    }

    hit() {
        if (this.#hits === this.#size) return;

        this.#hits += 1;
    }

    isSunk() {
        return this.#hits === this.#size;
    }

    get type() {
        return this.#type;
    }

    get size() {
        return this.#size;
    }

    get hits() {
        return this.#hits;
    }

    set type(value) {
        this.#type = value;
    }

    set size(value) {
        this.#size = value;
    }
}
