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
    return(
        <div id={"cards_display"}>
            {props.phase === 0 ? <p>Start Game</p> : null}
            {props.phase === 1
                ? <div>
                    <h2>Memorization Phase</h2>
                    <p>{props.shuffledDeck[props.cardsToRecall - 1]}</p>
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
            {props.phase === 3 && props.recall_check === true
                ? <div>
                    {props.shuffledDeck[props.cardsRecalled][0]}, {props.shuffledDeck[props.cardsRecalled][1]}
                </div>
                : null}
            {props.phase === 3 && props.recall_check === false && props.cardsRecalled !== props.cardsToRecall
                ? <p>What's the next card?</p>
                : null}
            {props.phase === 4
                ? <div>
                    <h3>End Game</h3>
                </div>
                : null}
            {props.phase === 5
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
                            <p>{props.time_phase_1}</p>
                            <p>{props.cardsToRecall}</p>
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
                            <p>{props.time_phase_2}</p>
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
                            <p>{props.time_phase_3}</p>
                            <p>{props.cardsRecalled}</p>
                            <p>{props.incorrectRecalls}</p>
                            <p>{props.recall_rate} %</p>
                        </div>
                    </div>
                    <br/>
                    <div className="score-element">
                        <div className={"score-label"}>
                            <h3>Pause Time:</h3>
                            <h3>Total Time:</h3>
                        </div>
                        <div className={"score-value"}>
                            <h3>{props.time_paused}</h3>
                            <h3>{props.time_total}</h3>
                        </div>
                    </div>
                </div>
                : null}
            {props.phase === 6
                ? <Enter_Username
                    username_input={props.username_input}
                    username={props.username}/>
                : null}
            {/*<Canvas/>*/}
        </div>
    )
}

const Enter_Username = (props) => {
    return (
        <div >
            <h2>Enter Username:</h2>
            <input className={"form-control"}
                   name={"username"}
                   id={"username-input"}
                   placeholder={"username"}
                   onChange={props.username_input}
                   value={props.username} />
        </div>
    )
}

const To_Recall = (props) => {

    return(
        <div id={"to_recall_display"} className={"game-text-center recall_display btn-palace clickablePassive"}>
            <div>
                <p>Cards to Recall:</p>
                <p>{props.cardsToRecall}</p>
            </div>
        </div>
    )
}
const Recalled = (props) => {

    return(
        <div id={"recalled_display"} className={"game-text-center recall_display btn-palace clickablePassive"}>
            <div>
                <p>Cards Recalled:</p>
                <p>{props.cardsRecalled}</p>
            </div>
        </div>
    )
}

export {Cards_Display, To_Recall, Recalled}