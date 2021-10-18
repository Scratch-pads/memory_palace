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
        <div className="game-phase-btn btn-palace clickable clickablePassive"
             onClick={props.skip_phase}>
            {props.phase < 3
                ? <p>Skip phase</p>
                : <p>End Game</p>}


            {/*<p>End Game</p>*/}
        </div>
    )
}

const Next_Card = (props) => {

    //write timer functions later
    //make the shuffled deck count increment when clicked


    //make the text change dynamically

    return(
        <div className="game-phase-btn btn-palace clickable clickablePassive"
             onClick={props.roll_shuffled_deck}>
            {props.phase === 1 && props.cards_to_recall < props.shuffled_deck ? <p>Next Card</p> : null}
            {props.phase === 1 && props.cards_to_recall === props.shuffled_deck ? <p>Next Phase</p> : null}
            {props.phase === 2 ? <p>Next Phase</p> : null}
            {props.phase === 3 && props.cards_recalled <= props.cards_to_recall ? <p>Next Card</p> : null}
            {props.phase === 4 ? <p>End Game</p> : null}

            {/*<p>Next Card</p>*/}
            {/*<p>Next Phase</p>*/}
            {/*<p>End Game</p>*/}
        </div>
    )
}

const Incorrect_Recall = (props) => {
    //will need functionality to add stuff to stats and all

    return(
        <div id={"incorrect-recall"} className={"btn-palace clickable clickablePassive"}
             onClick={props.force_recall_check}>
            <p id={"incorrect-recall"}>Incorrect Recall</p>
            <FontAwesomeIcon id={"incorrect-recall"} icon={faTimesCircle} size={"3x"}/>
        </div>
    )
}

const Correct_Recall = (props) => {
    //will need functionality to add stuff to stats and all


    return(
        <div id={"correct-recall"}
             className={"btn-palace clickable clickablePassive"}
             onClick={props.force_recall_check}>
            <p id={"correct-recall"} >Correct Recall</p>
            <FontAwesomeIcon id={"correct-recall"} icon={faCheckCircle} size={"3x"} />
        </div>
    )
}

const Start_Pause_Resume_Game = (props) => {
    //this will stop timers and disable all buttons apart from the Menu btn


    return(
        <div className="clickable clickablePassive btn-palace"
             onClick={props.show_deck}>
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
