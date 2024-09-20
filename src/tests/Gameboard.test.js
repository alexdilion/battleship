import Gameboard from "../modules/model/Gameboard";
import Array2d from "../modules/util/Array2d";

describe("Gameboard constructor", () => {
    const gameboard = new Gameboard();

    test("returns a Gameboard", () => {
        expect(gameboard).toBeInstanceOf(Gameboard);
    });

    test("initial board is empty", () => {
        expect(gameboard.board.isEmpty()).toBe(true);
    });

    test("initial hits array is empty", () => {
        expect(gameboard.hits.isEmpty()).toBe(true);
    });
});
