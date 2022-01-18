import React from "react";
import { Navbar } from "react-bootstrap";
import SideBar from "./SideBar";

/**
 * a simple navigation bar component that contains the toggle for the offcanvas side bar
 *
 * @param {*} onGameSettingsChange a callback, which will be passed down to the side bar component
 */
export default function NavigationBar({ onGameSettingsChange }) {
    return (
        <div>
            <Navbar
                expand={false}
                fixed="top"
                className="d-flex flex-row-reverse"
            >
                <Navbar.Toggle
                    aria-controls="offcanvasNavbar"
                    className="border-0 mx-2"
                />
                <SideBar onGameSettingsChange={onGameSettingsChange} />
            </Navbar>
        </div>
    );
}
