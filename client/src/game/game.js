import React from "react";

import * as btns from "./game_btns"
import * as displays from "./game_displays"
import {shuffleDeck, tempDeckCreate} from "../deckHelperFunctions";
import {enableButtons, disableButtons} from "../visualsHelperFunctions";
// import {sendScores} from "./game/game_scores";

let timeStart, timeEnd;

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phase: 0,
            shuffledDeck: shuffleDeck(tempDeckCreate()),
            cardsToRecall: 0,
            cardsRecalled: 0,
            incorrectRecalls: 0,
            recall_rate: null,
            recall_check: false,
            time_holder: 0,
            time_paused: 0,
            paused: false,
            time_phase_1: 0,
            time_phase_2: 0,
            time_phase_3: 0,
            time_total: 0,
            can_submit: [true, null],
            string_time_paused: "",
            string_time_phase_1: "",
            string_time_phase_2: "",
            string_time_phase_3: "",
            string_time_total: "",
            username: ""
        }

        this.roll_shuffled_deck = this.roll_shuffled_deck.bind(this);
        this.skip_phase = this.skip_phase.bind(this);
        this.force_recall_check = this.force_recall_check.bind(this);
        this.show_recall_btns = this.show_recall_btns.bind(this);
        this.calculate_recall_rate = this.calculate_recall_rate.bind(this);

        this.pauseResumeNew = this.pauseResumeNew.bind(this);

        this.onUsernameChange = this.onUsernameChange.bind(this);
    }
    //game flow functions
    roll_shuffled_deck = () => {
        const {phase, shuffledDeck, cardsToRecall, cardsRecalled,
            recall_check, paused, time_holder, username, can_submit} = this.state;

        if(!paused){

            //game start
            if(phase === 0){
                this.setState({
                    phase: 1
                })
                disableButtons("skip-phase")

            } else if (phase === 1){

                //start phase 1 stopwatch
                if(cardsToRecall === 0){
                    enableButtons("btn-pause-resume", "skip-phase");
                    this.stopwatch_start();
                    console.log("phase 1 timer has started");
                }
                //roll through deck
                if(cardsToRecall <= shuffledDeck.length - 1){
                    this.setState({
                        cardsToRecall: cardsToRecall + 1
                    })
                } else if (cardsToRecall === shuffledDeck.length){

                    //end phase 1 stopwatch
                    this.setState({
                        phase: 2,
                        time_phase_1: time_holder + this.stopwatch_end(),
                        time_holder: 0
                    })
                    console.log("phase 1 timer has stopped");

                    //start phase 2 stopwatch
                    this.stopwatch_start();
                    console.log("phase 2 timer has started")
                }
            } else if (phase === 2){

                //end phase2 stopwatch
                this.setState({
                    phase: 3,
                    time_phase_2: time_holder + this.stopwatch_end(),
                    time_holder: 0
                })
                console.log("phase 2 timer has stopped")

                //start phase 3 stopwatch
                this.stopwatch_start()
                console.log("phase 3 timer has started")

                this.show_recall_btns();

            } else if (phase === 3 && recall_check === false && cardsToRecall > cardsRecalled){

                disableButtons("next-card")
                enableButtons("incorrect-recall", "correct-recall")

                this.setState({
                    recall_check: true
                })
                //phase 3 stopwatch is ended by recall buttons

            } else if (phase === 4){

                this.round_timers();
                this.calculate_recall_rate();

                this.setState({
                    phase: 5
                })

            } else if (phase === 5) {
                if(can_submit[0]){

                    this.setState({
                        phase: 6
                    })

                } else {
                    alert(can_submit[1])
                }

            } else if (phase === 6){

                if (username.length <= 6) {
                    alert("Username need to be at least 6 characters long")
                } else {
                    alert("BE is not done yet bruh")
                    // sendScores(this.state)
                }
            }
        }
    }
    skip_phase = () => {
        const {phase, cardsToRecall, paused, time_holder} = this.state;

        if(!paused){
            //start game
            if(phase === 0){
                this.setState({phase: 1})
                disableButtons("skip-phase")
            }
            //skip phase
            if(phase < 4 && cardsToRecall > 0){
                if(phase === 1){
                    this.setState({
                        time_phase_1: time_holder + this.stopwatch_end(),
                        time_holder: 0
                    })

                    this.stopwatch_start()
                }
                if(phase === 2){
                    this.setState({
                        time_phase_2: time_holder + this.stopwatch_end(),
                        time_holder: 0
                    })
                    this.stopwatch_start();
                    this.show_recall_btns();
                }
                if(phase === 3){
                    this.setState({
                        time_phase_3: time_holder + this.stopwatch_end(),
                        time_holder: 0,
                        can_submit: [false, "Game was ended prematurely. You cannot submit your scores."]
                    })
                    disableButtons("btn-pause-resume", "skip-phase")
                    console.log("phase 3 timer has stopped")
                }
                if(phase === 4){
                    this.round_timers();
                    this.calculate_recall_rate();
                }

                this.setState({
                    phase: phase + 1
                })
            }
        }
    }
    force_recall_check = (e) => {
        const {phase, recall_check, incorrectRecalls, cardsRecalled, cardsToRecall, paused, time_holder} = this.state;

        if(!paused){
            if (phase === 3 && recall_check === true){

                disableButtons("incorrect-recall", "correct-recall")
                enableButtons("next-card")

                //count incorrect recalls
                //icons are a bit of a pain in the ass
                if (e.target.id === "incorrect-recall"
                    || e.target.id === "incorrect-recall-text"
                    || e.target.parentElement.id === "incorrect-recall-icon"
                    || e.target.id === "incorrect-recall-icon"){
                    this.setState({
                        incorrectRecalls: incorrectRecalls + 1
                    })
                }

                //advance with recall phase
                this.setState({
                    cardsRecalled: cardsRecalled + 1,
                    recall_check: false
                })
                if (cardsRecalled === cardsToRecall - 1){
                    this.setState({
                        phase: 4,
                        time_phase_3: time_holder + this.stopwatch_end()
                    })
                    disableButtons("btn-pause-resume", "skip-phase")
                    console.log("phase 3 timer has stopped")
                }
            }
            console.log(this.state.time_phase_1)
            console.log(this.state.time_phase_2)
            console.log(this.state.time_phase_3)
            console.log(phase)
        }
    }
    show_recall_btns = () => {
        const recall_btns = ["incorrect-recall", "correct-recall"];
        recall_btns.forEach(element => {
            document.getElementById(element).classList.remove("btn-recall-hidden")
        });
    }
    calculate_recall_rate = () => {
        const {cardsRecalled, incorrectRecalls, cardsToRecall} = this.state;

        this.setState({
            recall_rate: Math.round((cardsRecalled - incorrectRecalls)/cardsToRecall * 100)
        })
    }

    //time functions
    stopwatch_start = () => {
        timeStart = new Date();
    }
    stopwatch_end = () => {
        timeEnd = new Date();
        return Math.round(timeEnd - timeStart)/1000;
    }
    round_timers = () => {
        const {time_paused, time_phase_1, time_phase_2, time_phase_3} = this.state;

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

        this.setState({
            string_time_paused: time_parser(Math.round(time_paused + Number.EPSILON)),
            string_time_phase_1: time_parser(Math.round(time_phase_1 + Number.EPSILON)),
            string_time_phase_2: time_parser(Math.round(time_phase_2 + Number.EPSILON)),
            string_time_phase_3: time_parser(Math.round(time_phase_3 + Number.EPSILON)),
            string_time_total: time_parser(Math.round(time_phase_1 + Number.EPSILON) + Math.round(time_phase_2 + Number.EPSILON) +
                Math.round(time_phase_3 + Number.EPSILON) + Math.round(time_paused + Number.EPSILON))
        });
    }
    pauseResumeNew = () => {
        const {phase, paused, time_holder, time_paused, cardsToRecall, recall_check, can_submit} = this.state;

        const roll_buttons = ["skip-phase", "next-card"];
        const recall_buttons = ["incorrect-recall", "correct-recall"];

        if(!paused){
            if(cardsToRecall > 0 && phase < 3){

                //disallow scores submission if game was paused at any point
                if(can_submit[0] === true){
                    this.setState({
                        can_submit: [false, "Game was paused at some point. Since we can't tell if you were cheating or not, you cannot submit your scores."]
                    });
                }
                disableButtons(...roll_buttons);

            }else if(phase === 3){
                if(recall_check){
                    disableButtons(...recall_buttons);

                }else{
                    disableButtons("next-card")
                }
            }
            //stop phase timer and start pause timer
            if(phase > 0 && phase < 4){
                this.setState({
                    paused: true,
                    time_holder: time_holder + this.stopwatch_end()
                })
            }

        }else{
            if(cardsToRecall > 0 && phase < 3){
                enableButtons(...roll_buttons)

            }else if(phase === 3){
                if(recall_check){
                    enableButtons(...recall_buttons)
                }else{
                    enableButtons("next-card")
                }
            }

            //stop pause timer and start phase timer
            if(phase > 0 && phase < 4){
                this.setState({
                    paused: false,
                    time_paused: time_paused + this.stopwatch_end()
                })
            }
        }

        this.stopwatch_start()
    }

    //set username when submitting scores
    onUsernameChange = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    render() {
        return(
            <div id="game" className={"panel-background"}>
                <div className={"game-panel game-side-panel"}>
                    <div className={"game-panel-split-large"}>
                        <btns.Skip_or_End
                            skip_phase={this.skip_phase}
                            phase={this.state.phase}/>
                    </div>
                    <div className={"game-panel-split-small"}>
                        <displays.To_Recall
                            cardsToRecall={this.state.cardsToRecall}
                            phase={this.state.phase}/>
                    </div>
                </div>
                <div className={"game-panel game-main-panel"}>
                    <div className={"game-panel-split-large"}>
                        <displays.Cards_Display
                            phase={this.state.phase}
                            shuffledDeck={this.state.shuffledDeck}
                            cardsToRecall={this.state.cardsToRecall}
                            cardsRecalled={this.state.cardsRecalled}
                            recall_check={this.state.recall_check}
                            incorrectRecalls={this.state.incorrectRecalls}
                            recall_rate={this.state.recall_rate}
                            time_phase_1={this.state.string_time_phase_1}
                            time_phase_2={this.state.string_time_phase_2}
                            time_phase_3={this.state.string_time_phase_3}
                            time_paused={this.state.string_time_paused}
                            time_total={this.state.string_time_total}
                            username_input={this.onUsernameChange}
                            username={this.state.username}
                        />
                    </div>
                    <div id={"middle-controls"} className={"game-panel-split-small"} >
                        <div id="game-recall-btns">
                            <btns.Incorrect_Recall force_recall_check={this.force_recall_check}/>
                            <btns.Correct_Recall force_recall_check={this.force_recall_check}/>
                        </div>
                        <btns.Start_Pause_Resume_Game
                            pause_resume={this.pauseResumeNew}
                            paused={this.state.paused} />
                        <btns.Menu_btn />
                    </div>
                </div>
                <div className={"game-panel game-side-panel"}>
                    <div className={"game-panel-split-large"}>
                        <btns.Next_Card
                            roll_shuffled_deck={this.roll_shuffled_deck}
                            phase={this.state.phase}
                            shuffledDeck={this.state.shuffledDeck.length}
                            cardsToRecall={this.state.cardsToRecall}
                            cardsRecalled={this.state.cardsRecalled}/>
                    </div>
                    <div className={"game-panel-split-small"}>
                        <displays.Recalled
                            cardsRecalled={this.state.cardsRecalled}
                            incorrectRecalls={this.state.incorrectRecalls}/>
                    </div>
                </div>
            </div>
        )
    }
}

export {Game};