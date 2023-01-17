import { useContext, useState } from "react";
import { ThemeContext } from "../App";

export default function Toggle(props) {
    const darkTheme = useContext(ThemeContext)
    return (
        <>
        <div className="toggle-box" onClick={props.handleToggle}>
            {`${darkTheme ? "Dark" : "Light"}`}
            <div className={`toggle-switch-${darkTheme ? "dark" : "light"}`}>
                <div className={`switch-inner-${darkTheme ? "dark" : "light"}`}></div>
            </div>
        </div>
        </>
    )
}