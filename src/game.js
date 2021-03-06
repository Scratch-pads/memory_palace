import React from "react";

import * as btns from "./game_stuff/game_btns"
import * as displays from "./game_stuff/game_displays"
// import * as scores from "./game_stuff/game_scores"
// import {sendScores} from "./game_stuff/game_scores";

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
            if(numerical_val >= 2 && numerical_val < 11){
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

const disable_buttons = (...args) => {
    const buttons_ids = [...args]

    buttons_ids.forEach(element => {
        document.getElementById(element).classList.replace("clickablePassive", "paused")
        document.getElementById(element).classList.remove("clickable")
    })
}

const reenable_buttons = (...args) => {
    const button_ids = [...args]

    button_ids.forEach(element => {
        document.getElementById(element).classList.replace("paused", "clickablePassive")
        document.getElementById(element).classList.add("clickable")
    })
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phase: 0,
            shuffled_deck: shuffle_deck(temp_deck_create()),
            cards_to_recall: 0,
            cards_recalled: 0,
            incorrect_recalls: 0,
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

        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.roll_shuffled_deck = this.roll_shuffled_deck.bind(this);
        this.skip_phase = this.skip_phase.bind(this);
        this.force_recall_check = this.force_recall_check.bind(this);
        this.pauseResumeNew = this.pauseResumeNew.bind(this);
        this.show_recall_btns = this.show_recall_btns.bind(this);
        this.calculate_recall_rate = this.calculate_recall_rate.bind(this);
        // this.disable_buttons = this.disable_buttons.bind(this);
        // this.reenable_buttons = this.reenable_buttons.bind(this);
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

    calculate_recall_rate = () => {
        const {cards_recalled, incorrect_recalls, cards_to_recall} = this.state;

        this.setState({
            recall_rate: Math.round((cards_recalled - incorrect_recalls)/cards_to_recall * 100)
        })
    }

    //time functions
    stopwatch_start = () => {
        time_start = new Date();
    }
    stopwatch_end = () => {
        time_end = new Date();
        return Math.round(time_end - time_start)/1000;
    }

    pauseResumeNew = () => {
        const {phase, paused, time_holder, time_paused, cards_to_recall, recall_check, can_submit} = this.state;

        const roll_buttons = ["skip-phase", "next-card"];
        const recall_buttons = ["incorrect-recall", "correct-recall"];

        if(!paused){
            if(cards_to_recall > 0 && phase < 3){

                //disallow scores submission if game is paused at any point
                if(can_submit[0] === true){
                    this.setState({
                        can_submit: [false, "Game was paused at some point. Since we can't tell if you were cheating or not, you cannot submit your scores."]
                    })
                }

                roll_buttons.forEach(element => {
                    document.getElementById(element).classList.replace("clickablePassive", "paused")
                    document.getElementById(element).classList.remove("clickable")
                });

            }else if(phase === 3){
                if(recall_check){

                    recall_buttons.forEach(element => {
                        document.getElementById(element).classList.replace("clickablePassive", "paused")
                        document.getElementById(element).classList.remove("clickable")
                    })

                }else{

                    document.getElementById("next-card").classList.replace("clickablePassive", "paused")
                    document.getElementById("next-card").classList.remove("clickable")

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
            if(cards_to_recall > 0 && phase < 3){

                roll_buttons.forEach(element => {
                    document.getElementById(element).classList.replace("paused", "clickablePassive")
                    document.getElementById(element).classList.add("clickable")
                })

            }else if(phase === 3){
                if(recall_check){

                    recall_buttons.forEach(element => {
                        document.getElementById(element).classList.replace("paused", "clickablePassive")
                        document.getElementById(element).classList.add("clickable")
                    })

                }else{

                    document.getElementById("next-card").classList.replace("paused", "clickablePassive")
                    document.getElementById("next-card").classList.add("clickable")
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

    //game flow functions
    roll_shuffled_deck = () => {
        const {phase, shuffled_deck, cards_to_recall, cards_recalled,
            recall_check, paused, time_holder, username, can_submit} = this.state;

        if(!paused){

            //game start
            if(phase === 0){
                this.setState({
                    phase: 1
                })

            } else if (phase === 1){

                //start phase 1 stopwatch
                if(cards_to_recall === 0){
                    reenable_buttons("btn-pause-resume")
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

            } else if (phase === 3 && recall_check === false && cards_to_recall > cards_recalled){

                disable_buttons("next-card")
                reenable_buttons("incorrect-recall", "correct-recall")

                this.setState({
                    recall_check: true
                })
                //phase 3 stopwatch ends when recall buttons are pressed
            } else if (phase === 4){

                //scores parsing. Don't touch this
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

                if (username.length < 6) {
                    alert("Username need to be at least 6 characters long")
                } else {
                    alert("BE is not done yet bruh")
                    // sendScores(this.state)
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
                    disable_buttons("btn-pause-resume", "skip-phase")
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
        const {phase, recall_check, incorrect_recalls, cards_recalled, cards_to_recall, paused, time_holder} = this.state;

        if(!paused){
            if (phase === 3 && recall_check === true){

                disable_buttons("incorrect-recall", "correct-recall")
                reenable_buttons("next-card")

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

                //advance with recall phase
                this.setState({
                    cards_recalled: cards_recalled + 1,
                    recall_check: false
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
                    disable_buttons("btn-pause-resume", "skip-phase")
                    console.log("phase 3 timer has stopped")
                }
            }
            console.log(this.state.time_phase_1)
            console.log(this.state.time_phase_2)
            console.log(this.state.time_phase_3)
            console.log(phase)
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

export {Game, loc_deck_create, temp_deck_create, shuffle_deck, disable_buttons, reenable_buttons};