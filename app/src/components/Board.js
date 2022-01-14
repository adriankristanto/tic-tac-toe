import React from "react";
import Cell from "./Cell";

/**
 * component responsible for displaying the board to the user
 *
 * @param {*} players the array of players symbols as a single source of truth
 * @param {*} handleClick a function executed when a player clicks on a cell
 * @param {*} boardState current board state to be displayer to the user
 */
export default function Board({ players, handleClick, boardState }) {
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
                            players={players}
                        />
                    ))
                )}
            </div>
        </div>
    );
}
