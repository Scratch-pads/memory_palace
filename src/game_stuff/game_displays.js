import React from "react";

const Cards_Display = (props) => {
    //this will display the current card from the shuffled deck of size chosen by the user

    return(
        <div id={"cards_display"}>
            {props.phase === 1 ? props.shuffled_deck[props.shuffled_deck_count] : null}
            {props.phase === 2 ? <p>use this time to recall the order of cards in your mind</p> : null}
            {props.phase === 3 && props.recall_check === false ? props.shuffled_deck[props.cards_recalled] : null}
            {props.phase === 3 && props.recall_check === true ? <p>What's the next card?</p> : null}
        </div>
    )
}

const To_Recall = (props) => {
    //this takes the number of cards player chose to recall and displays the number

    return(
        <div id={"to_recall"} className={"recall_display clickablePassive"}>
            <p>Cards to Recall:</p>
            <p>{props.cards_to_recall}</p>
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
        </div>
    )
}

export {Cards_Display, To_Recall, Recalled}