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
