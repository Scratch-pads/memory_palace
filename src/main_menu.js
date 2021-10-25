import React from "react";
import ReactDOM from "react-dom"


//game sections
import Game from "./game";

const Main_Menu = () => {

    const onClickRenderGame = () => {
        ReactDOM.render(
            <Game />,
            document.getElementById("container_palace"))
    }

    const onClickRenderTutorial = () => {

    }

    const onClickRenderScores = () => {

    }

    const onClickRenderAbout = () => {

    }

    return (
        <div id="main_menu" className={"panel-background"}>
            <div className="clickablePassive clickable btn-palace"
                 onClick={onClickRenderGame}
            >
                <h2>Play</h2>
            </div>
            <div className="clickablePassive clickable btn-palace"
                 onClick={onClickRenderTutorial}
            >
                <h2>Tutorial</h2>
            </div>
            <div className="clickablePassive clickable btn-palace"
                 onClick={onClickRenderScores}
            >
                <h2>Scores</h2>
            </div>
            <div className="clickablePassive clickable btn-palace"
                 onClick={onClickRenderAbout}
            >
                <h2>About</h2>
            </div>
        </div>
    )
}

export default Main_Menu;