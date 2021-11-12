import axios from "axios";
import {time_parser} from "../game";

const getScoresLocal = () => {
    axios.get('localhost:3001/show_local_scores').then(res => {
        console.log(res)
    })
}

const getScoresGlobal = () => {

}

const sendScores = (state) => {

    console.log("from sendScores:")
    const data = {
        username: state.username,
        time_phase_1: state.time_phase_1,
        time_phase_2: state.time_phase_2,
        time_phase_3: state.time_phase_3,
        cards_to_recall: state.cards_to_recall,
        cards_recalled: state.cards_recalled,
        recall_rate: state.recall_rate,

    }
    console.log(data)

    axios.post('localhost:3001/add_local_scores', {
            state
        })
        .then(res => {
        console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
}

const sendScoresGlobal = () => {

}

export {getScoresLocal, getScoresGlobal, sendScores, sendScoresGlobal};