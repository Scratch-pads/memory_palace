import React from "react";
import {Incorrect_Recall} from "../game_stuff/game_btns";

const Tutorial_display = (props) => {

    return(
        <div id="tutorial_display">
            {/*<p>panel: {props.panel}</p>*/}
            {/*<p>phase: {props.phase}</p>*/}
            {/*<p>cards to recall: {props.cards_to_recall}</p>*/}
            {/*<p>cards recalled: {props.cards_recalled}</p>*/}
            {/*{props.panel === 6 && props.phase === 1 ? props.shuffled_deck[props.cards_to_recall] : null}*/}
            {/*{props.panel === 6 && props.phase === 3 ? props.shuffled_deck[props.cards_recallewd] : null}*/}
            {props.panel === 1 ? <Panel_One /> : null}
            {props.panel === 2 ? <Panel_Two /> : null}
            {props.panel === 3 ? <Panel_Three /> : null}
            {props.panel === 4 ? <Panel_Four /> : null}
            {props.panel === 5 ? <Panel_Five /> : null}
        </div>
    )
}

const Panel_One = () => {
    return(
        <div>
            <h3>Your brain is poor at memorizing abstract concepts and has very limited short term memory.</h3>
            <h3>That's probably why you might think that your memory is just bad and there's not much you can do about it.</h3>
            <h3>It's not just you. This is true for humans as species.</h3>
            <h3>However, there are things that human brains remembers incredibly well, even when encountered just once.</h3>
            <h3>Your spatial memory is extraordinary. Same can be said about your ability to recall events.
                Or point out things that are 'off' about the environment you were in.</h3>
        </div>
    )
}

const Panel_Two = () => {
    return (
        <div>
            <h3>Memory Palace is a memory (duh) technique that takes advantage of the aspects of memory that your brain is brilliant at.</h3>
            <h3>This tutorial will hopefully teach you who to easily recall 10 items. These items will be 10 cards from a just shuffled deck of playing cards.</h3>
            <h3>With practice (much less than you think), you will be able to memorize and recall the whole deck effortlessly.</h3>
        </div>
    )
}

const Panel_Three = () => {
    return(
        <div>
            <h3>Imagine a room.</h3>
            <h3>Any room. It can be your bedroom, kitchen, living room. Doesn't really matter.</h3>
            <h3>Now think about items (or areas) of the room that somewhat catch your attention.
                For example, your bed, desk, bookshelves, carpet, night lamp. I hope you get the idea.</h3>
            <h3>These are your 'points of focus', or, in other words, places where you will put items you need to memorize and recall later.</h3>
        </div>
    )
}

const Panel_Four = () => {
    return(
        <div>
            <h3>As you have probably figured already, you can't just take a random cards from a deck, put it on your imaginary pillow
            in your imaginary bedroom, and expect to remember it, or recall it even 5 minutes later. Same can be said about phone numbers.</h3>
            <h3>This is because a 'Jack of Clubs' or your colleague's landline are abstract concepts. </h3>
            <h3>Your brain needs to 'materialize' them into something more real, more physical.</h3>
            <h3>And by 'physical' we don't necessarily just mean 'an object'. It can also be a smell, or an emotion.
            Anything that stimulates your senses.</h3>
            <h3>A 'King of Diamonds' can become Jeff Bezos, a 'Two of Hearts' can transform into two swans touching
            with their beaks and the bottom of their necks, creating that 'heart' shape in between them.</h3>
        </div>
    )
}

const Panel_Five = () => {
    return(
        <div>
            <h3>Now</h3>
            <h3>Think again about your room.</h3>
            <h3>Slowly walk through it and carefully pick ten points of focus.</h3>
        </div>
    )
}



export default Tutorial_display;