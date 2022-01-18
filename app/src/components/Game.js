import React, { useEffect, useState } from "react";
import Board from "./Board";
import {
    generateInitialBoardState,
    checkForDraw,
    checkForWinner,
} from "../utils/game";
import { Modal, Button } from "react-bootstrap";

/**
 * component responsible for managing the game state,
 * e.g. what happens when the user clicks on a cell,
 * runs checks on whether the game has completed, etc.
 * This also includes showing UI components after the game is over.
 *
 * @param {*} gameSettings an object containing boardSize and players settings
 * @param {*} onGameOver a callback that is called when the game ends, either because of a draw or there is a winner
 *                       it needs to accept the game over state, containing isDraw boolean and winner player symbol
 */
export default function Game({ gameSettings }) {
    const [boardState, setBoardState] = useState(
        generateInitialBoardState(gameSettings.boardSize)
    );
    const [turn, setTurn] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    useEffect(() => {
        const isDraw = checkForDraw(boardState);
        const winner = checkForWinner(boardState);
        if (isDraw || winner) {
            onGameOver({ isDraw, winner });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [boardState]);

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

    const onGameOver = (gameOverState) => {
        const { isDraw, winner } = gameOverState;

        if (isDraw) {
            setModalMessage("Draw!");
            openModal();
            return;
        }

        if (winner) {
            setModalMessage(`${winner} wins!`);
            openModal();
            return;
        }
    };

    const handleGameReset = () => {
        setModalMessage("");
        setBoardState(generateInitialBoardState(gameSettings.boardSize));
        closeModal();
    };

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <div>
            <Board
                players={gameSettings.players}
                handleClick={handleClick}
                boardState={boardState}
            />
            <Modal show={modalOpen} backdrop="static" keyboard={false} centered>
                <Modal.Body className="border-0 d-flex align-items-center justify-content-center p-5">
                    <h1 className="m-5 p-5">{modalMessage}</h1>
                </Modal.Body>
                <Modal.Footer className="border-0">
                    <Button variant="secondary" onClick={handleGameReset}>
                        Reset Game
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
