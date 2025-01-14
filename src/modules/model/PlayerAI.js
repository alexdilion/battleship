import Player from "./Player";

export default class PlayerAI extends Player {
    constructor() {
        super("CPU");
    }

    performRandomAttack(opponent) {
        const opponentGameboard = opponent.gameboard;
        const coords = opponentGameboard.getValidAttack();

        const result = opponent.receiveAttack(...coords);
        return result;
    }

    isPlayer() {
        return false;
    }
}
