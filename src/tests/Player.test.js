import Player from "../modules/model/Player";
import Ship from "../modules/model/Ship";

describe("Player constructor", () => {
    const player = new Player("Alex");

    test("Player name is set", () => {
        expect(player.name).toBe("Alex");
    });

    test("Player has a gameboard", () => {
        expect(player.gameboard).toBeTruthy();
    });
});

describe("Ship placement", () => {
    let player = new Player("p1");
    const ship = new Ship("destroyer");

    afterEach(() => (player = new Player("p1")));

    test("Valid placement", () => {
        expect(player.placeShip(ship, 0, 0, false)).toBe(true);
    });

    test("Invalid placement", () => {
        expect(player.placeShip(ship, 0, 9, false)).toBe(false);
    });
});
