/**
 * Reference: https://kyleshevlin.com/tic-tac-toe
 */
import React, { useState } from "react";
import { defaultGameSettings } from "../utils/game";
import Game from "./Game";
import NavigationBar from "./NavigationBar";

function App() {
    const [gameSettings, setGameSettings] = useState(defaultGameSettings);

    const handleGameSettingsChange = (newGameSettings) => {
        setGameSettings((prevGameSettings) => {
            return {
                ...prevGameSettings,
                ...newGameSettings,
            };
        });
    };

    return (
        <div className="App">
            <NavigationBar onGameSettingsChange={handleGameSettingsChange} />
            <Game gameSettings={gameSettings} />
        </div>
    );
}

export default App;
