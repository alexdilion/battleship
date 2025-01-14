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
        return (
            0 <= row &&
            row < this.#rows &&
            0 <= column &&
            column < this.#columns
        );
    }

    getIndicesWithValue(givenValue) {
        const indices = [];

        this.#array.forEach((row, rowIndex) => {
            row.forEach((value, colIndex) => {
                if (value === givenValue) {
                    indices.push([rowIndex, colIndex]);
                }
            });
        });

        return indices;
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
