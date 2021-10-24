import React from "react";

const Cards_Display = (props) => {

    const time_phase_1 = Math.round((props.time_phase_1 + Number.EPSILON));
    const cards_memorized = props.cards_to_recall;
    const time_phase_2 = Math.round((props.time_phase_2 + Number.EPSILON));
    const time_phase_3 = Math.round((props.time_phase_3 + Number.EPSILON));
    const cards_recalled = props.cards_recalled;
    const incorrect_recalls = props.incorrect_recalls;
    const recall_rate = Math.round((props.cards_recalled - props.incorrect_recalls)/props.cards_to_recall * 100);
    const time_paused = Math.round((props.time_paused + Number.EPSILON));

    const time_total = () => {
        return Math.round((props.time_phase_1 + Number.EPSILON)) + Math.round((props.time_phase_2 + Number.EPSILON)) +
            Math.round((props.time_phase_3 + Number.EPSILON)) + Math.round((props.time_paused + Number.EPSILON))

    };


    const time_parser = (time) => {
        const raw_minutes = Math.floor(time / 60);
        const raw_seconds = Math.round(time % 60)

        const minutes = () => {
            return raw_minutes < 10 ? "0"+raw_minutes : raw_minutes;
        };

        const seconds = () => {
            return raw_seconds < 10 ? "0"+raw_seconds : raw_seconds;
        };

        return minutes()+":"+seconds();
    }

    return(
        <div id={"cards_display"}>
            {props.phase === 0 ? <p>Start Game</p> : null}
            {props.phase === 1
                ? <div>
                    <h2>Memorization Phase</h2>
                    <p>{props.shuffled_deck[props.cards_to_recall - 1]}</p>
                </div>
                : null}
            {props.phase === 2
                ? <div>
                    <h2>Reinforcement Phase</h2>
                    <p>use this time to recall the order of cards in your mind</p>
                </div>
                : null}
            {props.phase === 3
                ? <h2>Recall Phase</h2>
                : null}
            {props.phase === 3 && props.recall_check === false
                ? props.shuffled_deck[props.cards_recalled]
                : null}
            {props.phase === 3 && props.recall_check === true && props.cards_recalled !== props.cards_to_recall
                ? <p>What's the next card?</p>
                : null}
            {props.phase === 4
                ? <div id={"scores_display"}>
                    <h2>Here are your stats:</h2>
                    <div className="score-element">
                        <div className={"score-label"}>
                            <h3>Memorization Phase</h3>
                        </div>
                    </div>
                    <div className="score-element">

                        <div className={"score-label"}>
                            <p>Time Elapsed:</p>
                            <p>Cards Memorized:</p>
                        </div>
                        <div className={"score-value"}>
                            <p>{time_parser(time_phase_1)}</p>
                            <p>{cards_memorized}</p>
                        </div>
                    </div>
                    <div className="score-element">
                        <div className={"score-label"}>
                            <h3>Reinforcement Phase</h3>
                        </div>
                    </div>
                    <div className="score-element">
                        <div className={"score-label"}>
                            <p>Time Elapsed</p>
                        </div>
                        <div className={"score-value"}>
                            <p>{time_parser(time_phase_2)}</p>
                        </div>
                    </div>
                    <div className="score-element">
                        <div className={"score-label"}>
                            <h3>Recall Phase</h3>
                        </div>
                    </div>
                    <div className="score-element">
                        <div className={"score-label"}>
                            <p>Time Elapsed:</p>
                            <p>Cards Recalled:</p>
                            <p>Incorrect Recalls:</p>
                            <p>Recall Rate:</p>
                        </div>
                        <div className={"score-value"}>
                            <p>{time_parser(time_phase_3)}</p>
                            <p>{cards_recalled}</p>
                            <p>{incorrect_recalls}</p>
                            <p>{recall_rate} %</p>
                        </div>
                    </div>
                    <br/>
                    <div className="score-element">
                        <div className={"score-label"}>
                            <h3>Pause Time:</h3>
                            <h3>Total Time:</h3>
                        </div>
                        <div className={"score-value"}>
                            <h3>{time_parser(time_paused)}</h3>
                            <h3>{time_parser(time_total())}</h3>
                        </div>
                    </div>
                </div>
                : null}
        </div>
    )
}

const To_Recall = (props) => {

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