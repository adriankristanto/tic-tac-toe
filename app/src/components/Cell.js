import React from "react";
import "../styles/Cell.css";
import { ReactComponent as O } from "../assets/O.svg";
import { ReactComponent as X } from "../assets/X.svg";

export default function Cell({ cell, handleClick, players }) {
    const cellStyle = {
        backgroundColor: "white",
        width: 75,
        height: 75,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    };
    const markStyle = {
        backgroundColor: "white",
        width: 65,
        height: 65,
    };

    return (
        <div className="cell" style={cellStyle} onClick={handleClick}>
            {cell === players[0] ? (
                <X className={players[0]} style={markStyle} />
            ) : cell === players[1] ? (
                <O className={players[1]} style={markStyle} />
            ) : (
                cell
            )}
        </div>
    );
}
