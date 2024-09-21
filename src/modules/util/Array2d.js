export default class Array2d {
    #rows;
    #columns;
    #empty = true;
    #array = [];

    constructor(rows, columns, fillChar = 0) {
        this.#rows = rows;
        this.#columns = columns;
        this.#array = [];

        for (let i = 0; i < rows; i++) {
            let row = [];
            for (let j = 0; j < columns; j++) {
                row.push(fillChar);
            }

            this.#array.push(row);
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

        return this.#array[row];
    }

    setRowValues(value, row, start, end) {
        for (let i = start; i < end; i++) {
            this.setValue(value, row, i);
        }
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
            .map((_, i) => this.#array[i][col]);
    }

    setColumnValues(value, column, start, end) {
        for (let i = start; i < end; i++) {
            this.setValue(value, i, column);
        }
    }

    getArray() {
        return this.#array;
    }

    getValue(row, column) {
        return this.#array[row][column];
    }

    setValue(value, row, column) {
        this.#array[row][column] = value;
        this.#empty = false;
    }

    isEmpty() {
        return this.#empty;
    }
}
