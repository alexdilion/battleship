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
        return this.#array[row];
    }

    setRowValues(value, row, start, end) {
        for (let i = start; i < end; i++) {
            this.setValue(value, row, i);
        }
    }

    getColumn(col) {
        return Array(this.#columns)
            .fill(0)
            .map((_, i) => this.#array[i][col]);
    }

    setColumnValues(value, column, start, end) {
        for (let i = start; i < end; i++) {
            this.setValue(value, i, column);
        }
    }

    isInBounds(row, column) {
        return 0 <= row < this.#rows && 0 <= column < this.#columns;
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

    getRowSize() {
        return this.#rows;
    }

    getColumnSize() {
        return this.#columns;
    }
}
