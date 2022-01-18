import React, { useState } from "react";
import { Navbar, Offcanvas, Form } from "react-bootstrap";

/**
 * an offcanvas sidebar component which stores all the user changable settings for the game,
 * such as the board size, total number of players, and so on
 *
 * @param {*} onGameSettingsChange when a game setting is changed, this callback will be called,
 *                                 it should accept an object that contains the game setting that is updated
 */
export default function SideBar({ onGameSettingsChange }) {
    const [boardSize, setBoardSize] = useState(2);

    const onBoardSizeSliderChange = (event) => {
        setBoardSize(event.target.value);
        onGameSettingsChange({
            boardSize: Number(event.target.value),
        });
    };

    return (
        <div>
            <Navbar.Offcanvas
                id="offcanvasNavbar"
                aria-labelledby="offcanvasNavbarLabel"
                placement="end"
            >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title id="offcanvasNavbarLabel">
                        Game Settings
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <h4 className="py-2">Board Size</h4>
                    <Form className="d-flex justify-content-center py-2">
                        <Form.Range
                            value={boardSize}
                            onChange={onBoardSizeSliderChange}
                            min={3}
                            max={15}
                            step={2}
                        />
                        <Form.Label className="mx-4">
                            <strong>{boardSize}</strong>
                        </Form.Label>
                    </Form>
                </Offcanvas.Body>
            </Navbar.Offcanvas>
        </div>
    );
}
