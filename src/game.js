import React from "react";

import * as btns from "./game_stuff/game_btns"
import * as displays from "./game_stuff/game_displays"
import * as scores from "./game_stuff/game_scores"
import {sendScores} from "./game_stuff/game_scores";

let time_start, time_end;
const loc_deck_create = () => {
    const loc_deck = [];
    for(let i=1;i<=4;i++){
        for(let j=1;j<=13;j++){
            const loc = [i,j];
            loc_deck.push(loc)
        }
    }
    return loc_deck;
}
const temp_deck_create = () => {
    const temp_deck = [];
    const suite = ["C", "D", "H", "S"];
    const non_numerical_vals = ["A", "J", "Q", "K"];

    for(let suite_pointer=0;suite_pointer<=3;suite_pointer++){
        let non_num_val_pointer = 0
        let card = [];
        for(let numerical_val=1;numerical_val<=13;numerical_val++){
            if(numerical_val===1){
                card = [ non_numerical_vals[non_num_val_pointer], suite[suite_pointer] ];
                non_num_val_pointer++;
            } else if(numerical_val >= 2 && numerical_val < 11){
                card = [ numerical_val, suite[suite_pointer]]
            } else {
                card = [ non_numerical_vals[non_num_val_pointer], suite[suite_pointer] ];
                non_num_val_pointer++;
            }
            temp_deck.push(card);
        }
    }
    return temp_deck
}
const shuffle_deck = (deck) => {
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

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phase: 0,
            shuffled_deck: shuffle_deck(temp_deck_create()),
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
            paused: false,
            username: ""
        }

        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.roll_shuffled_deck = this.roll_shuffled_deck.bind(this);
        this.skip_phase = this.skip_phase.bind(this);
        this.force_recall_check = this.force_recall_check.bind(this);
        this.pause_resume = this.pause_resume.bind(this);
        this.show_recall_btns = this.show_recall_btns.bind(this);
    }


    show_recall_btns = () => {
        const recall_btns = ["incorrect-recall", "correct-recall"];
        recall_btns.forEach(elem => {
            document.getElementById(elem).classList.remove("btn-recall-hidden")
        });
    }

    onUsernameChange = (e) => {
        this.setState({
            username: e.target.value
        })
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

        console.log(temp_deck_create());

        let game_btns = ["skip-phase", "next-card", "incorrect-recall", "correct-recall"];

        if(cards_to_recall > 0 && phase < 4){
            if(!paused){
                //visual disable
                game_btns.forEach(element => {
                    document.getElementById(element).classList.replace("clickablePassive", "paused")
                    document.getElementById(element).classList.remove("clickable")
                });

                //stop phase timer and start pause timer
                this.setState({
                    paused: true,
                    time_holder: time_holder + this.stopwatch_end()
                })
                this.stopwatch_start()

            } else {
                //visual enable
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

    //game flow functions
    roll_shuffled_deck = () => {
        const {phase, shuffled_deck, cards_to_recall, cards_recalled,
            recall_check, paused, time_holder, username, time_paused} = this.state;

        if(!paused){

            //game start
            if(phase === 0){
                this.setState({
                    phase: 1
                })

            } else if (phase === 1){

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

                this.show_recall_btns();

            } else if (phase === 3 && recall_check === true && cards_to_recall > cards_recalled){
                this.setState({
                    recall_check: false
                })
                //phase 3 stopwatch ends when recall buttons are pressed
            } else if (phase === 4){
                this.setState({
                    phase: 5
                })
            } else if (phase === 5){
                console.log(username.length)
                if(time_paused > 0){
                    alert("Game was paused at some point. We don't know if you were cheating or not, therefore, you cannot submit your scores")
                } else if (username.length < 6) {
                    alert("Username need to be at least 6 characters long")
                } else {
                    sendScores(this.state)
                }


            }

        }

    }
    skip_phase = () => {
        const {phase, cards_to_recall, paused, time_holder} = this.state;

        if(!paused){
            //start game
            if(phase === 0){
                this.setState({phase: 1})
            }
            //skip phase
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

                    this.show_recall_btns();
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
                if (e.target.id === "incorrect-recall"
                    || e.target.id === "incorrect-recall-text"
                    || e.target.parentElement.id === "incorrect-recall-icon"
                    || e.target.id === "incorrect-recall-icon"){
                    this.setState({
                        incorrect_recalls: incorrect_recalls + 1
                    })
                }
                console.log(e.target.id)

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
                            time_paused={this.state.time_paused}
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



export {Game, loc_deck_create, temp_deck_create, shuffle_deck, time_parser};