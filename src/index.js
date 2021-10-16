import React, {useState} from "react";
import ReactDOM from "react-dom"

import Main_Menu from "./main_menu"

import "./css/common.css"

import {ThemeProvider} from "styled-components";
import { GlobalStyles } from "./css/components/globalStyles.js";
import { lightTheme, darkTheme } from "./css/components/Themes";

const Main_Palace = () => {

    const [theme,
        // setTheme
    ] = useState(
        localStorage.getItem('theme') === 'light'
            ? localStorage.getItem('theme')
            : 'dark'
    );

    // const themeToggle = () => {
    //     theme === 'light' ? setTheme('dark') : setTheme('light');
    //     if (theme === 'light') {
    //         setTheme('dark');
    //         localStorage.setItem('theme', 'dark');
    //     } else {
    //         setTheme('light');
    //         localStorage.setItem('theme', 'light');
    //     }
    // }

    return(
        <div id="container_palace">
            <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
                <GlobalStyles />

            </ThemeProvider>
        </div>
    )
}

ReactDOM.render(<Main_Palace/>, document.getElementById("root"));
ReactDOM.render(<Main_Menu/>, document.getElementById("container_palace"))