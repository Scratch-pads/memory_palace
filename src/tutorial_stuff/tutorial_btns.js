import React from "react";

// const Tutorial_Btns = () => {
//
//     return (
//         <div id={"tutorial-btns"}>
//             <Tutorial_Previous />
//             <Tutorial_Next />
//         </div>
//     )
// }

const Tutorial_Previous = (props) => {


    return(
        <div id={"previous-panel"}
             className="btn-palace game-text-center paused"
             onClick={props.roll_prev}>
            <h3>Previous</h3>
        </div>
    )
}


const Tutorial_Next = (props) => {

    return(
        <div id={"next-panel"}
             className="clickable clickablePassive btn-palace game-text-center"
             onClick={props.roll_next}>
            <h3>Next</h3>
        </div>
    )
}

export {Tutorial_Next, Tutorial_Previous}