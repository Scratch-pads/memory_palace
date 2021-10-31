import React, {useState, useEffect, useRef} from "react";

const Canvas = (props) => {

    const [image, setImage] = useState(null)

    const canvas_ref = useRef(null)

    useEffect(()=>{
        const deck = new Image();
        deck.src = "https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX8253567.jpg";
        deck.onload = () => setImage(deck)
    }, []);

    useEffect(() => {
        if(image && canvas_ref){
            const ctx = canvas_ref.current.getContext("2d");
            ctx.fillStyle = "white";
            ctx.fillRect(0,0,285,400);
            ctx.drawImage(image,
                0,0,285,400,
                0,0,285,400)
        }
    }, [image, canvas_ref])

    return(
        <canvas id={"canvas"} ref={canvas_ref}
        width={285} height={400}/>
    )
}


const Cards_Display = (props) => {

    // const shuffled_deck = props.shuffled_deck;
    const time_phase_1 = Math.round((props.time_phase_1 + Number.EPSILON));
    const cards_memorized = props.cards_to_recall;
    const time_phase_2 = Math.round((props.time_phase_2 + Number.EPSILON));
    const time_phase_3 = Math.round((props.time_phase_3 + Number.EPSILON));
    const cards_recalled = props.cards_recalled;
    const incorrect_recalls = props.incorrect_recalls;
    const recall_rate = Math.round((props.cards_recalled - props.incorrect_recalls)/props.cards_to_recall * 100);
    const time_paused = Math.round((props.time_paused + Number.EPSILON));
    const time_total = Math.round((props.time_phase_1 + Number.EPSILON)) + Math.round((props.time_phase_2 + Number.EPSILON)) +
            Math.round((props.time_phase_3 + Number.EPSILON)) + Math.round((props.time_paused + Number.EPSILON));


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
                ? <div>
                    <h2>Recall Phase</h2>
                </div>
                : null}
            {props.phase === 3 && props.recall_check === false
                ? <div>
                    {props.shuffled_deck[props.cards_recalled][0]}, {props.shuffled_deck[props.cards_recalled][1]}
                    </div>
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
                            <h3>{time_parser(time_total)}</h3>
                        </div>
                    </div>
                </div>
                : null}
            <Canvas/>
        </div>
    )
}

const To_Recall = (props) => {

    return(
        <div id={"to_recall_display"} className={"game-text-center recall_display btn-palace clickablePassive"}>
            <div>
                <p>Cards to Recall:</p>
                <p>{props.cards_to_recall}</p>
            </div>
        </div>
    )
}
const Recalled = (props) => {
    //counts cards the player has recalled so far (successfully ot nor)

    return(
        <div id={"recalled_display"} className={"game-text-center recall_display btn-palace clickablePassive"}>
            <div>
                <p>Cards Recalled:</p>
                <p>{props.cards_recalled}</p>
            </div>
        </div>
    )
}

export {Cards_Display, To_Recall, Recalled}