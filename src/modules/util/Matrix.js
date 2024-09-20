export default class Matrix {
    #rows;
    #columns;
    #matrix = [];

    constructor(rows, columns, fillChar = 0) {
        this.#rows = rows;
        this.#columns = columns;
        this.#matrix = [];

        for (let i = 0; i < rows; i++) {
            let row = [];
            for (let j = 0; j < columns; j++) {
                row.push(fillChar);
            }

            this.#matrix.push(row);
        }
    }

    getRow(row) {
        if (this.#rows <= row || row < 0) {
            throw new Error(
                `Row number out of bounds. Row range: 0 - ${
                    this.#rows - 1
                }, row number given: ${row}`
            );
        }

        return this.#matrix[row];
    }

    getColumn(col) {
        if (this.#columns <= col || col < 0) {
            throw new Error(
                `Column number out of bounds. Column range: 0 - ${
                    this.#columns - 1
                }, column number given: ${col}`
            );
        }

        return Array(this.#columns)
            .fill(0)
            .map((_, i) => this.#matrix[i][col]);
    }

    getMatrix() {
        return this.#matrix;
    }

    getValue(row, column) {
        return this.#matrix[row][column];
    }

    setValue(value, row, column) {
        this.#matrix[row][column] = value;
    }
}
