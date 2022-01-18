/**
 * Reference: https://kyleshevlin.com/tic-tac-toe
 */
import React, { useState } from "react";
import Game from "./Game";
import { Modal, Button } from "react-bootstrap";

function App() {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const gameSettings = {
        boardSize: 3,
        players: ["X", "O"],
    };

    const appStyle = {
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    };

    const handleGameOver = (gameOverState) => {
        const { isDraw, winner } = gameOverState;

        if (isDraw) {
            setModalMessage("Draw!");
            setModalOpen(true);
            return;
        }

        if (winner) {
            setModalMessage(`${winner} wins!`);
            setModalOpen(true);
            return;
        }
    };

    const handleGameReset = () => {};

    return (
        <div className="App" style={appStyle}>
            <Game gameSettings={gameSettings} onGameOver={handleGameOver} />
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

export default App;
