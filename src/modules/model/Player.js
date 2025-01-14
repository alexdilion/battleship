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

    isGameOver() {
        return this.#gameboard.isGameOver();
    }

    reset() {
        this.#gameboard = new Gameboard();
    }

    getShips() {
        return this.#gameboard.ships;
    }

    getHits() {
        return this.#gameboard.hits;
    }

    isPlayer() {
        return true;
    }

    get name() {
        return this.#name;
    }

    set name(newName) {
        this.#name = newName;
    }

    get gameboard() {
        return this.#gameboard;
    }
}
