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
        // Check that the ship is placed INSIDE the board
        if (!rotated && (column < 0 || shipSize + column > this.#size)) {
            return false;
        }

        if (rotated && (row < 0 || shipSize + row > this.#size)) {
            return false;
        }

        return true;
    }

    // TODO:
    // Check for overlap when placing
    // Add ship and placement details to ships array
    place(ship, row, column, rotated) {
        if (!this.#validatePosition(ship.size, row, column, rotated)) {
            return false;
        }

        if (rotated) {
            this.#board.setColumnValues(ship, column, row, row + ship.size);
        } else {
            this.#board.setRowValues(ship, row, column, column + ship.size);
        }

        return true;
    }

    get board() {
        return this.#board;
    }

    get hits() {
        return this.#hits;
    }
}
