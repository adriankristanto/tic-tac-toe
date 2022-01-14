/**
 * Reference: https://kyleshevlin.com/tic-tac-toe
 */
import Game from "./Game";

function App() {
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

    return (
        <div className="App" style={appStyle}>
            <Game gameSettings={gameSettings} />
        </div>
    );
}

export default App;
