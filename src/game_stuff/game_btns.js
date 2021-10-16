import React from "react";
import ReactDOM from "react-dom";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle} from "@fortawesome/free-solid-svg-icons/faCheckCircle";
import {faTimesCircle} from "@fortawesome/free-solid-svg-icons/faTimesCircle";

import Main_Menu from "../main_menu";

const Skip_or_End = (props) => {

    //this will need to stop timers related to phase the player is in
    //logic for this will be written later
    //I hate working with time functions

    //dynamically change the text in the button depending on which
    //phase the player's in

    return(
        <div className="game-phase-btn clickable clickablePassive"
             onClick={props.skip_phase}>
            Skip phase / End Game
        </div>
    )
}

const Next_Card = (props) => {

    //write timer functions later
    //make the shuffled deck count increment when clicked


    //make the text change dynamically

    return(
        <div className="game-phase-btn clickable clickablePassive" onClick={props.roll_shuffled_deck}>
            Next Card/ Next Phase/ End Game
        </div>
    )
}

const Incorrect_Recall = (props) => {
    //will need functionality to add stuff to stats and all

    return(
        <div id={"incorrect-recall"} className={"btn-palace clickable clickablePassive"}
             onClick={props.recall_check}>
            <p>Incorrect Recall</p>
            <FontAwesomeIcon icon={faTimesCircle} size={"3x"}/>
        </div>
    )
}

const Correct_Recall = (props) => {
    //will need functionality to add stuff to stats and all

    return(
        <div id="correct-recall" className={"btn-palace clickable clickablePassive"}
             onClick={props.recall_check}>
            <p>Correct Recall</p>
            <FontAwesomeIcon icon={faCheckCircle} size={"3x"} />
        </div>
    )
}

const Start_Pause_Resume_Game = (props) => {
    //this will stop timers and disable all buttons apart from the Menu btn

    return(
        <div className="clickable clickablePassive btn-palace">
            Start / Pause / Resume
        </div>
    )
}

const Menu_btn = () => {
    //this also needs to check if the game is active, if yes, stop all times, discard scores.
    // Only then go back to main menu
    //maybe warn the user too

    const main_menu = () => {
        return(
            ReactDOM.render(<Main_Menu />, document.getElementById("container_palace"))
        )
    }

    return(
        <div className="clickable clickablePassive btn-palace"
             onClick={main_menu}>
            Main Menu
        </div>
    )

}



export {Skip_or_End, Next_Card, Incorrect_Recall, Correct_Recall, Start_Pause_Resume_Game, Menu_btn};
