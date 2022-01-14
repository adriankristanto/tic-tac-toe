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

export default function Board({ rows, columns }) {
    const [boardState, setBoardState] = useState(
        generateBoardState(rows, columns, () => null)
    );
    const boardStyle = {
        backgroundColor: "black",
        display: "grid",
        gridTemplateRows: `repeat(${boardState.length}, 1fr)`,
        gridTemplateColumns: `repeat(${boardState[0].length}, 1fr)`,
        gridGap: 2,
    };
    const boardContainerStyle = {
        display: "inline-block",
    };

    return (
        <div style={boardContainerStyle}>
            <div className="board" style={boardStyle}>
                {boardState.map((row, rowIndex) =>
                    row.map((cell, cellIndex) => (
                        <Cell key={`${rowIndex}-${cellIndex}`} cell={cell} />
                    ))
                )}
            </div>
        </div>
    );
}
