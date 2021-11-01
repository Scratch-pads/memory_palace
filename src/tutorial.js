import React from "react";
import {loc_deck_create, shuffle_deck} from "./game";
import {Menu_btn} from "./game_stuff/game_btns";
import Tutorial_display from "./tutorial_stuff/tutorial_display";
import {Tutorial_Next, Tutorial_Previous} from "./tutorial_stuff/tutorial_btns";

class Tutorial extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            tutorial_panel: 1,
            phase: 1,
            shuffled_deck: shuffle_deck(loc_deck_create()),
            cards_to_recall: 0,
            cards_recalled: 0,
        }
        this.roll_next_panel = this.roll_next_panel.bind(this);
        this.roll_prev_panel = this.roll_prev_panel.bind(this);
        this.roll_cards = this.roll_cards.bind(this);
    }

    roll_cards = () => {
        const {phase, cards_to_recall, cards_recalled} = this.state;

        if(phase === 1 && cards_to_recall < 10){
            this.setState({cards_to_recall: cards_to_recall + 1})
        }
        if(phase === 1 && cards_to_recall === 10){
            this.setState({phase: 2})
        }

        if(phase === 2){
            this.setState({phase: 3})
        }

        if(phase === 3 && cards_recalled < 10){
            this.setState({cards_recalled: cards_recalled + 1})
        }

    }

    //this function needs to increment the tutorial panel until it hits
    //memorization/reinforcement/recall panel. In this panel, it needs
    //to increment the cards and then phases. Once the last card is recalled
    //the function will start incrementing the panels
    //think about writing a helper function for cards???
    roll_next_panel = () => {
        const {tutorial_panel, phase, cards_recalled} = this.state;



        if(tutorial_panel >= 0 && tutorial_panel < 10){
            if(tutorial_panel !== 6){
                this.setState({tutorial_panel: tutorial_panel + 1})
            } else if (phase === 3 && cards_recalled === 10){
                this.setState({tutorial_panel: tutorial_panel + 1})
            } else {
                this.roll_cards()
            }
        }
    }

    //this function doesn't care about cards and phases. It just resets them to 0
    // if panel is rolled back
    roll_prev_panel = () => {
        const {tutorial_panel} = this.state;


        if(tutorial_panel > 1 && tutorial_panel <= 10){
            this.setState({tutorial_panel: tutorial_panel - 1})
        }
        if(tutorial_panel === 6 || tutorial_panel === 7){
            this.setState({
                phase: 1,
                cards_to_recall: 0,
                cards_recalled: 0
            })
        }
    }

    render(){
        return(
            <div id={"tutorial"} className={"panel-background"}>
                <p>welcome to the tutorial, bitches!</p>
                <Tutorial_display
                    panel={this.state.tutorial_panel}
                    phase={this.state.phase}
                    shuffled_deck={this.state.shuffled_deck}
                    cards_to_recall={this.state.cards_to_recall}
                    cards_recalled={this.state.cards_recalled} />
                {/*<Tutorial_Btns />*/}
                <div id={"tutorial-btns"}>
                    {/* eslint-disable-next-line react/jsx-pascal-case */}
                    <Tutorial_Previous roll_prev={this.roll_prev_panel}/>
                    {/* eslint-disable-next-line react/jsx-pascal-case */}
                    <Tutorial_Next roll_next={this.roll_next_panel}/>
                </div>
                {/* eslint-disable-next-line react/jsx-pascal-case */}
                <Menu_btn />
            </div>
        )
    }
}

export default Tutorial;