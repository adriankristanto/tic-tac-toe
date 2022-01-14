/**
 * Reference: https://kyleshevlin.com/tic-tac-toe
 */
import Board from "./Board";

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
            <Board
                rows={gameSettings.boardSize}
                columns={gameSettings.boardSize}
                players={gameSettings.players}
            />
        </div>
    );
}

export default App;
