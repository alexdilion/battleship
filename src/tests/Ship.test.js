import Ship from "../modules/model/Ship";

test("Returns a ship", () => {
    const ship = new Ship("destroyer");

    expect(ship).toBeInstanceOf(Ship);
});

test("Returns ship of correct type", () => {
    const ship = new Ship("destroyer");

    expect(ship.getType()).toBe("destroyer");
    expect(ship.getSize()).toBe(2);
});
