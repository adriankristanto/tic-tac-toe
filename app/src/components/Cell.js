import React from "react";

export default function Cell({ cell, handleClick }) {
    const cellStyle = {
        backgroundColor: "white",
        width: 75,
        height: 75,
    };

    return (
        <div className="cell" style={cellStyle} onClick={handleClick}>
            {cell}
        </div>
    );
}
