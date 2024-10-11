import Player from "../modules/model/Player";

describe("Player constructor", () => {
    const player = new Player("Alex");

    test("Player name is set", () => {
        expect(player.name).toBe("Alex");
    });

    test("Player has a gameboard", () => {
        expect(player.gameboard).toBeTruthy();
    });
});

