import React, { useState } from "react";
import Board from "./Board";
import { generateBoardState } from "../utils/game";

/**
 * component responsible for managing the game state,
 * e.g. what happens when the user clicks on a cell,
 * runs checks on whether the game has completed, etc.
 *
 * @param {*} gameSettings an object containing boardSize and players settings
 */
export default function Game({ gameSettings }) {
    const [boardState, setBoardState] = useState(
        generateBoardState(
            gameSettings.boardSize,
            gameSettings.boardSize,
            () => null
        )
    );
    const [turn, setTurn] = useState(0);
    const handleClick = (x, y) => () => {
        // Reference: https://dev.to/samanthaming/how-to-deep-clone-an-array-in-javascript-3cig
        const deepClonedBoardState = JSON.parse(JSON.stringify(boardState));

        // if the selected cell is empty, update the board state & turn
        if (deepClonedBoardState[x][y] === null) {
            deepClonedBoardState[x][y] = gameSettings.players[turn];
            setBoardState(deepClonedBoardState);
            setTurn((prevTurn) => {
                return (prevTurn + 1) % gameSettings.players.length;
            });
        }
    };
    return (
        <div>
            <Board
                players={gameSettings.players}
                handleClick={handleClick}
                boardState={boardState}
            />
        </div>
    );
}
