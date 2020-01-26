const main = require('./main.js');
const assert = require('assert');

it('Basic logic test', () => {
  assert.equal(true, true);
});

it('Deck size check', () => {
    assert.equal(main.standardDeck.deckOrder.length, 52);
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