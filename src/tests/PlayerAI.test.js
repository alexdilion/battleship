import Player from "../modules/model/Player";
import PlayerAI from "../modules/model/PlayerAI";

describe("AI Player", () => {
    const cpu = new PlayerAI();
    const player = new Player("p1");

    test("Is not marked as a human player", () => {
        expect(cpu.isPlayer()).toBe(false);
    });

    test("performRandomAttack attacks the player's gameboard", () => {
        cpu.performRandomAttack(player);
        expect(player.getHits().isEmpty()).toBe(false);
        expect(player.getHits().getIndicesWithValue(0).length).toBe(99);

        cpu.performRandomAttack(player);
        expect(player.getHits().getIndicesWithValue(0).length).toBe(98);
    });
});
