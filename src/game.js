import React from "react";

import * as btns from "./game_stuff/game_btns"
import * as displays from "./game_stuff/game_displays"

const sorted_deck = [
    "A H", "2 H", "3 H", "4 H", "5 H", "6 H", "7 H", "8 H", "9 H", "10 H", "J H", "Q H", "K H",
    "A D", "2 D", "3 D", "4 D", "5 D", "6 D", "7 D", "8 D", "9 D", "10 D", "J D", "Q D", "K D",
    "A C", "2 C", "3 C", "4 C", "5 C", "6 C", "7 C", "8 C", "9 C", "10 C", "J C", "Q C", "K C",
    "A S", "2 S", "3 S", "4 S", "5 S", "6 S", "7 S", "8 S", "9 S", "10 S", "J S", "Q S", "K S",
]

let time_start, time_end;

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            game_active: false,
            phase: 0,
            shuffled_deck: this.shuffle_deck(sorted_deck),
            cards_to_recall: 0,
            cards_recalled: 0,
            recall_check: true,
            incorrect_recalls: 0,
            time_holder: 0,
            time_paused: 0,
            time_phase_1: 0,
            time_phase_2: 0,
            time_phase_3: 0,
            time_phase_total: 0,
            paused: false
        }

        this.shuffle_deck = this.shuffle_deck.bind(this);
        this.roll_shuffled_deck = this.roll_shuffled_deck.bind(this);
        this.skip_phase = this.skip_phase.bind(this);
        this.force_recall_check = this.force_recall_check.bind(this);
        this.pause_resume = this.pause_resume.bind(this);
    }

    shuffle_deck = (deck) => {
        let m = deck.length, t, i;

        //while there are elements to shuffle left:
        while(m){
            //pick remaining element
            i = Math.floor(Math.random() * m);
            m--;

            //and swap it with the current element
            t = deck[m];
            deck[m] = deck[i];
            deck[i] = t;
        }
        return deck;
    }

    //stopwatch functions
    stopwatch_start = () => {
        time_start = new Date();
    }
    stopwatch_end = () => {
        time_end = new Date();
        return Math.round(time_end - time_start)/1000;
    }

    pause_resume = () => {
        const {phase, paused, time_holder, time_paused, cards_to_recall} = this.state;

        let game_btns = ["skip-phase", "next-card", "incorrect-recall", "correct-recall"];
        if(phase !== 3){
            game_btns.splice(2)
        }

        if(cards_to_recall > 0 && phase < 4){
            if(!paused){
                //visual disable
                game_btns.forEach(element => {
                    document.getElementById(element).classList.replace("clickablePassive", "paused")
                    document.getElementById(element).classList.remove("clickable")
                })

                //stop phase timer and start pause timer
                this.setState({
                    paused: true,
                    time_holder: time_holder + this.stopwatch_end()
                })
                this.stopwatch_start()

            } else {
                //visual disable
                game_btns.forEach(element => {
                    document.getElementById(element).classList.replace("paused", "clickablePassive")
                    document.getElementById(element).classList.add("clickable")
                })

                //stop pause timer and start phase timer
                this.setState({
                    paused: false,
                    time_paused: time_paused + this.stopwatch_end()
                })
                this.stopwatch_start()
            }
        }


        console.log("time_paused: " + time_paused)
        console.log("time_holder: " + time_holder)
    }

    //other stuffs
    roll_shuffled_deck = () => {
        const {phase, shuffled_deck, cards_to_recall, cards_recalled,
            recall_check, paused, time_holder} = this.state;

        if(!paused){

            //game start
            if(phase === 0){
                this.setState({
                    phase: 1
                })

            }else if(phase === 1){

                //start phase 1 stopwatch
                if(cards_to_recall === 0){
                    this.stopwatch_start();
                    console.log("phase 1 timer has started")
                }

                //roll through deck
                if(cards_to_recall <= shuffled_deck.length - 1){
                    this.setState({
                        cards_to_recall: cards_to_recall + 1
                    })
                } else if (cards_to_recall === shuffled_deck.length){

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

            } else if (phase === 3 && recall_check === true && cards_to_recall > cards_recalled){
                this.setState({
                    recall_check: false
                })
                //phase 3 stopwatch ends when recall buttons are pressed
            }
        }

    }

    skip_phase = () => {
        const {phase, cards_to_recall, paused, time_holder} = this.state;

        if(!paused){
            if(phase < 4 && cards_to_recall > 0){
                if(phase === 1){
                    this.setState({
                        time_phase_1: time_holder + this.stopwatch_end(),
                        time_holder: 0
                    })
                    console.log("phase 1 timer has stopped")

                    this.stopwatch_start()
                    console.log("phase 2 timer has started")
                }
                if(phase === 2){
                    this.setState({
                        time_phase_2: time_holder + this.stopwatch_end(),
                        time_holder: 0
                    })
                    console.log("phase 2 timer has stopped")

                    this.stopwatch_start()
                    console.log("phase 3 timer has started")
                }
                if(phase === 3){
                    this.setState({
                        time_phase_3: time_holder + this.stopwatch_end(),
                        time_holder: 0
                    })
                    console.log("phase 3 timer has stopped")
                }

                this.setState({
                    phase: phase + 1
                })
            }
        }


    }

    force_recall_check = (e) => {
        const {phase, recall_check, incorrect_recalls, cards_recalled, cards_to_recall, paused, time_holder} = this.state;

        if(!paused){
            if (phase === 3 && recall_check === false){

                //count incorrect recalls
                //icons are a bit of a pain in the ass
                if(e.target.localName === "path" && e.target.parentNode.id === "incorrect-recall"){
                    this.setState({
                        incorrect_recalls: incorrect_recalls + 1
                    })
                } else if (e.target.id === "incorrect-recall"){
                    this.setState({
                        incorrect_recalls: incorrect_recalls + 1
                    })
                }

                //advance with recall phase
                this.setState({
                    cards_recalled: cards_recalled + 1,
                    recall_check: true
                })

                //end game if cards_recalled === cards_to_recall - 1
                //the reason why the game seems to be ended prematurely is because 'recall check' buttons
                //need to end the game. However, if they do so only when cards_recalled === cards_to_recall,
                //it is not possible the increment cards_recalled and jump to phase 4 at the same time.
                //And this button needs to do both.
                //It can do so when phase jump occurs at cards_recalled === cards_to_recall - 1
                //(P.S This is a dog shit explanation. I need to re-write this
                if (cards_recalled === cards_to_recall - 1){
                    this.setState({
                        phase: 4,
                        time_phase_3: time_holder + this.stopwatch_end()
                    })
                    console.log("phase 3 timer has stopped")
                }
            }
        }
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
                            cards_to_recall={this.state.cards_to_recall}
                            phase={this.state.phase}/>
                    </div>
                </div>
                <div className={"game-panel game-main-panel"}>
                    <div className={"game-panel-split-large"}>
                        <displays.Cards_Display
                            phase={this.state.phase}
                            shuffled_deck={this.state.shuffled_deck}
                            cards_to_recall={this.state.cards_to_recall}
                            cards_recalled={this.state.cards_recalled}
                            recall_check={this.state.recall_check}
                            incorrect_recalls={this.state.incorrect_recalls}
                            time_phase_1={this.state.time_phase_1}
                            time_phase_2={this.state.time_phase_2}
                            time_phase_3={this.state.time_phase_3}
                            time_paused={this.state.time_paused}/>
                    </div>
                    <div className={"game-panel-split-small"} >
                        {this.state.phase === 3
                            ? <div id="game-recall-btns">
                                <btns.Incorrect_Recall force_recall_check={this.force_recall_check}/>
                                <btns.Correct_Recall force_recall_check={this.force_recall_check}/>
                            </div>
                            : null
                        }
                        <btns.Start_Pause_Resume_Game
                            pause_resume={this.pause_resume}
                            paused={this.state.paused} />
                        <btns.Menu_btn />
                    </div>
                </div>
                <div className={"game-panel game-side-panel"}>
                    <div className={"game-panel-split-large"}>
                        <btns.Next_Card
                            roll_shuffled_deck={this.roll_shuffled_deck}
                            phase={this.state.phase}
                            shuffled_deck={this.state.shuffled_deck.length}
                            cards_to_recall={this.state.cards_to_recall}
                            cards_recalled={this.state.cards_recalled}/>
                    </div>
                    <div className={"game-panel-split-small"}>
                        <displays.Recalled
                            cards_recalled={this.state.cards_recalled}
                            incorrect_recalls={this.state.incorrect_recalls}/>
                    </div>
                </div>
            </div>
        )
    }
}



export default Game;