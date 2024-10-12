import Gameboard from "../modules/model/Gameboard";
import Ship from "../modules/model/Ship";

let gameboard = new Gameboard();
let ship = new Ship("destroyer");

afterEach(() => {
    gameboard = new Gameboard();
    ship = new Ship("destroyer");
});

describe("Gameboard constructor", () => {
    test("returns a Gameboard", () => {
        expect(gameboard).toBeInstanceOf(Gameboard);
    });

    test("starting board array is empty", () => {
        expect(gameboard.board.isEmpty()).toBe(true);
    });

    test("starting hits array is empty", () => {
        expect(gameboard.hits.isEmpty()).toBe(true);
    });
});

describe("Ship placement", () => {
    const ship2 = new Ship("carrier");

    test("invalid positions", () => {
        const positions = [
            [0, 9, false],
            [0, -1, false],
            [-1, 0, true],
            [9, 0, true],
        ];

        positions.forEach((args) => {
            expect(gameboard.place(ship, ...args)).toBe(false);
        });
    });

    test("valid positions", () => {
        const positions = [
            [0, 8, false],
            [0, 0, false],
            [9, 8, false],
            [0, 0, true],
            [8, 0, true],
            [8, 9, true],
        ];

        positions.forEach((args) => {
            expect(gameboard.place(ship, ...args)).toBe(true);
            gameboard = new Gameboard();
        });
    });

    test("no placement when overlapping", () => {
        gameboard.place(ship, 0, 0, false);
        expect(gameboard.place(ship2, 0, 0, true)).toBe(false);
        expect(gameboard.place(ship2, 0, 0, false)).toBe(false);
    });

    test("ship added to board when placed", () => {
        gameboard.place(ship, 0, 0, false);

        expect(
            gameboard.board
                .getRow(0)
                .slice(0, ship.size)
                .every((v) => Object.is(ship, v))
        ).toBe(true);

        expect(
            gameboard.board
                .getRow(0)
                .slice(ship.size)
                .some((v) => Object.is(ship, v))
        ).toBe(false);
    });

    test("ship added to board when placed (vertical)", () => {
        gameboard.place(ship, 0, 0, true);

        expect(
            gameboard.board
                .getColumn(0)
                .slice(0, ship.size)
                .every((v) => Object.is(ship, v))
        ).toBe(true);

        expect(
            gameboard.board
                .getColumn(0)
                .slice(ship.size)
                .some((v) => Object.is(ship, v))
        ).toBe(false);
    });

    test("ship added to ships array when placed", () => {
        expect(gameboard.ships.length).toBe(0);
        gameboard.place(ship, 0, 0, false);
        expect(gameboard.ships.length).toBe(1);
    });
});

describe("Receiving attacks", () => {
    test("missed attacks", () => {
        expect(gameboard.receiveAttack(0, 0)).toBe("miss");
        expect(gameboard.hits.getValue(0, 0)).toBe("miss");

        expect(gameboard.receiveAttack(0, 1)).toBe("miss");
        expect(gameboard.hits.getValue(0, 1)).toBe("miss");
    });

    test("successful attacks", () => {
        gameboard.place(ship, 0, 0, false);

        expect(gameboard.receiveAttack(0, 0)).toBe("hit");
        expect(gameboard.hits.getValue(0, 0)).toBe("hit");
        expect(gameboard.board.getValue(0, 0).hits).not.toBe(0);
    });

    test("attacks on already hit cell", () => {
        gameboard.place(ship, 0, 0, false);
        gameboard.receiveAttack(0, 0);

        expect(gameboard.receiveAttack(0, 0)).toBe(null);
        expect(gameboard.board.getValue(0, 0).hits).toBe(1);
    });

    test("ship sunk when every part is hit", () => {
        gameboard.place(ship, 0, 0, false);
        gameboard.receiveAttack(0, 0);
        const outcome = gameboard.receiveAttack(0, 1);

        expect(outcome).toBe("sunk");
        expect(gameboard.ships[0].ship.isSunk()).toBe(true);
    });
});

describe("Check if game over", () => {
    test("ships not sunk", () => {
        gameboard.place(new Ship("destroyer"), 0, 0, false);
        gameboard.place(new Ship("destroyer"), 1, 0, false);

        expect(gameboard.isGameOver()).toBe(false);
    });

    test("some ships sunk", () => {
        gameboard.place(new Ship("destroyer"), 0, 0, false);
        gameboard.place(new Ship("destroyer"), 1, 0, false);

        gameboard.receiveAttack(0, 0);
        gameboard.receiveAttack(0, 1);
        gameboard.receiveAttack(1, 0);

        expect(gameboard.isGameOver()).toBe(false);
    });

    test("all ships sunk", () => {
        gameboard.place(new Ship("destroyer"), 0, 0, false);
        gameboard.place(new Ship("destroyer"), 1, 0, false);

        gameboard.receiveAttack(0, 0);
        gameboard.receiveAttack(0, 1);
        gameboard.receiveAttack(1, 0);
        gameboard.receiveAttack(1, 1);

        expect(gameboard.isGameOver()).toBe(true);
    });
});
