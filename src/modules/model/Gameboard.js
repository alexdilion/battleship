import Array2d from "../util/Array2d";

export default class Gameboard {
    #size = 10;
    #board;
    #hits;

    constructor() {
        this.#board = new Array2d(this.#size, this.#size);
        this.#hits = new Array2d(this.#size, this.#size);
    }

    #validatePosition(shipSize, row, column, rotated) {
        if (!rotated && (column < 0 || shipSize + column > this.#size)) {
            return false;
        }

        if (rotated && (row < 0 || shipSize + row > this.#size)) {
            return false;
        }

        return true;
    }

    place(ship, row, column, rotated) {
        if (!this.#validatePosition(ship.size, row, column, rotated))
            return false;

        return true;
    }

    get board() {
        return this.#board;
    }

    get hits() {
        return this.#hits;
    }
}
