import React, { useState } from "react";
import Cell from "./Cell";

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

export default function Board({ rows, columns, players }) {
    const [boardState, setBoardState] = useState(
        generateBoardState(rows, columns, () => null)
    );
    const [turn, setTurn] = useState(0);
    const boardStyle = {
        backgroundColor: "black",
        display: "grid",
        gridTemplateRows: `repeat(${boardState.length}, 1fr)`,
        gridTemplateColumns: `repeat(${boardState[0].length}, 1fr)`,
        gridGap: 5,
    };
    const boardContainerStyle = {
        display: "inline-block",
    };

    const handleClick = (x, y) => () => {
        // Reference: https://dev.to/samanthaming/how-to-deep-clone-an-array-in-javascript-3cig
        const deepClonedBoardState = JSON.parse(JSON.stringify(boardState));

        // if the selected cell is empty, update the board state & turn
        if (deepClonedBoardState[x][y] === null) {
            deepClonedBoardState[x][y] = players[turn];
            setBoardState(deepClonedBoardState);
            setTurn((prevTurn) => {
                return (prevTurn + 1) % players.length;
            });
        }
    };

    return (
        <div style={boardContainerStyle}>
            <div className="board" style={boardStyle}>
                {boardState.map((row, rowIndex) =>
                    row.map((cell, cellIndex) => (
                        // each cell does not need to memorise their position in the grid since
                        // the coordinate is passed to the handleClick function in a curried manner
                        <Cell
                            key={`${rowIndex}-${cellIndex}`}
                            cell={cell}
                            handleClick={handleClick(rowIndex, cellIndex)}
                        />
                    ))
                )}
            </div>
        </div>
    );
}
