/**
 * Reference: https://kyleshevlin.com/tic-tac-toe
 */
import Board from "./Board";

function App() {
    const appStyle = {
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    };

    return (
        <div className="App" style={appStyle}>
            <Board rows={3} columns={3} />
        </div>
    );
}

export default App;
