const loc_deck_create = () => {
    const loc_deck = [];
    for (let i = 1; i <= 4; i++) {
        for (let j = 1; j <= 13; j++) {
            const loc = [i, j];
            loc_deck.push(loc)
        }
    }
    return loc_deck;
}
const tempDeckCreate = () => {
    const temp_deck = [];
    const suite = ["C", "D", "H", "S"];
    const non_numerical_vals = ["A", "J", "Q", "K"];

    for (let suite_pointer = 0; suite_pointer <= 3; suite_pointer++) {
        let non_num_val_pointer = 0
        let card = [];
        for (let numerical_val = 1; numerical_val <= 13; numerical_val++) {
            if (numerical_val >= 2 && numerical_val < 11) {
                card = [numerical_val, suite[suite_pointer]]
            } else {
                card = [non_numerical_vals[non_num_val_pointer], suite[suite_pointer]];
                non_num_val_pointer++;
            }
            temp_deck.push(card);
        }
    }
    return temp_deck
}
const shuffleDeck = (deck) => {
    let m = deck.length, t, i;

    //while there are elements to shuffle left:
    while (m) {
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
export {shuffleDeck, tempDeckCreate, loc_deck_create};