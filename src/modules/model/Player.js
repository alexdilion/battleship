import Gameboard from "./Gameboard";

export default class Player {
    #name;
    #gameboard;

    constructor(name) {
        this.#name = name;
        this.#gameboard = new Gameboard();
    }

    placeShip(ship, row, column, rotated) {
        return this.#gameboard.place(ship, row, column, rotated);
    }

    receiveAttack(row, column) {
        // const coord = `${row}-${column}`;
        const result = this.#gameboard.receiveAttack(row, column);

        return result;
    }

    get name() {
        return this.#name;
    }

    get gameboard() {
        return this.#gameboard;
    }
}
