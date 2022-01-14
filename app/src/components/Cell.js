import React from "react";
import "../styles/Cell.css";
import { ReactComponent as O } from "../assets/O.svg";
import { ReactComponent as X } from "../assets/X.svg";

/**
 * component responsible for displaying the state of a single cell to the user
 *
 * @param {*} cell a string that determines which svg file to be displayed to the user, e.g. X or O
 * @param {*} handleClick a function executed when a player clicks on a cell
 * @param {*} players a list of players' symbol to be compared to the cell string
 */
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
