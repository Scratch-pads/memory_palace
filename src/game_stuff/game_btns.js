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
        <div id={"skip-phase"} className="game-text-center game-phase-btn btn-palace clickable clickablePassive"
             onClick={props.skip_phase}>
            {props.phase === 0 ? <p>Start Game</p>
                : props.phase === 1 ? <p>Skip phase</p>
                    : props.phase === 2 ? <p>Next phase</p>
                        : <p>End Game</p> }


            {/*<p>End Game</p>*/}
        </div>
    )
}

const Next_Card = (props) => {
    return(
        <div id={"next-card"} className="game-text-center game-phase-btn btn-palace clickable clickablePassive"
             onClick={props.roll_shuffled_deck}>
            {props.phase === 0 ? <p>Start Game</p> : null}
            {props.phase === 1 && props.cards_to_recall < props.shuffled_deck ? <p>Next Card</p> : null}
            {props.phase === 1 && props.cards_to_recall === props.shuffled_deck ? <p>Next Phase</p> : null}
            {props.phase === 2 ? <p>Next Phase</p> : null}
            {props.phase === 3 && props.cards_recalled <= props.cards_to_recall ? <p>Next Card</p> : null}
            {props.phase === 4 ? <p>View Scores</p> : null}
            {props.phase === 5 ? <p>Submit Scores</p> : null}
            {props.phase === 6 ? <div> <p>Confirm</p> <p>&</p> <p>Submit</p> </div> : null}
        </div>
    )
}

const Incorrect_Recall = (props) => {
    return(
        <div id={"incorrect-recall"}
             className={"game-text-center btn-recall-hidden btn-palace clickable clickablePassive"}
             onClick={props.force_recall_check}>
            <p id={"incorrect-recall-text"}>Incorrect Recall</p>
            <FontAwesomeIcon id={"incorrect-recall-icon"} icon={faTimesCircle} size={"3x"}/>
        </div>
    )
}

const Correct_Recall = (props) => {
    return(
        <div id={"correct-recall"}
             className={"game-text-center btn-recall-hidden btn-palace clickable clickablePassive"}
             onClick={props.force_recall_check}>
            <p id={"correct-recall-text"} >Correct Recall</p>
            <FontAwesomeIcon id={"correct-recall-icon"} icon={faCheckCircle} size={"3x"} />
        </div>
    )
}

const Start_Pause_Resume_Game = (props) => {

    return(
        <div className="game-text-center clickable clickablePassive btn-palace"
             onClick={props.pause_resume}>
            {!props.paused ? <p>Pause</p> : <p>Resume</p>}
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
        <div id={"btn-return-main-menu"} className="game-text-center clickable clickablePassive btn-palace"
             onClick={main_menu}>
            <h3>Main Menu</h3>
        </div>
    )

}



export {Skip_or_End, Next_Card, Incorrect_Recall, Correct_Recall, Start_Pause_Resume_Game, Menu_btn};
