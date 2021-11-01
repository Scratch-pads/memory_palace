import React from "react";

const Tutorial_display = (props) => {

    return(
        <div id="tutorial_display">
            <p>panel: {props.panel}</p>
            <p>phase: {props.phase}</p>
            <p>cards to recall: {props.cards_to_recall}</p>
            <p>cards recalled: {props.cards_recalled}</p>
        </div>
    )
}


export default Tutorial_display;