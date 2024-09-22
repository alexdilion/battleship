import Gameboard from "../modules/model/Gameboard";
import Ship from "../modules/model/Ship";

let gameboard = new Gameboard();

afterEach(() => {
    gameboard = new Gameboard();
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
    const ship = new Ship("destroyer");
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

    test("no placement when overlapping", () => {
        gameboard.place(ship, 0, 0, false);
        expect(gameboard.place(ship2, 0, 0, true)).toBe(false);
        expect(gameboard.place(ship2, 0, 0, false)).toBe(false);
    });
});
