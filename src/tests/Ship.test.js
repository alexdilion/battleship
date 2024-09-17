import Ship from "../modules/model/Ship";
import repeat from "../modules/util/repeat";

describe("Ship constructor", () => {
    test("Returns a ship", () => {
        const ship = new Ship("destroyer");

        expect(ship).toBeInstanceOf(Ship);
    });

    test("Returns ship of correct type", () => {
        const ship = new Ship("destroyer");

        expect(ship.type).toBe("destroyer");
        expect(ship.size).toBe(2);
    });
});

describe("Ship hit method", () => {
    test("Hits starts at zero", () => {
        const ship = new Ship("battleship");

        expect(ship.hits).toBe(0);
    });

    test("Hits increases after being hit", () => {
        const ship = new Ship("battleship");

        expect(ship.hits).toBe(0);
        ship.hit();
        expect(ship.hits).toBe(1);
    });

    test("Hits never greater than size", () => {
        const ship = new Ship("submarine");

        expect(ship.hits).toBe(0);

        repeat(() => ship.hit(), 10);

        expect(ship.hits).toBe(3);
    });
});

describe("Ship isSunk method", () => {
    test("Not sunk if hits is less than size", () => {
        const ship = new Ship("battleship");

        repeat(() => ship.hit(), 3);

        expect(ship.isSunk()).toBe(false);
    });

    test("Sunk if hits equals size", () => {
        const ship = new Ship("battleship");

        repeat(() => ship.hit(), 4);

        expect(ship.isSunk()).toBe(true);
    });
});
