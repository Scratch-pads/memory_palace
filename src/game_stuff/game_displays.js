import React from "react";

const Cards_Display = (props) => {
    //this will display the current card from the shuffled deck of size chosen by the user

    return(
        <div id={"cards_display"}>
            {props.phase === 0 ? <p>Start Game</p> : null}

            {props.phase === 1 ? props.shuffled_deck[props.cards_to_recall - 1] : null}

            {props.phase === 2 ? <p>use this time to recall the order of cards in your mind</p> : null}

            {props.phase === 3 && props.recall_check === false ? props.shuffled_deck[props.cards_recalled] : null}

            {props.phase === 3 && props.recall_check === true && props.cards_recalled !== props.cards_to_recall ? <p>What's the next card?</p> : null}

            {props.phase === 4
                ? <div>
                    <p>End Game. Here are your stats:</p>
                    <p>Phase 1 time: {props.time_phase_1}</p>
                    <p>Phase 2 time: {props.time_phase_2}</p>
                    <p>Phase 3 time: {props.time_phase_3}</p>
                </div>

                : null}
        </div>
    )
}

const To_Recall = (props) => {
    //this takes the number of cards player chose to recall and displays the number

    return(
        <div id={"to_recall"} className={"recall_display clickablePassive"}>
            <p>Cards to Recall:</p>
            <p>{props.cards_to_recall}</p>
            <p>Phase:</p>
            <p>{props.phase}</p>
        </div>
    )
}

const Recalled = (props) => {
    //counts cards the player has recalled so far (successfully ot nor)

    return(
        <div id={"to_recall"} className={"recall_display clickablePassive"}>
            <p>Cards Recalled:</p>
            <p>{props.cards_recalled}</p>
            <p>Incorrect Recalls:</p>
            <p>{props.incorrect_recalls}</p>
        </div>
    )
}

export {Cards_Display, To_Recall, Recalled}