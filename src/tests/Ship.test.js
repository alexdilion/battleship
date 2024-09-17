import Ship from "../modules/model/Ship";

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

        for (let i = 0; i < 10; i++) {
            ship.hit();
        }

        expect(ship.hits).toBe(3);
    });
});
