import Gameboard from "./Gameboard";

export default class Player {
    #name;
    #gameboard;

    constructor(name) {
        this.#name = name;
        this.#gameboard = new Gameboard();
    }

    get name() {
        return this.#name;
    }

    get gameboard() {
        return this.#gameboard;
    }
}
