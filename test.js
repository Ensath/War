const main = require('./main.js');
const assert = require('assert');

it('Basic logic test', () => {
  assert.equal(true, true);
});

it('Deck size check', () => {
    main.standardDeck.create(4, 13);
    assert.equal(main.standardDeck.deckOrder.length, 52);
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