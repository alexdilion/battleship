import Player from "../modules/model/Player";
import Ship from "../modules/model/Ship";

const ship = new Ship("destroyer");

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

    afterEach(() => (player = new Player("p1")));

    test("Valid placement", () => {
        expect(player.placeShip(ship, 0, 0, false)).toBe(true);
    });

    test("Invalid placement", () => {
        expect(player.placeShip(ship, 0, 9, false)).toBe(false);
    });
});

describe("Attack method", () => {
    let p1 = new Player("p1");

    afterEach(() => {
        p1 = new Player("p1");
    });

    test("Attack on empty cell", () => {
        p1.placeShip(ship, 0, 0, false);
        const outcome = p1.receiveAttack(1, 0);

        expect(outcome).toBe("miss");
    });

    test("Attack on cell with ship", () => {
        p1.placeShip(ship, 0, 0, false);
        const outcome = p1.receiveAttack(0, 0);

        expect(outcome).toBe("hit");
    });

    test("Attack on last ship cell sinks ship", () => {
        p1.placeShip(ship, 0, 0, false);
        p1.receiveAttack(0, 0);
        const outcome = p1.receiveAttack(0, 1);

        expect(outcome).toBe("sunk");
        expect(p1.gameboard.isGameOver()).toBe(true);
    });

    test("Attack on already hit cell", () => {
        p1.receiveAttack(0, 0);
        const outcome = p1.receiveAttack(0, 0);

        expect(outcome).toBe(null);
    });

    test("Attack on invalid cell", () => {
        const outcome = p1.receiveAttack(100, 100);

        expect(outcome).toBe(null);
    });
});
