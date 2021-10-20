import React from "react";

import * as btns from "./game_stuff/game_btns"
import * as displays from "./game_stuff/game_displays"

const sorted_deck = [
    "A H", "2 H", "3 H", "4 H", "5 H", "6 H", "7 H", "8 H", "9 H", "10 H", "J H", "Q H", "K H",
    "A D", "2 D", "3 D", "4 D", "5 D", "6 D", "7 D", "8 D", "9 D", "10 D", "J D", "Q D", "K D",
    "A C", "2 C", "3 C", "4 C", "5 C", "6 C", "7 C", "8 C", "9 C", "10 C", "J C", "Q C", "K C",
    "A S", "2 S", "3 S", "4 S", "5 S", "6 S", "7 S", "8 S", "9 S", "10 S", "J S", "Q S", "K S",
]

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
            time_phase_1: null,
            time_phase_2: null,
            time_phase_3: null,
            time_total: null
        }

        this.shuffle_deck = this.shuffle_deck.bind(this);
        this.roll_shuffled_deck = this.roll_shuffled_deck.bind(this);
        this.skip_phase = this.skip_phase.bind(this);
        this.force_recall_check = this.force_recall_check.bind(this);

        this.spit_shuffled_deck = this.spit_shuffled_deck.bind(this);

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

    roll_shuffled_deck = () => {
        const {phase, shuffled_deck, cards_to_recall, cards_recalled, recall_check} = this.state;

        if(phase === 0){
            this.setState({
                phase: 1
            })
        }else if(phase === 1){
            if(cards_to_recall <= shuffled_deck.length - 1){
                this.setState({
                    cards_to_recall: cards_to_recall + 1
                })
            } else if (cards_to_recall === shuffled_deck.length){
                this.setState({
                    phase: 2
                })
            }
        } else if (phase === 2){
            this.setState({
                phase: 3
            })
        } else if (phase === 3 && recall_check === true && cards_to_recall > cards_recalled){
            this.setState({
                recall_check: false
            })
        }
    }

    force_recall_check = (e) => {
        const {phase, recall_check, incorrect_recalls, cards_recalled, cards_to_recall} = this.state;

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
                    phase: 4
                })
            }

            console.log(cards_to_recall)
            console.log(cards_recalled)
            console.log(phase)
        }
    }

    skip_phase = () => {
        const {phase} = this.state;

        if(phase < 4){
            this.setState({
                phase: phase + 1
            })
        }
}

    spit_shuffled_deck = () => {
        console.log(this.state.shuffled_deck)
        console.log("phase: " + this.state.phase)
        console.log("cards to recall: " + this.state.cards_to_recall)
        console.log("cards recalled: " + this.state.cards_recalled)

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
                            recall_check={this.state.recall_check}/>
                    </div>
                    <div className={"game-panel-split-small"} >
                        {this.state.phase === 3
                            ? <div id="game-recall-btns">
                                <btns.Incorrect_Recall force_recall_check={this.force_recall_check}/>
                                <btns.Correct_Recall force_recall_check={this.force_recall_check}/>
                            </div>
                            : null
                        }
                        <btns.Start_Pause_Resume_Game show_deck={this.spit_shuffled_deck}/>
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