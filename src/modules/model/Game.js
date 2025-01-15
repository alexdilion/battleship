export default class Game {
    #players;
    #currentPlayer;

    constructor(player1, player2) {
        this.#players = [player1, player2];
        this.#currentPlayer = 0;
    }

    getCurrentPlayer() {
        return this.#players[this.#currentPlayer];
    }

    playTurn(row, column) {
        const playerBeingAttacked = this.getCurrentPlayer();
        const result = playerBeingAttacked.receiveAttack(row, column);

        this.#currentPlayer = (this.#currentPlayer + 1) % 2;

        return result;
    }

    checkIfGameOver() {
        const isGameOver =
            this.#players[0].isGameOver() || this.#players[1].isGameOver();

        return isGameOver;
    }
}
