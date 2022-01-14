/**
 * create 2D array given width and height
 *
 * @param {*} rows total number of rows on the board
 * @param {*} columns total number of columns on the board
 * @param {*} mapper map function that returns the value to fill up the array with
 * @returns a 2D array of size rows * columns, filled with the return value of the mapper function
 */
const generateBoardState = (rows, columns, mapper) => {
    return new Array(columns)
        .fill(null)
        .map(() => new Array(rows).fill(null).map(mapper));
};

export { generateBoardState };
