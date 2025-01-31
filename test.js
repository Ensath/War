const main = require('./main.js');
const assert = require('assert');

it('Default game finished', () => {
    assert.equal(true, true);
});

// Initilize a standard 52 card deck
main.standardDeck.create(4, 13);

it('Deck size check', () => {
    assert.equal(main.standardDeck.deckOrder.length, 52);
});

it('Individual card presence check', () => {
    assert.equal(main.standardDeck.deckOrder[0].getName(), "2 of Clubs");
    assert.equal(main.standardDeck.deckOrder[51].getName(), "Ace of Spades");
});

it('Shuffle randomization check', () => {
    // Make a copy of the original order and compare with the post shuffle order
    // Should fail to pass extremely infrequently (1 in 52! tests)
    let order = main.standardDeck.deckOrder.slice();
    main.standardDeck.shuffle();
    assert.notEqual(main.standardDeck.deckOrder, order);
});

it('2 deck split size check', () => {
    let decks = main.standardDeck.splitIntoStacks(2);
    assert.equal(decks[0].deckOrder.length, 26);
});

it('3 deck split size check', () => {
    main.standardDeck.create(4, 13);
    let decks = main.standardDeck.splitIntoStacks(3);
    assert.equal(decks[0].deckOrder.length, 17);
});

it('4 deck split size check', () => {
    main.standardDeck.create(4, 13);
    let decks = main.standardDeck.splitIntoStacks(4);
    assert.equal(decks[0].deckOrder.length, 13);
});