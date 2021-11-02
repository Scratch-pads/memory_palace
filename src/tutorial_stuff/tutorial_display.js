import React from "react";

const Tutorial_display = (props) => {

    return(
        <div id="tutorial_display">
            {/*<p>panel: {props.panel}</p>*/}
            {/*<p>phase: {props.phase}</p>*/}
            {/*<p>cards to recall: {props.cards_to_recall}</p>*/}
            {/*<p>cards recalled: {props.cards_recalled}</p>*/}
            {/*{props.panel === 6 && props.phase === 1 ? props.shuffled_deck[props.cards_to_recall] : null}*/}
            {/*{props.panel === 6 && props.phase === 3 ? props.shuffled_deck[props.cards_recalled] : null}*/}
            <p>{props.panel} / 7</p>
            {props.panel === 1 ? <Panel_One /> : null}
            {props.panel === 2 ? <Panel_Two /> : null}
            {props.panel === 3 ? <Panel_Three /> : null}
            {props.panel === 4 ? <Panel_Four /> : null}
            {props.panel === 5 ? <Panel_Five /> : null}
            {props.panel === 6
                ? <Panel_Six
                    phase={props.phase}
                    shuffled_deck={props.shuffled_deck}
                    cards_to_recall={props.cards_to_recall}
                    cards_recalled={props.cards_recalled}
                    recall_check={props.recall_check} />
                : null }
            {props.panel === 7 ? <Panel_Seven /> : null}
        </div>
    )
}

const Panel_One = () => {
    return(
        <div>
            <h3>Your brain is horrible at memorizing abstract concepts and has very limited short term memory.</h3>
            <h3>That's probably why you might think that your memory is just bad and there's not much you can do about it.</h3>
            <h3>It's not just you. This is true for humans as species.</h3>
            <h3>However, there are things that human brain remembers incredibly well, even when encountered just once.</h3>
            <h3>Your spatial memory is extraordinary. Same can be said about your ability to recall events,
                or point out things that are 'off' about the environment you were in.</h3>
        </div>
    )
}

const Panel_Two = () => {
    return (
        <div>
            <h3>Memory Palace is a memory (duh) technique that takes advantage of the aspects of memory that your brain is brilliant at.</h3>
            <h3>This tutorial will hopefully teach you how to easily recall 10 items. These items will be 10 cards from a just shuffled deck of playing cards.</h3>
            {/*<h3>With practice (much less than you think), you will be able to memorize and recall the whole deck effortlessly.</h3>*/}
        </div>
    )
}

const Panel_Three = () => {
    return(
        <div>
            <h3>Imagine a room.</h3>
            <h3>Any room. It can be your bedroom, kitchen, living room. Doesn't really matter.</h3>
            <h3>Now, think about items (or areas) of the room that somewhat catch your attention.
                For example, your bed, desk, bookshelves, carpet, night lamp. You get the idea.</h3>
            <h3>These are your 'points of focus', or, in other words, places where you will put items you need to memorize and recall later.</h3>
        </div>
    )
}

const Panel_Four = () => {
    return(
        <div>
            <h3>As you have probably figured already, you can't just take a random card from a deck, put it on your imaginary pillow
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
            <br/>
            <h3>When you are shown a card to memorize, use your imagination to create an association and then place that
            association in the point of focus. Once done, move to the next point of focus.</h3>
            <h3>You will do this 10 times.</h3>
            <br/>
            <h3>Ready for the first card?</h3>
        </div>
    )
}

const Panel_Six = (props) => {
    return(
        <div>
            {props.phase === 1
                ? <div>
                    <h3>Memorization Phase</h3>
                    <h3>Cards to memorize: {props.cards_to_recall} / 10</h3>
                    <br/>
                    <h2>{props.shuffled_deck[props.cards_to_recall][0]} {props.shuffled_deck[props.cards_to_recall][1]}</h2>
                </div> : null }
            {props.phase === 2
                ? <div>
                    <h3>Reinforcement Phase</h3>
                    <br/>
                    <h3>Nothing can be memorized well if not reinforced.</h3>
                    <h3>Think of a rehearsal before an exam or a meeting with an important client.</h3>
                    <br/>
                    <h3>In your mind, walk through the room you imagined and visit each point of focus, in chronological order.</h3>
                    <h3>Try to recall the associations of the cards that were left at each point of focus. They are probably 'out of place'
                    and don't exactly belong to the room.</h3>
                    <br/>
                    <h3>Once you're done, we will do this again but this time, it's not just a rehearsal.</h3>
                </div> : null }
            {props.phase === 3
                ? <div>
                    <h3>Recall Phase</h3>
                    <h3>Cards recalled: {props.cards_recalled} / 10</h3>
                    <br/>
                    {props.recall_check === true
                        ? <h2>What's the next card?</h2>
                        : <h2>{props.shuffled_deck[props.cards_recalled][0]} {props.shuffled_deck[props.cards_recalled][1]}</h2>}
                </div> : null}
        </div>
    )
}

const Panel_Seven = () => {
    return(
        <div>
            <h3>It wasn't that hard, was it?</h3>
            <h3>If you struggled a bit, that's ok too. You probably did better than originally anticipated anyways.</h3>
            <br/>
            <h3>Each time you play, you can try to memorize and recall a few cards more. You will reach all 52 cards in no time.</h3>
            <h3>It is important to note that you don't have to create 52 points of focus in one small room.
            You can have multiple connected rooms with just 10 points of focus in each. The rooms that you connect can anything too.
            In your mind, you can cross from your bedroom straight to your office
            or to a nearby park. Your imagination is limitless.</h3>
            <h3>Remember that using memory palace is a skill like any other. You will get better at it the more you use it.</h3>
        </div>
    )
}

export default Tutorial_display;