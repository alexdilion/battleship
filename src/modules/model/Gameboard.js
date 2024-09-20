import Array2d from "../util/Array2d";

export default class Gameboard {
    #size = 10;
    #board;
    #hits;

    constructor() {
        this.#board = new Array2d(this.#size, this.#size);
        this.#hits = new Array2d(this.#size, this.#size);
    }

    get board() {
        return this.#board;
    }

    get hits() {
        return this.#hits;
    }
}
