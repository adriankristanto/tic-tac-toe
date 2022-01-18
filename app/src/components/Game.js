import React, { useEffect, useState } from "react";
import Board from "./Board";
import {
    generateInitialBoardState,
    checkForDraw,
    checkForWinner,
} from "../utils/game";

/**
 * component responsible for managing the game state,
 * e.g. what happens when the user clicks on a cell,
 * runs checks on whether the game has completed, etc.
 *
 * @param {*} gameSettings an object containing boardSize and players settings
 * @param {*} onGameOver a callback that is called when the game ends, either because of a draw or there is a winner
 *                       it needs to accept the game over state, containing isDraw boolean and winner player symbol
 */
export default function Game({ gameSettings, onGameOver }) {
    const [boardState, setBoardState] = useState(
        generateInitialBoardState(gameSettings.boardSize)
    );
    const [turn, setTurn] = useState(0);

    useEffect(() => {
        const isDraw = checkForDraw(boardState);
        const winner = checkForWinner(boardState);
        if (isDraw || winner) {
            onGameOver({ isDraw, winner });
        }
    }, [boardState, onGameOver]);

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
