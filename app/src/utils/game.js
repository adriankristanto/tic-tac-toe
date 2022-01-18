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

/**
 * generate initial board state, which can be used when resetting the game or
 * initialising the board state when starting the game
 *
 * @param {*} boardSize total number of rows and columns that the board has
 * @returns a 2D array of size boardSize * boardSize, filled with nulls
 */
const generateInitialBoardState = (boardSize) => {
    return generateBoardState(boardSize, boardSize, () => null);
};

/**
 * if all elements in the input row are equal, then return the first element in the row
 * otherwise, return the default value
 *
 * @param {*} row the row to be checked (whether all elements inside it are equal)
 * @param {*} defaultValue the value to be returned if not all elements inside the row are equal, defaults to null
 * @returns the first element of the row if all elements are equal, otherwise, the default value
 */
const getWinnerSymbol = (row, defaultValue = null) =>
    row.every((cell, _, array) => array[0] === cell && array[0] !== null)
        ? row[0]
        : defaultValue;

/**
 * check whether all elements in a diagonal in a square are equal
 *
 * @param {*} square the board state that contains elements to be checked
 * @param {*} indexComputer function that preprocess the index,
 *                          it can be used to determine whether the diagonal starts from top left or top right
 * @returns the winning player symbol if there is any, otherwise, null
 */
const checkDiagonal = (square, indexComputer) => {
    const diagonal = square.reduce(
        (accumulator, row, index) =>
            accumulator.concat([row[indexComputer(index)]]),
        []
    );

    return getWinnerSymbol(diagonal, null);
};

/**
 * check for winner by checking the rows, columns and diagonals of the board
 *
 * @param {*} boardState the current board state
 * @returns the winning player symbol if there is any, otherwise, null
 */
const checkForWinner = (boardState) => {
    // if there is a winning player in a row, store the winner symbol
    const rowWin = boardState.reduce(
        // we don't want to reset the winningPlayer to null everytime
        // if we found a winner before, then we keep it
        (winningPlayer, row) => getWinnerSymbol(row, winningPlayer),
        null
    );

    // reference: https://stackoverflow.com/questions/17428587/transposing-a-2d-array-in-javascript
    // for each columnIndex, return a new 1D array that contains the columnIndex-th item in each row
    // e.g. for columnIndex = 0, get a new 1D array that contains the 0-th item in each row
    const columnWin = boardState[0]
        .map((_, columnIndex) => boardState.map((row) => row[columnIndex]))
        .reduce(
            (winningPlayer, row) => getWinnerSymbol(row, winningPlayer),
            null
        );

    const diagonalWin =
        // top left to bottom right
        checkDiagonal(boardState, (index) => index) ||
        // bottom left to top right
        checkDiagonal(boardState, (index) => boardState.length - 1 - index);

    return rowWin || columnWin || diagonalWin;
};

/**
 * check for a draw by determining whether there is any empty space left
 *
 * @param {*} boardState the current board state
 * @returns a boolean,
 *          false if there is any empty space left (thus, not a draw since a player can still move)
 *          true if there is no more empty space left (thus, a draw since no player can move)
 */
const checkForDraw = (boardState) => {
    const emptySpaceLeft = boardState
        // since the board is stored as a 2D array, concatenate them into a 1D array
        .reduce(
            (accumulator, currentValue) => accumulator.concat(currentValue),
            []
        )
        // filter out non-null values
        .filter((value) => value === null);

    return emptySpaceLeft.length === 0;
};

/**
 * currently available settings in the game
 *
 * boardSize: total number of cells in both rows and columns, the board size will be boardSize * boardSize
 * players: player symbols currently available
 */
const defaultGameSettings = {
    boardSize: 3,
    players: ["X", "O"],
};

export {
    generateBoardState,
    generateInitialBoardState,
    checkForDraw,
    checkForWinner,
    defaultGameSettings,
};
