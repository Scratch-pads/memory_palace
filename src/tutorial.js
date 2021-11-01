import React from "react";
import {loc_deck_create, shuffle_deck} from "./game";
import {Menu_btn} from "./game_stuff/game_btns";

class Tutorial extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            tutorial_panel: 0,
            phase: 0,
            shuffled_deck: shuffle_deck(loc_deck_create()),
            cards_to_recall: 0,
            cards_recalled: 0,
        }
    }

    render(){
        return(
            <div id={"tutorial"} className={"panel-background"}>
                <p>welcome to the tutorial, bitches!</p>
                {/* eslint-disable-next-line react/jsx-pascal-case */}
                <Menu_btn />
            </div>
        )
    }
}

export default Tutorial;