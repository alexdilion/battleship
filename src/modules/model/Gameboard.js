import Array2d from "../util/Array2d";

export default class Gameboard {
    #size = 10;
    #ships = [];
    #board;
    #hits; // can be 'miss', 0, 'hit'

    constructor() {
        this.#board = new Array2d(this.#size, this.#size);
        this.#hits = new Array2d(this.#size, this.#size);
    }

    #validatePosition(shipSize, row, column, rotated) {
        // Check that the ship is placed INSIDE the board
        if (!rotated && (column < 0 || shipSize + column > this.#size)) {
            return false;
        }

        if (rotated && (row < 0 || shipSize + row > this.#size)) {
            return false;
        }

        // Check that the ship does not overlap with other ships
        if (!rotated) {
            return this.#board
                .getRow(row)
                .slice(column, column + shipSize)
                .every((v) => v === 0);
        }

        if (rotated) {
            return this.#board
                .getColumn(column)
                .slice(row, row + shipSize)
                .every((v) => v === 0);
        }

        return true;
    }

    place(ship, row, column, rotated) {
        if (!this.#validatePosition(ship.size, row, column, rotated)) {
            return false;
        }

        if (rotated) {
            this.#board.setColumnValues(ship, column, row, row + ship.size);
        } else {
            this.#board.setRowValues(ship, row, column, column + ship.size);
        }

        this.#ships.push({ ship, row, column, rotated });

        return true;
    }

    isValidAttack(row, column) {
        return (
            this.#board.isInBounds(row, column) &&
            this.#hits.getValue(row, column) == 0
        );
    }

    getValidAttacks() {
        const boardArray = this.#board.getArray();
        const validAttacks = [];

        boardArray.forEach((row, rowIndex) => {
            row.forEach((_, colIndex) => {
                if (this.#hits.getValue(rowIndex, colIndex) == 0) {
                    validAttacks.push([rowIndex, colIndex]);
                }
            });
        });

        return validAttacks;
    }

    receiveAttack(row, column) {
        if (!this.isValidAttack(row, column)) return null;

        if (this.#board.getValue(row, column) === 0) {
            this.#hits.setValue("miss", row, column);
            return "miss";
        } else {
            this.#hits.setValue("hit", row, column);
            this.#board.getValue(row, column).hit();

            if (this.#board.getValue(row, column).isSunk()) return "sunk";

            return "hit";
        }
    }

    isGameOver() {
        return this.#ships.every((value) => value.ship.isSunk());
    }

    get board() {
        return this.#board;
    }

    get ships() {
        return this.#ships;
    }

    get hits() {
        return this.#hits;
    }
}
