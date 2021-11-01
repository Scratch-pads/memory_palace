import React from "react";

const Tutorial_display = (props) => {

    return(
        <div id="tutorial_display">
            <p>panel: {props.panel}</p>
            <p>phase: {props.phase}</p>
            <p>cards to recall: {props.cards_to_recall}</p>
            <p>cards recalled: {props.cards_recalled}</p>
            {props.panel === 6 && props.phase === 1 ? props.shuffled_deck[props.cards_to_recall] : null}
            {props.panel === 6 && props.phase === 3 ? props.shuffled_deck[props.cards_recalled] : null}
        </div>
    )
}


export default Tutorial_display;