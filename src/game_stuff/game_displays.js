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
                    <h2>Here are your stats:</h2>
                    <h3>Memorization Phase:</h3>
                    <p>Time elapsed:_
                        {Math.round((props.time_phase_1 + Number.EPSILON) * 100) / 100}
                        _seconds</p>
                    <p>Cards memorized: {props.cards_to_recall}</p>

                    <h3>Reinforcement Phase</h3>
                    <p>Time elapsed:_
                        {Math.round((props.time_phase_2 + Number.EPSILON) * 100) / 100}
                        _seconds</p>

                    <h3>Recall Phase:</h3>
                    <p>Time elapsed:_
                        {Math.round((props.time_phase_3 + Number.EPSILON) * 100) / 100}
                        _seconds</p>
                    <p>Cards recalled: {props.cards_recalled}</p>
                    <p>Incorrect Recalls: {props.incorrect_recalls}</p>
                    <p>Recall Rate:_
                        {Math.round((100 - (props.incorrect_recalls / props.cards_recalled * 100)) * 100) / 100 }
                        %</p>
                    <p>Pause Time Total:_
                        {Math.round((props.time_paused + Number.EPSILON) * 100) / 100}
                    _seconds</p>
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